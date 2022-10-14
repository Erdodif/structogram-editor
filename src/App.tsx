import React from 'react';
import './App.css';
import './Elements/Statement';
import Structogram from './Elements/Structogram';
import json from"./PreMade/structogram.json";

function App():JSX.Element {
  return (
    <div className="App">
      <Structogram json={json}/>
    </div>
  );
}

export default App;
