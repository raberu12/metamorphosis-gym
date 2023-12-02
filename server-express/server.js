const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const expressSession = require("express-session");

const crypto = require("crypto");
const app = express();
const port = 3001;
const secretKey = "123456789";

app.use(
  expressSession({
    secret: secretKey,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gym-db",
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
};

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to the database");
  }
});

// API endpoint to retrieve user information
app.get("/user-info", verifyToken, (req, res) => {
  // Log the decoded user object
  console.log("Decoded user object:", req.user);

  // Fetch user information from the database
  const userInfo = {
    name: req.user.username,
    role: req.user.role,
    // Other user-related data
  };

  // Send the user information as a response
  res.json(userInfo);
});

/// Register endpoint
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields." });
  }

  // Hash the password before storing it
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  // Check if the user already exists
  db.query(
    "SELECT * FROM users WHERE username = ? OR email = ?",
    [username, email],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Internal server error." });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: "User already exists." });
      }

      // Store the user in the database with the hashed password
      db.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword], // Use hashed password
        (err) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error." });
          }

          return res.status(200).json({ message: "Registration successful." });
        }
      );
    }
  );
});

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both username and password." });
  }

  // Check if the user exists
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Internal server error." });
      }

      if (results.length === 0) {
        return res
          .status(401)
          .json({ message: "Invalid username or password." });
      }
      console.log("Received login request:", username, password);

      // Hash the provided password and compare with the stored hash
      const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

      if (hashedPassword !== results[0].password) {
        return res
          .status(401)
          .json({ message: "Invalid username or password." });
      }

      // Generate a token and include the role in the payload
      const token = jwt.sign(
        { username, role: results[0].role }, // Include role in the payload
        secretKey,
        { expiresIn: "1h" }
      );
      res.status(200).json({ message: "Login successful.", token });
    }
  );
});

//logout endpoint
app.post("/logout", (req, res) => {
  // Check if there is an active session
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        res.status(500).json({ message: "Logout failed" });
      } else {
        res.json({ message: "Logout successful" });
      }
    });
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
