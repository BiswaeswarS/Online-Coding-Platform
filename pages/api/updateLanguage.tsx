// pages/api/updateLanguage.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { language } = req.body;
  
      // Backend logic to handle the selected language
      console.log('Selected language:', language);
  
      // Respond to the frontend
      res.status(200).json({ message: 'Language updated successfully' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  