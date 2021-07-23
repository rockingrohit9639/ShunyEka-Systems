const mongoose = require("mongoose");

mongoose.connect(process.env.URI, {
    authSource: 'admin',
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}
).then(() =>
{
    console.log("Connected to MongoDB");
}
).catch((err) =>
{
    console.log("Error connecting to MongoDB: " + err);
}
);