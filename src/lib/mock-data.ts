import type { Project, NewsArticle, TeamMember, ImpactMetric, NavLink } from './types';
import { PlaceHolderImages } from './placeholder-images';
import { Users, Briefcase, Calendar, Globe } from 'lucide-react';

function findImage(id: string) {
  const image = PlaceHolderImages.find(p => p.id === id);
  return image ? { url: image.imageUrl, hint: image.imageHint } : { url: 'https://picsum.photos/seed/error/600/400', hint: 'placeholder' };
}

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/projects', label: 'Projects' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
];

export const mockImpactMetrics: ImpactMetric[] = [
  { value: '1,000+', label: 'Beneficiaries', icon: Users },
  { value: '50+', label: 'Projects Completed', icon: Briefcase },
  { value: '20', label: 'Years of Service', icon: Calendar },
  { value: '15', label: 'Countries Reached', icon: Globe },
];

export const mockProjects: Project[] = [
  {
    id: '1',
    slug: 'sustainable-farming-initiative',
    title: 'Sustainable Farming Initiative',
    category: 'Agriculture',
    description: 'Empowering local farmers with sustainable techniques and resources.',
    longDescription: 'Our Sustainable Farming Initiative works with rural communities to implement eco-friendly agricultural practices. We provide training on crop rotation, water conservation, and organic pest control, helping to increase yields and protect the environment.',
    imageUrl: findImage('project-agriculture').url,
    imageHint: findImage('project-agriculture').hint,
    goals: ['Increase crop yield by 30%', 'Reduce water usage', 'Promote biodiversity'],
    beneficiaries: '500 farming families',
    timeline: '2022 - Present',
  },
  {
    id: '2',
    slug: 'youth-coding-bootcamp',
    title: 'Youth Coding Bootcamp',
    category: 'Youth',
    description: 'Providing technology education and career opportunities for underprivileged youth.',
    longDescription: 'The Youth Coding Bootcamp is a free, intensive program that teaches young people valuable programming skills. Our curriculum covers web development, mobile apps, and data science, preparing students for careers in the tech industry.',
    imageUrl: findImage('project-youth-education').url,
    imageHint: findImage('project-youth-education').hint,
    goals: ['Train 100 students annually', 'Achieve 70% job placement rate', 'Foster innovation'],
    beneficiaries: '100+ young adults per year',
    timeline: '2021 - Present',
  },
  {
    id: '3',
    slug: 'forest-restoration-project',
    title: 'Forest Restoration Project',
    category: 'Environment',
    description: 'Replanting native trees to combat deforestation and restore vital ecosystems.',
    longDescription: 'In partnership with local communities, our Forest Restoration Project aims to reforest 1,000 hectares of degraded land. We focus on planting native species to restore biodiversity, improve soil quality, and mitigate climate change.',
    imageUrl: findImage('project-environment').url,
    imageHint: findImage('project-environment').hint,
    goals: ['Plant 1 million trees', 'Restore wildlife habitats', 'Engage community volunteers'],
    beneficiaries: 'Local ecosystem and communities',
    timeline: '2020 - Present',
  },
  {
    id: '4',
    slug: 'community-health-clinics',
    title: 'Community Health Clinics',
    category: 'Health',
    description: 'Bringing essential medical services to remote and underserved areas.',
    longDescription: 'Our mobile and stationary Community Health Clinics provide primary care, vaccinations, and health education to communities without access to regular medical facilities. We focus on maternal and child health to ensure a healthy start for the next generation.',
    imageUrl: findImage('project-health-clinic').url,
    imageHint: findImage('project-health-clinic').hint,
    goals: ['Provide 10,000 consultations annually', 'Vaccinate 95% of children', 'Reduce infant mortality'],
    beneficiaries: '10,000+ individuals annually',
    timeline: '2019 - Present',
  },
];

export const mockNews: NewsArticle[] = [
  {
    id: '1',
    slug: 'new-well-brings-clean-water',
    title: 'New Well Brings Clean Water to 5,000 People',
    excerpt: 'Our latest water project in the village of Asante has been completed, providing clean and safe drinking water to thousands of residents for the first time.',
    content: 'The completion of the Asante well marks a major milestone in our "Water for Life" campaign. For years, the community relied on a contaminated river, leading to widespread illness. Thanks to our donors and partners, families now have access to a safe water source, dramatically improving health and sanitation. The project, which involved drilling a 150-meter borehole and installing a solar-powered pump, was completed in just three months.',
    imageUrl: findImage('news-article-1').url,
    imageHint: findImage('news-article-1').hint,
    date: '2024-05-20',
  },
  {
    id: '2',
    slug: 'vocational-training-graduation',
    title: 'First Cohort Graduates from Vocational Training Program',
    excerpt: 'We celebrate the 50 students who have successfully graduated from our inaugural vocational training program, equipped with skills for a brighter future.',
    content: 'Tears of joy and cheers filled the hall as 50 young men and women received their certificates in carpentry, tailoring, and electrical work. This program was designed to provide practical skills that are in high demand, offering a pathway out of poverty. Many graduates have already secured employment or started their own small businesses. "This program gave me a future I could only dream of," said one graduate, Maria.',
    imageUrl: findImage('news-article-2').url,
    imageHint: findImage('news-article-2').hint,
    date: '2024-04-15',
  },
];

export const mockTeam: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Alisha Sharma',
    role: 'Founder & CEO',
    imageUrl: findImage('team-member-1').url,
    imageHint: findImage('team-member-1').hint,
  },
  {
    id: '2',
    name: 'Ben Carter',
    role: 'Director of Programs',
    imageUrl: findImage('team-member-2').url,
    imageHint: findImage('team-member-2').hint,
  },
  {
    id: '3',
    name: 'Fatima Al-Jamil',
    role: 'Lead Field Coordinator',
    imageUrl: findImage('team-member-3').url,
    imageHint: findImage('team-member-3').hint,
  },
];
