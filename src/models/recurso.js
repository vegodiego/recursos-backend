const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const validateClaves = (claves) => {
  return claves.split(",").every((i) => /^[a-záéíóúñ ]+$/i.test(i)) || /^\s+$/.test(claves) || claves === ''
}

const validateCobertura = (cobertura) => {
  var re = /^\d{4}-\d{4},[A-Za-záéíóúüñÁÉÍÓÚÑÜ ]+[A-Za-záéíóúüñÁÉÍÓÚÑÜ][(][A-Za-záéíóúüñÁÉÍÓÚÑÜ ]+[A-Za-záéíóúüñÁÉÍÓÚÑÜ ][)]$/;
  return re.test(cobertura) || /^\s+$/.test(cobertura) || cobertura === ''
}

const validateFuente = (fuente) =>{
  return /\S/.test(fuente)
}


const RecursoSchema = new mongoose.Schema({
  titulo: { 
    type: String
  },
  claves: {
    type: String,
    validate: [validateClaves, 'Ingresa claves validas']
  },
  descripcion: {
   type: String
  },
  fuente: {
   type: String,
   unique: true,
   required: true,
   validate: [validateFuente, 'Ingresa una fuente valida']
  },
  tipo_del_recurso: { 
    type: String
  },
  cobertura: { 
    type: String,
    validate: [validateCobertura, 'Ingresa una cobertra valida']
  }
});

RecursoSchema.plugin(uniqueValidator);


module.exports = mongoose.model('Recurso', RecursoSchema);