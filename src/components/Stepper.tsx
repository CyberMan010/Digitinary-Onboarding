import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface StepperProps {
  steps: Array<{ title: string; icon: React.ReactNode }>
  currentStep: number
  onStepClick: (index: number) => void
  completedSteps: number[]
}

const StepConnector = ({ isCompleted }: { isCompleted: boolean }) => (
  <div
    className={`flex-1 h-0.5 transition-colors ${
      isCompleted ? 'bg-green-500' : 'bg-gray-200'
    }`}
  />
)

function Stepper({ steps, currentStep, onStepClick, completedSteps }: StepperProps) {
  return (
    <nav aria-label="Project Workflow Progress" className="w-full py-4">
      
      <ol className="flex items-center w-full">
        
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={`flex items-center space-x-2.5 ${
              index < steps.length - 1 ? 'w-full' : ''
            }`}
          >
            <TooltipProvider>
              <Tooltip>
                
                <TooltipTrigger asChild>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className={`w-10 h-10 rounded-full p-0 transition-colors ${
                      completedSteps.includes(index) ? 'bg-green-100 border-green-500 text-green-700' :
                      index === currentStep ? 'bg-blue-100 border-blue-500 text-blue-700' :
                      'bg-gray-100 border-gray-300 text-gray-500'
                    }`}
                    onClick={() => onStepClick(index)}
                    aria-current={index === currentStep ? "step" : undefined}
                  >
                    
                    {step.icon}
                    <span className="sr-only">{`${step.title} ${
                      completedSteps.includes(index) ? "(Completed)" : ""
                    }`}</span>
                    
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{step.title}</p>
                  {completedSteps.includes(index) && <p className="text-xs text-green-500">(Completed)</p>}
                </TooltipContent>
                
              </Tooltip>
              
            </TooltipProvider>
            {index < steps.length - 1 && (
              <StepConnector isCompleted={completedSteps.includes(index) && completedSteps.includes(index + 1)} />
            )}
            
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Stepper;