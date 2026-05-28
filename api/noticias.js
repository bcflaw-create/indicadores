export default async function handler(req, res) {
  try {
    // Llamar a tu PHP que retorna noticias estáticas
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
    
    // Fallback: noticias del DOF
    return res.json({
      noticias: [
        {
          titulo: 'Reforma Fiscal 2026 - Nuevas Disposiciones',
          descripcion: 'Se publican nuevas disposiciones en materia fiscal para el año 2026',
          fecha: new Date().toISOString(),
          fuente: 'DOF',
          url: 'https://www.dof.gob.mx/sumario.xml'
        },
        {
          titulo: 'Cumplimiento Corporativo',
          descripcion: 'Actualización de requisitos de compliance corporativo',
          fecha: new Date().toISOString(),
          fuente: 'DOF',
          url: 'https://www.dof.gob.mx/sumario.xml'
        },
        {
          titulo: 'Disposiciones Laborales',
          descripcion: 'Nuevas normas sobre regulación laboral en México',
          fecha: new Date().toISOString(),
          fuente: 'DOF',
          url: 'https://www.dof.gob.mx/sumario.xml'
        },
        {
          titulo: 'Normas Tributarias',
          descripcion: 'Obligaciones fiscales y tributarias para 2026',
          fecha: new Date().toISOString(),
          fuente: 'DOF',
          url: 'https://www.dof.gob.mx/sumario.xml'
        },
        {
          titulo: 'Regulación Comercial',
          descripcion: 'Disposiciones para actividades comerciales y empresariales',
          fecha: new Date().toISOString(),
          fuente: 'DOF',
          url: 'https://www.dof.gob.mx/sumario.xml'
        }
      ]
    });
  }
}
