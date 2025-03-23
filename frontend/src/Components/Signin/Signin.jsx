import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth, provider, db, signInWithPopup, getDoc, setDoc, doc } from "../../Firebase/firebase";
import { useNavigate } from "react-router-dom";  // For redirection

const Signin = ({ setIsSigned,setUsername,setUserEmail }) => {
  const navigate = useNavigate();
  
  

  const handleGoogleSignIn = async () => {
    try {
      // 🔹 Step 1: Authenticate User
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user details in state
      setUsername(user.displayName);
      setUserEmail(user.email);

      // 🔹 Step 2: Check if User Exists in Firestore
      const userRef = doc(db, "users", user.email);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // 🔹 Step 3: If user is new, store their details in Firestore
        await setDoc(userRef, { name: user.displayName, email: user.email });
        console.log("New user added:", user.displayName, user.email);
      } else {
        console.log("User already exists:", user.displayName, user.email);
      }

      // 🔹 Step 4: Redirect to Dashboard
      setIsSigned(true);
      navigate("/dash/board");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-200 p-10 text-center">
        <h2 className="text-2xl font-semibold mb-2">Why Only Gmail?</h2>
        <p className="text-gray-700 max-w-md">
          For security and reliability, our platform only allows Gmail accounts.
          This ensures better integration with Google services and enhances authentication security.
        </p>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-[#4c9173] p-10">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg border border-gray-300 mb-3"
        >
          <FcGoogle className="text-2xl mr-3" />
          Continue with Google
        </button>

      </div>
    </div>
  );
};

export default Signin;
