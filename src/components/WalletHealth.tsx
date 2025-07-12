
import { AlertTriangle, CheckCircle, XCircle, Shield, TrendingUp, TrendingDown, Eye, Zap, Lock, AlertCircle } from 'lucide-react';

interface WalletHealthProps {
  score: number;
}

export const WalletHealth = ({ score }: WalletHealthProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-400';
    if (score >= 60) return 'from-yellow-500 to-orange-400';
    return 'from-red-500 to-pink-400';
  };

  const securityFactors = [
    {
      title: 'Token Approvals',
      status: 'warning',
      description: '3 risky unlimited approvals detected',
      details: 'You have granted unlimited spending permissions to 3 smart contracts',
      action: 'Revoke Now',
      icon: AlertTriangle,
      impact: 'High Risk',
      lastChecked: '2 hours ago'
    },
    {
      title: 'Suspicious Tokens',
      status: 'danger',
      description: '2 potentially malicious tokens found',
      details: 'These tokens may be honeypots or have malicious contract code',
      action: 'Remove Tokens',
      icon: XCircle,
      impact: 'Critical',
      lastChecked: '1 hour ago'
    },
    {
      title: 'Smart Contract Interactions',
      status: 'safe',
      description: 'All recent interactions verified',
      details: 'Your last 15 transactions were with verified, safe contracts',
      action: 'Keep Safe',
      icon: CheckCircle,
      impact: 'Low Risk',
      lastChecked: '30 min ago'
    },
    {
      title: 'Phishing Protection',
      status: 'safe',
      description: 'No suspicious links clicked',
      details: 'Our system detected no phishing attempts in your recent activity',
      action: 'Stay Vigilant',
      icon: Shield,
      impact: 'Protected',
      lastChecked: '15 min ago'
    },
    {
      title: 'Transaction Patterns',
      status: 'warning',
      description: 'Unusual activity detected',
      details: 'Higher than normal transaction frequency in the last 24 hours',
      action: 'Review Activity',
      icon: TrendingUp,
      impact: 'Medium Risk',
      lastChecked: '5 min ago'
    },
    {
      title: 'Privacy Score',
      status: 'safe',
      description: 'Good privacy practices maintained',
      details: 'You are using multiple addresses and privacy-preserving methods',
      action: 'Maintain Privacy',
      icon: Eye,
      impact: 'Well Protected',
      lastChecked: '1 hour ago'
    }
  ];

  const riskDistribution = {
    critical: securityFactors.filter(f => f.status === 'danger').length,
    high: securityFactors.filter(f => f.status === 'warning').length,
    low: securityFactors.filter(f => f.status === 'safe').length
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-bold mb-12 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Wallet Health Dashboard
        </h1>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
          {/* Main Health Score */}
          <div className="xl:col-span-1 bg-white/5 backdrop-blur-lg border border-cyan-500/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-8 text-center text-white">Security Score</h2>
            
            <div className="relative w-56 h-56 mx-auto mb-8">
              <svg className="w-56 h-56 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#gradient)"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${score * 2.51} 251`}
                  className="transition-all duration-2000 drop-shadow-lg"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" className={`${score >= 80 ? 'stop-green-500' : score >= 60 ? 'stop-yellow-500' : 'stop-red-500'}`} />
                    <stop offset="100%" className={`${score >= 80 ? 'stop-emerald-400' : score >= 60 ? 'stop-orange-400' : 'stop-pink-400'}`} />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className={`text-6xl font-bold ${getScoreColor(score)} drop-shadow-lg`}>
                    {score}
                  </div>
                  <div className="text-sm text-gray-400 mt-2">out of 100</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className={`text-2xl font-bold ${getScoreColor(score)} mb-3`}>
                {score >= 80 ? 'Excellent Security' : score >= 60 ? 'Moderate Risk' : 'High Risk'}
              </p>
              <p className="text-gray-300 text-base leading-relaxed">
                {score >= 80 ? 'Your wallet is exceptionally well protected with strong security practices' : 
                 score >= 60 ? 'Your wallet has decent security but some improvements are recommended' : 
                 'Your wallet has significant security vulnerabilities that require immediate attention'}
              </p>
            </div>
          </div>

          {/* Risk Distribution */}
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-red-300 flex items-center">
                <AlertCircle className="w-6 h-6 mr-3" />
                Risk Overview
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-red-500/20 rounded-xl border border-red-500/30">
                  <div className="text-3xl font-bold text-red-400">{riskDistribution.critical}</div>
                  <p className="text-sm text-red-300">Critical Risks</p>
                </div>
                <div className="text-center p-4 bg-yellow-500/20 rounded-xl border border-yellow-500/30">
                  <div className="text-3xl font-bold text-yellow-400">{riskDistribution.high}</div>
                  <p className="text-sm text-yellow-300">High Risks</p>
                </div>
                <div className="text-center p-4 bg-green-500/20 rounded-xl border border-green-500/30">
                  <div className="text-3xl font-bold text-green-400">{riskDistribution.low}</div>
                  <p className="text-sm text-green-300">Protected</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-cyan-300 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3" />
                Security Trends
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-green-400 font-medium">+12 Points</p>
                    <p className="text-xs text-gray-400">This week</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Lock className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className="text-blue-400 font-medium">3 Fixes Applied</p>
                    <p className="text-xs text-gray-400">This month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Security Analysis */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-white flex items-center">
            <Shield className="w-8 h-8 mr-4 text-cyan-400" />
            Detailed Security Analysis
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {securityFactors.map((factor, index) => {
              const Icon = factor.icon;
              
              return (
                <div
                  key={index}
                  className={`group bg-white/5 backdrop-blur-lg border rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] ${
                    factor.status === 'safe' ? 'border-green-500/20 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10' :
                    factor.status === 'warning' ? 'border-yellow-500/20 hover:border-yellow-500/40 hover:shadow-lg hover:shadow-yellow-500/10' :
                    'border-red-500/20 hover:border-red-500/40 hover:shadow-lg hover:shadow-red-500/10'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl transform group-hover:scale-110 transition-transform duration-300 ${
                        factor.status === 'safe' ? 'bg-green-500/20 shadow-lg shadow-green-500/10' :
                        factor.status === 'warning' ? 'bg-yellow-500/20 shadow-lg shadow-yellow-500/10' :
                        'bg-red-500/20 shadow-lg shadow-red-500/10'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          factor.status === 'safe' ? 'text-green-400' :
                          factor.status === 'warning' ? 'text-yellow-400' :
                          'text-red-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg mb-2">{factor.title}</h3>
                        <p className="text-gray-300 mb-2">{factor.description}</p>
                        <p className="text-sm text-gray-400 leading-relaxed">{factor.details}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        factor.status === 'safe' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                        factor.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                        'bg-red-500/20 text-red-400 border-red-500/30'
                      }`}>
                        {factor.impact}
                      </span>
                      <p className="text-xs text-gray-500 mt-2">{factor.lastChecked}</p>
                    </div>
                  </div>
                  
                  <button className={`w-full mt-4 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                    factor.status === 'safe' ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30' :
                    factor.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-500/30' :
                    'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                  }`}>
                    <Zap className="w-4 h-4" />
                    <span>{factor.action}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Improvement Actions */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-cyan-300 flex items-center">
            <Zap className="w-6 h-6 mr-3" />
            Quick Security Improvements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                +15
              </div>
              <div>
                <p className="text-gray-200 font-medium">Revoke unlimited approvals</p>
                <p className="text-xs text-gray-400">Estimated 5 minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                +25
              </div>
              <div>
                <p className="text-gray-200 font-medium">Remove suspicious tokens</p>
                <p className="text-xs text-gray-400">Estimated 3 minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                +10
              </div>
              <div>
                <p className="text-gray-200 font-medium">Enable transaction monitoring</p>
                <p className="text-xs text-gray-400">Estimated 2 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
