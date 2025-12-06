import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [wordList, setWordList] = useState([]);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('/wordList.json')
      .then((res) => res.json())
      .then((data) => {
        setWordList(data);
        drawWords(data);
      })
      .catch((err) => console.error('Erro ao carregar wordList:', err));
  }, []);

  function drawWords(list = wordList) {
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    setOptions(shuffled.slice(0, 5));
    setSelected(null);
  }

  return (
    <div className="app-container">
      <h1>Imagem & Ação (PWA)</h1>
      {!selected ? (
        <div className="options-container">
          <h2>Escolha uma palavra:</h2>
          <ul>
            {options.map((item) => (
              <li key={item.Palavra}>
                <button onClick={() => setSelected(item.Palavra)}>
                  {item.Palavra}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="result-container">
          <h2>Você escolheu:</h2>
          <p className="selected-word">{selected}</p>
          <button onClick={() => drawWords()}>Sortear Novamente</button>
        </div>
      )}
    </div>
  );
}

