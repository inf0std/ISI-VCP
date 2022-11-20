/**
 * contient les fonctionnalites de gestion des conversation
 * creation
 * recherche
 * rejoindre
 * chargement
 * fermeture
 * 
 */
const conversation = require('./conversation')

const currentConvs = []

const createConv = (config)=>{
    console.log(config)
}

createConv({name: 'converataionn test'});