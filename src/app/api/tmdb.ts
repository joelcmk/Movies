// pages/api/tmdb.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const tmdbApiKey = process.env.NEXT_PUBLIC_TMDB_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}`
    );
    const data = await response.json();

    return res.status(200).json(data);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};

export default handler;
