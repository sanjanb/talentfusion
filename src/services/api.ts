
// This file will simulate API calls to a backend service

// Mock data for jobs
const mockJobs = [
  { 
    id: '1', 
    title: 'Senior Frontend Developer', 
    company: 'TechCorp',
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
    description: 'Seeking an experienced frontend developer to join our team...',
    requirements: ['5+ years React experience', 'TypeScript', 'State management'],
    requiredSkills: {
      'React': 90,
      'TypeScript': 85,
      'Redux': 80,
      'CSS': 75,
      'Testing': 70
    },
    posted: '2023-11-15'
  },
  { 
    id: '2', 
    title: 'Full Stack Engineer', 
    company: 'StartupX',
    location: 'Remote',
    salary: '$100,000 - $130,000',
    description: 'Join our fast-growing startup to build innovative products...',
    requirements: ['3+ years experience', 'Frontend and backend skills', 'Database design'],
    requiredSkills: {
      'React': 85,
      'Node.js': 85,
      'MongoDB': 80,
      'Express': 75,
      'AWS': 65
    },
    posted: '2023-11-10'
  },
  { 
    id: '3', 
    title: 'UI Developer', 
    company: 'DesignLabs',
    location: 'New York, NY',
    salary: '$90,000 - $120,000',
    description: 'Looking for a UI developer with strong design sensibilities...',
    requirements: ['3+ years UI development', 'Design systems', 'Responsive design'],
    requiredSkills: {
      'HTML/CSS': 90,
      'JavaScript': 85,
      'UI Frameworks': 80,
      'Design Tools': 75,
      'Accessibility': 70
    },
    posted: '2023-11-05'
  }
];

// Mock data for learning resources
const mockLearningResources = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    provider: 'Frontend Masters',
    type: 'Course',
    duration: '6 hours',
    level: 'Advanced',
    skill: 'React',
    link: 'https://frontendmasters.com'
  },
  {
    id: '2',
    title: 'TypeScript Deep Dive',
    provider: 'Udemy',
    type: 'Course',
    duration: '12 hours',
    level: 'Intermediate',
    skill: 'TypeScript',
    link: 'https://udemy.com'
  },
  {
    id: '3',
    title: 'Backend Development with Node.js',
    provider: 'Coursera',
    type: 'Specialization',
    duration: '3 months',
    level: 'Intermediate',
    skill: 'Node.js',
    link: 'https://coursera.org'
  }
];

// Simulate API request delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API service
export const api = {
  // Job related endpoints
  jobs: {
    getAll: async () => {
      await delay(800);
      return mockJobs;
    },
    
    search: async (query: string) => {
      await delay(600);
      return mockJobs.filter(job => 
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.description.toLowerCase().includes(query.toLowerCase())
      );
    },
    
    getById: async (id: string) => {
      await delay(500);
      return mockJobs.find(job => job.id === id);
    }
  },
  
  // Learning resources endpoints
  learning: {
    getAll: async () => {
      await delay(700);
      return mockLearningResources;
    },
    
    getBySkill: async (skill: string) => {
      await delay(500);
      return mockLearningResources.filter(resource => 
        resource.skill.toLowerCase() === skill.toLowerCase()
      );
    }
  },
  
  // Skill gap analysis endpoints
  skillGap: {
    analyze: async (userSkills: {name: string, level: number}[], jobId: string) => {
      await delay(1000);
      const job = mockJobs.find(j => j.id === jobId);
      
      if (!job) return { match: 0, gaps: [] };
      
      // Calculate skill gap
      const gaps = Object.entries(job.requiredSkills).map(([skillName, requiredLevel]) => {
        const userSkill = userSkills.find(s => s.name === skillName);
        const currentLevel = userSkill ? userSkill.level : 0;
        const gap = Math.max(0, requiredLevel - currentLevel);
        
        return {
          name: skillName,
          currentLevel,
          requiredLevel,
          gap
        };
      });
      
      // Calculate overall match percentage
      const totalPossibleGap = Object.values(job.requiredSkills).reduce((sum, val) => sum + val, 0);
      const totalGap = gaps.reduce((sum, skill) => sum + skill.gap, 0);
      const match = Math.round(100 - (totalGap / totalPossibleGap * 100));
      
      return {
        match,
        gaps
      };
    }
  }
};
