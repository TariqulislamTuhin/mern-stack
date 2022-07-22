import axios from "axios";
import Router from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import AuthForm from "../component/AuthForm/AuthForm";
import { UserContext } from "../context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });
      setLoading(false);
      setState({
        user: data.user,
        token: data.token,
      });
      window.localStorage.setItem("auth", JSON.stringify(data));
      Router.push("/user/dashboard");
      toast.success(`Login successfull!`);
    } catch (error) {
      setLoading(false);
      // console.log(error);
      toast.error(error.response.data);
    }
  };
  if (state && state.token) Router.push("/");
  return (
    <div className="container-fluid">
      <div className="row py-5 bg-secondary text-light">
        <h1 className="display-4 text-center">Login Page</h1>
      </div>
      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <AuthForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            page="login"
          ></AuthForm>
        </div>
      </div>
    </div>
  );
};
export default Login;
