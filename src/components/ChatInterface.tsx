import { useState } from "react";
import { Send, Image, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChatMessage } from "./ChatMessage";
import { ImageGenerationPanel } from "./ImageGenerationPanel";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  imageUrl?: string;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your Argo Ocean Data AI assistant. I can help you explore ocean data, answer questions about marine science, and generate images related to oceanography. What would you like to know about our oceans?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showImagePanel, setShowImagePanel] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response for now
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand you're asking about "${input}". As an ocean data specialist, I can help you explore various aspects of oceanography including temperature profiles, salinity measurements, and current patterns from the Argo float network. What specific ocean parameters would you like to explore?`,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="ocean-gradient p-6 shadow-ocean">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-light/20 rounded-lg">
              <Waves className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">
                Argo Ocean Intelligence
              </h1>
              <p className="text-primary-foreground/80 text-sm">
                AI-powered ocean data exploration and visualization
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <Card className="p-4 shadow-ocean wave-animation">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200"></div>
                <span className="text-muted-foreground ml-2">
                  Analyzing ocean data...
                </span>
              </div>
            </Card>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-card/50 backdrop-blur-sm">
          <div className="flex space-x-2 max-w-4xl mx-auto">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about ocean data, temperatures, currents, or marine science..."
              className="flex-1 bg-background/80 border-primary/20 focus:border-primary"
              disabled={isLoading}
            />
            <Button
              onClick={() => setShowImagePanel(!showImagePanel)}
              variant="outline"
              size="icon"
              className="border-primary/20 hover:bg-primary/10"
            >
              <Image className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="ocean-gradient shadow-ocean hover:shadow-deep transition-all duration-300"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Image Generation Panel */}
      {showImagePanel && (
        <ImageGenerationPanel
          onClose={() => setShowImagePanel(false)}
          onImageGenerated={(imageUrl) => {
            const imageMessage: Message = {
              id: Date.now().toString(),
              content: "Here's the generated ocean visualization:",
              role: "assistant",
              timestamp: new Date(),
              imageUrl,
            };
            setMessages((prev) => [...prev, imageMessage]);
          }}
        />
      )}
    </div>
  );
};