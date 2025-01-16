import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ChevronRight } from 'lucide-react';

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
}

export function RightSidebar({ selectedDepartment }: RightSidebarProps) {
  const filteredTeams = teams.filter(team => team.department === selectedDepartment);

  return (
    <div className="right-sidebar w-64 h-screen bg-background border-l border-border fixed top-0 right-0">
      <ScrollArea className="h-full">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">
            {selectedDepartment ? `${selectedDepartment} Teams` : 'Teams'}
          </h2>
          {filteredTeams.length > 0 ? (
            <div className="space-y-2">
              {filteredTeams.map((team) => (
                <Button
                  key={team.name}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <span>{team.name}</span>
                </Button>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No teams available for the selected department.</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

