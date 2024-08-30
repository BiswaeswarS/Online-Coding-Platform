
export interface Question {
    id: number;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    category: string;
    status: 'Completed' | 'Coming Soon';
    solutionAvailable: boolean;
  }
  
  export const questions: Question[] = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      category: "Array",
      status: "Completed",
      solutionAvailable: true,
    },
    {
      id: 2,
      title: "Reverse Linked List",
      difficulty: "Hard",
      category: "Linked List",
      status: "Coming Soon",
      solutionAvailable: false,
    },
    {
      id: 3,
      title: "Jump Game",
      difficulty: "Medium",
      category: "Dynamic Programming",
      status: "Completed",
      solutionAvailable: true,
    },
    {
      id: 4,
      title: "Valid Parentheses",
      difficulty: "Easy",
      category: "Stack",
      status: "Completed",
      solutionAvailable: true,
    },
    {
      id: 5,
      title: "Search a 2D Matrix",
      difficulty: "Medium",
      category: "Binary Search",
      status: "Completed",
      solutionAvailable: true,
    },
  ];
  