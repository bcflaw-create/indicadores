export default async function handler(req, res) {
  try {
    const apiKey = '22949e4aa0144fb9a2959bfb71937eec';
    
    // Búsqueda específica para noticias mexicanas de regulación
    const newsResponse = await fetch(
      `https://newsapi.org/v2/everything?q="Mexico" OR "Mexican" OR "CDMX" OR "Banxico" OR "SAT" OR "INAI" OR "reforma fiscal" OR "regulación mexicana"&sortBy=publishedAt&language=en&pageSize=20&apiKey=${apiKey}`
    );
    
    const newsData = await newsResponse.json();
    let noticias = [];
    
    if (newsData.articles && newsData.articles.length > 0) {
      // Filtrar para asegurar que son de México
      noticias = newsData.articles
        .filter(article => 
          article.title.toLowerCase().includes('mexico') || 
          article.title.toLowerCase().includes('mexican') ||
          article.description?.toLowerCase().includes('mexico') ||
          article.description?.toLowerCase().includes('mexican')
        )
        .slice(0, 5)
        .map(article => ({
          titulo: article.title,
          descripcion: article.description || 'Información sobre regulaciones y normativas en México',
          url: article.url,
          fecha: article.publishedAt,
          fuente: article.source.name
        }));
    }
    
    // Si no hay suficientes noticias, agregar referencia al DOF
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
    
    return res.json({
      noticias: [
        {
          titulo: 'Regulación Corporativa en México',
          descripcion: 'Últimas noticias sobre cambios normativos mexicanos',
          fecha: new Date().toISOString(),
          fuente: 'Noticias Legales',
          url: 'https://www.dof.gob.mx'
        },
        {
          titulo: 'Reforma Fiscal Mexicana',
          descripcion: 'Información sobre cambios en normativa fiscal en México',
          fecha: new Date().toISOString(),
          fuente: 'Noticias Legales',
          url: 'https://www.dof.gob.mx'
        },
        {
          titulo: 'Cumplimiento Corporativo en México',
          descripcion: 'Disposiciones legales vigentes para empresas mexicanas',
          fecha: new Date().toISOString(),
          fuente: 'DOF',
          url: 'https://www.dof.gob.mx'
        }
      ]
    });
  }
}
