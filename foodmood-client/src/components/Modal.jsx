import React, { useContext, useState } from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";

const Modal = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { signUpWithGmail, login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    // console.log(email, password);
    login(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;
        const userInfor = {
          name: data.name,
          email: data.email,
        };
        axios
          .post("https://foodmood-low6.onrender.com/users", userInfor)
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

  //google signin

  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axios
          .post("https://foodmood-low6.onrender.com/users", userInfor)
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
    <dialog id="my_modal_5" className="modal ">
      <div className="modal-box bg-white max-w-sm w-[90vw] sm:w-full mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h3 className="font-bold text-lg text-center">
            Please Login to Continue!
          </h3>

          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              style={{ backgroundColor: "white" }} // Set background color to white
              {...register("email")}
            />
          </div>

          {/* password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
              style={{ backgroundColor: "white" }} // Set background color to white
              {...register("password")}
            />
            <label className="label mt-1">
              <a
                href="#"
                className="label-text-alt link link-hover text-gray-700"
              >
                Forgot password?
              </a>
            </label>
          </div>
          {/* error text */}
          {errorMessage ? (
            <p className="text-red xs italic"> {errorMessage}</p>
          ) : (
            ""
          )}

          {/* login btn */}
          <div className="form-control mt-4">
            <input
              type="submit"
              value="Login"
              className="bg-green text-white btn"
              style={{
                cursor: "pointer", // Ensure pointer cursor on hover
                transition: "background-color 0.3s ease", // Smooth transition
              }}
            />
          </div>
          <p className="text-center my-2">
            Don't have account?{" "}
            <Link to="/signup" className="underline text-red ml-1">
              Sign up now!
            </Link>
          </p>
          <button
            htmlFor="my_modal_5"
            onClick={() => document.getElementById("my_modal_5").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>

        {/* social sign in */}
        <div className="text-center space-x-3 mb-5">
          <button
            className="btn btn-circle bg-white hover:bg-green hover:text-white"
            onClick={handleRegister}
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
    </dialog>
  );
};

export default Modal;
