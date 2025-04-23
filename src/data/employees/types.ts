export interface Employee {
  id: string;
  name: string;
  position: string;
  skills: string[];
  education: Education[];
  experience: Experience[];
}

export interface Education {
  school: string;
  degree: string;
  years: string;
}

export interface Experience {
  company: string;
  title: string;
  years: string;
}