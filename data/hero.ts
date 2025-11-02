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
  title: 'Data Science, AI & ML Enthusiast | Software Engineer',
  location: 'India',
  education: 'B.Tech Computer Science',
  currentRole: 'Student Developer',
  summary:
    'Passionate computer science student focused on Artificial Intelligence, Machine Learning, and Data Science. Experienced in building intelligent systems, predictive models, and scalable software solutions. Skilled in deep learning, computer vision, and data analytics with a strong foundation in software engineering principles. Committed to leveraging AI/ML technologies to solve real-world problems and drive innovation.',
  contacts: {
    email: 'aman.devrani6921@gmail.com',
    github: 'https://github.com/AMAN6921',
    linkedin: 'https://www.linkedin.com/in/amandevrani',
  },
};
