import React, { useState, useRef, useEffect, useContext } from "react";
import { Context } from "../App";
import { useParams } from "react-router";
import axios from "axios";

import EmojiPicker from "emoji-picker-react";
import { CiFaceSmile } from "react-icons/ci";

const ChatBar = (props) => {
  const [globalEmail, setGlobalEmail] = useContext(Context);
  const { temp, setTemp } = props;
  const [message, setMessage] = useState("");
  const [emoji, setEmoji] = useState(false);
  const [style1, setStyle1] = useState(
    "p-3 fixed bottom-[4.5rem]  border-slate-500 rounded-lg border-2 resize-none"
  );
  const [style2, setStyle2] = useState(
    "p-3 fixed bottom-[4.5rem]  border-slate-500 rounded-lg border-2 resize-none"
  );
  const [buttons, setButtons] = useState(true);
  const [ta, setTa] = useState(true);
  const { email } = useParams();
  const emojiPickerRef = useRef(null);
  const emojiButtonRef = useRef(null);
  const handleEmojiClick = (emojiData, event) => {
    setMessage((prevValue) => prevValue + emojiData.emoji);
  };

  const hideEmoji = (e) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(e.target) &&
      emojiButtonRef.current &&
      !emojiButtonRef.current.contains(e.target)
    ) {
      setEmoji(false);
    }
  };
  const handleSend = () => {
    axios
      .post(`http://localhost:3001/chat/${email}`, {
        content: message,
        sendersEmail: globalEmail,
      })
      .then(() => {
        setMessage("");
        setTemp((prevTemp) => prevTemp + 1);
      })
      .catch((error) => {
        console.log("error");
      });
  };
  useEffect(() => {
    setMessage("");
    if (email != 0) {
      setButtons(false);
      setTa(false);
    } else {
      setButtons(true);
      setTa(true);
    }
    document.addEventListener("click", hideEmoji);
    return () => {
      document.removeEventListener("click", hideEmoji);
    };
  }, [email]);
  return (
    <div
      onClick={(e) => {
        hideEmoji(e);
      }}
    >
      <button
        hidden={buttons}
        onClick={() => {
          let isConfirm = window.confirm("Are you sure you want to clear it?");
          isConfirm ? setMessage("") : null;
        }}
        onMouseEnter={() => {
          setStyle1(
            "bg-slate-500 text-white p-3 fixed bottom-[4.5rem]  border-slate-500 rounded-lg border-2 resize-none"
          );
        }}
        onMouseLeave={() => {
          setStyle1(
            "p-3 fixed bottom-[4.5rem]  border-slate-500 rounded-lg border-2 resize-none"
          );
        }}
        className={`left-[500px] ${style1}`}
      >
        Clear
      </button>
      <textarea
        hidden={ta}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        placeholder="Message..."
        rows="2"
        className="w-[700px] px-3 fixed bottom-[4.5rem] left-[580px] border-slate-500 rounded-xl border-2 resize-none"
      />
      <button
        onClick={() => {
          handleSend();
        }}
        hidden={buttons}
        className={`left-[1300px] ${style2}`}
        onMouseEnter={() => {
          setStyle2(
            "bg-slate-500 text-white p-3 fixed bottom-[4.5rem]  border-slate-500 rounded-lg border-2 resize-none"
          );
        }}
        onMouseLeave={() => {
          setStyle2(
            "p-3 fixed bottom-[4.5rem]  border-slate-500 rounded-lg border-2 resize-none"
          );
        }}
      >
        Send
      </button>
      <div>
        <button
          ref={emojiButtonRef}
          hidden={ta}
          className="px-3 fixed bottom-[5rem] left-[1360px] rounded-full"
          onClick={() => {
            setEmoji(!emoji);
          }}
        >
          <CiFaceSmile id="emoji" className="size-[40px]" />
        </button>
        {emoji ? (
          <div ref={emojiPickerRef}>
            <EmojiPicker
              className="left-[1450px] top-[300px]"
              onEmojiClick={handleEmojiClick}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ChatBar;
