const User = require("./models/User");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dns = require("dns");
require("dotenv").config();

const Task = require("./models/Task");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;


// ===============================
// MONGODB CONNECTION
// ===============================

mongoose.connect(process.env.MONGO_URI, {
    dbName: "taskManagementDB"
})
.then(() => {
    console.log("MongoDB Connected");
    console.log("Database:", mongoose.connection.name);
})
.catch((error) => {
    console.log("MongoDB Connection Error:", error);
});


// ===============================
// HOME
// ===============================

app.get("/", (req, res) => {
    res.send("Task Management API is running");
});


// ===============================
// GET ALL TASKS
// ===============================

app.get("/api/tasks", async (req, res) => {

    try {

        const tasks = await Task.find();

        res.status(200).json(tasks);

    } catch (error) {

        console.error("GET ERROR:", error);

        res.status(500).json({
            message: error.message
        });

    }

});


// ===============================
// CREATE TASK
// ===============================

app.post("/api/tasks", async (req, res) => {

    try {

        console.log("POST RECEIVED:", req.body);

        const task = await Task.create({

            title: req.body.title,

            description: req.body.description,

            dueDate: req.body.dueDate || null,

            priority: req.body.priority,

            status: req.body.status

        });

        console.log("TASK SAVED:", task);

        res.status(201).json(task);

    } catch (error) {

        console.error("CREATE ERROR:", error);

        res.status(500).json({
            message: error.message
        });

    }

});

// ===============================
// REGISTER USER
// ===============================

app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        console.log("USER REGISTERED:", user);

        res.status(201).json({
            message: "Registration successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("REGISTER ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
});

// LOGIN USER
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        if (user.password !== password) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        console.log("USER LOGGED IN:", user.email);

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
});

// ===============================
// UPDATE TASK
// ===============================

app.put("/api/tasks/:id", async (req, res) => {

    try {

        console.log("PUT ROUTE HIT");

        console.log("TASK ID:", req.params.id);

        console.log("UPDATE DATA:", req.body);


        const updatedTask =
            await Task.findByIdAndUpdate(

                req.params.id,

                req.body,

                {
                    new: true,
                    runValidators: true
                }

            );


        if (!updatedTask) {

            return res.status(404).json({

                message: "Task not found"

            });

        }


        console.log(
            "TASK UPDATED:",
            updatedTask
        );


        res.status(200).json(updatedTask);


    } catch (error) {

        console.error(
            "UPDATE ERROR:",
            error
        );


        res.status(500).json({

            message: error.message

        });

    }

});


// ===============================
// DELETE TASK
// ===============================

app.delete("/api/tasks/:id", async (req, res) => {

    try {

        console.log(
            "DELETE TASK:",
            req.params.id
        );


        const deletedTask =
            await Task.findByIdAndDelete(
                req.params.id
            );


        if (!deletedTask) {

            return res.status(404).json({

                message: "Task not found"

            });

        }


        console.log(
            "TASK DELETED:",
            deletedTask
        );


        res.status(200).json({

            message: "Task deleted successfully"

        });


    } catch (error) {

        console.error(
            "DELETE ERROR:",
            error
        );


        res.status(500).json({

            message: error.message

        });

    }

});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});