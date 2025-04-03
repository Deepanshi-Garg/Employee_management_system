# Employee_management_system

## Overview
The **Employment Management System** is a web application designed to facilitate employee management, including user and employee registration, authentication, and profile picture uploads.

## Features
- User & Employee Registration (with profile picture upload)
- User & Employee Authentication (Login with JWT token authentication)
- Secure password storage with bcrypt hashing
- Cloud image storage for profile pictures
- Employee details retrieval, updating, and deletion

## Technologies Used
- **Node.js** (Server-side runtime)
- **Express.js** (Web framework for Node.js)
- **MongoDB** (Database for storing user and employee details)
- **Mongoose** (MongoDB Object Modeling tool)
- **bcrypt** (For password hashing)
- **jsonwebtoken** (For authentication)
- **dotenv** (To manage environment variables)
- **Multer** (For file uploads)
- **Cloudinary** (For cloud image storage)

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/Deepanshi-Garg/Employee_management_system.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```env
   PORT=5000
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   CLOUD_NAME=your_cloudinary_name
   CLOUD_API_KEY=your_api_key
   CLOUD_API_SECRET=your_api_secret
   SECRET_TOKEN=your_secret_token
   ```
4. Run the server:
   ```sh
   npm start
   ```

## API Endpoints
## Base URL
```
https://employee-management-system-b3f6.onrender.com
```
### User Routes
| Method | Endpoint       | Description |
|--------|--------------|-------------|
| POST   | `/api/user/register`   | Register a new user (requires profile picture upload) |
| POST   | `/api/user/login`      | Authenticate user and return JWT token |

### Employee Routes
| Method | Endpoint       | Description |
|--------|--------------|-------------|
| POST   | `/api/employees/register`   | Register a new employee (requires profile picture upload) |
| POST   | `/api/employees/login`      | Authenticate employee and return JWT token |
| GET    | `/api/employees/`           | Get employee details (requires authentication) |
| PATCH  | `/api/employees/update`     | Update employee details (requires authentication) |
| DELETE | `/api/employees/delete`     | Delete employee (requires authentication) |

## Folder Structure
```
/employment-management
│── /controllers        # Business logic for authentication and employee management
│── /middlewares        # Middleware for handling authentication and file uploads
│── /models             # Mongoose models for database interaction
│── /routes             # API route handlers
│── /config             # Configuration settings
│── .env                # Environment variables (not included in repo)
│── server.js           # Entry point of the application
```

## Contributing
Feel free to contribute to this project by submitting a pull request!

## License
This project is licensed under the MIT License.
