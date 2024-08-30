'use client';

import { useState } from 'react';
import React from 'react';
import Editor from '@monaco-editor/react';
import styles from '../styles/ProblemCard.module.css';

// Define the types for the props

interface ProblemCardProps {
  title: string;
  description: string;
  defaultCode: string;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ title, description, defaultCode }) => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState(''); // State for storing custom input
  const [output, setOutput] = useState('');  // State for storing the output
  const [runtime, setRuntime] = useState('');
  const compileCode = async () => {

    try {
      const res = await fetch('../api/cppapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, input }),
      });

      const data = await res.json();
      if (data.output){
        let s=data.output;
        for(let i=s.length-1;i>=0;i--){
          if(s[i]===' '){
            setOutput(s.substring(0,i-1)+"\n");
            setRuntime("Runtime : "+s.substring(i+1)+" ms");
            break;
          }
        }
      }
      else{
        if(data.error=="Execution terminated: Process exceeded 5 seconds"){
          setOutput("Time Limit Exceeded\n");
          setRuntime("Runtime : 5000 ms");
        }
        else{

          setOutput(data.error);
          setRuntime("");
        }
        
      }
    } catch (error) {
      setOutput('Error compiling the code\n');
    }
  };

    const descriptionParagraphs = description.split('\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ));

  return (
    <div className={styles.card}>
      <div className={styles.description}>
        <h1>{title}</h1>
        {descriptionParagraphs}
      <div className={styles.buttons}>
        <button
        className={styles.button}
        onClick={compileCode}
        //disabled={!input} // Disable button if no input
      > Run
      </button>
      </div>
      </div>
      <div className={styles.editor}>
        <select name="select" className="w-16 h-8 text-xs bg-black text-white mb-2" id="lang">
            <option value="Cpp">C++</option>
            <option value="C">C</option>
            <option value="Py">Py</option>
        </select>
        <Editor
          height="52vh"
          defaultLanguage="cpp"
          value={code}
          onChange={setCode}
          //defaultValue={defaultCode}
          theme="vs-dark"
          options={{
            insertSpaces: true,
            tabSize: 2,
            minimap: { enabled: false },
            fontSize: 12,
          }}
        />
        <div>
            <div className={styles.example}>
                <div>
                 <h3>Input</h3>
                <textarea className="bg-black rounded-md text-cyan-50 h-20" name="Input" id="" placeholder="Enter custom input here..."value={input}onChange={(e) => setInput(e.target.value)}></textarea>   
                </div>
                <div>
                <h3>Output</h3>
                <textarea className="bg-black rounded-md text-cyan-50 h-20" name="Output" id=""value={output}></textarea> 
                </div>
                
            </div>
        </div>
        
        
      </div>

      
    </div>
  );
};

export default ProblemCard;
