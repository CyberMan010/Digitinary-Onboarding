import React, { useState } from 'react';
import { Stepper } from '../components/Stepper';
import { Description } from './Description';

const steps = [
  {
    title: "Architecture",
    description: "Define the project structure and initial setup.",
    requirements: "Project structure, initial setup, configuration files.",
    implementationGuide: "1. Create project directory\n2. Initialize version control\n3. Set up build tools and configuration"
  },
  {
    title: "Business Logic",
    description: "Explain functional and business requirements.",
    requirements: "User stories, functional requirements, business rules.",
    implementationGuide: "1. Document user stories\n2. Define data models\n3. Create flowcharts for key processes"
  },
  {
    title: "Tech Integration",
    description: "Cover libraries, frameworks, and coding standards.",
    requirements: "List of libraries and frameworks, coding style guide.",
    implementationGuide: "1. Choose and install necessary libraries\n2. Set up linting and formatting tools\n3. Document coding standards"
  },
  {
    title: "Create New Module",
    description: "Hands-on tasks, such as creating reusable components or modules.",
    requirements: "Module specifications, integration points.",
    implementationGuide: "1. Design the module structure\n2. Implement the module\n3. Write unit tests\n4. Document usage and API"
  },
  {
    title: "Deployment",
    description: "Guide deployment processes and tools (e.g., CI/CD pipelines).",
    requirements: "Deployment environment details, CI/CD requirements.",
    implementationGuide: "1. Set up CI/CD pipeline\n2. Configure deployment environments\n3. Create deployment scripts\n4. Document deployment process"
  }
];

export function ProjectWorkflow() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Project Workflow</h2>
      <Stepper steps={steps} currentStep={currentStep} onStepClick={handleStepClick} />
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">{steps[currentStep].title}</h3>
        <p className="mb-4">{steps[currentStep].description}</p>
        <Description
          requirements={steps[currentStep].requirements}
          implementationGuide={steps[currentStep].implementationGuide}
        />
      </div>
    </div>
  );
}

