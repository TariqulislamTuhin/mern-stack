import { Modal } from "antd";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import AuthForm from "../component/AuthForm/AuthForm";
import { UserContext } from "../context";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`/register`, {
        name,
        email,
        password,
        secret,
      });
      setLoading(false);
      toast.success(`Registraion successfull!`);
      setName("");
      setEmail("");
      setPassword("");
      setSecret("");
      setTimeout(() => {
        Router.push("/login");
      }, 7000);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };
  if (state && state.token) Router.push("/");

  return (
    <div className="container-fluid d-flex flex-column min-vh-100">
      <div className="row py-5 bg-secondary text-light">
        <h1 className="display-4 text-center">Register Page</h1>
      </div>
      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <AuthForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            secret={secret}
            setSecret={setSecret}
            loading={loading}
            page="register"
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
export default Register;
