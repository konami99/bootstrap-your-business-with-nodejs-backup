import os from 'os';
import cluster from 'cluster';
import app from './app';
import 'reflect-metadata';

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
    console.log('spawning child process!');
    app.listen(process.env.PORT);
  }
} else {
  app.listen(process.env.PORT);
}

