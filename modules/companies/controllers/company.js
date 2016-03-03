const Company = require('../models/company');
const status = require('http-status');

exports.create = function (req, res) {
  var company = new Company();

  company.name = req.body.name;

  company.save(function (err) {
    if (err)
      res.send(err);

    res.status(status.CREATED)
       .json({ message: 'Company added!', data: company });
  });
};

exports.list = function (req, res) {
  Company.find(function (err, companies) {
    if (err)
      res.send(err);

    res.json(companies);
  });
};

exports.read = function (req, res) {
  Company.findById(req.params.id, function (err, company) {
    if (err)
      res.send(err);

    res.json(company);
  });
};

exports.update = function (req, res) {
  Company.findById(req.params.id, function (err, company) {
    if (err)
      res.send(err);

    company.name = req.body.name;

    company.save(function (err) {
      if (err)
        res.send(err);

      res.json(company);
    });
  });
};

exports.delete = function (req, res) {
  Company.findByIdAndRemove(req.params.id, function (err) {
    if (err)
      res.send(err);

  });

  res.json({ message: 'Company removed!' });
};
