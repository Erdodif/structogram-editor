import React from 'react';
import { Structogram } from './Elements/Structogram';
import json from "./samples/Iteration2.json"
import {StructogramController} from "structogram"

function App() {
  return (
    <div className="App">
      <Structogram controller={StructogramController.fromJson(json)}/>
    </div>
  );
}

export default App;
