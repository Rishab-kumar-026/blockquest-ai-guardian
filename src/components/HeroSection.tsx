
import { ArrowRight, Shield, Zap, Trophy, Star, Users, Target, Award, Lock, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onStartQuest: () => void;
}

export const HeroSection = ({ onStartQuest }: HeroSectionProps) => {
  const features = [
    {
      icon: Shield,
      title: 'AI-Powered Protection',
      description: 'Get personalized security recommendations from our advanced AI assistant',
      details: 'Our AI analyzes your wallet in real-time, detecting suspicious transactions, risky token approvals, and potential security threats before they can harm your assets.'
    },
    {
      icon: Zap,
      title: 'Gamified Learning',
      description: 'Complete quests, earn XP, and unlock exclusive NFT badges',
      details: 'Transform your Web3 education into an engaging adventure. Each completed quest rewards you with experience points and unique digital collectibles.'
    },
    {
      icon: Trophy,
      title: 'Compete & Win',
      description: 'Climb the leaderboards and prove your Web3 mastery',
      details: 'Join thousands of users in friendly competition. Show off your security knowledge and earn your place among the top blockchain guardians.'
    }
  ];

  const stats = [
    { label: 'Users Protected', value: '50K+', icon: Users },
    { label: 'Threats Blocked', value: '1.2M+', icon: Shield },
    { label: 'Quests Completed', value: '25K+', icon: Target },
    { label: 'NFTs Earned', value: '75K+', icon: Award },
  ];

  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'DeFi Trader',
      content: 'BlockQuest saved me from losing $5K to a phishing attack. The AI warnings are incredibly accurate!',
      level: 'Level 8 Security Master'
    },
    {
      name: 'Sarah Johnson',
      role: 'NFT Collector',
      content: 'Learning Web3 security through games is brilliant. I earned 15 badges in my first week!',
      level: 'Level 5 Quest Champion'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Crypto Newbie',
      content: 'As a beginner, BlockQuest made blockchain security fun and easy to understand.',
      level: 'Level 3 Rising Star'
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              BLOCKQUEST
            </h1>
            <p className="text-2xl md:text-3xl mb-4 text-gray-300">
              Secure Your Wallet. Level Up Your Web3 Skills.
            </p>
            <p className="text-xl text-cyan-300 font-medium mb-8">
              Have Fun Doing It.
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Join the ultimate blockchain security adventure where learning meets gaming. 
              Protect your digital assets while earning rewards, badges, and climbing leaderboards.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={onStartQuest}
              className="group bg-gradient-to-r from-cyan-500 to-purple-500 px-12 py-4 rounded-xl text-xl font-bold hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center space-x-3">
                <span>Start Your Quest</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button className="group bg-white/5 backdrop-blur-sm border border-cyan-500/20 px-8 py-4 rounded-xl text-lg font-medium hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Watch Demo</span>
              </span>
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Why Choose BlockQuest?
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Experience the future of blockchain education with our cutting-edge platform designed for both beginners and experts.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 hover:border-cyan-400/40 group hover:scale-105"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-300">{feature.title}</h3>
                  <p className="text-gray-400 mb-4">{feature.description}</p>
                  <p className="text-sm text-gray-500">{feature.details}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Connect Your Wallet',
                description: 'Securely link your crypto wallet to start your security assessment',
                icon: Lock
              },
              {
                step: '02',
                title: 'Complete Quests',
                description: 'Learn through interactive challenges and real-world scenarios',
                icon: Target
              },
              {
                step: '03',
                title: 'Earn Rewards',
                description: 'Collect XP, badges, and climb the leaderboards',
                icon: Star
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-medium">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                <div className="text-xs text-cyan-400 font-medium">{testimonial.level}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Ready to Secure Your Future?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already strengthened their Web3 security knowledge and earned amazing rewards.
          </p>
          <button
            onClick={onStartQuest}
            className="group bg-gradient-to-r from-cyan-500 to-purple-500 px-12 py-4 rounded-xl text-xl font-bold hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center space-x-3">
              <span>Begin Your Adventure</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
