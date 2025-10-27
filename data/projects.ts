import { Project } from './types';

export const projects: Project[] = [
  {
    id: 'cloud-vm-optimization',
    title: 'Cloud VM Resource Optimization',
    tech: ['C++', 'React', 'Flask', 'DSA Algorithms'],
    duration: 'Apr 2025 – Jun 2025',
    description: 'Developed an optimized cloud resource allocation system using the 0/1 Knapsack Algorithm, reducing VM wastage and improving cloud efficiency.',
    impact: 'Enhanced performance and reliability of VM allocation',
    githubLink: 'https://github.com/AMAN6921/cloud-vm-optimization',
  },
  {
    id: 'house-price-predictor',
    title: 'House Price Predictor',
    tech: ['Python', 'Machine Learning', 'Flask', 'Scikit-learn'],
    duration: 'Jan 2025 – Mar 2025',
    description: 'Built a machine learning model to predict house prices based on various features using regression algorithms.',
    impact: 'Achieved 93% prediction accuracy on test dataset',
    accuracy: '93%',
    githubLink: 'https://github.com/AMAN6921/house-price-predictor',
  },
  {
    id: 'ml-loan-allocation',
    title: 'Multi-Model ML Loan Allocation',
    tech: ['Python', 'Machine Learning', 'Pandas', 'NumPy'],
    duration: 'Sep 2024 – Dec 2024',
    description: 'Developed a multi-model machine learning system for loan allocation decisions, comparing multiple algorithms to optimize approval accuracy.',
    impact: 'Achieved 95% accuracy in loan approval predictions',
    accuracy: '95%',
    githubLink: 'https://github.com/AMAN6921/ml-loan-allocation',
  },
];
