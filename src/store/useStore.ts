
import { create } from 'zustand';

interface UserSkill {
  name: string;
  level: number;
  category: string;
}

interface UserExperience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface UserEducation {
  degree: string;
  institution: string;
  year: string;
}

interface UserProject {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

interface UserState {
  // User profile
  name: string;
  email: string;
  bio: string;
  skills: UserSkill[];
  experience: UserExperience[];
  education: UserEducation[];
  projects: UserProject[];
  
  // Job search related
  savedJobs: any[];
  recentSearches: string[];
  
  // UI state
  isDarkMode: boolean;
  
  // Actions
  setUserProfile: (profile: Partial<UserState>) => void;
  addSkill: (skill: UserSkill) => void;
  removeSkill: (skillName: string) => void;
  addExperience: (exp: UserExperience) => void;
  removeExperience: (index: number) => void;
  saveJob: (job: any) => void;
  removeJob: (jobId: string) => void;
  addRecentSearch: (search: string) => void;
  toggleDarkMode: () => void;
}

export const useStore = create<UserState>((set) => ({
  // Default values
  name: 'John Doe',
  email: 'john.doe@example.com',
  bio: 'Full-stack developer with 5 years of experience',
  skills: [
    { name: 'React', level: 85, category: 'Frontend' },
    { name: 'TypeScript', level: 80, category: 'Frontend' },
    { name: 'Node.js', level: 75, category: 'Backend' },
    { name: 'Python', level: 70, category: 'Backend' },
    { name: 'SQL', level: 65, category: 'Database' },
  ],
  experience: [
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      period: '2021-Present',
      description: 'Developing modern web applications using React and TypeScript.'
    },
    {
      title: 'Frontend Developer',
      company: 'WebSolutions',
      period: '2019-2021',
      description: 'Built responsive web interfaces and implemented client-side logic.'
    }
  ],
  education: [
    {
      degree: 'MSc Computer Science',
      institution: 'Tech University',
      year: '2018'
    }
  ],
  projects: [
    {
      name: 'E-commerce Platform',
      description: 'A full-stack e-commerce application with React and Node.js',
      technologies: ['React', 'Node.js', 'MongoDB'],
      link: 'https://github.com/johndoe/ecommerce'
    }
  ],
  savedJobs: [],
  recentSearches: [],
  isDarkMode: false,
  
  // Actions
  setUserProfile: (profile) => set((state) => ({ ...state, ...profile })),
  addSkill: (skill) => set((state) => ({ 
    skills: [...state.skills, skill] 
  })),
  removeSkill: (skillName) => set((state) => ({ 
    skills: state.skills.filter(skill => skill.name !== skillName) 
  })),
  addExperience: (exp) => set((state) => ({ 
    experience: [...state.experience, exp] 
  })),
  removeExperience: (index) => set((state) => ({ 
    experience: state.experience.filter((_, i) => i !== index) 
  })),
  saveJob: (job) => set((state) => ({ 
    savedJobs: [...state.savedJobs, job] 
  })),
  removeJob: (jobId) => set((state) => ({ 
    savedJobs: state.savedJobs.filter(job => job.id !== jobId) 
  })),
  addRecentSearch: (search) => set((state) => ({ 
    recentSearches: [search, ...state.recentSearches.slice(0, 4)] 
  })),
  toggleDarkMode: () => set((state) => ({ 
    isDarkMode: !state.isDarkMode 
  })),
}));
