console.log("NEW SCRIPT LOADED");

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const loginHeading = document.getElementById("loginHeading");
const registerHeading = document.getElementById("registerHeading");

const API_URL = "http://127.0.0.1:5000/api/tasks";
function setAuthView(isLoggedIn) {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    const logoutBtn = document.getElementById("logoutBtn");

    const headings = document.querySelectorAll("h2, h3");
    loginHeading.style.display = isLoggedIn ? "none" : "block";
    registerHeading.style.display = isLoggedIn ? "none" : "block";

    if (loginForm) loginForm.style.display = isLoggedIn ? "none" : "block";
    if (registerForm) registerForm.style.display = isLoggedIn ? "none" : "block";

    if (taskForm) taskForm.style.display = isLoggedIn ? "block" : "none";
    if (taskList) taskList.style.display = isLoggedIn ? "block" : "none";

    headings.forEach(function (heading) {
        const text = heading.textContent.trim();

        if (
            text === "Task Dashboard" ||
            text === "Create New Task" ||
            text === "My Tasks"
        ) {
            heading.style.display = isLoggedIn ? "block" : "none";
        }
    });

    if (logoutBtn) {
        logoutBtn.style.display = isLoggedIn ? "inline-block" : "none";
    }
}

// Load tasks when page opens
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("loggedInUser")) {
        loadTasks();
    }
});const loggedInUser = localStorage.getItem("loggedInUser");

// CREATE TASK
taskForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const taskData = {
        title: document.getElementById("taskTitle").value.trim(),
        description: document.getElementById("taskDescription").value.trim(),
        dueDate: document.getElementById("taskDueDate").value,
        priority: document.getElementById("taskPriority").value,
        status: document.getElementById("taskStatus").value
    };

    if (taskData.title === "") {
        alert("Please enter a task title");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskData)
        });

        const savedTask = await response.json();

        if (!response.ok) {
            throw new Error(savedTask.message || "Failed to create task");
        }

        console.log("TASK CREATED:", savedTask);
        alert("Task created successfully");
        taskForm.reset();
        displayTask(savedTask);
    } catch (error) {
        console.error("CREATE ERROR:", error);
        alert("Unable to create task: " + error.message);
    }
});

// GET ALL TASKS
async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        console.log("TASKS FROM DATABASE:", tasks);
        taskList.innerHTML = "";
        tasks.forEach(function (task) {
            displayTask(task);
        });

    } catch (error) {
        console.error("LOAD ERROR:", error);
        taskList.innerHTML =
            "<p>Unable to load tasks.</p>";
    }
}

// DISPLAY TASK
function displayTask(task) {
    const taskCard = document.createElement("div");
    taskCard.className = "task-card";
    taskCard.innerHTML = `
        <h4>${task.title}</h4>
        <p>
            <strong>Description:</strong>
            ${task.description || "No description"}
        </p>

        <p>
            <strong>Due Date:</strong>
            ${
                task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "No due date"
            }
        </p>

        <p>
            <strong>Priority:</strong>
            ${task.priority}
        </p>

        <p>
            <strong>Status:</strong>
            ${task.status}
        </p>

        <button type="button" class="edit-btn">
            Edit
        </button>

        <button type="button" class="delete-btn">
            Delete
        </button>
    `;

    taskList.appendChild(taskCard);

    // EDIT BUTTON
    const editButton =
        taskCard.querySelector(".edit-btn");
        editButton.addEventListener("click", function () {
        editTask(task, taskCard);
    });

    // DELETE BUTTON
    const deleteButton =
        taskCard.querySelector(".delete-btn");
        deleteButton.addEventListener("click", function () {
        deleteTask(task._id, taskCard);
    });
}

// EDIT TASK
async function editTask(task, taskCard) {
    const newTitle = prompt(
        "Enter new task title:",
        task.title
    );

    if (
        newTitle === null ||
        newTitle.trim() === ""
    ) {
        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/${task._id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    title: newTitle.trim()
                })
            }
        );

        const updatedTask = await response.json();
        if (!response.ok) {
            throw new Error(
                updatedTask.message ||
                "Failed to update task"
            );
        }

        taskCard.querySelector("h4").textContent =
            updatedTask.title;
            task.title = updatedTask.title;
            alert("Task updated successfully");
    } catch (error) {
        console.error("UPDATE ERROR:", error);
        alert(
            "Unable to update task: " +
            error.message
        );
    }
}

// DELETE TASK
async function deleteTask(taskId, taskCard) {
    const confirmDelete = confirm(
        "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
        return;
    }

    try {
        const response = await fetch(
            `${API_URL}/${taskId}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();
        if (!response.ok) {
            throw new Error(
                result.message ||
                "Failed to delete task"
            );
        }
        taskCard.remove();
        alert("Task deleted successfully");

    } catch (error) {
        console.error("DELETE ERROR:", error);
        alert(
            "Unable to delete task: " +
            error.message
        );
    }
}

// REGISTER USER
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const inputs = registerForm.querySelectorAll("input");
        const name = inputs[0].value.trim();
        const email = inputs[1].value.trim();
        const password = inputs[2].value;

        if (!name || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });

            const result = await response.json();

            console.log("REGISTER RESPONSE:", result);

            if (!response.ok) {
                throw new Error(result.message);
            }

            alert("Registration successful");

            registerForm.reset();

        } catch (error) {
            console.error("REGISTER ERROR:", error);
            alert("Registration failed: " + error.message);
        }
    });
}


// LOGIN USER
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const inputs = loginForm.querySelectorAll("input");

        const email = inputs[0].value.trim();
        const password = inputs[1].value;

        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const result = await response.json();

            console.log("LOGIN RESPONSE:", result);

            if (!response.ok) {
                throw new Error(result.message);
            }

            alert("Login successful");

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(result.user)
            );

            loginForm.reset();

            setAuthView(true);
            loadTasks();

        } catch (error) {
            console.error("LOGIN ERROR:", error);
            alert("Login failed: " + error.message);
        }
    });
}

//Logout
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");

        setAuthView(false);
        taskList.innerHTML = "";

        alert("Logout successful");

        document.getElementById("loginForm").reset();
    });
}

document.addEventListener("DOMContentLoaded", function () {
    setAuthView(!!localStorage.getItem("loggedInUser"));
});