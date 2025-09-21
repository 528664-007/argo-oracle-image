import { useState } from "react";
import { X, Sparkles, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ImageGenerationPanelProps {
  onClose: () => void;
  onImageGenerated: (imageUrl: string) => void;
}

export const ImageGenerationPanel = ({ onClose, onImageGenerated }: ImageGenerationPanelProps) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    // Simulate image generation for now
    setTimeout(() => {
      // Using a placeholder ocean image URL for demo
      const placeholderUrl = "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&h=500&fit=crop";
      setGeneratedImage(placeholderUrl);
      setIsGenerating(false);
    }, 3000);
  };

  const handleUseImage = () => {
    if (generatedImage) {
      onImageGenerated(generatedImage);
      onClose();
    }
  };

  return (
    <div className="w-96 border-l bg-card/95 backdrop-blur-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Ocean Visualization</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Prompt Input */}
      <div className="space-y-2">
        <Label htmlFor="image-prompt">Describe your ocean visualization</Label>
        <Textarea
          id="image-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Ocean temperature map showing warm currents, underwater coral reef ecosystem, satellite view of ocean currents..."
          className="h-24 resize-none bg-background/80 border-primary/20 focus:border-primary"
        />
      </div>

      {/* Quick Prompts */}
      <div className="space-y-2">
        <Label>Quick Ideas</Label>
        <div className="grid grid-cols-1 gap-2">
          {[
            "Ocean temperature heatmap",
            "Argo float data visualization",
            "Deep sea currents diagram",
            "Marine ecosystem illustration"
          ].map((suggestion) => (
            <Button
              key={suggestion}
              variant="outline"
              size="sm"
              className="text-left justify-start h-auto p-2 text-xs border-primary/20 hover:bg-primary/10"
              onClick={() => setPrompt(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleGenerateImage}
        disabled={!prompt.trim() || isGenerating}
        className="w-full ocean-gradient shadow-ocean hover:shadow-deep transition-all duration-300"
      >
        {isGenerating ? (
          <>
            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Ocean Visual
          </>
        )}
      </Button>

      {/* Generated Image */}
      {generatedImage && (
        <Card className="p-4 space-y-4 shadow-ocean">
          <img
            src={generatedImage}
            alt="Generated ocean visualization"
            className="w-full rounded-lg shadow-ocean"
          />
          <div className="flex space-x-2">
            <Button
              onClick={handleUseImage}
              className="flex-1 ocean-gradient shadow-ocean"
            >
              Use in Chat
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-primary/20 hover:bg-primary/10"
              onClick={() => {
                // Download functionality would go here
                const link = document.createElement('a');
                link.href = generatedImage;
                link.download = 'ocean-visualization.jpg';
                link.click();
              }}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};