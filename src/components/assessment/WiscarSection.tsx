import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AssessmentData } from "@/pages/Assessment";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface WiscarSectionProps {
  onNext: () => void;
  assessmentData: AssessmentData;
  setAssessmentData: (data: AssessmentData) => void;
}

const wiscarQuestions = [
  {
    id: "will_consistency",
    type: "text",
    dimension: "Will",
    text: "Describe a time when you helped improve a customer relationship or prevented someone from leaving a service/product. What motivated you to do this?",
    placeholder: "Share a specific example of your motivation to help retain customers..."
  },
  {
    id: "interest_rating",
    type: "scale", 
    dimension: "Interest",
    text: "How interested are you in long-term customer success and relationship building?",
    options: [
      "Not interested at all",
      "Slightly interested", 
      "Moderately interested",
      "Very interested",
      "Extremely interested"
    ]
  },
  {
    id: "skill_experience", 
    type: "text",
    dimension: "Skill",
    text: "What experience do you have with customer service, relationship management, or data analysis? Include any relevant tools or systems you've used.",
    placeholder: "Describe your relevant skills and experience..."
  },
  {
    id: "cognitive_scenario",
    type: "text", 
    dimension: "Cognitive",
    text: "A customer's usage has dropped 60% over the past 3 months, but they haven't contacted support. How would you approach this situation and what data would you want to analyze?",
    placeholder: "Describe your analytical approach..."
  },
  {
    id: "learning_adaptation",
    type: "scale",
    dimension: "Ability to Learn", 
    text: "How comfortable are you with learning new tools, analyzing customer data, and adapting your approach based on feedback?",
    options: [
      "Very uncomfortable - prefer familiar methods",
      "Somewhat uncomfortable but willing to try",
      "Neutral - depends on the situation", 
      "Comfortable and enjoy learning new approaches",
      "Very comfortable - thrive on continuous learning"
    ]
  },
  {
    id: "tool_familiarity",
    type: "scale",
    dimension: "Real-World Alignment",
    text: "How familiar are you with CRM systems, customer analytics tools, and retention metrics like churn rate, NPS, and customer lifetime value?",
    options: [
      "Not familiar at all",
      "Heard of them but never used",
      "Basic understanding or limited use",
      "Familiar and have some experience", 
      "Very familiar and experienced"
    ]
  }
];

export const WiscarSection = ({ onNext, assessmentData, setAssessmentData }: WiscarSectionProps) => {
  const [responses, setResponses] = useState<Record<string, any>>(assessmentData.wiscar);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleResponse = (questionId: string, value: string | number) => {
    const newResponses = { ...responses, [questionId]: value };
    setResponses(newResponses);
  };

  const handleNext = () => {
    if (currentQuestion < wiscarQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setAssessmentData({
        ...assessmentData,
        wiscar: responses
      });
      onNext();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / wiscarQuestions.length) * 100;
  const currentQ = wiscarQuestions[currentQuestion];
  const hasResponse = responses[currentQ.id] !== undefined && responses[currentQ.id] !== "";

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">WISCAR Framework Analysis</h3>
        <p className="text-muted-foreground">
          Deep dive into your Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Question {currentQuestion + 1} of {wiscarQuestions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-primary font-medium">
              {currentQ.dimension}
            </div>
            <div className="text-xs text-muted-foreground px-2 py-1 bg-secondary rounded-full">
              WISCAR Framework
            </div>
          </div>
          <CardTitle className="text-lg leading-relaxed">
            {currentQ.text}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentQ.type === "text" ? (
            <Textarea
              value={responses[currentQ.id] || ""}
              onChange={(e) => handleResponse(currentQ.id, e.target.value)}
              placeholder={currentQ.placeholder}
              className="min-h-[120px] resize-none"
            />
          ) : (
            <RadioGroup
              value={responses[currentQ.id]?.toString() || ""}
              onValueChange={(value) => handleResponse(currentQ.id, parseInt(value))}
              className="space-y-3"
            >
              {currentQ.options?.map((option, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 hover:bg-secondary/30 rounded-lg transition-colors border border-transparent hover:border-primary/20">
                  <RadioGroupItem value={(index + 1).toString()} id={`q${currentQ.id}-${index}`} className="mt-0.5" />
                  <Label 
                    htmlFor={`q${currentQ.id}-${index}`}
                    className="flex-1 cursor-pointer leading-relaxed"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button
          variant="hero"
          onClick={handleNext}
          disabled={!hasResponse}
        >
          {currentQuestion === wiscarQuestions.length - 1 ? "View Results" : "Next Question"}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};