import express, { Request, Response, NextFunction } from 'express';
import os from 'os';
import cluster from 'cluster';
import { json } from 'body-parser';
import todoRoutes from './routes/todos';

const clusterWorkerSize = os.cpus().length;

if (clusterWorkerSize > 1) {
  if (cluster.isMaster) {
    console.log('spawning master');
    for (let i=0; i < clusterWorkerSize; i++) {
      cluster.fork()
    }

    cluster.on("exit", function(worker) {
      console.log("Worker", worker.id, " has exitted.")
    })
  } else {
    console.log('spawning child process');
    const app = express();

    app.use(json());

    app.use('/todos', todoRoutes);

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      res.status(500).json({ message: err.message });
    });

    app.listen(process.env.PORT);
  }
} else {
  const app = express();

  app.use(json());

  app.use('/todos', todoRoutes);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
  });

  app.listen(process.env.PORT);
}

