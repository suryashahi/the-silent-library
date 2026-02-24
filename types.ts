export interface Entity {
  type: 'Person' | 'Location' | 'Organization' | 'Date' | 'Number' | 'Other';
  value: string;
}

export interface SentimentAnalysis {
  score: number; // -1 to 1
  label: 'Positive' | 'Negative' | 'Neutral';
  explanation: string;
}

export interface AnalysisResult {
  sentiment: SentimentAnalysis;
  cleanedArticle: string;
  removedBiasedWords: string[];
  entities: Entity[];
  neutralSummary: string;
}

export interface AppState {
  article: string;
  isLoading: boolean;
  result: AnalysisResult | null;
  error: string | null;
}
