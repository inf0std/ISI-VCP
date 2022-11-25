const validator = require('validator');
const Conversation = require('./Conversation')
const Reunion = require('./Reunion')
const Reunion = require('./Conference')
const mongoose = require("mongoose") //require mongoose
const crypto = require("crypto"); // crypto for encrypt the password
const { v4: uuidv4 } = require('uuid'); // user for identifying information that needs to be unique within a system or network thereof
const { ObjectID } = require("bson"); //Return the ObjectID id as a 24 byte hex string representation
const Schema = mongoose.Schema;



const userSchema = new Schema({
        username: {
            default: 'user_seen',
            type: String,
            trim: true, //enlever les espace 
            // required:true,
        },
        pic: {
            type: "String",
            //required: true,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        login: {

            email: {
                type: String,
                required: true,
                trim: true, //enlever les espace 
                unique: true,
                lowercase: true,
                minLenght: 8,
                validatore(v) {
                    if (!validator.isEmail(v)) throw new Error('email non valide'); //format email
                }
            },
            hashedPwd: {
                type: String,
                required: true, //require true pour que le champs soit obligatoire   

                validatore(v) {
                    if (!validator.isLength(v, { min: 5, max: 20 })) throw new Error('mot de passe doit etre entre 5 et 20 charactere');
                }
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
            ref: "Conferences",
        }, ],
        organisation: [{

            type: mongoose.Schema.Types.ObjectId,
            ref: "organisation"

        }],
        isadmin: { type: Boolean, default: false, required: true, },
        contacts: [{
            type: mongoose.SchemaTypes.ObjectID,
            ref: "User",
        }],
        salt: String,
    },

    { timestamps: true, } //date of creation and date of update

);
// encry the password function
userSchema.virtual("password")
    .set(function(password) {
        this._password = password
        this.salt = uuidv4()
        this.hashedPwd = this.securePassword(password)
    })
    .get(function() {
        return this._password
    })

userSchema.methods = {
    authenticate: function(plainpassword) {
        return this.securePassword(plainpassword) === this.hashedPwd
    },

    securePassword: function(plainpassword) {
        if (!plainpassword) return "";

        try {
            return crypto.createHmac("sha256", this.salt).update(plainpassword).digest("hex")
        } catch (err) {
            return ""
        }
    }
}

//userSchema.virtual (pour ne pas sauvgarder au sein de database)????????

//const User = mongoose.model('User', );
const User = mongoose.model("User", userSchema);
module.exports = { User, userSchema };
//model(nameof collection,the schema )
//string is a schematype