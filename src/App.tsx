import { useState } from "react"
import { Sidebar } from "./components/Sidebars/SideBarcomponent"
import ProjectWorkflow from "./components/ProjectWorkflow"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { useIsMobile } from "@/hooks/use-mobile"
import { SearchBar } from "@/components/ui/SearchBar"
import { search } from "@/utils/searchUtils"
import { Laptop, Server, Cog, Users, FileQuestion, Home, Settings } from "lucide-react"
import type { Department, Team, SidebarItem } from "@/types"
import './styles/Sidebar.scss';
import { TutorialProvider, useTutorial } from "./utils/tutorialUtils"
import { TutorialStep } from "./components/Tutorial";
import { Button } from "./components/ui/button"
import './App.scss'


const departments: SidebarItem[] = [
  {
    name: "Departments",
    icon: <Home className="h-4 w-4" />,
    items: [
      { name: "Frontend", icon: <Laptop className="h-4 w-4" /> },
      { name: "Backend", icon: <Server className="h-4 w-4" /> },
      { name: "DevOps", icon: <Cog className="h-4 w-4" /> },
      { name: "HR", icon: <Users className="h-4 w-4" /> },
      { name: "QA", icon: <FileQuestion className="h-4 w-4" /> },
    ],
  },
]

const teams: Team[] = [
  { name: "Arena", department: "Frontend" },
  { name: "D-gate", department: "Backend" },
  { name: "K-net", department: "DevOps" },
  { name: "HR Team", department: "HR" },
  { name: "QA Team", department: "QA" },
]

function TutorialButton() {
  const { startTutorial } = useTutorial();
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
        Welcome to Digitinary
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
        Your journey to seamless onboarding starts here. Let us guide you through our platform's features and help you get started.
      </p>
      <Button 
        onClick={startTutorial}
        className="px-6 py-3 text-lg"
        size="lg"
      >
        Start Interactive Tutorial
      </Button>
    </div>
  );
}

type SearchResult = Department | Team;

function App() {
  const { startTutorial } = useTutorial();
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const isMobile = useIsMobile()

  const handleSearch = (query: string) => {
    const results = search(query).map(result => {
      // If the result is just a string (Department), convert it to the proper format
      if (typeof result === 'string') {
        return { name: result, type: 'department' as const };
      }
      // If it's a Team, return it with a type indicator
      return { ...result, type: 'team' as const };
    });
    setSearchResults(results);
  }

  const handleDepartmentSelect = (department: string) => {
    if (departments.find((d) => d.items?.some((item) => item.name === department))) {
      setSelectedDepartment(department as Department)
      setSelectedTeam(null)
    }
  }

  const handleTeamSelect = (teamName: string) => {
    console.log('Team selected:', teamName);
    const team = teams.find((t) => t.name === teamName);
    if (team) {
      setSelectedTeam(team);
      setSelectedDepartment(team.department);
      // Clear search results after selection
      setSearchResults([]);
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar
          items={departments.map(dept => ({
            name: dept.name,
            icon: dept.icon,
            items: dept.items
          }))}
          onItemSelect={handleDepartmentSelect}
          side="left"
          header={<h2 className="text-lg font-semibold p-4">Digitinary</h2>}
        />
        <main className="flex-1 p-4 overflow-auto mx-4">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div id="welcome-header" className="w-full max-w-4xl">
              <TutorialButton />
            </div>
          </div>

          {/* Search Bar Container */}
          <div className="flex justify-center w-full mb-6">
            <div className="w-full max-w-2xl">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 ? (
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                <h2 className="text-xl font-semibold mb-4">Search Results</h2>
                <ul className="space-y-2">
                  {searchResults.map((result, index) => (
                    <li 
                      key={index} 
                      className="mb-2 p-3 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer rounded-lg transition-all"
                      onClick={() => {
                        if (result.type === 'team') {
                          handleTeamSelect(result.name);
                        } else {
                          handleDepartmentSelect(result.name);
                        }
                      }}
                    >
                      {result.name} - {result.type === 'team' ? result.department : 'Department'}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : selectedTeam ? (
            <ProjectWorkflow />
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-400">
              <p>Select a team to view the project workflow.</p>
            </div>
          )}
        </main>
        {!isMobile && (
    <Sidebar
      items={selectedDepartment ? 
        teams
          .filter(team => team.department === selectedDepartment)
          .map(team => ({
            name: team.name,
            icon: <Users className="h-4 w-4" />
          }))
        : []
      }
      onItemSelect={handleTeamSelect}
      side="right"
      header={<h2 className="text-lg font-semibold p-4">
        {selectedDepartment ? `${selectedDepartment} Teams` : 'Teams'}
      </h2>}
    />
  )}
      </div>
      <Toaster />
      <TutorialStep />
    </SidebarProvider>
  )
}

export default App

