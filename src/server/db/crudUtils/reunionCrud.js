const mongoose = require("mongoose");
const { User } = require("../schema/User")
const { Reunion } = require("../schema/Reunion")


/////methode post
//create reunion
const createReunion = async(idU, reunion_Name, participantsName, Date_begin, Duration) => { // idU = id of user
        if (!reunion_Name) {
            console.log({ message: "Content can not be empty!" });
            return;
        }
        if (!participantsName) {
            console.log({ message: "You must select for minimum a user!" });
            return;
        }
        if (!Duration) {
            console.log({ message: "You must set the duration!" });
            return;
        }
        if (!Date_begin) {
            console.log({ message: "You must set the Date_begin!" });
            return;
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
        reunion
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
                return
            })
            .catch(err => {
                return console.log({
                    message: err.message || "Some error occurred while creating the reunion."
                });
            });
    }
    // désigner le modirateur 
const Moderateur = async(idR, IdM) => { //idR = id of reunion     // idM =  id of the new moderateur 
    //const id = req.params.id;

    Reunion.updateOne({ _id: idR }, { reunion_moderateur: IdM }).then(user => {
        return console.log({
            message: `${user.modifiedCount} Moderateur updated successfully!`,

        });
    })

};


// read all reunions
const readReunionAll = async() => {

    Reunion.find({ archive: false })
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
            return Reunion
        })
        .catch(err => {
            console.log

                ({ message: "Error retrieving Reunion with id = " + id });
        });
};


//update reunion
const updateReunion = async(id, newReun) => {

    if (!newReun || !id) {
        return console.log({
            message: "Data to update can not be empty!"
        });
    }

    //const id = req.params.id;

    Reunion.findByIdAndUpdate(id, newReun, { useFindAndModify: false })
        .then(async(Reunion) => {
            if (!Reunion) {
                return console.log({
                    message: `Cannot update Reunion with id = ${id}. Maybe Reunion was not found!`
                });
            } else console.log({ message: "Reunion was updated successfully." });
            return Reunion
        })
        .catch(err => {
            return console.log({
                message: "Error updating Reunion with id = " + id
            });
        });
};

// Delete a Reunion with the specified id in the request
const deleteReunion = async(id) => {
    //const id = req.params.id;

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
            return Reunion
        })
        .catch(err => {
            return console.log({
                message: "Could not delete Reunion with id = " + id
            });
        });
};
// Delete all Reunions from the database.
const deleteReunionAll = () => {
    Reunion.updateMany({ archive: true })
        .then(async(Reunion) => {
            return console.log({
                message: `${Reunion.modifiedCount} Reunions were deleted successfully!`
            });
            return Reunion
        })
        .catch(err => {
            return console.log({
                message: err.message || "Some error occurred while removing all Reunions."
            });
        });
};
//joined to reunion
exports.JoinedToReunion = (idR, idU) => {
        //const id = req.params.id;


        Reunion.findByIdAndUpdate(idR, { $push: { videocall: idU } })

        .then(data => {
                if (!data) {
                    return console.log({
                        message: `Cannot find reunion with id=${idR}. Maybe reunion does not exist!`
                    });

                } else return console.log({ message: `The user with id=${idU}. has joined the reunion!` });
            })
            .catch(err => {
                return console.log({
                    message: "Error during joining the reunion with id=" + idR
                });
            });
    }
    /*
    //leave the reunion
    // i think it's nor necessairy to use this 
    exports.LeaveTheReunion = (idR, idU) => {
        //const id = req.params.id;
        Reunion.findByIdAndUpdate(idR, { $pull: { videocall: idU } })
            .then(data => {
                if (!data) {
                    return console.log({
                        message: `Cannot find reunion with id=${idR}. Maybe reunion does not exist!`
                    });
                } else return console.log({ message: `The user with id=${idU}. has left the reunion!` });
            })
            .catch(err => {
                return console.log({
                    message: "Error during leaving the reunion with id=" + idR
                });
            });
    }*/

module.exports = {
    createReunion,
    readReunionAll,
    updateReunion,
    deleteReunion,
    deleteReunionAll
}