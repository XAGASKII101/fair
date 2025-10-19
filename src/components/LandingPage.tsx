import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Gift, 
  ArrowRight,
  CheckCircle2,
  Lock,
  Banknote,
  Landmark,
  CreditCard,
  Award,
  Target
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-900/30 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fadeIn">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-sm font-semibold">Official Financial Institution</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slideUp">
            FairMonie Pay
          </h1>
          
          <p className="text-xl md:text-2xl mb-4 text-green-50 animate-slideUp" style={{ animationDelay: '0.1s' }}>
            Rebuilding Africa's Money Story
          </p>
          
          <p className="text-lg md:text-xl mb-8 text-green-100 max-w-2xl mx-auto animate-slideUp" style={{ animationDelay: '0.2s' }}>
            A licensed financial platform partnering with recovery agencies to distribute recovered funds from hackers, criminals, and fraudsters back to the people.
          </p>
          
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-white text-green-600 hover:bg-green-50 px-8 py-6 text-lg font-bold rounded-full shadow-2xl hover:shadow-green-500/50 transition-all transform hover:scale-105 animate-slideUp"
            style={{ animationDelay: '0.3s' }}
            data-testid="button-get-started"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-green-100 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Licensed & Regulated</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Secure Platform</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Instant Payouts</span>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How FairMonie Pay Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We partner with government agencies and recovery organizations to distribute recovered stolen funds fairly and transparently.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 card-shadow hover-lift transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Landmark className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Recovery Agencies Partner</h3>
              <p className="text-gray-600">
                We work with official agencies that recover stolen money from hackers, scammers, and criminals.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 card-shadow hover-lift transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Buy Your FairCode</h3>
              <p className="text-gray-600">
                Purchase and own your unique FairCode - your key to receiving distributed recovered funds and bonuses.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 card-shadow hover-lift transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Receive Funds + Bonuses</h3>
              <p className="text-gray-600">
                Get your share of recovered funds plus exclusive bonuses. All distributions are transparent and fair.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FairCode Ownership Section */}
        <Card className="border-0 bg-gradient-to-br from-green-500 to-green-600 text-white overflow-hidden relative mb-16">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <CardContent className="p-8 md:p-12 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                  <Award className="w-5 h-5" />
                  <span className="text-sm font-semibold">Exclusive Access</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Own Your FairCode
                </h2>
                <p className="text-lg text-green-50 mb-6">
                  Your FairCode is your unique identifier that entitles you to receive distributed recovered funds. Once purchased, it's yours forever - securing your place in the distribution pool.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span>Lifetime access to fund distributions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span>Priority for bonus allocations</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span>Secure and verifiable ownership</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold mb-2">F-XXXXX</div>
                    <div className="text-sm text-green-100">Your Unique FairCode</div>
                  </div>
                  <Button
                    onClick={onGetStarted}
                    size="lg"
                    className="w-full bg-white text-green-600 hover:bg-green-50 font-bold"
                    data-testid="button-buy-faircode"
                  >
                    Get Your FairCode
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why FairMonie Pay */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose FairMonie Pay?
          </h2>
          <p className="text-lg text-gray-600">
            More than just a financial platform - we're rebuilding trust in digital finance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 card-shadow text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Licensed Platform</h3>
              <p className="text-sm text-gray-600">Operating as an official financial institution with full regulatory compliance</p>
            </CardContent>
          </Card>

          <Card className="border-0 card-shadow text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Secure & Safe</h3>
              <p className="text-sm text-gray-600">Bank-level security protecting your funds and personal information</p>
            </CardContent>
          </Card>

          <Card className="border-0 card-shadow text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Banknote className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Fair Distribution</h3>
              <p className="text-sm text-gray-600">Transparent allocation of recovered funds to FairCode owners</p>
            </CardContent>
          </Card>

          <Card className="border-0 card-shadow text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Daily Bonuses</h3>
              <p className="text-sm text-gray-600">Complete tasks and earn additional rewards on top of distributions</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Receiving?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of FairCode owners benefiting from recovered fund distributions
          </p>
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg font-bold rounded-full shadow-2xl hover:shadow-green-500/50 transition-all transform hover:scale-105"
            data-testid="button-cta-signup"
          >
            Create Free Account
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>50,000+ Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>₦500M+ Distributed</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-600">
          <p className="mb-2">
            FairMonie Pay is a licensed financial institution operating in partnership with recovery agencies
          </p>
          <p className="text-xs text-gray-500">
            All fund distributions are subject to verification and regulatory compliance. Platform sustainability fees apply to withdrawals.
          </p>
        </div>
      </div>
    </div>
  );
}
