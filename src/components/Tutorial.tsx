import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTutorial } from '@/utils/tutorialUtils';

const tutorialSteps = [
  {
    title: "Welcome to Digitinary",
    content: "Welcome! This quick tutorial will guide you through the main features of our onboarding platform.",
    target: "welcome-header"
  },
  {
    title: "Select Your Department",
    content: "Start by selecting your department from the left sidebar. This will show you relevant teams and workflows.",
    target: "left-sidebar"
  },
  {
    title: "Choose Your Team",
    content: "Once you've selected a department, you'll see available teams in the right sidebar. Select your team to view its workflow.",
    target: "right-sidebar"
  },
  {
    title: "Project Workflow",
    content: "The main area shows your team's project workflow. Follow the steps and complete tasks to track your progress.",
    target: "project-workflow"
  },
  {
    title: "Search Feature",
    content: "Use the search bar to quickly find departments, teams, or specific workflows.",
    target: "search-bar"
  }
];

export const TutorialStep = () => {
  const { currentStep, nextStep, prevStep, isActive, endTutorial } = useTutorial();
  
  if (!isActive) return null;

  return (
    <Card className="fixed bottom-4 right-4 w-[400px] z-50 shadow-lg animate-in fade-in slide-in-from-bottom-4">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-2">
          Step {currentStep + 1} of {tutorialSteps.length}: {tutorialSteps[currentStep].title}
        </h3>
        <p className="mb-6 text-muted-foreground">
          {tutorialSteps[currentStep].content}
        </p>
        <div className="flex justify-between gap-4">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 0}
            className="w-full"
          >
            Previous
          </Button>
          {currentStep === tutorialSteps.length - 1 ? (
            <Button onClick={endTutorial} className="w-full">
              Finish Tutorial
            </Button>
          ) : (
            <Button onClick={nextStep} className="w-full">
              Next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};