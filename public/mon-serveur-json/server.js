const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Définir le chemin du fichier à servir
  const filePath = path.join(__dirname, req.url === '/' ? 'recipes.json' : req.url);
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
  });
});

// Démarrer le serveur sur le port 8000
server.listen(8000, () => {
  console.log('Serveur écoute sur http://localhost:8000');
});
