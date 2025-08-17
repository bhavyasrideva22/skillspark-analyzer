import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AssessmentData } from "@/pages/Assessment";
import { ChevronRight } from "lucide-react";

interface PsychometricSectionProps {
  onNext: () => void;
  assessmentData: AssessmentData;
  setAssessmentData: (data: AssessmentData) => void;
}

const questions = [
  {
    id: "empathy",
    text: "I get satisfaction from helping frustrated customers feel heard and understood.",
    category: "Empathy & Emotional Intelligence"
  },
  {
    id: "longterm",
    text: "I prefer working on long-term relationships over quick wins or transactions.",
    category: "Relationship Focus"
  },
  {
    id: "patterns",
    text: "I'm comfortable analyzing customer behavior patterns to suggest retention strategies.",
    category: "Analytical Thinking"
  },
  {
    id: "resilience",
    text: "I stay motivated even when customers are initially resistant or unhappy.",
    category: "Resilience"
  },
  {
    id: "communication",
    text: "I can explain complex solutions in simple terms that customers understand.",
    category: "Communication Skills"
  },
  {
    id: "problem_solving",
    text: "I enjoy finding creative solutions to prevent customers from leaving.",
    category: "Problem Solving"
  },
  {
    id: "data_comfort",
    text: "I feel comfortable working with data, metrics, and customer feedback systems.",
    category: "Data Literacy"
  },
  {
    id: "patience",
    text: "I'm patient when dealing with customers who need extra time or attention.",
    category: "Patience & Understanding"
  },
  {
    id: "growth_mindset",
    text: "I actively seek feedback and look for ways to improve my approach.",
    category: "Growth Mindset"
  },
  {
    id: "motivation",
    text: "I'm motivated by helping customers succeed and seeing their businesses grow.",
    category: "Intrinsic Motivation"
  }
];

const scaleLabels = [
  "Strongly Disagree",
  "Disagree", 
  "Neutral",
  "Agree",
  "Strongly Agree"
];

export const PsychometricSection = ({ onNext, assessmentData, setAssessmentData }: PsychometricSectionProps) => {
  const [responses, setResponses] = useState<Record<string, number>>(assessmentData.psychometric);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleResponse = (questionId: string, value: string) => {
    const newResponses = { ...responses, [questionId]: parseInt(value) };
    setResponses(newResponses);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setAssessmentData({
        ...assessmentData,
        psychometric: responses
      });
      onNext();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const hasResponse = responses[currentQ.id] !== undefined;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Psychometric Assessment</h3>
        <p className="text-muted-foreground">
          Rate how much you agree with each statement about your work preferences and personality
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <div className="text-sm text-primary font-medium mb-2">
            {currentQ.category}
          </div>
          <CardTitle className="text-lg leading-relaxed">
            {currentQ.text}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={responses[currentQ.id]?.toString() || ""}
            onValueChange={(value) => handleResponse(currentQ.id, value)}
            className="space-y-4"
          >
            {scaleLabels.map((label, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 hover:bg-secondary/30 rounded-lg transition-colors">
                <RadioGroupItem value={(index + 1).toString()} id={`q${currentQ.id}-${index}`} />
                <Label 
                  htmlFor={`q${currentQ.id}-${index}`}
                  className="flex-1 cursor-pointer font-medium"
                >
                  {label}
                </Label>
                <div className="text-sm text-muted-foreground">
                  {index + 1}
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        <Button
          variant="hero"
          onClick={handleNext}
          disabled={!hasResponse}
        >
          {currentQuestion === questions.length - 1 ? "Continue to Technical Assessment" : "Next Question"}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};