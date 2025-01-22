import type { Department, Team } from '@/types';

const departments = ["Frontend", "Backend", "DevOps", "HR", "QA"];
const teams = [
  { name: "Arena", department: "Frontend" },
  { name: "D-gate", department: "Backend" },
  { name: "K-net", department: "DevOps" },
  { name: "HR Team", department: "HR" },
  { name: "QA Team", department: "QA" },
];

export function search(query: string) {
  const lowercaseQuery = query.toLowerCase();
  
  const departmentResults = departments.filter(dept => 
    dept.toLowerCase().includes(lowercaseQuery)
  ).map(dept => ({ name: dept, type: 'department' as const }));

  const teamResults = teams.filter(team => 
    team.name.toLowerCase().includes(lowercaseQuery) || 
    team.department.toLowerCase().includes(lowercaseQuery)
  ).map(team => ({ ...team, type: 'team' as const }));

  return [...departmentResults, ...teamResults];
} 