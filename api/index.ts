import type { ApiResponse } from "shared";

type VercelRequest = {
  method?: string;
  url?: string;
};

type VercelResponse = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
  text: (data: string) => void;
  end: () => void;
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    if (req.url?.includes('/api/hello')) {
      const data: ApiResponse = {
        message: "Hello BHVR!",
        success: true,
      };
      return res.status(200).json(data);
    }
    
    return res.status(200).text("Hello from API!");
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 