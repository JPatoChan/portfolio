export type TabType = 'about' | 'features' | 'contact';

export interface Skill {
  name: string;
  category: 'mobile' | 'frontend' | 'backend' | 'devops' | 'architecture';
  level: number; // 0 to 100
  years: number;
  highlight?: string;
  icon?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
}

export interface FeatureItem {
  id: string;
  title: string;
  shortDesc: string;
  category: 'Tools' | 'Productivity' | 'Mobile & Hardware' | 'API & Networking' | 'Design & UI';
  badge: string;
  iconName: string;
}

export interface Task {
  id: string;
  title: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  createdAt: string;
}
