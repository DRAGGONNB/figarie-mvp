// FIGARIE Service Catalog
export const SERVICES = [
  {
    slug: 'private_air',
    name: 'Private Air Charters',
    icon: '🚁',
    description: 'Experience luxury travel with our private helicopter and jet charter services.',
    category: 'transport'
  },
  {
    slug: 'hot_air_balloon',
    name: 'Hot Air Balloon',
    icon: '🎈',
    description: 'Soar above breathtaking landscapes in an exclusive hot air balloon experience.',
    category: 'experiences'
  },
  {
    slug: 'yacht',
    name: 'Yacht Charters',
    icon: '🛥️',
    description: 'Cruise in style aboard our curated selection of luxury yachts.',
    category: 'transport'
  },
  {
    slug: 'catamaran',
    name: 'Catamaran Cruises',
    icon: '⛵',
    description: 'Sail the pristine waters with our premium catamaran charter service.',
    category: 'transport'
  },
  {
    slug: 'villas',
    name: 'Private Villas',
    icon: '🏡',
    description: 'Indulge in exclusive villa accommodations in the world\'s most sought-after destinations.',
    category: 'accommodation'
  },
  {
    slug: 'transfers',
    name: 'Private Transfers',
    icon: '🚗',
    description: 'Seamless, luxury ground transportation tailored to your needs.',
    category: 'transport'
  },
  {
    slug: 'luxury_rail',
    name: 'Luxury Rail',
    icon: '🚂',
    description: 'Journey through stunning landscapes in unparalleled comfort aboard luxury trains.',
    category: 'transport'
  },
  {
    slug: 'diamonds',
    name: 'Diamond Sales',
    icon: '💎',
    description: 'Acquire rare, ethically-sourced diamonds with expert consultation.',
    category: 'luxury_goods'
  },
  {
    slug: 'events',
    name: 'Event Services',
    icon: '🎪',
    description: 'Curate unforgettable experiences with our bespoke event planning services.',
    category: 'experiences'
  },
  {
    slug: 'photography',
    name: 'Photography',
    icon: '📸',
    description: 'Capture your memories with world-class photography services.',
    category: 'experiences'
  },
  {
    slug: 'protection',
    name: 'Protection Services',
    icon: '🛡️',
    description: 'Discreet, professional security services for your peace of mind.',
    category: 'services'
  },
  {
    slug: 'hotels',
    name: 'Hotel Representation',
    icon: '🏨',
    description: 'Access the finest hotels and resorts worldwide with VIP treatment.',
    category: 'accommodation'
  },
] as const

export const SERVICE_CATEGORIES = {
  transport: 'Transportation',
  experiences: 'Experiences',
  accommodation: 'Accommodation',
  luxury_goods: 'Luxury Goods',
  services: 'Services',
} as const

// Brand Colors
export const BRAND = {
  name: 'FIGARIE',
  tagline: 'Your Ultimate Luxury Experience',
  description: 'Curating extraordinary experiences for discerning travelers worldwide.',
} as const
