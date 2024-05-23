# Attendance App

To run the app you must first start the backend server and then the frontend.

### First clone the repository and change the directory
```bash
git clone https://github.com/Abhimanyu-dev/SecyTask.git
cd SecyTask
```


### To start the backend server:
While in the SecyTask directory
```bash
cd backend
node ./app.js 
```
This starts the express server on localhost:3000

### To start the frontend:
While in the SecyTask directory
```bash
cd frontend
npm run dev
```

This should get both your frontend and backend started with no issues.

The frontend for the project is not yet ready though you can use Postman or any such application to check for all the backend paths.

The available paths are:

http://localhost:3000/api/users

* / - GET request to get all the registered users
* /user - POST request to get a user
* / - POST request to create a user
* /:rollno - PUT request to update a user info
* /markAttendance - POST request to mark the attendance
* /match - POST request to match face against the database