📘 Silent Newsroom
📰 Objective News Processor – AI-Powered NLP Pipeline

Silent Newsroom is an AI-driven web application that transforms emotional or biased news articles into neutral, fact-based structured reports. The system integrates real-time RSS feeds and Google Gemini AI to promote algorithmic objectivity in news analysis.

🚀 Project Overview

Modern news articles often contain emotional framing and subjective language that may influence reader perception. Silent Newsroom addresses this by:

Detecting emotional tone (Sentiment Analysis)

Identifying subjective/bias words

Neutralizing emotionally charged language

Extracting key factual entities

Generating structured, fact-based summaries

The goal is to promote transparency and objective reporting using AI-powered Natural Language Processing.

🧠 Core Features
✅ RSS Feed Integration

Fetches real-time headlines from sources like BBC.

Dynamically imports latest news articles.

✅ Sentiment Analysis

Calculates sentiment score (Positive / Negative / Neutral).

Detects overall tone of the article.

✅ Emotional Bias Detection

Identifies subjective and emotionally loaded words.

Highlights removed/replaced bias terms.

✅ Neutralized Article Content

Rewrites original article with reduced emotional framing.

✅ Neutral Structured Summary

Generates factual summary without expressive language.

Presents content in a clear, objective format.

✅ Named Entity Recognition (NER)

Extracts:

Person names

Dates

Organizations

Numerical values

Displays key facts separately.

🛠 Tech Stack
Frontend

React (with TypeScript)

Vite

CSS / Modern UI Components

Backend

Node.js

Express

RSS Parser

AI & NLP

Google Gemini API (@google/genai)

Custom Prompt Engineering

Sentiment & Bias Processing Logic

🏗 System Architecture
RSS Feed
↓
Article Fetching
↓
Gemini AI Processing
↓
Sentiment Analysis
↓
Bias Detection
↓
NER Extraction
↓
Structured Neutral Summary
