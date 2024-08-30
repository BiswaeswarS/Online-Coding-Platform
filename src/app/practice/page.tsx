"use client"

import "./page.css";
import Link from "next/link";
import React from "react";
import { questions } from './data/questions';
import { useRouter } from 'next/navigation';
import Navbar from "./component/navbar";
import { useEffect, useState } from 'react';
interface DataItem{
  title:string;
  difficulty:string;
  category:string;
  solution:string;
  description:string;
}

export default function Home() {


  const [data, setData] = useState<DataItem[]>([]);
  const router = useRouter();
  const handleClick = (index: number) => {
    const serializedData = encodeURIComponent(JSON.stringify(data[index]));
    router.push(`/practice/other?data=${serializedData}`);
  };
  useEffect(() => {
    fetch('/api/getData')
      .then((response) => response.json())
      .then((json) => {
        const filteredData = json.map((item: any) => ({
          title: item.title,
          difficulty: item.difficulty,
          category: item.category,
          solution:item.solution,
          description: item.description,
        }));
        setData(filteredData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  

  return (
    
    <main>
      <Navbar/>
      <div className="outer">
      <div className="container">
        <div className="upper">
          <h1 className="header">QUESTIONS</h1>
            
            <Link href="./practice/createproblem">
            <h2 className="abc">
              ADD PROBLEM
            </h2>
            </Link>

          
        </div>
      
      <table className="question-table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Category</th>
            <th>Solution</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item,index) => (
            <tr key={index} >
              
              <td>
                
                    {index+1}
                
                
                </td>
                
                <td> <button onClick={() => handleClick(index)}>
                    {item.title}
                    </button></td>
              <td className={item.difficulty.toLowerCase()}>{item.difficulty}</td>
              <td>{item.category}</td>
              <td>
                {item.solution!='' ? (
                  <a href="#" className="solbutton">Click</a>
                ) : (
                  <span>Coming soon</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </main>
  );
}
