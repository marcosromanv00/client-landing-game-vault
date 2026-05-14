export interface Game {
  slug: string;
  title: string;
  platform: 'PS5' | 'Xbox' | 'Nintendo' | 'PC' | 'Multi';
  genre: string;
  price: number;
  originalPrice?: number;
  description: string;
  badge?: 'Lo Nuevo' | 'En Oferta' | 'Más Vendido' | 'Exclusivo' | 'Pre-Venta';
  gradFrom: string;
  gradTo: string;
  gradAngle?: number;
  rating: number;
  reviewCount: number;
  esrb: 'E' | 'T' | 'M' | 'AO';
  releaseYear: number;
  image?: string;
}

export const GAMES: Game[] = [
  {
    slug: 'god-of-war-ragnarok',
    title: 'God of War: Ragnarök',
    platform: 'PS5',
    genre: 'Acción / Aventura',
    price: 59.99,
    description: 'En un mundo al borde del caos, Kratos y Atreus se embarcan en un viaje épico a través de los Nueve Reinos para evitar el Ragnarök, el profetizado fin de los días. Enfrentando dioses nórdicos, monstruos legendarios y los fantasmas de su propio pasado, deberán forjar nuevas alianzas y confrontar poderes antiguos antes de que el invierno eterno lo consuma todo.',
    badge: 'Más Vendido',
    gradFrom: '#1a0505',
    gradTo: '#8b1a1a',
    gradAngle: 145,
    rating: 4.9,
    reviewCount: 4821,
    esrb: 'M',
    releaseYear: 2022,
  },
  {
    slug: 'red-dead-redemption-2',
    title: 'Red Dead Redemption 2',
    platform: 'Multi',
    genre: 'Acción / Western',
    price: 59.99,
    description: 'Arthur Morgan y la banda de Van der Linde son forajidos en busca de redención en un Oeste americano que agoniza. En una historia de lealtad, sacrificio y libertad, Arthur deberá elegir entre sus propios ideales y la lealtad a la banda que lo crió mientras los agentes federales y los mejores cazarrecompensas de la nación les pisan los talones.',
    badge: 'Más Vendido',
    gradFrom: '#2a0505',
    gradTo: '#4e0000',
    gradAngle: 145,
    rating: 4.9,
    reviewCount: 9540,
    esrb: 'M',
    releaseYear: 2018,
  },
  {
    slug: 'elden-ring',
    title: 'Elden Ring',
    platform: 'PC',
    genre: 'RPG / Soulslike',
    price: 49.99,
    description: 'Explora las Tierras Intermedias en este épico RPG de acción de FromSoftware.',
    badge: 'Más Vendido',
    gradFrom: '#0a0a1a',
    gradTo: '#3a1a6e',
    gradAngle: 160,
    rating: 4.8,
    reviewCount: 6340,
    esrb: 'M',
    releaseYear: 2022,
  },
  {
    slug: 'spider-man-2',
    title: "Marvel's Spider-Man 2",
    platform: 'PS5',
    genre: 'Acción / Aventura',
    price: 69.99,
    description: 'Peter Parker y Miles Morales se enfrentan a Venom en una aventura sin precedentes.',
    badge: 'Exclusivo',
    gradFrom: '#1a0a1a',
    gradTo: '#7b1fa2',
    gradAngle: 135,
    rating: 4.7,
    reviewCount: 3210,
    esrb: 'T',
    releaseYear: 2023,
  },
  {
    slug: 'zelda-totk',
    title: 'Zelda: Tears of the Kingdom',
    platform: 'Nintendo',
    genre: 'Aventura / Mundo Abierto',
    price: 59.99,
    description: 'Link regresa a Hyrule en una aventura que desafía la imaginación y la física.',
    badge: 'Más Vendido',
    gradFrom: '#0a1a0a',
    gradTo: '#2e7d32',
    gradAngle: 150,
    rating: 4.9,
    reviewCount: 5120,
    esrb: 'E',
    releaseYear: 2023,
  },
  {
    slug: 'ea-sports-fc-24',
    title: 'EA Sports FC 24',
    platform: 'Multi',
    genre: 'Deportes / Fútbol',
    price: 39.99,
    originalPrice: 69.99,
    description: 'La experiencia de fútbol más auténtica con HyperMotionV Technology.',
    badge: 'En Oferta',
    gradFrom: '#0a0a1a',
    gradTo: '#0d47a1',
    gradAngle: 140,
    rating: 4.2,
    reviewCount: 8900,
    esrb: 'E',
    releaseYear: 2023,
  },
  {
    slug: 'resident-evil-4',
    title: 'Resident Evil 4 Remake',
    platform: 'Multi',
    genre: 'Survival Horror',
    price: 39.99,
    description: 'La obra maestra reimaginada con gráficos modernos y nuevo contenido.',
    badge: 'En Oferta',
    gradFrom: '#0a0f0a',
    gradTo: '#1b5e20',
    gradAngle: 155,
    rating: 4.8,
    reviewCount: 2980,
    esrb: 'M',
    releaseYear: 2023,
  },
  {
    slug: 'halo-infinite',
    title: 'Halo Infinite',
    platform: 'Xbox',
    genre: 'Shooter / FPS',
    price: 29.99,
    originalPrice: 59.99,
    description: 'El Jefe Maestro regresa en la campaña más ambiciosa de la saga Halo.',
    badge: 'En Oferta',
    gradFrom: '#0a1a1a',
    gradTo: '#006064',
    gradAngle: 135,
    rating: 4.1,
    reviewCount: 4450,
    esrb: 'T',
    releaseYear: 2021,
  },
  {
    slug: 'mario-wonder',
    title: "Super Mario Bros. Wonder",
    platform: 'Nintendo',
    genre: 'Plataformas',
    price: 59.99,
    description: 'La reinvención del Mario 2D con las Flores Maravilla que transforman cada nivel.',
    badge: 'Lo Nuevo',
    gradFrom: '#1a0a00',
    gradTo: '#e65100',
    gradAngle: 145,
    rating: 4.9,
    reviewCount: 3670,
    esrb: 'E',
    releaseYear: 2023,
  },
  {
    slug: 'starfield',
    title: 'Starfield',
    platform: 'Xbox',
    genre: 'RPG / Sci-Fi',
    price: 49.99,
    description: 'Embárcate en una épica odisea espacial de Bethesda con más de 1000 planetas.',
    gradFrom: '#050510',
    gradTo: '#1a237e',
    gradAngle: 160,
    rating: 4.0,
    reviewCount: 5200,
    esrb: 'M',
    releaseYear: 2023,
  },
  {
    slug: 'the-last-of-us-2',
    title: 'The Last of Us Part II',
    platform: 'PS5',
    genre: 'Acción / Drama',
    price: 29.99,
    originalPrice: 49.99,
    description: 'Ellie emprende un viaje brutal por un Estados Unidos post-apocalíptico.',
    badge: 'En Oferta',
    gradFrom: '#0f0a08',
    gradTo: '#4e342e',
    gradAngle: 140,
    rating: 4.7,
    reviewCount: 7800,
    esrb: 'M',
    releaseYear: 2020,
  },
  {
    slug: 'final-fantasy-xvi',
    title: 'Final Fantasy XVI',
    platform: 'PS5',
    genre: 'RPG / Acción',
    price: 49.99,
    description: 'Una historia oscura y épica de Eikones y política en el mundo de Valisthea.',
    badge: 'Exclusivo',
    gradFrom: '#05051a',
    gradTo: '#311b92',
    gradAngle: 150,
    rating: 4.5,
    reviewCount: 2100,
    esrb: 'M',
    releaseYear: 2023,
  },
  {
    slug: 'hogwarts-legacy',
    title: 'Hogwarts Legacy',
    platform: 'Multi',
    genre: 'RPG / Aventura',
    price: 34.99,
    originalPrice: 59.99,
    description: 'Vive tu propia historia en el siglo XIX del mundo mágico de Harry Potter.',
    badge: 'En Oferta',
    gradFrom: '#0a0a14',
    gradTo: '#283593',
    gradAngle: 145,
    rating: 4.4,
    reviewCount: 9100,
    esrb: 'T',
    releaseYear: 2023,
  },
  {
    slug: 'dead-space-remake',
    title: 'Dead Space Remake',
    platform: 'Multi',
    genre: 'Survival Horror',
    price: 44.99,
    description: 'Isaac Clarke regresa en una reconstrucción terror de culto que define el género.',
    gradFrom: '#050a0a',
    gradTo: '#263238',
    gradAngle: 155,
    rating: 4.6,
    reviewCount: 1850,
    esrb: 'M',
    releaseYear: 2023,
  },
  {
    slug: 'gran-turismo-7',
    title: 'Gran Turismo 7',
    platform: 'PS5',
    genre: 'Racing / Simulación',
    price: 34.99,
    originalPrice: 69.99,
    description: 'La simulación de conducción definitiva con más de 400 autos y circuitos reales.',
    badge: 'En Oferta',
    gradFrom: '#050514',
    gradTo: '#1565c0',
    gradAngle: 140,
    rating: 4.3,
    reviewCount: 3400,
    esrb: 'E',
    releaseYear: 2022,
  },
  {
    slug: 'street-fighter-6',
    title: 'Street Fighter 6',
    platform: 'Multi',
    genre: 'Pelea',
    price: 44.99,
    description: 'La nueva era de los juegos de pelea con el innovador modo World Tour.',
    badge: 'Lo Nuevo',
    gradFrom: '#140505',
    gradTo: '#b71c1c',
    gradAngle: 145,
    rating: 4.6,
    reviewCount: 2700,
    esrb: 'T',
    releaseYear: 2023,
  },
  {
    slug: 'diablo-iv',
    title: 'Diablo IV',
    platform: 'Multi',
    genre: 'RPG / Hack and Slash',
    price: 39.99,
    originalPrice: 69.99,
    description: 'El oscuro mundo de Santuario regresa con Lilith como amenaza definitiva.',
    badge: 'En Oferta',
    gradFrom: '#0a0505',
    gradTo: '#3e0000',
    gradAngle: 160,
    rating: 4.2,
    reviewCount: 4100,
    esrb: 'M',
    releaseYear: 2023,
  },
  {
    slug: 'mortal-kombat-1',
    title: 'Mortal Kombat 1',
    platform: 'Multi',
    genre: 'Pelea',
    price: 49.99,
    description: 'Liu Kang reinicia la línea de tiempo y da vida a un nuevo universo Mortal Kombat.',
    badge: 'Lo Nuevo',
    gradFrom: '#0a0508',
    gradTo: '#880e4f',
    gradAngle: 145,
    rating: 4.3,
    reviewCount: 1980,
    esrb: 'M',
    releaseYear: 2023,
  },
  {
    slug: 'cyberpunk-2077',
    title: 'Cyberpunk 2077',
    platform: 'PC',
    genre: 'RPG / Acción',
    price: 29.99,
    originalPrice: 59.99,
    description: 'Night City te espera. Juego de rol de acción en un futuro distópico abierto.',
    badge: 'En Oferta',
    gradFrom: '#041410',
    gradTo: '#004d40',
    gradAngle: 140,
    rating: 4.5,
    reviewCount: 11200,
    esrb: 'M',
    releaseYear: 2020,
  },
  {
    slug: 'baldurs-gate-3',
    title: "Baldur's Gate 3",
    platform: 'PC',
    genre: 'RPG',
    price: 59.99,
    description: 'El RPG más aclamado de la década. Miles de horas de D&D puro.',
    badge: 'Más Vendido',
    gradFrom: '#0a0a05',
    gradTo: '#33691e',
    gradAngle: 155,
    rating: 5.0,
    reviewCount: 15600,
    esrb: 'M',
    releaseYear: 2023,
  },
  {
    slug: 'alan-wake-2',
    title: 'Alan Wake 2',
    platform: 'Multi',
    genre: 'Survival Horror',
    price: 49.99,
    description: 'Alan Wake regresa en una secuela oscura que mezcla realidad y ficción.',
    badge: 'Lo Nuevo',
    gradFrom: '#050a14',
    gradTo: '#1a237e',
    gradAngle: 150,
    rating: 4.6,
    reviewCount: 1430,
    esrb: 'M',
    releaseYear: 2023,
  },
];

export interface Accessory {
  slug: string;
  title: string;
  brand: string;
  price: number;
  image: string;
  gradFrom: string;
  gradTo: string;
  badge?: string;
}

export const ACCESSORIES: Accessory[] = [
  {
    slug: 'dualsense-edge',
    title: 'DualSense Edge Wireless Controller',
    brand: 'Sony',
    price: 199.99,
    image: 'bg-white',
    gradFrom: '#1a1a1a',
    gradTo: '#4a4a4a',
    badge: 'Premium',
  },
  {
    slug: 'xbox-elite-2',
    title: 'Xbox Elite Wireless Controller Series 2',
    brand: 'Microsoft',
    price: 179.99,
    image: 'bg-dark',
    gradFrom: '#0a1a0a',
    gradTo: '#1b5e20',
  },
  {
    slug: 'pulse-3d-headset',
    title: 'PULSE 3D Wireless Headset',
    brand: 'Sony',
    price: 99.99,
    image: 'bg-light',
    gradFrom: '#0d47a1',
    gradTo: '#000',
  },
  {
    slug: 'nintendo-switch-pro',
    title: 'Nintendo Switch Pro Controller',
    brand: 'Nintendo',
    price: 69.99,
    image: 'bg-dark',
    gradFrom: '#e65100',
    gradTo: '#000',
  }
];

export interface Console {
  slug: string;
  title: string;
  brand: string;
  price: number;
  image: string;
  gradFrom: string;
  gradTo: string;
  badge?: string;
}

export const CONSOLES: Console[] = [
  {
    slug: 'ps5-slim',
    title: 'PlayStation 5 Slim Edition',
    brand: 'Sony',
    price: 499.99,
    image: 'bg-white',
    gradFrom: '#000',
    gradTo: '#1a1a1a',
    badge: 'Más Vendida',
  },
  {
    slug: 'xbox-series-x',
    title: 'Xbox Series X 1TB',
    brand: 'Microsoft',
    price: 499.99,
    image: 'bg-dark',
    gradFrom: '#0a0a0a',
    gradTo: '#1b5e20',
  },
  {
    slug: 'switch-oled',
    title: 'Nintendo Switch – OLED Model',
    brand: 'Nintendo',
    price: 349.99,
    image: 'bg-light',
    gradFrom: '#e41e1e',
    gradTo: '#000',
  }
];

export function searchGames(query: string): Game[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return GAMES.filter(
    (g) =>
      g.title.toLowerCase().includes(q) ||
      g.genre.toLowerCase().includes(q) ||
      g.platform.toLowerCase().includes(q)
  ).slice(0, 6);
}

export function getGame(slug: string): Game | undefined {
  return GAMES.find((g) => g.slug === slug);
}

export function getRelated(game: Game, limit = 4): Game[] {
  return GAMES.filter(
    (g) => g.slug !== game.slug && (g.platform === game.platform || g.genre === game.genre)
  ).slice(0, limit);
}
