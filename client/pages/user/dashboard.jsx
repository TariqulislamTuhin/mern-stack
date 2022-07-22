import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../route/userRoute";
import Login from "../login";

const Dashboard = () => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row py-5 text-light">
          <h1 className="display-1 text-center">Dashboard Page</h1>
        </div>

        <div className="row">
          <h1>Para</h1>
          <p className="text-center bold">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas
            a, quidem quae voluptatum obcaecati culpa, qui aliquam assumenda
            quos aspernatur modi, nesciunt totam laborum eos. A quo ipsam odio
            beatae!
          </p>
        </div>
      </div>
    </UserRoute>
  );
};
export default Dashboard;
