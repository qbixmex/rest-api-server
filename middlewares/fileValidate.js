const fileValidation = (request, response, next) => {
  if (!request.files || Object.keys(request.files).length === 0 || !request.files.file) {
    return response.status(400).send({
      msg: 'No files were uploaded!'
    });
  }
  next();
};

module.exports = { fileValidation };
