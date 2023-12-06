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
    id: req.user.id,
    // Other user-related data
  };

  // Send the user information as a response
  res.json(userInfo);
});

/// Register endpoint
app.post("/register", (req, res) => {
  const { firstname, lastname, username, email, password, role } = req.body;

  // Validate input
  if (!username || !email || !password || !firstname || !lastname || !role) {
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
        "INSERT INTO users (username, email, password, firstname, lastname, role) VALUES (?, ?, ?, ?, ?, ?)",
        [username, email, hashedPassword, firstname, lastname, role], // Use hashed password
        (err, results) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error." });
          }

          // Check if the role is admin to insert into employees table
          if (role === "admin") {
            const userId = results.insertId; // Get the ID of the inserted user

            // Insert into employees table with the user's ID
            db.query(
              "INSERT INTO employees (user_id, work_schedule) VALUES (?, ?)",
              [userId, "No Work Schedule Yet"], // You can adjust the default work schedule
              (err) => {
                if (err) {
                  console.error("Database error:", err);
                  return res
                    .status(500)
                    .json({ message: "Internal server error." });
                }

                return res
                  .status(200)
                  .json({ message: "Registration successful." });
              }
            );
          } else {
            return res
              .status(200)
              .json({ message: "Registration successful." });
          }
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
        { username, role: results[0].role, id: results[0].id }, // Include role in the payload
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

app.get("/workout/:category", (req, res) => {
  const category = req.params.category;
  console.log("Fetching workout options for category:", category);

  // Query the database for workout data based on the selected category
  db.query(
    "SELECT * FROM workout WHERE category = ?",
    [category],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Internal server error." });
      }

      const workoutData = results.map((row) => ({
        name: row.exercise_name,
        sets: row.sets,
        reps: row.reps,
        intensity: row.intensity, // Corrected field name
        status: row.status,
      }));

      res.status(200).json(workoutData);
    }
  );
});

app.get("/categories", (req, res) => {
  db.query("SELECT DISTINCT category FROM workout", (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal server error." });
    }

    const categories = results.map((row) => row.category);
    res.status(200).json({ categories });
  });
});

app.get("/exercises/:category", (req, res) => {
  const category = req.params.category;
  console.log("Fetching exercises for category:", category);

  // Query the database for exercises based on the selected category
  db.query(
    "SELECT * FROM workout WHERE category = ?",
    [category],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Internal server error." });
      }

      const exercises = results.map((row) => ({
        name: row.exercise_name,
        id: row.workout_id,
        sets: row.sets,
        reps: row.reps,
        intensity: row.intensity,
      }));

      res.status(200).json({ category, exercises });
    }
  );
});

// subscription endpoint
app.post("/api/subscribe", (req, res) => {
  const { id, membership } = req.body;

  // Update the user's subscription in the database
  db.query(
    "UPDATE users SET membership = ? WHERE id = ?",
    [membership, id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ message: "Failed to update subscription" });
      }

      // Commit the changes after updating the subscription
      db.commit((err) => {
        if (err) {
          console.error("Database commit error:", err);
          return res.status(500).json({ message: "Failed to commit changes" });
        }

        return res
          .status(200)
          .json({ message: "Subscription updated successfully" });
      });
    }
  );
});

app.post("/update-progress", verifyToken, (req, res) => {
  const { user_id, workout_id, status } = req.body;

  try {
    // Validate input
    if (!user_id || !workout_id || !status) {
      throw new Error("Please provide all required fields.");
    }

    // Update user progress status in the 'user_progress' table
    const updateQuery = `
      INSERT INTO user_progress (user_id, workout_id, status)
      VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE status = VALUES(status);
    `;

    db.query(
      updateQuery,
      [user_id, workout_id, status],
      (err, updateResults) => {
        if (err) {
          console.error("Database error (updateQuery):", err);
          throw new Error("Internal server error.");
        }

        console.log("User progress updated:", updateResults);

        // Optionally, return updated data in the response
        res.status(200).json({
          message: "User progress updated successfully",
          updatedData: { user_id, workout_id, status },
        });
      }
    );
  } catch (error) {
    console.error("Error updating progress:", error);
    res
      .status(500)
      .json({ message: error.message || "Internal server error." });
  }
});

app.get("/get/employees", (req, res) => {
  db.query(
    "SELECT employees.*, users.firstname, users.lastname FROM employees JOIN users ON employees.user_id = users.id",
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Internal server error." });
      }
      res.json(results);
    }
  );
});

// Express route to handle employee edits
app.put("/edit/employee/:id", (req, res) => {
  const employeeId = req.params.id;
  const { newLastName, newFirstName, newWorkSchedule } = req.body;

  // Validate input
  if (!newLastName || !newFirstName || !newWorkSchedule) {
    return res
      .status(400)
      .json({ message: "Please provide both name and work schedule." });
  }

  // Update the employees table
  db.query(
    "UPDATE employees SET work_schedule = ? WHERE employee_id = ?",
    [newWorkSchedule, employeeId],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Internal server error." });
      }

      // Update the users table
      db.query(
        "UPDATE users SET lastname = ?, firstname = ? WHERE id = (SELECT user_id FROM employees WHERE employee_id = ?)",
        [newLastName, newFirstName, employeeId],
        (err, results) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error." });
          }

          return res
            .status(200)
            .json({ message: "Employee updated successfully." });
        }
      );
    }
  );
});

app.get("/user-id", verifyToken, (req, res) => {
  // Log the decoded user object
  console.log("Decoded user object:", req.user);

  // Fetch user information from the database
  const userInfo = {
    id: req.user.id,
    member: req.user.membership,
    // Other user-related data
  };

  // Send the user information as a response
  res.json(userInfo);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
