import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const satelliteSchema = new mongoose.Schema({
    satelliteName: {
        type: String,
        required: [true, 'Satellite name is required'],
        unique: true
    },
    satelliteLocation: {
        type: String,
        required: [true, 'Satellite location is required']
    },
    contactPerson: {
        type: String,
        required: [true, 'Contact person is required']
    },
    contactEmail: {
        type: String,
        required: [true, 'Contact email is required'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    contactPassword: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
satelliteSchema.pre('save', async function(next) {
    if (!this.isModified('contactPassword')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.contactPassword = await bcrypt.hash(this.contactPassword, salt);
});

// Method to check password
satelliteSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.contactPassword);
};

const Satellite = mongoose.models.Satellite || mongoose.model('Satellite', satelliteSchema);

export default Satellite;