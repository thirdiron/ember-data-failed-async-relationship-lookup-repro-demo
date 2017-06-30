/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var thingRouter = express.Router();

  thingRouter.get('/', function(req, res) {
    res.send({
      'thing': []
    });
  });

  thingRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  thingRouter.get('/:id', function(req, res) {
    res.send({
      data: {
        type: 'things',
        id: req.params.id,
        attributes: {
          name: 'thing-' + req.params.id
        },
        relationships: {
          "related-things": {
            links: {
              related: '/api/related-things'
            }
          }
        }
      }
    });
  });

  thingRouter.put('/:id', function(req, res) {
    res.send({
      'thing': {
        id: req.params.id
      }
    });
  });

  thingRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/thing', require('body-parser').json());
  app.use('/api/things', thingRouter);
};
