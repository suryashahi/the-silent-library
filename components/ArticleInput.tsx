import React, { useState } from 'react';
import { RSS_SOURCES, fetchLatestArticle } from '../services/rssService';

interface ArticleInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

const ArticleInput: React.FC<ArticleInputProps> = ({ onAnalyze, isLoading }) => {
  const [text, setText] = useState('');
  const [selectedSource, setSelectedSource] = useState(RSS_SOURCES[0].url);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const isTooShort = wordCount < 50; 

  const handleSubmit = () => {
    if (text.trim()) {
      onAnalyze(text);
    }
  };

  const handleFetch = async () => {
    setIsFetching(true);
    setFetchError(null);
    try {
      const article = await fetchLatestArticle(selectedSource);
      // Some RSS content is very short (just a snippet), so we might want to warn the user
      // but we'll fill it in anyway.
      setText(`${article.title}\n\n${article.content}`);
    } catch (err: any) {
      setFetchError(err.message || "Failed to fetch article");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-end gap-4">
        <div className="flex-grow">
          <label htmlFor="rss-source" className="block text-sm font-semibold text-gray-700 mb-2">
            Import from RSS Feed
          </label>
          <select
            id="rss-source"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition duration-200"
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            disabled={isFetching || isLoading}
          >
            {RSS_SOURCES.map((source) => (
              <option key={source.url} value={source.url}>
                {source.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleFetch}
          disabled={isFetching || isLoading}
          className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-lg transition duration-200 flex items-center justify-center space-x-2 border border-slate-200"
        >
          {isFetching ? (
            <>
              <i className="fas fa-sync fa-spin"></i>
              <span>Fetching...</span>
            </>
          ) : (
            <>
              <i className="fas fa-rss"></i>
              <span>Fetch Latest</span>
            </>
          )}
        </button>
      </div>

      {fetchError && (
        <div className="mb-4 p-3 bg-rose-50 text-rose-600 text-sm rounded-lg border border-rose-100 flex items-center">
          <i className="fas fa-exclamation-circle mr-2"></i>
          {fetchError}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="article" className="block text-sm font-semibold text-gray-700 mb-2">
          Article Content
        </label>
        <textarea
          id="article"
          rows={10}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition duration-200 resize-none"
          placeholder="Paste your news article here or fetch from RSS above..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <span className={`font-medium ${wordCount < 200 ? 'text-amber-500' : 'text-emerald-500'}`}>
            <i className="fas fa-file-alt mr-2"></i>
            {wordCount} Words
          </span>
          {wordCount < 200 && (
            <span className="text-xs italic">
              Longer articles provide better context for analysis.
            </span>
          )}
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={isLoading || !text.trim()}
          className={`
            px-8 py-3 rounded-lg font-bold text-white transition duration-200 flex items-center justify-center space-x-2
            ${isLoading || !text.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-800 active:scale-95 shadow-md'}
          `}
        >
          {isLoading ? (
            <>
              <i className="fas fa-circle-notch fa-spin"></i>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <i className="fas fa-bolt"></i>
              <span>Analyze & Neutralize</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ArticleInput;
