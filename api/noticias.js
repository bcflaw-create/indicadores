export default async function handler(req, res) {
  try {
    const apiKey = '22949e4aa0144fb9a2959bfb71937eec';
    
    // Obtener noticias de Reuters, Bloomberg, AP sobre regulación mexicana y corporate law
    const newsResponse = await fetch(
      `https://newsapi.org/v2/everything?q=(Mexico OR Mexican) AND (law OR regulation OR corporate OR compliance OR fiscal OR tax)&sources=reuters,bloomberg&sortBy=publishedAt&language=en&pageSize=10&apiKey=${apiKey}`
    );
    
    const newsData = await newsResponse.json();
    let noticias = [];
    
    if (newsData.articles && newsData.articles.length > 0) {
      // Filtrar duplicados y tomar solo los primeros 5
      noticias = newsData.articles
        .slice(0, 5)
        .map(article => ({
          titulo: article.title,
          descripcion: article.description || article.content || 'Última información sobre regulaciones y normativas',
          url: article.url,
          fecha: article.publishedAt,
          fuente: article.source.name
        }));
    }
    
    // Si no hay suficientes noticias, agregar placeholder
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
    
    return res.json({ noticias });
    
  } catch (error) {
    console.error('Error:', error.message);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    // Fallback solo si falla NewsAPI
    return res.json({
      noticias: [
        {
          titulo: 'Regulación Corporativa Mexicana',
          descripcion: 'Últimas noticias sobre cambios normativos en México',
          fecha: new Date().toISOString(),
          fuente: 'Reuters',
          url: '#'
        },
        {
          titulo: 'Cambios en Normativa Fiscal',
          descripcion: 'Información sobre reformas fiscales en curso',
          fecha: new Date().toISOString(),
          fuente: 'Bloomberg',
          url: '#'
        },
        {
          titulo: 'Disposiciones Legales',
          descripcion: 'Consulta el Diario Oficial para más información',
          fecha: new Date().toISOString(),
          fuente: 'DOF',
          url: 'https://www.dof.gob.mx'
        }
      ]
    });
  }
}
