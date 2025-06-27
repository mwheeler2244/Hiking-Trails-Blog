export interface Trail {
  id: number;
  name: string;
  difficulty: string;
  distance: string;
  elevation: string;
  description: string;
  image: string;
}

export interface BlogPost {
  id: number;
  title: string;
  topic: string;
  readTime: string;
  excerpt: string;
  content: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export interface TrailCardProps {
  trail: Trail;
}

export interface ContactFormProps {
  contactForm: ContactFormData;
  setContactForm: (form: ContactFormData) => void;
  formErrors: FormErrors;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export interface BlogListProps {
  posts: BlogPost[];
  onSelect: (post: BlogPost) => void;
}

export interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  darkMode: boolean;
  scrollToBlog: () => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

export interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean | ((prev: boolean) => boolean)) => void;
}
