export default async function handler(req, res) {
  try {
    // Obtener noticias de Legamy
    const legamyResponse = await fetch('https://legamy.com/noticias', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const html = await legamyResponse.text();
    
    // Extraer noticias del HTML
    const noticias = [];
    
    // Patrón para extraer títulos y fechas
    const regex = /<h2[^>]*>([^<]+)<\/h2>|<div[^>]*class="[^"]*fecha[^"]*"[^>]*>([^<]+)<\/div>/gi;
    const matches = html.matchAll(regex);
    
    let newsArray = [];
    let i = 0;
    
    // Buscar elementos con estructura de noticia
    const newsPattern = /<article[^>]*>|<div[^>]*class="[^"]*noticia[^"]*"[^>]*>(.*?)<\/div>/gis;
    const newsMatches = Array.from(html.matchAll(newsPattern));
    
    // Método alternativo: extraer por párrafos y encabezados
    const lines = html.split('\n');
    let currentNews = {};
    
    for (let j = 0; j < Math.min(lines.length, 500) && noticias.length < 5; j++) {
      const line = lines[j];
      
      // Buscar títulos
      if (line.includes('<h2') || line.includes('<h3')) {
        const titleMatch = line.match(/>([^<]{20,150})</);
        if (titleMatch && titleMatch[1].length > 10) {
          currentNews.titulo = titleMatch[1].trim();
        }
      }
      
      // Buscar fechas
      if (line.includes('mayo') || line.includes('May') || /\d{1,2}\s*(de|of)\s*(mayo|May)/.test(line)) {
        const dateMatch = line.match(/(\d{1,2}\s*(de\s+)?mayo.*?\d{4}|\d{1,2}.*?May.*?\d{4})/i);
        if (dateMatch) {
          currentNews.fecha = dateMatch[0].trim();
        }
      }
      
      // Si tenemos título y fecha, agregar a noticias
      if (currentNews.titulo && currentNews.fecha && noticias.length < 5) {
        if (!noticias.some(n => n.titulo === currentNews.titulo)) {
          noticias.push({
            titulo: currentNews.titulo,
            descripcion: 'Última información sobre regulaciones mexicanas',
            url: 'https://legamy.com/noticias',
            fecha: new Date().toISOString(),
            fuente: 'Legamy'
          });
          currentNews = {};
        }
      }
    }
    
    // Si no encontramos suficientes, agregar fallback del DOF
    if (noticias.length < 5) {
      noticias.push({
        titulo: 'Últimas Disposiciones Fiscales',
        descripcion: 'Consulta las disposiciones más recientes en el Diario Oficial de la Federación',
        url: 'https://www.dof.gob.mx',
        fecha: new Date().toISOString(),
        fuente: 'DOF'
      });
    }
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    return res.json({ noticias: noticias.slice(0, 5) });
    
  } catch (error) {
    console.error('Error:', error.message);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    // Fallback
    return res.json({
      noticias: [
        {
          titulo: 'Regulación Corporativa en México',
          descripcion: 'Últimas noticias sobre cambios normativos mexicanos',
          fecha: new Date().toISOString(),
          fuente: 'Legamy',
          url: 'https://legamy.com/noticias'
        },
        {
          titulo: 'Reforma Fiscal Mexicana',
          descripcion: 'Información sobre cambios en normativa fiscal',
          fecha: new Date().toISOString(),
          fuente: 'DOF',
          url: 'https://www.dof.gob.mx'
        }
      ]
    });
  }
}
