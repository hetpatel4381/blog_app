import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import axios from "axios";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

const Signin = () => {
  const [formData, setFormData] = useState({});
  // this is without state management.
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);

  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      // return setErrorMessage("Please fill out all Fields!");
      return dispatch(signInFailure("Please fill out all Fields!"));
    }

    try {
      // this is used without state management.
      // setLoading(true);
      // setErrorMessage(null);

      // with state management.
      dispatch(signInStart());

      const response = await axios.post("/api/auth/signin", formData, {
        headers: { "Content-Type": "application/json" },
      });

      const data = response.data;

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (data.success == true) {
        dispatch(signInSuccess(data));
        return navigate("/");
      }

      // setLoading(false);
    } catch (error) {
      // this is without using state management.
      // setErrorMessage(error.message);
      // setLoading(false);

      // with state management.
      dispatch(signInFailure(error.message));
      console.log("Error while Signing Up User!", error.message);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left Div */}
        <div className="flex-1">
          <Link to={"/"} className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Het's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo Project. You can sign in with your email and password
            or with Google.
          </p>
        </div>
        {/* Right Div */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span>Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;
