Features
User Authentication: Register and log in as a user (either normal user or admin).
Book Management: Admins can add, update, delete, and list books in the library.
Borrowing/Returning Books: Users can borrow books, and return them once they’re done. The system tracks availability of book copies and user borrow history.

Security
Password Hashing: User passwords are hashed with bcrypt before being stored in the database.
JWT Authentication: Authentication is handled via JSON Web Tokens (JWT) that expire after 30 days. Users need to include their token in the Authorization header (Bearer token) for accessing protected routes.
Role-based Access: Admin routes are protected by checking the user’s role.
Error Handling
Errors are caught and handled globally in the application, returning proper HTTP error responses with detailed messages. Any unhandled errors in routes will return a 500 response.

Future Improvements
Pagination: Add pagination for book listings to handle large datasets.
Admin Authorization Middleware: Ensure that certain routes are accessible only to admins (e.g., adding/updating books).
Enhanced Validation: Add more robust validation to book borrowing (e.g., max borrow limits, book genre restrictions, etc.).
Logging: Add logging to track requests and errors for better monitoring.
