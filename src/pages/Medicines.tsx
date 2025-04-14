import React, { useState } from "react";
import { ArrowLeft, Search, Plus, Clock, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

// Updated sample medications data with descriptions
const SAMPLE_MEDICATIONS = [
  {
    id: "1",
    name: "Losartan",
    dosage: "50mg",
    schedule: "Once daily",
    timeOfDay: "Morning",
    remainingDays: 15,
    totalDays: 30,
    forWhom: "Self",
    description: "Blood pressure medication that helps relax blood vessels",
    alternatives: ["Valsartan", "Olmesartan", "Telmisartan"]
  },
  {
    id: "2",
    name: "Vitamin D3",
    dosage: "1000 IU",
    schedule: "Once daily",
    timeOfDay: "Morning with breakfast",
    remainingDays: 25,
    totalDays: 30,
    forWhom: "Self",
    description: "Supports bone health and immune system function",
    alternatives: ["Calcitriol", "Ergocalciferol", "Cholecalciferol"]
  },
  {
    id: "3",
    name: "Metformin",
    dosage: "500mg",
    schedule: "Twice daily",
    timeOfDay: "Morning and evening with meals",
    remainingDays: 5,
    totalDays: 30,
    forWhom: "Father",
  },
  {
    id: "4",
    name: "Aspirin",
    dosage: "81mg",
    schedule: "Once daily",
    timeOfDay: "Evening",
    remainingDays: 20,
    totalDays: 30,
    forWhom: "Mother",
  },
];

const Medicines = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter medications based on search term
  const filteredMedications = SAMPLE_MEDICATIONS.filter(
    (medication) =>
      medication.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medication.forWhom.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h2 className="text-2xl font-medium">Medicines</h2>
      </div>

      <div className="flex items-center mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search medications..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          className="ml-2"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <Button 
          variant={searchTerm === "" ? "default" : "outline"}
          size="sm"
          onClick={() => setSearchTerm("")}
        >
          All
        </Button>
        <Button 
          variant={searchTerm === "Self" ? "default" : "outline"}
          size="sm"
          onClick={() => setSearchTerm("Self")}
        >
          Self
        </Button>
        <Button 
          variant={searchTerm === "Father" ? "default" : "outline"}
          size="sm"
          onClick={() => setSearchTerm("Father")}
        >
          Father
        </Button>
        <Button 
          variant={searchTerm === "Mother" ? "default" : "outline"}
          size="sm"
          onClick={() => setSearchTerm("Mother")}
        >
          Mother
        </Button>
      </div>

      {filteredMedications.length > 0 ? (
        <div className="space-y-4">
          {filteredMedications.map((medication) => (
            <Card key={medication.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{medication.name}</h3>
                    <p className="text-gray-600">{medication.dosage}</p>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {medication.schedule} ({medication.timeOfDay})
                    </div>
                  </div>
                  <Badge>{medication.forWhom}</Badge>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <p>{medication.description}</p>
                  <div className="mt-2">
                    <span className="font-medium">Alternatives: </span>
                    {medication.alternatives.join(", ")}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>
                      {medication.remainingDays} days remaining
                    </span>
                    <span className={medication.remainingDays < 7 ? "text-red-500" : ""}>
                      {Math.round((medication.remainingDays / medication.totalDays) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(medication.remainingDays / medication.totalDays) * 100}
                    className={medication.remainingDays < 7 ? "bg-red-100" : ""}
                  />
                  {medication.remainingDays < 7 && (
                    <div className="flex items-center mt-2 text-red-500 text-sm">
                      <Bell className="h-3 w-3 mr-1" />
                      <span>Low supply! Refill soon</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No medications found</p>
          <Button>
            Add your first medication
          </Button>
        </div>
      )}
    </div>
  );
};

export default Medicines;
