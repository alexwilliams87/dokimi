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
describe('Form Admin CRUD tests', function () {
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
      roles: ['user', 'admin'],
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

  it('should be able to save an form if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new form
        agent.post('/api/forms')
          .send(form)
          .expect(200)
          .end(function (formSaveErr, formSaveRes) {
            // Handle form save error
            if (formSaveErr) {
              return done(formSaveErr);
            }

            // Get a list of forms
            agent.get('/api/forms')
              .end(function (formsGetErr, formsGetRes) {
                // Handle form save error
                if (formsGetErr) {
                  return done(formsGetErr);
                }

                // Get forms list
                var forms = formsGetRes.body;

                // Set assertions
                (forms[0].user._id).should.equal(userId);
                (forms[0].title).should.match('Form Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to update an form if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new form
        agent.post('/api/forms')
          .send(form)
          .expect(200)
          .end(function (formSaveErr, formSaveRes) {
            // Handle form save error
            if (formSaveErr) {
              return done(formSaveErr);
            }

            // Update form title
            form.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing form
            agent.put('/api/forms/' + formSaveRes.body._id)
              .send(form)
              .expect(200)
              .end(function (formUpdateErr, formUpdateRes) {
                // Handle form update error
                if (formUpdateErr) {
                  return done(formUpdateErr);
                }

                // Set assertions
                (formUpdateRes.body._id).should.equal(formSaveRes.body._id);
                (formUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an form if no title is provided', function (done) {
    // Invalidate title field
    form.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new form
        agent.post('/api/forms')
          .send(form)
          .expect(422)
          .end(function (formSaveErr, formSaveRes) {
            // Set message assertion
            (formSaveRes.body.message).should.match('Title cannot be blank');

            // Handle form save error
            done(formSaveErr);
          });
      });
  });

  it('should be able to delete an form if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new form
        agent.post('/api/forms')
          .send(form)
          .expect(200)
          .end(function (formSaveErr, formSaveRes) {
            // Handle form save error
            if (formSaveErr) {
              return done(formSaveErr);
            }

            // Delete an existing form
            agent.delete('/api/forms/' + formSaveRes.body._id)
              .send(form)
              .expect(200)
              .end(function (formDeleteErr, formDeleteRes) {
                // Handle form error error
                if (formDeleteErr) {
                  return done(formDeleteErr);
                }

                // Set assertions
                (formDeleteRes.body._id).should.equal(formSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a single form if signed in and verify the custom "isCurrentUserOwner" field is set to "true"', function (done) {
    // Create new form model instance
    form.user = user;
    var formObj = new Form(form);

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new form
        agent.post('/api/forms')
          .send(form)
          .expect(200)
          .end(function (formSaveErr, formSaveRes) {
            // Handle form save error
            if (formSaveErr) {
              return done(formSaveErr);
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

                // Assert that the "isCurrentUserOwner" field is set to true since the current User created it
                (formInfoRes.body.isCurrentUserOwner).should.equal(true);

                // Call the assertion callback
                done();
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
