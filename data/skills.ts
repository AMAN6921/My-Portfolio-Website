import { SkillCategory } from './types';

export const skillCategories: SkillCategory[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'C', icon: 'SiC' },
      { name: 'C++', icon: 'SiCplusplus' },
      { name: 'Python', icon: 'SiPython' },
      { name: 'Java', icon: 'SiJava' },
      { name: 'JavaScript', icon: 'SiJavascript' },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'VS Code', icon: 'SiVisualstudiocode' },
      { name: 'Postman', icon: 'SiPostman' },
      { name: 'Docker', icon: 'SiDocker' },
      { name: 'Git', icon: 'SiGit' },
      { name: 'Firebase', icon: 'SiFirebase' },
      { name: 'Ubuntu', icon: 'SiUbuntu' },
    ],
  },
  {
    category: 'Frameworks & Technologies',
    skills: [
      { name: 'React.js', icon: 'SiReact' },
      { name: 'Next.js', icon: 'SiNextdotjs' },
      { name: 'Flask', icon: 'SiFlask' },
      { name: 'Node.js', icon: 'SiNodedotjs' },
      { name: 'Oracle SQL', icon: 'SiOracle' },
    ],
  },
];
