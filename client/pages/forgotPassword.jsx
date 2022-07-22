import { Modal } from "antd";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import ForgotPasswordForm from "../component/AuthForm/ForgotPasswordForm";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const  {data} = await axios.post(`/forgot-password`, {
        email,
        newPassword,
        secret,
      });
      console.log(data);
      setLoading(false);
      toast.success(`${data.success}`);
      setEmail("");
      setOk(data.ok);
      console.log(data);
      setNewPassword("");
      setSecret("");
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };

  return (
    <div className="container-fluid d-flex flex-column min-vh-100">
      <div className="row py-5 bg-secondary text-light">
        <h1 className="display-4 text-center">ForgotPassword Page</h1>
      </div>
      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <ForgotPasswordForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            secret={secret}
            setSecret={setSecret}
            loading={loading}
            page="forgotPassword"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <Modal
            visible={ok}
            onCancel={() => setOk(false)}
            onOk={() => Router.push("/login")}
            title={"Congratulation Registration Succesful!"}
            footer={null}
          >
            <Link href="/login">
              <a className="mr-2 btn btn-primary btn-sm"> OK </a>
            </Link>
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
