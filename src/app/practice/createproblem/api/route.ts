// app/api/problems/route.ts
import { NextResponse } from 'next/server';
import connectToDatabase from '../lib/mongodb';
import { Problem } from '../models/problem';

export async function POST(req: Request) {
  try {
    await connectToDatabase(); // Ensure the database connection is established
    
    const body = await req.json(); // Parse the JSON body of the request

    // Validate the request body
    if (!body.title || !body.description || !body.category || !body.difficulty || !body.inputFormat || !body.constraints || !body.testCases || !body.solution) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a new problem document
    const problem = new Problem(body);

    // Save the problem document to the database
    await problem.save();

    // Return a successful response
    return NextResponse.json(
      { success: true, data: problem },
      { status: 201 }
    );
  } catch (error) {
    // Improved error handling
    if (error instanceof Error) {
      // Handle error if it's an instance of Error
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    } else {
      // Handle other types of errors
      return NextResponse.json(
        { success: false, error: 'An unknown error occurred' },
        { status: 500 }
      );
    }
  }
}

// // app/api/problems/route.ts

// import { NextResponse } from 'next/server';
// import { emitProblemUpdate } from './streams/route';

// export async function GET() {
//   const { readable, writable } = new TransformStream();
//   const writer = writable.getWriter();

//   // Simulating streaming data
//   const intervalId = setInterval(() => {
//     const newProblem = {
//       title: 'Example Problem',
//       description: 'This is an example problem',
//       difficulty: 'easy',
//     };

//     // Call emitProblemUpdate with both arguments
//     emitProblemUpdate(writer, newProblem);
//   }, 5000);

//   readable.pipeTo(
//     new WritableStream({
//       close() {
//         clearInterval(intervalId);
//       },
//     })
//   );

//   return new NextResponse(readable, {
//     headers: {
//       'Content-Type': 'text/event-stream',
//       'Cache-Control': 'no-cache',
//       Connection: 'keep-alive',
//     },
//   });
// }

// export async function GET() {
//     return new NextResponse('Test response', {
//       headers: {
//         'Content-Type': 'text/plain',
//       },
//     });
//   }