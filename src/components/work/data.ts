/**
 * Reference catalog for the /work page.
 *
 * `slug` doubles as the translation key (works.references.{slug}.description)
 * and the logo filename (`/brand/clients/{slug}.{ext}`). Categories drive the
 * filter UI; legacy entries are listed in compact text form at the bottom of
 * the page rather than in the featured grid.
 */

export type WorkCategory =
  | 'ecommerce'
  | 'custom'
  | 'corporate'
  | 'mobile'
  | 'education'
  | 'services';

export type WorkReference = {
  slug: string;
  name: string;
  url?: string;          // omit for sites we don't want to link out to (e.g. mid-rebuild)
  category: WorkCategory;
  logo: string;          // path under /public
  tech?: string;         // platform / stack tag
  year?: string;
  featured?: boolean;
};

export const FEATURED_REFERENCES: WorkReference[] = [
  // ---- Active flagship work (e-commerce + custom heavy) ----
  {
    slug: 'pt',
    name: 'Pozitif Teknoloji',
    url: 'https://pt.com.tr',
    category: 'ecommerce',
    logo: '/brand/clients/pt.svg',
    tech: 'WooCommerce + Custom',
    featured: true,
  },
  {
    slug: 'markettengelse',
    name: 'Marketten Gelse',
    url: 'https://markettengelse.com',
    category: 'ecommerce',
    logo: '/brand/clients/markettengelse.svg',
    tech: 'WooCommerce + TROY',
    featured: true,
  },
  {
    slug: 'muyubi',
    name: 'Muyubi',
    url: 'https://muyubi.com',
    category: 'ecommerce',
    logo: '/brand/clients/muyubi.png',
    tech: 'WooCommerce',
    featured: true,
  },
  {
    slug: 'e-cnt',
    name: 'CNT İç Giyim',
    url: 'https://e-cnt.com.tr',
    category: 'ecommerce',
    logo: '/brand/clients/e-cnt.jpg',
    tech: 'WooCommerce',
    featured: true,
  },
  {
    slug: 'lesfleurs',
    name: 'Les Fleurs',
    url: 'https://lesfleurs.com.tr',
    category: 'ecommerce',
    logo: '/brand/clients/lesfleurs.png',
    tech: 'WooCommerce',
  },
  {
    slug: 'petask',
    name: 'Petaşk',
    url: 'https://petask.com.tr',
    category: 'ecommerce',
    logo: '/brand/clients/petask.png',
    tech: 'WooCommerce',
    featured: true,
  },
  {
    slug: 'bernarpet',
    name: 'Bernarpet',
    url: 'https://bernarpet.com',
    category: 'custom',
    logo: '/brand/clients/bernarpet.png',
    tech: 'Custom Software',
  },
  {
    slug: 'raks',
    name: 'RAKS',
    url: 'https://raks.com.tr',
    category: 'ecommerce',
    logo: '/brand/clients/raks.webp',
    tech: 'İkas',
    featured: true,
  },
  {
    slug: 'mygumus',
    name: 'Mygumus',
    url: 'https://www.mygumus.com',
    category: 'ecommerce',
    logo: '/brand/clients/mygumus.png',
    tech: 'Magento',
  },
  {
    slug: 'bimotif',
    name: 'Bimotif',
    url: 'https://www.bimotif.com',
    category: 'ecommerce',
    logo: '/brand/clients/bimotif.png',
    tech: 'T-Soft + Custom',
    featured: true,
  },
  {
    slug: 'teknorot',
    name: 'Teknorot',
    url: 'https://www.teknorot.com',
    category: 'ecommerce',
    logo: '/brand/clients/teknorot.png',
    tech: 'WooCommerce',
  },
  {
    slug: 'etnicfoodsturkey',
    name: 'Etnic Foods Turkey',
    url: 'https://etnicfoodsturkey.com',
    category: 'corporate',
    logo: '/brand/clients/etnicfoodsturkey.png',
    tech: 'WordPress',
  },

  // ---- Custom software ----
  {
    slug: 'emind',
    name: 'eMind Teknoloji',
    url: 'https://emind.com.tr',
    category: 'custom',
    logo: '/brand/clients/emind.png',
    tech: 'Custom Software',
    featured: true,
  },
  {
    slug: 'kampanyaradar',
    name: 'Kampanya Radar',
    url: 'https://kampanyaradar.com',
    category: 'custom',
    logo: '/brand/clients/kampanyaradar.png',
    tech: 'Custom Platform',
    featured: true,
  },
  {
    slug: 'idfleks',
    name: 'idfleks',
    url: 'https://idfleks.com',
    category: 'custom',
    logo: '/brand/clients/idfleks.svg',
    tech: 'Custom Software',
  },
  {
    slug: 'hobim',
    name: 'Hobim',
    url: 'https://hobim.com',
    category: 'corporate',
    logo: '/brand/clients/hobim.png',
    tech: 'Custom Software',
  },
  {
    slug: 'kocakgoldbasaksehir',
    name: 'Koçak Gold',
    url: 'https://kocakgoldbasaksehir.com',
    category: 'mobile',
    logo: '/brand/clients/kocakgoldbasaksehir.svg',
    tech: 'Mobile + Web',
  },

  // ---- Corporate / services ----
  {
    slug: 'pirim',
    name: 'Pirim Gıda',
    category: 'corporate',
    logo: '/brand/clients/pirim.png',
    tech: 'Renewal',
  },
  {
    slug: 'net-muhendislik',
    name: 'NET Mühendislik',
    url: 'https://net-muhendislik.com',
    category: 'corporate',
    logo: '/brand/clients/net-muhendislik.png',
    tech: 'WordPress',
  },
  {
    slug: 'empatist',
    name: 'Empatist Nişantaşı',
    url: 'https://empatist.com',
    category: 'services',
    logo: '/brand/clients/empatist.png',
    tech: 'WordPress + Custom',
  },
  {
    slug: 'oznurcaglayan',
    name: 'Öznur Çağlayan',
    url: 'https://oznurcaglayan.com',
    category: 'corporate',
    logo: '/brand/clients/oznurcaglayan.png',
    tech: 'WordPress',
  },

  // ---- Education vertical ----
  {
    slug: 'topstudy',
    name: 'Topstudy',
    url: 'https://topstudy.com',
    category: 'education',
    logo: '/brand/clients/topstudy.svg',
    tech: 'Custom Platform',
  },
  {
    slug: 'linguland',
    name: 'Linguland',
    url: 'https://linguland.com',
    category: 'education',
    logo: '/brand/clients/linguland.png',
    tech: 'Custom Platform',
  },
  {
    slug: 'academiaunited',
    name: 'Academia United',
    url: 'https://academiaunited.com',
    category: 'education',
    logo: '/brand/clients/academiaunited.svg',
    tech: 'Custom Platform',
  },
  {
    slug: 'kaplaninternational',
    name: 'Kaplan International',
    url: 'https://www.kaplaninternational.com',
    category: 'education',
    logo: '/brand/clients/kaplaninternational.png',
    tech: 'Custom Support',
  },
];

/**
 * Compact, secondary-tier references — listed without descriptions in a
 * tighter grid, with whatever logo we managed to grab.
 */
export const COMPACT_REFERENCES: WorkReference[] = [
  { slug: 'gssportif', name: 'GS Sportif', url: 'https://gssportif.com', category: 'ecommerce', logo: '/brand/clients/gssportif.png' },
  { slug: 'kismetbymilka', name: 'Kismet by Milka', url: 'https://kismetbymilka.com', category: 'ecommerce', logo: '/brand/clients/kismetbymilka.jpg' },
  { slug: 'anvogg', name: 'Anvogg', url: 'https://anvogg.com', category: 'ecommerce', logo: '/brand/clients/anvogg.png' },
  { slug: 'deriderim', name: 'Deriderim', url: 'https://deriderim.com', category: 'ecommerce', logo: '/brand/clients/deriderim.ico' },
  { slug: 'eksenmobilya', name: 'Eksen Mobilya', url: 'https://eksenmobilya.com', category: 'ecommerce', logo: '/brand/clients/eksenmobilya.png' },
  { slug: 'vitanovaevdesaglik', name: 'Vitanova', url: 'https://vitanovaevdesaglik.com', category: 'services', logo: '/brand/clients/vitanovaevdesaglik.png' },
  { slug: 'kuvarslojistik', name: 'Kuvars Lojistik', url: 'https://www.kuvarslojistik.com.tr', category: 'corporate', logo: '/brand/clients/kuvarslojistik.png' },
  { slug: 'kamaartdizayn', name: 'Kama Art Dizayn', url: 'http://www.kamaartdizayn.com', category: 'corporate', logo: '/brand/clients/kamaartdizayn.ico' },
  { slug: 'universalelt', name: 'Universal ELT', url: 'https://universalelt.com', category: 'education', logo: '/brand/clients/universalelt.png' },
  { slug: 'ceotudent', name: 'CEOtudent', url: 'https://ceotudent.com', category: 'education', logo: '/brand/clients/ceotudent.png' },
  { slug: 'societyistanbul', name: 'Society Istanbul', url: 'https://www.societyistanbul.com', category: 'corporate', logo: '/brand/clients/societyistanbul.png' },
  { slug: 'emlakwebtv', name: 'Emlak WebTV', url: 'https://www.emlakwebtv.com', category: 'corporate', logo: '/brand/clients/emlakwebtv.png' },
  { slug: 'kayzerhosting', name: 'Kayzer Hosting', url: 'https://www.kayzerhosting.com', category: 'corporate', logo: '/brand/clients/kayzerhosting.png' },
  { slug: 'suainsaat', name: 'SUA İnşaat', url: 'https://suainsaat.com.tr', category: 'corporate', logo: '/brand/clients/suainsaat.png' },
  { slug: 'miranlegal', name: 'Miran Legal', url: 'https://miranlegal.com.tr', category: 'services', logo: '/brand/clients/miranlegal.png' },
  { slug: 'ozlemduran', name: 'Özlem Duran', url: 'https://ozlemduran.com.tr', category: 'corporate', logo: '/brand/clients/ozlemduran.ico' },
];

/**
 * Legacy portfolio (2015–2019) — text-only roll-up for archive scale.
 * Most are no longer maintained by us; included as historical proof of
 * volume across e-commerce, content and custom builds.
 */
export const LEGACY_REFERENCES: { name: string; tech: string; era: string }[] = [
  // 2017–2018 era
  { name: 'cazador.com.tr', tech: 'Magento', era: '2017–2018' },
  { name: 'cabaretcineflowers.com', tech: 'WooCommerce', era: '2017–2018' },
  { name: 'parmori.com', tech: 'Magento', era: '2017–2018' },
  { name: 'sentezfilo.com.tr', tech: 'Custom Software', era: '2017–2018' },
  { name: 'vesyum.com', tech: 'Magento', era: '2017–2018' },
  { name: 'aniqnaturals.com', tech: 'Magento', era: '2017–2018' },
  { name: 'gunesgrup.com', tech: 'WordPress', era: '2017–2018' },
  { name: 'blog.rosense.com', tech: 'WordPress', era: '2017–2018' },
  { name: 'bitkishop.com', tech: 'Magento', era: '2017–2018' },
  { name: 'botanikstore.com', tech: 'Magento', era: '2017–2018' },
  { name: 'denimsquared.com', tech: 'Magento', era: '2017–2018' },
  { name: 'tk-motors.com', tech: 'WordPress + Custom', era: '2017–2018' },
  { name: 'aramakas.com', tech: 'Laravel + Custom', era: '2017–2018' },
  { name: 'dogaacademy.com', tech: 'Laravel + Custom', era: '2017–2018' },
  { name: 'sevil.com.tr', tech: 'Magento', era: '2017–2018' },
  { name: 'metrics34.co.uk', tech: 'Custom Single-Page', era: '2017–2018' },
  // 2015–2016 era
  { name: 'jjkids.com.tr', tech: 'WooCommerce', era: '2015–2016' },
  { name: 'unibaby.com.tr', tech: 'WordPress', era: '2015–2016' },
  { name: 'markadugun.com', tech: 'Custom Software', era: '2015–2016' },
  { name: 'lifeplus.com.tr', tech: 'WordPress', era: '2015–2016' },
  { name: 'memlekettengelsin.com', tech: 'Magento', era: '2015–2016' },
  { name: 'yapiwebtv.com', tech: 'Custom Software', era: '2015–2016' },
  { name: 'modasahne.com', tech: 'WordPress', era: '2015–2016' },
  { name: 'decorazyon.com', tech: 'WordPress', era: '2015–2016' },
  { name: 'annemekani.com', tech: 'WordPress', era: '2015–2016' },
  { name: 'empera.com.tr', tech: 'WordPress', era: '2015–2016' },
];
