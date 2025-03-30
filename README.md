React User Management App

This is a React application that integrates with the Reqres API to perform basic user management functions, including authentication, listing users, and editing/deleting users.

Features

Level 1: Authentication Screen

Users can log in using their credentials.

Uses the API endpoint POST /api/login.

Credentials for login:

Email: eve.holt@reqres.in

Password: cityslicka

On successful login, the token is stored, and the user is redirected to the Users List page.

Level 2: List All Users

Displays a paginated list of users fetched from GET /api/users?page=1.

Shows first name, last name, and avatar in a structured layout (table or card format).

Implements pagination for easy navigation through users.

Level 3: Edit, Delete, and Update Users

Edit:

Clicking Edit opens a form pre-filled with the user's data.

Users can update first name, last name, and email.

Updates are sent using PUT /api/users/{id}.

Delete:

Clicking Delete removes the user from the list.

Uses the DELETE /api/users/{id} endpoint.

Displays success or error messages based on API responses.

Installation and Setup

Follow these steps to run the project locally:

Download and Extract:

Download the project and extract the files.

Install Dependencies:

npm install

Run the Development Server:

npm run dev

The application should now be running on http://localhost:3000/ or the specified port.

Technologies Used

React.js

React Router

Axios for API calls

Tailwind CSS / CSS Modules (if applicable)

Notes

This project is a frontend-only implementation using the Reqres API, which provides mock user data.

The authentication is simulated as Reqres does not provide real user authentication.

Feel free to modify and enhance the project as needed!
