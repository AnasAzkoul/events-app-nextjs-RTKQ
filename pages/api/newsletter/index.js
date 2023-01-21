import { connectToDB, insertDocument } from '../../../db/db';


async function handler (req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email; 
    
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({message: 'Invalid Email Address'}); 
      return; 
    }
    
    const client = await connectToDB()
    await insertDocument(client, {email: userEmail}, 'newsletter'); 
    
    return res.status(201).json({message: 'success', userEmail}); 
  } else {
    res.status(200).json({message: 'This is working again'}); 
  }
}

export default handler
