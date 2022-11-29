const mongoose = require('mongoose');
const { validationResult } = require('express-validator')
const { Conference } = require("../schemas/conference")
var MongoClient = require('mongodb').MongoClient;


// Create and Save a new conference
exports.createConversation = (topic, organisedBy, users, createdAt) => {
    // Validate request
    if (!topic) {
        console.log({ message: "Content can not be empty!" });
        return;
    }

    // Create a Conference
    const conference = new Conference({
        topic: topic,
        organisedBy: organisedBy, // get the user id from authentication not seted yet
        users: users,
        //videocall: videocall, // get the user id not seted yet
        createdAt: createdAt
    });

    // Save conference in the database
    conference
        .save(conference)
    return console.log("success", conference)

    .catch(err => {
        return console.log({
            message: err.message || "Some error occurred while creating the conference."
        });
    });
};
// Retrieve all conferences from the database.
exports.readConferenceAll = () => {
    const topic = query.topic;
    var condition = topic ? { topic: { $regex: new RegExp(topic), $options: "i" } } : {};

    Confer.find(condition)
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log({
                message: err.message || "Some error occurred while retrieving conferences."
            });
        });
};

// Find a single Conference with an id
exports.readConference = (id) => {
    //const id = params.id;

    Confer.findById(id)
        .then(data => {
            if (!data)
                console.log({ message: "Not found conference with id " + id });
            else console.log(data);
        })
        .catch(err => {
            console.log

                ({ message: "Error retrieving conference with id=" + id });
        });
};

// Update a Conference by the id in the request
exports.updateConference = (id, newConf) => {
    newConf = typeof conferSchema
    if (!newConf || !id) {
        return console.log({
            message: "Data to update can not be empty!"
        });
    }

    //const id = req.params.id;

    Confer.findByIdAndUpdate(id, newConf, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                return console.log({
                    message: `Cannot update Conference with id=${id}. Maybe Conference was not found!`
                });
            } else console.log({ message: "Conference was updated successfully." });
        })
        .catch(err => {
            return console.log({
                message: "Error updating Conference with id=" + id
            });
        });
};

// Delete a Conference with the specified id in the request
exports.deleteConference = (id) => {
    //const id = req.params.id;

    Confer.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                return console.log({
                    message: `Cannot delete conference with id=${id}. Maybe conference was not found!`
                });
            } else {
                return console.log({
                    message: "conference was deleted successfully!"
                });
            }
        })
        .catch(err => {
            return console.log({
                message: "Could not delete conference with id=" + id
            });
        });
};

// Delete all conferences from the database.
exports.deleteConferenceAll = () => {
    Confer.deleteMany({})
        .then(data => {
            return console.log({
                message: `${data.deletedCount} conferences were deleted successfully!`
            });
        })
        .catch(err => {
            return console.log({
                message: err.message || "Some error occurred while removing all conferences."
            });
        });
};





// get the joined users and put them in conference document