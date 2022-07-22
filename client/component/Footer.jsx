import { format } from "date-fns";

const Footer = () => {
  let date = new Date();
  return (
    <div className="footer-div">
      <footer className="bg-light text-center text-lg-start mt-auto">
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © {format(date, "dd-MM-yyyy")} Copyright:
          <a className="text-dark" href="https://react-bootstrap.github.io/">
            React
          </a>
        </div>
        {/* Copyright */}
      </footer>
    </div>
  );
};
export default Footer;
