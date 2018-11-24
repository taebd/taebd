const express = require('express');
const app = express();
const db = require('./db');
const Profesor = require('./profesor');

app.use(express.json());

app.get('/', (req, res) => {
   res.redirect('/profesores');
})

// Obtiene todos los profesores

app.get('/profesores', (req, res) => {
   Profesor.find({}, '-_id nroDocId nombre apellido', (err, profesores) => {
      res.status(200).json({
         profesores: profesores
      });
   });
});

// Obtiene el profesor identificado por nroDocId

app.get('/profesores/:nroDocId', (req, res) => {
   Profesor.findOne({
      nroDocId: req.params.nroDocId
   }, '-_id -__v', (err, profesor) => {
      console.log(req.params.nroDocId);
      if (err) {
         return res.status(500).json({
            mensaje: 'Error interno del servidor'
         });
      }
      if (!profesor) {
         return res.status(404).json({
            mensaje: 'Profesor no encontrado'
         });
      }
      res.status(200).json(profesor);
   });
});

// Actualiza el profesor identificado por nroDocId

app.put('/profesores/:nroDocId', (req, res) => {
   Profesor.findOneAndUpdate({
      nroDocId: req.params.nroDocId
   }, req.body, (err, profesor) => {
      if (err) {
         return res.status(500).json({
            mensaje: 'Error interno del servidor'
         });
      }
      if (!profesor) {
         return res.status(404).json({
            mensaje: 'Profesor no encontrado'
         });
      }
      res.status(200).json({
         mensaje: 'Profesor actualizado con exito'
      });
   });
});

// Crea un nuevo profesor

app.post('/profesores', (req, res) => {
   Profesor.create(req.body, (err, profesor) => {
      if (err) {
         return res.status(500).json({
            mensaje: 'Error interno del servidor'
         });
      }
      if (!profesor) {
         return res.status(400).json({
            mensaje: 'Hubo un error al crear el profesor'
         });
      }
      res.status(201).json({
         mensaje: 'Profesor creado con exito'
      });
   });
});

// Elimina el profesor identificado por nroDocId

app.delete('/profesores/:nroDocId', (req, res) => {
   Profesor.findOneAndDelete({
      nroDocId: req.params.nroDocId
   }, (err, profesor) => {
      if (err) {
         return res.status(500).json({
            mensaje: 'Error interno del servidor'
         });
      }
      if (!profesor) {
         return res.status(404).json({
            mensaje: 'Profesor no encontrado'
         });
      }
      res.status(200).json({
         mensaje: 'Profesor eliminado con exito'
      });
   });
});

// se oyendo peticiones

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Oyendo en puerto ${PORT}`));