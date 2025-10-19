import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ArrowLeft, Copy, Loader2, CheckCircle, AlertCircle, ShieldCheck, CreditCard, CheckCircle2 } from 'lucide-react'; // Added ShieldCheck, CreditCard, CheckCircle2 from original
import { toast } from '@/hooks/use-toast';

interface BuyFaircodeModalProps {
  onBack: () => void;
  user: { name: string; email: string };
}

const BuyFaircodeModal: React.FC<BuyFaircodeModalProps> = ({ onBack, user }) => {
  const [step, setStep] = useState<'form' | 'loading' | 'payment' | 'confirm' | 'declined'>('form');
  const [fullName, setFullName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [showTransferNotice, setShowTransferNotice] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false); // Added from original

  const handlePayWithPaystack = () => { // Added from original
    setIsRedirecting(true);
    toast({
      title: "Redirecting to Paystack",
      description: "You'll be redirected to our secure payment page...",
      duration: 2000,
    });
    
    // Redirect to Paystack payment page
    setTimeout(() => {
      window.open('https://paystack.shop/pay/fairpay', '_blank');
      setIsRedirecting(false);
    }, 1500);
  };

  const handleProceedToPayment = () => {
    if (!fullName || !email) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        duration: 3000,
      });
      return;
    }

    handlePayWithPaystack();
  };

  const handleContinuePayment = () => {
    setShowTransferNotice(false);
  };

  const handlePaymentConfirm = () => {
    setStep('confirm');
    // The original code simulates a confirmation and then a decline.
    // We'll keep this behavior for 'confirm' step.
    setTimeout(() => {
      setStep('declined');
    }, 10000);
  };

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText('6957666738');
    toast({
      title: "Copied!",
      description: "Account number copied to clipboard",
      duration: 2000,
    });
  };

  if (step === 'form') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-green-800 rounded-full transition-colors"
              data-testid="button-back"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-white">Buy FairCode</h1>
              <p className="text-xs text-green-100">Secure your ownership today</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
          {/* What is FairCode Section */}
          <Card className="border-0 card-shadow overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">What is FairCode?</h3>
                  <p className="text-xs text-green-100">Your key to fund distributions</p>
                </div>
              </div>
              <p className="text-sm text-green-50 leading-relaxed">
                FairCode is your unique identifier that entitles you to receive distributed recovered funds from our agency partnerships. Own it once, benefit forever.
              </p>
            </div>
          </Card>

          {/* Benefits */}
          <Card className="border-0 card-shadow">
            <CardHeader>
              <CardTitle className="text-lg">FairCode Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Lifetime Access</p>
                  <p className="text-sm text-gray-600">Receive all future fund distributions</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Bonus Eligibility</p>
                  <p className="text-sm text-gray-600">Access to exclusive bonuses and rewards</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Priority Support</p>
                  <p className="text-sm text-gray-600">Dedicated customer service for FairCode owners</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Transferable Ownership</p>
                  <p className="text-sm text-gray-600">Your FairCode belongs to you permanently</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Card */}
          <Card className="border-0 card-shadow overflow-hidden">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white text-center">
              <div className="mb-3">
                <div className="text-sm text-gray-400 mb-1">One-time payment</div>
                <div className="text-5xl font-bold">₦8,200</div>
                <div className="text-sm text-gray-400 mt-1">Lifetime ownership</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <p className="text-xs text-green-300 font-medium">
                  ✓ Includes first month fund distribution
                </p>
              </div>
            </div>
          </Card>

          {/* Payment Button */}
          <Card className="border-0 card-shadow">
            <CardHeader className="bg-green-100">
              <CardTitle className="text-green-800 text-center">
                <CreditCard className="w-8 h-8 mx-auto mb-2" />
                Faircode Purchase
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">₦6,800</div>
                <p className="text-gray-600">One-time purchase</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="h-12 border-green-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="h-12 border-green-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <Button
                onClick={handleProceedToPayment}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg"
              >
                Proceed to Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  

  return null;
};

export default BuyFaircodeModal;