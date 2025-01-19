import React from 'react';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight, Cog, FileQuestion, Laptop, Server, Users } from 'lucide-react';
import { useSidebar } from "@/components/ui/sidebar"


import '../../styles/Sidebar.scss';

type Department = 'Frontend' | 'Backend' | 'DevOps' | 'HR' | 'QA';

const departments: { name: Department; icon: React.ReactNode }[] = [
  { name: 'Frontend', icon: <Laptop className="h-4 w-4" /> },
  { name: 'Backend', icon: <Server className="h-4 w-4" /> },
  { name: 'DevOps', icon: <Cog className="h-4 w-4" /> },
  { name: 'HR', icon: <Users className="h-4 w-4" /> },
  { name: 'QA', icon: <FileQuestion className="h-4 w-4" /> },
];

interface SidebarProps {
  onDepartmentSelect: (department: Department) => void;
}

export function Sidebar({ onDepartmentSelect }: SidebarProps) {
  const { isOpen, toggleSidebar } = useSidebar();
  const [selectedDepartment, setSelectedDepartment] = React.useState<Department | null>(null);

  const handleDepartmentClick = (department: Department) => {
    setSelectedDepartment(department);
    onDepartmentSelect(department);
  };




  return (
    <div className={cn("sidebar", isOpen ? "open" : "closed")}>
      <div className="sidebar-content">
        <div className="sidebar-logo">
          <img
            src={isOpen ? "/Digitinary-open.png" : "/Digitinary-closed.png"}
            alt="Digitinary Logo"
            className="logo-image"
          />
        </div>
        <ScrollArea className="sidebar-items">
          <div className="px-2 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Departments
            </h2>
            <div className="space-y-1">
              {departments.map((dept) => (
                <TooltipProvider key={dept.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={selectedDepartment === dept.name ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => handleDepartmentClick(dept.name)}
                      >
                        {dept.icon}
                        <span className={cn("ml-2", !isOpen && "hidden")}>
                          {dept.name}
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{dept.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar} 
        className="sidebar-toggle"
      >
        {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    </div>
  );
}

