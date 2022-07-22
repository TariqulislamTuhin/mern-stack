import { useContext } from "react";
import { UserContext } from "../context";
const Home = () => {
  const [state, setState] = useContext(UserContext);
  return (
    <div className="container d-flex flex-column flex-shrink">
      <div className="row">
        <div className="row">
          <h1 className="display-4 text-center">Home Page</h1>
          <p className="text-wrap text-truncate col-10">
            {JSON.stringify(state)}
          </p>
          <img src="/images/default.jpg" />
        </div>
      </div>
    </div>
  );
};
export default Home;
