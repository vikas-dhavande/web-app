import React, { useState } from 'react';
import { LuMessageCircle, LuX, LuSend } from 'react-icons/lu';

const FloatingChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi! 👋 Welcome to MedPortal. How can I help you today?",
            sender: "bot",
            timestamp: new Date()
        }
    ]);

    const handleSend = () => {
        if (message.trim()) {
            const newMessage = {
                id: messages.length + 1,
                text: message,
                sender: "user",
                timestamp: new Date()
            };
            setMessages([...messages, newMessage]);
            setMessage('');

            // Simulate bot response (placeholder for AI integration)
            setTimeout(() => {
                const botResponse = {
                    id: messages.length + 2,
                    text: "Thank you for your message. Our support team will assist you shortly.",
                    sender: "bot",
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, botResponse]);
            }, 1000);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Chat Panel */}
            <div
                className={`fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl transition-all duration-300 ease-in-out z-[9999] ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
                    }`}
                role="dialog"
                aria-labelledby="chat-title"
                aria-hidden={!isOpen}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
                    <div>
                        <h3 id="chat-title" className="font-semibold text-lg">Medical Support</h3>
                        <p className="text-xs text-blue-100">We're here to help</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                        aria-label="Close chat"
                    >
                        <LuX className="w-5 h-5" />
                    </button>
                </div>

                {/* Messages */}
                <div className="h-96 overflow-y-auto p-4 space-y-3 bg-gray-50">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[75%] rounded-2xl px-4 py-2 ${msg.sender === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                                    }`}
                            >
                                <p className="text-sm">{msg.text}</p>
                                <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            aria-label="Chat message input"
                        />
                        <button
                            onClick={handleSend}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 px-6 transition-colors flex items-center gap-2"
                            aria-label="Send message"
                        >
                            <LuSend className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        Available for general queries, appointments & support
                    </p>
                </div>
            </div>

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 z-[9999] group"
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
                aria-expanded={isOpen}
            >
                {isOpen ? (
                    <LuX className="w-6 h-6 transition-transform group-hover:rotate-90" />
                ) : (
                    <LuMessageCircle className="w-6 h-6 transition-transform group-hover:scale-110" />
                )}

                {/* Notification Badge (optional) */}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                        1
                    </span>
                )}
            </button>
        </>
    );
};

export default FloatingChat;
