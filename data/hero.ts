export interface HeroData {
  name: string;
  title: string;
  location: string;
  education: string;
  currentRole: string;
  summary: string;
  contacts: {
    email: string;
    github: string;
    linkedin: string;
  };
}

export const heroData: HeroData = {
  name: 'Aman Devrani',
  title: 'Software Engineer & ML Enthusiast',
  location: 'India',
  education: 'B.Tech Computer Science',
  currentRole: 'Student Developer',
  summary:
    'Passionate computer science student specializing in software development and machine learning. Experienced in building scalable applications with modern technologies and solving complex algorithmic problems. Committed to writing clean, efficient code and contributing to open-source projects.',
  contacts: {
    email: 'aman.devrani6921@gmail.com',
    github: 'https://github.com/AMAN6921',
    linkedin: 'https://www.linkedin.com/in/amandevrani',
  },
};
