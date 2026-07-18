// Single source of truth for the page's repeating content blocks.
// One-off section copy (headings, hero, CTA) lives in its component; anything
// rendered as a list lives here and is mapped over in the markup.

export interface Channel {
  icon: string;
  name: string;
  sub: string;
}

export interface Partner {
  icon: string;
  name: string;
}

export type NicheIconKey =
  | 'education'
  | 'finance'
  | 'nutra'
  | 'saas'
  | 'crypto'
  | 'igaming'
  | 'mainstream'
  | 'leadgen';

export interface Niche {
  title: string;
  desc: string;
  tag: string;
  icon: NicheIconKey;
}

export const whyFail: string[] = [
  'Unstable campaign performance',
  'Inefficient budget allocation',
  'Lack of deep analytics',
  'Traffic without a clear strategy',
];

export const system: string[] = [
  'Strategy instead of chaotic launches',
  'Analytics instead of assumptions',
  'Data-driven optimization',
  'Scaling proven models',
];

export const channels: Channel[] = [
  { icon: 'propellerads', name: 'PropellerAds', sub: 'Push / Pop / OnClick' },
  { icon: 'googleads', name: 'Google Ads', sub: 'Search / Display / YouTube' },
  { icon: 'applesearchads', name: 'Apple Search Ads', sub: 'iOS App Install' },
  { icon: 'metaads', name: 'Meta Ads', sub: 'Facebook / Instagram' },
  { icon: 'tiktokads', name: 'TikTok Ads', sub: 'In-Feed / TopView / Spark' },
  { icon: 'nativeads', name: 'Native Ads', sub: 'Taboola / Outbrain' },
  { icon: 'pushnotifications', name: 'Push Notifications', sub: 'Web & In-App Push' },
  { icon: 'poptraffic', name: 'Pop Traffic', sub: 'Popunder / Interstitial' },
];

export const partners: Partner[] = [
  { icon: '🌐', name: 'Ads.com' },
  { icon: '⚡', name: 'Tonic' },
  { icon: '🔭', name: 'Visymo' },
  { icon: '💼', name: 'ClickDealer' },
  { icon: '🏅', name: 'VortexHub' },
  { icon: '🎯', name: 'AdVance Pro' },
  { icon: '💎', name: 'PeakNet CPA' },
  { icon: '🔗', name: 'LynkAffiliates' },
  { icon: '🚀', name: 'FluxMedia' },
  { icon: '🌟', name: 'NorthStar Network' },
  { icon: '📊', name: 'Affiliate Networks' },
];

export const niches: Niche[] = [
  {
    title: 'Education',
    desc: 'Online courses, e-learning and digital education offers. Performance traffic at scale.',
    tag: 'Scalable Growth',
    icon: 'education',
  },
  {
    title: 'Finance',
    desc: 'Fintech products, investment platforms and financial services. Performance campaigns across high-value GEOS.',
    tag: 'Premium Traffic',
    icon: 'finance',
  },
  {
    title: 'Nutra',
    desc: 'Weight loss, supplements, skincare. Native & push traffic specialization with compliant creatives.',
    tag: 'Premium GEOS',
    icon: 'nutra',
  },
  {
    title: 'SaaS',
    desc: 'Software products, subscriptions and digital solutions. User acquisition campaigns built for scalable growth.',
    tag: 'Growth Focused',
    icon: 'saas',
  },
  {
    title: 'Crypto Offers',
    desc: 'Crypto trading platforms, wallets and exchange offers. FTD & CPA models in regulated GEOS.',
    tag: 'Emerging',
    icon: 'crypto',
  },
  {
    title: 'iGaming',
    desc: 'Fantasy sports, esports betting and skill-based gaming platforms. Fast-growing vertical expertise.',
    tag: 'Fast Growth',
    icon: 'igaming',
  },
  {
    title: 'Mainstream',
    desc: 'App installs, e-commerce, utilities. Google, Meta and TikTok performance campaigns at scale.',
    tag: 'Versatile',
    icon: 'mainstream',
  },
  {
    title: 'Lead Generation',
    desc: 'Qualified traffic campaigns across multiple verticals. Conversion-focused funnels for business growth.',
    tag: 'Qualified Users',
    icon: 'leadgen',
  },
];
