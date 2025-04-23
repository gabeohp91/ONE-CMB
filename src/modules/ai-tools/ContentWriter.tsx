import React, { useState } from 'react';

const ContentWriter: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

    const handleGenerate = () => {
    console.log(`Generating content for prompt: ${prompt}`);
    // Simulate AI generation (replace with actual AI service call)
        const simulatedResponse = `AI-generated content for: "${prompt}". This is a placeholder response.`;
        setGeneratedContent(simulatedResponse);
  };

  return (
    <div>
      <label htmlFor="promptInput">Enter Prompt:</label>
      <input
        type="text"
        id="promptInput"
        value={prompt}
        onChange={handlePromptChange}
      />

      <button onClick={handleGenerate}>Generate</button>

      <label htmlFor="generatedContent">Generated Content:</label> <br/>
      <textarea
        id="generatedContent"
        value={generatedContent}
        readOnly
        rows={5}
        cols={50}
      />
    </div>
  );
};

export default ContentWriter;