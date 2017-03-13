'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Exams Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin', 'staff'],
    allows: [{
      resources: '/api/exams',
      permissions: '*'
    }, {
      resources: '/api/exams/:examId',
      permissions: '*'
    }, {
      resources: '/api/exams/ownByMe',
      permissions: 'get'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/exams/candidate/:examCandidateId',
      permissions: ['get', 'post']
    },
    {
      resources: '/api/exams/candidate',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/exams',
      permissions: ['get']
    }, {
      resources: '/api/exams/:examId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Exams Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an exam is being processed and the current user created it then allow any manipulation
  if (req.exam && req.user && req.exam.user && req.exam.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};

/**
 * Just for admin & owner
 */
exports.isJustOwner = function (req, res, next) {
  if (req.user.roles.indexOf('admin') !== -1) {
    return next();
  }

  // If an form is being processed and the current user created it then allow any manipulation
  if (req.exam && req.user && req.exam.owner && req.exam.owner.id === req.user.id) {
    return next();
  }
  else {
    return res.status(403).json({
      message: 'User is not authorized'
    });
  }
};
