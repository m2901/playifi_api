const Boom = require('boom');
const _ = require('lodash');
const ErrorTypes = {
  SomethingWentWrong: 'SomethingWentWrong',
  InvalidDetails: 'InvalidDetails',
  InvalidCredentials: 'InvalidCredentials',
  ExpireToken: 'ExpireToken',
  ValueNotFound: 'ValueNotFound',
  ValueAlreadyExists: 'ValueAlreadyExists',
  UserNotAuthorized: 'UserNotAuthorized'
};

module.exports = {
  ...ErrorTypes,
  handleError
};

function handleError(err) {
  if (process.env.NODE_ENV === 'development') {
    console.log(err);
  }
  let message = '';
  switch (err.type) {
    case ErrorTypes.InvalidCredentials:
      message = 'Invalid Username and Password';
      _handleBadRequest(message);
      break;
    case ErrorTypes.InvalidDetails:
      const messageArray = Array.isArray(err.details.message) ? err.details.message : [err.details.message];
      message = 'Invalid parameter(s)';
      const messageData = _.map(messageArray, ({message, context, context: {key}}) => ({message, key, context}));
      _handleBadRequest(message, messageData);
      break;
    case ErrorTypes.ExpireToken:
      message = 'Token is Expired';
      _handleNotAuthorized(message);
      break;
    case ErrorTypes.ValueNotFound:
      message = `${err.details.value} not found`;
      _handleNotFound(message);
      break;
    case ErrorTypes.ValueAlreadyExists:
      message = `${err.details.value} already exists`;
      _handleBadRequest(message);
      break;
    case ErrorTypes.UserNotAuthorized:
      message = `User not authorized`;
      _handleNotAuthorized(message);
      break;
    default:
      _handleSomethingWentWrong(err);
  }
}

function _handleSomethingWentWrong(err) {
  throw Boom.badImplementation(err || 'Something went wrong');
}

function _handleBadRequest(message, errData = null) {
  throw Boom.badRequest(message, errData);
}

function _handleNotAuthorized(message) {
  throw Boom.unauthorized(message);
}

function _handleNotFound(message) {
  throw Boom.notFound(message);
}
