'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Article = mongoose.model('Article'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  question;

/**
 * Article routes tests
 */
describe('Article CRUD tests', function () {

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

    // Save a user to the test db and create new question
    user.save(function () {
      question = {
        title: 'Article Title',
        content: 'Article Content'
      };

      done();
    });
  });

  it('should not be able to save an question if logged in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/questions')
          .send(question)
          .expect(403)
          .end(function (questionSaveErr, questionSaveRes) {
            // Call the assertion callback
            done(questionSaveErr);
          });

      });
  });

  it('should not be able to save an question if not logged in', function (done) {
    agent.post('/api/questions')
      .send(question)
      .expect(403)
      .end(function (questionSaveErr, questionSaveRes) {
        // Call the assertion callback
        done(questionSaveErr);
      });
  });

  it('should not be able to update an question if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/questions')
          .send(question)
          .expect(403)
          .end(function (questionSaveErr, questionSaveRes) {
            // Call the assertion callback
            done(questionSaveErr);
          });
      });
  });

  it('should be able to get a list of questions if not signed in', function (done) {
    // Create new question model instance
    var questionObj = new Article(question);

    // Save the question
    questionObj.save(function () {
      // Request questions
      request(app).get('/api/questions')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single question if not signed in', function (done) {
    // Create new question model instance
    var questionObj = new Article(question);

    // Save the question
    questionObj.save(function () {
      request(app).get('/api/questions/' + questionObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', question.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single question with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/questions/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Article is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single question which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent question
    request(app).get('/api/questions/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No question with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should not be able to delete an question if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/questions')
          .send(question)
          .expect(403)
          .end(function (questionSaveErr, questionSaveRes) {
            // Call the assertion callback
            done(questionSaveErr);
          });
      });
  });

  it('should not be able to delete an question if not signed in', function (done) {
    // Set question user
    question.user = user;

    // Create new question model instance
    var questionObj = new Article(question);

    // Save the question
    questionObj.save(function () {
      // Try deleting question
      request(app).delete('/api/questions/' + questionObj._id)
        .expect(403)
        .end(function (questionDeleteErr, questionDeleteRes) {
          // Set message assertion
          (questionDeleteRes.body.message).should.match('User is not authorized');

          // Handle question error error
          done(questionDeleteErr);
        });

    });
  });

  it('should be able to get a single question that has an orphaned user reference', function (done) {
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

          // Save a new question
          agent.post('/api/questions')
            .send(question)
            .expect(200)
            .end(function (questionSaveErr, questionSaveRes) {
              // Handle question save error
              if (questionSaveErr) {
                return done(questionSaveErr);
              }

              // Set assertions on new question
              (questionSaveRes.body.title).should.equal(question.title);
              should.exist(questionSaveRes.body.user);
              should.equal(questionSaveRes.body.user._id, orphanId);

              // force the question to have an orphaned user reference
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

                    // Get the question
                    agent.get('/api/questions/' + questionSaveRes.body._id)
                      .expect(200)
                      .end(function (questionInfoErr, questionInfoRes) {
                        // Handle question error
                        if (questionInfoErr) {
                          return done(questionInfoErr);
                        }

                        // Set assertions
                        (questionInfoRes.body._id).should.equal(questionSaveRes.body._id);
                        (questionInfoRes.body.title).should.equal(question.title);
                        should.equal(questionInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  it('should be able to get a single question if not signed in and verify the custom "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create new question model instance
    var questionObj = new Article(question);

    // Save the question
    questionObj.save(function () {
      request(app).get('/api/questions/' + questionObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', question.title);
          // Assert the custom field "isCurrentUserOwner" is set to false for the un-authenticated User
          res.body.should.be.instanceof(Object).and.have.property('isCurrentUserOwner', false);
          // Call the assertion callback
          done();
        });
    });
  });

  it('should be able to get single question, that a different user created, if logged in & verify the "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create temporary user creds
    var _creds = {
      usernameOrEmail: 'questionowner',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create user that will create the Article
    var _questionOwner = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'temp@test.com',
      username: _creds.usernameOrEmail,
      password: _creds.password,
      provider: 'local',
      roles: ['admin', 'user']
    });

    _questionOwner.save(function (err, _user) {
      // Handle save error
      if (err) {
        return done(err);
      }

      // Sign in with the user that will create the Article
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

          // Save a new question
          agent.post('/api/questions')
            .send(question)
            .expect(200)
            .end(function (questionSaveErr, questionSaveRes) {
              // Handle question save error
              if (questionSaveErr) {
                return done(questionSaveErr);
              }

              // Set assertions on new question
              (questionSaveRes.body.title).should.equal(question.title);
              should.exist(questionSaveRes.body.user);
              should.equal(questionSaveRes.body.user._id, userId);

              // now signin with the test suite user
              agent.post('/api/auth/signin')
                .send(credentials)
                .expect(200)
                .end(function (err, res) {
                  // Handle signin error
                  if (err) {
                    return done(err);
                  }

                  // Get the question
                  agent.get('/api/questions/' + questionSaveRes.body._id)
                    .expect(200)
                    .end(function (questionInfoErr, questionInfoRes) {
                      // Handle question error
                      if (questionInfoErr) {
                        return done(questionInfoErr);
                      }

                      // Set assertions
                      (questionInfoRes.body._id).should.equal(questionSaveRes.body._id);
                      (questionInfoRes.body.title).should.equal(question.title);
                      // Assert that the custom field "isCurrentUserOwner" is set to false since the current User didn't create it
                      (questionInfoRes.body.isCurrentUserOwner).should.equal(false);

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
      Article.remove().exec(done);
    });
  });
});
