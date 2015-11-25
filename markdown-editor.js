/*jshint esnext: true */
/*global require, __dirname, console */
'use strict';

const Hapi = require('hapi'),
  Path = require('path'),
  Vision = require('vision'),
  Inert = require('inert'),
  Handlebars = require('handlebars'),
  Hoek = require('hoek'),
  Marky = require('marky-markdown');

const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 8000
});

server.register([Vision, Inert], function (err) {
  Hoek.assert(!err, err);
  server.views({
    engines: {
      html: Handlebars
    },
    relativeTo: __dirname,
    path: 'templates'
  });
});

server.route([
  {
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      return reply.view('editor');
    }
  },
  {
    method: 'POST',
    path: '/markdown',
    handler: function (request, reply) {
      var input2markdown = new Marky(request.payload.markdown).html();
      return reply(input2markdown);
    }
  },
  {
    method: 'GET',
    path: '/js/{path*}',
    config: {
      handler: {
        directory: {
          path: 'js'
        }
      },
      id: 'js'
    }
  },
  {
    method: 'GET',
    path: '/css/{path*}',
    config: {
      handler: {
        directory: {
          path: 'css'
        }
      },
      id: 'css'
    }
  }
]);

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
