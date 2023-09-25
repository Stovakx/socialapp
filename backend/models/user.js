import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 25,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 25,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    Validator(value) {
      if (!Validator.isLength(value, { min: 8 })) {
        throw new Error("Password must have at least 8 letters.");
      }
      if (!/[A-Z]/.test(value)) {
        throw new Error("Password must have at least 1 capital letter.");
      }
      if (!/\d/.test(value)) {
        throw new Error("Password must have at least 1 digit.");
      }
    },
  },
  picturePath:{
    type:String,
    required:true,
    default:'',
  },
  friends:{
    type:Array,
    default:[],
  },
  location:String,
  occupation:String,
  viewedProfile: Number,
  impressions:Number,
  
}, {timestamps: true}
);

const User = mongoose.model("User", UserSchema);
export default User


