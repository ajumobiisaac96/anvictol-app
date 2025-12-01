"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import AIChatModal from "./ai-chat-modal";

export default function ChatButton() {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <div className="fixed bottom-32 right-6 flex flex-col items-end gap-1 z-40">
        <div className="animate-bounce" style={{ animationDelay: "0s" }}>
          <div className="bg-[#F4A300] text-[#0A1F44] text-xs font-bold px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
            Chat with our online agent now
          </div>
        </div>

        <button
          onClick={() => setShowChat(true)}
          className="w-14 h-14 bg-[#0A1F44] rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
          title="Chat with us"
          aria-label="Open chat"
        >
          <MessageCircle className="w-7 h-7 text-white" />
        </button>
      </div>

      <AIChatModal isOpen={showChat} onClose={() => setShowChat(false)} />
    </>
  );
}
