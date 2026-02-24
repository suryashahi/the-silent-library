import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-slate-900 p-2 rounded-lg">
            <i className="fas fa-newspaper text-white text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Silent Newsroom</h1>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Objective News Processor</p>
          </div>
        </div>
        <div className="hidden md:block">
          <span className="text-sm text-gray-400 font-medium">
            AI-Powered NLP Pipeline
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
