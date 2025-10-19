
import React, { useState, useEffect } from 'react';
import Auth from '@/components/Auth';
import Dashboard from '@/components/Dashboard';
import LandingPage from '@/components/LandingPage';
import WelcomeModal from '@/components/WelcomeModal';
import { toast } from '@/hooks/use-toast';

interface User {
  name: string;
  email: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    const hasVisited = localStorage.getItem('hasVisitedLanding');
    
    if (currentUser) {
      setUser(JSON.parse(currentUser));
      setShowLanding(false);
    } else if (hasVisited) {
      setShowLanding(false);
    }
  }, []);

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    setShowWelcomeModal(true);
    setShowLanding(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setShowWelcomeModal(false);
    setShowLanding(true);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      duration: 3000,
    });
  };

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  const handleGetStarted = () => {
    localStorage.setItem('hasVisitedLanding', 'true');
    setShowLanding(false);
  };

  if (showLanding && !user) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (!user) {
    return <Auth onLogin={handleAuthSuccess} />;
  }

  return (
    <>
      <Dashboard 
        user={user} 
        onAddMoney={() => {}} 
        onLogout={handleLogout}
      />
      <WelcomeModal 
        isOpen={showWelcomeModal}
        onClose={handleCloseWelcomeModal}
        userName={user.name}
      />
    </>
  );
};

export default Index;
