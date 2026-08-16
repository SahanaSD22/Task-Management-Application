# Task Management Application
A full-stack Task Management Application developed to create, organize, update, and manage tasks efficiently. The application includes user registration and login functionality along with complete task management features.

## Features
* User Registration
* User Login and Logout
* Create New Tasks
* View All Tasks
* Edit Tasks
* Delete Tasks
* Task Priority Management
* Task Status Management
* Due Date Management
* MongoDB Database Integration
* REST API Integration
* Responsive and user-friendly interface

## Technologies Used
### Frontend

* HTML
* CSS
* JavaScript

### Backend
* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Other Tools
* Git
* GitHub
* npm
* Visual Studio Code

## Project Structure
```text
Task-Management-Application/
│
├── index.html
├── style.css
├── script.js
│
└── server/
    ├── models/
    │   ├── User.js
    │   └── Task.js
    ├── server.js
    ├── package.json
    └── package-lock.json
```

## API Endpoints
### User Authentication
| Method | Endpoint        | Description            |
| ------ | --------------- | ---------------------- |
| POST   | `/api/register` | Register a new user    |
| POST   | `/api/login`    | Login an existing user |

### Task Management
| Method | Endpoint         | Description        |
| ------ | ---------------- | ------------------ |
| GET    | `/api/tasks`     | Retrieve all tasks |
| POST   | `/api/tasks`     | Create a new task  |
| PUT    | `/api/tasks/:id` | Update a task      |
| DELETE | `/api/tasks/:id` | Delete a task      |

## How to Run the Project
### 1. Clone the Repository
```bash
git clone https://github.com/SahanaSD22/Task-Management-Application.git
```
### 2. Open the Project
```bash
cd Task-Management-Application
```

### 3. Install Backend Dependencies
```bash
cd server
npm install
```

### 4. Configure Environment Variables
Create a `.env` file inside the `server` folder and add your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 5. Start the Backend Server
```bash
node server.js
```

The backend server will run on:
```text
http://127.0.0.1:5000
```

### 6. Run the Frontend
Open `index.html` in a browser or use the Live Server extension in Visual Studio Code.

## Task Management
Users can create tasks by providing:
* Task Title
* Description
* Due Date
* Priority
* Status
Tasks can also be edited or deleted when required.

## Database
The application uses MongoDB to store registered users and task information. Mongoose is used to connect the Node.js backend with MongoDB.

## Snapshots
<img width="932" height="963" alt="image" src="https://github.com/user-attachments/assets/f922024f-ffa6-481a-ba37-d1a2b6f23464" />
<img width="893" height="818" alt="image" src="https://github.com/user-attachments/assets/d8975fec-f6c6-492e-a00e-a9f9611e251a" />
<img width="872" height="497" alt="image" src="https://github.com/user-attachments/assets/067e6cb7-0e85-428a-8b0d-371176b2f78f" />
<img width="823" height="565" alt="image" src="https://github.com/user-attachments/assets/4b1115b0-f5a9-4d5d-9713-ef4f7b2afd6f" />

## Author
**Sahana**
MCA

## License
This project was developed for educational and internship purposes.
