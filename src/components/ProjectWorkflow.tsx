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
        title: "Micro Frontend Architecture",
        overview: "Micro Frontend is a design pattern to split large and complex web applications or modules into light-weight web apps that can be deployed independently.",
        requirements: {
          core: {
            webpack: "5.x or higher",
            typescript: "4.9.x or higher",
            react: "18.x or higher"
          },
          frameworks: {
            "module-federation": "Latest version",
            "react-router": "6.x",
            "state-management": "Redux Toolkit/React Query"
          }
        },
        images: [
          {
            src: "/micro-frontend.png",
            alt: "Micro Frontend Architecture Diagram",
            caption: "Overview of Micro Frontend Architecture"
          },
        ],
        
        documentation: [
          {
            title: "Module Federation Guide",
            url: "https://webpack.js.org/concepts/module-federation/",
            description: "Official Webpack Module Federation documentation"
          },
          {
            title: "Micro Frontend Architecture",
            url: "https://micro-frontends.org/",
            description: "Comprehensive guide to micro-frontend architecture"
          }
        ],
        repositories: {
          required: [
            "container-app: Main application shell",
            "shared-components: Common UI components"
          ],
          optional: [
            "example-module: Template for new modules",
            "documentation: Architecture guidelines"
          ]
        }
      },
      {
        title: "Digitinary-UI",
        overview: "A UI library designed to maintain consistency across all modules with reusable components and styling.",
        requirements: {
          core: {
            "react": "18.x",
            "typescript": "4.9.x",
            "tailwind": "3.x"
          },
          tools: {
            "storybook": "7.x",
            "jest": "29.x",
            "testing-library": "Latest version"
          }
        },
        documentation: [
          {
            title: "Component Documentation",
            url: "https://ui.digitinary.com",
            description: "Interactive component documentation and usage guides"
          },
          {
            title: "Design System",
            url: "https://www.figma.com/file/digitinary-design",
            description: "Figma design system and component specifications"
          }
        ],
        repositories: {
          required: [
            "digitinary-ui: Main component library",
            "design-tokens: Design system tokens"
          ]
        }
      }
    ],
    tasks: [
      { id: "arch1", description: "Review Micro Frontend architecture", completed: false },
      { id: "arch2", description: "Study Digitinary-UI components", completed: false },
      { id: "arch3", description: "Set up project structure", completed: false }
    ]
  },
  {
    title: "Business Requirements",
    overview: "Key business requirements and objectives for the project.",
    icon: <Code className="h-4 w-4" />,
    content: [
      {
        title: "Project Overview",
        overview: "Core business requirements and project objectives",
        requirements: {
          functional: {
            "Authentication": "SSO integration",
            "Authorization": "Role-based access control",
            "Data Management": "Real-time updates"
          },
          technical: {
            "Performance": "< 3s load time",
            "Accessibility": "WCAG 2.1 AA compliant",
            "Browser Support": "Modern browsers"
          }
        },
        documentation: [
          {
            title: "Product Requirements Document",
            url: "https://confluence.digitinary.com/prd",
            description: "Detailed product requirements and specifications"
          },
          {
            title: "Technical Specifications",
            url: "https://confluence.digitinary.com/tech-spec",
            description: "Technical architecture and implementation details"
          }
        ],
        repositories: {
          required: [
            "project-docs: Documentation and specifications",
            "acceptance-tests: Acceptance test suites"
          ]
        }
      }
    ],
    tasks: [
      { id: "br1", description: "Review product requirements", completed: false },
      { id: "br2", description: "Analyze technical specifications", completed: false },
      { id: "br3", description: "Define acceptance criteria", completed: false }
    ]
  },
  {
    title: "Technical Setup",
    overview: "Technical requirements and setup process for the project.",
    icon: <Layers className="h-4 w-4" />,
    content: [
      {
        overview: "This section outlines the technical requirements and setup process for the project.",
        requirements: {
          core: {
            node: "18.x or higher",
            npm: "8.x or higher",
            git: "2.x or higher",
            typescript: "4.9.x or higher"
          },
          tools: {
            ide: "VS Code with recommended extensions",
            docker: "Latest stable version",
            kubernetes: "1.24 or higher",
            postman: "Latest version for API testing"
          },
          frameworks: {
            react: "18.x",
            nextjs: "13.x",
            tailwind: "3.x"
          }
        },
        documentation: [
          {
            title: "Getting Started Guide",
            url: "https://docs.digitinary.com/getting-started",
            description: "Complete setup guide for new developers"
          },
          {
            title: "Architecture Overview",
            url: "https://docs.digitinary.com/architecture",
            description: "System architecture and design patterns"
          },
          {
            title: "API Documentation",
            url: "https://api.digitinary.com/docs",
            description: "API endpoints and integration guides"
          }
        ],
        repositories: {
          required: [
            "frontend-core: Main frontend application repository",
            "api-gateway: API Gateway and service mesh"
          ],
          optional: [
            "design-system: UI component library and design tokens",
            "documentation: Project documentation and guides"
          ]
        }
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
        jiraProcess: [
          "Deploy changes to the Develop environment and verify functionality.",
          "Once verified, move the changes to the Test environment for QA validation.",
          "After successful testing, mark the tickets as Ready for Test and prepare for deployment to STG."
        ],
        images: [
          {
            src: "/ui-components-preview.png",
            alt: "Micro Frontend Architecture Diagram",
            caption: "Overview of Micro Frontend Architecture"
          },
        ],
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
    <h1 className="text-3xl font-bold text-center mb-6">Welcome to Arena Project Workflow</h1>
    <div className="relative">
      <Stepper 
        steps={steps} 
        currentStep={currentStep} 
        onStepClick={handleStepClick} 
        completedSteps={completedSteps}
      />
       <div className="mt-4 text-center text-sm text-muted-foreground">
      Step {currentStep + 1} of {steps.length}
    </div>
    </div>
      <div 
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300 ease-in-out"
        key={currentStep} // Force re-render on step change
      >
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
