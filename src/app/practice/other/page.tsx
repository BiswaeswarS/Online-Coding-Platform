"use client"

import React from 'react';
import Editor from '@monaco-editor/react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProblemCard from '../component/ProblemCard';
import Navbar from "../component/navbar";
import { useEffect, useState } from 'react';


export default function Home() {
  const problemData = {
    title: '1. Two Sum',
    description: `
      Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      Explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
    `,
    
    defaultCode: `// C++ code
#include <bits/stdc++.h>
using namespace std;

int main() {
    cout<<"Hello World!";
    return 0;
}
`
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState(problemData);


useEffect(() => {
  const serializedData = searchParams?.get('data');
  if (serializedData) {
    const parsedData = JSON.parse(decodeURIComponent(serializedData));
    setData(parsedData);
  }
}, [searchParams]);

  return (
    <div>
      <Navbar/>
      <ProblemCard
        title={data.title}
        description={data.description}
        defaultCode={data.defaultCode}
      />
    </div>
  );
};

