import React, { useState } from "react";
import { ArrowLeft, Plus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const SAMPLE_REMINDERS = [
  {
    id: "1",
    title: "Take Blood Pressure Medication",
    time: "08:00 AM",
    type: "medication",
  },
  {
    id: "2",
    title: "Doctor Appointment - Dr. Smith",
    time: "10:30 AM",
    type: "appointment",
  },
  {
    id: "3",
    title: "Take Vitamin Supplements",
    time: "01:00 PM",
    type: "medication",
  },
  {
    id: "4",
    title: "Lab Test Results Expected",
    time: "04:00 PM",
    type: "other",
  },
];

const CalendarPage = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>(new Date());

  const formattedDate = format(date, "EEEE, MMMM d, yyyy");

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
        <h2 className="text-2xl font-medium">Calendar</h2>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4 flex justify-center">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && setDate(newDate)}
            className="rounded-md border w-full max-w-[350px]"
          />
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-medium">{formattedDate}</h3>
          <p className="text-gray-500">4 reminders today</p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>

      <div className="space-y-4">
        {SAMPLE_REMINDERS.map((reminder) => (
          <Card key={reminder.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{reminder.title}</h4>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-3 w-3 mr-1" />
                    {reminder.time}
                  </div>
                </div>
                <Badge 
                  variant={reminder.type === "medication" ? "default" : 
                          reminder.type === "appointment" ? "outline" : "secondary"}
                >
                  {reminder.type === "medication" ? "Medicine" : 
                   reminder.type === "appointment" ? "Appointment" : "Reminder"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CalendarPage;
