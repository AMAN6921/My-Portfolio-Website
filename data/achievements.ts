import { Achievement, Certification } from './types';

export const achievements: Achievement[] = [
  {
    id: 'leetcode',
    title: 'LeetCode Problem Solver',
    description: 'Solved 185+ algorithmic problems across various difficulty levels, demonstrating strong problem-solving and data structures knowledge',
    icon: 'Code2',
    link: 'https://leetcode.com/AMAN6921',
  },
  {
    id: 'team-leader',
    title: 'Project Team Leader',
    description: 'Led project teams in academic and collaborative environments, coordinating development efforts and ensuring successful project delivery',
    icon: 'Users',
  },
  {
    id: 'aws-license',
    title: 'AWS Skill Builder License',
    description: 'Awarded for outstanding academic performance and dedication to cloud computing technologies',
    icon: 'Award',
  },
  {
    id: 'coursera-license',
    title: 'Coursera License',
    description: 'Recognized for exceptional academic achievement and commitment to continuous learning',
    icon: 'GraduationCap',
  },
];

export const certifications: Certification[] = [
  {
    id: 'postman-api',
    name: 'Postman API Fundamentals Expert',
    issuer: 'Postman',
    date: 'October 2025',
    credentialLink: 'https://api.badgr.io/public/assertions/your-credential-id',
  },
  {
    id: 'seo-certification',
    name: 'Search Engine Optimization',
    issuer: 'HubSpot Academy',
    date: 'October 2025',
  },
  {
    id: 'aws-certifications',
    name: 'AWS Cloud Foundations & Technical Essentials',
    issuer: 'AWS Skill Builder',
    date: 'February 2025',
  },
];
