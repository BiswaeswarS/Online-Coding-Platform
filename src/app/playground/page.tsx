'use client';

import { useState } from 'react';
import Editor from './components/Editor';
import './page.css';
import Navbar from "../practice/component/navbar";


export default function Home() {
  const [code, setCode] = useState('// Write your C++ code here');
  const [input, setInput] = useState(''); // State for storing custom input
  const [output, setOutput] = useState('');  // State for storing the output
  const [runtime, setRuntime] = useState('');

  const compileCode = async () => {

    try {
      const res = await fetch('api/cppapi', {
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

  return (
    <div>
  <Navbar/>
  <div className='ddd'>
    <div className="container">
      <div className='left'>
        <Editor value={code} onChange={setCode} />
        <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={compileCode}
        //disabled={!input} // Disable button if no input
      > Compile
      </button>
      </div>
        <div className='right'>
        <textarea
        className="in"
        placeholder="Enter custom input here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <p className="out">
        {output}{/* Display the output */}
        <br />
        
      </p>
      <p className='flex bg-black text-white rounded-md text-xs w-32 justify-center'>{runtime}</p>
        </div>
      
    </div>
    </div>
    </div>
  );
}
