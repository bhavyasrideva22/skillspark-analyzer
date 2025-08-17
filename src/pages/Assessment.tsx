import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AssessmentIntro } from "@/components/assessment/AssessmentIntro";
import { PsychometricSection } from "@/components/assessment/PsychometricSection";
import { TechnicalSection } from "@/components/assessment/TechnicalSection";
import { WiscarSection } from "@/components/assessment/WiscarSection";
import { ResultsPage } from "@/components/assessment/ResultsPage";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type AssessmentData = {
  psychometric: Record<string, number>;
  technical: Record<string, number>;
  wiscar: Record<string, number>;
  completed: boolean;
};

const Assessment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    psychometric: {},
    technical: {},
    wiscar: {},
    completed: false
  });

  const steps = [
    { title: "Introduction", component: AssessmentIntro },
    { title: "Psychometric Assessment", component: PsychometricSection },
    { title: "Technical Skills", component: TechnicalSection },
    { title: "WISCAR Analysis", component: WiscarSection },
    { title: "Results", component: ResultsPage }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setAssessmentData(prev => ({ ...prev, completed: true }));
    setCurrentStep(steps.length - 1);
  };

  const CurrentComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Customer Retention Specialist Assessment
          </h1>
          <p className="text-muted-foreground">
            Discover if this career path aligns with your skills and interests
          </p>
        </div>

        {/* Progress */}
        <Card className="mb-8 bg-gradient-card shadow-card">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2">
              {steps.map((step, index) => (
                <div key={index} className="text-xs text-center">
                  <div
                    className={`w-3 h-3 rounded-full mx-auto mb-1 ${
                      index <= currentStep ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                  <span className={index <= currentStep ? 'text-primary' : 'text-muted-foreground'}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Step */}
        <Card className="mb-8 bg-gradient-card shadow-card animate-slide-up">
          <CardHeader>
            <CardTitle className="text-xl">{steps[currentStep].title}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentStep === 0 ? (
              <AssessmentIntro onNext={handleNext} />
            ) : currentStep === 4 ? (
              <ResultsPage assessmentData={assessmentData} />
            ) : currentStep === 1 ? (
              <PsychometricSection
                onNext={handleNext}
                assessmentData={assessmentData}
                setAssessmentData={setAssessmentData}
              />
            ) : currentStep === 2 ? (
              <TechnicalSection
                onNext={handleNext}
                assessmentData={assessmentData}
                setAssessmentData={setAssessmentData}
              />
            ) : currentStep === 3 ? (
              <WiscarSection
                onNext={handleNext}
                assessmentData={assessmentData}
                setAssessmentData={setAssessmentData}
              />
            ) : null}
          </CardContent>
        </Card>

        {/* Navigation */}
        {currentStep !== 0 && currentStep !== steps.length - 1 && (
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              variant="default"
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assessment;