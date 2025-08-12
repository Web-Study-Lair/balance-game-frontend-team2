import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import '../styles/Game.css';

type selectOption = { text: string; img?: string; count?: number; };
type GameData = { gameId: number; title: string; selectOption: selectOption[]; };

function Game() {
  const [game, setGame] = useState<GameData | null>(null);
  const [choice, setChoice] = useState('');
  const [recentIds, setRecentIds] = useState<number[]>([]);
  const recentIdsRef = useRef<number[]>([]);           // 최신 recentIds를 보관
  const RECENT_WINDOW = 3; // 최근 게임 ID 개수 제한
  const [gamePlayed, setGamePlayed] = useState(false); // 게임이 플레이되었는지 여부
  
  // state가 바뀔 때 ref도 동기화
  useEffect(() => {
    recentIdsRef.current = recentIds;
  }, [recentIds]);

  const fetchGame = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:3000/game/');
      const data: GameData[] = res.data;
      if (!Array.isArray(data) || data.length === 0) return;

      // 최신 recentIds는 ref에서 읽기 (의존성 없음 -> useEffect 반복 트리거 X)
      const banList = new Set(recentIdsRef.current);
      const candidates = data.filter(g => !banList.has(g.gameId));
      const pool = candidates.length > 0 ? candidates : data;

      const picked = pool[Math.floor(Math.random() * pool.length)];
      setGame(picked);
      setChoice(''); // 다음 게임 때 선택 초기화
      setGamePlayed(false); // 게임이 플레이되지 않았음을 초기화

      setRecentIds(prev => {
        const next = [...prev, picked.gameId];
        return next.slice(-RECENT_WINDOW);
      });
    } catch (e) {
      console.error('게임 데이터 불러오기 실패:', e);
    }
  }, []);

  // 최초 1회만 호출
  useEffect(() => {
    fetchGame();
  }, [fetchGame]);

  const handleChoice = (option: selectOption, index: number) => {
    
    setChoice(option.text);
    setGamePlayed(true); // 게임이 플레이되었음을 표시
    option.count = (option.count ?? 0) + 1; // 선택 횟수 증가
    console.log(`게임id: ${game?.gameId}, 선택된 옵션: ${index}, 선택 횟수: ${option.count}`);
    const data = {
      gameId: game?.gameId,         
      selectOption: index,         
      count: option.count
      };
    
      axios.patch('http://localhost:3000/game/', data,{
      	headers: {
          'Content-Type': 'application/json',
          },
        });
    // console.log('선택 결과 전송 성공:', response.data);

    // 선택 결과를 서버에 보내는 기능이 있다면 여기에 추가
  }
  const getPercent = (count: number) => {
    if (!game || game.selectOption.length === 0) return 0;
    const total = game.selectOption.reduce((sum, opt) => sum + (opt.count ?? 0), 0);
    return total > 0 ? Math.round((count / total) * 100) : 0;
  };


  if (!game) return <div>로딩 중...</div>;

  return (
    <div className="game-container">
      <h2 className="question-title">{game.title}</h2>
      <div className="image-options">
        
        {game.selectOption.map((opt, i) => (
          <div
            className={gamePlayed ? 'option-played' : 'option'}
            key={i}
            onClick={!gamePlayed ? () => handleChoice(opt, i) : undefined}
            style={{ cursor: !gamePlayed ? 'pointer' : 'default' }}
          >
            {opt.img && <img src={opt.img} alt={`Option ${i + 1}`} />}
            <div className="option-text">{opt.text}</div>
          </div>
        ))}
        
      </div>
      
      <div className="ratio">            
        {gamePlayed && 
        game.selectOption.map((opt, i) => (
        <p className="result" key={i}> 
        {opt.text} 고른 비율: {getPercent(opt.count ?? 0)}%
        </p> 
        ))}
        
        {/*gamePlayed && <p className="result"> {game.selectOption[1].text}고른 비율 : {100 * (game.selectOption[1].count / (game.selectOption[0].count + game.selectOption[1].count))}%</p>*/} 
        {/* 비율 = (옵션 선택횟수 / 전체 선택횟수) */}
        </div>


      <div className="next-game">
        {gamePlayed && <p className="result">당신의 선택: {choice}</p>}
        {gamePlayed && (
          <button className="next-game-btn" onClick={fetchGame}>
            다음 게임
          </button>
        )}
      </div>
    </div>
  );
}

export default Game;

// 이전 코드 예시

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../styles/Game.css';

// type selectOption = {
//   text: string;
//   img?: string;
//   count?: number;
// };
// type GameData = {
//   gameId: number;
//   title: string;
//   selectOption: selectOption[];
// }

// function Game() {
//   const [game, setGame] = useState<GameData | null>(null);
//   const [choice, setChoice] = useState('');

  
    
//   const fetchGame = async () => {      
//     try {
//       // const response = await axios.get('http://localhost:3000/game/user/?userId=5');
//       const response = await axios.get('http://localhost:3000/game/');
//       const data: GameData[] = response.data;
//       console.log(response.data);
//       // response.data가 배열이므로 첫 번째 게임을 선택시
//       //setGame(response.data[0]);

//       if(data.length > 0){
//         const randomIndex = Math.floor(Math.random()*data.length);
//         setGame(data[randomIndex]);
//       } else { 
//         console.warn('게임 데이터가 없습니다.')
//       }        
//     } catch (error) {
//       console.error('게임 데이터 불러오기 실패:', error);
//     }    
//   };
       
//     useEffect(() => {    
//       fetchGame();  
//     }, []);

//   const handleChoice = (option: selectOption) => {
//     setChoice(option.text);
//     // 선택 결과를 서버에 보내는 기능이 있다면 여기에 추가
//   };

//   if (!game) return <div>로딩 중...</div>;

//   return (
//     <div className="game-container">
//       <h2 className="question-title">{game.title}</h2>
//       <div className="image-options">
//         {game.selectOption.map((selectoption, index) => (
//           <div className="option" key={index} onClick={() => handleChoice(selectoption)}>
//             {selectoption.img && selectoption.img !== '' && (
//               <img src={selectoption.img} alt={`Option ${index + 1}`} />
//             )}
//             <div className="option-text">{selectoption.text}</div>
//           </div>
//         ))}
//       </div>
//       <div className="next-game">
//       {choice && <p className="result">당신의 선택: {choice}</p>}
//       {choice && <button className="next-game-btn" onClick={fetchGame}>다음 게임</button>}
//        </div>
//     </div>
//   );
// }

// export default Game;


// import { useState } from 'react';
// import '../styles/Game.css'; // 스타일 분리 추천

// function Game() {

//   const [choice, setChoice] = useState('');

//   const question = {
//     title: ' ',
//     option1: {
//       text: '평생 치킨만 먹기',
//       img: '/images/chicken.jpg', // public 폴더 내 이미지 경로
//     },
//     option2: {
//       text: '평생 라면만 먹기',
//       img: '/images/ramen.jpg',
//     },
//   };

//   type Question = {
//     title?: string;
//     option1: {
//       text: string,
//       img?: string, // public 폴더 내 이미지 경로
//     },
//     option2: {
//       text: string,
//       img?: string,
//     }
//   }

//   const handleChoice = (option: Question['option1'] | Question['option2']) => {
//     setChoice(option.text);
//   };



//   return (
//     <div className="game-container">
//       <h2 className="question-title">어떤 선택을 하시겠습니까?</h2>
//       <div className="image-options">
        
//         <div className="option" onClick={() => handleChoice(question.option1)}>
//           <img src={question.option1.img} alt="Option 1" />
//           <div className="option-text">{question.option1.text}</div>
//         </div>

//         <div className="option" onClick={() => handleChoice(question.option2)}>
//           <img src={question.option2.img} alt="Option 2" />
//           <div className="option-text">{question.option2.text}</div>
//         </div>
//       </div>
//       {choice && <p className="result">당신의 선택: {choice}</p>}
//     </div>
//      );
//     }
    
//     export default Game;