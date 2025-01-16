import React from 'react';
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, FileText, Code, Layers, Rocket, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
  completedSteps: number[];
}

const stepIcons = [
  <FileText className="h-4 w-4" />,
  <Code className="h-4 w-4" />,
  <Layers className="h-4 w-4" />,
  <Settings className="h-4 w-4" />,
  <Rocket className="h-4 w-4" />,
];

export function Stepper({ steps, currentStep, onStepClick, completedSteps }: StepperProps) {
  return (
    <nav aria-label="Project Workflow Progress" className="w-full py-4">
      <ol className="flex items-center w-full">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={cn(
              "flex items-center space-x-2.5",
              index < steps.length - 1 && "w-full"
            )}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "w-10 h-10 rounded-full p-0 transition-colors",
                      index < currentStep && "bg-green-100 border-green-500 text-green-700",
                      index === currentStep && "bg-blue-100 border-blue-500 text-blue-700",
                      index > currentStep && "bg-gray-100 border-gray-300 text-gray-500"
                    )}
                    onClick={() => onStepClick(index)}
                    aria-current={index === currentStep ? "step" : undefined}
                  >
                    {completedSteps.includes(index) ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      stepIcons[index]
                    )}
                    <span className="sr-only">{`${step.title} ${
                      completedSteps.includes(index) ? "(Completed)" : ""
                    }`}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="hidden sm:inline-flex text-sm font-medium">{step.title}</span>
            {index < steps.length - 1 && (
              <div 
                className={cn(
                  "flex-1 h-0.5 bg-gray-200 dark:bg-gray-700",
                  index < currentStep && "bg-green-500 dark:bg-green-400"
                )}
                aria-hidden="true"
              ></div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

