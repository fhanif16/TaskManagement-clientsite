import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthContext } from "../providers/Authprovider";
import { auth } from "../firebase.init";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const googleProvider = new GoogleAuthProvider();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photoURL.value;

    const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordCriteria.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters long and include both uppercase and lowercase letters."
      );
      return;
    }
    setPasswordError("");

    createUser(email, password)
      .then(() => {
        Swal.fire({
          title: "Registration Successful",
          text: "Welcome to the platform!",
          icon: "success",
        });
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        Swal.fire({
          title: "Login Successful",
          text: "Welcome back!",
          icon: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h1>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              name="name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Photo URL
            </label>
            <input
              type="url"
              placeholder="Photo URL"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              name="photoURL"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              name="email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Your Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              name="password"
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-medium hover:underline">
            Login here
          </Link>
        </p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition duration-300"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
