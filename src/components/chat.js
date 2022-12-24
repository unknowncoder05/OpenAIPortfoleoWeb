import React, { useState } from "react";
import { startGame, action } from "../api/api";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const userInputValue = inputValue
        setInputValue("");
        setMessages((prevMessages) => [...prevMessages, { type: "player", text: userInputValue, typingIndex: -1 }])
        const response = await action(userInputValue);
        addMessage({ type: "narrator", text: response.response, typingIndex: 0 }); // add narrator message 
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const renderMessage = (message, index) => {
        const { type, text, typingIndex } = message;
        return (
            <div key={index} className={`message ${type}-message`}>
                {type === "narrator" ? "" : ">"} {typingIndex !== -1 ? text.substring(0, typingIndex) : text}
            </div>
        );
    };

    const addMessage = async (message) => {
        setMessages((prevMessages) => [...prevMessages, message])
        const interval = setInterval(() => {
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages]; // make a copy of the messages array
                const messageIndex = updatedMessages.findIndex(
                    (m) => m.text === message.text
                ); // find the index of the message to update
                if (messageIndex === -1) return prevMessages;
                updatedMessages[messageIndex] = {
                    ...updatedMessages[messageIndex], // spread the existing message properties
                    typingIndex: updatedMessages[messageIndex].typingIndex + 1, // increment the typing index
                };
                return updatedMessages;
            });
        }, 100); // update typing index every 100ms
        setTimeout(() => {
            clearInterval(interval);
        }, message.text.length * 100); // stop updating typing index after message has been fully rendered
    };

    return (
        <div className="chat">
            {/* new button element */}
            <button
                className={`game-button ${gameStarted ? "game-started" : ""}`} // apply game-started class if game has started
                onClick={() => {
                    startGame().then((response) => {
                        setMessages([
                            { type: "narrator", text: response.response },
                        ]);
                    });
                    setShowChat(true);
                    setGameStarted(true);
                }}
            >
                {gameStarted ? "Restart" : "Start Game"}
            </button>
            <div style={{ display: showChat ? "block" : "none"}}> {/* wrap form element in div */}
                <div className="messages">{messages.map(renderMessage)}</div>
                <form onSubmit={handleSubmit}>
                    <div className="cli-prompt">&gt;
                        <input type="text" className="cli" value={inputValue} onChange={handleChange} autoFocus={true} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Chat;