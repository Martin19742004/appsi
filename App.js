import React, { useState } from 'react';
import LayoutHeader from './components/LayoutHeader';
import VideoCardVertical from './components/VideoCardVertical';
import VideoCardHorizontal from './components/VideoCardHorizontal';
import TabNavigation from './components/TabNavigation';
import BottomNavigation from './components/BottomNavigation';
import LiveBattle from './components/LiveBattle';
import ChannelDashboard from './components/ChannelDashboard';
import VideoUploadModal from './components/VideoUploadModal';
import DiscoverySection from './components/DiscoverySection';
import { verticalVideos, horizontalVideos } from './mock/data';
import { liveBattles, topCreators, trendingHashtags } from './mock/advancedData';

const App = () => {
  const [activeTab, setActiveTab] = useState('forYou');
  const [activeView, setActiveView] = useState('home');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'live':
        return <LiveBattle />;
      case 'channel':
        return <ChannelDashboard />;
      case 'discover':
        return <DiscoverySection />;
      default:
        return (
          <>
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <main className="h-full overflow-y-auto pb-20">
              {activeTab === 'forYou' ? (
                <div className="snap-y snap-mandatory h-full">
                  {verticalVideos.map(video => (
                    <VideoCardVertical key={video.id} video={video} />
                  ))}
                </div>
              ) : (
                <div className="p-4">
                  {horizontalVideos.map(video => (
                    <VideoCardHorizontal key={video.id} video={video} />
                  ))}
                </div>
              )}
            </main>
          </>
        );
    }
  };

  return (
    <div className="relative h-screen bg-white overflow-hidden">
      {activeView !== 'channel' && <LayoutHeader />}
      
      {renderView()}
      
      {activeView === 'home' && (
        <BottomNavigation 
          onUploadClick={() => setShowUploadModal(true)}
          onDiscoverClick={() => setActiveView('discover')}
        />
      )}

      {showUploadModal && (
        <VideoUploadModal onClose={() => setShowUploadModal(false)} />
      )}
    </div>
  );
};

export default App;

// DONE