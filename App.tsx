import React, { useState } from 'react';
import Header from './components/Header';
import ArticleInput from './components/ArticleInput';
import AnalysisResults from './components/AnalysisResults';
import { analyzeArticle } from './services/geminiService';
import { AppState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    article: '',
    isLoading: false,
    result: null,
    error: null,
  });

  const handleAnalyze = async (text: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const result = await analyzeArticle(text);
      setState(prev => ({ ...prev, isLoading: false, result, article: text }));
    } catch (err: any) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: err.message || 'An unexpected error occurred during processing.' 
      }));
    }
  };

  const handleReset = () => {
    setState({
      article: '',
      isLoading: false,
      result: null,
      error: null,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-6xl mx-auto px-4 py-12 w-full">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Journalistic Neutralization Engine
          </h2>
          <p className="text-lg text-gray-600">
            Strip away sensationalism, emotional bias, and loaded language to reveal the objective reality behind the headlines.
          </p>
        </div>

        {!state.result && !state.isLoading && (
          <ArticleInput onAnalyze={handleAnalyze} isLoading={state.isLoading} />
        )}

        {state.isLoading && (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="relative mb-8">
              <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-brain text-slate-400 text-lg"></i>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Analyzing Linguistic Bias...</h3>
            <p className="text-gray-500 max-w-sm text-center">
              Our AI is performing entity recognition, sentiment scoring, and cross-referencing facts.
            </p>
          </div>
        )}

        {state.error && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 mb-8 flex items-start space-x-4">
            <div className="bg-rose-100 p-2 rounded-full text-rose-600">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <div>
              <h4 className="font-bold text-rose-900">Analysis Failed</h4>
              <p className="text-rose-700 text-sm mb-4">{state.error}</p>
              <button 
                onClick={handleReset}
                className="text-sm font-bold text-rose-800 hover:underline"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {state.result && !state.isLoading && (
          <>
            <div className="flex justify-between items-center mb-8">
              <button 
                onClick={handleReset}
                className="group flex items-center text-sm font-bold text-gray-500 hover:text-slate-900 transition-colors"
              >
                <i className="fas fa-arrow-left mr-2 transition-transform group-hover:-translate-x-1"></i>
                Start New Analysis
              </button>
              <div className="flex items-center space-x-2">
                 <button 
                  onClick={() => window.print()} 
                  className="p-2 text-gray-400 hover:text-slate-900"
                  title="Export to PDF"
                >
                  <i className="fas fa-file-pdf"></i>
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(state.result?.neutralSummary || '');
                    alert('Summary copied to clipboard!');
                  }}
                  className="p-2 text-gray-400 hover:text-slate-900"
                  title="Copy Summary"
                >
                  <i className="fas fa-copy"></i>
                </button>
              </div>
            </div>
            
            <AnalysisResults result={state.result} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
