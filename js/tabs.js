/* Inicialización de tabs reutilizable */
function initTabs(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const buttons = container.querySelectorAll('.tab-btn');
  const panels = container.querySelectorAll('.tab-panel');

  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      panels[i].classList.add('active');
    });
  });
}

/* Tablas expandibles */
function initExpandable(tableId) {
  const table = document.getElementById(tableId);
  if (!table) return;

  table.querySelectorAll('.row-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const detail = trigger.nextElementSibling;
      const isOpen = trigger.classList.contains('open');

      table.querySelectorAll('.row-trigger').forEach(t => t.classList.remove('open'));
      table.querySelectorAll('.row-detail').forEach(d => d.classList.remove('open'));

      if (!isOpen) {
        trigger.classList.add('open');
        if (detail && detail.classList.contains('row-detail')) {
          detail.classList.add('open');
        }
      }
    });
  });
}

/* Timeline clicable */
function initTimeline(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.querySelectorAll('.timeline-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;
      const isActive = trigger.classList.contains('active');

      container.querySelectorAll('.timeline-trigger').forEach(t => t.classList.remove('active'));
      container.querySelectorAll('.timeline-content').forEach(c => c.classList.remove('active'));

      if (!isActive) {
        trigger.classList.add('active');
        if (content && content.classList.contains('timeline-content')) {
          content.classList.add('active');
        }
      }
    });
  });
}

/* Selector de estadios */
function initStages(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const buttons = container.querySelectorAll('.stage-btn');
  const panels = container.querySelectorAll('.stage-panel');

  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      panels[i].classList.add('active');
    });
  });

  if (buttons.length > 0) {
    buttons[0].click();
  }
}

/* Tabla diferencial con highlight de columna */
function initDiffTable(tableId) {
  const table = document.getElementById(tableId);
  if (!table) return;

  const venoso = table.querySelectorAll('.col-v');
  const arterial = table.querySelectorAll('.col-a');

  function highlight(cells, cls) {
    cells.forEach(c => c.classList.add(cls));
  }

  function unhighlight(cells, cls) {
    cells.forEach(c => c.classList.remove(cls));
  }

  venoso.forEach(cell => {
    cell.addEventListener('mouseenter', () => highlight(venoso, 'highlight-v'));
    cell.addEventListener('mouseleave', () => unhighlight(venoso, 'highlight-v'));
  });

  arterial.forEach(cell => {
    cell.addEventListener('mouseenter', () => highlight(arterial, 'highlight-a'));
    cell.addEventListener('mouseleave', () => unhighlight(arterial, 'highlight-a'));
  });
}

/* SVG capas de piel */
function initSkinDiagram() {
  const layers = document.querySelectorAll('.skin-layer');
  const panel = document.getElementById('skin-info-panel');
  if (!layers.length || !panel) return;

  const data = {
    'stratum-corneum': {
      title: 'Estrato córneo',
      content: `<p>Capa más externa de la epidermis, compuesta por <strong>corneocitos</strong> (queratinocitos anucleados y aplanados) embebidos en una matriz lipídica (ceramidas, colesterol, ácidos grasos libres).</p>
      <ul>
        <li>Grosor variable: 10–20 μm en zonas delgadas; hasta 600 μm en palmas y plantas.</li>
        <li>Función primordial: <strong>barrera físicoquímica</strong> contra pérdida transepidérmica de agua (PTEA) y penetración de agentes externos.</li>
        <li>Relevancia clínica: la disrupción de esta capa (cicatrices, úlceras, quemaduras) compromete la función barrera e incrementa el riesgo infeccioso.</li>
      </ul>`
    },
    'epidermis': {
      title: 'Epidermis',
      content: `<p>Epitelio escamoso estratificado avascular. Sus capas de profundo a superficial son: estrato basal, espinoso, granuloso, lúcido (solo en palmas/plantas) y córneo.</p>
      <ul>
        <li>Tiempo de renovación (turnover): <strong>28–45 días</strong> en adulto sano; se acelera en psoriasis, se ralentiza en cicatrices queloides.</li>
        <li>Células principales: queratinocitos (90%), melanocitos, células de Langerhans (inmunidad cutánea), células de Merkel.</li>
        <li>Implicación fisioterapéutica: la hidratación, la movilización de tejidos blandos y las técnicas de cicatriz actúan directamente sobre la reorganización epidérmica.</li>
      </ul>`
    },
    'dermis-pap': {
      title: 'Dermis papilar',
      content: `<p>Capa superficial de la dermis, en contacto directo con la epidermis a través de la unión dermoepidérmica (UDE). Compuesta por colágeno tipo III de fibras delgadas y fibras elásticas finas.</p>
      <ul>
        <li>Contiene capilares de la <strong>asa capilar nutritiva</strong>, terminaciones nerviosas libres y corpúsculos de Meissner.</li>
        <li>Sus papilas dérmicas aumentan la superficie de contacto epidermis–dermis, optimizando el intercambio metabólico.</li>
        <li>En procesos de fibrosis y cicatrización patológica, la UDE puede alterarse, reduciendo la movilidad tisular.</li>
      </ul>`
    },
    'dermis-ret': {
      title: 'Dermis reticular',
      content: `<p>Zona más profunda y voluminosa de la dermis. Colágeno tipo I en haces gruesos entrelazados, fibras elásticas gruesas, proteoglicanos y glicosaminoglicanos (ácido hialurónico, condroitín sulfato).</p>
      <ul>
        <li>Contiene: folículos pilosos, glándulas sebáceas, glándulas sudoríparas ecrinas, vasos sanguíneos de mayor calibre, plexo nervioso.</li>
        <li>Proporciona <strong>resistencia tensil y elasticidad</strong> a la piel. Su reorganización post-lesional determina la calidad mecánica de la cicatriz.</li>
        <li>Objetivo de las técnicas de movilización de cicatriz: restaurar el deslizamiento entre planos fasciales dentro de la dermis reticular.</li>
      </ul>`
    },
    'hypodermis': {
      title: 'Hipodermis (tejido subcutáneo)',
      content: `<p>No forma parte de la piel propiamente dicha, pero cumple funciones de integración mecánica y metabólica. Compuesta por adipocitos organizados en lóbulos separados por tabiques fibrosos (septos).</p>
      <ul>
        <li>Funciones: amortiguación mecánica, aislamiento térmico, reserva energética, soporte y anclaje de la piel a estructuras profundas.</li>
        <li>Contiene vasos sanguíneos y linfáticos de mayor calibre, nervios cutáneos.</li>
        <li>Relevancia en linfedema: la acumulación de linfa en los septos fibrosos del tejido subcutáneo genera la induración característica; la terapia descongestiva actúa sobre este compartimento.</li>
      </ul>`
    }
  };

  layers.forEach(layer => {
    layer.addEventListener('click', () => {
      layers.forEach(l => l.classList.remove('selected-layer'));
      layer.classList.add('selected-layer');

      const id = layer.dataset.layer;
      const info = data[id];
      if (info) {
        panel.innerHTML = `<h3>${info.title}</h3>${info.content}`;
      }
    });
  });
}
