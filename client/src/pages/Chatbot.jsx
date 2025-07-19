import React, { useState } from 'react';
import axios from 'axios';


const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!message) return;

    setChatHistory((prev) => [...prev, { sender: 'You', message }]);
    setMessage('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/chat', { message });
      if (response.data && response.data.response) {
        const botMessage = response.data.response;
        setChatHistory((prev) => [...prev, { sender: 'Bot', message: botMessage }]);
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Error communicating with server:', error.message);
      setChatHistory((prev) => [...prev, { sender: 'Bot', message: 'Error: Unable to connect to server.' }]);
    }
  }

  return (
    <div className="chatbot-container" style={{'textAlign':'center', 'padding': '5px'}}>
      <div className="chat-history">
        {chatHistory.map((entry, index) => (
          <div key={index} className={`chat-message ${entry.sender}`} style={{'fontSize': '20px'}}>
            <strong>{entry.sender}:</strong> {entry.message}
          </div>
        ))}
      </div>
      <br/>
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        placeholder="Type your message..."
        className="chat-input"
      />
      <br/>
      <br/>
      <button onClick={handleSendMessage} className="chat-send-button" style={{'fontSize': '20px'}}>
        Send
      </button>
    </div>
  );
};

export default Chatbot;
