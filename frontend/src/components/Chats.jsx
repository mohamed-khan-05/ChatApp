import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Chats = (props) => {
  const navigate = useNavigate();
  const { email: id } = useParams();
  const { d } = props;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(0);

  useEffect(() => {
    document.getElementById("chat").scrollTop =
      document.getElementById("chat").scrollHeight;
  }, [newMessage]);

  useEffect(() => {
    const filtered = d.filter(
      (message) => message.SentTo === id || message.UserEmail === id
    );
    setMessages(filtered);
  }, [id, d]);

  return (
    <div>
      <div
        id="chat"
        className="fixed pb-[70px] left-[25vw] top-[30px] w-[70vw] h-[84vh] pt-8 bg-white overflow-x-hidden overflow-y-auto scroll-smooth"
      >
        <div className="flex flex-col space-y-2">
          {messages.length > 0 ? (
            messages.map((msg, index) => {
              if (newMessage < index) {
                setNewMessage(index);
              }
              return (
                <div
                  key={msg.id}
                  className={`p-2 m-2 break-words border-b rounded-lg ${
                    msg.isReceived
                      ? "bg-green-300 px-5 text-left self-start max-w-[70%]"
                      : "bg-blue-300 px-5 text-right self-end max-w-[70%]"
                  }`}
                >
                  {msg.content}
                </div>
              );
            })
          ) : (
            <div className="p-2">No messages to display</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;
