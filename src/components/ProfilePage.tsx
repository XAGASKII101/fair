
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  ArrowLeft, User, Mail, Phone, MapPin, Calendar, 
  Edit2, Save, X, Lock, Bell, Shield, Eye, EyeOff,
  Smartphone, CreditCard, LogOut, Settings
} from 'lucide-react';

interface ProfilePageProps {
  onBack: () => void;
  user: { name: string; email: string };
  onLogout?: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onBack, user, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Get additional user data from localStorage or use defaults
  const savedUserData = JSON.parse(localStorage.getItem(`userData_${user.email}`) || '{}');
  
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    phone: savedUserData.phone || '',
    dateOfBirth: savedUserData.dateOfBirth || '',
    address: savedUserData.address || '',
    gender: savedUserData.gender || '',
    bvn: savedUserData.bvn || '',
    fairCode: 'F-187377'
  });

  const [settings, setSettings] = useState({
    notifications: savedUserData.notifications !== false,
    twoFactor: savedUserData.twoFactor || false,
    biometric: savedUserData.biometric || false,
    emailAlerts: savedUserData.emailAlerts !== false
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    localStorage.setItem(`userData_${user.email}`, JSON.stringify({ ...userData, ...settings }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    const savedData = JSON.parse(localStorage.getItem(`userData_${user.email}`) || '{}');
    setUserData({
      name: user.name,
      email: user.email,
      phone: savedData.phone || '',
      dateOfBirth: savedData.dateOfBirth || '',
      address: savedData.address || '',
      gender: savedData.gender || '',
      bvn: savedData.bvn || '',
      fairCode: 'F-187377'
    });
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (passwordData.new !== passwordData.confirm) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.new.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    
    // Update password in localStorage
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userIndex = users.findIndex((u: any) => u.email === user.email);
    if (userIndex !== -1) {
      users[userIndex].password = passwordData.new;
      localStorage.setItem('registeredUsers', JSON.stringify(users));
      alert('Password changed successfully!');
      setPasswordData({ current: '', new: '', confirm: '' });
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('currentUser');
      if (onLogout) onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={onBack} className="p-2 hover:bg-green-800 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-white">My Profile</h1>
              <p className="text-xs text-green-100">Manage your account</p>
            </div>
          </div>
          <button onClick={handleLogout} className="p-2 hover:bg-red-600 rounded-full transition-colors">
            <LogOut className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="px-4 py-6 max-w-4xl mx-auto">
        {/* Profile Header */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20 ring-4 ring-green-100">
                <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white text-2xl font-bold">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    ✓ Verified
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    FairCode: {userData.fairCode}
                  </span>
                </div>
              </div>
              {!isEditing && activeTab === 'profile' && (
                <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="profile">Profile Info</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Profile Info Tab */}
          <TabsContent value="profile">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name
                    </label>
                    <Input
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      disabled={!isEditing}
                      className="h-12"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    <Input
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Enter phone number"
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <Input
                      value={userData.email}
                      disabled
                      className="h-12 bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Date of Birth
                    </label>
                    <Input
                      type="date"
                      value={userData.dateOfBirth}
                      onChange={(e) => setUserData({ ...userData, dateOfBirth: e.target.value })}
                      disabled={!isEditing}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Gender
                    </label>
                    <Input
                      value={userData.gender}
                      onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Male/Female/Other"
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <CreditCard className="w-4 h-4 inline mr-2" />
                      BVN
                    </label>
                    <Input
                      value={userData.bvn}
                      onChange={(e) => setUserData({ ...userData, bvn: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Bank Verification Number"
                      className="h-12"
                      type="password"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Address
                  </label>
                  <Input
                    value={userData.address}
                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Enter your address"
                    className="h-12"
                  />
                </div>

                {isEditing && (
                  <div className="flex space-x-3 pt-4">
                    <Button onClick={handleSave} className="flex-1 bg-green-600 hover:bg-green-700 h-12">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button onClick={handleCancel} variant="outline" className="flex-1 h-12">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={passwordData.current}
                        onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                        placeholder="Enter current password"
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={passwordData.new}
                        onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                        placeholder="Enter new password"
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={passwordData.confirm}
                        onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                        placeholder="Confirm new password"
                        className="h-12"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={showPassword}
                        onCheckedChange={setShowPassword}
                      />
                      <label className="text-sm text-gray-600">Show passwords</label>
                    </div>
                    <Button onClick={handlePasswordChange} className="w-full bg-green-600 hover:bg-green-700 h-12">
                      <Lock className="w-4 h-4 mr-2" />
                      Update Password
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-semibold text-gray-900">Push Notifications</p>
                          <p className="text-sm text-gray-500">Receive push notifications for transactions</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.notifications}
                        onCheckedChange={(checked) => {
                          const newSettings = { ...settings, notifications: checked };
                          setSettings(newSettings);
                          localStorage.setItem(`userData_${user.email}`, JSON.stringify({ ...userData, ...newSettings }));
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-semibold text-gray-900">Email Alerts</p>
                          <p className="text-sm text-gray-500">Get email notifications for account activity</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.emailAlerts}
                        onCheckedChange={(checked) => {
                          const newSettings = { ...settings, emailAlerts: checked };
                          setSettings(newSettings);
                          localStorage.setItem(`userData_${user.email}`, JSON.stringify({ ...userData, ...newSettings }));
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Security</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-500">Add an extra layer of security</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.twoFactor}
                        onCheckedChange={(checked) => {
                          const newSettings = { ...settings, twoFactor: checked };
                          setSettings(newSettings);
                          localStorage.setItem(`userData_${user.email}`, JSON.stringify({ ...userData, ...newSettings }));
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-semibold text-gray-900">Biometric Login</p>
                          <p className="text-sm text-gray-500">Use fingerprint or face ID</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.biometric}
                        onCheckedChange={(checked) => {
                          const newSettings = { ...settings, biometric: checked };
                          setSettings(newSettings);
                          localStorage.setItem(`userData_${user.email}`, JSON.stringify({ ...userData, ...newSettings }));
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
