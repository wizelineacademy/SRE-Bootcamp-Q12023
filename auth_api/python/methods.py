from hashlib import sha512

import jwt
from jwt.exceptions import InvalidSignatureError
from sqlalchemy import Column, String, create_engine
from sqlalchemy.orm import declarative_base, scoped_session, sessionmaker

SECRET_KEY = 'my2w7wjd7yXF64FIADfJxNs1oupTGAuW'

Base = declarative_base()


class Users(Base):
    __tablename__ = 'users'
    username = Column(String, primary_key=True)
    password = Column(String)
    salt = Column(String)
    role = Column(String)


class MySQL:
    def __init__(self, host: str, username: str, password: str, db_name: str):
        self.uri = f'mysql://{username}:{password}@{host}/{db_name}'
        self.session = scoped_session(
            sessionmaker(bind=create_engine(self.uri),
                         autocommit=False, autoflush=False, expire_on_commit=False)
        )

    def check_valid_username_password(self, username: str, password: str):
        user = self.session.query(Users).filter(Users.username == username).first()
        if user is None:
            return None

        password_and_salt = password + user.salt
        if sha512(password_and_salt.encode('utf-8')).hexdigest() != user.password:
            return None

        return user


class Token:
    def __init__(self):
        self.db = MySQL(
            host='sre-bootcamp-selection-challenge.cabf3yhjqvmq.us-east-1.rds.amazonaws.com',
            username='secret', password='jOdznoyH6swQB9sTGdLUeeSrtejWkcw', db_name='bootcamp_tht'
        )

    def generate_token(self, username, password):
        user = self.db.check_valid_username_password(username, password)
        if user is None:
            return None

        return jwt.encode({'role': user.role}, key=SECRET_KEY, algorithm='HS256')


class Restricted:
    def __init__(self):
        self.roles = ['admin', 'editor', 'viewer']

    def access_data(self, authorization):
        token: str = authorization.strip()
        if 'Bearer' in token:
            token = token.split('Bearer')[1].strip()

        try:
            payload = jwt.decode(token, key=SECRET_KEY, algorithms=['HS256'])
            if payload['role'].lower() not in self.roles:
                return None
        except InvalidSignatureError:
            return None

        return 'You are under protected data'
