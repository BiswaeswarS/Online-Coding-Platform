// components/ProblemForm.tsx
'use client'
import { useState } from 'react';
import './form.css';

interface ProblemFormProps {
  onSubmit: (data: any) => void;
}

const ProblemForm: React.FC<ProblemFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [inputFormat, setInputFormat] = useState('');
  const [constraints, setConstraints] = useState('');
  const [testCases, setTestCases] = useState([{ input: '', output: '' }]);
  const [solution, setSolution] = useState('');

  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: '', output: '' }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title,description, category,difficulty,inputFormat, constraints, testCases,solution });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Category:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
      </div>

      <div>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div>
        <label>Input Format:</label>
        <textarea value={inputFormat} onChange={(e) => setInputFormat(e.target.value)} required />
      </div>
      <div>
        <label>Constraints:</label>
        <textarea value={constraints} onChange={(e) => setConstraints(e.target.value)} required />
      </div>
      <div>
        <label>Test Cases:</label>
        {testCases.map((testCase, index) => (
          <div className="test-case" key={index}>
            <textarea
              
              placeholder="Input"
              value={testCase.input}
              onChange={(e) =>
                setTestCases(
                  testCases.map((tc, i) =>
                    i === index ? { ...tc, input: e.target.value } : tc
                  )
                )
              }
              required
            />
            <textarea
              placeholder="Output"
              value={testCase.output}
              onChange={(e) =>
                setTestCases(
                  testCases.map((tc, i) =>
                    i === index ? { ...tc, output: e.target.value } : tc
                  )
                )
              }
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddTestCase}>
          Add Test Case
        </button>
      </div>

      <div>
        <label>Solution:</label>
        <textarea value={solution} onChange={(e) => setSolution(e.target.value)} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProblemForm;

