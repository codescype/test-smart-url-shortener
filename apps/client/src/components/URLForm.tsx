
import { useState } from "react";
import { cn } from "@/lib/utils";
import GradientButton from "./GradientButton";
import { toast } from "@/components/ui/use-toast";

interface URLFormProps {
  className?: string;
  onFormSubmit?: (formData: { url: string; action: "encode" | "decode" }) => void;
}

const URLForm = ({ className, onFormSubmit }: URLFormProps) => {
  const [url, setUrl] = useState("");
  const [action, setAction] = useState<"encode" | "decode">("encode");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a URL to continue",
        variant: "destructive",
      });
      return;
    }

    // Mock functionality for now - in a real app this would call the API
    if (onFormSubmit) {
      onFormSubmit({ url, action });
    } else {
      toast({
        title: action === "encode" ? "URL Shortened" : "URL Decoded",
        description: action === "encode" 
          ? "Your shortened URL has been created!" 
          : "Original URL retrieved successfully!",
      });
    }
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <form onSubmit={handleSubmit} className="glass-effect rounded-lg p-6">
        <div className="flex flex-col space-y-4">
          <label htmlFor="url" className="text-sm font-medium text-gray-600">
            Enter URL
          </label>
          <div className="relative">
            <input
              id="url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={action === "encode" ? "https://example.com/very/long/url" : "https://short.ly/abc123"}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <div className="flex rounded-lg overflow-hidden border border-gray-200 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setAction("encode")}
              className={cn(
                "flex-1 px-4 py-2.5 text-sm font-medium transition-colors",
                action === "encode"
                  ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-600"
              )}
            >
              Encode
            </button>
            <button
              type="button"
              onClick={() => setAction("decode")}
              className={cn(
                "flex-1 px-4 py-2.5 text-sm font-medium transition-colors",
                action === "decode"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-600"
              )}
            >
              Decode
            </button>
          </div>
          <GradientButton
            type="submit"
            variant={action === "encode" ? "primary" : "secondary"}
            className="sm:ml-auto"
          >
            {action === "encode" ? "Shorten URL" : "Get Original URL"}
          </GradientButton>
        </div>
      </form>
    </div>
  );
};

export default URLForm;
