// models/Problem.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ProblemDocument extends Document {
  title: string;
  description: string;
  category: string;
  difficulty: string;
  inputFormat: string;
  constraints: string;
  testCases: { input: string; output: string }[];
  solution: string;
}

const ProblemSchema = new Schema<ProblemDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  inputFormat: { type: String, required: true },
  constraints: { type: String, required: true },
  testCases: [
    {
      input: { type: String, required: true },
      output: { type: String, required: true },
    },
  ],
  solution: { type: String, required: true },
});

export const Problem = mongoose.models.Problem || mongoose.model<ProblemDocument>('Problem', ProblemSchema);
