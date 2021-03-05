const Recurso = require('../../models/recurso');


exports.recursos = async (req, res, next) => {
  try { 
    const recursos = await Recurso.find();

    res.json(recursos);
  } catch(err){ 
    return next(err); 
  }
};

exports.show = async (req, res, next) => {
  try {
    const recurso = await Recurso.findById(req.params.id);

    res.json(recurso);
  } catch(err){ 
    return next(err.name); 
  }
};

exports.newRecurso = async (req, res, next) => {
  try {
    const data = {
      titulo: req.body.titulo,
      claves: req.body.claves,
      descripcion: req.body.descripcion,
      fuente: req.body.fuente,
      tipo_del_recurso: req.body.tipo_del_recurso,
      cobertura: req.body.cobertura
    }
    const nuevoRecurso = new Recurso(data);
    await nuevoRecurso.save();

    res.json({'recurso':nuevoRecurso, 'error':'false'});
  } catch(err){ 
    if(err.name === 'ValidationError'){

      res.json({'recurso':null, 'error':'true'}); 
    } else{ 
      return next(err); 
    }
  }
};

exports.update = async (req, res, next) => {
  try {
    const data = {
      titulo: req.body.titulo,
      claves: req.body.claves,
      descripcion: req.body.descripcion,
      fuente: req.body.fuente,
      tipo_del_recurso: req.body.tipo_del_recurso,
      cobertura: req.body.cobertura
    }
    const recurso = await Recurso.findById(req.params.id);
    recurso.titulo = data.titulo;
    recurso.claves = data.claves;
    recurso.descripcion = data.descripcion;
    recurso.fuente = data.fuente;
    recurso.tipo_del_recurso = data.tipo_del_recurso;
    recurso.cobertura = data.cobertura;
    await recurso.save();

    res.json({'recurso':recurso, 'error':'false'});
  } catch(err){ 
    if(err.name === 'ValidationError'){ 

      res.json({'recurso':null, 'error':'true'}); 
    } else{ 
      return next(err); 
    }
  }
};

exports.destroy = async (req, res, next) => {
  try {
    await Recurso.deleteOne({ _id: req.params.id});
    
    res.json({'exito':'ok'});
  } catch(err){ 
    return next(err); 
  }
};