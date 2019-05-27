const fs = require('fs');

const Card = require('./model');
const User = require('../users/model');

const validation = './validation';

exports.registerCard = (req, res) => {
  const { isValid, errors } = validation.validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }
};

// Função para fazer upload de um arquivo
exports.uploadImage = (req, res) => {
  console.log(req.file);
  console.log(req.file.mimetype.split('/'));

  fs.writeFile(req.file.path, req.file.buffer, (err) => {
    if (err) {
      return res.status(500).json({ success: false, errors: err });
    }
    return res.status(201).json({ success: true, imageData: req.file });
  });
};
