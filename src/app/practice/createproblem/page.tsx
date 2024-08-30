// app/create-problem/page.tsx
'use client'
import ProblemForm from './component/problemform';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    const response = await fetch('createproblem/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
        alert("Uploaded Successfully")
      router.push('/practice'); // Redirect to another page after submission
    } else {
      console.error('Failed to submit problem');
    }
  };

  return (
    <div>
      <h1><center>Create a New Problem</center></h1>
      <ProblemForm onSubmit={handleSubmit} />
    </div>
  );
};


