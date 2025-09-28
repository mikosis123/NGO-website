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
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  imageHint: string;
};

export type ImpactMetric = {
  value: string;
  label: string;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
};
