'use strict';

const Hapi = require('hapi');
const _ = require('lodash');

global.Path = require('./config/path');
global.Utils = require('./config/utils');
global.Models = require('./config/models');

const Settings = require('./config/settings');
const routes = require('./config/routes')();
const Services = require('./config/services')();
_.map(Services, (value) => {
   global[value.name] = value.body();
});

const {debug, cors} = Settings[Settings.env].server;
const server = Hapi.server({
  port: Settings.port,
  debug,
  routes: {cors}
});

async function start() {

  await server.register([
    {
      plugin: require('inert')
    },
    {
      plugin: require('mrhorse'),
      options: {
        policyDirectory: __dirname + '/config/policies'
      }
    }
    ]);

  routes.push({
    method: 'GET',
    path: '/assets/images/{param*}',
    handler: {
      directory: {
        path: 'assets/images/'
      }
    }
  });

  server.route(routes);

  const preResponse = function (request, h) {

    const response = request.response;
    if (!response.isBoom) {
      return h.continue;
    }
    if (response.data) {
      response.output.payload.data = response.data;
    }
    return h.continue;
  };
  server.ext('onPreResponse', preResponse);

  await server.start();
  console.log('Server running at:', server.info.uri);
}

try {
  start();
} catch (err) {
  console.log(err);
  process.exit(1);
}