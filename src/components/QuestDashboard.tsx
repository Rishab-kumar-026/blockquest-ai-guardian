
import { Trophy, Star, Clock, Zap } from 'lucide-react';

interface QuestDashboardProps {
  userLevel: number;
  userXP: number;
}

export const QuestDashboard = ({ userLevel, userXP }: QuestDashboardProps) => {
  const quests = [
    {
      id: 1,
      title: 'Learn About Token Approvals',
      description: 'Understand how token approvals work and why they matter',
      xp: 50,
      time: '15 min',
      difficulty: 'Beginner',
      icon: '🔐',
      completed: true
    },
    {
      id: 2,
      title: 'Revoke Dangerous Approvals',
      description: 'Use Revoke.cash to clean up your wallet permissions',
      xp: 75,
      time: '10 min',
      difficulty: 'Beginner',
      icon: '🛡️',
      completed: false
    },
    {
      id: 3,
      title: 'DeFi Safety Simulation',
      description: 'Navigate through common DeFi scams in our safe environment',
      xp: 100,
      time: '25 min',
      difficulty: 'Intermediate',
      icon: '🎮',
      completed: false
    },
    {
      id: 4,
      title: 'Smart Contract Audit',
      description: 'Learn to read and understand smart contract risks',
      xp: 150,
      time: '35 min',
      difficulty: 'Advanced',
      icon: '🔍',
      completed: false
    }
  ];

  const xpToNextLevel = (userLevel * 500) - (userXP % 500);

  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Quest Dashboard
          </h1>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">{userLevel}</span>
              </div>
              <div>
                <p className="text-sm text-gray-400">Level {userLevel}</p>
                <p className="text-xs text-gray-500">{xpToNextLevel} XP to next level</p>
              </div>
            </div>
            <div className="flex-1 max-w-md">
              <div className="bg-gray-800 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(userXP % 500) / 5}%` }}
                />
              </div>
              <p className="text-sm text-gray-400 mt-1">{userXP} XP</p>
            </div>
          </div>
        </div>

        {/* Quest Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quests.map((quest) => (
            <div
              key={quest.id}
              className={`bg-white/5 backdrop-blur-sm border rounded-xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer ${
                quest.completed 
                  ? 'border-green-500/40 bg-green-500/10' 
                  : 'border-cyan-500/20 hover:border-cyan-400/40'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{quest.icon}</div>
                {quest.completed && (
                  <div className="bg-green-500 rounded-full p-1">
                    <Trophy className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold mb-2 text-cyan-300">{quest.title}</h3>
              <p className="text-gray-400 mb-4">{quest.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-yellow-400">{quest.xp} XP</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">{quest.time}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  quest.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                  quest.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {quest.difficulty}
                </span>
              </div>

              {!quest.completed && (
                <button className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-purple-500 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>Start Quest</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
