import { useState, useEffect } from 'react'
import { FileText, Code, Layers, Rocket, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from '@/hooks/use-toast'
import Stepper from './Stepper'
import { Description } from './Description'

const steps = [
  {
    title: "Architecture",
    overview: "Introduction to micro-frontend architecture and Digitinary-UI.",
    icon: <FileText className="h-4 w-4" />,
    content: [
      {
        title: "Micro Frontend",
        overview: "Micro Frontend is a design pattern to split large and complex web applications or modules into light-weight web apps that can be deployed independently.",
        resources: [
          { title: "Micro Frontend Overview", link: "#" },
          { title: "Detailed Architecture", link: "#" }
        ],
        image: "/micro-frontend.png",
        imageAlt: "Micro Frontend Architecture Diagram"
      },
      {
        title: "Digitinary-UI",
        overview: "A UI library designed to maintain consistency across all modules with reusable components and styling.",
        resources: [
          { title: "Digitinary-UI Documentation", link: "#" }
        ],
        image: "https://static.proto.io/images/publicsite/redesigned2021/product/ui-components-spot-illustration.svg?v=6.8.41.0",
        imageAlt: "Digitinary UI Components"
      }
    ],
    tasks: [
      { id: "arch1", description: "Review Micro Frontend architecture", completed: false },
      { id: "arch2", description: "Study Digitinary-UI components", completed: false },
      { id: "arch3", description: "Set up project structure", completed: false },
    ]
  },
  {
    title: "Business Requirements",
    overview: "Key business requirements and objectives for the project.",
    icon: <Code className="h-4 w-4" />,
    content: [
      {
        overview: "A description of the key business requirements and objectives for the project.",
        resources: [
          { title: "Business Docs Link 1", link: "#" },
          { title: "Business Docs Link 2", link: "#" }
        ]
      }
    ],
    tasks: [
      { id: "br1", description: "Analyze business requirements", completed: false },
      { id: "br2", description: "Define project objectives", completed: false },
    ]
  },
  {
    title: "Technical Setup",
    overview: "Technical requirements and setup process for the project.",
    icon: <Layers className="h-4 w-4" />,
    content: [
      {
        overview: "This section outlines the technical requirements and setup process for the project.",
        requiredRepos: [
          "container: Core container repository for the project.",
          "common-layout: Shared layout repository for consistent design."
        ],
        optionalRepos: [
          "c360: Core business logic and components.",
          "User Management: User-related features and services."
        ],
        libraries: [
          "Redux: For state management.",
          "Digitinary-UI: Reusable UI components.",
          "Context API: Additional state management for isolated components."
        ]
      }
    ],
    tasks: [
      { id: "ts1", description: "Set up required repositories", completed: false },
      { id: "ts2", description: "Install necessary libraries", completed: false },
      { id: "ts3", description: "Configure development environment", completed: false },
    ]
  },
  {
    title: "Deployment Process",
    overview: "Deployment environments and Jira ticket process.",
    icon: <Rocket className="h-4 w-4" />,
    content: [
      {
        overview: "The project has three deployment environments, each with specific purposes:",
        environments: [
          "Develop: Used for ongoing development.",
          "Test: For the QA team to verify changes.",
          "Staging (STG): Pre-production environment for client reviews."
        ],
        image: "/ui-components-preview.png",
        jiraProcess: [
          "Deploy changes to the Develop environment and verify functionality.",
          "Once verified, move the changes to the Test environment for QA validation.",
          "After successful testing, mark the tickets as Ready for Test and prepare for deployment to STG."
        ]
      }
    ],
    tasks: [
      { id: "dp1", description: "Set up deployment environments", completed: false },
      { id: "dp2", description: "Configure CI/CD pipeline", completed: false },
      { id: "dp3", description: "Document deployment process", completed: false },
    ]
  },
  {
    title: "Creating a Custom Module",
    overview: "Step-by-step guide on creating a new custom module.",
    icon: <Settings className="h-4 w-4" />,
    content: [
      {
        overview: "A step-by-step guide on creating a new custom module using the project's CLI.",
        steps: [
          "Design the module structure",
          "Implement the module",
          "Write unit tests",
          "Document usage and API"
        ]
      }
    ],
    tasks: [
      { id: "cm1", description: "Design module structure", completed: false },
      { id: "cm2", description: "Implement module", completed: false },
      { id: "cm3", description: "Write unit tests", completed: false },
      { id: "cm4", description: "Document module usage and API", completed: false },
    ]
  }
]

export default function ProjectWorkflow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [stepTasks, setStepTasks] = useState(steps.map(step => step.tasks))
  const { toast } = useToast()

  useEffect(() => {
    const allCompleted = stepTasks.every(tasks => tasks.every(task => task.completed))
    if (allCompleted) {
      toast({
        title: "Project Completed!",
        description: "Congratulations! You've completed all tasks in the project workflow.",
      })
    }
  }, [stepTasks, toast])

  const handleStepClick = (step: number) => {
    setCurrentStep(step)
  }

  const handleTaskComplete = (taskId: string, completed: boolean) => {
    const newStepTasks = [...stepTasks]
    newStepTasks[currentStep] = newStepTasks[currentStep].map(task => 
      task.id === taskId ? { ...task, completed } : task
    )
    setStepTasks(newStepTasks)

    if (newStepTasks[currentStep].every(task => task.completed)) {
      setCompletedSteps([...new Set([...completedSteps, currentStep])])
      toast({
        title: "Step Completed!",
        description: `You've completed all tasks in the "${steps[currentStep].title}" step.`,
      })
    } else {
      setCompletedSteps(completedSteps.filter(step => step !== currentStep))
    }
  }

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completedTasks = stepTasks[currentStep].filter(task => task.completed).length
  const progressPercentage = (completedTasks / stepTasks[currentStep].length) * 100

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6">Arena Project Workflow</h1>
      <Stepper 
        steps={steps} 
        currentStep={currentStep} 
        onStepClick={handleStepClick} 
        completedSteps={completedSteps}
      />
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">{steps[currentStep].title}</h2>
        <p className="text-muted-foreground mb-6">{steps[currentStep].overview}</p>
        <div className="mb-4">
          <Progress value={progressPercentage} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">
            {completedTasks} of {stepTasks[currentStep].length} tasks completed
          </p>
        </div>
        <Description 
          content={steps[currentStep].content}
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
  )
}

