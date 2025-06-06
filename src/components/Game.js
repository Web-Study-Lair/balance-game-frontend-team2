import { useState } from 'react';
import './Game.css'; // 스타일 분리 추천

function Game() {
  const [choice, setChoice] = useState('');

  const question = {
    optionA: {
      text: '평생 치킨만 먹기',
      img: '/images/chicken.jpg', // public 폴더 내 이미지 경로
    },
    optionB: {
      text: '평생 라면만 먹기',
      img: '/images/ramen.jpg',
    },
  };

  const handleChoice = (option) => {
    setChoice(option.text);
  };

  return (
    <div className="game-container">
      <h2 className="question-title">어떤 선택을 하시겠습니까?</h2>
      <div className="image-options">
        <div className="option" onClick={() => handleChoice(question.optionA)}>
          <img src={question.optionA.img} alt="Option A" />
          <div className="option-text">{question.optionA.text}</div>
        </div>
        <div className="option" onClick={() => handleChoice(question.optionB)}>
          <img src={question.optionB.img} alt="Option B" />
          <div className="option-text">{question.optionB.text}</div>
        </div>
      </div>
      {choice && <p className="result">당신의 선택: {choice}</p>}
    </div>
  );
}

export default Game;