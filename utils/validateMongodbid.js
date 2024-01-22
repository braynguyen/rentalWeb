const mongoose = require('mongoose');
const validateMongoDbId = (id) => {
    console.trace();
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new Error("This MongoDB ID is not valid or not found")
}

module.exports = validateMongoDbId