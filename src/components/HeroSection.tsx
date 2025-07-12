
import { ArrowRight, Shield, Zap, Trophy } from 'lucide-react';

interface HeroSectionProps {
  onStartQuest: () => void;
}

export const HeroSection = ({ onStartQuest }: HeroSectionProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            BLOCKQUEST
          </h1>
          <p className="text-2xl md:text-3xl mb-4 text-gray-300">
            Secure Your Wallet. Level Up Your Web3 Skills.
          </p>
          <p className="text-xl text-cyan-300 font-medium">
            Have Fun Doing It.
          </p>
        </div>

        <div className="mb-12">
          <button
            onClick={onStartQuest}
            className="group bg-gradient-to-r from-cyan-500 to-purple-500 px-12 py-4 rounded-xl text-xl font-bold hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center space-x-3">
              <span>Start Your Quest</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: Shield,
              title: 'AI-Powered Protection',
              description: 'Get personalized security recommendations from our advanced AI assistant'
            },
            {
              icon: Zap,
              title: 'Gamified Learning',
              description: 'Complete quests, earn XP, and unlock exclusive NFT badges'
            },
            {
              icon: Trophy,
              title: 'Compete & Win',
              description: 'Climb the leaderboards and prove your Web3 mastery'
            }
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:border-cyan-400/40"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-cyan-300">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
