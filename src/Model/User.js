const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'please provide a name'],
    },
    email: {
        type: String,
        required: [true, 'please provide an email'],
    },
    password: {
        type: String,
        required: [true, 'please create a password'],
    },
    role: {
        type: String,
        enum: ['Admin','User']
    }
});

userSchema.pre('save',async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
    
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare( candidatePassword,this.password)
    return isMatch
    
}

const User = mongoose.model('User', userSchema);
module.exports = User
