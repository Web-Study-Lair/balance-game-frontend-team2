import { useState } from 'react';
import Modal from '../components/Modal';
import './Header.css';
import AddGame from '../components/AddGame';
      

function Header() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleLogin = () => setIsLoggedIn((prev) => !prev);
    const handleAddGame = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <header>
        <div className="header-left">
          <h1>Balance Game</h1>
        </div>
        <div className="header-right">
          <button className="header-btn" onClick={handleAddGame}>게임 추가</button>
          <button className="header-btn" onClick={handleLogin}>
            {isLoggedIn ? '로그아웃' : '로그인'}
          </button>
        </div>
        {showModal && <Modal onClose={handleCloseModal}>
        <AddGame changeState={handleCloseModal} />
        </Modal>}
      </header>

      
    );
  }
  
  export default Header;