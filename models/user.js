const mongoose = require('mongoose');
const crypto = require('crypto');
const config = require('../config');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxlength: 10,
    minlength: 3,
    unique: 'Имя пользователя должно быть уникально.'
  },
  surName: {
    type: String
  },
  firstName: {
    type: String
  },
  middleName: {
    type: String
  },
  permission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission'
  },
  image: {
    type: String
  },
  access_token: {
    type: String
  },
  passwordHash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

userSchema.virtual('password')
  .set(function (password) {
    if (password !== undefined) {
      if (password.length < 4) {
        this.invalidate('password', 'Пароль должен быть минимум 4 символа.');
      }
    }

    this._plainPassword = password;

    if (password) {
      this.salt = crypto.randomBytes(config.crypto.hash.length).toString('base64');
      this.passwordHash = crypto.pbkdf2Sync(password, this.salt, config.crypto.hash.iterations, config.crypto.hash.length, 'sha512');
    } else {
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  })
  .get(function () {
    return this._plainPassword;
  });

userSchema.methods.checkPassword = function (password) {
  if (!password) return false;
  if (!this.passwordHash) return false;

  return crypto.pbkdf2Sync(password, this.salt, config.crypto.hash.iterations, config.crypto.hash.length, 'sha512') == this.passwordHash;
};

userSchema.methods.getPublicFields = function () {
  return {
    id: this._id,
    username: this.username,
    surName: this.surName || '',
    firstName: this.firstName || '',
    middleName: this.middleName || '',
    image: this.image || null,
    permissionId: this.permission.getPermissionId().id,
    permission: this.permission.getPublicFields(),
    password: this.passwordHash,
    access_token: this.access_token || ''
  };
};

userSchema.methods.getPublicFieldsForNews = function () {
  return {
    id: this._id,
    username: this.username,
    surName: this.surName || '',
    firstName: this.firstName || '',
    middleName: this.middleName || '',
    image: this.image || null
  };
};

userSchema.methods.getUserId = function () {
  return { id: this._id };
};

userSchema.statics.clientFields = ['username', 'surName', 'firstName', 'middleName', 'image', 'password', 'permission'];

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
