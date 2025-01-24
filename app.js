import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>AI-Powered Chatbot</h1>
      <ChatWindow />
    </div>
  );
}

export default App;
