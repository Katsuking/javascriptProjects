import express, { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

interface Post {
  id: string;
  title: string;
}

const posts: { [key: string]: Post } = {}; // demoなので、データはメモリに保存

app.get('/posts', (req: Request, res: Response) => {
  res.send(posts);
});

app.post('/posts', (req: Request, res: Response) => {
  const id: string = randomBytes(4).toString('hex'); // create a random id
  const { title } = req.body;
  // creeate a post
  posts[id] = {
    id,
    title,
  };

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
