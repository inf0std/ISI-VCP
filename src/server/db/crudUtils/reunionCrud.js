const mongoose = require("mongoose");
const { User } = require("../schema/User")
const { Reunion } = require("../schema/Reunion")


/////methode post
//create reunion
const createReunion = async(idU, reunion_Name, participantsName, Date_begin, Duration) => { // idU = id of user
        if (!reunion_Name) {
            return ({ message: "Content can not be empty!" });
        }
        if (!participantsName) {

            return ({ message: "You must select for minimum a user!" });
        }
        if (!Duration) {

            return ({ message: "You must set the duration!" });
        }
        if (!Date_begin) {

            return ({ message: "You must set the Date_begin!" });
        }
        const reunion = new Reunion({
            reunion_Name: reunion_Name,
            participantsName: participantsName,
            videocall: [idU],
            Date_begin: Date_begin,
            Duration: Duration,
            reunion_Host: idU,
            reunion_moderateur: idU,
        });

        //attendre reunion soit sauvgarder then update user
        return reunion
            .save(reunion)
            .then(async(Reunions) => {
                /** add the id of the organiser in user feild */
                var newreunionId = reunion._id
                Reunion.updateOne({ _id: newreunionId }, { $push: { participantsName: idU }, }).then(user => {
                        console.log({
                            message: `${user.modifiedCount} updated successfully!`,

                        });
                    })
                    /** add the id of the Reunion in user document */
                User.updateMany({ $or: [{ _id: { $in: Reunions.participantsName } }, { _id: idU }] }, { $push: { reunions: newreunionId }, }).then(user => {
                    console.log({
                        message: `${user.modifiedCount} updated successfully!`,

                    });
                })
                console.log(Reunions, {
                    message: "ceated successfully!"
                });
                return reunion;
            })
            .catch(err => {
                return console.log({
                    message: err.message || "Some error occurred while creating the reunion."
                });
            });
    }
    // désigner le modirateur 
const Moderateur = async(idR, idM) => { //idR = id of reunion     // idM =  id of the new moderateur 
    //const id = req.params.id;

    return Reunion.updateOne({ _id: idR }, { reunion_moderateur: idM }).then(user => {
        return ({
            message: `${user.modifiedCount} Moderateur updated successfully!`,

        });
    })

};


// read all reunions
const readReunionAll = async() => {

    return Reunion.find({ archive: false })
        .then(async(Reunions) => {
            return Reunions
        })
        .catch(err => {
            console.log({
                message: err.message || "Some error occurred while retrieving reunion."
            });
        });
};

//read all reunions with id
const readReunion = async(id) => {
    //const id = params.id;
    if ((Reunion.archive == true)) {
        console.log({ message: "Not found reunion with id " + id })
        return
    }
    Reunion.findById(id)
        .then(async(Reunion) => {
            if (!Reunion)
                console.log({ message: "Not found Reunion with id " + id });
            else console.log(Reunion);
            return Reunion;
        })
        .catch(err => {
            console.log

                ({ message: "Error retrieving Reunion with id = " + id });
        });
};


//update reunion
const updateReunion = async(id, newReun) => {

    if (!newReun || !id) {
        return ({
            message: "Data to update can not be empty!"
        });
    }

    //const id = req.params.id;

    return Reunion.findByIdAndUpdate(id, newReun, { useFindAndModify: false })
        .then(async(Reunion) => {
            if (!Reunion) {
                console.log({
                    message: `Cannot update Reunion with id = ${id}. Maybe Reunion was not found!`
                });

            } else return ({ message: "Reunion was updated successfully." });
            return Reunion;
        })
        .catch(err => {
            return ({
                message: "Error updating Reunion with id = " + id
            });
        });
};

// Delete a Reunion with the specified id in the request
const deleteReunion = async(id) => {
        //const id = req.params.id;
        return Reunion.findOne({ _id: id }).then(reunion => {
            if (reunion.archive == true) {
                console.log({
                    message: `Cannot delete reunion with id=${id}. because the reunion has already deleted!`,
                })
            } else {
                Reunion.findByIdAndUpdate(id, { archive: true })
                    .then(async(Reunion) => {
                        if (!Reunion) {
                            return console.log({
                                message: `Cannot delete Reunion with id = ${id}. Maybe Reunion was not found!`
                            });
                        } else {
                            return console.log({
                                message: "Reunion was deleted successfully!"
                            });
                        }
                    })
                    .catch(err => {
                        console.log({
                            message: "Could not delete Reunion with id = " + id
                        });
                    });
            }
            return 'reunion was deleted successfully!';
        })
    }
    // Delete all Reunions from the database.
const deleteReunionAll = async() => {
    return Reunion.countDocuments({ archive: false }).then(reunion => {
        if (reunion > 0)
            Reunion.updateMany({ archive: true })
            .then(async(data) => {
                console.log({
                    message: `${data.modifiedCount} reynions were deleted successfully!`,
                });

            })
        else {
            return (`you have 0 reunion to delete`)
        }
        return `${reunion} reunions were deleted successfully!`
    });
};
//joined to reunion
const JoinedToReunion = async(idR, idU) => {
    //const id = req.params.id;


    return Reunion.findByIdAndUpdate(idR, { $push: { videocall: idU } })

    .then(data => {
            if (!data) {
                return ({
                    message: `Cannot find reunion with id=${idR}. Maybe reunion does not exist!`
                });

            } else return ({ message: `You have joined the reunion!` });
        })
        .catch(err => {
            return console.log({
                message: "Error during joining the reunion with id=" + idR
            });
        });
}

//leave the reunion
// i think it's nor necessairy to use this 
const LeaveTheReunion = (idR, idU) => {
    //const id = req.params.id;
    return Reunion.findByIdAndUpdate(idR, { $pull: { videocall: idU } })
        .then(data => {
            if (!data) {
                return ({
                    message: `Cannot find reunion with id=${idR}. Maybe reunion does not exist!`
                });
            } else return ({ message: `You have left the reunion!` });
        })
        .catch(err => {
            return ({
                message: "Error during leaving the reunion with id=" + idR
            });
        });
}

module.exports = {
    Moderateur,
    createReunion,
    readReunionAll,
    updateReunion,
    deleteReunion,
    deleteReunionAll,
    JoinedToReunion,
    LeaveTheReunion
}