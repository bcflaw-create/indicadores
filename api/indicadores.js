export default async function handler(req, res) {
  try {
    // Si piden HTML (acceso directo a la página)
    if (req.headers.accept && req.headers.accept.includes('text/html')) {
      return serveHTML(res);
    }

    // Si piden JSON (llamada desde JavaScript)
    const response = await fetch('https://www.banxico.org.mx/ws/WS_Indicadores/Indicadores', {
      headers: {
        'Bmx-Api-Key': 'de4b0afeef5eaea41dc0a0e86e8dc8d3'
      }
    });

    if (!response.ok) {
      throw new Error(`Banxico API: ${response.status}`);
    }

    const data = await response.json();
    const indicadores = data.Indicadores.map(ind => ({
      nombre: ind.Titulo,
      valor: parseFloat(ind.Datos[0].Dato),
      unidad: ind.Unidad,
      fecha: new Date(ind.Datos[0].Fecha + 'T00:00:00').toISOString()
    }));

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ indicadores });

  } catch (error) {
    res.status(500).json({
      error: 'Error fetching indicators',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

function serveHTML(res) {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Indicadores Financieros</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff;color:#2c3e50;line-height:1.6}
.header{text-align:center;padding:40px 20px;background:linear-gradient(135deg,#f5f7fa 0%,#fff 100%)}
h1{font-size:2.2rem;color:#2c3e50;margin-bottom:10px;font-weight:600}
.subtitle{color:#7f8c8d;font-size:0.95rem}
.carousel-wrapper{overflow:hidden;background:#fff;border-top:1px solid #e1e4e8;border-bottom:1px solid #e1e4e8;padding:30px 0}
.carousel-container{display:flex;position:relative;animation:scroll 40s linear infinite;width:fit-content}
.carousel-container:hover{animation-play-state:paused}
@keyframes scroll{
0%{transform:translateX(0)}
100%{transform:translateX(-50%)}
}
.card{flex:0 0 280px;background:#f8f9fa;border:1px solid #e1e4e8;padding:25px;margin:0 12px;border-radius:8px;text-align:center;transition:all 0.3s ease;box-shadow:0 2px 8px rgba(0,0,0,0.04)}
.card:hover{background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.08)}
.card-label{font-size:0.75rem;color:#7f8c8d;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:12px;font-weight:700}
.card-value{font-size:2rem;color:#2c3e50;font-weight:800;margin-bottom:6px}
.card-unit{color:#95a5a6;font-size:0.9rem;margin-bottom:12px;font-weight:500}
.card-date{color:#bdc3c7;font-size:0.8rem;border-top:1px solid #e1e4e8;padding-top:12px;margin-top:12px}
.footer{text-align:center;padding:25px 20px;color:#95a5a6;font-size:0.85rem;background:#f8f9fa;border-top:1px solid #e1e4e8}
.loading{text-align:center;padding:60px 20px;font-size:1.1rem;color:#7f8c8d}
.error{background:#fee;border:1px solid #fcc;color:#c33;padding:25px;margin:20px;border-radius:6px;text-align:center}
</style>
</head>
<body>
<div class="header">
<h1>📊 Indicadores Financieros</h1>
<p class="subtitle">Datos en vivo de Banxico actualizados automáticamente</p>
</div>

<div class="carousel-wrapper">
<div class="carousel-container" id="carousel"></div>
</div>

<div class="footer">
Última actualización: <span id="timestamp">Cargando...</span>
</div>

<script>
async function loadIndicators() {
  try {
    const response = await fetch('/api/indicadores');
    const data = await response.json();
    
    if (data.error || !data.indicadores || data.indicadores.length === 0) {
      document.getElementById('carousel').innerHTML = '<div class="error" style="width:100%">Error: No hay datos disponibles</div>';
      return;
    }

    let html = '';
    data.indicadores.forEach(ind => {
      const valor = parseFloat(ind.valor).toFixed(2);
      const fecha = new Date(ind.fecha).toLocaleDateString('es-MX');
      
      html += \`<div class="card">
        <div class="card-label">\${ind.nombre}</div>
        <div class="card-value">\${valor}</div>
        <div class="card-unit">\${ind.unidad}</div>
        <div class="card-date">\${fecha}</div>
      </div>\`;
    });

    // Duplicar para efecto carrusel infinito
    const carousel = document.getElementById('carousel');
    carousel.innerHTML = html + html;
    
    // Actualizar timestamp
    document.getElementById('timestamp').textContent = new Date().toLocaleString('es-MX');
    
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('carousel').innerHTML = '<div class="error" style="width:100%">Error al cargar los indicadores</div>';
  }
}

// Cargar datos al iniciar
loadIndicators();

// Recargar cada 3600 segundos (1 hora)
setInterval(loadIndicators, 3600000);
</script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).send(html);
}
