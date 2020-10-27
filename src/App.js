import React from 'react';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Intro from './components/intro/Intro';
import LearningModule from './components/learningModule/LearningModule';

import './styles/App.scss';

function App() {
  const [gameStatus, setGameStatus] = React.useState({
    message: 'Welcome',
    loadIntro: true,
    currentPercentage: 0,
    percentageToAdd: 0,
  });

  return (
    <div>
      <Navbar />
      <div id="mainWrapper">
        {gameStatus.loadIntro && (
          <Intro setGameStatus={setGameStatus} gameStatus={gameStatus} />
        )}

        {!gameStatus.loadIntro && (
          <LearningModule
            setGameStatus={setGameStatus}
            gameStatus={gameStatus}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
