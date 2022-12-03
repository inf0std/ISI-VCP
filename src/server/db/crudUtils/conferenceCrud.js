const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const { Conference } = require("../schemas/conference");
var MongoClient = require("mongodb").MongoClient;

// Create and Save a new conference
exports.createConference = (topic, organisedBy, users, createdAt) => {
  // Validate request
  if (!topic) {
    console.log({ message: "Content can not be empty!" });
    return;
  }
  if (!users) {
    console.log({ message: "You must select for minimum a user!" });
    return;
  }

  // Create a Conference

  /****methode 1 */
  //var urlParams = new URLSearchParams(window.location.search);
  //let id = params.get("id"); // id from url

  /****methode 2 */
  //const id = req.params.id

  let id = ["6381ea6cc4f9b2010165e23b"]; // set ur id here just an exemple
  const conference = new Conference({
    topic: topic,
    organisedBy: id,
    users: [id, users],
    videocall: [id], // get the joined id not seted yet
  });

  // Save conference in the database
  conference
    .save(conference)

    .then((conference) => {
      conference.populate({ path: "users" }).then((conference) => {
        console.log({
          message: "conference added",
          conference,
        });
        return console.log(conference, "success");
      });
    })
    .catch((err) => {
      return console.log({
        message:
          err.message || "Some error occurred while creating the conference.",
      });
    });
};

// Retrieve all conferences from the database.
exports.readConferenceAll = () => {
  Confer.find({ archive: false })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log({
        message:
          err.message || "Some error occurred while retrieving conferences.",
      });
    });
};

// Find a single Conference with an id
exports.readConference = (id) => {
  //const id = params.id;
  if ((Confer.archive = true)) {
    console.log({ message: "Not found conference with id " + id });
    return;
  }
  Confer.findById(id)
    .then((data) => {
      if (!data) console.log({ message: "Not found conference with id " + id });
      else console.log(data);
    })
    .catch((err) => {
      console.log({ message: "Error retrieving conference with id=" + id });
    });
};

// Update a Conference by the id in the request
exports.updateConference = (id, newConf) => {
  if (!newConf || !id) {
    return console.log({
      message: "Data to update can not be empty!",
    });
  }

  //const id = req.params.id;

  Confer.findByIdAndUpdate(id, newConf, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        return console.log({
          message: `Cannot update Conference with id=${id}. Maybe Conference was not found!`,
        });
      } else console.log({ message: "Conference was updated successfully." });
    })
    .catch((err) => {
      return console.log({
        message: "Error updating Conference with id=" + id,
      });
    });
};

// Delete a Conference with the specified id in the request
exports.deleteConference = (id) => {
  //const id = req.params.id;

  Confer.findByIdAndUpdate(id, { archive: true })
    .then((data) => {
      if (!data) {
        return console.log({
          message: `Cannot delete conference with id=${id}. Maybe conference was not found!`,
        });
      } else {
        return console.log({
          message: "conference was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      return console.log({
        message: "Could not delete conference with id=" + id,
      });
    });
};

// Delete all conferences from the database.
exports.deleteConferenceAll = () => {
  Confer.updateMany({})
    .then((data) => {
      return console.log({
        message: `${data.modifiedCount} conferences were deleted successfully!`,
      });
    })
    .catch((err) => {
      return console.log({
        message:
          err.message || "Some error occurred while removing all conferences.",
      });
    });
};

// get the joined users and put them in conference document

exports.JoinedToConference = () => {
  //const id = req.params.id;
  //let id = /*req.params.id */ ['6388e49a6f3b0b10350b6533']; // set ur id here
  //let IdU = /*/req.body.IdU */ ['6381ea6cc4f9b2010165e23b']; // set ur id here
  Confer.findByIdAndUpdate(id, { $push: { users: IdU } })

    .then((data) => {
      if (!data) {
        return console.log({
          message: `Cannot delete conference with id=${id}. Maybe conference was not found!`,
        });
      } else
        return console.log({
          message: `The user with id=${IdU}. has joined the conference!`,
        });
    })
    .catch((err) => {
      return console.log({
        message: "Error updating Conference with id=" + id,
      });
    });
};

// get the joined users and pull them from conference document
exports.LeaveTheConference = () => {
  //const id = req.params.id;
  // let id = /*req.params.id */ ['6388e49a6f3b0b10350b6533']; // set ur id here
  // let IdU = /*/req.body.IdU */ ['6381ea6cc4f9b2010165e23b']; // set ur id here
  Confer.findByIdAndUpdate(id, { $pullAll: { users: IdU } })
    .then((data) => {
      if (!data) {
        return console.log({
          message: `Cannot delete conference with id=${id}. Maybe conference was not found!`,
        });
      } else
        return console.log({
          message: `The user with id=${IdU}. has left the conference!`,
        });
    })
    .catch((err) => {
      return console.log({
        message: "Error updating Conference with id=" + id,
      });
    });
};
