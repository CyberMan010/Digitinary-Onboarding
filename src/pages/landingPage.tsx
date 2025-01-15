// LandingPage.tsx
import { useState } from 'react';
import FrontendCard from '../components/CardFrontEnd';
import BackendCard from '../components/CardBackEnd';
import QACard from '../components/CardQA';
import DevopsCard from '../components/CardDevOps';
import HRCard from '../components/CardHR';
import DataAnalystCard from '../components/CardDataAnalyst';
import "../styles/landingpage.scss"
const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    { id: 1, component: <FrontendCard />, label: "Front-End" },
    { id: 2, component: <BackendCard />, label: "Back-End" },
    { id: 3, component: <DevopsCard />, label: "DevOps" },
    { id: 4, component: <QACard />, label: "QA" },
    { id: 5, component: <HRCard />, label: "HR" },
    { id: 6, component: <DataAnalystCard />, label: "Data Analyst" },
  ];

  const groupedCards = [];
  for (let i = 0; i < cards.length; i += 2) {
    groupedCards.push(cards.slice(i, i + 2));
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % groupedCards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? groupedCards.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="landing-container">
      <div className="header">
        <h1>I am a
        </h1>
      </div>

      <div className="slider-container">
        <button className="navigation-button prev" onClick={handlePrev}>
          ←
        </button>

        <div className="slider">
          <div
            className="slider-content"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {groupedCards.map((pair, index) => (
              <div key={index} className="slide">
                {pair.map((card) => (
                  <div key={card.id} className="slide-half">
                    {card.component}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <button className="navigation-button next" onClick={handleNext}>
          →
        </button>
      </div>
    </div>
  );
};

export default LandingPage;