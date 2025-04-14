
import React, { useState } from "react";
import { Camera, Upload, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ScanDocument = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleScan = () => {
    // In a real app, this would access the camera
    setScanning(true);
    toast.info("Accessing camera...");
    
    // Simulate scanning delay
    setTimeout(() => {
      setScanning(false);
      setImageSrc("/placeholder.svg");
      toast.success("Document scanned successfully!");
    }, 2000);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // In a real app, we would upload the file to Firebase Storage
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      toast.success("Document uploaded successfully!");
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    // In a real app, we would save the document to Firebase
    toast.success("Document saved to your reports!");
    navigate("/reports");
  };

  return (
    <div className="container pb-16">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-medium">Scan Document</h2>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          {imageSrc ? (
            <div className="flex flex-col items-center">
              <img 
                src={imageSrc} 
                alt="Scanned document" 
                className="max-h-80 object-contain mb-4"
              />
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => setImageSrc(null)}
                >
                  Rescan
                </Button>
                <Button onClick={handleSave}>
                  Save to Reports
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                <p className="text-gray-500 mb-4">
                  Scan a document or upload from your device
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button 
                    onClick={handleScan} 
                    disabled={scanning}
                    className="flex items-center"
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    {scanning ? "Accessing Camera..." : "Scan Now"}
                  </Button>
                  <Button variant="outline" asChild>
                    <label className="flex items-center cursor-pointer">
                      <Upload className="h-5 w-5 mr-2" />
                      Upload File
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleUpload} 
                        className="hidden" 
                      />
                    </label>
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Supported formats: JPG, PNG, PDF
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="bg-nura-blue-light/20 rounded-lg p-4 border border-nura-blue-light">
        <h3 className="font-medium mb-2">Tips for good scans:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Ensure good lighting</li>
          <li>Place document on a flat, contrasting surface</li>
          <li>Keep the camera steady</li>
          <li>Make sure the entire document is visible</li>
        </ul>
      </div>
    </div>
  );
};

export default ScanDocument;
