// Database types for the bird call learning app

export interface Bird {
  id: string;
  name: string;
  image_url: string;
  audio_url: string;
  scientific_name?: string;
  description?: string;
  difficulty_level?: number;
  created_at: string;
  updated_at?: string;
}

export interface Profile {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  website?: string;
  updated_at?: string;
}

export interface QuizSession {
  id: string;
  user_id: string;
  total_questions: number;
  correct_answers: number;
  score_percentage: number;
  completed_at?: string;
  created_at: string;
}

export interface QuizAnswer {
  id: string;
  quiz_session_id: string;
  bird_id: string;
  selected_bird_id: string;
  is_correct: boolean;
  time_taken_seconds?: number;
  created_at: string;
}

// Quiz-related types
export interface QuizQuestion {
  bird: Bird;
  options: Bird[];
  correctAnswer: Bird;
}

export interface QuizState {
  currentQuestion: number;
  totalQuestions: number;
  questions: QuizQuestion[];
  answers: QuizAnswer[];
  isCompleted: boolean;
  score: number;
  startTime: Date;
}

export interface QuizSettings {
  totalQuestions: number;
  difficultyLevel?: number;
  timeLimit?: number; // in seconds
}
