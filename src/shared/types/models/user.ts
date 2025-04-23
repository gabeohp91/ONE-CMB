/**
 * Base user model definition
 * This is the foundation for all user types in the system
 */
export interface User {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  avatar: string;
  phone: string;
  manager?: string;
  joinDate: string;
  isActive?: boolean;
  role?: string;
  permissions?: string[];
}

/**
 * Employee model extends the base User model
 * This combines the previously separate User and Employee types
 */
export interface Employee extends User {
  skills: string[];
  education: Education[];
  experience: Experience[];
  performance?: PerformanceMetrics;
  schedule?: Schedule;
}

/**
 * Education record for an employee
 */
export interface Education {
  school: string;
  degree: string;
  years: string;
  fieldOfStudy?: string;
  graduationDate?: string;
}

/**
 * Professional experience record for an employee
 */
export interface Experience {
  company: string;
  title: string;
  years: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  responsibilities?: string[];
}

/**
 * Performance metrics for an employee
 */
export interface PerformanceMetrics {
  rating: number;
  completionRate: number;
  onTimeRate: number;
  qualityScore: number;
  reviewDate: string;
  feedbackCount: number;
}

/**
 * Employee schedule
 */
export interface Schedule {
  workDays: string[];
  workHours: {
    start: string;
    end: string;
  };
  timeZone: string;
  vacationDays: string[];
  availability: string;
}

/**
 * User credentials for authentication
 */
export interface UserCredentials {
  email: string;
  password: string;
}

/**
 * User profile update request 
 */
export interface UserProfileUpdate {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  position?: string;
  department?: string;
}

/**
 * Employee profile update request
 */
export interface EmployeeProfileUpdate extends UserProfileUpdate {
  skills?: string[];
  education?: Education[];
  experience?: Experience[];
}

/**
 * Utility to normalize user/employee data from various sources
 */
export function normalizeUser(userData: Partial<User> & { id: string }): User {
  return {
    id: userData.id,
    name: userData.name || 'Unknown User',
    email: userData.email || `user-${userData.id}@example.com`,
    position: userData.position || 'Employee',
    department: userData.department || 'General',
    avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'Unknown')}`,
    phone: userData.phone || '',
    manager: userData.manager,
    joinDate: userData.joinDate || new Date().toISOString(),
    isActive: userData.isActive !== undefined ? userData.isActive : true,
    role: userData.role || 'user',
    permissions: userData.permissions || [],
  };
}

/**
 * Utility to normalize employee data
 */
export function normalizeEmployee(
  employeeData: Partial<Employee> & { id: string }
): Employee {
  const baseUser = normalizeUser(employeeData);
  
  return {
    ...baseUser,
    skills: employeeData.skills || [],
    education: employeeData.education || [],
    experience: employeeData.experience || [],
    performance: employeeData.performance,
    schedule: employeeData.schedule,
  };
}