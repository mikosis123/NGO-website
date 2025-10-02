

export type NavLink = {
  href: string;
  label: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: 'Agriculture' | 'Youth' | 'Environment' | 'Health';
  description: string;
  longDescription: string;
  imageUrl: string;
  imageHint: string;
  goals: string[];
  beneficiaries: string;
  timeline: string;
  fundingProgress: number;
  createdAt: Date;
};

export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageHint: string;
  date: string;
  createdAt: Date;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  imageHint: string;
  bio?: string;
};

export type ImpactMetric = {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
};

export type Resource = {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  icon: React.ComponentType<{ className?: string }>;
};
