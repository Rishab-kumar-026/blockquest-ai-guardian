
import { AlertTriangle, CheckCircle, XCircle, Shield } from 'lucide-react';

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
      action: 'Revoke Now',
      icon: AlertTriangle
    },
    {
      title: 'Suspicious Tokens',
      status: 'danger',
      description: '2 potentially malicious tokens found',
      action: 'Remove Tokens',
      icon: XCircle
    },
    {
      title: 'Smart Contract Interactions',
      status: 'safe',
      description: 'All recent interactions verified',
      action: 'Keep Safe',
      icon: CheckCircle
    },
    {
      title: 'Phishing Protection',
      status: 'safe',
      description: 'No suspicious links clicked',
      action: 'Stay Vigilant',
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Wallet Health Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Health Score Circle */}
          <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Security Score</h2>
            
            <div className="relative w-48 h-48 mx-auto mb-6">
              <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${score * 2.51} 251`}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" className={`stop-color-${score >= 80 ? 'green' : score >= 60 ? 'yellow' : 'red'}-500`} />
                    <stop offset="100%" className={`stop-color-${score >= 80 ? 'emerald' : score >= 60 ? 'orange' : 'pink'}-400`} />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
                    {score}
                  </div>
                  <div className="text-sm text-gray-400">out of 100</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className={`text-xl font-medium ${getScoreColor(score)} mb-2`}>
                {score >= 80 ? 'Excellent Security' : score >= 60 ? 'Moderate Risk' : 'High Risk'}
              </p>
              <p className="text-gray-400 text-sm">
                {score >= 80 ? 'Your wallet is well protected' : 
                 score >= 60 ? 'Some improvements needed' : 
                 'Immediate attention required'}
              </p>
            </div>
          </div>

          {/* Security Factors */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Security Analysis</h2>
            
            {securityFactors.map((factor, index) => {
              const Icon = factor.icon;
              
              return (
                <div
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm border rounded-xl p-4 ${
                    factor.status === 'safe' ? 'border-green-500/20' :
                    factor.status === 'warning' ? 'border-yellow-500/20' :
                    'border-red-500/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        factor.status === 'safe' ? 'bg-green-500/20' :
                        factor.status === 'warning' ? 'bg-yellow-500/20' :
                        'bg-red-500/20'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          factor.status === 'safe' ? 'text-green-400' :
                          factor.status === 'warning' ? 'text-yellow-400' :
                          'text-red-400'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{factor.title}</h3>
                        <p className="text-sm text-gray-400">{factor.description}</p>
                      </div>
                    </div>
                    
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      factor.status === 'safe' ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' :
                      factor.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' :
                      'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    }`}>
                      {factor.action}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Improvement Tips */}
        <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 text-cyan-300">Quick Improvements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
                +10
              </div>
              <span className="text-gray-300">Revoke 3 unlimited token approvals</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
                +15
              </div>
              <span className="text-gray-300">Remove suspicious tokens from wallet</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
