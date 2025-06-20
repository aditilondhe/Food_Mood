import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Login = () => {
  const [errorMessage, seterrorMessage] = useState("");
  const axiosPublic = useAxiosPublic();
  const { signUpWithGmail, login } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  //react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;
        const userInfor = {
          name: data.name,
          email: data.email,
        };
        axiosPublic
          .post("/users", userInfor)
          .then((response) => {
            // console.log(response);
            alert("Signin successful!");
            navigate(from, { replace: true });
          })
          .catch((err) => {
            if (err.response?.status === 409) {
              alert("User already exists, logged in.");
              navigate(from, { replace: true });
            }
          });
      })
      .catch(() => {
        setErrorMessage("Please provide valid email & password!");
      });
    reset();
  };

  // login with google

  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axiosPublic
          .post("/users", userInfor)
          .then((response) => {
            // console.log(response);
            alert("Signin successful!");
            navigate("/");
          })
          .catch((err) => {
            if (err.response?.status === 409) {
              alert("User already exists, logged in.");
              navigate("/");
            }
          });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 border-2">
        <form
          className="card-body"
          method="dialog"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="font-bold text-lg text-center">Please Login!</h3>

          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text  text-gray-700">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              style={{ backgroundColor: "white" }}
              {...register("email")}
            />
          </div>

          {/* password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text  text-gray-700">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              style={{ backgroundColor: "white" }}
              {...register("password", { required: true })}
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover mt-2">
                Forgot password?
              </a>
            </label>
          </div>

          {/* show errors */}
          {errorMessage && (
            <p className="text-red text-xs italic text-center mt-2">
              Provide a correct username & password.
            </p>
          )}

          {/* submit btn */}
          <div className="form-control mt-4">
            <input
              type="submit"
              className="btn bg-green text-white"
              value="Login"
            />
          </div>

          {/* close btn */}
          <Link to="/">
            <div className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </div>
          </Link>

          <p className="text-center my-2">
            Don’t have an account?
            <Link to="/signup" className="underline text-red ml-1">
              Signup Now
            </Link>
          </p>
        </form>

        {/* social icons */}
        <div className="text-center space-x-3 mt-4">
          <button
            onClick={handleRegister}
            className="btn btn-circle bg-white hover:bg-green hover:text-white"
          >
            <FaGoogle />
          </button>
          <button className="btn btn-circle bg-white hover:bg-green hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle bg-white hover:bg-green hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
