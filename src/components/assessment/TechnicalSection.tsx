import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AssessmentData } from "@/pages/Assessment";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface TechnicalSectionProps {
  onNext: () => void;
  assessmentData: AssessmentData;
  setAssessmentData: (data: AssessmentData) => void;
}

const questions = [
  {
    id: "churn_scenario",
    text: "A customer who has been with your company for 2 years suddenly stops using your product. What's your first action?",
    options: [
      "Send them a discount offer immediately",
      "Analyze their usage patterns and reach out with personalized insights",
      "Wait to see if they return naturally",
      "Remove them from active customer lists"
    ],
    correct: 1,
    category: "Customer Lifecycle Management"
  },
  {
    id: "email_subject",
    text: "Which email subject line would likely have the highest engagement for re-engaging inactive customers?",
    options: [
      "We miss you! Come back for 50% off",
      "Your account will be closed soon",
      "We've made improvements based on your feedback",
      "Special offer just for you!"
    ],
    correct: 2,
    category: "Communication Strategy"
  },
  {
    id: "churn_rate",
    text: "If you have 1000 customers at the start of the month and 950 at the end, what's your monthly churn rate?",
    options: [
      "5%",
      "50%",
      "95%",
      "Cannot be determined"
    ],
    correct: 0,
    category: "Data Analysis"
  },
  {
    id: "segmentation",
    text: "Which customer segment should typically receive the highest retention priority?",
    options: [
      "New customers (0-3 months)",
      "High-value customers showing early warning signs",
      "Long-term loyal customers",
      "Price-sensitive customers"
    ],
    correct: 1,
    category: "Customer Segmentation"
  },
  {
    id: "nps_score",
    text: "A customer gives you an NPS score of 6. How should you categorize and respond to them?",
    options: [
      "Promoter - ask for referrals",
      "Passive - send general marketing",
      "Detractor - investigate concerns and improve experience",
      "Neutral - no action needed"
    ],
    correct: 2,
    category: "Customer Feedback"
  },
  {
    id: "retention_strategy",
    text: "What's the most effective long-term retention strategy?",
    options: [
      "Frequent discount offers",
      "Quarterly check-in calls",
      "Proactive value delivery and success enablement",
      "Loyalty points programs"
    ],
    correct: 2,
    category: "Strategic Thinking"
  },
  {
    id: "crm_purpose",
    text: "What's the primary purpose of a CRM system in customer retention?",
    options: [
      "Store customer contact information",
      "Track customer interactions and identify retention opportunities",
      "Send automated marketing emails",
      "Generate sales reports"
    ],
    correct: 1,
    category: "Technology Knowledge"
  },
  {
    id: "cohort_analysis",
    text: "In cohort analysis, what does it mean if Month 6 retention drops significantly compared to Month 3?",
    options: [
      "The product has seasonal variations",
      "There may be an onboarding or value realization issue",
      "Customers are naturally churning",
      "The analysis is incorrect"
    ],
    correct: 1,
    category: "Data Interpretation"
  }
];

export const TechnicalSection = ({ onNext, assessmentData, setAssessmentData }: TechnicalSectionProps) => {
  const [responses, setResponses] = useState<Record<string, number>>(assessmentData.technical);
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
        technical: responses
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
        <h3 className="text-xl font-semibold mb-2">Technical Skills Assessment</h3>
        <p className="text-muted-foreground">
          Test your knowledge of customer retention concepts, tools, and best practices
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
            className="space-y-3"
          >
            {currentQ.options.map((option, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 hover:bg-secondary/30 rounded-lg transition-colors border border-transparent hover:border-primary/20">
                <RadioGroupItem value={index.toString()} id={`q${currentQ.id}-${index}`} className="mt-0.5" />
                <Label 
                  htmlFor={`q${currentQ.id}-${index}`}
                  className="flex-1 cursor-pointer leading-relaxed"
                >
                  {option}
                </Label>
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
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button
          variant="hero"
          onClick={handleNext}
          disabled={!hasResponse}
        >
          {currentQuestion === questions.length - 1 ? "Continue to WISCAR Analysis" : "Next Question"}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};