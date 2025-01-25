import React, { useState } from 'react';

function Index() {
  const [fileContent, setFileContent] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:8080/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        setFileContent(data.content);
      });
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <p className='mb-4'>{fileContent}</p>
      <input
        type="file"
        onChange={handleFileChange}
        className='mb-4'
      />
    </div>
  );
}

export default Index;