"use client";

import { useState, useRef, useEffect } from "react";

function generateSmartResponse(userInput) {
  const input = userInput.toLowerCase().trim();

  // Location/Address questions - SPECIFIC MATCH
  const locationKeywords = [
    "address",
    "location",
    "where",
    "located",
    "country",
    "state",
    "city",
    "office",
  ];
  const isLocationQuestion = locationKeywords.some((keyword) =>
    input.includes(keyword)
  );
  if (isLocationQuestion) {
    return "We're based in Lagos, Nigeria. For our complete address and office details, please contact us directly through WhatsApp at +2347065810784 or email us at anvictolintegratedservices@gmail.com. Our team will be happy to provide you with precise directions.";
  }

  // Greetings - MATCH ONLY IF IT'S PRIMARILY A GREETING
  const greetings = [
    "hello",
    "hi",
    "hey",
    "good morning",
    "good afternoon",
    "good evening",
    "greetings",
  ];
  if (
    greetings.some(
      (greeting) => input === greeting || input.startsWith(greeting + " ")
    ) &&
    input.length < 30
  ) {
    return "Hello! Welcome to Anvictol Integrated Services. How can I help you today? I can answer questions about our services, provide information about maintenance and operations, or help you get in touch with our team.";
  }

  // Service inquiry - match "service" but not location/contact combined queries
  if (
    (input.includes("service") ||
      input.includes("offer") ||
      input.includes("provide")) &&
    !isLocationQuestion
  ) {
    return "Anvictol Integrated Services specializes in three core services: (1) Conveyor Cleaning & Maintenance - advanced conveyor cleaning, belt scrapers, alignment and debris removal, (2) Factory Maintenance - preventive and corrective maintenance, inspections, part replacements and emergency breakdown repairs, (3) Line Operations Support - skilled operators and technical support for production lines, ensuring consistent output and quality standards.";
  }

  // Emergency and urgent matters - SPECIFIC MATCH
  const emergencyKeywords = [
    "emergency",
    "urgent",
    "breakdown",
    "crisis",
    "asap",
    "critical",
    "down",
  ];
  if (emergencyKeywords.some((keyword) => input.includes(keyword))) {
    return "We provide 24/7 emergency breakdown repair services. For urgent assistance, please contact us immediately via WhatsApp at +2347065810784. Our technicians are available to respond quickly and minimize your downtime.";
  }

  // Contact inquiries - SPECIFIC MATCH
  const contactKeywords = [
    "contact",
    "reach",
    "phone",
    "call",
    "email",
    "whatsapp",
    "message",
  ];
  if (
    contactKeywords.some((keyword) => input.includes(keyword)) &&
    !isLocationQuestion
  ) {
    return "You can reach us through multiple channels: WhatsApp: +2347065810784 (fastest response), Email: anvictolintegratedservices@gmail.com, or use our contact form on the website. Our team typically responds within 24 hours.";
  }

  // Maintenance questions - SPECIFIC MATCH
  if (input.includes("maintenance")) {
    return "Our Factory Maintenance service combines preventive and corrective strategies. We perform regular inspections, handle part replacements, manage emergency breakdowns, and ensure your equipment operates at peak performance while adhering to safety standards.";
  }

  // Conveyor questions - SPECIFIC MATCH
  if (
    input.includes("conveyor") ||
    input.includes("belt") ||
    input.includes("cleaning")
  ) {
    return "Our Conveyor Cleaning & Maintenance service includes belt scrapers, alignment services, debris removal, and comprehensive system checks. We help extend equipment lifespan and maintain safe, efficient operations. We can handle both routine maintenance and emergency repairs.";
  }

  // Operations/Line support questions
  if (
    input.includes("operator") ||
    input.includes("production") ||
    input.includes("operation")
  ) {
    return "Our Line Operations Support provides skilled operators and technical personnel for your production lines. We ensure consistent output, maintain quality standards, and maximize operational efficiency. Our team works seamlessly with your facility to optimize productivity.";
  }

  // Pricing/Quote questions
  if (
    input.includes("price") ||
    input.includes("cost") ||
    input.includes("quote") ||
    input.includes("rate") ||
    input.includes("fee")
  ) {
    return "We provide custom quotes based on your specific needs and requirements. Please contact us with details about your project via WhatsApp (+2347065810784), email, or our contact form. We'll prepare a detailed quote within 24 hours.";
  }

  // Safety/Compliance questions
  if (
    input.includes("safety") ||
    input.includes("standard") ||
    input.includes("compliance") ||
    input.includes("regulation")
  ) {
    return "Safety is our top priority. We adhere to the highest safety and quality standards in all our operations. We ensure full compliance with industry regulations and best practices to keep your facility secure and efficient.";
  }

  // Negative/Feedback handling
  if (
    input.includes("not smart") ||
    input.includes("stupid") ||
    input.includes("dumb") ||
    input.includes("not working")
  ) {
    return "I appreciate your feedback! I'm continuously learning to better answer your questions. For complex inquiries that need personalized attention, please contact our expert team directly via WhatsApp at +2347065810784. They can provide more detailed assistance with your specific needs.";
  }

  // Fallback for unmatched questions
  return "That's a great question! I want to make sure you get accurate information. For detailed assistance with your inquiry, please reach out to our team directly via WhatsApp at +2347065810784 or email us at anvictolintegratedservices@gmail.com. We're here to help with any specific questions about our services.";
}

export default function AIChatModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: 1,
        text: "Hello! Welcome to Anvictol Integrated Services. I'm your AI assistant, here to help with questions about our conveyor cleaning, factory maintenance, and line operations services. What can I help you with today?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      const answer = generateSmartResponse(inputValue);
      const botResponse = {
        id: messages.length + 2,
        text: answer,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 animate-fadeIn" onClick={onClose} />

      <div className="fixed bottom-36 right-6 w-80 h-[420px] bg-white rounded-xl shadow-2xl flex flex-col z-50 border border-gray-200 animate-scaleIn">
        {/* Header */}
        <div className="bg-[#0A1F44] text-white p-4 flex justify-between items-center rounded-t-xl">
          <div>
            <h3 className="font-bold text-lg">Chat with Anvictol</h3>
            <p className="text-xs text-gray-300">
              AI Assistant • Always Available
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-300 hover:rotate-90"
            aria-label="Close chat"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } animate-slideUp`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg transition-all duration-300 ${
                  message.sender === "user"
                    ? "bg-[#0A1F44] text-white rounded-br-none text-sm shadow-md hover:shadow-lg"
                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-none text-sm shadow-sm"
                }`}
              >
                <p className="leading-relaxed">{message.text}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start animate-slideUp">
              <div className="bg-white text-gray-800 border border-gray-200 px-4 py-3 rounded-lg rounded-bl-none shadow-sm">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-[#0A1F44] rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-[#0A1F44] rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-[#0A1F44] rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-3 bg-white rounded-b-xl">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A1F44] text-sm transition-all duration-300"
              disabled={isLoading}
              aria-label="Message input"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-[#0A1F44] text-white px-3 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50 hover:scale-105 active:scale-95"
              aria-label="Send message"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
