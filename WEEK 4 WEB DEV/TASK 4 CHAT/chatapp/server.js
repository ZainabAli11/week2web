const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const clients = new Map();
const server = http.createServer((req, res) => {
  let filePath = './public' + (req.url === '/' ? '/login.html' : req.url);
  let ext = path.extname(filePath);
  let type = { '.js': 'text/javascript', '.css': 'text/css' }[ext] || 'text/html';
  fs.readFile(filePath, (err, content) => {
    if (err) { res.writeHead(404); res.end('Not Found'); }
    else { res.writeHead(200, { 'Content-Type': type }); res.end(content); }
  });
});
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
  const id = Date.now().toString();
  ws.on('message', (msg) => {
    const data = JSON.parse(msg);
    if (data.type === 'init') {
      clients.set(id, { ws, user: data.user, avatar: data.avatar });
      updateUsers();
    }
    if (data.type === 'message') {
      const payload = { type: 'message', msg: data.msg, user: data.user, avatar: data.avatar };
      if (data.to && data.to !== 'all') {
        const receiver = clients.get(data.to);
        if (receiver) receiver.ws.send(JSON.stringify(payload));
        ws.send(JSON.stringify(payload));
      } else {
        clients.forEach(c => c.ws.send(JSON.stringify(payload)));
      }
    }
  });
  ws.on('close', () => { clients.delete(id); updateUsers(); });
  function updateUsers() {
    const users = Array.from(clients.entries()).map(([id, c]) => ({ id, user: c.user, avatar: c.avatar }));
    const payload = JSON.stringify({ type: 'users', users });
    clients.forEach(c => c.ws.send(payload));
  }
});
server.listen(3000, () => console.log('Server on http://localhost:3000'));
