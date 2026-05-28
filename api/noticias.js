export default async function handler(req, res) {
  try {
    const apiKey = '22949e4aa0144fb9a2959bfb71937eec';
    
    // Búsqueda más simple y genérica
    const newsResponse = await fetch(
      `https://newsapi.org/v2/everything?q=Mexico law&sortBy=publishedAt&language=en&pageSize=10&apiKey=${apiKey}`
    );
    
    const newsData = await newsResponse.json();
    let noticias = [];
    
    if (newsData.articles && newsData.articles.length > 0) {
      noticias = newsData.articles
        .slice(0, 5)
        .map(article => ({
          titulo: article.title,
          descripcion: article.description || 'Última información sobre regulaciones y normativas',
          url: article.url,
          fecha: article.publishedAt,
          fuente: article.source.name
        }));
    }
    
    // Si no hay noticias, agregar del DOF
    if (noticias.length < 3) {
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
    
    return res.json({
      noticias: [
        {
          titulo: 'Regulación Corporativa en México',
          descripcion: 'Últimas noticias sobre cambios normativos',
          fecha: new Date().toISOString(),
          fuente: 'Noticias',
          url: '#'
        },
        {
          titulo: 'Reforma Fiscal Mexicana',
          descripcion: 'Información sobre cambios en normativa fiscal',
          fecha: new Date().toISOString(),
          fuente: 'Noticias',
          url: '#'
        },
        {
          titulo: 'Cumplimiento Corporativo',
          descripcion: 'Disposiciones legales vigentes',
          fecha: new Date().toISOString(),
          fuente: 'DOF',
          url: 'https://www.dof.gob.mx'
        }
      ]
    });
  }
}
