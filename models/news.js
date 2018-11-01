const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  theme: {
    type: String,
    required: 'Поле темы обязательно для заполнения',
    maxlength: 40
  },
  text: {
    type: String,
    required: 'Поле текста новости обязательно для заполнения',
    maxlength: 500
  },
  date: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

newsSchema.methods.getPublicFields = function () {
  return {
    id: this._id,
    theme: this.theme,
    text: this.text,
    date: this.date,
    user: this.user.getPublicFieldsForNews(),
    userId: this.user.getUserId().id
  };
};

newsSchema.statics.clientFields = ['theme', 'text', 'date', 'userId'];

module.exports = mongoose.model('News', newsSchema);
