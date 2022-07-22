import { Spin } from "antd";
import Link from "next/link";

const ForgotPasswordForm = ({
  handleSubmit,
  email,
  setEmail,
  newPassword,
  setNewPassword,
  secret,
  setSecret,
  loading,
  page,
}) => {
  const validationEmail = (inputEmail) => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      const email = inputEmail.toLowerCase();
    if (email.match(regex)) {
      console.log("true");
      return true;
    } else {
      console.log("false");
      return false;
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group p-2">
          <small>
            <label className="text-muted p-2">Email Address</label>
          </small>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            placeholder="Enter Email"
          />
          {email && !validationEmail(email) ? (
            <p className="text-danger">Invalid Email</p>
          ) : (
            ""
          )}
        </div>
        <div className="form-group p-2">
          <small>
            <label className="text-muted p-2">New Password</label>
          </small>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            className="form-control"
            placeholder="Enter newPassword"
          />
          {newPassword && newPassword.length < 6 ? (
            <p className="text-danger">
              Password is too small and minimum 6 character long!{" "}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="form-group p-2">
          <small>
            <label className="text-muted p-2">Pick a question</label>
          </small>
          <select name="" id="" className="form-control">
            <option>What is your favourite color?</option>
            <option>What is your best friend's name?</option>
            <option>What city you are born?</option>
          </select>
          <small className="form-text text-muted">
            You can use this to reset your newPassword if forgotten!
          </small>
        </div>
        <div className="form-group p-2">
          <input
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Write your answer here"
          />
        </div>

        <div className="form-group p-2 text-center">
          <button
            disabled={
              !email || !newPassword || newPassword.length <= 6 || !secret || !validationEmail(email)
            }
            className="btn  btn-primary btn-clock col-12"
          >
            {loading ? <Spin size="large" /> : "Change Password"}
          </button>
        </div>
      </form>
      <div className="row">
        <div className="col-md-6 offset-md-3 py-2">
          <p className="text-center">
            <strong className="ml-3">
              {page === "register"
                ? "Already register? "
                : "Not register yet! "}
            </strong>
            <Link href={page === "login" ? "/register" : "/login"}>
              <a className="h6 text-danger">
                {page === "login" ? "Register" : "Login"}{" "}
              </a>
            </Link>
          </p>
        </div>
        {page === "login" ? (
          <div className="col-md-6 offset-md-3 py-2">
            <p className="text-center">
              <Link href={"/forgotPassword"}>
                <a className="h6 text-danger">Forgot PassWord?</a>
              </Link>
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ForgotPasswordForm;
