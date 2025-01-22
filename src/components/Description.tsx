import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { DescriptionProps } from "@/types" 




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
                
                {item.images && item.images.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Structures:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {item.images.map((image, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="rounded-lg overflow-hidden border border-border">
                            <img 
                              src={image.src} 
                              alt={image.alt} 
                              className="w-full h-auto object-cover"
                            />
                          </div>
                          {image.caption && (
                            <p className="text-sm text-muted-foreground text-center">
                              {image.caption}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
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

                {item.requirements && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Requirements:</h4>
                    {Object.entries(item.requirements).map(([category, items]) => (
                      <div key={category} className="space-y-2">
                        <h5 className="font-medium capitalize">{category}</h5>
                        <ul className="list-disc pl-5 space-y-1">
                          {Object.entries(items as any).map(([name, version]) => (
                            <li key={name}>{name}: {version}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {item.documentation && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Documentation:</h4>
                    <ul className="space-y-2">
                      {item.documentation.map((doc, idx) => (
                        <li key={idx}>
                          <a 
                            href={doc.url}
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {doc.title}
                          </a>
                          <p className="text-sm text-muted-foreground">{doc.description}</p>
                        </li>
                      ))}
                    </ul>
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
