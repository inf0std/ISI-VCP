const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../server/db/schema/User');

router.get('/user/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(user);
  });
});

module.exports = router;