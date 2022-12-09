const mongoose = require("mongoose");
const { User } = require("../schema/User")
const { Reunion } = require("../schema/Reunion")


/////methode post
//create reunion
exports.createReunion = (idU, newReunion_Name, newParticipantsName, newDate_begin, newDuration) => { // idU = id of user

        const newreunion = new Reunion({
            reunion_Name: newReunion_Name,
            participantsName: newParticipantsName,
            videocall: [idU],
            Date_begin: newDate_begin,
            Duration: newDuration,
            reunion_Host: idU,
            reunion_moderateur: idU
        });

        //attendre reunion soit sauvgarder then update user
        newreunion
            .save(newreunion)
            .then(data => {
                /** add the id of the organiser in user feild */
                var newreunionId = newreunion._id
                Reunion.updateOne({ _id: newreunionId }, { $push: { participantsName: idU }, }).then(user => {
                        return console.log({
                            message: `${user.modifiedCount} updated successfully!`,

                        });
                    })
                    /** add the id of the Reunion in user document */
                User.updateMany({ $or: [{ _id: { $in: data.participantsName } }, { _id: idU }] }, { $push: { reunions: newreunionId }, }).then(user => {
                    return console.log({
                        message: `${user.modifiedCount} updated successfully!`,

                    });
                })
                return console.log(data, {
                    message: "ceated successfully!"
                });
            })
            .catch(err => {
                return console.log({
                    message: err.message || "Some error occurred while creating the reunion."
                });
            });
    }
    // désigner le modirateur 
exports.Mod = (idR, IdM) => { //idR = id of reunion     // idM =  id of the new moderateur 
    //const id = req.params.id;

    Reunion.updateOne({ _id: idR }, { reunion_moderateur: IdM }).then(user => {
        return console.log({
            message: `${user.modifiedCount} Moderateur updated successfully!`,

        });
    })

};


// read all reunions
exports.readReunionAll = () => {

    Reunion.find({ archive: false })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log({
                message: err.message || "Some error occurred while retrieving reunion."
            });
        });
};

//read all reunions with id
exports.readReunion = (id) => {
    //const id = params.id;
    if ((Reunion.archive == true)) {
        console.log({ message: "Not found reunion with id " + id })
        return
    }
    Reunion.findById(id)
        .then(data => {
            if (!data)
                console.log({ message: "Not found Reunion with id " + id });
            else console.log(data);
        })
        .catch(err => {
            console.log

                ({ message: "Error retrieving Reunion with id = " + id });
        });
};


//update reunion
exports.updateReunion = (id, newReun) => {

    if (!newReun || !id) {
        return console.log({
            message: "Data to update can not be empty!"
        });
    }

    //const id = req.params.id;

    Reunion.findByIdAndUpdate(id, newReun, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                return console.log({
                    message: `Cannot update Reunion with id = ${id}. Maybe Reunion was not found!`
                });
            } else console.log({ message: "Reunion was updated successfully." });
        })
        .catch(err => {
            return console.log({
                message: "Error updating Reunion with id = " + id
            });
        });
};

// Delete a Reunion with the specified id in the request
exports.deleteReunion = (id) => {
    //const id = req.params.id;

    Reunion.findByIdAndUpdate(id, { archive: true })
        .then(data => {
            if (!data) {
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
            return console.log({
                message: "Could not delete Reunion with id = " + id
            });
        });
};
// Delete all Reunions from the database.
exports.deleteReunionAll = () => {
    Reunion.updateMany({ archive: true })
        .then(data => {
            return console.log({
                message: `${data.modifiedCount} Reunions were deleted successfully!`
            });
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

//leave the reunion
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
}