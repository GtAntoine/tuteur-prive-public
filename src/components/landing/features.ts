import { DivideIcon as LucideIcon, BookOpen, HelpCircle, CheckSquare, Shield } from 'lucide-react';

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  image: string;
}

export const features = [
  {
    title: "landing.features.exercises.title",
    description: "landing.features.exercises.description",
    icon: BookOpen,
    color: "from-blue-500 to-indigo-600",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80"
  },
  {
    title: "landing.features.help.title",
    description: "landing.features.help.description",
    icon: HelpCircle,
    color: "from-purple-500 to-pink-600",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
  },
  {
    title: "landing.features.correction.title",
    description: "landing.features.correction.description",
    icon: CheckSquare,
    color: "from-green-500 to-emerald-600",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
  },
  {
    title: "landing.features.anticheat.title",
    description: "landing.features.anticheat.description",
    icon: Shield,
    color: "from-orange-500 to-red-600",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80"
  }
];