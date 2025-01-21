import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../App";

const ChatNames = (props) => {
  const [globalEmail, setGlobalEmail] = useContext(Context);
  const navigate = useNavigate();
  const { email: id } = useParams();
  const { receiver, d } = props;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const filtered = d.filter((message) => message.SentTo === id);
    setMessages(filtered);
  }, [id]);
  const handleClick = () => {
    navigate(`/home/${receiver}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer w-[300px] h-10 bg-blue-400 text-center my-2 rounded-md break-words"
    >
      <div className="cursor-pointer">{receiver}</div>
    </div>
  );
};

export default ChatNames;
