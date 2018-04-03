const mongoose = require('mongoose');
const crudSchema = require('./crud');

const permissionSchema = new mongoose.Schema({
  chat: crudSchema,
  news: crudSchema,
  setting: crudSchema
}, {
  timestamps: true
});

permissionSchema.methods.getPublicFields = function () {
  return {
    chat: this.chat.getPublicFields(),
    news: this.news.getPublicFields(),
    setting: this.setting.getPublicFields()
  };
};

permissionSchema.methods.getPermissionId = function () {
  return { id: this._id };
};

permissionSchema.statics.clientFields = ['chat', 'news', 'setting'];

module.exports = mongoose.model('Permission', permissionSchema);
