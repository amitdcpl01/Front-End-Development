const express = require("express");
const connectDB = require("./config/db");
const path = require('path');

const app = express();

//connect database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

//app.get("/", (req, res) => res.send("API Running"));

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
//const PORT = process.env.PORT || 3000;

//So you pass that app.listen, or to app.set('port', ...), and that makes your server be able to accept a parameter from the environment what port to listen on.
app.listen(PORT, () => console.log(`Server statrted on port ${PORT}`));