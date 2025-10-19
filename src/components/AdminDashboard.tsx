
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Users, DollarSign, CreditCard, CheckCircle, XCircle, Search, Download } from 'lucide-react';

interface AdminDashboardProps {
  onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in production this would come from your backend
  const stats = {
    totalUsers: 1247,
    pendingWithdrawals: 23,
    pendingDeposits: 15,
    totalTransactions: 5634,
    totalRevenue: 2450000
  };

  const pendingWithdrawals = [
    { id: 1, user: 'John Doe', email: 'john@example.com', amount: 50000, date: '2024-01-15', status: 'pending' },
    { id: 2, user: 'Jane Smith', email: 'jane@example.com', amount: 75000, date: '2024-01-15', status: 'pending' },
  ];

  const pendingDeposits = [
    { id: 1, user: 'Mike Johnson', email: 'mike@example.com', amount: 10000, type: 'FairCode', date: '2024-01-15', status: 'pending' },
    { id: 2, user: 'Sarah Williams', email: 'sarah@example.com', amount: 10000, type: 'Withdrawal Fee', date: '2024-01-15', status: 'pending' },
  ];

  const allUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', balance: 250000, faircode: true, joined: '2024-01-10' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', balance: 180000, faircode: true, joined: '2024-01-12' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', balance: 95000, faircode: false, joined: '2024-01-13' },
  ];

  const handleApproveWithdrawal = (id: number) => {
    console.log('Approving withdrawal:', id);
    // Add API call here
  };

  const handleRejectWithdrawal = (id: number) => {
    console.log('Rejecting withdrawal:', id);
    // Add API call here
  };

  const handleConfirmDeposit = (id: number) => {
    console.log('Confirming deposit:', id);
    // Add API call here
  };

  const handleRejectDeposit = (id: number) => {
    console.log('Rejecting deposit:', id);
    // Add API call here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-green-800 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
            <p className="text-xs text-green-100">Monitor and manage all operations</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 max-w-7xl mx-auto">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Pending Withdrawals</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.pendingWithdrawals}</p>
                </div>
                <CreditCard className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Pending Deposits</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.pendingDeposits}</p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Total Transactions</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalTransactions}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Total Revenue</p>
                  <p className="text-xl font-bold text-green-600">₦{stats.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
            <TabsTrigger value="deposits">Deposits</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Users</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 text-sm font-semibold">Name</th>
                        <th className="text-left p-3 text-sm font-semibold">Email</th>
                        <th className="text-left p-3 text-sm font-semibold">Balance</th>
                        <th className="text-left p-3 text-sm font-semibold">FairCode</th>
                        <th className="text-left p-3 text-sm font-semibold">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                          <td className="p-3 text-sm">{user.name}</td>
                          <td className="p-3 text-sm">{user.email}</td>
                          <td className="p-3 text-sm font-semibold text-green-600">₦{user.balance.toLocaleString()}</td>
                          <td className="p-3 text-sm">
                            {user.faircode ? (
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Active</span>
                            ) : (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">None</span>
                            )}
                          </td>
                          <td className="p-3 text-sm text-gray-600">{user.joined}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdrawals">
            <Card>
              <CardHeader>
                <CardTitle>Pending Withdrawals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingWithdrawals.map((withdrawal) => (
                    <div key={withdrawal.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold text-gray-900">{withdrawal.user}</p>
                          <p className="text-sm text-gray-600">{withdrawal.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-green-600">₦{withdrawal.amount.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{withdrawal.date}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleApproveWithdrawal(withdrawal.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          size="sm"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleRejectWithdrawal(withdrawal.id)}
                          variant="destructive"
                          className="flex-1"
                          size="sm"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deposits">
            <Card>
              <CardHeader>
                <CardTitle>Pending Deposits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingDeposits.map((deposit) => (
                    <div key={deposit.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold text-gray-900">{deposit.user}</p>
                          <p className="text-sm text-gray-600">{deposit.email}</p>
                          <p className="text-xs text-blue-600 mt-1">{deposit.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-blue-600">₦{deposit.amount.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{deposit.date}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleConfirmDeposit(deposit.id)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          size="sm"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Confirm
                        </Button>
                        <Button
                          onClick={() => handleRejectDeposit(deposit.id)}
                          variant="destructive"
                          className="flex-1"
                          size="sm"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
