import React from 'react';
import { AnalysisResult, Entity } from '../types';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result }) => {
  const getSentimentColor = (label: string) => {
    switch (label.toLowerCase()) {
      case 'positive': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'negative': return 'text-rose-600 bg-rose-50 border-rose-100';
      default: return 'text-amber-600 bg-amber-50 border-amber-100';
    }
  };

  const getEntityIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'person': return <i className="fas fa-user text-blue-500"></i>;
      case 'location': return <i className="fas fa-map-marker-alt text-red-500"></i>;
      case 'organization': return <i className="fas fa-building text-indigo-500"></i>;
      case 'date': return <i className="fas fa-calendar-alt text-amber-500"></i>;
      case 'number': return <i className="fas fa-hashtag text-emerald-500"></i>;
      default: return <i className="fas fa-info-circle text-gray-500"></i>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sentiment Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Sentiment Analysis</h3>
          <div className={`inline-flex items-center px-3 py-1 rounded-full border text-sm font-bold mb-3 ${getSentimentColor(result.sentiment.label)}`}>
            {result.sentiment.label}
          </div>
          <div className="mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-gray-500 uppercase">Score Index</span>
              <span className="text-xs font-bold text-gray-900">{result.sentiment.score.toFixed(2)}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${result.sentiment.score > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                style={{ width: `${Math.abs(result.sentiment.score) * 100}%`, marginLeft: result.sentiment.score < 0 ? 'auto' : '0' }}
              />
            </div>
          </div>
          <p className="text-sm text-gray-600 italic">"{result.sentiment.explanation}"</p>
        </div>

        {/* Removed Bias Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:col-span-2">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Detected Emotional Bias</h3>
          {result.removedBiasedWords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {result.removedBiasedWords.map((word, i) => (
                <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium border border-slate-200 line-through decoration-rose-400 decoration-2">
                  {word}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No significant emotional loaded language detected.</p>
          )}
          <p className="mt-4 text-xs text-gray-400">These words were removed or replaced in the neutralized version below to minimize subjective emotional influence.</p>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-slate-900 text-white rounded-xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-widest">Neutral Structured Summary</h3>
          <span className="bg-slate-800 text-[10px] px-2 py-1 rounded font-mono text-slate-400">ALGORITHM: BART-VEO-HYBRID</span>
        </div>
        <div className="p-8">
          <p className="text-lg leading-relaxed text-slate-300 first-letter:text-4xl first-letter:font-bold first-letter:mr-2 first-letter:float-left">
            {result.neutralSummary}
          </p>
        </div>
      </div>

      {/* Cleaned Article & Entities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Neutralized Article Content</h3>
          <div className="prose prose-slate max-w-none text-gray-700 text-sm leading-relaxed max-h-[400px] overflow-y-auto pr-4">
            {result.cleanedArticle.split('\n').map((para, i) => (
              <p key={i} className="mb-4">{para}</p>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Extracted Key Facts (NER)</h3>
          <div className="space-y-4">
            {result.entities.length > 0 ? (
              result.entities.map((entity, i) => (
                <div key={i} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm mr-3">
                    {getEntityIcon(entity.type)}
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{entity.type}</span>
                    <span className="text-sm font-semibold text-gray-800">{entity.value}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No significant entities identified.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
