
import React, { useState } from "react";
import { ArrowLeft, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// Sample data for reports
const SAMPLE_REPORTS = [
  {
    id: "1",
    title: "Blood Test Results",
    date: "Apr 5, 2025",
    relationship: "Self",
    category: "Lab Report",
  },
  {
    id: "2",
    title: "X-Ray Report",
    date: "Mar 22, 2025",
    relationship: "Father",
    category: "Radiology",
  },
  {
    id: "3",
    title: "Cardiology Consultation",
    date: "Feb 15, 2025",
    relationship: "Mother",
    category: "Consultation",
  },
  {
    id: "4",
    title: "Prescription",
    date: "Apr 1, 2025",
    relationship: "Self",
    category: "Prescription",
  },
];

const Reports = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter reports based on search term
  const filteredReports = SAMPLE_REPORTS.filter(
    (report) =>
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.relationship.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRelationshipFilter = (relationship: string) => {
    setSearchTerm(relationship);
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
        <h2 className="text-2xl font-medium">Medical Reports</h2>
      </div>

      <div className="flex items-center mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search reports..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          className="ml-2"
          onClick={() => navigate("/scan")}
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
          onClick={() => handleRelationshipFilter("Self")}
        >
          Self
        </Button>
        <Button 
          variant={searchTerm === "Father" ? "default" : "outline"}
          size="sm"
          onClick={() => handleRelationshipFilter("Father")}
        >
          Father
        </Button>
        <Button 
          variant={searchTerm === "Mother" ? "default" : "outline"}
          size="sm"
          onClick={() => handleRelationshipFilter("Mother")}
        >
          Mother
        </Button>
      </div>

      {filteredReports.length > 0 ? (
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <Card 
              key={report.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/reports/${report.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{report.title}</h3>
                    <p className="text-gray-500 text-sm">{report.date}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="outline">{report.category}</Badge>
                    <Badge>{report.relationship}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No reports found</p>
          <Button onClick={() => navigate("/scan")}>
            Add your first report
          </Button>
        </div>
      )}
    </div>
  );
};

export default Reports;
