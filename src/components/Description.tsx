import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  description: string
  completed: boolean
}

interface DescriptionProps {
  content: Array<{
    title?: string
    overview: string
    image?: string
    resources?: Array<{ title: string; link: string }>
    requiredRepos?: string[]
    optionalRepos?: string[]
    libraries?: string[]
    environments?: string[]
    jiraProcess?: string[]
    steps?: string[]
  }>
  tasks: Task[]
  onTaskComplete: (taskId: string, completed: boolean) => void
}

export function Description({ content, tasks, onTaskComplete }: DescriptionProps) {
  return (
    <div className="space-y-6">
      {content.map((item, index) => (
        <Accordion key={index} type="single" collapsible className="w-full">
          <AccordionItem value={`item-${index}`}>
            <AccordionTrigger className="text-xl font-semibold">
              {item.title || "Overview"}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-4">
                <p>{item.overview}</p>
                
                {item.resources && (
                  <div>
                    <h4 className="font-semibold mb-2">Resources:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {item.resources.map((resource, idx) => (
                        <li key={idx}>
                          <a href={resource.link} className="text-blue-500 hover:underline">{resource.title}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.environments && (
                  <div>
                    <h4 className="font-semibold mb-2">Deployment Environments:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {item.environments.map((env, idx) => (
                        <li key={idx}>{env}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.jiraProcess && (
                  <div>
                    <h4 className="font-semibold mb-2">Jira and Ticket Process:</h4>
                    <ol className="list-decimal pl-5 space-y-1">
                      {item.jiraProcess.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}

                {item.steps && (
                  <div>
                    <h4 className="font-semibold mb-2">Steps to Create a Module:</h4>
                    <ol className="list-decimal pl-5 space-y-1">
                      {item.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
      <div className="space-y-2">
        <h4 className="font-semibold">Tasks:</h4>
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center space-x-2">
            <Checkbox
              id={task.id}
              checked={task.completed}
              onCheckedChange={(checked) => onTaskComplete(task.id, checked as boolean)}
            />
            <label
              htmlFor={task.id}
              className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                task.completed && "line-through text-muted-foreground"
              )}
            >
              {task.description}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

