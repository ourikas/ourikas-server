const User = require('../models/user');
const status = require('http-status');

exports.create = function (req, res) {
  var user = new User();

  user.username = req.body.username;
  user.password = req.body.password;

  user.save(function (err) {
    if (err)
      return res.send(err);

    res.status(status.CREATED)
       .json({ message: 'User added!', data: user });
  });
};

exports.list = function (req, res) {
  User.find(function (err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};

exports.read = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err)
      res.send(err);

    res.json(user);
  });
};

exports.update = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err)
      res.send(err);

    user.name = req.body.name;

    user.save(function (err) {
      if (err)
        res.send(err);

      res.json(user);
    });
  });
};

exports.delete = function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: 'User removed!' });
    }
  });

};
