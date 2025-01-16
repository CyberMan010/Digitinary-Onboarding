import React from 'react';
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <div className="w-full py-4">
      <ol className="flex items-center w-full">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={cn(
              "flex items-center text-blue-600 dark:text-blue-500 space-x-2.5",
              index < steps.length - 1 && "w-full",
              index < currentStep && "text-green-600 dark:text-green-500"
            )}
          >
            <button
              className={cn(
                "flex items-center justify-center w-8 h-8 border-2 rounded-full shrink-0",
                index < currentStep
                  ? "border-green-500 dark:border-green-400"
                  : index === currentStep
                  ? "border-blue-500 dark:border-blue-400"
                  : "border-gray-500 dark:border-gray-400"
              )}
              onClick={() => onStepClick(index)}
            >
              {index < currentStep ? (
                <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
              ) : (
                <span>{index + 1}</span>
              )}
            </button>
            <span className="hidden sm:inline-flex">{step.title}</span>
            {index < steps.length - 1 && (
              <div className={cn(
                "flex-1 h-0.5 bg-gray-200 dark:bg-gray-700",
                index < currentStep && "bg-green-500 dark:bg-green-400"
              )}></div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

