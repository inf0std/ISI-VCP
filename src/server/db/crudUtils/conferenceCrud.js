const mongoose = require("mongoose");
const { Conference } = require("../schema/Conference")
const { User } = require("../schema/User")
const { Reunion } = require("../schema/Reunion")
    // Create and Save a new conference
exports.createConference = (idU, topic, part, duration, Date_begin) => {
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
        duration: duration, // in minute 
        Date_begin: Date_begin // in 'yyyy-mm-dd'
    });


    // Save conference in the database
    conference
        .save(conference)
        .then(data => {
            /** add the id of the organiser in user feild */
            var newConferenceId = conference._id
            Conference.updateOne({ _id: newConferenceId }, { $push: { users: idU }, }, { missed: false }).then(user => {
                    return console.log({
                        message: `${user.modifiedCount} updated successfully!`,

                    });
                })
                /** add the id of the Conference in user document */
            User.updateMany({ $or: [{ _id: { $in: data.users } }, { _id: idU }] }, { $push: { conferences: newConferenceId }, }).then(user => {
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
/*
// get the joined users and pull them from conference document
// i think it's nor necessairy to use this 
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

*/
// the function to set if the Conference is missed or not compared with date now
// u have to run this function every time u wanna get the events 
exports.SetEvent = () => {
    var query = Conference.find({}).select('_id');
    query.exec(function(err, ids) {
        if (err) return console.log(err)
        else {
            const set1 = [...new Set(ids)];
            console.log(set1)
            const set2 = set1.map(mongoose.Types.ObjectId); //string to objectId
            console.log(set2)
            set1.forEach((item) => {
                var query = Conference.findOne({ _id: item }, { 'Date_begin': 1, 'duration': 1 }, function(err, data) {
                    const dt0 = new Date(data.Date_begin); //date of the conference 
                    console.log(dt0) // show date of confer
                    let dt1 = new Date(); // date now
                    let dur = data.duration // duration of the conference
                    const dt2 = new Date(dt0.getTime() + dur * 60 * 1000) // date of the conference + duration
                    console.log(dt2) // show the date after adding the duration
                    const result = dt2 - dt1 //  date now - date result after add operation 
                    console.log(result); // show the resul to check if it's negative or not 

                    if (result > 0) { // if the result greater than 0 then missed = false mean it is programmed
                        return console.log(` programmed!`),
                            Conference.updateOne(item, { $set: { missed: false } }, function(err, data) {
                                if (err) console.log(err)
                                else console.log(`${data.modifiedCount}`)
                            })


                    } else if (result <= 0) { // if the result less than 0 then missed = true mean it is missed
                        Conference.updateOne(item, { $set: { missed: true } }, function(err, data) {
                            if (err) console.log(err)
                            else console.log(`${data.modifiedCount}`)
                        })
                    }
                })
            });
        }

    })
}


//getUserProgrammedEvents 
exports.getUserProgrammedEvents = (idU) => {
    User.findById({ _id: idU }, { 'conferences': 1 }, function(err, ids) {
        if (err) console.log(err)
        else {
            const set1 = ids.conferences.map(x => x.toString()); // objectId to string
            let vd = Conference.users // get the users of this conference
                //check if the user is in the users conference and missed = false 
            const query1 = Conference.find({ $and: [{ _id: { $in: set1 } }, { idU: { $in: vd } }, { 'missed': false }] }, { 'topic': 1, 'Date_begin': 1, 'duration': 1 }, function(err, res) {
                if (err) console.log(err)
                else
                    console.log(`Your programmed Conferences are :  ${res}
                    ////////////////////////////////
                    `)
            })
        }
    })
    User.findById({ _id: idU }, { 'reunions': 1 }, function(err, ids) {
        if (err) console.log(err)
        else {
            const set1 = ids.reunions.map(x => x.toString()); // objectId to string
            let vdr = Reunion.participantsName;

            const query2 = Reunion.find({ $and: [{ _id: { $in: set1 } }, { idU: { $in: vdr } }, { 'missed': false }] }, { 'reunion_Name': 1, 'Date_begin': 1, 'Duration': 1 }, function(err, res) {
                if (err) console.log(err)
                else
                    console.log(`Your programmed Reunions are :  ${res}
                    ////////////////////////////////
                    `)
            })
        }
    })

}

//getUserMissedEvents 
exports.getUserMissedEvents = (idU) => {
    User.findById({ _id: idU }, { 'conferences': 1 }, function(err, ids) {
        if (err) console.log(err)
        else {
            const set1 = ids.conferences.map(x => x.toString()); // objectId to string
            let vd = Conference.videocall //get the users who actually particpate in the conference 
                //check if the user is in the users who participate the conference and missed = true
            const query3 = Conference.find({ $and: [{ _id: { $in: set1 } }, { idU: { $in: vd } }, { 'missed': true }] }, { 'topic': 1, 'Date_begin': 1, 'duration': 1 }, function(err, res) {
                if (err) console.log(err)
                else
                    console.log(`Your missed Conferences are :  ${res}
                    ////////////////////////////////
                    `)
            })
        }
    })
    User.findById({ _id: idU }, { 'reunion': 1 }, function(err, ids) {
        if (err) console.log(err)
        else {
            const set1 = ids.reunions.map(x => x.toString()); // objectId to string
            let vdr = Reunion.videocall;
            const query4 = Reunion.find({ $and: [{ _id: { $in: set1 } }, { idU: { $in: vdr } }, { 'missed': true }] }, { 'reunion_Name': 1, 'Date_begin': 1, 'Duration': 1 }, function(err, res) {
                if (err) console.log(err)
                else
                    console.log(`Your missed Reunions are :  ${res}
                                 ////////////////////////////////
                                 `)
            })

        }
    })

}