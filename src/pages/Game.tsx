import { useState } from 'react';
import '../styles/Game.css'; // 스타일 분리 추천

function Game() {
  const [choice, setChoice] = useState('');

  const question = {
    title: ' ',
    option1: {
      text: '평생 치킨만 먹기',
      img: '/images/chicken.jpg', // public 폴더 내 이미지 경로
    },
    option2: {
      text: '평생 라면만 먹기',
      img: '/images/ramen.jpg',
    },
  };

  type Question = {
    title?: string;
    option1: {
      text: string,
      img?: string, // public 폴더 내 이미지 경로
    },
    option2: {
      text: string,
      img?: string,
    }
  }

  const handleChoice = (option: Question['option1'] | Question['option2']) => {
    setChoice(option.text);
  };

  return (
    <div className="game-container">
      <h2 className="question-title">어떤 선택을 하시겠습니까?</h2>
      <div className="image-options">
        
        <div className="option" onClick={() => handleChoice(question.option1)}>
          <img src={question.option1.img} alt="Option 1" />
          <div className="option-text">{question.option1.text}</div>
        </div>

        <div className="option" onClick={() => handleChoice(question.option2)}>
          <img src={question.option2.img} alt="Option 2" />
          <div className="option-text">{question.option2.text}</div>
        </div>
      </div>
      {choice && <p className="result">당신의 선택: {choice}</p>}
    </div>
  );
}

export default Game;