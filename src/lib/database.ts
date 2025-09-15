import { supabase } from './supabase';
import { Bird, QuizSession, QuizAnswer } from '../types';

export class DatabaseService {
  // Bird-related methods
  static async getBirds(): Promise<Bird[]> {
    const { data, error } = await supabase
      .from('birds')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching birds:', error);
      throw error;
    }
    
    return data || [];
  }

  static async getBirdsByDifficulty(difficultyLevel: number): Promise<Bird[]> {
    const { data, error } = await supabase
      .from('birds')
      .select('*')
      .eq('difficulty_level', difficultyLevel)
      .order('name');
    
    if (error) {
      console.error('Error fetching birds by difficulty:', error);
      throw error;
    }
    
    return data || [];
  }

  static async getRandomBirds(count: number, difficultyLevel?: number): Promise<Bird[]> {
    let query = supabase
      .from('birds')
      .select('*');

    if (difficultyLevel) {
      query = query.eq('difficulty_level', difficultyLevel);
    }

    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching random birds:', error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      return [];
    }
    
    // Shuffle and take the requested number
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Quiz session methods
  static async createQuizSession(userId: string, totalQuestions: number): Promise<QuizSession> {
    const { data, error } = await supabase
      .from('quiz_sessions')
      .insert({
        user_id: userId,
        total_questions: totalQuestions,
        correct_answers: 0,
        score_percentage: 0
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating quiz session:', error);
      throw error;
    }

    return data;
  }

  static async updateQuizSession(
    sessionId: string, 
    correctAnswers: number, 
    isCompleted: boolean = false
  ): Promise<QuizSession> {
    const scorePercentage = (correctAnswers / 10) * 100; // Assuming 10 questions for now
    
    const updateData: any = {
      correct_answers: correctAnswers,
      score_percentage: scorePercentage
    };

    if (isCompleted) {
      updateData.completed_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('quiz_sessions')
      .update(updateData)
      .eq('id', sessionId)
      .select()
      .single();

    if (error) {
      console.error('Error updating quiz session:', error);
      throw error;
    }

    return data;
  }

  static async getQuizSessions(userId: string): Promise<QuizSession[]> {
    const { data, error } = await supabase
      .from('quiz_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching quiz sessions:', error);
      throw error;
    }

    return data || [];
  }

  // Quiz answer methods
  static async saveQuizAnswer(answer: Omit<QuizAnswer, 'id' | 'created_at'>): Promise<QuizAnswer> {
    const { data, error } = await supabase
      .from('quiz_answers')
      .insert(answer)
      .select()
      .single();

    if (error) {
      console.error('Error saving quiz answer:', error);
      throw error;
    }

    return data;
  }

  static async getQuizAnswers(sessionId: string): Promise<QuizAnswer[]> {
    const { data, error } = await supabase
      .from('quiz_answers')
      .select(`
        *,
        bird:birds!quiz_answers_bird_id_fkey(*),
        selected_bird:birds!quiz_answers_selected_bird_id_fkey(*)
      `)
      .eq('quiz_session_id', sessionId)
      .order('created_at');

    if (error) {
      console.error('Error fetching quiz answers:', error);
      throw error;
    }

    return data || [];
  }
}
