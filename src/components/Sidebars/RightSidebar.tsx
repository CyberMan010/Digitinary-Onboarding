import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

type Department = 'Frontend' | 'Backend' | 'DevOps' | 'HR' | 'QA';

type Team = {
  name: string;
  department: Department;
};

const teams: Team[] = [
  { name: 'Arena', department: 'Frontend' },
  { name: 'D-gate', department: 'Backend' },
  { name: 'K-net', department: 'DevOps' },
  { name: 'HR Team', department: 'HR' },
  { name: 'QA Team', department: 'QA' },
];

interface RightSidebarProps {
  selectedDepartment: Department | null;
  onTeamSelect: (team: Team) => void;
}

export function RightSidebar({ selectedDepartment, onTeamSelect }: RightSidebarProps) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const filteredTeams = teams.filter(team => team.department === selectedDepartment);


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleSidebar = () => setIsOpen(!isOpen);


  return (
    <div 
    ref={sidebarRef}
    className={cn(
      "fixed h-screen transition-all duration-300 ease-in-out border-l",
      "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
      isOpen ? "w-64" : "w-5",
      isMobile ? "bottom-0" : "top-0 right-0",
      "z-20"
    )}
    >
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar} 
        className={cn(
          "absolute -left-4 top-1/2 transform -translate-y-1/2",
          "rounded-full shadow-lg",
          "bg-white dark:bg-gray-800",
          "hover:bg-gray-50 dark:hover:bg-gray-700",
          "border border-gray-200 dark:border-gray-600",
          "transition-all duration-200"
        )}
      >
        {isOpen ? 
          <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" /> : 
          <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        }
      </Button>

      {isOpen && (
        <ScrollArea className="h-full">
          <div className="p-6">
            <h2 className={cn(
              "text-xl font-semibold mb-6",
              "text-gray-900 dark:text-gray-100",
              "border-b pb-2 border-gray-200 dark:border-gray-700"
            )}>
              {selectedDepartment ? `${selectedDepartment} Teams` : 'Teams'}
            </h2>
            {filteredTeams.length > 0 ? (
              <div className="space-y-2">
                {filteredTeams.map((team) => (
                  <Button
                    key={team.name}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-left",
                      "hover:bg-gray-100 dark:hover:bg-gray-700",
                      "transition-colors duration-200",
                      "rounded-lg",
                      "group"
                    )}
                    onClick={() => onTeamSelect(team)}
                  >
                    <ChevronRight className={cn(
                      "h-4 w-4 mr-2",
                      "text-gray-500 dark:text-gray-400",
                      "group-hover:text-gray-700 dark:group-hover:text-gray-200",
                      "transition-colors duration-200"
                    )} />
                    <span className={cn(
                      "text-gray-700 dark:text-gray-300",
                      "group-hover:text-gray-900 dark:group-hover:text-gray-100"
                    )}>
                      {team.name}
                    </span>
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                No teams available for the selected department.
              </p>
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}