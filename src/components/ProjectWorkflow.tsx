import React, { useState, useEffect } from 'react';
import { Stepper } from './Stepper';
import { Description } from './Description';
import { FileText, Code, Layers, Settings, Rocket } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';

const steps = [
  {
    title: "Architecture",
    description: "Define the project structure and initial setup.",
    icon: <FileText className="h-4 w-4" />,
    requirements: "Project structure, initial setup, configuration files.",
    implementationGuide: "1. Create project directory\n2. Initialize version control\n3. Set up build tools and configuration",
    tasks: [
      { id: "arch1", description: "Create project directory", completed: false },
      { id: "arch2", description: "Initialize Git repository", completed: false },
      { id: "arch3", description: "Set up build tools", completed: false },
    ]
  },
  {
    title: "Business Logic",
    description: "Explain functional and business requirements.",
    icon: <Code className="h-4 w-4" />,
    requirements: "User stories, functional requirements, business rules.",
    implementationGuide: "1. Document user stories\n2. Define data models\n3. Create flowcharts for key processes",
    tasks: [
      { id: "bl1", description: "Write user stories", completed: false },
      { id: "bl2", description: "Define data models", completed: false },
      { id: "bl3", description: "Create process flowcharts", completed: false },
    ]
  },
  {
    title: "Tech Integration",
    description: "Cover libraries, frameworks, and coding standards.",
    icon: <Layers className="h-4 w-4" />,
    requirements: "List of libraries and frameworks, coding style guide.",
    implementationGuide: "1. Choose and install necessary libraries\n2. Set up linting and formatting tools\n3. Document coding standards",
    tasks: [
      { id: "ti1", description: "Install required libraries", completed: false },
      { id: "ti2", description: "Set up linting and formatting", completed: false },
      { id: "ti3", description: "Document coding standards", completed: false },
    ]
  },
  {
    title: "Create New Module",
    description: "Hands-on tasks, such as creating reusable components or modules.",
    icon: <Settings className="h-4 w-4" />,
    requirements: "Module specifications, integration points.",
    implementationGuide: "1. Design the module structure\n2. Implement the module\n3. Write unit tests\n4. Document usage and API",
    tasks: [
      { id: "mod1", description: "Design module structure", completed: false },
      { id: "mod2", description: "Implement module", completed: false },
      { id: "mod3", description: "Write unit tests", completed: false },
      { id: "mod4", description: "Document module usage and API", completed: false },
    ]
  },
  {
    title: "Deployment",
    description: "Guide deployment processes and tools (e.g., CI/CD pipelines).",
    icon: <Rocket className="h-4 w-4" />,
    requirements: "Deployment environment details, CI/CD requirements.",
    implementationGuide: "1. Set up CI/CD pipeline\n2. Configure deployment environments\n3. Create deployment scripts\n4. Document deployment process",
    tasks: [
      { id: "dep1", description: "Set up CI/CD pipeline", completed: false },
      { id: "dep2", description: "Configure deployment environments", completed: false },
      { id: "dep3", description: "Create deployment scripts", completed: false },
      { id: "dep4", description: "Document deployment process", completed: false },
    ]
  }
];

export function ProjectWorkflow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [stepTasks, setStepTasks] = useState(steps.map(step => step.tasks));
  const { toast } = useToast();

  useEffect(() => {
    const allCompleted = stepTasks.every(tasks => tasks.every(task => task.completed));
    if (allCompleted) {
      toast({
        title: "Project Completed!",
        description: "Congratulations! You've completed all tasks in the project workflow.",
      });
    }
  }, [stepTasks, toast]);

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const handleTaskComplete = (taskId: string, completed: boolean) => {
    const newStepTasks = [...stepTasks];
    newStepTasks[currentStep] = newStepTasks[currentStep].map(task => 
      task.id === taskId ? { ...task, completed } : task
    );
    setStepTasks(newStepTasks);

    if (newStepTasks[currentStep].every(task => task.completed)) {
      setCompletedSteps([...new Set([...completedSteps, currentStep])]);
      toast({
        title: "Step Completed!",
        description: `You've completed all tasks in the "${steps[currentStep].title}" step.`,
      });
    } else {
      setCompletedSteps(completedSteps.filter(step => step !== currentStep));
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 space-y-8">
      <h2 className="text-3xl font-bold">Project Workflow</h2>
      <Stepper 
        steps={steps} 
        currentStep={currentStep} 
        onStepClick={handleStepClick} 
        completedSteps={completedSteps}
      />
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4">{steps[currentStep].title}</h3>
        <p className="text-muted-foreground mb-6">{steps[currentStep].description}</p>
        <Description
          requirements={steps[currentStep].requirements}
          implementationGuide={steps[currentStep].implementationGuide}
          tasks={stepTasks[currentStep]}
          onTaskComplete={handleTaskComplete}
        />
      </div>
      <div className="flex justify-between">
        <Button 
          onClick={handlePreviousStep} 
          disabled={currentStep === 0}
        >
          Previous Step
        </Button>
        <Button 
          onClick={handleNextStep} 
          disabled={currentStep === steps.length - 1}
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}

