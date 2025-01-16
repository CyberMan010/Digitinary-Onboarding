import React, { useState } from 'react';
import { Sidebar } from './components/Sidebars/SideBar';
import { RightSidebar } from './components/Sidebars/RightSidebar';
import { ProjectWorkflow } from './components/ProjectWorkflow';
import { SidebarProvider } from "@/components/ui/sidebar"

type Department = 'Frontend' | 'Backend' | 'DevOps' | 'HR' | 'QA';

function App() {
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar onDepartmentSelect={setSelectedDepartment} />
        <main className="flex-1 p-4 overflow-auto ml-16">
          <h1 className="text-2xl font-bold mb-6">Welcome to Digitinary</h1>
          <ProjectWorkflow />
        </main>
        <RightSidebar selectedDepartment={selectedDepartment} />
      </div>
    </SidebarProvider>
  );
}

export default App;

