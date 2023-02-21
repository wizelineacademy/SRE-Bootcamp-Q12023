import chai from 'chai';
import { loginFunction } from '../services/login'
import { protectFunction } from '../services/protected'

const expect = chai.expect;

describe('loginFunction()', function () {
  it('Test login', function () {
    expect("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.StuYX978pQGnCeeaj2E1yBYwQvZIodyDTCJWXdsxBGI").to.be.equal(loginFunction("admin", "secret"));
  });

  it('Test login with empty username and password', function () {
    expect("not_found").to.be.equal(loginFunction("", ""));
  });

  it('Test login with empty username', function () {
    expect("not_found").to.be.equal(loginFunction("", "password"));
  });

  it('Test login with empty password', function () {
    expect("not_found").to.be.equal(loginFunction("username", ""));
  });

  it('Test login with non-string username', function () {
    expect("not_found").to.be.equal(loginFunction(null, "password"));
  });

  it('Test login with non-string password', function () {
    expect("not_found").to.be.equal(loginFunction("username", null));
  });
});

describe('protectFunction()', function () {
  it('Test protected', function () {
    expect("You are under protected data").to.be.equal(protectFunction("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.StuYX978pQGnCeeaj2E1yBYwQvZIodyDTCJWXdsxBGI"));
  });

    it('Test protected with invalid token', function () {
    expect("jwt malformed").to.be.equal(protectFunction("invalid_token"));
  });

  it('Test protected with empty token', function () {
    expect("jwt must be provided").to.be.equal(protectFunction(""));
  });

  it('Test protected with null token', function () {
    expect("null").to.be.equal(protectFunction(null));
  });

  it('Test protected with undefined token', function () {
    expect("null").to.be.equal(protectFunction(undefined));
  });

});
