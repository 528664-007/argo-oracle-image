import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  imageUrl?: string;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="h-8 w-8 border-2 border-primary/20">
          <AvatarFallback className="ocean-gradient text-primary-foreground">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <Card
        className={cn(
          "max-w-[80%] p-4 shadow-ocean",
          isUser
            ? "ocean-gradient text-primary-foreground ml-12"
            : "bg-card border-primary/10"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        
        {message.imageUrl && (
          <div className="mt-3">
            <img
              src={message.imageUrl}
              alt="Generated ocean visualization"
              className="rounded-lg max-w-full h-auto shadow-ocean"
            />
          </div>
        )}
        
        <div className="mt-2 text-xs opacity-70">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </Card>
      
      {isUser && (
        <Avatar className="h-8 w-8 border-2 border-primary/20">
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};