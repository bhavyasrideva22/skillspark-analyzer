import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Target, 
  Clock, 
  Users, 
  TrendingUp, 
  Brain, 
  Award, 
  ArrowRight,
  CheckCircle
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "Psychometric Analysis",
      description: "Evaluate your personality fit for customer retention roles"
    },
    {
      icon: Target,
      title: "Technical Assessment", 
      description: "Test your knowledge of CRM tools and retention strategies"
    },
    {
      icon: TrendingUp,
      title: "WISCAR Framework",
      description: "Deep analysis of your readiness across 6 key dimensions"
    },
    {
      icon: Award,
      title: "Personalized Results",
      description: "Get tailored career recommendations and learning paths"
    }
  ];

  const benefits = [
    "Discover if customer retention is your ideal career path",
    "Identify your strengths and development areas", 
    "Get personalized learning recommendations",
    "Explore alternative career options if needed",
    "Receive a comprehensive skill gap analysis"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight">
            Should I Become a Customer Retention Specialist?
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take our comprehensive assessment to discover if a career in customer retention aligns with your 
            personality, skills, and interests.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              variant="hero"
              onClick={() => navigate("/assessment")}
              className="animate-pulse-glow h-14 px-10 text-base font-semibold"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>20-30 minutes</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary">Science-Based</Badge>
            <Badge variant="secondary">Comprehensive</Badge>
            <Badge variant="secondary">Personalized Results</Badge>
            <Badge variant="secondary">Career Guidance</Badge>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What You'll Discover</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Take This Assessment?</h2>
          <Card className="bg-gradient-card shadow-card">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-primary text-white shadow-elegant max-w-2xl mx-auto">
          <CardContent className="text-center pt-8 pb-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Discover Your Career Path?</h3>
            <p className="mb-6 opacity-90">
              Join thousands of professionals who have used our assessment to make informed career decisions.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate("/assessment")}
              className="bg-white text-primary hover:bg-white/90 h-14 px-10 text-base font-semibold"
            >
              Begin Assessment Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
