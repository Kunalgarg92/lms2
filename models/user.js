import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
const { isEmail } = validator;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name'],
    minlength: [3, 'Minimum length must be 3'],
    maxlength: [50, 'Maximum length must be 50'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Must be a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
});

userSchema.post("save", function (doc, next) {
  console.log("user created", doc);
  next();
});

userSchema.pre('save', async function (next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.statics.login= async function(email,password){
  const user = await this.findOne({email});
  if(user){
  const auth = await bcrypt.compare(password, user.password);
  if(auth) return user;
  throw Error('Incorrect password');
  }
  throw Error('Incorrect email');

}
const User = mongoose.model('User', userSchema);
export default User;
