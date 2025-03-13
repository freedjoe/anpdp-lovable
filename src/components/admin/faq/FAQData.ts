
export interface FAQ {
  id: number;
  question: string;
  category: string;
  published: boolean;
}

export interface Language {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

// Sample data for FAQs
export const faqs: FAQ[] = [
  {
    id: 1,
    question: "Qu'est-ce que l'ANPDP?",
    category: "Général",
    published: true
  },
  {
    id: 2,
    question: "Qui est concerné par la loi n° 18-07?",
    category: "Loi N°18-07",
    published: true
  },
  {
    id: 3,
    question: "Quelles sont les données à caractère personnel?",
    category: "Notions Clés",
    published: true
  },
  {
    id: 4,
    question: "Comment déclarer un traitement de données?",
    category: "Procédures",
    published: false
  }
];

export const languages: Language[] = [
  { id: "fr", name: "French" },
  { id: "en", name: "English" },
  { id: "ar", name: "Arabic" }
];

export const categories: Category[] = [
  { id: "general", name: "Général" },
  { id: "law", name: "Loi N°18-07" },
  { id: "concepts", name: "Notions Clés" },
  { id: "procedures", name: "Procédures" }
];
