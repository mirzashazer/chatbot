import React, { useState } from "react";
import axios from "axios";

const ChatWindow = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!query) return;
    setMessages([...messages, { user: true, text: query }]);
    const response = await axios.get("http://localhost:8000/query", {
      params: { user_query: query },
    });
    setMessages([...messages, { user: true, text: query }, { user: false, text: response.data.response }]);
    setQuery("");
  };

  return (
    <div>
      <div style={{ maxHeight: "400px", overflowY: "scroll", border: "1px solid #ccc", padding: "10px" }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.user ? "right" : "left",
              margin: "10px 0",
              color: msg.user ? "blue" : "green",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your query"
          style={{ width: "80%", padding: "10px" }}
        />
        <button onClick={sendMessage} style={{ padding: "10px 20px", marginLeft: "10px" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
