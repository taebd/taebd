const mongoose = require('mongoose');

const EsquemaProfesor = new mongoose.Schema({
    nroDocId: String,
    nombre: String,
    apellido: String,
    emails: [String],
    telefonos: [String],
    categoria: String,
    dedicacion: String,
    gradosAcademico: [String],
    escuela: [{
        facultad: String,
        nombre: String,
        ingreso: String,
        cursos: [String],
        _id: false
    }]
});

const Profesor = mongoose.model('Profesor', EsquemaProfesor);
module.exports = Profesor;