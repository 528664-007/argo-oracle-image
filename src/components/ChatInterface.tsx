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

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    // Generate more accurate, contextual responses based on user input
    setTimeout(() => {
      const aiResponse = generateOceanResponse(currentInput);
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateOceanResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    
    // Pacific Ocean specific data
    if (input.includes('pacific')) {
      return {
        id: (Date.now() + 1).toString(),
        content: `The Pacific Ocean is the largest ocean basin, covering about 46% of Earth's water surface. Key Argo data points for the Pacific:

🌊 **Temperature Profile**: Surface temperatures range from 30°C (86°F) in tropical regions to 0°C (32°F) near polar areas
📊 **Salinity Levels**: Average 34.6-34.8 PSU (Practical Salinity Units)
🌀 **Major Currents**: Kuroshio Current (warm), California Current (cold), Equatorial Countercurrent
📍 **Argo Float Coverage**: ~3,800 active floats providing real-time data
🌡️ **El Niño/La Niña**: Pacific temperature anomalies affect global weather patterns

Would you like specific data for a particular Pacific region or depth layer?`,
        role: "assistant",
        timestamp: new Date(),
      };
    }
    
    // Atlantic Ocean data
    if (input.includes('atlantic')) {
      return {
        id: (Date.now() + 1).toString(),
        content: `The Atlantic Ocean spans from Arctic to Antarctic, covering ~20% of Earth's surface. Current Argo observations:

🌊 **Thermohaline Circulation**: Atlantic Meridional Overturning Circulation (AMOC) strength: ~15 Sverdrups
🌡️ **Temperature Gradient**: Tropical Atlantic ~27°C, North Atlantic ~4°C average
🧂 **Salinity**: Higher than Pacific due to evaporation, especially in subtropical regions (>37 PSU)
🌀 **Gulf Stream**: Transports ~30 Sverdrups of warm water northward
📍 **Deep Water Formation**: Labrador Sea and Nordic Seas create North Atlantic Deep Water
⚠️ **Climate Impact**: AMOC slowdown affects European climate

Which Atlantic feature interests you most?`,
        role: "assistant",
        timestamp: new Date(),
      };
    }
    
    // Temperature-related queries
    if (input.includes('temperature') || input.includes('temp')) {
      return {
        id: (Date.now() + 1).toString(),
        content: `Ocean temperature data from Argo network reveals crucial climate patterns:

📈 **Global Ocean Warming**: Upper 2000m warmed by 0.33°C since 1969
🏔️ **Depth Profiles**: 
   • Surface: 0-200m (mixed layer, most variable)
   • Thermocline: 200-1000m (rapid temperature drop)
   • Deep water: >1000m (stable, cold ~2-4°C)

🔥 **Current Anomalies**:
   • Marine heatwaves increasing in frequency
   • Arctic waters warming 2x faster than global average
   • Deep ocean warming indicates long-term climate change

📊 **Measurement Precision**: Argo floats measure to ±0.002°C accuracy
🎯 **Coverage**: Temperature profiles every 10 days per float

Need temperature data for a specific region or depth?`,
        role: "assistant",
        timestamp: new Date(),
      };
    }
    
    // Salinity queries
    if (input.includes('salinity') || input.includes('salt')) {
      return {
        id: (Date.now() + 1).toString(),
        content: `Ocean salinity patterns reveal global water cycle changes:

🧂 **Global Average**: 34.7 PSU (Practical Salinity Units)
📊 **Regional Variations**:
   • Mediterranean Sea: ~38.5 PSU (high evaporation)
   • Baltic Sea: ~7-8 PSU (freshwater input)
   • Red Sea: ~40 PSU (extreme evaporation)

🌍 **Climate Connections**:
   • Higher salinity = denser water = deeper sinking
   • Freshwater input from melting ice affects circulation
   • Evaporation patterns linked to global warming

📈 **Trends from Argo Data**:
   • Subtropical regions getting saltier
   • High-latitude regions getting fresher
   • Changes affect ocean stratification

🎯 **Accuracy**: Argo measures to ±0.003 PSU precision

Which salinity aspect would you like to explore?`,
        role: "assistant",
        timestamp: new Date(),
      };
    }
    
    // Current/circulation queries
    if (input.includes('current') || input.includes('circulation')) {
      return {
        id: (Date.now() + 1).toString(),
        content: `Ocean currents drive global climate through heat and water transport:

🌊 **Major Current Systems**:
   • **Gulf Stream**: 30 Sv transport, warms Europe
   • **Kuroshio**: Pacific's "Gulf Stream", affects Japan/Alaska
   • **Antarctic Circumpolar**: Largest current, 600 Sv transport
   • **California Current**: Cold, nutrient-rich upwelling

⚡ **Driving Forces**:
   • Wind stress (surface currents)
   • Density differences (thermohaline circulation)
   • Earth's rotation (Coriolis effect)

📊 **Argo Velocity Data**:
   • Drift patterns reveal deep circulation
   • 1000m parking depth shows intermediate waters
   • Surface drift during data transmission

🌡️ **Climate Impact**: Ocean currents transport heat equivalent to 100x all human energy use

Want details on a specific current system?`,
        role: "assistant",
        timestamp: new Date(),
      };
    }
    
    // Argo-specific queries
    if (input.includes('argo') || input.includes('float')) {
      return {
        id: (Date.now() + 1).toString(),
        content: `The Argo program is revolutionizing ocean science with autonomous profiling floats:

🤖 **Fleet Status**: ~4,000 active floats globally
📊 **Data Coverage**: 
   • One profile per 3°x3° area every 10 days
   • Depth range: 0-2000m (some to 6000m)
   • Parameters: Temperature, salinity, pressure

⚙️ **Float Lifecycle**:
   1. Dive to 1000m parking depth
   2. Drift for 9-10 days
   3. Descend to 2000m
   4. Surface while profiling
   5. Transmit data via satellite
   6. Repeat cycle

🌍 **Global Impact**:
   • 2+ million profiles since 2000
   • Real-time ocean monitoring
   • Climate model validation
   • Weather prediction improvement

💡 **Technology**: 3-5 year lifespan, solar rechargeable batteries

Need specific technical details about Argo operations?`,
        role: "assistant",
        timestamp: new Date(),
      };
    }
    
    // Default more informative response
    return {
      id: (Date.now() + 1).toString(),
      content: `I can help you explore comprehensive ocean data from the Argo network! Here are key areas I can assist with:

🌊 **Ocean Regions**: Pacific, Atlantic, Indian, Arctic, Southern Ocean
📊 **Parameters**: Temperature, salinity, pressure, density profiles  
🌀 **Phenomena**: El Niño/La Niña, ocean currents, marine heatwaves
🔬 **Data Analysis**: Trends, anomalies, climate impacts
📍 **Specific Locations**: Any coordinates or marine regions
⚙️ **Argo Technology**: Float operations, data collection methods

**Recent Highlights**:
• Ocean warming accelerating (0.6W/m² heat uptake)
• Marine heatwave events increasing 50% since 1980s  
• AMOC circulation showing signs of weakening

What aspect of ocean science interests you most? Try asking about specific oceans, temperatures, currents, or phenomena!`,
      role: "assistant",
      timestamp: new Date(),
    };
  };
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