import { useState } from 'react';
import Modal from './Modal';
import './Header.css';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogin = () => setIsLoggedIn((prev) => !prev);
  const handleAddGame = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [formData, setFormData] = useState({
    title: '',
    option1Text: '',
    option1Img: null,
    option1Preview: null,
    option2Text: '',
    option2Img: null,
    option2Preview: null,
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const previewURL = file ? URL.createObjectURL(file) : null;
  
    setFormData((prev) => ({
      ...prev,
      [name]: file,
      [`${name}Preview`]: previewURL,
    }));
  };
  
  return (
    <>
      <header className="header">
        <div className="header-left">
          <h1>Balance Game</h1>
        </div>
        <div className="header-right">
          <button className="header-btn" onClick={handleAddGame}>게임 추가</button>
          <button className="header-btn" onClick={handleLogin}>
            {isLoggedIn ? '로그아웃' : '로그인'}
          </button>
        </div>
      </header>

      {showModal && (
       <Modal onClose={handleCloseModal}>
       <h2 style={{ textAlign: 'center' }}>새로운 밸런스 게임 추가</h2>
     
       <form className="game-form" onSubmit={(e) => {
         e.preventDefault();
         console.log(formData);
         setShowModal(false);
       }}>
         {/* 질문 */}
         <input
           type="text"
           name="title"
           placeholder="주제를 입력하세요"
           required
           value={formData.title}
           onChange={handleChange}
           className="title-input"
         />
     
         {/* 이미지 미리보기 */}
         <div className="image-row">
           <div className="image-preview">
             {formData.option1Preview && <img src={formData.option1Preview} alt="Option 1" />}
             <input type="file" name="option1Img" accept="image/*" onChange={handleImageChange} />
           </div>
           <div className="image-preview">
             {formData.option2Preview && <img src={formData.option2Preview} alt="Option 2" />}
             <input type="file" name="option2Img" accept="image/*" onChange={handleImageChange} />
           </div>
         </div>
     
         {/* 항목 텍스트 */}
         <div className="text-row">
           <input
             type="text"
             name="option1Text"
             placeholder="항목 1"
             required
             value={formData.option1Text}
             onChange={handleChange}
           />
           <input
             type="text"
             name="option2Text"
             placeholder="항목 2"
             required
             value={formData.option2Text}
             onChange={handleChange}
           />
         </div>
     
         <button type="submit">게임 저장</button>
       </form>
     </Modal>
      )}
    </>
  );
}

export default Header;
