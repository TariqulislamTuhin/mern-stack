import { Spin } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";

const UserRoute = ({ children }) => {
  const [state] = useContext(UserContext);
  const [ok, setOk] = useState(false);
  const router = useRouter();
  useEffect(() => {
    getCurrentuser();
  }, [state && state.token]);

  const getCurrentuser = async () => {
    try {
      const { data } = await axios.get(`/current-user`);
      if (data.ok) setOk(true);
    } catch (error) {
      router.push("/login");
    }
  };
  process.browser &&
    state == null &&
    setTimeout(() => {
      getCurrentuser();
    }, 1000);

  return !ok ? (
    <Spin className="d-flex display-content-center display-1" size="Large" />
  ) : (
    <>{children}</>
  );
};

export default UserRoute;
