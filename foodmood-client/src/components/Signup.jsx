import React, { useContext, useState } from "react";
import {
  FaExternalLinkAlt,
  FaFacebookF,
  FaGithub,
  FaGoogle,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile, signUpWithGmail } =
    useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile(data.email, data.photoURL).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic
            .post("/users", userInfo)
            .then((response) => {
              alert("Account created successfully!");
              setIsModalOpen(false); // Close the modal
              navigate(from, { replace: true });
            })
            .catch((err) => {
              if (err.response?.status === 409) {
                // user already exists, still navigate
                alert("User already exists, logged in.");
                navigate(from, { replace: true });
              }
            });
        });
      })
      .catch((error) => {
        setError(error.message);
      });
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
      .catch((error) => console.error(error));
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 sm:p-8 border-2">
        <div className="modal-action flex flex-col justify-center mt-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body"
            method="dialog"
          >
            <h3 className="font-bold text-xl text-center mb-4">
              Create an Account!
            </h3>

            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700">Name</span>
              </label>
              <input
                type="name"
                placeholder="Your name"
                className="input input-bordered w-full"
                style={{ backgroundColor: "white" }}
                {...register("name")}
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text  text-gray-700">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered w-full"
                style={{ backgroundColor: "white" }}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text  text-gray-700">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered w-full"
                style={{ backgroundColor: "white" }}
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors.password.message}
                </p>
              )}
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* Error message */}
            {error && (
              <div className="text-red-500 text-center my-2">{error}</div>
            )}

            {/* Signup button */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Signup"
                className="btn bg-green text-white hover:bg-green-dark transition-all"
              />
            </div>

            {/* Login redirect */}
            <p className="text-center my-4 text-sm mt-6">
              Have an account?
              <Link to="/login" className="ml-1 underline text-red">
                Login here
              </Link>
            </p>

            {/* Close Button */}
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
            >
              ✕
            </Link>
          </form>

          {/* Social Sign-In Buttons */}
          <div className="text-center space-x-3 mt-0">
            <button
              onClick={handleRegister}
              className="btn btn-circle bg-white border hover:bg-green hover:text-white"
            >
              <FaGoogle />
            </button>
            <button className="btn btn-circle bg-white border hover:bg-green hover:text-white">
              <FaFacebookF />
            </button>
            <button className="btn btn-circle bg-white border hover:bg-green hover:text-white">
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
