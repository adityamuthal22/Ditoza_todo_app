import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const [signInDetails, setSignInDetails] = useState({
    email: "",
    password: "",
  });

  const handleSignupDetailsChange = (event) => {
    const { name, value } = event.target;

    setSignInDetails((prevSignInDetails) => ({
      ...prevSignInDetails,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSignin = async () => {
    const payload = {
      email: signInDetails.email,
      password: signInDetails.password,
    };
    // console.log(payload);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        payload
      );
      console.log(response);

      if (response.status === 200) {
        toast.success("Sign-in successful", {
          autoClose: 2000,
        });
        window.localStorage.setItem("token", response.data.token);
        navigate("/todo");
      } else if (response.status === 401) {
        toast.warn("Invalid email or password.", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      // Handle signup error
      toast.error("Signup failed. Please try again.");
      console.error("Signup error:", error);
    }
  };
  // verify signin button
  const [verified, setVerified] = useState(false);
  const loginMessage = () => {
    toast.success("Login successfully!", {
      autoClose: 2000,
    });
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setVerified(true);
  //     navigate("/todo");
  //   }
  // }, []);

  // // If verified is true, navigate to "/uploadFile"
  // useEffect(() => {
  //   if (verified) {
  //     navigate("/todo");
  //   }
  // }, [verified, navigate]);
  return (
    <div>
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                Sign in to your account
              </h1>

              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={signInDetails.email}
                  onChange={handleSignupDetailsChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={signInDetails.password}
                  onChange={handleSignupDetailsChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      for="remember"
                      className="text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <button
                onClick={handleSignin}
                type="submit"
                className="w-full bg-gray-900 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="/signup"
                  className="font-medium hover:underline text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
