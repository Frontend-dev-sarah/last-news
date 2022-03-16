import React from 'react';
import Navigation from './src/navigation';
import { NewsProvider } from './src/services/NewsContext';
import { ReadProvider } from './src/services/ReadListContext';

export default function App() {
  return (
    <NewsProvider>
      <ReadProvider>
        <Navigation />
      </ReadProvider>
    </NewsProvider>
  );
}