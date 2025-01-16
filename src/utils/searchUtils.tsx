
type Department = 'Frontend' | 'Backend' | 'DevOps' | 'HR' | 'QA';
type Team = { name: string; department: Department };

export const departments: Department[] = ['Frontend', 'Backend', 'DevOps', 'HR', 'QA'];
export const teams: Team[] = [
  { name: 'Arena', department: 'Frontend' },
  { name: 'D-gate', department: 'Backend' },
  { name: 'K-net', department: 'DevOps' },
  { name: 'HR Team', department: 'HR' },
  { name: 'QA Team', department: 'QA' },
];

export function search(query: string): (Department | Team)[] {
  if (query.trim() === '') {
    return [];
  }

  const lowerCaseQuery = query.toLowerCase();
  const filteredDepartments = departments.filter(department =>
    department.toLowerCase().includes(lowerCaseQuery)
  );
  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(lowerCaseQuery)
  );

  return [...filteredDepartments, ...filteredTeams];
}