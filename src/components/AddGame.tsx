import { useState } from 'react';
import axios from 'axios';
import '../styles/AddGame.css';

function AddGame({ changeState }: { changeState: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    option1Text: '',
    option1Img: null as File | null,
    option1ImgPreview: null as string | null,
    option2Text: '',
    option2Img: null as File | null,
    option2ImgPreview: null as string | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;
    const file = files[0];
    const previewURL = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      [name]: file,
      [`${name}Preview`]: previewURL,
    }));
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.option1Text.trim() || !formData.option2Text.trim()) {
      alert('모든 항목을 입력해주세요: 제목, 항목 1, 항목 2');
      return;
    }

    try {
      // FormData 객체 생성
      const fd = new FormData();

      // user 객체
      fd.append('user', JSON.stringify({
        userId: 5
      }));

      // game 객체 (이미지는 빼고 전송)
      fd.append('game', JSON.stringify({
        title: formData.title,
        selectOption: [
          { text: formData.option1Text },
          { text: formData.option2Text }
        ]
      }));

      // 이미지 파일 2개 전송 (selectOption 순서에 맞게)
      if (formData.option1Img) {
        fd.append('imgs', formData.option1Img);
      }
      if (formData.option2Img) {
        fd.append('imgs', formData.option2Img);
      }

      const response = await axios.post('http://localhost:3000/game', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('업로드 성공:', response.data);
      changeState(); // 성공 후 UI 전환
    } catch (error) {
      console.error('업로드 실패:', error);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>새로운 밸런스 게임 추가</h2>
      <div className="game-form">
        <input
          type="text"
          name="title"
          placeholder="주제를 입력하세요"
          required
          value={formData.title}
          onChange={handleChange}
          className="title-input"
        />

        <div className="image-row">
          <div className="image-preview">
            {formData.option1ImgPreview && (
              <img src={formData.option1ImgPreview} alt="Option 1" />
            )}
            <input type="file" name="option1Img" accept="image/*" onChange={handleImageChange} />
          </div>
          <div className="image-preview">
            {formData.option2ImgPreview && (
              <img src={formData.option2ImgPreview} alt="Option 2" />
            )}
            <input type="file" name="option2Img" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>

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

        <button type="button" onClick={handleSave}>게임 저장</button>
      </div>
    </div>
  );
}

export default AddGame;

//이전 코드 예시
/* import { useState } from 'react';
import axios from 'axios';
import '../styles/AddGame.css';

function AddGame({ changeState }: { changeState: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    option1Text: '',
    option1Img: null as File | null,
    option1ImgPreview: null as string | null,
    option2Text: '',
    option2Img: null as File | null,
    option2ImgPreview: null as string | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;
    const file = files[0];
    const previewURL = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      [name]: file,
      [`${name}Preview`]: previewURL,
    }));
  };
  
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSave = async () => {

    if (!formData.title.trim() || !formData.option1Text.trim() || !formData.option2Text.trim()) {
      alert('모든 항목을 입력해주세요: 제목, 항목 1, 항목 2');
      return;
    }

    try {
      const option1ImgBase64 = formData.option1Img
        ? await fileToBase64(formData.option1Img)
        : '';
      const option2ImgBase64 = formData.option2Img
        ? await fileToBase64(formData.option2Img)
        : '';

      const data = {
        user:{
          userId: 5, 
        },
        game: {
          title: formData.title,
          selectOption: [
            {
            text: formData.option1Text,
            img: option1ImgBase64,          
          },
          {
            text: formData.option2Text,
            img: option2ImgBase64,
          },
        ]
        },
      };
      
      const response = await axios.post('http://localhost:3000/game', data, {
        headers: {
          'Content-Type': 'application/json',
          },
        });

      console.log('업로드 성공:', response.data);
      console.log('전송 데이터:', formData);
      changeState(); // 성공 후 UI 전환
    } catch (error) {
      console.error('업로드 실패:', error);
      //console.log('전송 데이터:', formData);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>새로운 밸런스 게임 추가</h2>
      <div className="game-form">
        <input
          type="text"
          name="title"
          placeholder="주제를 입력하세요"
          required
          value={formData.title}
          onChange={handleChange}
          className="title-input"
        />

        <div className="image-row">
          <div className="image-preview">
            {formData.option1ImgPreview && (
              <img src={formData.option1ImgPreview} alt="Option 1" />
            )}
            <input type="file" name="option1Img" accept="image/*" onChange={handleImageChange} />
          </div>
          <div className="image-preview">
            {formData.option2ImgPreview && (
              <img src={formData.option2ImgPreview} alt="Option 2" />
            )}
            <input type="file" name="option2Img" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>

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

        <button type="button" onClick={handleSave}>게임 저장</button>
      </div>
    </div>
  );
}

export default AddGame;
*/