const mongoose = require('mongoose');

const crudSchema = new mongoose.Schema({
  C: {
    type: Boolean,
    required: true
  },
  R: {
    type: Boolean,
    required: true
  },
  U: {
    type: Boolean,
    required: true
  },
  D: {
    type: Boolean,
    required: true
  }
});

crudSchema.methods.getPublicFields = function () {
  return {
    C: this.C,
    R: this.R,
    U: this.U,
    D: this.D
  };
};

module.exports = crudSchema;
