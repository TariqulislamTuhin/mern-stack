import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const router = useRouter();
  const [state, setState] = useState({
    user: {},
    token: "",
  });

  useEffect(() => {
    setState(JSON.parse(window.localStorage.getItem("auth")));
  }, []);

  state && state.token ? state.token : "";
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
  if (state && state.token) {
    axios.defaults.headers.common = { Authorization: `Bearer ${state.token}` };
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        let res = error.response;
        if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
          setState(null);
          window.localStorage.removeItem("auth");
          router.push("/login");
        }
      }
    );
  }

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

