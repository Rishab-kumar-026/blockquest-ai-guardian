
import { Award, Star, Shield, Target, Trophy, Crown, TrendingUp, Calendar, Zap, Users } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';

interface UserProfileProps {
  level: number;
  xp: number;
}

export const UserProfile = ({ level, xp }: UserProfileProps) => {
  const { wallet } = useWallet();
  
  const badges = [
    { name: 'First Steps', icon: '🚀', description: 'Completed your first quest', rarity: 'Common', earned: true, date: '2024-01-15' },
    { name: 'Token Detective', icon: '🔍', description: 'Learned about token approvals', rarity: 'Common', earned: true, date: '2024-01-16' },
    { name: 'Security Novice', icon: '🛡️', description: 'Completed basic security training', rarity: 'Uncommon', earned: true, date: '2024-01-18' },
    { name: 'Scam Hunter', icon: '🎯', description: 'Identified 5 phishing attempts', rarity: 'Rare', earned: false, date: null },
    { name: 'DeFi Master', icon: '💎', description: 'Mastered advanced DeFi security', rarity: 'Epic', earned: false, date: null },
    { name: 'Web3 Legend', icon: '👑', description: 'Achieved the highest level', rarity: 'Legendary', earned: false, date: null },
    { name: 'Community Leader', icon: '🌟', description: 'Helped 100+ users', rarity: 'Epic', earned: false, date: null },
    { name: 'Speed Runner', icon: '⚡', description: 'Completed 10 quests in one day', rarity: 'Rare', earned: true, date: '2024-01-20' },
    { name: 'Guardian Angel', icon: '😇', description: 'Prevented a major security breach', rarity: 'Legendary', earned: false, date: null },
  ];

  const stats = [
    { label: 'Quests Completed', value: '12', icon: Target, trend: '+3 this week' },
    { label: 'Threats Blocked', value: '7', icon: Shield, trend: '+2 this week' },
    { label: 'Badges Earned', value: '4', icon: Award, trend: '+1 this week' },
    { label: 'Rank Position', value: '#5', icon: Trophy, trend: '↑2 positions' },
    { label: 'Learning Streak', value: '15 days', icon: Calendar, trend: 'Personal best!' },
    { label: 'XP This Month', value: '850', icon: Zap, trend: '+12% vs last month' },
  ];

  const achievements = [
    { title: 'First Week Complete', description: 'Finished your first 7 days', progress: 100 },
    { title: 'Social Butterfly', description: 'Connect with 10 friends', progress: 60 },
    { title: 'Knowledge Seeker', description: 'Complete 50 quests', progress: 24 },
    { title: 'Security Expert', description: 'Reach Level 10', progress: 30 },
  ];

  const recentActivity = [
    { action: 'Completed quest "Learn About Token Approvals"', xp: '+50 XP', time: '2 hours ago', icon: Target },
    { action: 'Earned badge "Token Detective"', xp: '+25 XP', time: '2 hours ago', icon: Award },
    { action: 'Leveled up to Level 3', xp: '+100 XP', time: '1 day ago', icon: Star },
    { action: 'Joined BlockQuest community', xp: '+10 XP', time: '3 days ago', icon: Shield },
    { action: 'Connected first wallet', xp: '+20 XP', time: '4 days ago', icon: Shield },
    { action: 'Completed security assessment', xp: '+75 XP', time: '5 days ago', icon: Target },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'border-gray-500/40 bg-gray-500/10';
      case 'Uncommon': return 'border-green-500/40 bg-green-500/10';
      case 'Rare': return 'border-blue-500/40 bg-blue-500/10';
      case 'Epic': return 'border-purple-500/40 bg-purple-500/10';
      case 'Legendary': return 'border-yellow-500/40 bg-yellow-500/10';
      default: return 'border-gray-500/40 bg-gray-500/10';
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-12">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8 mb-8 hover:bg-white/10 transition-all duration-300">
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-4xl font-bold shadow-2xl">
                R
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-3 shadow-lg">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-2 -left-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full px-3 py-1 text-xs font-bold text-white shadow-lg">
                LVL {level}
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Rishab
              </h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-cyan-300">Level {level}</div>
                  <div className="text-sm text-gray-400">Current Level</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-purple-300">{xp} XP</div>
                  <div className="text-sm text-gray-400">Total Experience</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-green-400">Rising Star</div>
                  <div className="text-sm text-gray-400">Current Title</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-orange-400">15 Days</div>
                  <div className="text-sm text-gray-400">Streak</div>
                </div>
              </div>
              
              <div className="w-full max-w-md">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Progress to Level {level + 1}</span>
                  <span>{xp % 500}/500 XP</span>
                </div>
                <div className="bg-gray-800 rounded-full h-4 overflow-hidden shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full rounded-full transition-all duration-300 shadow-lg"
                    style={{ width: `${(xp % 500) / 5}%` }}
                  />
                </div>
              </div>

              {wallet.isConnected && (
                <div className="mt-4 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Connected Wallet</div>
                  <div className="font-mono text-cyan-300">{wallet.address}</div>
                  <div className="text-sm text-gray-400">Balance: {wallet.balance} ETH</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Enhanced Stats */}
          <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-xl font-bold mb-6 text-cyan-300">Statistics</h2>
            <div className="space-y-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center justify-between group hover:bg-white/5 p-2 rounded-lg transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg group-hover:shadow-md transition-all duration-300">
                        <Icon className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <span className="text-gray-300 block">{stat.label}</span>
                        <span className="text-xs text-green-400">{stat.trend}</span>
                      </div>
                    </div>
                    <span className="font-bold text-white text-lg">{stat.value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-xl font-bold mb-6 text-cyan-300">Achievements</h2>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="group hover:bg-white/5 p-3 rounded-lg transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-white">{achievement.title}</h3>
                    <span className="text-xs text-gray-400">{achievement.progress}%</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{achievement.description}</p>
                  <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Challenge */}
          <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-xl font-bold mb-6 text-cyan-300">Weekly Challenge</h2>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">Security Sprint</h3>
              <p className="text-sm text-gray-400 mb-4">Complete 5 security quests this week</p>
              <div className="bg-gray-800 rounded-full h-3 overflow-hidden mb-2">
                <div className="bg-gradient-to-r from-pink-500 to-orange-500 h-full rounded-full w-3/5" />
              </div>
              <div className="text-sm text-gray-400">3/5 completed</div>
              <button className="mt-4 bg-gradient-to-r from-pink-500 to-orange-500 px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
                Continue Challenge
              </button>
            </div>
          </div>
        </div>

        {/* Badge Collection */}
        <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 mb-8 hover:bg-white/10 transition-all duration-300">
          <h2 className="text-xl font-bold mb-6 text-cyan-300">Badge Collection</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {badges.map((badge, index) => (
              <div
                key={index}
                className={`border rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 cursor-pointer ${
                  badge.earned 
                    ? getRarityColor(badge.rarity) + ' hover:shadow-lg'
                    : 'border-gray-800 bg-gray-800/20 opacity-50'
                }`}
              >
                <div className="text-3xl mb-2">
                  {badge.earned ? badge.icon : '🔒'}
                </div>
                <h3 className="font-medium text-white mb-1 text-sm">{badge.name}</h3>
                <p className="text-xs text-gray-400 mb-2">{badge.description}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  badge.rarity === 'Common' ? 'bg-gray-600 text-gray-300' :
                  badge.rarity === 'Uncommon' ? 'bg-green-600 text-green-300' :
                  badge.rarity === 'Rare' ? 'bg-blue-600 text-blue-300' :
                  badge.rarity === 'Epic' ? 'bg-purple-600 text-purple-300' :
                  'bg-yellow-600 text-yellow-300'
                }`}>
                  {badge.rarity}
                </span>
                {badge.earned && badge.date && (
                  <div className="text-xs text-gray-500 mt-1">{badge.date}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
          <h2 className="text-xl font-bold mb-6 text-cyan-300">Recent Activity</h2>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg group-hover:shadow-md transition-all duration-300">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-white">{activity.action}</p>
                      <p className="text-sm text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                  <span className="font-medium text-green-400">{activity.xp}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
