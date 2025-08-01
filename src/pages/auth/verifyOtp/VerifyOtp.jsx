import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, verifyotp } from "../../../store/authSlice";
import { STATUSES } from "../../../globals/misc/statuses";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { forgotPasswordData } = useSelector((state) => state.auth);

  const data2 = {
    email: forgotPasswordData.email,
    otp: otp,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the OTP is empty before dispatching
    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }
    dispatch(verifyotp(data2));
  };

 useEffect(() => {
  if (forgotPasswordData.status === STATUSES.SUCCESS) {
    toast.success("OTP verified successfully!");
    navigate("/resetPassword");
  } else if (forgotPasswordData.status === STATUSES.ERROR) {
    toast.error("Invalid OTP. Please try again.");
    setOtp(""); // Clear OTP field on error
  }
}, [forgotPasswordData.status, navigate]);

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
                  htmlFor="otp"
                  className="mb-1 text-xs tracking-wide text-gray-600"
                >
                  Enter OTP
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
                    id="otp"
                    type="number"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
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
                    placeholder="Enter your OTP"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 cursor-pointer flex flex-col items-center w-full rounded border-2 p-2"
              >
                <div>Verify OTP</div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;