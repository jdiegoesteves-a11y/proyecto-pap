/**
 * RESIDENCIAL ARCOS - GOOGLE MAPS STREET VIEW ENGINE
 * Motor de recorrido estilo Google Street View con proyección plana de alta fidelidad,
 * doble búfer de capas para transiciones fluidas de paso hacia adelante (Dolly Crossfade),
 * flechas de piso interactivas, pines POI y minimapa interactivo en tiempo real.
 */

class GoogleStreetViewEngine {
  constructor() {
    this.viewport = document.getElementById('tour-canvas-container');
    this.stage = null;
    this.layers = []; // Doble búfer [LayerA, LayerB]
    this.activeLayerIndex = 0;
    this.isTransitioning = false;

    this.hotspotsLayer = document.getElementById('hotspots-layer');
    this.navlinksLayer = document.getElementById('navlinks-layer');
    
    this.currentRoom = null;
    this.historyStack = [];

    // Estado de paneo y zoom (Google Maps Pan & Zoom)
    this.panX = 0;
    this.panY = 0;
    this.targetPanX = 0;
    this.targetPanY = 0;
    this.zoom = 1.0;
    this.targetZoom = 1.0;
    this.minZoom = 1.0;
    this.maxZoom = 3.2;

    // Física de arrastre con inercia suave
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.lastPointerX = 0;
    this.lastPointerY = 0;
    this.velocityX = 0;
    this.velocityY = 0;

    // Minimapa
    this.minimapCanvas = document.getElementById('minimap-radar-canvas');
    this.minimapCtx = this.minimapCanvas ? this.minimapCanvas.getContext('2d') : null;
    this.minimapWrapper = document.getElementById('minimap-wrapper');

    // Auto-Tour y Audio
    this.isAutoTourActive = false;
    this.autoTourIndex = 0;
    this.autoTourTimer = null;
    this.audioEnabled = false;
    this.audioCtx = null;
    this.ambientGain = null;

    this.init();
  }

  init() {
    this.setupDOMStructure();
    this.preloadAllImages();
    this.setupEventListeners();
    this.setupMinimap();
    this.setupThumbnailBar();
    this.setupUIControls();
    this.setupKeyboardControls();

    // Iniciar en la Fachada Principal
    this.loadRoom('fachada', true);

    // Bucle de animación a 60fps
    this.renderLoop = this.renderLoop.bind(this);
    requestAnimationFrame(this.renderLoop);
  }

  setupDOMStructure() {
    this.viewport.innerHTML = '';

    // Contenedor del escenario (Stage) controlado por Pan & Zoom
    this.stage = document.createElement('div');
    this.stage.className = 'streetview-stage';

    // Doble búfer: Dos capas independientes para fundidos y empujes cruzados perfectos
    this.layers = [];
    for (let i = 0; i < 2; i++) {
      const layer = document.createElement('div');
      layer.className = `streetview-layer layer-${i}`;
      layer.style.opacity = i === 0 ? '1' : '0';

      const img = document.createElement('img');
      img.className = 'streetview-image';
      img.alt = `Street View Scene Layer ${i}`;

      layer.appendChild(img);
      this.stage.appendChild(layer);
      this.layers.push({ container: layer, img: img });
    }

    this.activeLayerIndex = 0;
    this.viewport.appendChild(this.stage);
  }

  preloadAllImages() {
    // Precarga anticipada de todas las fotos en memoria del navegador
    TOUR_DATA.rooms.forEach(room => {
      const img = new Image();
      img.src = room.image;
      if (img.decode) {
        img.decode().catch(() => {});
      }
    });
  }

  setupEventListeners() {
    const dom = this.viewport;

    // Arrastre con ratón / táctil
    dom.addEventListener('pointerdown', this.onPointerDown.bind(this));
    window.addEventListener('pointermove', this.onPointerMove.bind(this));
    window.addEventListener('pointerup', this.onPointerUp.bind(this));

    // Zoom con rueda de ratón (centrado en el cursor estilo Google Maps)
    dom.addEventListener('wheel', this.onWheel.bind(this), { passive: false });

    // Gestos táctiles
    dom.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
    dom.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });

    // Redimensionado de ventana
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  onPointerDown(e) {
    if (e.target.closest('.streetview-ground-arrow') || e.target.closest('.streetview-poi-pin') || e.target.closest('.ui-control-btn') || e.target.closest('button')) {
      return;
    }

    this.isDragging = true;
    this.dragStartX = e.clientX - this.targetPanX;
    this.dragStartY = e.clientY - this.targetPanY;
    this.lastPointerX = e.clientX;
    this.lastPointerY = e.clientY;
    this.velocityX = 0;
    this.velocityY = 0;

    if (this.isAutoTourActive) {
      this.pauseAutoTour();
    }
  }

  onPointerMove(e) {
    if (!this.isDragging) return;

    const deltaX = e.clientX - this.lastPointerX;
    const deltaY = e.clientY - this.lastPointerY;

    this.velocityX = deltaX;
    this.velocityY = deltaY;
    this.lastPointerX = e.clientX;
    this.lastPointerY = e.clientY;

    this.targetPanX = e.clientX - this.dragStartX;
    this.targetPanY = e.clientY - this.dragStartY;

    this.clampPan();
  }

  onPointerUp() {
    this.isDragging = false;
  }

  onWheel(e) {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
    const newZoom = THREE_CLAMP(this.targetZoom * zoomFactor, this.minZoom, this.maxZoom);

    // Zoom centrado hacia el cursor
    const rect = this.viewport.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    const scaleRatio = newZoom / this.targetZoom;
    this.targetPanX = mouseX - (mouseX - this.targetPanX) * scaleRatio;
    this.targetPanY = mouseY - (mouseY - this.targetPanY) * scaleRatio;
    this.targetZoom = newZoom;

    this.clampPan();
  }

  onTouchStart(e) {
    if (e.touches.length === 2) {
      this.touchStartDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  }

  onTouchMove(e) {
    if (e.touches.length === 2) {
      e.preventDefault();
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = currentDist / this.touchStartDist;
      this.targetZoom = THREE_CLAMP(this.targetZoom * ratio, this.minZoom, this.maxZoom);
      this.touchStartDist = currentDist;
      this.clampPan();
    }
  }

  clampPan() {
    const vpW = this.viewport.clientWidth;
    const vpH = this.viewport.clientHeight;
    const currentW = vpW * this.targetZoom;
    const currentH = vpH * this.targetZoom;

    const maxPanX = Math.max(0, (currentW - vpW) / 2 + 80);
    const maxPanY = Math.max(0, (currentH - vpH) / 2 + 80);

    this.targetPanX = THREE_CLAMP(this.targetPanX, -maxPanX, maxPanX);
    this.targetPanY = THREE_CLAMP(this.targetPanY, -maxPanY, maxPanY);
  }

  onWindowResize() {
    this.clampPan();
    this.updateMinimapDimensions();
  }

  /**
   * Carga una habitación con transición ultra-fluida estilo Google Street View
   * (Doble búfer, desplazamiento cinemático hacia el punto de clic y cross-fade)
   */
  loadRoom(roomId, isFirstLoad = false, sourceArrowCoords = null, clickOriginEl = null) {
    const room = TOUR_DATA.rooms.find(r => r.id === roomId);
    if (!room || (this.currentRoom && this.currentRoom.id === roomId && !isFirstLoad)) return;

    if (this.currentRoom) {
      this.historyStack.push(this.currentRoom.id);
    }

    if (this.audioEnabled) {
      this.playStepChime();
    }

    const curLayerObj = this.layers[this.activeLayerIndex];
    const nextIndex = 1 - this.activeLayerIndex;
    const nextLayerObj = this.layers[nextIndex];

    if (isFirstLoad) {
      // Carga inicial directa
      curLayerObj.img.src = room.image;
      curLayerObj.container.style.opacity = '1';
      this.currentRoom = room;
      this.renderGroundArrows(room);
      this.renderPOIs(room);
      this.updateUI(room);
      this.updateMinimap(room);
      return;
    }

    this.isTransitioning = true;

    // Feedback táctil/visual en la baliza clicada
    if (clickOriginEl) {
      clickOriginEl.classList.add('clicked');
      setTimeout(() => clickOriginEl.classList.remove('clicked'), 250);
    }

    // Preparar imagen entrante en el buffer secundario
    nextLayerObj.img.src = room.image;

    // Calcular vector de avance hacia la flecha en el piso
    let pushX = 0;
    let pushY = -30;
    if (sourceArrowCoords) {
      const focalX = (sourceArrowCoords.x - 50) * 0.5;
      const focalY = (sourceArrowCoords.y - 50) * 0.5;
      pushX = -focalX * 8;
      pushY = -focalY * 8;
    }

    // 1. Transición de la capa actual (se empuja hacia adelante y se desvanece suavemente)
    gsap.killTweensOf(curLayerObj.container);
    gsap.to(curLayerObj.container, {
      scale: 1.28,
      x: pushX,
      y: pushY,
      opacity: 0,
      filter: 'blur(6px)',
      duration: 0.6,
      ease: 'power3.inOut'
    });

    // 2. Transición de la capa entrante (llega con avance natural y máxima nitidez)
    gsap.killTweensOf(nextLayerObj.container);
    gsap.fromTo(nextLayerObj.container,
      {
        scale: 0.96,
        x: -pushX * 0.22,
        y: -pushY * 0.22,
        opacity: 0,
        filter: 'blur(5px)'
      },
      {
        scale: 1.0,
        x: 0,
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.72,
        ease: 'power3.out',
        onComplete: () => {
          this.activeLayerIndex = nextIndex;
          this.isTransitioning = false;
          gsap.set(curLayerObj.container, { scale: 1.0, x: 0, y: 0, opacity: 0, filter: 'none' });
        }
      }
    );

    // 3. Reset suave y gradual de la cámara hacia el centro sin sobresaltos
    gsap.to(this, {
      targetZoom: 1.0,
      targetPanX: 0,
      targetPanY: 0,
      duration: 0.6,
      ease: 'power3.out'
    });

    // 4. Desvanecimiento y reemplazo fluido de las flechas y marcadores flotantes
    gsap.to([this.navlinksLayer, this.hotspotsLayer], {
      opacity: 0,
      scale: 0.94,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        this.currentRoom = room;
        this.renderGroundArrows(room);
        this.renderPOIs(room);
        this.updateUI(room);
        this.updateMinimap(room);

        gsap.fromTo([this.navlinksLayer, this.hotspotsLayer],
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' }
        );
      }
    });
  }

  renderGroundArrows(room) {
    this.navlinksLayer.innerHTML = '';
    if (!room.groundArrows || !room.groundArrows.length) return;

    room.groundArrows.forEach((arrow, idx) => {
      const el = document.createElement('div');
      el.className = 'streetview-ground-arrow';
      el.style.left = `${arrow.x}%`;
      el.style.top = `${arrow.y}%`;

      // Icono de chevron oficial de Street View con rotación en perspectiva
      el.innerHTML = `
        <div class="ground-arrow-disc">
          <div class="ground-arrow-pulse"></div>
          <svg class="ground-chevron" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </div>
        <div class="streetview-step-label">
          <span>${arrow.label}</span>
        </div>
      `;

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        this.loadRoom(arrow.targetId, false, { x: arrow.x, y: arrow.y }, el);
      });

      this.navlinksLayer.appendChild(el);
    });
  }

  renderPOIs(room) {
    this.hotspotsLayer.innerHTML = '';
    return; // POIs desactivados

    room.hotspots.forEach(hs => {
      const el = document.createElement('div');
      el.className = 'streetview-poi-pin';
      el.style.left = `${hs.x}%`;
      el.style.top = `${hs.y}%`;

      // Pin circular Google Maps
      el.innerHTML = `
        <div class="poi-pin-circle">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <circle cx="12" cy="12" r="6"/>
          </svg>
        </div>
        <div class="poi-label-chip">
          <span class="poi-chip-title">${hs.title}</span>
        </div>
      `;

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openPOICard(hs);
      });

      this.hotspotsLayer.appendChild(el);
    });
  }

  openPOICard(hs) {
    const modal = document.getElementById('hotspot-detail-modal');
    if (!modal) return;

    document.getElementById('modal-hs-badge').textContent = hs.badge || hs.category;
    document.getElementById('modal-hs-title').textContent = hs.title;
    document.getElementById('modal-hs-desc').textContent = hs.description;

    const specsTable = document.getElementById('modal-hs-specs-body');
    specsTable.innerHTML = '';
    if (hs.specs) {
      Object.entries(hs.specs).forEach(([k, v]) => {
        const row = document.createElement('tr');
        row.innerHTML = `<th class="spec-label">${k}</th><td class="spec-value">${v}</td>`;
        specsTable.appendChild(row);
      });
    }

    const btnFocus = document.getElementById('modal-hs-focus-btn');
    if (btnFocus) {
      btnFocus.onclick = () => {
        modal.classList.remove('open');
        this.focusOnCoordinate(hs.x, hs.y, 2.2);
      };
    }

    modal.classList.add('open');
  }

  focusOnCoordinate(pctX, pctY, targetZoom = 2.0) {
    const vpW = this.viewport.clientWidth;
    const vpH = this.viewport.clientHeight;

    const targetX = ((50 - pctX) / 100) * vpW * targetZoom;
    const targetY = ((50 - pctY) / 100) * vpH * targetZoom;

    gsap.to(this, {
      targetZoom: targetZoom,
      targetPanX: targetX,
      targetPanY: targetY,
      duration: 0.8,
      ease: 'power3.out'
    });
  }

  setupMinimap() {
    if (!this.minimapCanvas) return;

    const pinsLayer = document.getElementById('minimap-pins-layer');
    pinsLayer.innerHTML = '';

    TOUR_DATA.rooms.forEach(r => {
      if (!r.mapCoords) return;

      const pin = document.createElement('button');
      pin.className = 'minimap-room-pin';
      pin.setAttribute('data-room-id', r.id);
      pin.setAttribute('title', r.title);
      pin.style.left = `${r.mapCoords.x}%`;
      pin.style.top = `${r.mapCoords.y}%`;

      pin.innerHTML = `
        <span class="pin-dot"></span>
        <span class="pin-tooltip">${r.title.split('(')[0].trim()}</span>
      `;

      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        this.loadRoom(r.id);
      });

      pinsLayer.appendChild(pin);
    });

    this.updateMinimapDimensions();
  }

  updateMinimapDimensions() {
    if (!this.minimapCanvas) return;
    const rect = this.minimapCanvas.getBoundingClientRect();
    this.minimapCanvas.width = rect.width * (window.devicePixelRatio || 1);
    this.minimapCanvas.height = rect.height * (window.devicePixelRatio || 1);
  }

  updateMinimap(room) {
    const pins = document.querySelectorAll('.minimap-room-pin');
    pins.forEach(p => {
      if (p.getAttribute('data-room-id') === room.id) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    this.drawMinimapRadar();
  }

  drawMinimapRadar() {
    if (!this.minimapCtx || !this.currentRoom || !this.currentRoom.mapCoords) return;

    const ctx = this.minimapCtx;
    const w = this.minimapCanvas.width;
    const h = this.minimapCanvas.height;

    ctx.clearRect(0, 0, w, h);

    const px = (this.currentRoom.mapCoords.x / 100) * w;
    const py = (this.currentRoom.mapCoords.y / 100) * h;

    const angleOffset = (this.panX / 300) * 0.4;
    const baseAngle = -Math.PI / 2 + angleOffset;
    const fovAngle = (Math.PI / 3) / this.zoom;
    const radarDist = Math.min(w, h) * 0.32;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.arc(px, py, radarDist, baseAngle - fovAngle / 2, baseAngle + fovAngle / 2);
    ctx.closePath();

    const gradient = ctx.createRadialGradient(px, py, 2, px, py, radarDist);
    gradient.addColorStop(0, 'rgba(66, 133, 244, 0.7)');
    gradient.addColorStop(0.6, 'rgba(66, 133, 244, 0.25)');
    gradient.addColorStop(1, 'rgba(66, 133, 244, 0.0)');
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.strokeStyle = 'rgba(66, 133, 244, 0.85)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(px, py, 5.5, 0, Math.PI * 2);
    ctx.fillStyle = '#4285F4';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  setupThumbnailBar() {
    const list = document.getElementById('thumbnail-track');
    if (!list) return;

    list.innerHTML = '';

    TOUR_DATA.rooms.forEach(r => {
      const card = document.createElement('div');
      card.className = 'thumb-card';
      card.setAttribute('data-room-id', r.id);
      card.setAttribute('data-category', r.category);

      card.innerHTML = `
        <div class="thumb-img-wrap">
          <img src="${r.thumb}" alt="${r.title}" loading="lazy"/>
          <span class="thumb-cat-badge">${r.categoryLabel}</span>
        </div>
        <div class="thumb-info">
          <p class="thumb-title">${r.title}</p>
        </div>
      `;

      card.addEventListener('click', () => {
        this.loadRoom(r.id);
      });

      list.appendChild(card);
    });

    const filterBtns = document.querySelectorAll('.filter-pill');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        const cards = list.querySelectorAll('.thumb-card');
        cards.forEach(c => {
          if (filter === 'all' || c.getAttribute('data-category') === filter) {
            c.style.display = 'flex';
          } else {
            c.style.display = 'none';
          }
        });
      });
    });
  }

  updateUI(room) {
    const roomTitleEl = document.getElementById('hud-room-title');
    const roomCategoryEl = document.getElementById('hud-room-category');
    const roomDescEl = document.getElementById('hud-room-desc');

    if (roomTitleEl) roomTitleEl.textContent = room.title;
    if (roomCategoryEl) roomCategoryEl.textContent = room.categoryLabel;
    if (roomDescEl) roomDescEl.textContent = room.description;

    const cards = document.querySelectorAll('.thumb-card');
    cards.forEach(c => {
      if (c.getAttribute('data-room-id') === room.id) {
        c.classList.add('active');
        c.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        c.classList.remove('active');
      }
    });
  }

  setupUIControls() {
    document.getElementById('btn-streetview-back')?.addEventListener('click', () => {
      if (this.historyStack.length > 0) {
        const prevRoomId = this.historyStack.pop();
        this.loadRoom(prevRoomId);
      }
    });

    document.getElementById('btn-zoom-in')?.addEventListener('click', () => {
      this.targetZoom = THREE_CLAMP(this.targetZoom * 1.3, this.minZoom, this.maxZoom);
      this.clampPan();
    });

    document.getElementById('btn-zoom-out')?.addEventListener('click', () => {
      this.targetZoom = THREE_CLAMP(this.targetZoom * 0.75, this.minZoom, this.maxZoom);
      if (this.targetZoom === 1.0) {
        this.targetPanX = 0;
        this.targetPanY = 0;
      }
      this.clampPan();
    });

    document.getElementById('btn-reset-view')?.addEventListener('click', () => {
      gsap.to(this, {
        targetZoom: 1.0,
        targetPanX: 0,
        targetPanY: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });

    document.getElementById('compass-widget')?.addEventListener('click', () => {
      gsap.to(this, { targetPanX: 0, targetPanY: 0, targetZoom: 1.0, duration: 0.4 });
    });

    const btnFullscreen = document.getElementById('btn-fullscreen');
    btnFullscreen?.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(console.error);
        btnFullscreen.classList.add('active');
      } else {
        document.exitFullscreen();
        btnFullscreen.classList.remove('active');
      }
    });

    const btnAudio = document.getElementById('btn-ambient-audio');
    btnAudio?.addEventListener('click', () => {
      this.toggleAmbientAudio();
      btnAudio.classList.toggle('active', this.audioEnabled);
    });

    document.getElementById('btn-guided-tour')?.addEventListener('click', () => {
      this.toggleAutoTour();
    });

    document.getElementById('btn-toggle-minimap')?.addEventListener('click', () => {
      this.minimapWrapper.classList.toggle('expanded');
      setTimeout(() => this.updateMinimapDimensions(), 300);
    });

    document.getElementById('btn-view-floorplan')?.addEventListener('click', () => {
      document.getElementById('floorplan-modal')?.classList.add('open');
    });

    document.getElementById('btn-specs-sheet')?.addEventListener('click', () => {
      document.getElementById('specs-drawer')?.classList.add('open');
    });

    document.getElementById('btn-help-controls')?.addEventListener('click', () => {
      document.getElementById('help-modal')?.classList.add('open');
    });

    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.app-modal') || e.target.closest('.drawer-panel');
        if (modal) modal.classList.remove('open');
      });
    });

    document.querySelectorAll('.app-modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
      });
    });
  }

  setupKeyboardControls() {
    window.addEventListener('keydown', (e) => {
      const step = 60;
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          this.targetPanX += step;
          this.clampPan();
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          this.targetPanX -= step;
          this.clampPan();
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          this.targetPanY += step;
          this.clampPan();
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          this.targetPanY -= step;
          this.clampPan();
          break;
        case '+':
        case '=':
          this.targetZoom = THREE_CLAMP(this.targetZoom * 1.2, this.minZoom, this.maxZoom);
          this.clampPan();
          break;
        case '-':
        case '_':
          this.targetZoom = THREE_CLAMP(this.targetZoom * 0.8, this.minZoom, this.maxZoom);
          this.clampPan();
          break;
        case ' ':
          e.preventDefault();
          this.toggleAutoTour();
          break;
        case 'm':
        case 'M':
          this.minimapWrapper?.classList.toggle('expanded');
          break;
        case 'Escape':
          document.querySelectorAll('.app-modal.open, .drawer-panel.open').forEach(el => el.classList.remove('open'));
          break;
      }
    });
  }

  toggleAutoTour() {
    this.isAutoTourActive = !this.isAutoTourActive;
    const banner = document.getElementById('guided-tour-banner');

    if (this.isAutoTourActive) {
      this.autoTourIndex = 0;
      if (banner) banner.classList.add('active');
      this.playAutoTourStep();
    } else {
      if (banner) banner.classList.remove('active');
      clearTimeout(this.autoTourTimer);
    }
  }

  pauseAutoTour() {
    if (!this.isAutoTourActive) return;
    this.isAutoTourActive = false;
    clearTimeout(this.autoTourTimer);
    document.getElementById('guided-tour-banner')?.classList.remove('active');
  }

  playAutoTourStep() {
    if (!this.isAutoTourActive) return;

    const steps = TOUR_DATA.guidedTour;
    if (this.autoTourIndex >= steps.length) {
      this.autoTourIndex = 0;
    }

    const step = steps[this.autoTourIndex];
    this.loadRoom(step.roomId);

    const captionEl = document.getElementById('tour-step-caption');
    const stepCountEl = document.getElementById('tour-step-counter');
    const progBar = document.getElementById('tour-step-progressbar');

    if (captionEl) captionEl.textContent = step.caption;
    if (stepCountEl) stepCountEl.textContent = `${this.autoTourIndex + 1} / ${steps.length}`;

    if (progBar) {
      progBar.style.transition = 'none';
      progBar.style.width = '0%';
      setTimeout(() => {
        progBar.style.transition = `width ${step.duration}ms linear`;
        progBar.style.width = '100%';
      }, 50);
    }

    this.autoTourTimer = setTimeout(() => {
      this.autoTourIndex++;
      this.playAutoTourStep();
    }, step.duration);
  }

  toggleAmbientAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();

      const master = this.audioCtx.createGain();
      master.gain.setValueAtTime(0.01, this.audioCtx.currentTime);
      master.connect(this.audioCtx.destination);
      this.ambientGain = master;

      const osc1 = this.audioCtx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(110, this.audioCtx.currentTime);

      const osc2 = this.audioCtx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(165, this.audioCtx.currentTime);

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.audioCtx.currentTime);

      const oscGain = this.audioCtx.createGain();
      oscGain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(master);

      osc1.start();
      osc2.start();
    }

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    this.audioEnabled = !this.audioEnabled;

    if (this.audioEnabled) {
      gsap.to(this.ambientGain.gain, { value: 0.14, duration: 1.2 });
    } else {
      gsap.to(this.ambientGain.gain, { value: 0.0001, duration: 0.8 });
    }
  }

  playStepChime() {
    if (!this.audioCtx || this.audioCtx.state !== 'running') return;

    const chime = this.audioCtx.createOscillator();
    const chimeGain = this.audioCtx.createGain();

    chime.type = 'triangle';
    chime.frequency.setValueAtTime(523.25, this.audioCtx.currentTime); // C5
    chime.frequency.exponentialRampToValueAtTime(783.99, this.audioCtx.currentTime + 0.15); // G5

    chimeGain.gain.setValueAtTime(0.07, this.audioCtx.currentTime);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.8);

    chime.connect(chimeGain);
    chimeGain.connect(this.audioCtx.destination);

    chime.start();
    chime.stop(this.audioCtx.currentTime + 0.8);
  }

  renderLoop() {
    requestAnimationFrame(this.renderLoop);

    // Amortiguación inercial de arrastre y zoom (más suave y responsiva)
    this.panX += (this.targetPanX - this.panX) * 0.16;
    this.panY += (this.targetPanY - this.panY) * 0.16;
    this.zoom += (this.targetZoom - this.zoom) * 0.12;

    // Actualizar transformación de la cámara sobre el escenario
    if (this.stage) {
      this.stage.style.transform = `translate3d(${this.panX}px, ${this.panY}px, 0) scale(${this.zoom})`;
    }

    // Capas de interactividad (flechas y hotspots) sincronizadas con pan/zoom
    if (this.navlinksLayer) {
      this.navlinksLayer.style.transform = `translate3d(${this.panX}px, ${this.panY}px, 0) scale(${this.zoom})`;
    }
    if (this.hotspotsLayer) {
      this.hotspotsLayer.style.transform = `translate3d(${this.panX}px, ${this.panY}px, 0) scale(${this.zoom})`;
    }

    // Actualizar radar en minimapa
    this.drawMinimapRadar();
  }
}

function THREE_CLAMP(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

// Inicializar al cargar
window.addEventListener('DOMContentLoaded', () => {
  window.tour = new GoogleStreetViewEngine();
});
