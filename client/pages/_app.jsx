import { UserProvider } from "../context";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../component/Nav";
import Head from "next/head";
import Footer from "../component/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import "../public/css/styles.css";
import { useRouter } from "next/router";
import Link from "next/link";

//
function App({ Component, pageProps }) {
  const { asPath } = useRouter();
  return (
    <UserProvider>
      <Head>
        <link
          rel="shortcut icon"
          href="https://cdn.pixabay.com/photo/2017/03/17/06/47/email-2151046_960_720.png"
        />
        <title>
          REACT-{asPath != "/" ? asPath.slice(1).toUpperCase() : "Home"}
        </title>
      </Head>

      <Nav />

      <ToastContainer position="top-center" />
      <Component {...pageProps} />
      <Footer />
    </UserProvider>
  );
}

export default App;
