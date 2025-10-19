import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, ShieldCheck, CheckCircle2, CreditCard } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BuyFaircodeModalProps {
  onBack: () => void;
  user: { name: string; email: string };
}

const BuyFaircodeModal: React.FC<BuyFaircodeModalProps> = ({ onBack, user }) => {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handlePayWithPaystack = () => {
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

  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <Card className="w-full max-w-sm border-green-200">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">Processing...</h3>
            <p className="text-green-600">Preparing payment account details</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <>
        <div className="min-h-screen bg-green-50">
          {/* Header */}
          <div className="bg-green-600 px-4 py-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setStep('form')}
                className="p-2 hover:bg-green-700 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <h1 className="text-xl font-semibold text-white">Make Payment</h1>
            </div>
          </div>

          <div className="px-4 py-6 flex items-center justify-center">
            <Card className="w-full max-w-sm border-green-200 shadow-lg">
              <CardContent className="p-4 space-y-3">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                      <div className="w-3 h-1 bg-white rounded"></div>
                    </div>
                  </div>
                  
                  <h2 className="text-lg font-semibold text-green-800 mb-2">Make Payment</h2>
                  <p className="text-green-600 text-sm mb-4">Transfer to the account below</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                    <div>
                      <p className="text-xs text-gray-600">Account Number</p>
                      <p className="font-semibold text-sm">6957666738</p>
                    </div>
                    <button
                      onClick={handleCopyAccountNumber}
                      className="p-2 hover:bg-green-100 rounded-full transition-colors"
                    >
                      <Copy className="w-4 h-4 text-green-600" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                    <div>
                      <p className="text-xs text-gray-600">Bank</p>
                      <p className="font-semibold text-sm">MONIEPOINT MFB</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                    <div>
                      <p className="text-xs text-gray-600">Account Name</p>
                      <p className="font-semibold text-sm">chinemerem liberty Sunday</p>
                    </div>
                  </div>
                </div>

                <div className="p-2 bg-green-50 border border-green-200 rounded">
                  <p className="text-xs text-gray-600">Fee</p>
                  <p className="text-xl font-bold text-green-600">₦6,800</p>
                </div>

                <Button
                  onClick={handlePaymentConfirm}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-full text-sm"
                >
                  I have paid
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Transfer Notice Dialog */}
        <Dialog open={showTransferNotice} onOpenChange={() => {}}>
          <DialogContent className="max-w-sm mx-auto">
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold">Pay NGN 6,800.00</h2>
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
                    <p className="font-semibold text-orange-600">Do not dispute any transactions to our account</p>
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
      </>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <Card className="w-full max-w-sm border-green-200">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">Confirming...</h3>
            <p className="text-green-600">Confirming with Flutterwave payment</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'declined') {
    return (
      <div className="min-h-screen bg-green-50">
        {/* Header */}
        <div className="bg-red-600 px-4 py-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-red-700 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-xl font-semibold text-white">Payment Status</h1>
          </div>
        </div>

        <div className="px-4 py-6">
          <Card className="border-red-200 shadow-lg">
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-red-600 mb-4">Payment Not Confirmed</h3>
              <p className="text-gray-700 mb-6">
                Payment not confirmed. Please don't dispute any transfer to us. Contact support instead.
              </p>
              <Button
                onClick={onBack}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                Go Back
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
