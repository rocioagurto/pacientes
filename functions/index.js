const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase)
const express = require('express');
const cors = require('cors')
const router = express();
router.use(cors({ origin: true }))
router.get("/paciente/:id", async (req, res) => {
  const paciente = await admin
    .firestore()
    .collection("pacientes")
    .doc(req.params.id)
    .get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        return { id: doc.id, data: doc.data() }
    } else {
        console.log("No such document!");
        return {}
    }
  });
  res.send(paciente);
});
router.get("/pacientes", async (req, res) => {
  const pacientes = await admin
    .firestore()
    .collection("pacientes")
    .get();
  var lista = [];
  pacientes.docs.forEach(doc => {
    lista.push({ id: doc.id, data: doc.data() });
  });
  res.send(lista);
});
router.post("/paciente", async (req, res) => {
  const paciente = await admin
    .firestore()
    .collection("pacientes")
    .add(req.body)
    .then(docRef => {
      return docRef.id
    });
  res.send(paciente);
});
router.put("/paciente/:id", async (req, res) => {
  const paciente = await admin
    .firestore()
    .collection("pacientes")
    .doc(req.params.id)
    .update(req.body).then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data()
    } else {
        console.log("No such document!");
        return {}
    }
  });
  res.send(paciente);
});
router.delete("/paciente/:id", async (req, res) => {
  const paciente = await admin
    .firestore()
    .collection("pacientes")
    .doc(req.params.id)
    .delete();
  res.send(paciente);
});
exports.pacientes = functions.https.onRequest(router);