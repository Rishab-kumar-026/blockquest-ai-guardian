
import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { QuestDashboard } from '@/components/QuestDashboard';
import { WalletHealth } from '@/components/WalletHealth';
import { AIAssistant } from '@/components/AIAssistant';
import { Leaderboard } from '@/components/Leaderboard';
import { UserProfile } from '@/components/UserProfile';
import { Navigation } from '@/components/Navigation';
import { Interactive3DBackground } from '@/components/Interactive3DBackground';
import { CursorEffects } from '@/components/CursorEffects';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [userLevel, setUserLevel] = useState(3);
  const [userXP, setUserXP] = useState(1250);
  const [walletScore, setWalletScore] = useState(68);

  const renderSection = () => {
    switch (activeSection) {
      case 'hero':
        return <HeroSection onStartQuest={() => setActiveSection('quests')} />;
      case 'quests':
        return <QuestDashboard userLevel={userLevel} userXP={userXP} />;
      case 'wallet':
        return <WalletHealth score={walletScore} />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <UserProfile level={userLevel} xp={userXP} />;
      default:
        return <HeroSection onStartQuest={() => setActiveSection('quests')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden cursor-none">
      <Interactive3DBackground />
      <CursorEffects />
      
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="relative z-10">
        {renderSection()}
      </main>

      <AIAssistant />
    </div>
  );
};

export default Index;
