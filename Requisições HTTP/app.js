const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'GET') {
    switch (url) {
      case '/':
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Pagina inicial');
        break;
      case '/api/data':
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ data: 'Exemplo de dados' }));
        break;
      default:
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Pagina nao encontrada');
    }
  } else if (method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Dados recebidos com sucesso');
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Erro ao processar dados');
      }
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Metodo nao permitido');
  }
});

server.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});
