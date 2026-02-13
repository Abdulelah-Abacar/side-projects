import { ReactNode } from "react";

export interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  href?: string;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
}

export interface CircularTextProps {
  text: string;
  icon?: React.ComponentType<{ className?: string }>; // Define icon as a React component
}

interface BannerChild {
  id: string | number;
  child: ReactNode; // The actual content to render
}

export interface BannerProps {
  children: BannerChild[]; // Array of child items
  speed?: number; // Scroll speed in milliseconds
}

// Hero Section Types
export interface HeroSection {
  chip: string;
  title: string;
  subtitle: string;
  cta: {
    primary: string;
    secondary: string;
  };
}

// About Us Section Types
export interface AboutUsSection {
  chip: string;
  title: string;
  description: string;
  cta: string;
}

// Why Choose Us Section Types
interface WhyChooseUsReason {
  icon: string;
  title: string;
  description: string;
}

export interface WhyChooseUsSection {
  chip: string;
  title: string;
  reasons: WhyChooseUsReason[];
}

export interface WhyChooseUsCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
  className?: string;
  iconAlt?: string;
  onClick?: () => void;
}

// Our Services Section Types
interface Service {
  title: string;
  description: string;
  sub: string[];
}

export interface OurServicesSection {
  chip: string;
  title: string;
  services: Service[];
}

export interface ServiceCardProps {
  data: {
    title: string;
    description: string;
    sub: string[];
  };
  index: number;
  buttonText?: string;
}

// Case Studio Section Types
export interface CaseStudioSection {
  chip: string;
  title: string;
  cases: CaseStudioProps[];
}

export interface CaseStudioProps {
  index?: number;
  name: string;
  title: string;
  description: string;
  img: string;
  status: {
    score: string | number;
    label: string;
  };
}

export interface CaseStudyData {
  name: string;
  title: string;
  description: string;
  img: string;
  status: {
    score: string | number;
    label: string;
  };
}

// Subscription Section Types
interface Plan {
  title: string;
  price: string;
  features: string[];
  idealText: string;
}

interface FlexiblePricing {
  chip: string;
  title: string;
  description: string;
}

export interface SubscriptionSection {
  chip: string;
  title: string;
  cta: string;
  plans: Plan[];
  flexiblePricing: FlexiblePricing;
}

export interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  index: number;
  idealForText?: string;
  buttonText?: string;
  startingAtText?: string;
}

// Agency Status Section Types
interface AgencyStatus {
  status: string;
  label: string;
}

export interface RatingProps {
  data: AgencyStatus[];
}

export interface RatingItemProps {
  rating: AgencyStatus;
  isLast: boolean;
}

// Testimonial Section Types
export interface TestimonialData {
  quote: string;
  name: string;
  position: string;
}

export interface TestimonialProps {
  testimonial: TestimonialData;
  className?: string;
  backgroundImage?: string;
}
export interface TestimonialsProps {
  data: TestimonialData[];
}

// Contact Us Section Types
interface ContactMethod {
  icon: string;
  text: string;
}

interface FormData {
  title: string;
  description: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  subjectPlaceholder: string;
  messagePlaceholder: string;
  cta: string;
}

export interface ContactUsProps {
  chip: string;
  title: string;
  description: string;
  contactMethods: ContactMethod[];
  form: FormData;
}

// FAQ Section Types
interface FAQ {
  question: string;
  answer: string;
}

export interface FAQsProps {
  chip: string;
  title: string;
  questions: FAQ[];
}

// Footer Types
export interface SocialLink {
  icon: string;
  alt: string;
  url?: string;
}

export interface FooterProps {
  onSubscribe?: (email: string) => void;
  className?: string;
}

// Project Types
interface ProjectHeroSection {
  title: string;
  categories: string[];
}

interface ProjectOverviewSection {
  previewImage1: string;
  previewImage2: string;
  description: string;
}

interface ProcessItem {
  title: string;
  description: string;
}

interface ProjectOutcomeSection {
  description: string;
  status: {
    score: string;
    label: string;
  }[];
}

export interface Project {
  name: string;
  heroSection: ProjectHeroSection;
  overviewSection: ProjectOverviewSection;
  processSection: ProcessItem[];
  outcomeSection: ProjectOutcomeSection;
  gallerySection: string[];
}

// Main Website Data Interface
export interface LandingData {
  heroSection: HeroSection;
  aboutUsSection: AboutUsSection;
  whyChooseUsSection: WhyChooseUsSection;
  ourServicesSection: OurServicesSection;
  caseStudioSection: CaseStudioSection;
  subscriptionSection: SubscriptionSection;
  agencyStatusSection: AgencyStatus[];
  testimonials: TestimonialData[];
  contactUsSection: ContactUsProps;
  fqaSection: FAQsProps;
}
