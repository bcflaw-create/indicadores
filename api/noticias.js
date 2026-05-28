export default async function handler(req, res) {
  try {
    const apiKey = '22949e4aa0144fb9a2959bfb71937eec';
    
    // Obtener noticias de Reuters, Bloomberg, AP sobre regulación mexicana
    const newsResponse = await fetch(
      `https://newsapi.org/v2/everything?q=(Mexico OR Mexican) AND (law OR regulation OR corporate OR compliance)&sources=reuters,bloomberg&sortBy=publishedAt&language=en&pageSize=3&apiKey=${apiKey}`
    );
    
    const newsData = await newsResponse.json();
    let noticias = [];
    
    if (newsData.articles) {
      noticias = newsData.articles.map(article => ({
        titulo: article.title,
        descripcion: article.description,
        url: article.url,
        fecha: article.publishedAt,
        fuente: article.source.name
      }));
    }
    
    // Simulamos noticias del DOF (en producción, harías scraping)
    const noticiasDoF = [
      {
        titulo: 'Reforma Fiscal 2026 - Nuevas Disposiciones',
        descripcion: 'Cambios en obligaciones fiscales para empresas medianas',
        fecha: new Date().toISOString(),
        fuente: 'DOF',
        url: 'https://www.dof.gob.mx'
      },
      {
        titulo: 'Decreto de Cumplimiento Normativo',
        descripcion: 'Actualización de requisitos de compliance corporativo',
        fecha: new Date(Date.now() - 86400000).toISOString(),
        fuente: 'DOF',
        url: 'https://www.dof.gob.mx'
      }
    ];
    
    // Combinar: 2 del DOF + 3 de Reuters/Bloomberg
    const todasLasNoticias = [...noticiasDoF, ...noticias].slice(0, 5);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    return res.json({ noticias: todasLasNoticias });
    
  } catch (error) {
    console.error('Error:', error.message);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    // Fallback si las APIs fallan
    return res.json({
      noticias: [
        {
          titulo: 'Reforma Fiscal 2026',
          descripcion: 'Nuevas disposiciones en obligaciones fiscales',
          fecha: new Date().toISOString(),
          fuente: 'DOF',
          url: '#'
        },
        {
          titulo: 'Cumplimiento Normativo Actualizado',
          descripcion: 'Cambios en requisitos de compliance corporativo',
          fecha: new Date().toISOString(),
          fuente: 'DOF',
          url: '#'
        },
        {
          titulo: 'Regulación Corporativa Mexicana',
          descripcion: 'Última actualización de normativas empresariales',
          fecha: new Date().toISOString(),
          fuente: 'Reuters',
          url: '#'
        }
      ],
      source: 'fallback'
    });
  }
}
