import { useState, useEffect } from 'react';
import './App.css';
import './Components/Template';
import Template from './Components/Template';
import Meme from './Components/Meme';


function App() {
  const [templates, setTemplates] = useState([]);
  const [meme, setMeme] = useState(null);
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        setTemplates(data.data.memes);
        // console.log(data.data.memes)
      });
  }, []);
  return (
    <div className="App">
      <span><h1>Meme Generator</h1></span>
      {meme === null ? (
        <Template templates={templates} setMeme={setMeme} />
      ) : (
        <Meme meme={meme} setMeme={setMeme}/>
      )}
    </div>
  );
}

export default App;


