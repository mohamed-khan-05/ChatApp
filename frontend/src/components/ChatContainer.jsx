import React, { useEffect, useState, useContext } from "react";
import { Context } from "../App";
import axios from "axios";
import ChatNames from "./ChatNames";
import Chats from "./Chats";
import ChatBar from "./ChatBar";
import { useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChatContainer = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [d, setD] = useState([]);
  const [globalEmail, setGlobalEmail] = useContext(Context);
  const [temp, setTemp] = useState(0);
  const { email } = useParams();
  const [search, setSearch] = useState("");

  const handleAdd = () => {
    if (search === globalEmail) {
      toast.error("Can not enter your own email");
      return setSearch("");
    }
    axios
      .get("http://localhost:3001/chat/add", {
        params: { SentTo: search, UserEmail: globalEmail },
      })
      .then((res) => {
        toast.success(res.data.message);
        setSearch("");
      })
      .catch((err) => {
        toast.error("User not found");
      });
  };

  useEffect(() => {
    setTimeout(() => {
      document.getElementById("chat").scrollTop =
        document.getElementById("chat").scrollHeight;
    }, 300);
  }, [email]);

  useEffect(() => {
    if (!globalEmail) return;
    axios
      .get("http://localhost:3001/chat", { params: { email: globalEmail } })
      .then((res) => {
        const data = res.data.message;
        const uniqueUsers = [
          ...new Set(
            data.map((message) =>
              message.UserEmail === globalEmail
                ? message.SentTo
                : message.UserEmail
            )
          ),
        ];
        setUsers(uniqueUsers);
        setD(data);
      });
  }, [globalEmail, temp]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTemp((prevTemp) => prevTemp + 1);
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] absolute bg-slate-200">
      <ToastContainer />
      <div>
        <h4 className="fixed z-[1] w-[70vw] pl-5 text-lg left-[25vw] top-[30px] bg-slate-700 text-white">
          {email}
        </h4>
      </div>
      <div className="bg-transparent w-[300px] h-auto max-h-[90vh] ml-8 mt-8 overflow-y-auto">
        <span>
          <input
            className="pl-1 text-[1.2rem] focus:outline-none focus:border-b-slate-500 focus:border-b-2"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            placeholder="Email"
          />
          <button
            className="border-2 border-gray-400 px-2 mx-3 rounded-md"
            onClick={() => {
              handleAdd();
            }}
          >
            Add
          </button>
        </span>
        <div className="mt-8">
          {users.map((receiver, index) => (
            <li key={index} className="inline">
              <ChatNames receiver={receiver} d={d} />
            </li>
          ))}
        </div>
      </div>

      <Chats d={d} />
      <ChatBar temp={temp} setTemp={setTemp} />
    </div>
  );
};

export default ChatContainer;
