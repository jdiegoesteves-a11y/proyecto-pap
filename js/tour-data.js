/**
 * RESIDENCIAL ARCOS - GOOGLE MAPS / STREET VIEW DATASET
 * Coordenadas directas (X%, Y%) sobre la imagen original para máxima fidelidad visual,
 * cero distorsión esférica, flechas de paso en el piso y minimapa interactivo.
 */

const TOUR_DATA = {
  property: {
    name: "Residencial Arcos",
    model: "Prototipo Roble",
    address: "Privada Los Cedros #104, Fracc. Residencial Arcos",
    stats: {
      terreno: "105.00 m² (7.00 m x 15.00 m)",
      construccion: "72.40 m² habitables",
      recamaras: "2 Recámaras con clóset integrado",
      banos: "1 Baño completo de lujo",
      estacionamiento: "1 Cajón de estacionamiento",
      patio: "Patio posterior de servicio"
    }
  },

  rooms: [
    {
      id: "calle",
      title: "Calle y Entorno Residencial",
      category: "exterior",
      categoryLabel: "Vialidad",
      image: "assets/07_calle_residencial.jpg",
      thumb: "assets/07_calle_residencial.jpg",
      description: "Entorno vecinal seguro y familiar con vialidad de adoquín intertrabado, alumbrado subterráneo y banquetas arboladas.",
      mapCoords: { x: 50, y: 98 },
      aspectRatio: 1.8618,
      defaultPan: { x: 0, y: 0, zoom: 1 },
      groundArrows: [
        {
          targetId: "fachada",
          x: 18,
          y: 78,
          rotation: 0,
          label: "Entrar a la Residencia"
        },
        {
          targetId: "vista_aerea",
          x: 52,
          y: 35,
          rotation: -45,
          label: "Ver Masterplan Aéreo"
        }
      ],
      hotspots: [
        {
          id: "hs-adoquin",
          x: 48,
          y: 82,
          icon: "road",
          title: "Pavimento de Adoquín Intertrabado",
          category: "Urbanismo",
          badge: "Infraestructura",
          description: "Superficie de adoquín de concreto de alta durabilidad que reduce la velocidad vehicular y permite una mejor absorción de lluvia.",
          specs: {
            "Tipo": "Adoquín de concreto hidráulico F'c=350 kg/cm²",
            "Mantenimiento": "Modular sin rupturas ni baches de asfalto"
          }
        },
        {
          id: "hs-banqueta",
          x: 35,
          y: 88,
          icon: "tree",
          title: "Andador Peatonal y Jardinería",
          category: "Paisajismo",
          badge: "Áreas Verdes",
          description: "Banquetas de concreto lavado integradas con jardineras lineales y especies tropicales de bajo consumo de agua.",
          specs: {
            "Acabado": "Concreto escobillado antiderrapante",
            "Seguridad": "Alumbrado público LED automatizado"
          }
        }
      ]
    },

    {
      id: "fachada",
      title: "Fachada Principal y Acceso",
      category: "exterior",
      categoryLabel: "Fachada",
      image: "assets/01_fachada_acceso.jpg",
      thumb: "assets/01_fachada_acceso.jpg",
      description: "Fachada contemporánea en tonos arena con pórtico techado, muros con acabado rayado horizontal y huellas de concreto.",
      mapCoords: { x: 42, y: 88 },
      defaultPan: { x: 0, y: 0, zoom: 1 },
      groundArrows: [
        {
          targetId: "social_amplio",
          x: 53,
          y: 68,
          rotation: 0,
          label: "Entrar a la Casa"
        },
        {
          targetId: "jardin_ventana",
          x: 34,
          y: 60,
          rotation: -30,
          label: "Ver Detalle de Jardín y Ventana"
        },
        {
          targetId: "andador_huellas",
          x: 42,
          y: 85,
          rotation: 45,
          label: "Ver Huellas de Concreto"
        },
        {
          targetId: "calle",
          x: 18,
          y: 92,
          rotation: 180,
          label: "Salir a la Calle"
        }
      ],
      hotspots: [
        {
          id: "hs-portico",
          x: 60,
          y: 34,
          icon: "home",
          title: "Pórtico de Acceso Techado",
          category: "Arquitectura",
          badge: "Estructura",
          description: "Losa volada que genera protección ante el sol y la lluvia, equipada con spot LED empotrado de luz cálida (3000K).",
          specs: {
            "Material": "Concreto armado con acabado estuco texturizado",
            "Iluminación": "Spot LED empotrado 7W cálido",
            "Altura": "2.40 m de piso a plafón"
          }
        },
        {
          id: "hs-muro-estriado",
          x: 34,
          y: 42,
          icon: "layers",
          title: "Muros con Textura Ranurada",
          category: "Acabados",
          badge: "Materiales",
          description: "Diseño de estrías horizontales ejecutadas a regla con separación de 15 cm. Aporta sombras dinámicas y rica textura arquitectónica.",
          specs: {
            "Acabado": "Pasta acrílica texturizada hidrofugante lavable",
            "Color": "Blanco hueso mate con protección UV"
          }
        },
        {
          id: "hs-puerta-acero",
          x: 52,
          y: 52,
          icon: "shield",
          title: "Puerta Principal de Seguridad",
          category: "Equipamiento",
          badge: "Seguridad",
          description: "Puerta de lámina galvanizada con núcleo termoacústico y cerradura de seguridad con manija de acero inoxidable.",
          specs: {
            "Dimensiones": "0.95 m x 2.20 m",
            "Acabado": "Pintura electrostática gris grafito mate"
          }
        },
        {
          id: "hs-huellas",
          x: 42,
          y: 80,
          icon: "grid",
          title: "Huellas de Concreto y Pasto San Agustín",
          category: "Exteriores",
          badge: "Acceso",
          description: "Sendero peatonal permeable intercalado con césped natural y plantas ornamentales (monstera y lirios).",
          specs: {
            "Material": "Piezas prefabricadas de concreto lavado 40x80 cm"
          }
        }
      ]
    },

    {
      id: "jardin_ventana",
      title: "Jardín Frontal y Ventanal",
      category: "exterior",
      categoryLabel: "Exteriores",
      image: "assets/11_detalle_jardin_ventana.jpg",
      thumb: "assets/11_detalle_jardin_ventana.jpg",
      description: "Detalle arquitectónico del ventanal enmarcado, repisas decorativas interiores, vegetación tropical exuberante y palmeras.",
      mapCoords: { x: 35, y: 84 },
      defaultPan: { x: 0, y: 0, zoom: 1 },
      groundArrows: [
        {
          targetId: "fachada",
          x: 82,
          y: 65,
          rotation: 45,
          label: "Volver a Entrada Principal"
        },
        {
          targetId: "andador_huellas",
          x: 48,
          y: 88,
          rotation: 0,
          label: "Ver Huellas de Concreto"
        }
      ],
      hotspots: [
        {
          id: "hs-ventanal-detalle",
          x: 54,
          y: 50,
          icon: "maximize",
          title: "Ventanal Enmarcado con Librero Interior",
          category: "Arquitectura",
          badge: "Diseño",
          description: "Ventana con cancelería de aluminio color topo y cristal de 6mm. Integra repisa interior en madera natural con jarrones artesanales.",
          specs: {
            "Perfil": "Aluminio línea moderna con corte a 45°",
            "Vidrio": "Cristal templado de 6 mm con película térmica"
          }
        },
        {
          id: "hs-vegetacion-tropical",
          x: 42,
          y: 75,
          icon: "tree",
          title: "Jardín Biofílico con Monstera y Alocasias",
          category: "Paisajismo",
          badge: "Jardinería",
          description: "Conjunto vegetal de follaje verde intenso que aporta frescura y reduce la temperatura perimetral de la fachada.",
          specs: {
            "Especies": "Monstera deliciosa, oreja de elefante y palmeras cocoteras",
            "Riego": "Sistema de goteo eficiente de bajo consumo"
          }
        }
      ]
    },

    {
      id: "andador_huellas",
      title: "Andador y Huellas de Concreto",
      category: "exterior",
      categoryLabel: "Exteriores",
      image: "assets/12_andador_huellas.jpg",
      thumb: "assets/12_andador_huellas.jpg",
      description: "Textura y acabado de las piezas de concreto lavado en el andador de acceso, con sombras geométricas de palmeras.",
      mapCoords: { x: 44, y: 92 },
      defaultPan: { x: 0, y: 0, zoom: 1 },
      groundArrows: [
        {
          targetId: "fachada",
          x: 50,
          y: 25,
          rotation: 0,
          label: "Subir al Pórtico de Acceso"
        },
        {
          targetId: "jardin_ventana",
          x: 80,
          y: 35,
          rotation: 45,
          label: "Ver Jardín y Ventanal"
        },
        {
          targetId: "calle",
          x: 50,
          y: 92,
          rotation: 180,
          label: "Volver a la Calle"
        }
      ],
      hotspots: [
        {
          id: "hs-huellas-textura",
          x: 50,
          y: 55,
          icon: "layers",
          title: "Placas de Concreto Lavado Antiderrapante",
          category: "Materiales",
          badge: "Pavimentos",
          description: "Huellas de concreto premezclado con acabado lavado a presión que expone fino agregado pétreo natural para máxima adherencia al caminar.",
          specs: {
            "Resistencia": "F'c = 250 kg/cm² armado con malla electrosoldada",
            "Formato": "Piezas modulares de 40 cm x 80 cm"
          }
        }
      ]
    },

    {
      id: "social_amplio",
      title: "Espacio Social Abierto",
      category: "social",
      categoryLabel: "Área Social",
      image: "assets/10_espacio_social_amplio.jpg",
      thumb: "assets/10_espacio_social_amplio.jpg",
      description: "Concepto de planta abierta (open-plan) que integra armónicamente la cocina integral, el comedor y la sala de estar.",
      mapCoords: { x: 50, y: 64 },
      defaultPan: { x: 0, y: 0, zoom: 1 },
      groundArrows: [
        {
          targetId: "sala",
          x: 48,
          y: 52,
          rotation: 0,
          label: "Acercarse a la Sala"
        },
        {
          targetId: "comedor_cocina",
          x: 38,
          y: 72,
          rotation: -30,
          label: "Área de Cocina y Comedor"
        },
        {
          targetId: "acceso_recamara",
          x: 65,
          y: 45,
          rotation: 30,
          label: "Pasillo a Recámaras"
        },
        {
          targetId: "fachada",
          x: 20,
          y: 92,
          rotation: 180,
          label: "Salir al Exterior"
        }
      ],
      hotspots: [
        {
          id: "hs-open-plan",
          x: 52,
          y: 22,
          icon: "maximize",
          title: "Concepto Abierto (Open-Plan)",
          category: "Arquitectura",
          badge: "Distribución",
          description: "Continuidad espacial fluida de 28.50 m² que fomenta la convivencia familiar y optimiza la iluminación natural cruzada.",
          specs: {
            "Área social integrada": "28.50 m² libres de columnas intermedias",
            "Altura libre": "2.70 m de piso a losa"
          }
        },
        {
          id: "hs-estufa",
          x: 85,
          y: 65,
          icon: "zap",
          title: "Estufa y Horno en Acero Inoxidable",
          category: "Equipamiento",
          badge: "Cocina",
          description: "Estufa de 30'' de 4 quemadores con capelo de cristal templado, horno con luz interior y acabados en acero inoxidable.",
          specs: {
            "Material": "Acero inoxidable calidad 430 cepillado",
            "Quemadores": "4 de alta potencia con encendido electrónico"
          }
        },
        {
          id: "hs-piso-social",
          x: 52,
          y: 88,
          icon: "layers",
          title: "Piso Porcelánico Rectificado 60x60",
          category: "Acabados",
          badge: "Pisos",
          description: "Porcelanato esmaltado de alta resistencia al tráfico con sutil veteado grisáceo y junta perimetral mínima de 2mm.",
          specs: {
            "Formato": "60 x 60 cm rectificado",
            "Acabado": "Satinado suave antideslizante"
          }
        },
        {
          id: "hs-refrigerador",
          x: 16,
          y: 45,
          icon: "box",
          title: "Refrigerador Dúplex con Despachador",
          category: "Equipamiento",
          badge: "Electrodomésticos",
          description: "Refrigerador de bajo consumo energético con despachador de agua fría exterior y acabado en acero metálico.",
          specs: {
            "Eficiencia": "Compresor Digital Inverter con ahorro de energía"
          }
        }
      ]
    },

    {
      id: "sala",
      title: "Sala de Estar y Lectura",
      category: "social",
      categoryLabel: "Área Social",
      image: "assets/02_sala_estar.png",
      thumb: "assets/02_sala_estar.png",
      description: "Atmósfera cálida y confortable con sofá en lino crudo, repisa suspendida con iluminación LED indirecta y galería botánica.",
      mapCoords: { x: 28, y: 56 },
      defaultPan: { x: 0, y: 0, zoom: 1 },
      groundArrows: [
        {
          targetId: "social_amplio",
          x: 50,
          y: 92,
          rotation: 180,
          label: "Vista General Social"
        },
        {
          targetId: "comedor_cocina",
          x: 15,
          y: 85,
          rotation: -90,
          label: "Hacia Comedor"
        },
        {
          targetId: "acceso_recamara",
          x: 78,
          y: 50,
          rotation: 45,
          label: "Pasillo a Recámaras"
        }
      ],
      hotspots: [
        {
          id: "hs-sofa",
          x: 42,
          y: 68,
          icon: "coffee",
          title: "Sofá Nórdico en Lino Crudo",
          category: "Mobiliario",
          badge: "Confort",
          description: "Sofá de tres plazas con base de madera maciza y tapizado en tejido de lino suave color avena con relleno de alta densidad.",
          specs: {
            "Estructura": "Madera de pino estufada",
            "Tapiz": "Lino transpirable antimanchas",
            "Dimensiones": "2.10 m de largo x 0.88 m de fondo"
          }
        },
        {
          id: "hs-repisa-led",
          x: 58,
          y: 18,
          icon: "sun",
          title: "Repisa Flotante con Luz LED Oculta",
          category: "Iluminación",
          badge: "Diseño Interior",
          description: "Ménsula suspendida con tira LED indirecta de 3000K que destaca las plantas ornamentales y crea un ambiente relajante.",
          specs: {
            "Material": "Chapa de madera de parota con sellador mate",
            "Tira LED": "COB LED 24V de tono cálido (CRI > 90)"
          }
        },
        {
          id: "hs-ventana-sala",
          x: 35,
          y: 32,
          icon: "maximize-2",
          title: "Ventanal Corredizo con Mosquitero",
          category: "Cancelería",
          badge: "Ventilación",
          description: "Cancelería de aluminio negro electrostático con cristal claro de 6mm y persiana romana rústica en tono lino.",
          specs: {
            "Perfilería": "Aluminio línea española 2 pulgadas",
            "Cristal": "Flotado 6 mm con sellado hermético"
          }
        },
        {
          id: "hs-galeria",
          x: 60,
          y: 38,
          icon: "image",
          title: "Tríptico de Cuadros Botánicos",
          category: "Decoración",
          badge: "Interiorismo",
          description: "Marcos en madera natural con litografías de hojas tropicales en tonos verde bosque para aportar biofilia al espacio.",
          specs: {
            "Marcos": "Madera de roble claro con cristal antirreflejo"
          }
        }
      ]
    },

    {
      id: "comedor_cocina",
      title: "Comedor y Cocina Integral",
      category: "social",
      categoryLabel: "Área Social",
      image: "assets/03_comedor_cocina.png",
      thumb: "assets/03_comedor_cocina.png",
      description: "Área de comedor familiar y cocina equipada con cubierta de granito natural gris mara, tarja monomando y puerta al patio.",
      mapCoords: { x: 58, y: 52 },
      defaultPan: { x: 0, y: 0, zoom: 1 },
      groundArrows: [
        {
          targetId: "social_amplio",
          x: 50,
          y: 92,
          rotation: 180,
          label: "Vista Abierta General"
        },
        {
          targetId: "sala",
          x: 85,
          y: 85,
          rotation: 90,
          label: "Pasar a la Sala"
        }
      ],
      hotspots: [
        {
          id: "hs-granito",
          x: 26,
          y: 58,
          icon: "disc",
          title: "Cubierta de Granito Gris Mara Pulido",
          category: "Acabados",
          badge: "Cocina",
          description: "Piedra 100% natural pulida de 2 cm de grosor con zoclo perimetral de 7 cm. Resistente al calor directo, cuchillos y manchas.",
          specs: {
            "Grosor": "20 mm con resina selladora antibacteriana",
            "Mantenimiento": "Superficie higiénica de fácil limpieza"
          }
        },
        {
          id: "hs-tarja",
          x: 22,
          y: 52,
          icon: "droplet",
          title: "Tarja Submontada con Monomando Satinado",
          category: "Equipamiento",
          badge: "Grifería",
          description: "Fregadero de alta profundidad en acero inoxidable calibre 18 con mezcladora cuello de ganso y cartucho cerámico antifuga.",
          specs: {
            "Material": "Acero inoxidable AISI 304 calibre 18",
            "Grifería": "Monomando con regadera extraíble"
          }
        },
        {
          id: "hs-comedor",
          x: 53,
          y: 62,
          icon: "users",
          title: "Comedor de Madera de 4 Plazas",
          category: "Mobiliario",
          badge: "Comedor",
          description: "Mesa rectangular en madera maciza de roble claro con 4 sillas de respaldo envolvente y asiento tapizado en lino crudo.",
          specs: {
            "Dimensiones": "1.20 m x 0.80 m",
            "Acabado": "Barniz poliuretano semimate de poro cerrado"
          }
        },
        {
          id: "hs-puerta-patio",
          x: 46,
          y: 42,
          icon: "door-open",
          title: "Puerta de Acceso al Patio de Servicio",
          category: "Accesos",
          badge: "Servicios",
          description: "Salida directa hacia el patio posterior descubierto donde se ubica el lavadero y preparación para lavadora.",
          specs: {
            "Material": "Puerta exterior galvanizada de alta resistencia"
          }
        }
      ]
    },

    {
      id: "acceso_recamara",
      title: "Vestíbulo a Habitaciones",
      category: "privado",
      categoryLabel: "Zona Privada",
      image: "assets/06_acceso_recamara.png",
      thumb: "assets/06_acceso_recamara.png",
      description: "Punto de distribución hacia las áreas privadas de la casa con marco de madera maciza hacia la recámara principal y mueble TV.",
      mapCoords: { x: 38, y: 38 },
      defaultPan: { x: 0, y: 0, zoom: 1 },
      groundArrows: [
        {
          targetId: "recamara_principal",
          x: 38,
          y: 82,
          rotation: 0,
          label: "Entrar a Recámara Principal"
        },
        {
          targetId: "recamara_secundaria",
          x: 78,
          y: 75,
          rotation: 40,
          label: "Entrar a Recámara Juvenil"
        },
        {
          targetId: "bano",
          x: 75,
          y: 68,
          rotation: 45,
          label: "Entrar al Baño"
        },
        {
          targetId: "social_amplio",
          x: 18,
          y: 90,
          rotation: 180,
          label: "Regresar al Área Social"
        }
      ],
      hotspots: [
        {
          id: "hs-marco-madera",
          x: 37,
          y: 35,
          icon: "layout",
          title: "Chambrana de Madera de Encino",
          category: "Carpintería",
          badge: "Acabados",
          description: "Marcos perimetrales anchos con moldurado fino que jerarquizan el umbral de entrada a la recámara principal.",
          specs: {
            "Material": "Madera de encino americano estufado",
            "Ancho": "7.5 cm perimetral con acabado semimate"
          }
        },
        {
          id: "hs-mueble-tv",
          x: 10,
          y: 65,
          icon: "tv",
          title: "Cómoda de Madera y Pantalla Smart TV",
          category: "Mobiliario",
          badge: "Almacenaje",
          description: "Credenza de guardado con tiradores metálicos en negro mate y pantalla Smart TV empotrada en muro con cableado oculto.",
          specs: {
            "Cajones": "Correderas de extensión telescópica de 45 kg"
          }
        }
      ]
    },

    {
      id: "recamara_principal",
      title: "Recámara Principal (Master Suite)",
      category: "privado",
      categoryLabel: "Zona Privada",
      image: "assets/05_recamara_principal.jpg",
      thumb: "assets/05_recamara_principal.jpg",
      description: "Recámara matrimonial con cabecera de madera suspendida, clóset de piso a techo, equipo mini-split inverter y ventanal al jardín.",
      mapCoords: { x: 22, y: 24 },
      defaultPan: { x: 0, y: 0, zoom: 1 },
      groundArrows: [
        {
          targetId: "acceso_recamara",
          x: 20,
          y: 90,
          rotation: 180,
          label: "Salir al Pasillo"
        },
        {
          targetId: "recamara_secundaria",
          x: 70,
          y: 85,
          rotation: 60,
          label: "Ir a Recámara Juvenil"
        },
        {
          targetId: "bano",
          x: 82,
          y: 88,
          rotation: 90,
          label: "Ir al Baño"
        }
      ],
      hotspots: [
        {
          id: "hs-cama",
          x: 45,
          y: 65,
          icon: "moon",
          title: "Cama Queen Size con Cabecera de Roble",
          category: "Mobiliario",
          badge: "Descanso",
          description: "Cama matrimonial con estructura de madera maciza, ropa de cama en lino lavado marfil y lámpara de lectura cálida integrada.",
          specs: {
            "Colchón": "Pocket springs independientes y memory foam",
            "Cabecera": "Panel de roble con repisa y luz de cortesía"
          }
        },
        {
          id: "hs-closet",
          x: 85,
          y: 42,
          icon: "package",
          title: "Clóset Integral de Piso a Techo",
          category: "Carpintería",
          badge: "Almacenamiento",
          description: "Ropero modular de dos puertas abatibles de 2.70 m de altura, equipado con maletero, entrepaños y tubos para colgar ropa.",
          specs: {
            "Material": "Melamina termo-fusionada de 16mm antibacteriana",
            "Jaladeras": "Perfil 'J' de aluminio anodizado mate"
          }
        },
        {
          id: "hs-minisplit",
          x: 36,
          y: 15,
          icon: "wind",
          title: "Aire Acondicionado Mini-Split Inverter",
          category: "Equipamiento",
          badge: "Climatización",
          description: "Unidad silenciosa de 12,000 BTU frío/calor con filtro antibacterial y control Wi-Fi, con ahorro de hasta 65% de energía.",
          specs: {
            "Capacidad": "1 Tonelada (12,000 BTU/h)",
            "Nivel sonoro": "19 dB en modo noche ultradespacio"
          }
        },
        {
          id: "hs-ventana-recamara",
          x: 64,
          y: 38,
          icon: "sun",
          title: "Ventanal con Vista al Jardín",
          category: "Arquitectura",
          badge: "Iluminación",
          description: "Ventana con vistas directas al follaje exterior que inunda la habitación de luz natural vespertina y ventilación fresca.",
          specs: {
            "Cristal": "Tintado reflectivo para privacidad y control térmico"
          }
        }
      ]
    },

    {
      id: "bano",
      title: "Baño Completo de Lujo",
      category: "privado",
      categoryLabel: "Zona Privada",
      image: "assets/09_bano.jpg",
      thumb: "assets/09_bano.jpg",
      description: "Baño completo con cancel de cristal templado y perfiles negro mate, regadera de lluvia, mueble vanity flotante y sanitario ecológico.",
      mapCoords: { x: 74, y: 70 },
      defaultPan: { x: 0, y: 0, zoom: 1 },
      groundArrows: [
        {
          targetId: "acceso_recamara",
          x: 20,
          y: 92,
          rotation: 180,
          label: "Salir al Pasillo"
        },
        {
          targetId: "recamara_principal",
          x: 50,
          y: 92,
          rotation: -90,
          label: "Ir a Recámara Principal"
        },
        {
          targetId: "recamara_secundaria",
          x: 70,
          y: 88,
          rotation: 0,
          label: "Ir a Recámara Juvenil"
        }
      ],
      hotspots: [
        {
          id: "hs-cancel-ducha",
          x: 80,
          y: 50,
          icon: "shield",
          title: "Cancel de Cristal Templado 8 mm",
          category: "Cancelería",
          badge: "Seguridad",
          description: "Cabina de regadera con cancelería de cristal templado con herrajes y perfiles en acabado negro mate de alta resistencia.",
          specs: {
            "Cristal": "Templado claro de 8 mm resistente a impacto",
            "Herrajes": "Acero inoxidable 304 negro electrostático"
          }
        },
        {
          id: "hs-regadera",
          x: 77,
          y: 22,
          icon: "droplet",
          title: "Regadera Tipo Lluvia de Alta Presión",
          category: "Equipamiento",
          badge: "Grifería",
          description: "Cabezal de regadera de 25 cm de diámetro con boquillas de silicón antical y regadera de mano auxiliar con manguera flexible.",
          specs: {
            "Diámetro": "25 cm (10 pulgadas) de caída suave",
            "Consumo": "Grado ecológico con regulador a 6 L/min"
          }
        },
        {
          id: "hs-vanity",
          x: 29,
          y: 62,
          icon: "layers",
          title: "Mueble Vanity Flotante de Madera",
          category: "Carpintería",
          badge: "Mobiliario",
          description: "Mueble suspendido resistente a la humedad con cubierta de mármol sintético gris y cajón de extracción total.",
          specs: {
            "Material": "MDF hidrófugo sellado con chapa de roble natural"
          }
        },
        {
          id: "hs-inodoro",
          x: 51,
          y: 72,
          icon: "check-circle",
          title: "Inodoro Ecológico One-Piece Doble Descarga",
          category: "Equipamiento",
          badge: "Sustentabilidad",
          description: "Sanitario alargado con asiento de cierre suave y sistema de descarga dual de 3L y 4.8L que ahorra 40% de agua potable al año.",
          specs: {
            "Consumo": "Doble descarga 3L líquidos / 4.8L sólidos"
          }
        }
      ]
    },

    {
      id: "recamara_secundaria",
      title: "Recámara Secundaria (Juvenil)",
      category: "privado",
      categoryLabel: "Zona Privada",
      image: "assets/13_recamara_secundaria.jpg",
      thumb: "assets/13_recamara_secundaria.jpg",
      description: "Habitación secundaria o juvenil equipada con cama individual, carpintería integral con módulos suspendidos de roble, muro de acento con panel alistonado acústico y ventanal con luz natural.",
      mapCoords: { x: 66, y: 24 },
      defaultPan: { x: 0, y: 0, zoom: 1 },
      groundArrows: [
        {
          targetId: "acceso_recamara",
          x: 88,
          y: 88,
          rotation: 140,
          label: "Salir al Pasillo"
        },
        {
          targetId: "recamara_principal",
          x: 20,
          y: 90,
          rotation: -130,
          label: "Ir a Recámara Principal"
        },
        {
          targetId: "bano",
          x: 55,
          y: 92,
          rotation: 180,
          label: "Ir al Baño"
        }
      ],
      hotspots: [
        {
          id: "hs-cama-juvenil",
          x: 45,
          y: 70,
          icon: "moon",
          title: "Cama Individual de Diseño Contemporáneo",
          category: "Mobiliario",
          badge: "Descanso",
          description: "Base de madera maciza en roble claro con ropa de cama en tonos naturales y colchón ortopédico.",
          specs: {
            "Dimensiones": "Individual (1.00 m x 1.90 m)",
            "Estructura": "Madera maciza estufada"
          }
        },
        {
          id: "hs-panel-alistonado",
          x: 50,
          y: 45,
          icon: "layers",
          title: "Muro de Acento Alistonado Acústico",
          category: "Acabados",
          badge: "Diseño Interior",
          description: "Revestimiento vertical de listones de madera sobre base acústica grafito que aporta confort visual y acústico.",
          specs: {
            "Material": "Listones de roble sobre base fonoabsorbente",
            "Acabado": "Tono carbón mate antirreflejo"
          }
        },
        {
          id: "hs-closet-suspendido",
          x: 85,
          y: 35,
          icon: "package",
          title: "Clóset Modular y Módulos Suspendidos",
          category: "Carpintería",
          badge: "Almacenaje",
          description: "Ropero integral de piso a techo y gabinetes aéreos en roble natural para máxima capacidad de almacenamiento.",
          specs: {
            "Material": "Tablero laminado acabado madera clara",
            "Herrajes": "Cierre suave y pistones neumáticos superiores"
          }
        },
        {
          id: "hs-ventana-juvenil",
          x: 15,
          y: 40,
          icon: "sun",
          title: "Ventana con Persiana Romana",
          category: "Iluminación",
          badge: "Confort",
          description: "Ventana con cristal claro de 6mm y persiana romana plegable que permite un control óptimo de la iluminación natural.",
          specs: {
            "Cancelería": "Aluminio línea nacional negro mate",
            "Control solar": "Persiana romana traslúcida tono beige"
          }
        }
      ]
    },

    {
      id: "vista_aerea",
      title: "Masterplan y Vista Aérea",
      category: "exterior",
      categoryLabel: "Masterplan",
      image: "assets/08_vista_aerea.jpg",
      thumb: "assets/08_vista_aerea.jpg",
      description: "Perspectiva aérea del conjunto residencial que ilustra el diseño urbanístico, vialidades con adoquín y cinturón de áreas verdes.",
      mapCoords: { x: 50, y: 10 },
      defaultPan: { x: 0, y: 0, zoom: 1 },
      groundArrows: [
        {
          targetId: "calle",
          x: 52,
          y: 68,
          rotation: 0,
          label: "Bajar a Nivel de Calle"
        },
        {
          targetId: "fachada",
          x: 35,
          y: 62,
          rotation: -45,
          label: "Ver Fachada del Modelo"
        }
      ],
      hotspots: [
        {
          id: "hs-urbanismo",
          x: 52,
          y: 52,
          icon: "map",
          title: "Trazado Urbano y Orientación",
          category: "Urbanismo",
          badge: "Masterplan",
          description: "Retícula urbana diseñada para optimizar los vientos dominantes y asoleamiento natural, con camellón central y ciclovía.",
          specs: {
            "Lotes tipo": "105 m² con frentes de 7.00 m",
            "Servicios": "Instalaciones 100% subterráneas"
          }
        },
        {
          id: "hs-areas-verdes-master",
          x: 25,
          y: 28,
          icon: "tree",
          title: "Cinturón de Áreas Verdes Naturales",
          category: "Paisajismo",
          badge: "Reserva",
          description: "El desarrollo está delimitado por zonas arboladas que amortiguan ruidos y regulan térmicamente la temperatura del entorno.",
          specs: {
            "Áreas verdes": "Parques infantiles, andadores y canchas a 150m"
          }
        }
      ]
    }
  ],

  guidedTour: [
    { roomId: "vista_aerea", duration: 7000, caption: "Bienvenido a Residencial Arcos. Conoce la visión urbanística de tu próximo hogar." },
    { roomId: "calle", duration: 6000, caption: "Vialidades seguras con adoquín intertrabado y ambiente familiar tranquilo." },
    { roomId: "fachada", duration: 7000, caption: "Fachada contemporánea con pórtico techado y estacionamiento privado." },
    { roomId: "jardin_ventana", duration: 6500, caption: "Detalle del ventanal frontal y exuberante vegetación tropical con palmeras." },
    { roomId: "andador_huellas", duration: 6000, caption: "Andador peatonal con placas de concreto lavado antiderrapante." },
    { roomId: "social_amplio", duration: 8000, caption: "Concepto de planta abierta con sala, comedor y cocina integrados." },
    { roomId: "sala", duration: 7000, caption: "Sala de estar confortable con iluminación natural y detalles botánicos." },
    { roomId: "comedor_cocina", duration: 7500, caption: "Cocina integral equipada con barra de granito pulido y estufa en acero inoxidable." },
    { roomId: "acceso_recamara", duration: 6000, caption: "Vestíbulo distribuidor hacia las áreas privadas de descanso." },
    { roomId: "recamara_principal", duration: 8000, caption: "Recámara principal con aire acondicionado, clóset de piso a techo y ventanal al jardín." },
    { roomId: "recamara_secundaria", duration: 7500, caption: "Segunda recámara o habitación juvenil con clóset de diseño, panel acústico alistonado y luz natural." },
    { roomId: "bano", duration: 7000, caption: "Baño completo de lujo con cancel de cristal templado y regadera de lluvia." }
  ]
};
