const mongoose = require("mongoose");
const { Conference } = require("../schema/Conference")
const { User } = require("../schema/User")

// Create and Save a new conference
exports.createConference = (idU, topic, part, duration) => {
    // Validate request
    if (!topic) {
        console.log({ message: "Content can not be empty!" });
        return;
    }
    if (!part) {
        console.log({ message: "You must select for minimum a user!" });
        return;
    }

    // Create a Conference
    // to video call grp maybe those can help u 
    /****methode 1 */
    //var urlParams = new URLSearchParams(window.location.search);
    //let id = params.get("id"); // id from url 

    /****methode 2 */
    //const id = req.params.id

    const conference = new Conference({
        topic: topic, //mean title 
        organisedBy: idU, // get the user id from url .. the video call grp job 
        users: part, // mean participants 
        videocall: [idU], // get the user id from url .. the video call grp job 
        duration: duration // in minute 
    });


    // Save conference in the database
    conference
        .save(conference)
        .then(data => {
            /** add the id of the organiser in user feild */
            var newConferenceId = conference._id
            Conference.updateOne({ _id: newConferenceId }, { $push: { users: idU }, }).then(user => {
                    return console.log({
                        message: `${user.modifiedCount} updated successfully!`,

                    });
                })
                /** add the id of the Conference in user document */
            User.updateMany({ _id: { $in: part } }, { $push: { Conference: newConferenceId }, }).then(user => {
                return console.log({
                    message: `${user.modifiedCount} updated successfully!`,

                });
            })

        })
        .catch(err => {
            return console.log({
                message: err.message || "Some error occurred while creating the conference."
            });
        });
}


// Retrieve all conferences from the database.
exports.readConferenceAll = () => {
    Conference.find({ archive: false })
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log({
                message: err.message || "Some error occurred while retrieving conferences.",
            });
        });
};

// Find a single Conference with an id
exports.readConference = (id) => {
    //const id = params.id;
    if ((Conference.archive = true)) {
        console.log({ message: "Not found conference with id " + id });
        return;
    }
    Conference.findById(id)
        .then((data) => {
            if (!data) console.log({ message: "Not found conference with id " + id });
            else console.log(data);
        })
        .catch((err) => {
            console.log({ message: "Error retrieving conference with id = " + id });
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

    Conference.findByIdAndUpdate(id, newConf, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                return console.log({
                    message: `Cannot update Conference with id=${id}. Maybe Conference does not exist!`,
                });
            } else console.log({ message: "Conference was updated successfully." });
        })
        .catch((err) => {
            return console.log({
                message: "Error updating Conference with id = " + id,
            });
        });
};

// Delete a Conference with the specified id in the request
exports.deleteConference = (id) => {
    //const id = req.params.id;

    Conference.findByIdAndUpdate(id, { archive: true })
        .then((data) => {
            if (!data) {
                return console.log({
                    message: `Cannot delete conference with id=${id}. Maybe conference does not exist!`,
                });
            } else {
                return console.log({
                    message: "conference was deleted successfully!",
                });
            }
        })
        .catch((err) => {
            return console.log({
                message: "Could not delete conference with id = " + id,
            });
        });
};

// Delete all conferences from the database.
exports.deleteConferenceAll = () => {
    Conference.updateMany({})
        .then((data) => {
            return console.log({
                message: `${data.modifiedCount} conferences were deleted successfully!`,
            });
        })
        .catch((err) => {
            return console.log({
                message: err.message || "Some error occurred while removing all conferences.",
            });
        });
};

// get the joined users and put them in conference document

exports.JoinedToConference = (idC, idU) => {
    //const id = req.params.id;
    Conference.findByIdAndUpdate(idC, { $push: { videoCall: idU } })

    .then((data) => {
            if (!data) {
                return console.log({
                    message: `Cannot find conference with id = ${idC}. Maybe conference does not exist!`,
                });
            } else
                return console.log({
                    message: `The user with id = ${idU}. has joined the conference!`,
                });
        })
        .catch((err) => {
            return console.log({
                message: "Error during joining the conference with id = " + idC,
            });
        });
};

// get the joined users and pull them from conference document
exports.LeaveTheConference = (idC, idU) => {
    //const id = req.params.id;

    Conference.findByIdAndUpdate(idC, { $pull: { videoCall: idU } })
        .then((data) => {
            if (!data) {
                return console.log({
                    message: `Cannot find conference with id = ${idC}. Maybe conference does not exist!`,
                });
            } else
                return console.log({
                    message: `The user with id = ${idU}. has left the conference!`,
                });
        })
        .catch((err) => {
            return console.log({
                message: "Error during leaving the conference with id = " + idC,
            });
        });
};