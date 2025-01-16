import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface Task {
  id: string;
  description: string;
  completed: boolean;
}

interface DescriptionProps {
  requirements: string;
  implementationGuide: string;
  tasks: Task[];
  onTaskComplete: (taskId: string, completed: boolean) => void;
}

export function Description({ requirements, implementationGuide, tasks, onTaskComplete }: DescriptionProps) {
  const completedTasks = tasks.filter(task => task.completed).length;
  const progressPercentage = (completedTasks / tasks.length) * 100;

  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      <AccordionItem value="requirements">
        <AccordionTrigger>Requirements</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-muted-foreground">{requirements}</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="implementation">
        <AccordionTrigger>Implementation Guide</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-muted-foreground whitespace-pre-line">{implementationGuide}</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="tasks">
        <AccordionTrigger>Tasks</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <Progress value={progressPercentage} className="w-full" />
            <p className="text-sm text-muted-foreground">{completedTasks} of {tasks.length} tasks completed</p>
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

