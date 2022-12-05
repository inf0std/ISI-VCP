const validator = require("validator");
const Conversation = require("./Conversation");
const Reunion = require("./Reunion");
const Confer = require("./Conference");
const mongoose = require("mongoose"); //require mongoose
//const crypto = require("crypto"); // crypto for encrypt the password
//const { v4: uuidv4 } = require('uuid'); // user for identifying information that needs to be unique within a system or network thereof
//const { ObjectID } = require("bson"); //Return the ObjectID id as a 24 byte hex string representation
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
        username: {
            default: "user_seen",
            type: String,
            trim: true,
        },
        pic: {
            type: "String",
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        login: {
            email: {
                type: String,
                required: true,
                trim: true,
                unique: true,
                lowercase: true,
                minLenght: 8,
                validatore(v) {
                    if (!validator.isEmail(v)) throw new Error("email non valide");
                },
            },
            password: {
                type: String,
                required: true, //require true pour que le champs soit obligatoire

                validatore(v) {
                    if (!validator.isLength(v, { min: 5, max: 20 }))
                        throw new Error("mot de passe doit etre entre 5 et 20 charactere");
                },
            },
        },
        conversations: [{
            type: mongoose.SchemaTypes.ObjectID,
            ref: "Conversation",
        }, ],

        reunions: [{
            type: mongoose.SchemaTypes.ObjectID,
            ref: "Reunion",
        }, ],

        conferences: [{
            type: mongoose.SchemaTypes.ObjectID,
            ref: "Conference",
        }, ],
        organisations: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "organisation",
        }, ],
        isadmin: { type: Boolean, default: false, required: true },
        contacts: [{
            type: mongoose.SchemaTypes.ObjectID,
            ref: "User",
        }, ],
        archive: { type: Boolean, default: false },
    },

    { timestamps: true } //date of creation and date of update
);

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.login.password);
};

userSchema.pre("save", async function(next) {
    if (!this.login.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.login.password = await bcrypt.hash(this.login.password, salt);
});
const User = mongoose.model("User", userSchema);
module.exports = User;