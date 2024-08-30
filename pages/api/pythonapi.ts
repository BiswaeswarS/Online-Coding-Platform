import type { NextApiRequest, NextApiResponse } from 'next';
import compile from '../../src/app/playground/compilers/pythoncompiler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { code, input } = body;
      

      if (!code) {
        return res.status(400).json({ error: 'Code is required' });
      }

      let output = await compile(code, input);
      //output = output.replace(/\r\n/g, '\n');
      return res.status(200).json({ output:output });

    } catch (stderr) {
      console.error(stderr);
      return res.status(400).json({ error:stderr });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
