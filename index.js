require("dotenv").config();
const path = require("path");
const express = require("express");
const urlJoin = require("proper-url-join");

const app = require("./src/server/server");
app.use(express.static(path.join(__dirname, "public/build")));
console.log(path.join(__dirname, "public"));
console.log(process.env.APP_URL);
console.log(urlJoin(process.env.APP_URL));

/* 
const { genLoginToken } = require("./src/server/apis/tokens");

console.log(genLoginToken(1));
console.log(genLoginToken(2));
console.log(genLoginToken(3));
 */
