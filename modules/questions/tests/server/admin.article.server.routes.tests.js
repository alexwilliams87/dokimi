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
describe('Article Admin CRUD tests', function () {
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

    // Save a user to the test db and create new question
    user.save(function () {
      question = {
        title: 'Article Title',
        content: 'Article Content'
      };

      done();
    });
  });

  it('should be able to save an question if logged in', function (done) {
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

        // Save a new question
        agent.post('/api/questions')
          .send(question)
          .expect(200)
          .end(function (questionSaveErr, questionSaveRes) {
            // Handle question save error
            if (questionSaveErr) {
              return done(questionSaveErr);
            }

            // Get a list of questions
            agent.get('/api/questions')
              .end(function (questionsGetErr, questionsGetRes) {
                // Handle question save error
                if (questionsGetErr) {
                  return done(questionsGetErr);
                }

                // Get questions list
                var questions = questionsGetRes.body;

                // Set assertions
                (questions[0].user._id).should.equal(userId);
                (questions[0].title).should.match('Article Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to update an question if signed in', function (done) {
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

        // Save a new question
        agent.post('/api/questions')
          .send(question)
          .expect(200)
          .end(function (questionSaveErr, questionSaveRes) {
            // Handle question save error
            if (questionSaveErr) {
              return done(questionSaveErr);
            }

            // Update question title
            question.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing question
            agent.put('/api/questions/' + questionSaveRes.body._id)
              .send(question)
              .expect(200)
              .end(function (questionUpdateErr, questionUpdateRes) {
                // Handle question update error
                if (questionUpdateErr) {
                  return done(questionUpdateErr);
                }

                // Set assertions
                (questionUpdateRes.body._id).should.equal(questionSaveRes.body._id);
                (questionUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an question if no title is provided', function (done) {
    // Invalidate title field
    question.title = '';

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

        // Save a new question
        agent.post('/api/questions')
          .send(question)
          .expect(422)
          .end(function (questionSaveErr, questionSaveRes) {
            // Set message assertion
            (questionSaveRes.body.message).should.match('Title cannot be blank');

            // Handle question save error
            done(questionSaveErr);
          });
      });
  });

  it('should be able to delete an question if signed in', function (done) {
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

        // Save a new question
        agent.post('/api/questions')
          .send(question)
          .expect(200)
          .end(function (questionSaveErr, questionSaveRes) {
            // Handle question save error
            if (questionSaveErr) {
              return done(questionSaveErr);
            }

            // Delete an existing question
            agent.delete('/api/questions/' + questionSaveRes.body._id)
              .send(question)
              .expect(200)
              .end(function (questionDeleteErr, questionDeleteRes) {
                // Handle question error error
                if (questionDeleteErr) {
                  return done(questionDeleteErr);
                }

                // Set assertions
                (questionDeleteRes.body._id).should.equal(questionSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a single question if signed in and verify the custom "isCurrentUserOwner" field is set to "true"', function (done) {
    // Create new question model instance
    question.user = user;
    var questionObj = new Article(question);

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

        // Save a new question
        agent.post('/api/questions')
          .send(question)
          .expect(200)
          .end(function (questionSaveErr, questionSaveRes) {
            // Handle question save error
            if (questionSaveErr) {
              return done(questionSaveErr);
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

                // Assert that the "isCurrentUserOwner" field is set to true since the current User created it
                (questionInfoRes.body.isCurrentUserOwner).should.equal(true);

                // Call the assertion callback
                done();
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
