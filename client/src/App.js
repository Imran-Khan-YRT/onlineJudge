import { useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp")
  const handleSubmit = async () => {
    const payload = {
      language: language,
      code: code
    }

    try {
      const { data } = await axios.post("http://localhost:3001/run", payload);
      setOutput(data.output);
      console.log(data);
    }
    catch ({ response }) {
      if (response) {
        const errMsg = response.data.err.stderr
        setOutput(errMsg)
      }
      else {
        setOutput("Error connecting to the server.Please check your connection!")
      }
    }
  }
  return (
    <div className="App">
      <h1>Online Code Compiler</h1>
      <div>
        <label>Language : </label>
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
      </div>
      <br />
      <textarea rows={20} value={code} onChange={(e) => { setCode(e.target.value) }}></textarea>
      <br />
      <button className='submit_btn' onClick={handleSubmit}>Submit</button>
      <br />
      {output && <h3 >Output : </h3>}
      <p>{output}</p>
    </div>
  );
}

export default App;
