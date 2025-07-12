
import { Trophy, Star, Clock, Zap, Target, Users, Award, ChevronRight } from 'lucide-react';

interface QuestDashboardProps {
  userLevel: number;
  userXP: number;
}

export const QuestDashboard = ({ userLevel, userXP }: QuestDashboardProps) => {
  const quests = [
    {
      id: 1,
      title: 'Learn About Token Approvals',
      description: 'Understand how token approvals work and why they matter for your wallet security',
      xp: 50,
      time: '15 min',
      difficulty: 'Beginner',
      icon: '🔐',
      completed: true,
      category: 'Security Basics',
      progress: 100
    },
    {
      id: 2,
      title: 'Revoke Dangerous Approvals',
      description: 'Use Revoke.cash to clean up your wallet permissions and enhance security',
      xp: 75,
      time: '10 min',
      difficulty: 'Beginner',
      icon: '🛡️',
      completed: false,
      category: 'Security Basics',
      progress: 65
    },
    {
      id: 3,
      title: 'DeFi Safety Simulation',
      description: 'Navigate through common DeFi scams in our safe simulated environment',
      xp: 100,
      time: '25 min',
      difficulty: 'Intermediate',
      icon: '🎮',
      completed: false,
      category: 'Advanced Training',
      progress: 0
    },
    {
      id: 4,
      title: 'Smart Contract Audit',
      description: 'Learn to read and understand smart contract risks and vulnerabilities',
      xp: 150,
      time: '35 min',
      difficulty: 'Advanced',
      icon: '🔍',
      completed: false,
      category: 'Expert Level',
      progress: 0
    },
    {
      id: 5,
      title: 'Phishing Attack Defense',
      description: 'Master the art of identifying and avoiding phishing attempts',
      xp: 80,
      time: '20 min',
      difficulty: 'Intermediate',
      icon: '🎣',
      completed: false,
      category: 'Security Basics',
      progress: 30
    },
    {
      id: 6,
      title: 'Multi-sig Wallet Setup',
      description: 'Learn to set up and manage multi-signature wallets for enhanced security',
      xp: 200,
      time: '45 min',
      difficulty: 'Advanced',
      icon: '🔐',
      completed: false,
      category: 'Expert Level',
      progress: 0
    }
  ];

  const xpToNextLevel = (userLevel * 500) - (userXP % 500);

  const categories = [...new Set(quests.map(q => q.category))];

  return (
    <div className="min-h-screen pt-24 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header with Stats */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Quest Dashboard
          </h1>
          
          {/* Player Stats Card */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-lg border border-cyan-500/20 rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/25">
                  <span className="text-2xl font-bold">{userLevel}</span>
                </div>
                <div>
                  <p className="text-lg font-medium text-cyan-300">Level {userLevel}</p>
                  <p className="text-sm text-gray-400">{xpToNextLevel} XP to next level</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{userXP}</div>
                <p className="text-sm text-gray-400">Total XP</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{quests.filter(q => q.completed).length}</div>
                <p className="text-sm text-gray-400">Completed</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">{quests.filter(q => !q.completed && q.progress > 0).length}</div>
                <p className="text-sm text-gray-400">In Progress</p>
              </div>
            </div>
            
            {/* XP Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Progress to Level {userLevel + 1}</span>
                <span className="text-sm text-cyan-400">{((userXP % 500) / 500 * 100).toFixed(1)}%</span>
              </div>
              <div className="bg-gray-800 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full rounded-full transition-all duration-1000 shadow-lg shadow-cyan-500/25"
                  style={{ width: `${(userXP % 500) / 500 * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Category Sections */}
        {categories.map(category => (
          <div key={category} className="mb-12">
            <div className="flex items-center mb-6">
              <Target className="w-6 h-6 text-cyan-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">{category}</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent ml-4" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {quests.filter(quest => quest.category === category).map((quest) => (
                <div
                  key={quest.id}
                  className={`group relative bg-white/5 backdrop-blur-lg border rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 cursor-pointer transform hover:scale-[1.02] hover:shadow-2xl ${
                    quest.completed 
                      ? 'border-green-500/40 bg-green-500/5 shadow-lg shadow-green-500/10' 
                      : quest.progress > 0
                      ? 'border-yellow-500/40 bg-yellow-500/5 shadow-lg shadow-yellow-500/10'
                      : 'border-cyan-500/20 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/10'
                  }`}
                >
                  {/* Quest Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                      {quest.icon}
                    </div>
                    <div className="flex items-center space-x-2">
                      {quest.completed && (
                        <div className="bg-green-500 rounded-full p-2 shadow-lg shadow-green-500/25">
                          <Trophy className="w-5 h-5 text-white" />
                        </div>
                      )}
                      {quest.progress > 0 && !quest.completed && (
                        <div className="bg-yellow-500 rounded-full p-2 shadow-lg shadow-yellow-500/25">
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-cyan-200 group-hover:text-cyan-100 transition-colors">
                    {quest.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{quest.description}</p>

                  {/* Progress Bar for In-Progress Quests */}
                  {quest.progress > 0 && !quest.completed && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">Progress</span>
                        <span className="text-sm text-yellow-400">{quest.progress}%</span>
                      </div>
                      <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full rounded-full transition-all duration-1000"
                          style={{ width: `${quest.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Quest Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span className="text-yellow-400 font-medium">{quest.xp} XP</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-400">{quest.time}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      quest.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                      quest.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                      'bg-red-500/20 text-red-400 border-red-500/30'
                    }`}>
                      {quest.difficulty}
                    </span>
                  </div>

                  {/* Action Button */}
                  {!quest.completed && (
                    <button className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-purple-500 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-105">
                      <Zap className="w-5 h-5" />
                      <span>{quest.progress > 0 ? 'Continue Quest' : 'Start Quest'}</span>
                      <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}

                  {quest.completed && (
                    <button className="w-full mt-4 bg-green-500/20 border border-green-500/30 py-3 rounded-xl font-medium text-green-400 flex items-center justify-center space-x-2">
                      <Award className="w-5 h-5" />
                      <span>Quest Completed!</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Achievement Showcase */}
        <div className="mt-16 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-purple-300 flex items-center">
            <Users className="w-6 h-6 mr-3" />
            Recent Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-3xl mb-2">🏆</div>
              <p className="text-sm text-gray-300">Security Novice</p>
              <p className="text-xs text-gray-500">Complete your first quest</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl opacity-50">
              <div className="text-3xl mb-2">🎯</div>
              <p className="text-sm text-gray-300">Quest Master</p>
              <p className="text-xs text-gray-500">Complete 5 quests</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl opacity-50">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-sm text-gray-300">Speed Runner</p>
              <p className="text-xs text-gray-500">Complete quest in under 10 min</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
