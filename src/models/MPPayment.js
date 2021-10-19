const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types

const mpPaymentSchema = new Schema({
  user_id: {
    type: ObjectId,
    required: true
  },
  external_reference: {
    type: String,
    required: true
  },
  pay_link: {
    type: String,
    required: true
  },
  items: []
}, {
  timestamps: true
});

module.exports = model('MPPayment', mpPaymentSchema);