const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://Rizzotto:1234@cluster0-1whvi.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

module.exports = mongoose