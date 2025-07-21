
import React, { useState } from 'react';
import Auth from '@/components/Auth';
import Dashboard from '@/components/Dashboard';
import WelcomeModal from '@/components/WelcomeModal';
import { toast } from '@/hooks/use-toast';

interface User {
  name: string;
  email: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    setShowWelcomeModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setShowWelcomeModal(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      duration: 3000,
    });
  };

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

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
