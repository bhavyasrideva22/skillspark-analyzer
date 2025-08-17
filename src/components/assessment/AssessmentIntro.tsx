import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Users, TrendingUp, Brain, Heart, BarChart3 } from "lucide-react";

interface AssessmentIntroProps {
  onNext: () => void;
}

export const AssessmentIntro = ({ onNext }: AssessmentIntroProps) => {
  const traits = [
    { icon: Heart, label: "Empathy & Emotional Intelligence" },
    { icon: BarChart3, label: "Pattern Recognition & Data Analysis" },
    { icon: Users, label: "Communication & Persuasion" },
    { icon: Target, label: "Customer-Centric Mindset" },
    { icon: Brain, label: "Strategic & Analytical Thinking" },
    { icon: TrendingUp, label: "Resilience & Adaptability" }
  ];

  const careers = [
    "Customer Retention Specialist",
    "CRM Manager", 
    "Customer Experience Strategist",
    "Customer Lifecycle Manager",
    "Loyalty Program Specialist",
    "Churn Analyst"
  ];

  return (
    <div className="space-y-6">
      {/* Purpose */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Welcome to Your Career Assessment
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          This comprehensive assessment evaluates whether a career in customer retention aligns with your 
          personality, skills, cognitive style, interests, and motivation.
        </p>
      </div>

      {/* What is a Customer Retention Specialist */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            What is a Customer Retention Specialist?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            A Customer Retention Specialist focuses on increasing customer loyalty, reducing churn, 
            and improving the customer lifecycle experience by using behavioral, communication, 
            and data-driven strategies.
          </p>
        </CardContent>
      </Card>

      {/* Career Paths */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Typical Careers in This Domain</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {careers.map((career, index) => (
              <Badge key={index} variant="secondary" className="justify-center p-2">
                {career}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Traits */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Traits That Excel in This Role</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {traits.map((trait, index) => {
              const Icon = trait.icon;
              return (
                <div key={index} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="font-medium">{trait.label}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Assessment Overview */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>What You'll Discover</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2" />
            <p>Your psychological fit for customer retention roles</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2" />
            <p>Your technical readiness and skill gaps</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2" />
            <p>Personalized learning recommendations</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2" />
            <p>Alternative career paths if this isn't the right fit</p>
          </div>
        </CardContent>
      </Card>

      {/* Start Button */}
      <div className="text-center pt-4">
        <Button 
          size="lg" 
          variant="hero" 
          onClick={onNext}
          className="animate-pulse-glow h-14 px-10 text-base font-semibold"
        >
          Start Assessment
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Takes approximately 20-30 minutes to complete
        </p>
      </div>
    </div>
  );
};