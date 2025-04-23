// src/data/employees/employeeSkills.ts

export interface EmployeeSkill {
  employeeId: string;
  skill: string;
  proficiency: number; // e.g., 1-5
}

export const employeeSkills: EmployeeSkill[] = [
  // Add sample data here
  // { employeeId: '1', skill: 'JavaScript', proficiency: 4 },
  // { employeeId: '2', skill: 'Project Management', proficiency: 5 },
];