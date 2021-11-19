const admin = require('./node_modules/firebase-admin');
const serviceFile = require("./serviceAccount.json"); //name of file downloaded from firebase
const data = require("./files/meteoriteCollection.json"); // name of file that contains data to be uploaded
const collectionKey = "meteorites"; //name of the collection

admin.initializeApp({
  credential: admin.credential.cert(serviceFile),
  databaseURL: "https://mmgdatabase-d5933-default-rtdb.firebaseio.com" //find it from your firebase account
});

const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};

firestore.settings(settings);

if (data && (typeof data === "object")) {

  Object.keys(data).forEach(docKey => {
    firestore.collection(collectionKey).doc(docKey).set(data[docKey]).then((res) => {
      console.log("Document " + docKey + " written!");
    }).catch((error) => {
      console.error("Error: ", error);
    });
  });
}