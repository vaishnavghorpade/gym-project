const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
mongoose.connect("mongodb+srv://vaishnav12:vaishnav12@cluster0.spedu8e.mongodb.net/gymXDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "❌ MongoDB connection error:"));
db.once("open", () => console.log("✅ Connected to MongoDB"));

// Registration Schema
const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  height: String,
  weight: String,
  membership: String,
  facilities: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Registration = mongoose.model("Registration", registrationSchema);

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Handle Registration Form
app.post("/register", async (req, res) => {
  try {
    const { name, email, mobile, height, weight, membership, facilities } = req.body;

    const newUser = new Registration({
      name,
      email,
      mobile,
      height,
      weight,
      membership,
      facilities: Array.isArray(facilities) ? facilities : [facilities],
    });

    const savedUser = await newUser.save();
    console.log("✅ Saved user:", savedUser);
    res.send("✅ Registration successful!");
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).send("❌ Error saving registration.");
  }
});

// Handle Contact Form
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      message,
    });

    const savedContact = await newContact.save();
    console.log("✅ Contact form saved:", savedContact);
    res.send("✅ Message sent successfully!");
  } catch (err) {
    console.error("❌ Contact error:", err);
    res.status(500).send("❌ Error saving contact.");
  }
});

// Server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${3000}`);
});
