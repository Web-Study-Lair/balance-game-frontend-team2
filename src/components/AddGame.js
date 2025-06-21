import { useState } from 'react';
import './AddGame.css';


function AddGame({changeState}) {
  const [formData, setFormData] = useState({
    title: '',
    option1Text: '',
    option1Img: null,
    option1ImgPreview: null,
    option2Text: '',
    option2Img: null,
    option2ImgPreview: null,
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
    console.log(name, file)
    setFormData((prev) => ({
      ...prev,
      [name]: file,
      [`${name}Preview`]: previewURL,
    }));
  };
  
  return (  
       <div>
       <h2 style={{ textAlign: 'center' }}>새로운 밸런스 게임 추가</h2>     
       <form className="game-form" onSubmit={(e) => {
         e.preventDefault();
         console.log(formData);
         changeState(e.target.value);
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
             {formData.option1Img ? <img src={formData.option1ImgPreview} alt="Option 1" /> : null}
             <input type="file" name="option1Img" accept="image/*" onChange={handleImageChange} />
           </div>
           <div className="image-preview">
             {formData.option2Img ? <img src={formData.option2ImgPreview} alt="Option 2" /> : null}
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
       </div>       
  );
}

export default AddGame;
