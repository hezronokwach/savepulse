import {Schema, model,models} from "mongoose";


const DonorBloodSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  donationDate: {
    type: Date,
    default: Date.now,
  },
  bloodType: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  satelliteID: {
    type: Schema.Types.ObjectId,
    ref: 'Satellite',
    required: true,
  },
//   regionalID: {
//     type: Schema.Types.ObjectId,
//     ref: 'Region',
//     required: true,
//   },
//   hospitalID: {
//     type: Schema.Types.ObjectId,
//     ref: 'Hospital',
//     required: true,
//   },
//   patientNumber: {
//     type: String,
//     required: true,
//   },
//   patientUserID: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   feedback: {
//     type: String,
//     required: true,
//   },
  sourceType: {
    type: String,
    required: true,
  },
});

const DonorBlood = models.DonorBlood || model('DonorBlood', DonorBloodSchema);


export default DonorBlood;