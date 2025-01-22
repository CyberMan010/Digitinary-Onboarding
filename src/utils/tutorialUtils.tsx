import React, { createContext, useContext, useState } from 'react';

type TutorialStep = {
  id: number;
  title: string;
  content: string;
  target: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Welcome to Digitinary",
    content: "Welcome! This quick tutorial will guide you through the main features of our onboarding platform.",
    target: "welcome-header"
  },
  {
    id: 2,
    title: "Select Your Department",
    content: "Start by selecting your department from the left sidebar. This will show you relevant teams and workflows.",
    target: "left-sidebar"
  },
  {
    id: 3,
    title: "Choose Your Team",
    content: "Once you've selected a department, you'll see available teams in the right sidebar. Select your team to view its workflow.",
    target: "right-sidebar"
  },
  {
    id: 4,
    title: "Project Workflow",
    content: "The main area shows your team's project workflow. Follow the steps and complete tasks to track your progress.",
    target: "project-workflow"
  },
  {
    id: 5,
    title: "Search Feature",
    content: "Use the search bar to quickly find departments, teams, or specific workflows.",
    target: "search-bar"
  }
];

const TutorialContext = createContext<{
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  isActive: boolean;
  startTutorial: () => void;
  endTutorial: () => void;
} | null>(null);

export const TutorialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, tutorialSteps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));
  const startTutorial = () => {
    setIsActive(true);
    setCurrentStep(0);
  };
  const endTutorial = () => {
    setIsActive(false);
    setCurrentStep(0);
  };

  return (
    <TutorialContext.Provider value={{ 
      currentStep, 
      nextStep, 
      prevStep, 
      isActive, 
      startTutorial, 
      endTutorial 
    }}>
      {children}
    </TutorialContext.Provider>
  );
};

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context) throw new Error('useTutorial must be used within TutorialProvider');
  return context;
};