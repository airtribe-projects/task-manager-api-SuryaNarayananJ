const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const logger = require("./middlewares/loggerMiddleware");
const tasksRoute = require("./routes/tasksRoute");
const tasksData = require("./models/tasks");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (tasksData.tasks) {
    app.use("/airtribe/v1/tasks", logger, tasksRoute);
} else {
    console.error("tasks DB doesn't exist");
}

app.get("/", (req, res) => {
    res.send("Airtribe API is online!");
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, (err) => {
        if (err) {
            console.error("Something bad happened", err);
            process.exit(1);
        }

        console.log(`Server is listening on ${PORT}`);
    });
}

module.exports = app;