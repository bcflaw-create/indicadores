export default async function handler(req, res) {
  try {
    // Obtener las noticias del endpoint anterior
    const noticiasResponse = await fetch('https://project-pea2c.vercel.app/api/noticias');
    const data = await noticiasResponse.json();
    
    const noticias = data.noticias || [];
    
    // HTML del carrusel mejorado
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
      padding: 20px;
    }
    
    .noticias-container {
      width: 100%;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      padding: 20px;
    }
    
    .noticias-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }
    
    .noticia-card {
      border-left: 4px solid #16a085;
      padding: 16px;
      background: #f9f9f9;
      border-radius: 4px;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    
    .noticia-card:hover {
      background: #f0f7f5;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(22, 160, 133, 0.15);
    }
    
    .noticia-fuente {
      display: inline-block;
      background: #16a085;
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    
    .noticia-titulo {
      color: #2c3e50;
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 10px;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .noticia-card:hover .noticia-titulo {
      color: #16a085;
    }
    
    .noticia-descripcion {
      color: #666;
      font-size: 13px;
      line-height: 1.5;
      margin-bottom: 12px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .noticia-fecha {
      color: #999;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .noticia-link {
      color: #16a085;
      font-size: 12px;
      font-weight: 600;
      text-decoration: none;
    }
    
    .noticia-link:hover {
      text-decoration: underline;
    }
    
    a {
      text-decoration: none;
      color: inherit;
    }
  </style>
</head>
<body>
  <div class="noticias-container">
    <div class="noticias-grid">
      ${noticias.map(noticia => {
        const fecha = new Date(noticia.fecha);
        const fechaFormato = fecha.toLocaleDateString('es-MX', { month: 'short', day: 'numeric', year: 'numeric' });
        const descripcion = noticia.descripcion || 'Última información sobre regulaciones y normativas';
        return `
          <a href="${noticia.url}" target="_blank" rel="noopener">
            <div class="noticia-card">
              <div class="noticia-fuente">${noticia.fuente}</div>
              <div class="noticia-titulo">${noticia.titulo}</div>
              <div class="noticia-descripcion">${descripcion}</div>
              <div class="noticia-fecha">
                <span>${fechaFormato}</span>
                <span class="noticia-link">Leer más →</span>
              </div>
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
