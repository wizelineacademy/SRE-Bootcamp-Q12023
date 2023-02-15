FROM python:3-alpine

ENV FLASK_APP=api

WORKDIR /usr/src

RUN apk update \
    && apk add --no-cache gcc python3-dev mariadb-dev libc-dev

COPY ["requirements.txt", "api.py", "methods.py", "/usr/src/"]

RUN pip install --upgrade pip \
    && pip install -r /usr/src/requirements.txt

CMD ["/usr/local/bin/flask", "run", "--host", "0.0.0.0", "--port", "8000"]
