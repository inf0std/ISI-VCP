const mongoose = require("mongoose");
const { Conference } = require("../schema/Conference")
const { User } = require("../schema/User")
const { Reunion } = require("../schema/Reunion")

// Create and Save a new conference
const createConference = async(idU, topic, users, duration, Date_begin) => {
    console.log("idU", idU);
    if (!topic || !users || !duration || !Date_begin) {
        return ("All feilds must be full!");
    } else {
        const conference = new Conference({
            topic: topic, //mean title 
            organisedBy: idU, // get the user id from url .. the video call grp job 
            users: users, // mean participants 
            videocall: [idU], // get the user id from url .. the video call grp job 
            duration: duration, // in minute 
            Date_begin: Date_begin // in 'yyyy-mm-dd'
        });
        return conference
            .save(conference)
            .then(async(conference) => {
                var newConferenceId = conference._id
                Conference.updateOne({ _id: newConferenceId }, { $push: { users: idU }, }, { missed: false }).then(user => {
                        console.log({
                            message: `${user.modifiedCount} updated successfully!`,
                        });
                    })
                    // add the id of the Conference in user document 
                User.updateMany({ $or: [{ _id: { $in: conference.users } }, { _id: idU }] }, { $push: { conferences: newConferenceId }, }).then(user => {
                    console.log({
                        message: `${user.modifiedCount} updated successfully!`,
                    });
                });
                return conference;
            })
            .catch((err) => {
                console.log({
                    message: err.message || "Some error occurred while saving the user.",
                });
            });
        /** add the id of the organiser in user feild */



    }
}



// Retrieve all conferences from the database.
const readConferenceAll = () => {
    return Conference.find({ archive: false })
        .then((Conferences) => {
            return Conferences;
        })
        .catch((err) => {
            console.log({
                message: err.message || "Some error occurred while retrieving conferences.",
            });
        });
};

// Find a single Conference with an id
const readConference = (id) => {
    //const id = params.id;
    if ((Conference.archive = true)) {
        console.log({ message: "Not found conference with id " + id });
        return;
    }
    return Conference.findById(id)
        .then((data) => {
            if (!data) console.log({ message: "Not found conference with id " + id });
            else console.log(data);
        })
        .catch((err) => {
            console.log({ message: "Error retrieving conference with id = " + id });
        });
};

// Update a Conference by the id in the request
const updateConference = async(id, newConf) => {
    if (!newConf) {
        return console.log({
            message: "Data to update can not be empty!",
        });
    }
    //const id = req.params.id;
    return Conference.findByIdAndUpdate(id, newConf)
        .then(async(Conferences) => {
            if (!Conferences) {
                return console.log({
                    message: `Cannot update Conference with id=${id}. Maybe Conference does not exist!`,
                });
            } else console.log({ message: "Conference was updated successfully." });
            return Conferences;
        })
        .catch((err) => {
            return console.log({
                message: "Error updating Conference with id = " + id,
            });
        });
};

// Delete a Conference with the specified id in the request
const deleteConference = async(id) => {
    //const id = req.params.id;
    return Conference.findOne({ _id: id }).then(conference => {

        if (conference.archive == true) {
            console.log({
                message: `Cannot delete conference with id=${id}. because the conference has already deleted!`,
            })
        } else {
            Conference.findByIdAndUpdate(id, { archive: true })
                .then(async(Conferences) => {
                    if (!Conferences) {
                        console.log({
                            message: `Cannot delete conference with id=${id}. Maybe conference does not exist!`,
                        });
                    } else {
                        console.log({
                            message: "conference was deleted successfully!",
                        });
                    }

                })
                .catch((err) => {
                    return console.log({
                        message: "Could not delete conference with id = " + id,
                    });
                });
        }
        return 'conference was deleted successfully!';
    })

};

// Delete all conferences from the database.
const deleteConferenceAll = async() => {
    return Conference.countDocuments({ archive: false }).then(conference => {
        if (conference > 0)
            Conference.updateMany({ archive: true })
            .then(async(data) => {
                console.log({
                    message: `${data.modifiedCount} conferences were deleted successfully!`,
                });

            })
        else {
            return (`you have 0 conference to delete`)
        }
        return `${conference} conferences were deleted successfully!`
    });
};

// get the joined users and put them in conference document

const JoinedToConference = async(idC, idU) => {
    //const id = req.params.id;
    return Conference.findByIdAndUpdate(idC, { $push: { videocall: idU } })

    .then(data => {
            if (!data) {
                return ({
                    message: `Cannot find conference with id=${idC}. Maybe conference does not exist!`
                });

            } else return ({ message: `You have joined the conference!` });
        })
        .catch(err => {
            return console.log({
                message: "Error during joining the conference with id=" + idC
            });
        });
}

// get the joined users and pull them from conference document
// i think it's nor necessairy to use this 
const LeaveTheConference = async(idC, idU) => {
    //const id = req.params.id;
    return Conference.findByIdAndUpdate(idC)
        .then(data => {
            if (!data) {
                return ({
                    message: `Cannot find conference with id=${idC}. Maybe conference does not exist!`
                });
            } else return ({ message: `You have left the conference!` });
        })
        .catch(err => {
            return ({
                message: "Error during leaving the conference with id=" + idC
            });
        });
}

// the function to set if the Conference is missed or not compared with date now
// u have to run this function every time u wanna get the events 
const SetEventC = async() => {
    var query = Conference.find({}).select('_id');
    query.exec(function(err, ids) {
        if (err) console.log(err)
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
                        return console.log(` missed!`),
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
const SetEventR = async() => {
    var query = Reunion.find({}).select('_id');
    query.exec(function(err, ids) {
        if (err) console.log(err)
        else {
            const set1 = [...new Set(ids)];
            console.log(set1)
            const set2 = set1.map(mongoose.Types.ObjectId); //string to objectId
            console.log(set2)
            set1.forEach((item) => {
                var query = Reunion.findOne({ _id: item }, { 'Date_begin': 1, 'Duration': 1 }, function(err, data) {
                    const dt0 = new Date(data.Date_begin); //date of the Reunion 
                    console.log(dt0) // show date of confer
                    let dt1 = new Date(); // date now
                    let dur = data.Duration // duration of the Reunion
                    const dt2 = new Date(dt0.getTime() + dur * 60 * 1000) // date of the Reunion + duration
                    console.log(dt2) // show the date after adding the duration
                    const result = dt2 - dt1 //  date now - date result after add operation 
                    console.log(result); // show the resul to check if it's negative or not 

                    if (result > 0) { // if the result greater than 0 then missed = false mean it is programmed
                        return console.log(` programmed!`),
                            Reunion.updateOne(item, { $set: { missed: false } }, function(err, data) {
                                if (err) console.log(err)
                                else console.log(`${data.modifiedCount}`)
                            })

                    } else if (result <= 0) { // if the result less than 0 then missed = true mean it is missed
                        return console.log(` missed!`),
                            Reunion.updateOne(item, { $set: { missed: true } }, function(err, data) {
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
const getUserProgrammedEventsConference = async(idU) => {

    return User.findById({ _id: idU }, { 'conferences': 1 }).then(ids => {
        if (!ids)
            return ('You have nothing missed')
        else {

            const set1 = ids.conferences.map(x => x.toString()); // objectId to string
            let vd = Conference.users // get the users of this conference
                //check if the user is in the users conference and missed = false 
            return Conference.find({ $and: [{ _id: { $in: set1 } }, { idU: { $in: vd } }, { 'missed': false }] }, { 'topic': 1, 'Date_begin': 1, 'duration': 1 }).then(events => {
                return ("Your programmed Conferences are : " + events)

                // return ids.events;
            })
        }
    })
}
const getUserProgrammedEventsReunion = async(idU) => {
    return User.findById({ _id: idU }, { 'reunions': 1 }).then(ids => {
        if (!ids)
            return ('You have nothing missed')
        else {
            const set1 = ids.reunions.map(x => x.toString()); // objectId to string
            let vdr = Reunion.participantsName;

            return Reunion.find({ $and: [{ _id: { $in: set1 } }, { idU: { $in: vdr } }, { 'missed': false }] }, { 'reunion_Name': 1, 'Date_begin': 1, 'Duration': 1 }).then(events => {
                return ("Your programmed Reunions are : " + events)

            })
        }
    })

}

//getUserMissedEvents 
const getUserMissedEventsConference = async(idU) => {
    return User.findById({ _id: idU }, { 'conferences': 1 }).then(ids => {
        if (!ids)
            return ('You have nothing missed')
        else {
            const set1 = ids.conferences.map(x => x.toString()); // objectId to string
            let vdr = Conference.videocall;
            return Conference.find({ $and: [{ _id: { $in: set1 } }, { idU: { $in: vdr } }, { 'missed': true }] }, { 'topic': 1, 'Date_begin': 1, 'duration': 1 }).then(events => {
                return ("Your Missed conferences are : " + events)

            })
        }
    })

}


const getUserMissedEventsReunion = async(idU) => {
    return User.findById({ _id: idU }, { 'reunions': 1 }).then(ids => {
        if (!ids)
            return ('You have nothing missed')
        else {
            const set1 = ids.reunions.map(x => x.toString()); // objectId to string
            let vdr = Reunion.videocall;

            return Reunion.find({ $and: [{ _id: { $in: set1 } }, { idU: { $in: vdr } }, { 'missed': true }] }, { 'reunion_Name': 1, 'Date_begin': 1, 'Duration': 1 }).then(events => {
                return ("Your Missed Reunions are : " + events)

            })
        }
    })

}



module.exports = {
    createConference,
    readConferenceAll,
    updateConference,
    deleteConference,
    deleteConferenceAll,
    JoinedToConference,
    LeaveTheConference,
    getUserProgrammedEventsReunion,
    getUserProgrammedEventsConference,
    SetEventR,
    SetEventC,
    getUserMissedEventsReunion,
    getUserMissedEventsConference
}