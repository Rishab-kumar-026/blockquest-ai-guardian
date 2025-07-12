
import { Trophy, Medal, Award, Crown } from 'lucide-react';

export const Leaderboard = () => {
  const leaderboardData = [
    { rank: 1, name: 'CryptoMaster_99', level: 15, xp: 7850, badge: 'DeFi Legend', avatar: '👑' },
    { rank: 2, name: 'BlockchainWiz', level: 12, xp: 6200, badge: 'Security Expert', avatar: '🥇' },
    { rank: 3, name: 'Web3Defender', level: 11, xp: 5890, badge: 'Scam Hunter', avatar: '🥈' },
    { rank: 4, name: 'SafeWallet_Pro', level: 10, xp: 5100, badge: 'Token Master', avatar: '🥉' },
    { rank: 5, name: 'You (Rishab)', level: 3, xp: 1250, badge: 'Rising Star', avatar: '🚀' },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2: return <Trophy className="w-6 h-6 text-gray-400" />;
      case 3: return <Medal className="w-6 h-6 text-orange-400" />;
      default: return <Award className="w-6 h-6 text-purple-400" />;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/40';
      case 2: return 'from-gray-500/20 to-slate-500/20 border-gray-500/40';
      case 3: return 'from-orange-500/20 to-red-500/20 border-orange-500/40';
      default: return 'from-purple-500/20 to-pink-500/20 border-purple-500/40';
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Leaderboard
          </h1>
          <p className="text-gray-400">Compete with the best Web3 security experts</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-1 flex">
            {['Global', 'Friends', 'Guilds'].map((tab, index) => (
              <button
                key={tab}
                className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                  index === 0 
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {leaderboardData.slice(0, 3).map((player, index) => {
            const positions = [1, 0, 2]; // 2nd, 1st, 3rd
            const actualIndex = positions[index];
            const actualPlayer = leaderboardData[actualIndex];
            
            return (
              <div
                key={actualPlayer.rank}
                className={`text-center ${actualIndex === 0 ? 'order-2' : actualIndex === 1 ? 'order-1' : 'order-3'}`}
              >
                <div className={`bg-gradient-to-r ${getRankBg(actualPlayer.rank)} border rounded-xl p-6 ${
                  actualPlayer.rank === 1 ? 'scale-110 mt-0' : 'mt-8'
                }`}>
                  <div className="text-4xl mb-2">{actualPlayer.avatar}</div>
                  <div className="flex justify-center mb-2">
                    {getRankIcon(actualPlayer.rank)}
                  </div>
                  <h3 className="font-bold text-white mb-1">{actualPlayer.name}</h3>
                  <p className="text-sm text-gray-400">Level {actualPlayer.level}</p>
                  <p className="text-sm text-cyan-300">{actualPlayer.xp} XP</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full Leaderboard */}
        <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-cyan-300">Full Rankings</h2>
            
            <div className="space-y-3">
              {leaderboardData.map((player) => (
                <div
                  key={player.rank}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                    player.name.includes('You') 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/40' 
                      : 'bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-400">#{player.rank}</span>
                      {getRankIcon(player.rank)}
                    </div>
                    
                    <div className="text-2xl">{player.avatar}</div>
                    
                    <div>
                      <h3 className="font-medium text-white">{player.name}</h3>
                      <p className="text-sm text-gray-400">{player.badge}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-cyan-300">Level {player.level}</p>
                    <p className="text-sm text-gray-400">{player.xp} XP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Season Info */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-2 text-cyan-300">Season 1 ends in:</h3>
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              15 days 6 hours
            </div>
            <p className="text-gray-400 mt-2">Top 100 players earn exclusive NFT rewards!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
