import React, { useState, useEffect } from 'react';
import { View } from './types';
import { contentData } from './data/content';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import SuccessPrompt from './components/SuccessPrompt';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [view, setView] = useState<View>({ type: 'home' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleLogin = () => {
    setIsLoginModalOpen(false);
    setShowSuccess(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setShowSuccess(false);
    }, 2000); // 2-second delay for the success message
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const renderContent = () => {
    switch (view.type) {
      case 'home':
        return <HomePage setView={setView} />;
      case 'list':
        const itemsForCategory = contentData.filter(item => item.category === view.category);
        return <ListPage category={view.category} items={itemsForCategory} setView={setView} />;
      case 'detail':
        const item = contentData.find(item => item.id === view.contentId);
        if (item) {
          return <DetailPage item={item} setView={setView} />;
        }
        // Fallback to home if item not found
        setView({ type: 'home' });
        return null;
      default:
        return <HomePage setView={setView} />;
    }
  };

  if (showSuccess) {
    return <SuccessPrompt />;
  }

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen font-sans">
      <Navbar 
        setView={setView}
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />
      <main>
        {renderContent()}
      </main>
      <Chatbot />
      <Footer />
      {isLoginModalOpen && (
        <LoginModal 
          onLogin={handleLogin} 
          onClose={() => setIsLoginModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;
