export default async function handler(req, res) {
  try {
    // Obtener las noticias del endpoint anterior
    const noticiasResponse = await fetch('https://project-pea2c.vercel.app/api/noticias');
    const data = await noticiasResponse.json();
    
    const noticias = data.noticias || [];
    
    // HTML del carrusel
    const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Noticias Legales</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: #f5f5f5;
    }
    
    .noticias-container {
      width: 100%;
      max-width: 100%;
      overflow: hidden;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .carousel {
      display: flex;
      animation: scroll 30s linear infinite;
      width: fit-content;
    }
    
    .noticia-card {
      min-width: 320px;
      padding: 16px;
      border-right: 1px solid #eee;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 140px;
    }
    
    .noticia-card:last-child {
      border-right: none;
    }
    
    .noticia-titulo {
      color: #16a085;
      background: white;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 8px;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .noticia-fuente {
      color: #333;
      background: white;
      font-size: 11px;
      margin-bottom: 4px;
    }
    
    .noticia-fecha {
      color: #666;
      background: white;
      font-size: 10px;
    }
    
    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-100%);
      }
    }
    
    .carousel:hover {
      animation-play-state: paused;
    }
    
    a {
      text-decoration: none;
      color: inherit;
    }
    
    a:hover .noticia-titulo {
      color: #0d6b53;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="noticias-container">
    <div class="carousel">
      ${noticias.map(noticia => {
        const fecha = new Date(noticia.fecha);
        const fechaFormato = fecha.toLocaleDateString('es-MX', { month: 'short', day: 'numeric' });
        return `
          <a href="${noticia.url}" target="_blank" rel="noopener">
            <div class="noticia-card">
              <div>
                <div class="noticia-titulo">${noticia.titulo}</div>
                <div class="noticia-fuente">${noticia.fuente}</div>
              </div>
              <div class="noticia-fecha">${fechaFormato}</div>
            </div>
          </a>
        `;
      }).join('')}
      ${noticias.map(noticia => {
        const fecha = new Date(noticia.fecha);
        const fechaFormato = fecha.toLocaleDateString('es-MX', { month: 'short', day: 'numeric' });
        return `
          <a href="${noticia.url}" target="_blank" rel="noopener">
            <div class="noticia-card">
              <div>
                <div class="noticia-titulo">${noticia.titulo}</div>
                <div class="noticia-fuente">${noticia.fuente}</div>
              </div>
              <div class="noticia-fecha">${fechaFormato}</div>
            </div>
          </a>
        `;
      }).join('')}
    </div>
  </div>
</body>
</html>
    `;
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(html);
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}
