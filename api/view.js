export default async function handler(req, res) {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Indicadores Financieros</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff;color:#2c3e50}
h1{text-align:center;padding:40px 20px;font-size:2.2rem;font-weight:700;color:#16a085;letter-spacing:0.5px}
.carousel-wrapper{overflow:hidden;padding:30px 20px;background:#f8f9fa;border-top:1px solid #e1e4e8;border-bottom:1px solid #e1e4e8}
.carousel{display:flex;animation:scroll 40s linear infinite;width:fit-content}
.carousel:hover{animation-play-state:paused}
@keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.card{flex:0 0 280px;background:#fff;border:2px solid #e1e4e8;padding:25px;margin:0 12px;border-radius:10px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.05);transition:all 0.3s ease}
.card:hover{transform:translateY(-5px);box-shadow:0 8px 20px rgba(22,160,133,0.15);border-color:#16a085}
.label{font-size:0.75rem;color:#16a085;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:12px;font-weight:700}
.value{font-size:2.1rem;color:#2c3e50;font-weight:800;margin-bottom:8px}
.unit{color:#5a5a5a;font-size:0.95rem;margin-bottom:12px;font-weight:600}
.date{color:#888;font-size:0.8rem;border-top:1px solid #e1e4e8;padding-top:12px;margin-top:12px}
.footer{text-align:center;padding:25px;color:#16a085;font-size:0.9rem;background:#f8f9fa;font-weight:600}
</style>
</head>
<body>
<h1>📊 Indicadores Financieros Banxico</h1>
<div class="carousel-wrapper">
<div class="carousel" id="c"></div>
</div>
<div class="footer">Actualizado: <span id="fecha">Cargando...</span></div>
<script>
async function cargar(){try{const r=await fetch('/api/indicadores');const d=await r.json();let h='';d.indicadores.forEach(i=>{h+=\`<div class="card"><div class="label">\${i.nombre}</div><div class="value">\${parseFloat(i.valor).toFixed(2)}</div><div class="unit">\${i.unidad}</div><div class="date">\${new Date(i.fecha).toLocaleDateString('es-MX')}</div></div>\`});document.getElementById('c').innerHTML=h+h;document.getElementById('fecha').textContent=new Date().toLocaleString('es-MX')}catch(e){console.error(e)}}
cargar();setInterval(cargar,3600000);
</script>
</body>
</html>`;
  res.setHeader('Content-Type','text/html; charset=utf-8');
  res.send(html);
}
