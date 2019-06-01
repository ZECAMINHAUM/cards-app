const { ObjectId } = require('mongoose').Types;

const isLength = require('validator/lib/isLength');
const isEmpty = require('../../utils/is-empty');

exports.validateRegisterInput = (data, mimetype) => {
  const errors = {};

  mimetype = mimetype.split('/')[1];
  data.title = !isEmpty(data.title) ? data.title : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.user = !isEmpty(data.user) ? data.user : '';

  if (!['jpg', 'jpeg', 'png'].includes(mimetype)) {
    errors.image = 'Tipo de arquivo inválido';
  }

  if (!isLength(data.title, { min: 2, max: 25 })) {
    errors.title = 'O titulo deve conter entre 2 e 25 caracteres';
  }
  if (isEmpty(data.title)) {
    errors.title = 'O campo titulo não pode ser vazio';
  }

  if (!isLength(data.description, { min: 2, max: 120 })) {
    errors.description = 'A descrição deve conter entre 2 e 120 caracteres';
  }
  if (isEmpty(data.description)) {
    errors.description = 'O campo descrição não pode ser vazio';
  }

  if (!ObjectId.isValid(data.user)) {
    errors.user = 'ObjectID do usuário é inválido';
  }
  if (isEmpty(data.user)) {
    errors.user = 'ObjectID do usuário não pode ser vazio';
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

exports.validateUpdateInput = (data) => {
  const errors = {};

  if (!isEmpty(data.user)) {
    errors.user = 'Não se pode mudar o criador do card';
  }

  if (!isEmpty(data.title)) {
    if (!isLength(data.title, { min: 2, max: 25 })) {
      errors.title = 'O titulo deve conter entre 2 e 25 caracteres';
    }
  }

  if (!isEmpty(data.description)) {
    if (!isLength(data.description, { min: 2, max: 120 })) {
      errors.description = 'A descrição deve conter entre 2 e 120 caracteres';
    }
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

exports.validateImageInput = (mimetype) => {
  const errors = {};

  mimetype = mimetype.split('/')[1];

  if (!['jpg', 'jpeg', 'png'].includes(mimetype)) {
    errors.image = 'Tipo de arquivo inválido';
  }

  if (isEmpty(mimetype)) {
    errors.image = 'Uma imagem é necessária';
  }

  return {
    isValid: isEmpty(errors),
    errors
  }
};
