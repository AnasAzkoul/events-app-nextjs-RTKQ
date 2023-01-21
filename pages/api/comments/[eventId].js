import {
  connectToDB,
  insertDocument,
  getCollectionSortedByID,
} from '../../../db/db';

async function handler(req, res) {
  const eventId = req.query.eventId;
  let client
  
  try {
    client = await connectToDB(); 
  } catch (error) {
    res.status(500).json({message: 'could not connect to the database, please try again later.'}); 
    return; 
  }

  if (req.method === 'POST') {
    const {email, name, text} = req.body;
    
    console.log(req.body); 

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId
    };
    
    try {
      await insertDocument(client, newComment, 'comments');
    } catch (error) {
      res.status(500).json({message: 'Failed to insert data'}); 
      return; 
    }
    
    return res.status(201).json({message: 'success', newComment});
    
  } else {
    let comments; 
    
    try {
      comments = await getCollectionSortedByID(client, 'comments', {_id: - 1}); 
    } catch (error) {
      res.status(500).json('Failed to fetch data from the database'); 
      return; 
    }

    return res.status(200).json({comments}); 
  }
}

export default handler;
