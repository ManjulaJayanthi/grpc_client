
import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import { thumbs_down_event, thumbs_up_event } from './grpc';
import path from 'path';
import cors from 'cors';

dotenv.config();

var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
const app: Application = express();
const port = process.env.GRPC_CLIENT_PORT || 8080;

app.get('/', (req: Request, res: Response) => {
  res.send('Grpc Client is alive');
});

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'view')));

// console.log("path ", path.join(__dirname, 'view'))
app.get('/index', (req: Request, res: Response) => {
  console.log(path.join(__dirname, '/view/view.html'))
  res.sendFile(path.join(__dirname, '/view/view.html'));
});

app.post('/thumbs_upppp', (req: Request, res: Response) => {
  thumbs_up_event(req)
    .then(
      (val) => {
        console.log("Done");
        return 'done2';
      },
      (err) => console.error(err)
    )
})

app.post('/thumbs_down', (req: Request, res: Response) => {
  thumbs_down_event(req)
    .then(
      (val) => {
        console.log("Done");
        return 'done2';
      },
      (err) => console.error(err)
    )
})

app.listen(port, () => {
  console.log(`Grpc Client is running at http://localhost:${port}`);
});