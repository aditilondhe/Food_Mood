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

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser } = useContext(AuthContext);
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
        alert("Account creation successful!");
        setIsModalOpen(false); // Close the modal
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center my-20">
      <div className="modal-action flex flex-col justify-center mt-0 bg-white ml-10 mr-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h3 className="font-bold text-lg text-center">Create an Account!</h3>

          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              style={{ backgroundColor: "white" }} // Set background color to white
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              style={{ backgroundColor: "white" }} // Set background color to white
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}
            <label className="label mt-1">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          {/* error text */}
          {error && (
            <div className="text-red-500 text-center my-2">{error}</div>
          )}

          {/* signup btn */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Signup"
              className="bg-green text-white btn"
              style={{
                cursor: "pointer", // Ensure pointer cursor on hover
                transition: "background-color 0.3s ease", // Smooth transition
              }}
            />
          </div>

          <p className="text-center my-2">
            Have an account?{" "}
            <button
              type="button"
              className="underline text-red ml-1"
              onClick={() => setIsModalOpen(true)}
            >
              Login
            </button>
          </p>

          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
        </form>

        {/* social sign in */}
        <div className="text-center space-x-3 mb-5">
          <button className="btn btn-circle bg-white hover:bg-green hover:text-white">
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

      {/* Conditional rendering of Modal */}
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Signup;
