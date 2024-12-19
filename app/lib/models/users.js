import {Schema, model,models} from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    }, 
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },  
}, 
{        
    timestamps: true
});

const User = models.User || model('User', userSchema);

export default User;
/*
type User struct {
	UserID      string `gorm:"primaryKey;uniqueIndex"`
	Email       string `gorm:"uniqueIndex;not null"`
	Password    string `gorm:"not null"`
	PhoneNumber string
	FirstName   string
	LastName    string
}
    */