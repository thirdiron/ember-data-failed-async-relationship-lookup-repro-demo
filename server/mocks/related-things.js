/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var relatedThingsRouter = express.Router();
  var broken = true;

  relatedThingsRouter.get('/', function(req, res) {
    if (broken) {
      res.status(500)
        .send({
          errors:[
            {
              id: 'server-error',
              status: 500,
              detail: 'An error happened'
            }
          ]
        });
    } else {
      res.send({
        data: [
          {
            id: 'related-thing-1',
            type: 'related-things',
            attributes: {
              name: 'related-thing-1',
            }
          }
        ]
      });
    }
  });

  relatedThingsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  relatedThingsRouter.get('/:id', function(req, res) {
    res.send({
      'data': {
        type: 'related-things',
        id: req.params.id,
        attributes: {
          name: 'related-thing' + req.params.id
        }
      }
    });
  });

  relatedThingsRouter.put('/:id', function(req, res) {
    res.send({
      'related-things': {
        id: req.params.id
      }
    });
  });

  relatedThingsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/related-things', require('body-parser').json());
  app.use('/api/related-things', relatedThingsRouter);
  app.post('/api/fix', function(req, res, next) {
    console.log('Fix endpoint called');
    broken = false;
    res.send({});
  });
};
