import React, { useContext, useEffect } from "react";
import { Context } from "../App";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";

const Home = () => {
  const [globalEmail, setGlobalEmail] = useContext(Context);
  const { email: SentTo } = useParams();
  const navigate = useNavigate();
  const handleLogout = () => {
    axios.post("http://localhost:3001/users/logout");
    navigate("/");
  };
  useEffect(() => {
    axios.get("http://localhost:3001/users/login").then((response) => {
      if (response.data.loggedIn && response.data.user) {
        setGlobalEmail(response.data.user.email);
        navigate("/home/0");
      } else {
        navigate("/");
      }
    });
  }, []);
  return (
    <div>
      <button
        className="fixed z-[1] bottom-5 left-5 p-2 border-[2px] border-gray-800 rounded-lg"
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </button>
      <ChatContainer />
    </div>
  );
};

export default Home;
