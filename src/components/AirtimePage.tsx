
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Smartphone, Loader2, CheckCircle, MessageCircle } from 'lucide-react';

interface AirtimePageProps {
  onBack: () => void;
}

const AirtimePage: React.FC<AirtimePageProps> = ({ onBack }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [fairCode, setFairCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const networks = [
    { name: 'MTN', color: 'from-yellow-500 to-yellow-600' },
    { name: 'Airtel', color: 'from-red-500 to-red-600' },
    { name: 'Glo', color: 'from-green-500 to-green-600' },
    { name: '9mobile', color: 'from-emerald-500 to-emerald-600' }
  ];

  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || !amount || !selectedNetwork || !fairCode) {
      return;
    }

    setIsLoading(true);

    // Check faircode
    if (fairCode !== 'F-187377') {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
      alert('Wrong faircode! Contact support to get your faircode.');
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

  // Redirect to WhatsApp
    const message = `Hello! I want to purchase ₦${amount} ${selectedNetwork} airtime for ${phoneNumber}. My FairCode is ${fairCode}.`;
    window.open(`https://wa.me/2348107516059?text=${encodeURIComponent(message)}`, '_blank');
    
    setIsLoading(false);
    setPhoneNumber('');
    setAmount('');
    setSelectedNetwork('');
    setFairCode('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-2 hover:bg-blue-800 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-white">Buy Airtime</h1>
            <p className="text-xs text-blue-100">Quick & Easy Recharge</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 max-w-2xl mx-auto">
        <Card className="border-0 shadow-lg mb-4">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Network</label>
                <div className="grid grid-cols-2 gap-3">
                  {networks.map((network) => (
                    <button
                      key={network.name}
                      type="button"
                      onClick={() => setSelectedNetwork(network.name)}
                      className={`p-4 rounded-xl text-center transition-all transform hover:scale-105 ${
                        selectedNetwork === network.name
                          ? `bg-gradient-to-r ${network.color} text-white shadow-lg`
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Smartphone className="w-6 h-6 mx-auto mb-2" />
                      <span className="font-semibold">{network.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Phone Number</label>
                <Input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="0801 234 5678"
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Quick Amount</label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {quickAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setAmount(amt.toString())}
                      className={`p-3 rounded-lg font-semibold transition-all ${
                        amount === amt.toString()
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      ₦{amt}
                    </button>
                  ))}
                </div>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Or enter custom amount"
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Fair Code</label>
                <Input
                  type="text"
                  value={fairCode}
                  onChange={(e) => setFairCode(e.target.value)}
                  placeholder="Enter your faircode"
                  className="h-12"
                />
              </div>

              <Button
                type="submit"
                disabled={!phoneNumber || !amount || !selectedNetwork || !fairCode || isLoading}
                className="w-full h-14 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl text-lg font-semibold disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Continue on WhatsApp
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AirtimePage;
