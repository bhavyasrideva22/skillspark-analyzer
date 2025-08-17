import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AssessmentData } from "@/pages/Assessment";
import { 
  Target, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Users, 
  BarChart3,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from "lucide-react";

interface ResultsPageProps {
  assessmentData: AssessmentData;
}

export const ResultsPage = ({ assessmentData }: ResultsPageProps) => {
  // Calculate scores based on assessment data
  const calculatePsychometricScore = () => {
    const responses = Object.values(assessmentData.psychometric);
    if (responses.length === 0) return 0;
    const average = responses.reduce((sum: number, score: number) => sum + score, 0) / responses.length;
    return Math.round((average / 5) * 100);
  };

  const calculateTechnicalScore = () => {
    const correctAnswers = [1, 2, 0, 1, 2, 2, 1, 1]; // Correct answer indices
    const responses = Object.values(assessmentData.technical);
    if (responses.length === 0) return 0;
    
    let correct = 0;
    responses.forEach((response, index) => {
      if (response === correctAnswers[index]) correct++;
    });
    return Math.round((correct / correctAnswers.length) * 100);
  };

  const calculateWiscarScores = () => {
    // Simplified WISCAR calculation based on responses
    const scales = Object.values(assessmentData.wiscar).filter(v => typeof v === 'number');
    const texts = Object.values(assessmentData.wiscar).filter(v => typeof v === 'string');
    
    const scaleAverage = scales.length > 0 ? scales.reduce((sum, score) => sum + score, 0) / scales.length : 3;
    const textQuality = texts.every((text: string) => text.length > 50) ? 4 : 3; // Simple quality check
    
    return {
      will: Math.round(((scaleAverage + textQuality) / 2 / 5) * 100),
      interest: Math.round((scaleAverage / 5) * 100),
      skill: Math.round(((scaleAverage + textQuality) / 2 / 5) * 100),
      cognitive: Math.round(((scaleAverage + textQuality) / 2 / 5) * 100),
      ability: Math.round((scaleAverage / 5) * 100),
      realWorld: Math.round((scaleAverage / 5) * 100)
    };
  };

  const psychometricScore = calculatePsychometricScore();
  const technicalScore = calculateTechnicalScore();
  const wiscarScores = calculateWiscarScores();
  
  const overallScore = Math.round(
    (psychometricScore + technicalScore + Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6) / 3
  );

  const getRecommendation = () => {
    if (overallScore >= 80) return "Strong Fit";
    if (overallScore >= 65) return "Good Potential";
    if (overallScore >= 50) return "Needs Development";
    return "Consider Alternatives";
  };

  const getRecommendationColor = () => {
    if (overallScore >= 80) return "bg-success";
    if (overallScore >= 65) return "bg-primary";
    if (overallScore >= 50) return "bg-warning";
    return "bg-error";
  };

  const careerPaths = [
    { title: "Customer Retention Specialist", match: Math.max(overallScore - 5, 0) },
    { title: "CRM Manager", match: Math.max(overallScore - 10, 0) },
    { title: "Customer Success Manager", match: Math.max(overallScore - 8, 0) },
    { title: "Customer Experience Analyst", match: Math.max(overallScore - 12, 0) },
    { title: "Loyalty Program Manager", match: Math.max(overallScore - 15, 0) }
  ];

  const learningPath = [
    "Customer Journey Mapping Fundamentals",
    "CRM Systems & Analytics",
    "Retention Strategy Development",
    "Customer Communication Excellence",
    "Data-Driven Decision Making"
  ];

  return (
    <div className="space-y-8">
      {/* Overall Result */}
      <div className="text-center">
        <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-lg ${getRecommendationColor()}`}>
          <Award className="w-6 h-6" />
          {getRecommendation()}
        </div>
        <div className="mt-4">
          <div className="text-5xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            {overallScore}%
          </div>
          <p className="text-lg text-muted-foreground">Overall Fit Score</p>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Psychological Fit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Score</span>
                <span className="font-bold text-lg">{psychometricScore}%</span>
              </div>
              <Progress value={psychometricScore} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {psychometricScore >= 80 ? "Excellent personality fit for retention roles" :
                 psychometricScore >= 60 ? "Good alignment with some areas for development" :
                 "Consider developing empathy and communication skills"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Technical Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Score</span>
                <span className="font-bold text-lg">{technicalScore}%</span>
              </div>
              <Progress value={technicalScore} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {technicalScore >= 80 ? "Strong technical knowledge and readiness" :
                 technicalScore >= 60 ? "Good foundation with some gaps to fill" :
                 "Focus on learning retention fundamentals and CRM tools"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* WISCAR Framework */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>WISCAR Framework Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(wiscarScores).map(([key, value]) => (
              <div key={key} className="text-center p-4 bg-secondary/30 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">{value}%</div>
                <div className="text-sm capitalize">{key === 'realWorld' ? 'Real-World Fit' : key}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Career Recommendations */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Recommended Career Paths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {careerPaths.map((career, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                <span className="font-medium">{career.title}</span>
                <div className="flex items-center gap-3">
                  <div className="w-20">
                    <Progress value={career.match} className="h-2" />
                  </div>
                  <span className="text-sm font-medium w-12">{career.match}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Path */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Your Learning Path
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {learningPath.map((course, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <span className="flex-1">{course}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Recommended Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {overallScore >= 70 ? (
              <>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <h4 className="font-medium">Start Building Your Skills</h4>
                    <p className="text-sm text-muted-foreground">
                      You have strong potential for this role. Focus on practical experience with CRM tools and customer data analysis.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <h4 className="font-medium">Seek Mentorship</h4>
                    <p className="text-sm text-muted-foreground">
                      Connect with experienced retention specialists to learn industry best practices.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
                  <div>
                    <h4 className="font-medium">Focus on Skill Development</h4>
                    <p className="text-sm text-muted-foreground">
                      Invest time in developing customer service, communication, and basic data analysis skills.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
                  <div>
                    <h4 className="font-medium">Consider Alternative Paths</h4>
                    <p className="text-sm text-muted-foreground">
                      Explore related roles like Customer Support or Marketing that might be a better initial fit.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button size="lg" variant="hero" className="flex-1">
          Download Detailed Report
        </Button>
        <Button size="lg" variant="outline" className="flex-1">
          Retake Assessment
        </Button>
      </div>
    </div>
  );
};