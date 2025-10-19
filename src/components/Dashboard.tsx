import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Eye, 
  EyeOff,
  History, 
  Users, 
  Building, 
  TrendingUp, 
  Smartphone, 
  Wifi, 
  Target, 
  Tv, 
  UserPlus, 
  MoreHorizontal,
  Headphones,
  Maximize,
  Bell,
  Gift,
  Loader2,
  ShieldCheck,
  MessageCircle,
  Mail,
  Bot,
  User,
  Info,
  Download,
  Play,
  CreditCard,
  QrCode,
  Send,
  Wallet,
  Settings // Added for Admin Dashboard
} from 'lucide-react';
import AddMoneyModal from '@/components/AddMoneyModal';
import TransactionHistory from '@/components/TransactionHistory';
import JoinGroupPage from '@/components/JoinGroupPage';
import SupportPage from '@/components/SupportPage';
import LiveChat from '@/components/LiveChat';
import ProfileMenu from '@/components/ProfileMenu';
import InviteEarn from '@/components/InviteEarn';
import TVRechargePage from '@/components/TVRechargePage';
import BettingPage from '@/components/BettingPage';
import AboutPage from '@/components/AboutPage';
import ProfileInfoPage from '@/components/ProfileInfoPage';
import AirtimePage from '@/components/AirtimePage';
import DataPage from '@/components/DataPage';
import LoanPage from '@/components/LoanPage';
import WithdrawalPage from '@/components/WithdrawalPage';
import BuyFaircodeModal from '@/components/BuyFaircodeModal';
import WhatsAppInviteModal from '@/components/WhatsAppInviteModal';
import WithdrawalNotifications from '@/components/WithdrawalNotifications';
import QRScanner from '@/components/QRScanner';
import AdminDashboard from './AdminDashboard'; // Import AdminDashboard

interface User {
  name: string;
  email: string;
}

interface DashboardProps {
  user: User;
  onAddMoney: () => void;
  onLogout?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onAddMoney, onLogout }) => {
  const [balance, setBalance] = useState(0.00);
  const [showBalance, setShowBalance] = useState(true);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [showJoinGroup, setShowJoinGroup] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showInviteEarn, setShowInviteEarn] = useState(false);
  const [showTVRecharge, setShowTVRecharge] = useState(false);
  const [showBetting, setShowBetting] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [showAirtime, setShowAirtime] = useState(false);
  const [showData, setShowData] = useState(false);
  const [showLoan, setShowLoan] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [showBuyFaircode, setShowBuyFaircode] = useState(false);
  const [showWhatsAppInvite, setShowWhatsAppInvite] = useState(false);
  const [hasReturnedFromSubPage, setHasReturnedFromSubPage] = useState(false);
  const [showNotifications, setShowNotifications] = useState(true);
  const [notificationKey, setNotificationKey] = useState(0);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false); // State for admin dashboard

  // Check if user is admin (in production, verify this from backend)
  const isAdmin = user.email === 'admin@fairmoniepay.com' || user.email === 'fairmoniepay@gmail.com';

  // Get first name from user.name
  const firstName = user.name.split(' ')[0];

  // Promotional banners - Updated with new images
  const promoImages = [
    '/lovable-uploads/02ef7951-86d6-41f2-9741-99e91f4e5d95.png',
    '/lovable-uploads/a55e6b57-2776-41a6-8c33-c2a3a419fbe2.png',
    '/lovable-uploads/b28d4378-fba2-4204-ad40-3241cfb0f79d.png',
    '/lovable-uploads/1ff28574-03c0-4097-a1f7-ca4d6fd6ddea.png',
    '/lovable-uploads/1a0dfae0-5d6c-4c61-9895-7d179a6596ef.png',
    '/lovable-uploads/1f7c7b19-5489-4cb8-a681-df0a31422bad.png',
    '/lovable-uploads/af5add22-7daa-42ca-a917-9709af91e502.png'
  ];

  // Load balance and transactions from localStorage on component mount
  useEffect(() => {
    const savedBalance = localStorage.getItem(`userBalance_${user.email}`);
    if (savedBalance) {
      setBalance(parseFloat(savedBalance));
    }

    const savedTransactions = localStorage.getItem(`userTransactions_${user.email}`);
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }

    // Check for pending referral bonuses
    checkForReferralBonuses();

    // Show WhatsApp invite modal after 8 seconds of dashboard load
    const inviteTimer = setTimeout(() => {
      setShowWhatsAppInvite(true);
    }, 8000);

    return () => clearTimeout(inviteTimer);
  }, [user.email]);

  // Function to check and credit referral bonuses
  const checkForReferralBonuses = () => {
    const userReferralCode = localStorage.getItem(`userReferralCode_${user.email}`);
    if (!userReferralCode) return;

    const pendingKey = `pendingReferrals_${userReferralCode}`;
    const pendingReferrals = localStorage.getItem(pendingKey);

    if (pendingReferrals) {
      const newReferrals = parseInt(pendingReferrals);
      const bonusAmount = newReferrals * 6500;

      // Credit the balance
      setBalance(prevBalance => prevBalance + bonusAmount);

      // Add transaction record
      const newTransaction = {
        id: Date.now(),
        type: 'credit',
        amount: bonusAmount,
        description: `Referral bonus (${newReferrals} referral${newReferrals > 1 ? 's' : ''})`,
        date: new Date().toISOString()
      };
      setTransactions(prev => [newTransaction, ...prev]);

      // Update referral data
      const savedReferralData = localStorage.getItem(`referralData_${user.email}`);
      const referralData = savedReferralData ? JSON.parse(savedReferralData) : { totalReferrals: 0, totalEarnings: 0 };
      referralData.totalReferrals += newReferrals;
      referralData.totalEarnings += bonusAmount;
      localStorage.setItem(`referralData_${user.email}`, JSON.stringify(referralData));

      // Clear pending referrals
      localStorage.removeItem(pendingKey);
    }
  };

  // Save balance to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`userBalance_${user.email}`, balance.toString());
  }, [balance, user.email]);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`userTransactions_${user.email}`, JSON.stringify(transactions));
  }, [transactions, user.email]);

  // Auto-scroll carousel
  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      if (api) {
        const nextIndex = (api.selectedScrollSnap() + 1) % promoImages.length;
        api.scrollTo(nextIndex);
      }
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [api, promoImages.length]);

  // Handle back navigation to prevent app exit
  useEffect(() => {
    const handleBackButton = (event: PopStateEvent) => {
      const isOnSubPage = showTransactionHistory || showJoinGroup || showSupport || 
                         showLiveChat || showProfileMenu || showInviteEarn || 
                         showTVRecharge || showBetting || showAbout || showProfileInfo || 
                         showAirtime || showData || showLoan || showWithdrawal || showAdminDashboard; // Include admin dashboard

      if (isOnSubPage) {
        event.preventDefault();

        setShowTransactionHistory(false);
        setShowJoinGroup(false);
        setShowSupport(false);
        setShowLiveChat(false);
        setShowProfileMenu(false);
        setShowInviteEarn(false);
        setShowTVRecharge(false);
        setShowBetting(false);
        setShowAbout(false);
        setShowProfileInfo(false);
        setShowAirtime(false);
        setShowData(false);
        setShowLoan(false);
        setShowWithdrawal(false);
        setShowAdminDashboard(false); // Reset admin dashboard state

        setHasReturnedFromSubPage(true);
        window.history.pushState(null, '', window.location.href);

        // Don't restart notifications when returning to dashboard - let them continue
        setShowNotifications(true);
      }
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handleBackButton);

    return () => window.removeEventListener('popstate', handleBackButton);
  }, [showTransactionHistory, showJoinGroup, showSupport, showLiveChat, 
      showProfileMenu, showInviteEarn, showTVRecharge, showBetting, 
      showAbout, showProfileInfo, showAirtime, showData, showLoan, showWithdrawal, showAdminDashboard]); // Add admin dashboard to dependency array

  const quickActions = [
    // Removed alternative payment methods, Paystack integrated implicitly
    { title: 'Send', icon: Send, color: 'bg-white text-gray-700', onClick: () => setShowWithdrawal(true) },
    { title: 'Request', icon: Wallet, color: 'bg-white text-gray-700', onClick: () => setShowAddMoneyModal(true) }, // Assuming this triggers Paystack for deposit
    { title: 'Scan', icon: QrCode, color: 'bg-white text-gray-700', onClick: () => setShowQRScanner(true) },
    { title: 'More', icon: MoreHorizontal, color: 'bg-white text-gray-700', onClick: () => setShowProfileMenu(true) }
  ];

  const NairaIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 4h2v2h3V4h2v2h2v2h-2v4h2v2h-2v2h2v2h-2v2h2v-2H9v2H7v-2H5v-2h2v-2H5v-2h2V8H5V6h2V4zm2 4v4h3V8H9z"/>
    </svg>
  );

  const services = [
    { title: 'Airtime', icon: Smartphone, color: 'bg-green-100 text-green-600', onClick: () => setShowAirtime(true) },
    { title: 'Data', icon: Wifi, color: 'bg-green-100 text-green-600', onClick: () => setShowData(true) },
    { title: 'Betting', icon: Target, color: 'bg-green-100 text-green-600', onClick: () => setShowBetting(true) },
    { title: 'TV', icon: Tv, color: 'bg-green-100 text-green-600', onClick: () => setShowTVRecharge(true) },
    { title: 'Buy Faircode', icon: CreditCard, color: 'bg-green-100 text-green-600', onClick: () => setShowBuyFaircode(true) },
    { title: 'Loan', icon: NairaIcon, color: 'bg-green-100 text-green-600', onClick: () => setShowLoan(true) },
    { title: 'Invitation', icon: UserPlus, color: 'bg-green-100 text-green-600', onClick: () => setShowInviteEarn(true) },
    { title: 'More', icon: MoreHorizontal, color: 'bg-green-100 text-green-600', onClick: () => setShowProfileMenu(true) }
  ];

  const handleAddMoneyClick = () => {
    setShowAddMoneyModal(true);
  };

  const handleBonusClaimed = (amount: number) => {
    setBalance(prevBalance => prevBalance + amount);

    const newTransaction = {
      id: Date.now(),
      type: 'credit',
      amount: amount,
      description: 'Bonus claimed',
      date: new Date().toISOString()
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleWithdrawal = (amount: number) => {
    setBalance(prevBalance => prevBalance - amount);

    const newTransaction = {
      id: Date.now(),
      type: 'debit',
      amount: amount,
      description: 'Withdrawal',
      date: new Date().toISOString()
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleUpdateBalance = (amount: number) => {
    setBalance(prevBalance => prevBalance + amount);

    const newTransaction = {
      id: Date.now(),
      type: 'credit',
      amount: amount,
      description: 'Referral bonus',
      date: new Date().toISOString()
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleServiceClick = (service: any) => {
    if (service.onClick) {
      service.onClick();
    }
  };

  const handleQuickActionClick = (action: any) => {
    if (action.onClick) {
      action.onClick();
    }
  };

  const handleTransactionHistoryClick = () => {
    setShowTransactionHistory(true);
  };

  // Conditionally render pages
  if (showAdminDashboard) {
    return <AdminDashboard onBack={() => setShowAdminDashboard(false)} user={user} />;
  }

  if (showTransactionHistory) {
    return <TransactionHistory onBack={() => setShowTransactionHistory(false)} transactions={transactions} />;
  }

  if (showWithdrawal) {
    return <WithdrawalPage onBack={() => setShowWithdrawal(false)} balance={balance} onWithdraw={handleWithdrawal} />;
  }

  if (showBuyFaircode) {
    return <BuyFaircodeModal onBack={() => setShowBuyFaircode(false)} user={user} />;
  }

  if (showJoinGroup) {
    return <JoinGroupPage onBack={() => setShowJoinGroup(false)} />;
  }

  if (showSupport) {
    return (
      <SupportPage 
        onBack={() => setShowSupport(false)} 
        onLiveChat={() => {
          setShowSupport(false);
          setShowLiveChat(true);
        }} 
      />
    );
  }

  if (showLiveChat) {
    return (
      <LiveChat 
        onBack={() => setShowLiveChat(false)} 
        user={user} 
        balance={balance}
        transactions={transactions}
      />
    );
  }

  if (showProfileMenu) {
    return (
      <ProfileMenu 
        onBack={() => setShowProfileMenu(false)} 
        user={user}
        onLogout={onLogout}
        onProfileInfo={() => {
          setShowProfileMenu(false);
          setShowProfileInfo(true);
        }}
        onAbout={() => {
          setShowProfileMenu(false);
          setShowAbout(true);
        }}
      />
    );
  }

  if (showAbout) {
    return <AboutPage onBack={() => setShowAbout(false)} />;
  }

  if (showProfileInfo) {
    return <ProfileInfoPage onBack={() => setShowProfileInfo(false)} user={user} />;
  }

  if (showInviteEarn) {
    return <InviteEarn onBack={() => setShowInviteEarn(false)} user={user} onUpdateBalance={handleUpdateBalance} />;
  }

  if (showTVRecharge) {
    return <TVRechargePage onBack={() => setShowTVRecharge(false)} />;
  }

  if (showBetting) {
    return <BettingPage onBack={() => setShowBetting(false)} />;
  }

  if (showAirtime) {
    return <AirtimePage onBack={() => setShowAirtime(false)} />;
  }

  if (showData) {
    return <DataPage onBack={() => setShowData(false)} />;
  }

  if (showLoan) {
    return <LoanPage onBack={() => setShowLoan(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/20 to-gray-50">
      {/* Withdrawal Notifications - always visible and continuous */}
      <WithdrawalNotifications isVisible={true} />

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-4 card-shadow sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12 ring-2 ring-green-100">
              <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white font-bold text-lg">
                {firstName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="text-lg font-semibold text-gray-900 block">Hi, {firstName}</span>
              <span className="text-xs text-gray-500">Welcome back!</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Admin Dashboard Button */}
            {isAdmin && (
              <button
                onClick={() => setShowAdminDashboard(true)}
                className="p-2.5 hover:bg-green-50 rounded-full transition-all"
                title="Admin Dashboard"
              >
                <Settings className="w-5 h-5 text-green-600" />
              </button>
            )}
            <button 
              onClick={() => setShowLiveChat(true)}
              className="p-2.5 hover:bg-green-50 rounded-full transition-all hover-lift animate-bounce"
              data-testid="button-live-chat"
            >
              <Headphones className="w-5 h-5 text-green-600" />
            </button>
            <button className="p-2.5 hover:bg-gray-100 rounded-full transition-all">
              <Maximize className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleTransactionHistoryClick}
              className="p-2.5 hover:bg-gray-100 rounded-full transition-all relative"
              data-testid="button-notifications"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {transactions.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                  {transactions.length > 9 ? '9+' : transactions.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4 max-w-lg mx-auto">
        {/* Balance Card - Mobile First Design */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white border-0 card-shadow-lg animate-slideUp overflow-hidden relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/20 rounded-full blur-3xl"></div>
          <CardContent className="p-5 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-300">Balance</span>
              </div>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1.5 hover:bg-white/10 rounded-full transition-all"
                data-testid="button-toggle-balance"
              >
                {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>

            <div className="mb-5">
              <div className="text-3xl font-bold tracking-tight mb-1">
                {showBalance ? `₦${balance.toLocaleString()}.00` : '₦••••••'}
              </div>
              <div className="text-xs text-gray-400">Available balance</div>
            </div>

            {/* Quick Actions - Inline */}
            <div className="grid grid-cols-4 gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickActionClick(action)}
                  className="flex flex-col items-center justify-center p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all hover-lift backdrop-blur-sm"
                  data-testid={`action-${action.title.toLowerCase()}`}
                >
                  <action.icon className="w-5 h-5 mb-1.5" />
                  <span className="text-xs font-medium">{action.title}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">Recent Transactions</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleTransactionHistoryClick}
              className="text-green-600 hover:text-green-700 hover:bg-green-50 text-sm"
              data-testid="button-view-all-transactions"
            >
              View All
            </Button>
          </div>

          {transactions.length > 0 ? (
            <div className="space-y-2">
              {transactions.slice(0, 3).map((transaction, index) => (
                <Card key={transaction.id} className="border-0 card-shadow hover-lift transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.type === 'credit' ? (
                            <ArrowDownLeft className="w-5 h-5 text-green-600" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(transaction.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className={`text-sm font-semibold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-0 card-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <History className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">No transactions yet</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Services Grid - Card Based */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-gray-900">Services</h3>
          <div className="grid grid-cols-2 gap-3">
            {services.slice(0, 6).map((service, index) => (
              <Card 
                key={index}
                onClick={() => handleServiceClick(service)}
                className={`border-0 card-shadow hover-lift cursor-pointer transition-all overflow-hidden ${
                  index % 3 === 0 ? 'bg-gradient-to-br from-green-500 to-green-600 text-white' :
                  index % 3 === 1 ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' :
                  'bg-gradient-to-br from-orange-500 to-orange-600 text-white'
                }`}
                data-testid={`service-${service.title.toLowerCase()}`}
              >
                <CardContent className="p-4 relative">
                  <div className="absolute -right-2 -bottom-2 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="relative z-10">
                    <service.icon className="w-8 h-8 mb-2" />
                    <p className="text-sm font-semibold">{service.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Claim Bonus Button */}
        <Card className="border-0 bg-gradient-to-r from-green-500 to-green-600 text-white card-shadow-lg overflow-hidden relative cursor-pointer hover-lift" onClick={handleAddMoneyClick}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <CardContent className="p-5 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">Claim Your Bonus</p>
                  <p className="text-xs text-white/80">Get rewarded today</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <AddMoneyModal 
        isOpen={showAddMoneyModal} 
        onClose={() => setShowAddMoneyModal(false)}
        onBonusClaimed={handleBonusClaimed}
      />

      <WhatsAppInviteModal
        isOpen={showWhatsAppInvite}
        onClose={() => setShowWhatsAppInvite(false)}
        user={user}
      />

      {/* QR Scanner */}
      {showQRScanner && (
        <QRScanner
          onClose={() => setShowQRScanner(false)}
          onScanSuccess={(data) => {
            console.log('Scanned data:', data);
            // Handle scanned data here
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;