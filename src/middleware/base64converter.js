const base64 = require('base-64');
const utf8 = require('utf8');


const base64converter = (req, res, next) => {
    const { content } = req.body;

    const bytes = utf8.encode(content);

    const encoded = base64.encode(bytes);

    const fileSize = (encoded.length * 6) / 8000;

    req.body.content = encoded;

    req.body.kbSize = fileSize;

    return next();
}

module.exports = base64converter;