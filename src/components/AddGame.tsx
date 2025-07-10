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
    console.log('전송 데이터:', formData);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('option1Text', formData.option1Text);
    data.append('option2Text', formData.option2Text);
    if (formData.option1Img) data.append('option1Img', formData.option1Img);
    if (formData.option2Img) data.append('option2Img', formData.option2Img);
  
    /*try {
      const response = await axios.post('/api/your-endpoint', data);
      console.log('업로드 성공:', response.data);
      changeState(); // 성공 후 UI 전환
    } catch (error) {
      console.error('업로드 실패:', error);
    }*/
    changeState();
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
