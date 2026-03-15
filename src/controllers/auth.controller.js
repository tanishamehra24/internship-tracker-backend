import pool from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const {name, email, password} = req.body;

    //Checking if user exists
    const userExists = await pool.query(`SELECT * FROM users WHERE email=$1`, [
      email,
    ]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({message: "User already Exists !"});
    }
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Insert user into DB
    const newUser = await pool.query(
      "INSERT INTO users (name,email, password) VALUES ($1, $2, $3) RETURNING id, email",
      [name, email, hashedPassword],
    );

    res.status(201).json({
      message: "User registered successfully",
      user: newUser.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
};

export const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;

    // Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(400).json({message: "Invalid credentials"});
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(password, user.rows[0].password);


    if (!validPassword) {
      return res.status(400).json({message: "Invalid credentials"});
    }

    // Generate JWT
    const token = jwt.sign({id: user.rows[0].id}, process.env.JWT_SECRET, {
      expiresIn: "1d",

    });


    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server error"});
  }
};
