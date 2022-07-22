import { UserContext } from "../context";
import { useContext } from "react";
import { LogoutOutlined } from "@ant-design/icons";

import Link from "next/link";
import { useRouter } from "next/router";
const Nav = () => {
  const [state, setState] = useContext(UserContext);
  const router = useRouter();
  const pathname = router.pathname;
  const logout = () => {
    window.localStorage.removeItem("auth");
    setState((state = null));
    router.push({ pathname: "/" });
  };
  return (
    <nav className="nav justify-content-center bg-primary d-flex">
      <Link href="/">
        <a className={`nav-link home ${pathname === "/" && "active"}`}>MERN</a>
      </Link>

      {state == null ? (
        <>
          <Link href="/login">
            <a className={`nav-link ${pathname === "/login" && "active"}`}>
              Login
            </a>
          </Link>
          <Link href="/register">
            <a className={`nav-link ${pathname === "/register" && "active"}`}>
              Register
            </a>
          </Link>
        </>
      ) : (
        <>
          <Link href="/user/dashboard">
            <a
              className={`nav-link ${
                pathname === "/user/dashboard" && "active"
              }`}
            >
              {state && state.user && state.user.name}
            </a>
          </Link>
          <div>
            <a
              className="nav-link logout"
              data-toggle="tooltip"
              data-placement="left"
              title="Logout"
              onClick={logout}
            >
              <LogoutOutlined /> <span className="ml-2"></span>
            </a>
          </div>
        </>
      )}
    </nav>
  );
};
export default Nav;
