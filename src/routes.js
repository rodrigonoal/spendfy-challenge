const express = require('express');
const findWeekdayAfter = require('./controllers/weekday');
const base64converter = require('./middleware/base64converter');
const {
    listDocuments,
    findDocument,
    createDocument,
    deleteDocument
} = require('./controllers/documents');


const routes = express();


routes.get('/documents', listDocuments)
routes.get('/documents/:id', findDocument)
routes.post('/documents', base64converter, createDocument)
routes.delete('/documents/:id', deleteDocument)

routes.get('/weekday-after', findWeekdayAfter)

module.exports = routes;
