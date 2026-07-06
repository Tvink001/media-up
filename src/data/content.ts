// Single source of truth for the page's repeating content blocks.
// One-off section copy (headings, hero, CTA) lives in its component; anything
// rendered as a list lives here and is mapped over in the markup.

export interface Channel {
  emoji: string;
  name: string;
  sub: string;
}

export interface Partner {
  icon: string;
  name: string;
}

/** A niche icon is either a raster asset (resolved to an import in Niches.astro) or a text glyph. */
export type NicheIcon =
  | { kind: 'image'; key: 'education' | 'finance' | 'nutra' | 'saas' | 'leadgen' }
  | { kind: 'glyph'; char: string; head?: boolean };

export interface Niche {
  title: string;
  desc: string;
  tag: string;
  icon: NicheIcon;
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

// Mobile channel order (per the design handoff).
export const channels: Channel[] = [
  { emoji: '🚀', name: 'PropellerAds', sub: 'Push / Pop / OnClick' },
  { emoji: '🔍', name: 'Google Ads', sub: 'Search / Display / YouTube' },
  { emoji: '🍎', name: 'Apple Search Ads', sub: 'iOS App Install' },
  { emoji: '📘', name: 'Meta Ads', sub: 'Facebook / Instagram' },
  { emoji: '📰', name: 'Native Ads', sub: 'Taboola / Outbrain' },
  { emoji: '🎵', name: 'TikTok Ads', sub: 'In-Feed / TopView / Spark' },
  { emoji: '🔔', name: 'Push Notifications', sub: 'Web & In-App Push' },
  { emoji: '💥', name: 'Pop Traffic', sub: 'Popunder / Interstitial' },
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
    icon: { kind: 'image', key: 'education' },
  },
  {
    title: 'Finance',
    desc: 'Fintech products, investment platforms and financial services. Performance campaigns across high-value GEOS.',
    tag: 'Premium Traffic',
    icon: { kind: 'image', key: 'finance' },
  },
  {
    title: 'Nutra',
    desc: 'Weight loss, supplements, skincare. Native & push traffic specialization with compliant creatives.',
    tag: 'Premium GEOS',
    icon: { kind: 'image', key: 'nutra' },
  },
  {
    title: 'SaaS',
    desc: 'Software products, subscriptions and digital solutions. User acquisition campaigns built for scalable growth.',
    tag: 'Growth Focused',
    icon: { kind: 'image', key: 'saas' },
  },
  {
    title: 'Crypto Offers',
    desc: 'Crypto trading platforms, wallets and exchange offers. FTD & CPA models in regulated GEOS.',
    tag: 'Emerging',
    icon: { kind: 'glyph', char: '₿', head: true },
  },
  {
    title: 'iGaming',
    desc: 'Fantasy sports, esports betting and skill-based gaming platforms. Fast-growing vertical expertise.',
    tag: 'Fast Growth',
    icon: { kind: 'glyph', char: '🎮' },
  },
  {
    title: 'Mainstream',
    desc: 'App installs, e-commerce, utilities. Google, Meta and TikTok performance campaigns at scale.',
    tag: 'Versatile',
    icon: { kind: 'glyph', char: '📱' },
  },
  {
    title: 'Lead Generation',
    desc: 'Qualified traffic campaigns across multiple verticals. Conversion-focused funnels for business growth.',
    tag: 'Qualified Users',
    icon: { kind: 'image', key: 'leadgen' },
  },
];
