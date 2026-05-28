export default async function handler(req, res) {
  try {
    const response = await fetch('https://bcflaw.mx/noticias.php');
    
    if (!response.ok) {
      throw new Error(`PHP error: ${response.status}`);
    }
    
    const data = await response.json();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    return res.json(data);
    
  } catch (error) {
    console.error('Error:', error.message);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    return res.json({
      noticias: [
        {
          titulo: 'Últimas noticias legales',
          descripcion: 'Consulta Legamy para información actualizada',
          fecha: new Date().toISOString(),
          fuente: 'Legamy',
          url: 'https://legamy.com/noticias'
        }
      ]
    });
  }
}
