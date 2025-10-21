
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Users, DollarSign, CreditCard, CheckCircle, XCircle, Search, Download } from 'lucide-react';
import { 
  getAllUsers, 
  getPendingWithdrawals, 
  getPendingDeposits,
  updateWithdrawalStatus,
  updateDepositStatus,
  updateUserBalance,
  createTransaction,
  getStats,
  type User,
  type Withdrawal,
  type Deposit
} from '@/services/firestoreService';

interface AdminDashboardProps {
  onBack: () => void;
  user: {
    name: string;
    email: string;
  };
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack, user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState<User[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingWithdrawals: 0,
    pendingDeposits: 0,
    totalTransactions: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    // Real-time listeners
    const unsubUsers = getAllUsers(setUsers);
    const unsubWithdrawals = getPendingWithdrawals(setWithdrawals);
    const unsubDeposits = getPendingDeposits(setDeposits);
    
    // Load stats
    getStats().then(setStats);
    
    return () => {
      unsubUsers();
      unsubWithdrawals();
      unsubDeposits();
    };
  }, []);

  const handleApproveWithdrawal = async (withdrawal: Withdrawal) => {
    try {
      await updateWithdrawalStatus(withdrawal.id!, 'approved');
      await createTransaction({
        userId: withdrawal.userId,
        type: 'withdrawal',
        amount: -withdrawal.amount,
        status: 'completed',
        description: `Withdrawal to ${withdrawal.bankName}`
      });
      alert('Withdrawal approved successfully!');
    } catch (error) {
      console.error('Error approving withdrawal:', error);
      alert('Failed to approve withdrawal');
    }
  };

  const handleRejectWithdrawal = async (withdrawal: Withdrawal) => {
    try {
      await updateWithdrawalStatus(withdrawal.id!, 'rejected');
      await updateUserBalance(withdrawal.userId, withdrawal.amount);
      await createTransaction({
        userId: withdrawal.userId,
        type: 'withdrawal_refund',
        amount: withdrawal.amount,
        status: 'completed',
        description: 'Withdrawal rejected - refund'
      });
      alert('Withdrawal rejected and amount refunded!');
    } catch (error) {
      console.error('Error rejecting withdrawal:', error);
      alert('Failed to reject withdrawal');
    }
  };

  const handleConfirmDeposit = async (deposit: Deposit) => {
    try {
      await updateDepositStatus(deposit.id!, 'confirmed');
      await updateUserBalance(deposit.userId, deposit.amount);
      await createTransaction({
        userId: deposit.userId,
        type: deposit.type.toLowerCase(),
        amount: deposit.amount,
        status: 'completed',
        description: `${deposit.type} confirmed`
      });
      alert('Deposit confirmed successfully!');
    } catch (error) {
      console.error('Error confirming deposit:', error);
      alert('Failed to confirm deposit');
    }
  };

  const handleRejectDeposit = async (deposit: Deposit) => {
    try {
      await updateDepositStatus(deposit.id!, 'rejected');
      alert('Deposit rejected!');
    } catch (error) {
      console.error('Error rejecting deposit:', error);
      alert('Failed to reject deposit');
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  <p className="text-2xl font-bold text-orange-600">{withdrawals.length}</p>
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
                  <p className="text-2xl font-bold text-blue-600">{deposits.length}</p>
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
            <TabsTrigger value="withdrawals">Withdrawals ({withdrawals.length})</TabsTrigger>
            <TabsTrigger value="deposits">Deposits ({deposits.length})</TabsTrigger>
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
                      {filteredUsers.map((user) => (
                        <tr key={user.uid} className="border-b hover:bg-gray-50">
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
                          <td className="p-3 text-sm text-gray-600">
                            {user.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                          </td>
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
                  {withdrawals.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No pending withdrawals</p>
                  ) : (
                    withdrawals.map((withdrawal) => (
                      <div key={withdrawal.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold text-gray-900">{withdrawal.userName}</p>
                            <p className="text-sm text-gray-600">{withdrawal.userEmail}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {withdrawal.bankName} - {withdrawal.accountNumber}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-green-600">₦{withdrawal.amount.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">
                              {withdrawal.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleApproveWithdrawal(withdrawal)}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            size="sm"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleRejectWithdrawal(withdrawal)}
                            variant="destructive"
                            className="flex-1"
                            size="sm"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
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
                  {deposits.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No pending deposits</p>
                  ) : (
                    deposits.map((deposit) => (
                      <div key={deposit.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold text-gray-900">{deposit.userName}</p>
                            <p className="text-sm text-gray-600">{deposit.userEmail}</p>
                            <p className="text-xs text-blue-600 mt-1">{deposit.type}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-blue-600">₦{deposit.amount.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">
                              {deposit.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleConfirmDeposit(deposit)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                            size="sm"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Confirm
                          </Button>
                          <Button
                            onClick={() => handleRejectDeposit(deposit)}
                            variant="destructive"
                            className="flex-1"
                            size="sm"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
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
