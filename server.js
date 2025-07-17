const express = require('express');
const request = require('request');
const cors = require('cors'); // Adicione o CORS
const app = express();

// Habilita o CORS para todas as origens
app.use(cors());

app.get('/stream', (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  // Passa a requisição para a URL original e envia a resposta de volta
  try {
    request({ url: url, headers: { 'Referer': url } }) // Adicionar um Referer pode ajudar
      .on('error', (e) => res.status(500).send('Proxy error: ' + e.message))
      .pipe(res);
  } catch (e) {
    res.status(500).send('Failed to process request.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy HLS ativo na porta ${PORT}`);
});