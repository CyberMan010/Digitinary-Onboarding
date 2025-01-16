import React, { useState } from 'react';
import { Sidebar } from './components/Sidebars/SideBar';
import { RightSidebar } from './components/Sidebars/RightSidebar';
import { ProjectWorkflow } from './components/ProjectWorkflow';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useIsMobile } from "@/hooks/use-mobile";

type Department = 'Frontend' | 'Backend' | 'DevOps' | 'HR' | 'QA';
type Team = { name: string; department: Department };

function App() {
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar onDepartmentSelect={(department) => {
          setSelectedDepartment(department);
          setSelectedTeam(null);
        }} />
        <main className={`flex-1 p-4 overflow-auto ${isMobile ? 'ml-0' : 'ml-16'}`}>
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Welcome to Digitinary</h1>
          {selectedTeam ? (
            <ProjectWorkflow />
          ) : (
            <p>Select a team to view the project workflow.</p>
          )}
        </main>
        {!isMobile && selectedDepartment && (
          <RightSidebar
            selectedDepartment={selectedDepartment}
            onTeamSelect={setSelectedTeam}
          />
        )}
      </div>
      <Toaster />
    </SidebarProvider>
  );
}

export default App;