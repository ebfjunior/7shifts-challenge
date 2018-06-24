const app = require('./app');
const cluster = require('cluster');
const os = require('os');

const cpus = os.cpus();
if (cluster.isMaster) {
  cpus.forEach(() => {
    cluster.fork();
  });
  cluster.on('listening', (worker) => {
    console.log(`Cluster ${worker.process.pid} connected`);
  });
  cluster.on('disconnect', (worker) => {
    console.log(`Cluster ${worker.process.pid} disconnected`);
  });
  cluster.on('exit', (worker) => {
    console.log(`Cluster ${worker.process.pid} lost`);
    cluster.fork();
  });
} else {
  const server = app.listen(process.env.PORT || 3000, () => {
    const { port } = server.address();
    console.log(`APPLICATION STARTED ON PORT: ${port}!`);
  });
}
