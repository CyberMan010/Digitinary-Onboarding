export interface Task {
    id: string;
    description: string;
    completed: boolean;
  }
  
  export interface Step {
    title: string;
    description: string;
    icon: React.ReactNode;
    requirements: string;
    implementationGuide: string;
    tasks: Task[];
  }