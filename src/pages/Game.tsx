import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Game.css';

type selectOption = {
  text: string;
  img?: string;
  count?: number;
};
type GameData = {
  gameId: number;
  title: string;
  selectOption: selectOption[];
}

function Game() {
  const [game, setGame] = useState<GameData | null>(null);
  const [choice, setChoice] = useState('');


  // const question = {
  //   title: ' ',
  //   option1: {
  //     text: '평생 치킨만 먹기',
  //     img: '/images/chicken.jpg', // public 폴더 내 이미지 경로
  //   },
  //   option2: {
  //     text: '평생 라면만 먹기',
  //     img: '/images/ramen.jpg',
  //   },
  // };

  useEffect(() => {
    const fetchGame = async () => {
      try {
        // const response = await axios.get('http://localhost:3000/game/user/?userId=5');
        const response = await axios.get('http://localhost:3000/game/');
        const data: GameData[] = response.data;
        console.log(response.data);
        // response.data가 배열이므로 첫 번째 게임을 선택시
        //setGame(response.data[0]);

        if(data.length > 0){
          const randomIndex = Math.floor(Math.random()*data.length);
          setGame(data[randomIndex]);
        } else { 
          console.warn('게임 데이터가 없습니다.')
        }        
      } catch (error) {
        console.error('게임 데이터 불러오기 실패:', error);
      }
    };

    fetchGame();
  }, []);

  const handleChoice = (option: selectOption) => {
    setChoice(option.text);
    // 선택 결과를 서버에 보내는 기능이 있다면 여기에 추가
  };

  if (!game) return <div>로딩 중...</div>;

  return (
    <div className="game-container">
      <h2 className="question-title">{game.title}</h2>
      <div className="image-options">
        {game.selectOption.map((selectoption, index) => (
          <div className="option" key={index} onClick={() => handleChoice(selectoption)}>
            {selectoption.img && selectoption.img !== '' && (
              <img src={selectoption.img} alt={`Option ${index + 1}`} />
            )}
            <div className="option-text">{selectoption.text}</div>
          </div>
        ))}
      </div>
      {choice && <p className="result">당신의 선택: {choice}</p>}
    </div>
  );
}

export default Game;