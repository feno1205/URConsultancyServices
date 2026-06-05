const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors({
    origin: [
      "https://ur-consultancy-services.vercel.app",
      "https://urconsultancyservices.com",
      "https://www.urconsultancyservices.com"
    ],
    credentials: true,
  }));

app.use(express.json());


// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Backend Running");
});


// AUTH ROUTES
app.use("/api/auth", require("./routes/authRoutes"));

// PROTECTED ROUTE
const protect = require("./middleware/authMiddleware");

app.get("/api/home", protect, (req, res) => {
  res.json({
    message: "Welcome Home",
  });
});

const projectRoutes = require(
  "./routes/projectRoutes"
);

app.use(
  "/api/projects",
  projectRoutes
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
