var express = require('express');
var factoryStore = require('json-fs-store')('store/companies');
var router = express.Router();

/* GET a list of factories */
router.get('/', function(req, res, next) {
    factoryStore.list(function(err, factories) {
        if (err) throw err;

        function checkCompany(company) {
          return company.company_type === 'factory';
        }
        res.json(factories.filter(checkCompany));
    });
});

/* Get a single factory */
router.get('/:id', function(req, res, next) {
    factoryStore.load(req.params.id, function(err, factory) {
        if (err) throw err;

        res.json(factory);
    });
});

/* Create a factory resource */
router.post('/', function(req, res, next) {
    if (!req.body) return res.sendStatus(400);

    var newFactory = {
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        city: req.body.city,
        state: req.body.state,
        company_type: "factory"
    };
    factoryStore.add(newFactory, function(err) {
        if (err) throw err;

        res.json(newFactory);
    });
});

/* Remove a factory resource */

router.delete('/:id', function(req, res, next) {
  factoryStore.remove(req.params.id, function(err) {
    if(err) throw err;
    res.json(true);
  });
});

module.exports = router;
