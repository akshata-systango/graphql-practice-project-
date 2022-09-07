const firebase = require("firebase");

const firebaseClient = firebase.initializeApp({
    apiKey:"AIzaSyAOrEjwafhm7jDm_qNk_cfjXF5X2J3jfTA",
    authDomain: "graphql-firebase-practice.firebaseapp.com",
    databaseURL: "https://graphql-firebase-practice-default-rtdb.firebaseio.com",
    projectId: "graphql-firebase-practice",
  });

  module.exports = firebaseClient;