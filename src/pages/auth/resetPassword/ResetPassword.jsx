import { useSelector } from "react-redux";
import { APIAuthenticated } from "../../../http";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { forgotPasswordData } = useSelector((state) => state.auth);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const data = {
    newPassword,
    confirmPassword,
    email: forgotPasswordData.email,
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await APIAuthenticated.post("/auth/resetPassword", data);

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div
          className="
            flex flex-col
            bg-white
            shadow-md
            px-4
            sm:px-6
            md:px-8
            lg:px-10
            py-8
            rounded-3xl
            w-100
            max-w-md
          "
        >

          <div className="mt-10">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-5">
                <label
                  htmlFor="newPassword"
                  className="mb-1 text-xs tracking-wide text-gray-600"
                >
                  Enter New Password:
                </label>
                <div className="relative">
                  <div
                    className="
                      inline-flex
                      items-center
                      justify-center
                      absolute
                      left-0
                      top-0
                      h-full
                      w-10
                      text-gray-400
                    "
                  >
                    <i className="fas fa-at text-blue-500"></i>
                  </div>

                  <input
                    id="newPassword"
                    type="password"
                    name="newPassword"
                    onChange={(e)=>setNewPassword(e.target.value)}
                    className="
                      text-sm
                      placeholder-gray-500
                      pl-10
                      pr-4
                      rounded-2xl
                      border border-gray-400
                      w-full
                      py-2
                      focus:outline-none focus:border-blue-400
                    "
                    placeholder="Enter your new password"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Confirm Password:
                </label>
                <div className="relative">
                  <div
                    className="
                      inline-flex
                      items-center
                      justify-center
                      absolute
                      left-0
                      top-0
                      h-full
                      w-10
                      text-gray-400
                    "
                  >
                    <span>
                      <i className="fas fa-lock text-blue-500"></i>
                    </span>
                  </div>

                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    className="
                      text-sm
                      placeholder-gray-500
                      pl-10
                      pr-4
                      rounded-2xl
                      border border-gray-400
                      w-full
                      py-2
                      focus:outline-none focus:border-blue-400
                    "
                    placeholder="Enter your new confirm password"
                  />
                </div>
              </div>

              <div className="flex w-full">
                <button
                  type="submit"
                  className="
                    flex
                    mt-2
                    items-center
                    justify-center
                    focus:outline-none
                    text-white text-sm
                    sm:text-base
                    bg-blue-500
                    hover:bg-blue-600
                    rounded-2xl
                    py-2
                    w-full
                    transition
                    duration-150
                    ease-in
                  "
                >
                  <span className="mr-2 uppercase">Reset Password</span>
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
