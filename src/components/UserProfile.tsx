import { Award, Star, Shield, Target, Trophy, Crown } from 'lucide-react';

interface UserProfileProps {
  level: number;
  xp: number;
}

export const UserProfile = ({ level, xp }: UserProfileProps) => {
  const badges = [
    { name: 'First Steps', icon: '🚀', description: 'Completed your first quest', rarity: 'Common', earned: true },
    { name: 'Token Detective', icon: '🔍', description: 'Learned about token approvals', rarity: 'Common', earned: true },
    { name: 'Security Novice', icon: '🛡️', description: 'Completed basic security training', rarity: 'Uncommon', earned: true },
    { name: 'Scam Hunter', icon: '🎯', description: 'Identified 5 phishing attempts', rarity: 'Rare', earned: false },
    { name: 'DeFi Master', icon: '💎', description: 'Mastered advanced DeFi security', rarity: 'Epic', earned: false },
    { name: 'Web3 Legend', icon: '👑', description: 'Achieved the highest level', rarity: 'Legendary', earned: false },
  ];

  const stats = [
    { label: 'Quests Completed', value: '12', icon: Target },
    { label: 'Threats Blocked', value: '7', icon: Shield },
    { label: 'Badges Earned', value: '3', icon: Award },
    { label: 'Rank Position', value: '#5', icon: Trophy },
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
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8 mb-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-3xl font-bold">
                R
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-2">
                <Crown className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Rishab
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-lg text-cyan-300">Level {level}</span>
                <span className="text-gray-400">•</span>
                <span className="text-lg text-purple-300">{xp} XP</span>
                <span className="text-gray-400">•</span>
                <span className="text-lg text-green-400">Rising Star</span>
              </div>
              
              <div className="w-full max-w-md">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Progress to Level {level + 1}</span>
                  <span>{xp % 500}/500 XP</span>
                </div>
                <div className="bg-gray-800 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${(xp % 500) / 5}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats */}
          <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6 text-cyan-300">Statistics</h2>
            <div className="space-y-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg">
                        <Icon className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-gray-300">{stat.label}</span>
                    </div>
                    <span className="font-bold text-white">{stat.value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Badge Collection */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6 text-cyan-300">Badge Collection</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className={`border rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 ${
                    badge.earned 
                      ? getRarityColor(badge.rarity)
                      : 'border-gray-800 bg-gray-800/20 opacity-50'
                  }`}
                >
                  <div className="text-3xl mb-2 filter grayscale-0">
                    {badge.earned ? badge.icon : '🔒'}
                  </div>
                  <h3 className="font-medium text-white mb-1">{badge.name}</h3>
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
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6 text-cyan-300">Recent Activity</h2>
          
          <div className="space-y-4">
            {[
              { action: 'Completed quest "Learn About Token Approvals"', xp: '+50 XP', time: '2 hours ago', icon: Target },
              { action: 'Earned badge "Token Detective"', xp: '+25 XP', time: '2 hours ago', icon: Award },
              { action: 'Leveled up to Level 3', xp: '+100 XP', time: '1 day ago', icon: Star },
              { action: 'Joined BlockQuest community', xp: '+10 XP', time: '3 days ago', icon: Shield },
            ].map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg">
                      <Icon className="w-4 h-4 text-cyan-400" />
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
