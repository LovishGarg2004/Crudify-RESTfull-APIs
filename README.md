# CRUDify - RESTful APIs with Node.js and Express.js
This project demonstrates how to build a dynamic web application with a RESTful API using Node.js and Express.js for backend, along with HTML, CSS, and JavaScript for the frontend. The application allows CRUD (Create, Read, Update, Delete) operations using a SQL database to manage users efficiently.

## Features

- **Frontend**: Built using HTML, CSS, and JavaScript to ensure a responsive and interactive UI.
- **Backend API**: Implemented with Express.js, providing endpoints for handling data operations.
- **CRUD Operations**: Supports Create, Read, Update, and Delete actions on stored data using SQL.
- **Database**: SQL used to store and manage the data, ensuring efficient query handling.
- **RESTful Endpoints**: Designed GET, POST, PATCH, and DELETE endpoints to interact with the database seamlessly.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Express.js (Node.js)
- **Database**: SQL (e.g., MySQL, PostgreSQL)
- **API Design**: RESTful architecture

## API Endpoints

- `GET /user`: Retrieve all users from the database.
- `POST /user`: Add a new user to the database.
- `PATCH /user/:id`: Update an existing user by their ID.
- `DELETE /user/:id`: Remove a user by their ID.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/LovishGarg2004/Crudify-RESTfull-APIs

2. Install the required dependencies:
   ```bash
   npm install

3. Run the server:
   ```bash
   npm start
   
4. Access the application at `http://localhost:3000`.

## Database
The SQL database stores user information and supports CRUD operations via the API. The database schema is defined in the project.
