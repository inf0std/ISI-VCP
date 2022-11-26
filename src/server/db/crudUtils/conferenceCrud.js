const mongoose = require('mongoose');
const { validationResult } = require('express-validator')
const { Conference } = require("../schemas/conference")
var MongoClient = require('mongodb').MongoClient;


// Create and Save a new conference
exports.create = (req, res) => {
    // Validate request
    if (!req.body.topic) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Conference
    const conference = new Conference({
        topic: req.body.topic,
        organisedBy: req.body.organisedBy, // get the user id from authentication not seted yet
        users: req.body.users,
        videocall: req.body.videocall, // get the user id not seted yet
        createdAt: req.body.CreatedAt
    });

    // Save conference in the database
    conference
        .save(conference)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the conference."
            });
        });
};

// Retrieve all conferences from the database.
exports.findAll = (req, res) => {
    const topic = req.query.topic;
    var condition = topic ? { topic: { $regex: new RegExp(topic), $options: "i" } } : {};

    Conference.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving conferences."
            });
        });
};

// Find a single Conference with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Conference.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found conference with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving conference with id=" + id });
        });
};

// Update a Conference by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Conference.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Conference with id=${id}. Maybe Conference was not found!`
                });
            } else res.send({ message: "Conference was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Conference with id=" + id
            });
        });
};

// Delete a Conference with the specified id in the request
exports.deleteId = (req, res) => {
    const id = req.params.id;

    Conference.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete conference with id=${id}. Maybe conference was not found!`
                });
            } else {
                res.send({
                    message: "conference was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete conference with id=" + id
            });
        });
};

// Delete all conferences from the database.
exports.deleteAll = (req, res) => {
    Conference.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} conferences were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all conferences."
            });
        });
};




// get the joined users and put them in conference document