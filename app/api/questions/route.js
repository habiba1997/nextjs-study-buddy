import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const questions = await request.json();
    const filePath = path.join(process.cwd(), 'public', 'data.json');
    await writeFile(filePath, JSON.stringify(questions, null, 2));
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 