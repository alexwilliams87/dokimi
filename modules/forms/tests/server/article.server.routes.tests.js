'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Form = mongoose.model('Form'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  form;

/**
 * Form routes tests
 */
describe('Form CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      usernameOrEmail: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.usernameOrEmail,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new form
    user.save(function () {
      form = {
        title: 'Form Title',
        content: 'Form Content'
      };

      done();
    });
  });

  it('should not be able to save an form if logged in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/forms')
          .send(form)
          .expect(403)
          .end(function (formSaveErr, formSaveRes) {
            // Call the assertion callback
            done(formSaveErr);
          });

      });
  });

  it('should not be able to save an form if not logged in', function (done) {
    agent.post('/api/forms')
      .send(form)
      .expect(403)
      .end(function (formSaveErr, formSaveRes) {
        // Call the assertion callback
        done(formSaveErr);
      });
  });

  it('should not be able to update an form if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/forms')
          .send(form)
          .expect(403)
          .end(function (formSaveErr, formSaveRes) {
            // Call the assertion callback
            done(formSaveErr);
          });
      });
  });

  it('should be able to get a list of forms if not signed in', function (done) {
    // Create new form model instance
    var formObj = new Form(form);

    // Save the form
    formObj.save(function () {
      // Request forms
      request(app).get('/api/forms')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single form if not signed in', function (done) {
    // Create new form model instance
    var formObj = new Form(form);

    // Save the form
    formObj.save(function () {
      request(app).get('/api/forms/' + formObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', form.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single form with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/forms/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Form is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single form which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent form
    request(app).get('/api/forms/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No form with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should not be able to delete an form if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/forms')
          .send(form)
          .expect(403)
          .end(function (formSaveErr, formSaveRes) {
            // Call the assertion callback
            done(formSaveErr);
          });
      });
  });

  it('should not be able to delete an form if not signed in', function (done) {
    // Set form user
    form.user = user;

    // Create new form model instance
    var formObj = new Form(form);

    // Save the form
    formObj.save(function () {
      // Try deleting form
      request(app).delete('/api/forms/' + formObj._id)
        .expect(403)
        .end(function (formDeleteErr, formDeleteRes) {
          // Set message assertion
          (formDeleteRes.body.message).should.match('User is not authorized');

          // Handle form error error
          done(formDeleteErr);
        });

    });
  });

  it('should be able to get a single form that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      usernameOrEmail: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.usernameOrEmail,
      password: _creds.password,
      provider: 'local',
      roles: ['admin']
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new form
          agent.post('/api/forms')
            .send(form)
            .expect(200)
            .end(function (formSaveErr, formSaveRes) {
              // Handle form save error
              if (formSaveErr) {
                return done(formSaveErr);
              }

              // Set assertions on new form
              (formSaveRes.body.title).should.equal(form.title);
              should.exist(formSaveRes.body.user);
              should.equal(formSaveRes.body.user._id, orphanId);

              // force the form to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the form
                    agent.get('/api/forms/' + formSaveRes.body._id)
                      .expect(200)
                      .end(function (formInfoErr, formInfoRes) {
                        // Handle form error
                        if (formInfoErr) {
                          return done(formInfoErr);
                        }

                        // Set assertions
                        (formInfoRes.body._id).should.equal(formSaveRes.body._id);
                        (formInfoRes.body.title).should.equal(form.title);
                        should.equal(formInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  it('should be able to get a single form if not signed in and verify the custom "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create new form model instance
    var formObj = new Form(form);

    // Save the form
    formObj.save(function () {
      request(app).get('/api/forms/' + formObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', form.title);
          // Assert the custom field "isCurrentUserOwner" is set to false for the un-authenticated User
          res.body.should.be.instanceof(Object).and.have.property('isCurrentUserOwner', false);
          // Call the assertion callback
          done();
        });
    });
  });

  it('should be able to get single form, that a different user created, if logged in & verify the "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create temporary user creds
    var _creds = {
      usernameOrEmail: 'formowner',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create user that will create the Form
    var _formOwner = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'temp@test.com',
      username: _creds.usernameOrEmail,
      password: _creds.password,
      provider: 'local',
      roles: ['admin', 'user']
    });

    _formOwner.save(function (err, _user) {
      // Handle save error
      if (err) {
        return done(err);
      }

      // Sign in with the user that will create the Form
      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var userId = _user._id;

          // Save a new form
          agent.post('/api/forms')
            .send(form)
            .expect(200)
            .end(function (formSaveErr, formSaveRes) {
              // Handle form save error
              if (formSaveErr) {
                return done(formSaveErr);
              }

              // Set assertions on new form
              (formSaveRes.body.title).should.equal(form.title);
              should.exist(formSaveRes.body.user);
              should.equal(formSaveRes.body.user._id, userId);

              // now signin with the test suite user
              agent.post('/api/auth/signin')
                .send(credentials)
                .expect(200)
                .end(function (err, res) {
                  // Handle signin error
                  if (err) {
                    return done(err);
                  }

                  // Get the form
                  agent.get('/api/forms/' + formSaveRes.body._id)
                    .expect(200)
                    .end(function (formInfoErr, formInfoRes) {
                      // Handle form error
                      if (formInfoErr) {
                        return done(formInfoErr);
                      }

                      // Set assertions
                      (formInfoRes.body._id).should.equal(formSaveRes.body._id);
                      (formInfoRes.body.title).should.equal(form.title);
                      // Assert that the custom field "isCurrentUserOwner" is set to false since the current User didn't create it
                      (formInfoRes.body.isCurrentUserOwner).should.equal(false);

                      // Call the assertion callback
                      done();
                    });
                });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Form.remove().exec(done);
    });
  });
});
