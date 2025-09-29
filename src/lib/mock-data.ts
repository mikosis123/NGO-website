
import type { Project, NewsArticle, TeamMember, ImpactMetric, NavLink } from './types';
import { PlaceHolderImages } from './placeholder-images';
import { Users, Briefcase, Calendar, Globe, Water, GraduationCap, School, Sprout } from 'lucide-react';

function findImage(id: string) {
  const image = PlaceHolderImages.find(p => p.id === id);
  return image ? { url: image.imageUrl, hint: image.imageHint } : { url: 'https://picsum.photos/seed/error/600/400', hint: 'placeholder' };
}

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/projects', label: 'Projects' },
  { href: '/news', label: 'News' },
  { href: '/gallery', label: 'Gallery' },
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
  {
    id: '5',
    slug: 'clean-water-access',
    title: 'Clean Water Access Program',
    category: 'Health',
    description: 'Constructing wells and water purification systems in arid regions.',
    longDescription: 'Access to clean water is a fundamental human right. This project focuses on drilling new boreholes, repairing existing wells, and installing low-cost water filtration systems to provide safe drinking water and reduce waterborne diseases.',
    imageUrl: findImage('news-article-1').url,
    imageHint: findImage('news-article-1').hint,
    goals: ['Build 20 new wells', 'Provide clean water to 15,000 people', 'Train local water management committees'],
    beneficiaries: '25 rural communities',
    timeline: '2023 - Present',
  },
  {
    id: '6',
    slug: 'girls-education-scholarship',
    title: 'Girls\' Education Scholarship',
    category: 'Youth',
    description: 'Funding scholarships for girls to complete their secondary education.',
    longDescription: 'This program provides scholarships that cover tuition, uniforms, and school supplies for girls from low-income families, empowering them to complete their education and break the cycle of poverty.',
    imageUrl: 'https://picsum.photos/seed/project6/600/400',
    imageHint: 'girls school',
    goals: ['Support 200 girls through secondary school', 'Achieve a 95% graduation rate', 'Provide mentorship and career guidance'],
    beneficiaries: '200 adolescent girls',
    timeline: '2022 - Present',
  },
  {
    id: '7',
    slug: 'school-building-initiative',
    title: 'Rural School Building Initiative',
    category: 'Youth',
    description: 'Constructing and equipping primary schools in remote villages.',
    longDescription: 'We build safe, weather-resistant schools to replace dilapidated structures, creating a conducive learning environment for children. Each school is equipped with desks, books, and basic supplies.',
    imageUrl: 'https://picsum.photos/seed/project7/600/400',
    imageHint: 'school building',
    goals: ['Build 5 new primary schools', 'Provide quality education facilities for 1,000 children', 'Increase school enrollment by 50%'],
    beneficiaries: '1,000 primary school students',
    timeline: '2023 - 2025',
  },
  {
    id: '8',
    slug: 'micro-gardens-for-nutrition',
    title: 'Urban Micro-Gardens for Nutrition',
    category: 'Agriculture',
    description: 'Helping families in urban slums grow their own nutritious food in small spaces.',
    longDescription: 'This project introduces vertical and container gardening techniques to families living in crowded urban areas. We provide seeds, soil, and training to help them grow vegetables, improving nutrition and food security.',
    imageUrl: 'https://picsum.photos/seed/project8/600/400',
    imageHint: 'urban garden',
    goals: ['Establish 500 micro-gardens', 'Improve dietary diversity for 500 families', 'Promote community-based food systems'],
    beneficiaries: '500 urban families',
    timeline: '2024 - Present',
  }
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
   {
    id: '3',
    slug: 'reforestation-drive-surpasses-goal',
    title: 'Reforestation Drive Surpasses Goal, Plants 20,000 Trees',
    excerpt: 'An incredible turnout of volunteers helped us exceed our goal for the annual tree-planting event, contributing to a greener and healthier planet.',
    content: 'Over a single weekend, more than 500 volunteers from all walks of life came together to plant 20,000 native saplings in the Green Valley region. This effort is part of our long-term commitment to restoring local forests, which are vital for biodiversity and clean air. The enthusiasm and dedication of our community were truly inspiring and have made a lasting impact on the environment.',
    imageUrl: findImage('project-environment').url,
    imageHint: findImage('project-environment').hint,
    date: '2024-03-22',
  },
  {
    id: '4',
    slug: 'new-partnership-for-digital-literacy',
    title: 'New Partnership to Expand Digital Literacy for Adults',
    excerpt: 'Empower Change is thrilled to announce a new partnership with TechForward to provide digital literacy workshops for adults in underserved communities.',
    content: 'In today\'s digital world, computer skills are more important than ever. This new partnership with TechForward will allow us to offer free workshops on basic computing, internet safety, and online job searching. Our goal is to bridge the digital divide and empower adults with the confidence and skills needed to succeed in the modern workforce.',
    imageUrl: findImage('project-youth-education').url,
    imageHint: findImage('project-youth-education').hint,
    date: '2024-02-18',
  },
  {
    id: '5',
    slug: 'health-fair-reaches-over-1000-families',
    title: 'Annual Health Fair Provides Vital Services to Over 1,000 Families',
    excerpt: 'Our annual Community Health Fair was a resounding success, offering free health screenings, vaccinations, and wellness education to local families.',
    content: 'The fair provided a one-stop shop for essential health services, including blood pressure checks, dental exams, and flu shots. We are grateful to our team of volunteer doctors, nurses, and dentists who dedicated their time and expertise to make this event possible. It\'s a critical part of our mission to ensure everyone has access to quality healthcare.',
    imageUrl: findImage('project-health-clinic').url,
    imageHint: findImage('project-health-clinic').hint,
    date: '2024-01-30',
  },
    {
    id: '6',
    slug: 'youth-sports-program-launch',
    title: 'Youth Sports Program Kicks Off with Community Support',
    excerpt: 'A new after-school sports program has been launched to provide a safe and healthy outlet for local youth, thanks to community donations.',
    content: 'The new soccer and basketball leagues are already a huge hit, with over 100 children signed up. These programs are not just about physical activity; they teach valuable life skills like teamwork, discipline, and sportsmanship. We believe in the power of sport to build character and create a positive environment for kids to thrive.',
    imageUrl: 'https://picsum.photos/seed/news6/600/400',
    imageHint: 'children playing soccer',
    date: '2023-12-10',
  },
  {
    id: '7',
    slug: 'disaster-relief-efforts-mobilized',
    title: 'Disaster Relief Efforts Mobilized for Flood Victims',
    excerpt: 'In response to the recent flash floods, Empower Change has deployed a rapid response team to provide emergency aid and support to affected families.',
    content: 'Our teams are on the ground distributing clean water, food, and temporary shelter to those who have lost their homes. We are working closely with local authorities to coordinate relief efforts and ensure that aid reaches those most in need. Your donations are critical in helping us provide immediate assistance during this difficult time.',
    imageUrl: 'https://picsum.photos/seed/news7/600/400',
    imageHint: 'disaster relief',
    date: '2023-11-05',
  },
  {
    id: '8',
    slug: 'artisan-cooperative-expands-market-reach',
    title: 'Local Artisan Cooperative Expands Market Reach',
    excerpt: 'The women\'s artisan cooperative we support has successfully launched an online store, bringing their beautiful, handcrafted goods to a global audience.',
    content: 'This new e-commerce platform is a game-changer for the artisans, providing them with a sustainable income and economic independence. Empower Change provided the training and resources needed to get the online store up and running. We are incredibly proud of their entrepreneurial spirit and the beautiful products they create.',
    imageUrl: 'https://picsum.photos/seed/news8/600/400',
    imageHint: 'handcrafted goods',
    date: '2023-10-21',
  },
];

export const mockTeam: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Alisha Sharma',
    role: 'Founder & CEO',
    imageUrl: findImage('team-member-1').url,
    imageHint: findImage('team-member-1').hint,
    bio: 'With over 20 years of experience in international development, Dr. Sharma founded Light for Generation Ethiopia with a vision to create lasting, community-driven change.'
  },
  {
    id: '2',
    name: 'Ben Carter',
    role: 'Director of Programs',
    imageUrl: findImage('team-member-2').url,
    imageHint: findImage('team-member-2').hint,
    bio: 'Ben oversees all of our field operations, ensuring that our projects are implemented effectively and sustainably. He is passionate about empowering local leaders.'
  },
  {
    id: '3',
    name: 'Fatima Al-Jamil',
    role: 'Lead Field Coordinator',
    imageUrl: findImage('team-member-3').url,
    imageHint: findImage('team-member-3').hint,
    bio: 'Fatima works directly with our partner communities, building relationships and ensuring that our projects meet their unique needs. Her dedication is the heart of our work.'
  },
];

    

    
