import { useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

import { db } from "../firebase/firebase";
import "../styles/register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ========================================
     HANDLE INPUT CHANGE
  ======================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };


  /* ========================================
     HANDLE REGISTER
  ======================================== */

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const fullName = formData.fullName.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;


    /* ========================================
       REQUIRED FIELD VALIDATION
    ======================================== */

    if (
      !fullName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill all fields.");
      return;
    }


    /* ========================================
       NAME VALIDATION
    ======================================== */

    if (fullName.length < 3) {
      setError(
        "Full name must be at least 3 characters."
      );
      return;
    }


    /* ========================================
       EMAIL VALIDATION
    ======================================== */

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }


    /* ========================================
       PHONE VALIDATION
    ======================================== */

    const phonePattern =
      /^[0-9]{10}$/;

    if (!phonePattern.test(phone)) {
      setError(
        "Please enter a valid 10-digit phone number."
      );
      return;
    }


    /* ========================================
       PASSWORD VALIDATION
    ======================================== */

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }


    /* ========================================
       PASSWORD CONFIRMATION
    ======================================== */

    if (password !== confirmPassword) {
      setError(
        "Passwords do not match."
      );
      return;
    }


    try {
      setLoading(true);


      /* ========================================
         CHECK DUPLICATE EMAIL
      ======================================== */

      const usersRef =
        collection(db, "users");

      const emailQuery = query(
        usersRef,
        where("email", "==", email)
      );

      const existingUsers =
        await getDocs(emailQuery);


      if (!existingUsers.empty) {
        setError(
          "An account with this email already exists."
        );

        setLoading(false);

        return;
      }


      /* ========================================
         CREATE USER
      ======================================== */

      await addDoc(usersRef, {
        fullName,
        email,
        phone,

        role: "customer",

        createdAt:
          serverTimestamp(),
      });


      /* ========================================
         SUCCESS
      ======================================== */

      setSuccess(
        "Account created successfully!"
      );


      /* Clear form */

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });


      /* ========================================
         REDIRECT TO HOME
      ======================================== */

      setTimeout(() => {
        navigate("/home");
      }, 1200);

    } catch (error) {

      console.error(
        "Registration error:",
        error
      );

      setError(
        "Registration failed. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <main className="register-page">

      <div className="register-card">

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="register-header">

          <div className="register-logo">
            🛍️
          </div>

          <h1>
            Create Account
          </h1>

          <p className="register-subtitle">
            Create your EcomStore account
          </p>

        </div>


        {/* ========================================
            ERROR MESSAGE
        ======================================== */}

        {error && (
          <div className="register-error">
            ⚠️ {error}
          </div>
        )}


        {/* ========================================
            SUCCESS MESSAGE
        ======================================== */}

        {success && (
          <div className="register-success">
            ✅ {success}
          </div>
        )}


        {/* ========================================
            FORM
        ======================================== */}

        <form onSubmit={handleRegister}>

          {/* Full Name */}

          <div className="input-group">

            <label htmlFor="fullName">
              Full Name
            </label>

            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              autoComplete="name"
            />

          </div>


          {/* Email */}

          <div className="input-group">

            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />

          </div>


          {/* Phone */}

          <div className="input-group">

            <label htmlFor="phone">
              Phone Number
            </label>

            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="10-digit phone number"
              value={formData.phone}
              onChange={handleChange}
              maxLength="10"
              autoComplete="tel"
            />

          </div>


          {/* Password */}

          <div className="input-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
            />

          </div>


          {/* Confirm Password */}

          <div className="input-group">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />

          </div>


          {/* Register Button */}

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>

        </form>


        {/* ========================================
            LOGIN LINK
        ======================================== */}

        <div className="register-login-link">

          <p>
            Already have an account?{" "}

            <Link to="/login">
              Login
            </Link>
          </p>

        </div>


        {/* ========================================
            GUEST LINK
        ======================================== */}

        <div className="register-home-link">

          <Link to="/home">
            ← Continue as Guest
          </Link>

        </div>

      </div>

    </main>
  );
}

export default Register;