
export type Category = 'Rules' | 'Signs' | 'Controls';

export interface RoadSign {
  id: string;
  code: string;
  name: string;
  description: string;
  imageUrl: string;
  type: 'Regulatory' | 'Warning' | 'Guidance' | 'Information';
}

export interface QuizQuestion {
  id: string;
  category: Category;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ProgressData {
  category: string;
  score: number;
  total: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
