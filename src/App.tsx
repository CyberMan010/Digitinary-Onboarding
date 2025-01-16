import React, { useState } from 'react';
import { Sidebar } from './components/Sidebars/SideBar';
import { RightSidebar } from './components/Sidebars/RightSidebar';
import { ProjectWorkflow } from './components/ProjectWorkflow';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useIsMobile } from "@/hooks/use-mobile";
import { SearchBar } from '@/components/ui/SearchBar';
import { search, Department, Team } from '@/utils/searchUtils';

function App() {
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [searchResults, setSearchResults] = useState<(Department | Team)[]>([]);
  const isMobile = useIsMobile();

  const handleSearch = (query: string) => {
    setSearchResults(search(query));
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar onDepartmentSelect={(department) => {
          setSelectedDepartment(department);
          setSelectedTeam(null);
        }} />
        <main className={`flex-1 p-4 overflow-auto ${isMobile ? 'ml-0' : 'ml-16'}`}>
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Welcome to Digitinary</h1>
          <SearchBar onSearch={handleSearch} />
          {searchResults.length > 0 ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Search Results</h2>
              <ul>
                {searchResults.map((result, index) => (
                  <li key={index} className="mb-2">
                    {typeof result === 'string' ? (
                      <button
                        onClick={() => {
                          setSelectedDepartment(result);
                          setSelectedTeam(null);
                          setSearchResults([]);
                        }}
                        className="text-blue-500 hover:underline"
                      >
                        Department: {result}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedDepartment(result.department);
                          setSelectedTeam(result);
                          setSearchResults([]);
                        }}
                        className="text-blue-500 hover:underline"
                      >
                        Team: {result.name} (Department: {result.department})
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            selectedTeam ? (
              <ProjectWorkflow />
            ) : (
              <p>Select a team to view the project workflow.</p>
            )
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