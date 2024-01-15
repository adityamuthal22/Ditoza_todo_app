import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router";

const Signup = () => {
  const navigate = useNavigate();
  const [signupDetails, setSignupDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Password validation regular expressions
  const passwordRegex = {
    minLength: /(?=.{6,})/,
    hasUppercase: /(?=.*[A-Z])/,
    hasNumber: /(?=.*\d)/,
  };

  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasNumber: false,
  });

  // visibility Passward
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // verify signin button
  const [verified, setVerified] = useState(false);
  const loginMessage = () => {
    toast.success("Login successfully!", {
      autoClose: 2000,
    });
  };

  // const handleSignupDetailsChange = (event) => {
  //   const { name, value } = event.target;
  //   setSignupDetails((prevSignupDetails) => ({
  //     ...prevSignupDetails,
  //     [name]: value,
  //   }));
  // };

  const handleSignupDetailsChange = (event) => {
    const { name, value } = event.target;

    if (name === "password") {
      const newPassword = value;

      setPasswordValidation({
        minLength: passwordRegex.minLength.test(newPassword),
        hasUppercase: passwordRegex.hasUppercase.test(newPassword),
        hasNumber: passwordRegex.hasNumber.test(newPassword),
      });
    }

    setSignupDetails((prevSignupDetails) => ({
      ...prevSignupDetails,
      [name]: value,
    }));
  };

  const [token, setToken] = useState("");

  const handleSignUp = async () => {
    const payload = {
      username: signupDetails.username,
      email: signupDetails.email,
      password: signupDetails.password,
    };
    // console.log(payload);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        payload
      );
      // setToken(response.data.data.token);
      console.log("token", response);

      if (response.data.message === "User with the same email already exists") {
        toast.warn("User Already Exist", {
          autoClose: 2000,
        });
      } else if (response.status === 201) {
        toast.success("User Registration Successful", {
          autoClose: 2000,
        });
        window.localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      // Handle signup error
      toast.error("User Already Exist");
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     setVerified(true);
  //   }
  // }, []);

  // If verified is true, navigate to "/uploadFile"
  useEffect(() => {
    if (verified) {
      navigate("/");
    }
  }, [verified, navigate]);
  return (
    <div className="relative">
      <section className=" w-full py-2">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full  rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                Create and account
              </h1>
              <div>
                <label
                  for="username"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  User Name
                </label>
                <input
                  type="text"
                  name="username"
                  value={signupDetails.username}
                  onChange={handleSignupDetailsChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name123"
                  required
                />
              </div>
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
                  value={signupDetails.email}
                  onChange={handleSignupDetailsChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@gmail.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={signupDetails.password}
                    onChange={handleSignupDetailsChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-white absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {/* Password validation messages */}
                {signupDetails.password && (
                  <div className="text-sm text-red-500 dark:text-red-400">
                    {!passwordValidation.minLength &&
                      "Password must be at least 6 characters long."}
                    {!passwordValidation.hasUppercase &&
                      "Password must contain at least one uppercase letter."}
                    {!passwordValidation.hasNumber &&
                      "Password must contain at least one number."}
                  </div>
                )}
              </div>

              <button
                onClick={handleSignUp}
                disabled={
                  !passwordValidation.minLength ||
                  !passwordValidation.hasUppercase ||
                  !passwordValidation.hasNumber
                }
                className="w-full bg-gray-900 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>

              <p className="text-sm font-light text-gray-300">
                Already have an account?{" "}
                <a
                  href="/signin"
                  className="font-medium  hover:underline text-primary-500"
                >
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
