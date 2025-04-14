import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import VoiceButton from "@/components/VoiceButton";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const Assistant = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your NuraCare AI assistant. How can I help you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sampleResponses: Record<string, string> = {
    "report": "Based on the records I have, your last medical report was a blood test on April 5. The results showed normal levels for all key indicators. Would you like me to list the specific values?",
    "medicine": "Your current prescribed medications include: 1) Losartan 50mg (take once daily in the morning), 2) Vitamin D3 1000 IU (once daily). Would you like information about either of these?",
    "appointment": "I see you have a doctor appointment scheduled with Dr. Smith tomorrow at 10:30 AM. Would you like me to remind you again in the morning?",
    "blood pressure": "According to your last 3 measurements, your blood pressure has been averaging 124/78, which is within the normal range. Would you like tips to maintain healthy blood pressure?",
    "help": "I can help you with: viewing your medical reports, tracking medications, managing appointments, answering health questions, and providing general health information. What would you like assistance with?",
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      let responseContent = "I'm not sure how to help with that. Could you try asking in a different way?";
      
      for (const [keyword, response] of Object.entries(sampleResponses)) {
        if (input.toLowerCase().includes(keyword)) {
          responseContent = response;
          break;
        }
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="container pb-16 flex flex-col h-[calc(100vh-140px)]">
      <div className="flex items-center mb-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-medium">AI Assistant</h2>
      </div>

      <Card className="flex-grow mb-4 overflow-hidden">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-nura-blue text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none"
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {message.sender === "assistant" ? (
                      <Bot className="h-4 w-4 mr-1" />
                    ) : (
                      <User className="h-4 w-4 mr-1" />
                    )}
                    <span className="text-xs font-medium">
                      {message.sender === "user" ? "You" : "NuraCare AI"}
                    </span>
                  </div>
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] px-4 py-2 bg-gray-100 rounded-lg rounded-tl-none">
                  <div className="flex items-center">
                    <Bot className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">NuraCare AI</span>
                  </div>
                  <div className="flex space-x-1 my-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </Card>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Ask me anything about your health records..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="flex-grow"
        />
        <VoiceButton onTranscript={(text) => setInput(text)} />
        <Button
          size="icon"
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>

      <div className="mt-2 text-xs text-gray-500">
        <p>Try: "What did my last report say?" or "When is my next appointment?"</p>
      </div>
    </div>
  );
};

export default Assistant;
