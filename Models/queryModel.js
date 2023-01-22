import { Schema, model, models } from 'mongoose';

const querySchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Query = models.Query || model('Query', querySchema);

export default Query;