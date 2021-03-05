const express = require('express');
const router = express.Router();
const recursos = require('./controllers/API/recursoController.js');


router.get('/recursos', recursos.recursos);

router.get('/recursos/:id', recursos.show);

router.post('/recursos', recursos.newRecurso);

router.post('/recursos/:id', recursos.update);

router.get('/recursos/delete/:id', recursos.destroy);


module.exports = router;