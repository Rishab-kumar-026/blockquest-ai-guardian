
import { Shield, Users, Target, User, Wallet } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const { wallet, connectWallet, disconnectWallet, isConnecting } = useWallet();

  const navItems = [
    { id: 'hero', label: 'Home', icon: Shield },
    { id: 'quests', label: 'Quests', icon: Target },
    { id: 'wallet', label: 'Wallet Health', icon: Wallet },
    { id: 'leaderboard', label: 'Leaderboard', icon: Users },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 group cursor-pointer transition-all duration-300 hover:scale-105">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-400/25 transition-all duration-300">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              BlockQuest
            </span>
          </div>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 shadow-lg shadow-cyan-500/20'
                      : 'hover:bg-white/5 text-gray-300 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {wallet.isConnected ? (
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 px-4 py-2 rounded-lg">
                <div className="text-xs text-gray-400">Balance</div>
                <div className="text-sm font-medium text-white">{wallet.balance} ETH</div>
              </div>
              <button
                onClick={disconnectWallet}
                className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
              >
                {formatAddress(wallet.address!)}
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
