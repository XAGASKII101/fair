import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, CheckCircle, Calendar, Gift, Lock, TrendingUp } from 'lucide-react';

interface AddMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBonusClaimed: (amount: number) => void;
}

interface MonthlyBonus {
  month: string;
  amount: number;
  claimed: boolean;
  available: boolean;
}

const AddMoneyModal: React.FC<AddMoneyModalProps> = ({ isOpen, onClose, onBonusClaimed }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [claimedAmount, setClaimedAmount] = useState(0);
  const [monthlyBonuses, setMonthlyBonuses] = useState<MonthlyBonus[]>([]);

  useEffect(() => {
    // Generate monthly bonuses with random amounts
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const currentMonth = new Date().getMonth();
    const savedBonuses = localStorage.getItem('monthlyBonuses');
    
    if (savedBonuses) {
      setMonthlyBonuses(JSON.parse(savedBonuses));
    } else {
      const bonuses = months.map((month, index) => ({
        month,
        amount: Math.floor(Math.random() * (500000 - 150000 + 1)) + 150000, // Random amount between 150k and 500k
        claimed: false,
        available: index <= currentMonth
      }));
      
      setMonthlyBonuses(bonuses);
      localStorage.setItem('monthlyBonuses', JSON.stringify(bonuses));
    }
  }, [isOpen]);

  const playSuccessSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const playTone = (frequency: number, startTime: number, duration: number) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, startTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      };
      
      const now = audioContext.currentTime;
      playTone(523.25, now, 0.2);
      playTone(659.25, now + 0.15, 0.2);
      playTone(783.99, now + 0.3, 0.3);
    } catch (error) {
      console.log('Audio not available');
    }
  };

  const handleClaimBonus = async (monthIndex: number) => {
    const bonus = monthlyBonuses[monthIndex];
    if (!bonus.available || bonus.claimed) return;

    setIsLoading(true);
    
    // Simulate claiming process
    setTimeout(() => {
      const updatedBonuses = [...monthlyBonuses];
      updatedBonuses[monthIndex].claimed = true;
      setMonthlyBonuses(updatedBonuses);
      localStorage.setItem('monthlyBonuses', JSON.stringify(updatedBonuses));
      
      setClaimedAmount(bonus.amount);
      onBonusClaimed(bonus.amount);
      
      setIsLoading(false);
      setShowSuccess(true);
      playSuccessSound();
    }, 2000);
  };

  const handleClose = () => {
    setIsLoading(false);
    setShowSuccess(false);
    onClose();
  };

  const handleSuccessOk = () => {
    setShowSuccess(false);
    onClose();
  };

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md mx-auto rounded-2xl border-0 p-0 overflow-hidden bg-white">
          <div className="p-6 text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bonus Claimed!</h3>
              <p className="text-gray-600">
                Successfully claimed ₦{claimedAmount.toLocaleString()} bonus
              </p>
            </div>
            <Button
              onClick={handleSuccessOk}
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-full"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl mx-auto rounded-2xl border-0 p-0 overflow-hidden bg-white max-h-[90vh]">
        <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-600 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white flex items-center justify-center gap-2">
              <Calendar className="w-6 h-6" />
              Monthly Bonuses
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-green-100 mt-2">Claim your bonus each month!</p>
        </div>
        
        <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
          {isLoading ? (
            <div className="text-center space-y-4 py-8">
              <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto" />
              <p className="text-gray-700 font-medium">Claiming bonus...</p>
            </div>
          ) : (
            <>
              <div className="grid gap-3">
                {monthlyBonuses.map((bonus, index) => (
                  <Card 
                    key={index}
                    className={`border-0 overflow-hidden transition-all ${
                      bonus.claimed 
                        ? 'bg-gray-100' 
                        : bonus.available 
                          ? 'bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg' 
                          : 'bg-gray-50'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            bonus.claimed 
                              ? 'bg-green-200' 
                              : bonus.available 
                                ? 'bg-green-600' 
                                : 'bg-gray-300'
                          }`}>
                            {bonus.claimed ? (
                              <CheckCircle className="w-6 h-6 text-green-700" />
                            ) : bonus.available ? (
                              <Gift className="w-6 h-6 text-white" />
                            ) : (
                              <Lock className="w-6 h-6 text-gray-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{bonus.month}</p>
                            <p className="text-2xl font-bold text-green-600">
                              ₦{bonus.amount.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleClaimBonus(index)}
                          disabled={!bonus.available || bonus.claimed}
                          className={`${
                            bonus.claimed
                              ? 'bg-gray-300 text-gray-600'
                              : bonus.available
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : 'bg-gray-300 text-gray-500'
                          } rounded-full px-6`}
                        >
                          {bonus.claimed ? 'Claimed' : bonus.available ? 'Claim' : 'Locked'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900">How it works</p>
                    <p className="text-xs text-blue-700 mt-1">
                      Claim your bonus for each available month. Bonuses unlock monthly and amounts vary. 
                      Come back each month to claim your new bonus!
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMoneyModal;
