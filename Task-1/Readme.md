# **Event CRUD Backend**

This is a backend API developed using the MERN stack for managing CRUD operations on events. The project is structured to handle event data, including file uploads, database connectivity, and error handling.

## **Table of Contents**

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)

## **Project Structure**

```plaintext
project-root/
│
├── public/                # Static files
├── src/
│   ├── controllers/       # CRUD operations for events
│   ├── db/                # Database connection setup
│   ├── middleware/        # Middleware (e.g., multer for file uploads)
│   ├── routes/            # API route definitions
│   ├── utils/             # Utility functions (e.g., error handling)
│   ├── app.js             # Express app setup
│   └── index.js           # Entry point of the application
├── .env                   # Environment variables
└── package.json           # Node.js dependencies and scripts

```


## **Installation**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/yourrepository.git
   cd yourrepository

 2. **Install dependencies**
    ```bash
      npm install
     ```
3. **Set up environment variables:**

    Create a .env file in the root directory and add your environment variables. Example

   ```bash
   git clone https://github.com/yourusername/yourrepository.git
   cd yourrepository

 4. **Install dependencies**
    ```bash
     MONGO_URI=your_mongodb_connection_string
     PORT=8000
     ```

 5. **Run the application**
    ```bash
      npm start
     ```


 The server will start at http://localhost:8000



 # **Environment Variables**

 The .env file should include the following environment variables:

   - `MONGO_URI`: MongoDB connection string
   - `PORT: Port` number for the server to run on
   - `DATABASE NAME`: Database name for store the data
   - `COLLECTION NAME` : Document name for the database
   - `CORS ORIGIN` : Cors origin to white-list the data


   
 # **Scripts**

   - `npm start`: Start the production server.
   - `npm run dev`: Start the server in development mode using nodemon.


 # **API Endpoints**
 ## Base URL

  ```bash
  http://localhost:8000/api/v3/app
  ```

 **Event Endpoints**

   - **Create Event**: `POST /events`
   - **Get All Events**: `GET /events`
   - **Get Event by ID**: `GET /events/:id`
   - **Update Event**: `PUT /events/:id`
   - **Delete Event**: `DELETE /events/:id`
   


 # **File Upload Handling**   
 
 File uploads (e.g., images) are handled using multer middleware, which is configured in the `middleware/` directory

 # **File Upload Handling**   
 
API errors are managed using a custom error handling utility located in the `utils/` directory. The `ApiError` class standardizes error responses across the application.


Example of an error response:

```json
{
    "status": "error",
    "message": "Event not found",
    "statusCode": 404
}
```

