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

  //redirecting to homepage or specific page
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
          .post("http://localhost:6001/users", userInfor)
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
          .post("http://localhost:6001/users", userInfor)
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
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box bg-white">
        <div className="modal-action flex flex-col justify-center mt-0">
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
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                style={{ backgroundColor: "white" }} // Set background color to white
                {...register("email")}
              />
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
                {...register("password")}
              />
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">
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
              Do not have account?{" "}
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
      </div>
    </dialog>
  );
};

export default Modal;
