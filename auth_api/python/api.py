from flask import Flask, abort, jsonify, request

from methods import Restricted, Token

app = Flask(__name__)
login = Token()
protected = Restricted()


# Just a health check
@app.route("/")
def url_root():
    return "OK"


# Just a health check
@app.route("/_health")
def url_health():
    return "OK"


# e.g. http://127.0.0.1:8000/login
@app.route("/login", methods=['POST'])
def url_login():
    username = request.form['username']
    password = request.form['password']
    token = login.generate_token(username, password)
    if token is None:
        abort(403)

    res = {'data': token}
    return jsonify(res)


# # e.g. http://127.0.0.1:8000/protected
@app.route("/protected")
def url_protected():
    auth_token = request.headers.get('Authorization')
    authorized = protected.access_data(auth_token)
    if not authorized:
        abort(403)

    res = {'data': authorized}
    return jsonify(res)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
