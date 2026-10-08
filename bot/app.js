/**
 * EA SPORTS FC MOBILE 25 ONLINE - JAVASCRIPT ENGINE
 * 100% BEPUL FUTBOL ILovASI (PACKS, SQUAD, PENALTY, VS ATTACK, H2H, MARKET, LUCKY WHEEL)
 */

// ===================================================================
// 1. AUDIO SYNTHESIZER (WEB AUDIO API)
// ===================================================================
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  play(type) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      if (type === 'click') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'coin') {
        [987.77, 1318.51].forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);
          gain.gain.setValueAtTime(0.25, now + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.2);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.07);
          osc.stop(now + idx * 0.07 + 0.2);
        });
      } else if (type === 'whistle') {
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc1.frequency.setValueAtTime(2400, now);
        osc2.frequency.setValueAtTime(2580, now);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.35);
        osc2.stop(now + 0.35);
      } else if (type === 'goal') {
        // Boom sound + fanfare chord
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.4);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);

        // Fanfare chord
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          const fOsc = this.ctx.createOscillator();
          const fGain = this.ctx.createGain();
          fOsc.type = 'triangle';
          fOsc.frequency.setValueAtTime(freq, now + 0.1 + i * 0.08);
          fGain.gain.setValueAtTime(0.25, now + 0.1 + i * 0.08);
          fGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
          fOsc.connect(fGain);
          fGain.connect(this.ctx.destination);
          fOsc.start(now + 0.1 + i * 0.08);
          fOsc.stop(now + 0.6);
        });
      } else if (type === 'miss') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.25);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'fanfare') {
        const notes = [440, 554, 659, 880];
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          gain.gain.setValueAtTime(0.2, now + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.4);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 0.4);
        });
      } else if (type === 'tick') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.02);
      }
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }
}

const sounds = new SoundEngine();

// ===================================================================
// 2. MASTER PLAYER DATABASE (AUTHENTIC EA FC 25 ROSTER & UZBEK STARS)
// ===================================================================
const PLAYERS_DATABASE = [
  // --- TOTY ELITES (100 - 102 OVR) ---
  {
    id: 'mbappe_toty',
    name: 'Kylian Mbappé',
    ovr: 101,
    pos: 'ST',
    tier: 'TOTY',
    club: 'Real Madrid',
    flag: '🇫🇷',
    stats: { pac: 104, sho: 102, pas: 94, dri: 103, def: 52, phy: 91 },
    price: 3500000,
    avatar: '⚡'
  },
  {
    id: 'haaland_toty',
    name: 'Erling Haaland',
    ovr: 101,
    pos: 'ST',
    tier: 'TOTY',
    club: 'Manchester City',
    flag: '🇳🇴',
    stats: { pac: 101, sho: 105, pas: 85, dri: 92, def: 58, phy: 104 },
    price: 3400000,
    avatar: '🤖'
  },
  {
    id: 'vinicius_toty',
    name: 'Vinícius Jr',
    ovr: 100,
    pos: 'LW',
    tier: 'TOTY',
    club: 'Real Madrid',
    flag: '🇧🇷',
    stats: { pac: 105, sho: 97, pas: 93, dri: 104, def: 48, phy: 88 },
    price: 3100000,
    avatar: '🕺'
  },
  {
    id: 'bellingham_toty',
    name: 'Jude Bellingham',
    ovr: 100,
    pos: 'CAM',
    tier: 'TOTY',
    club: 'Real Madrid',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    stats: { pac: 96, sho: 98, pas: 99, dri: 100, def: 91, phy: 97 },
    price: 3000000,
    avatar: '👑'
  },
  {
    id: 'debruyne_toty',
    name: 'Kevin De Bruyne',
    ovr: 99,
    pos: 'CM',
    tier: 'TOTY',
    club: 'Manchester City',
    flag: '🇧🇪',
    stats: { pac: 89, sho: 97, pas: 105, dri: 98, def: 78, phy: 89 },
    price: 2800000,
    avatar: '🎯'
  },
  {
    id: 'rodri_toty',
    name: 'Rodri',
    ovr: 99,
    pos: 'CDM',
    tier: 'TOTY',
    club: 'Manchester City',
    flag: '🇪🇸',
    stats: { pac: 88, sho: 92, pas: 98, dri: 94, def: 102, phy: 100 },
    price: 2700000,
    avatar: '🛡️'
  },
  {
    id: 'vandijk_toty',
    name: 'Virgil van Dijk',
    ovr: 100,
    pos: 'CB',
    tier: 'TOTY',
    club: 'Liverpool',
    flag: '🇳🇱',
    stats: { pac: 92, sho: 68, pas: 88, dri: 89, def: 104, phy: 103 },
    price: 3200000,
    avatar: '🧱'
  },
  {
    id: 'dias_toty',
    name: 'Rúben Dias',
    ovr: 98,
    pos: 'CB',
    tier: 'TOTY',
    club: 'Manchester City',
    flag: '🇵🇹',
    stats: { pac: 90, sho: 58, pas: 84, dri: 86, def: 101, phy: 99 },
    price: 2500000,
    avatar: '⚓'
  },
  {
    id: 'davies_toty',
    name: 'Alphonso Davies',
    ovr: 98,
    pos: 'LB',
    tier: 'TOTY',
    club: 'Bayern Munich',
    flag: '🇨🇦',
    stats: { pac: 104, sho: 82, pas: 90, dri: 96, def: 94, phy: 93 },
    price: 2400000,
    avatar: '🚀'
  },
  {
    id: 'frimpong_toty',
    name: 'Jeremie Frimpong',
    ovr: 98,
    pos: 'RB',
    tier: 'TOTY',
    club: 'Bayer Leverkusen',
    flag: '🇳🇱',
    stats: { pac: 105, sho: 86, pas: 91, dri: 98, def: 92, phy: 89 },
    price: 2300000,
    avatar: '💨'
  },
  {
    id: 'courtois_toty',
    name: 'Thibaut Courtois',
    ovr: 99,
    pos: 'GK',
    tier: 'TOTY',
    club: 'Real Madrid',
    flag: '🇧🇪',
    stats: { pac: 95, sho: 96, pas: 88, dri: 94, def: 55, phy: 100 },
    price: 2900000,
    avatar: '🧤'
  },

  // --- PRIME ICONS (99 - 102 OVR) ---
  {
    id: 'pele_icon',
    name: 'Pelé',
    ovr: 102,
    pos: 'ST',
    tier: 'ICON',
    club: 'Icon FC',
    flag: '🇧🇷',
    stats: { pac: 103, sho: 104, pas: 99, dri: 104, def: 65, phy: 95 },
    price: 5000000,
    avatar: '👑'
  },
  {
    id: 'maradona_icon',
    name: 'Diego Maradona',
    ovr: 101,
    pos: 'CAM',
    tier: 'ICON',
    club: 'Icon FC',
    flag: '🇦🇷',
    stats: { pac: 100, sho: 101, pas: 103, dri: 105, def: 58, phy: 90 },
    price: 4500000,
    avatar: '🌟'
  },
  {
    id: 'ronaldinho_icon',
    name: 'Ronaldinho',
    ovr: 101,
    pos: 'LW',
    tier: 'ICON',
    club: 'Icon FC',
    flag: '🇧🇷',
    stats: { pac: 101, sho: 99, pas: 102, dri: 105, def: 52, phy: 92 },
    price: 4400000,
    avatar: '🤙'
  },
  {
    id: 'zidane_icon',
    name: 'Zinedine Zidane',
    ovr: 101,
    pos: 'CAM',
    tier: 'ICON',
    club: 'Icon FC',
    flag: '🇫🇷',
    stats: { pac: 95, sho: 99, pas: 104, dri: 102, def: 85, phy: 96 },
    price: 4300000,
    avatar: '🎩'
  },
  {
    id: 'maldini_icon',
    name: 'Paolo Maldini',
    ovr: 101,
    pos: 'CB',
    tier: 'ICON',
    club: 'Milan',
    flag: '🇮🇹',
    stats: { pac: 96, sho: 65, pas: 89, dri: 88, def: 105, phy: 98 },
    price: 4200000,
    avatar: '🛡️'
  },
  {
    id: 'rcarlos_icon',
    name: 'Roberto Carlos',
    ovr: 99,
    pos: 'LB',
    tier: 'ICON',
    club: 'Real Madrid',
    flag: '🇧🇷',
    stats: { pac: 103, sho: 99, pas: 94, dri: 92, def: 96, phy: 99 },
    price: 3600000,
    avatar: '💣'
  },
  {
    id: 'cafu_icon',
    name: 'Cafu',
    ovr: 99,
    pos: 'RB',
    tier: 'ICON',
    club: 'Milan',
    flag: '🇧🇷',
    stats: { pac: 101, sho: 84, pas: 93, dri: 95, def: 98, phy: 97 },
    price: 3500000,
    avatar: '⚡'
  },
  {
    id: 'ronaldo_icon',
    name: 'Cristiano Ronaldo',
    ovr: 101,
    pos: 'ST',
    tier: 'ICON',
    club: 'Al Nassr',
    flag: '🇵🇹',
    stats: { pac: 100, sho: 105, pas: 92, dri: 99, def: 50, phy: 98 },
    price: 4200000,
    avatar: '🐐'
  },
  {
    id: 'messi_icon',
    name: 'Lionel Messi',
    ovr: 101,
    pos: 'RW',
    tier: 'ICON',
    club: 'Inter Miami',
    flag: '🇦🇷',
    stats: { pac: 98, sho: 103, pas: 104, dri: 105, def: 48, phy: 86 },
    price: 4300000,
    avatar: '🐐'
  },

  // --- O'ZBEKISTON YULDUZLARI (93 - 98 OVR) ---
  {
    id: 'shomurodov_hero',
    name: 'Eldor Shomurodov',
    ovr: 97,
    pos: 'ST',
    tier: 'UZB_HERO',
    club: 'AS Roma',
    flag: '🇺🇿',
    stats: { pac: 98, sho: 99, pas: 89, dri: 95, def: 60, phy: 96 },
    price: 2200000,
    avatar: '🐺'
  },
  {
    id: 'fayzullaev_hero',
    name: 'Abbosbek Fayzullaev',
    ovr: 96,
    pos: 'CAM',
    tier: 'UZB_HERO',
    club: 'CSKA Moscow',
    flag: '🇺🇿',
    stats: { pac: 101, sho: 94, pas: 98, dri: 100, def: 65, phy: 85 },
    price: 2100000,
    avatar: '✨'
  },
  {
    id: 'masharipov_hero',
    name: 'Jaloliddin Masharipov',
    ovr: 95,
    pos: 'LW',
    tier: 'UZB_HERO',
    club: 'Esteghlal',
    flag: '🇺🇿',
    stats: { pac: 99, sho: 92, pas: 96, dri: 99, def: 55, phy: 86 },
    price: 1900000,
    avatar: '⚡'
  },
  {
    id: 'khusanov_hero',
    name: 'Abdukodir Khusanov',
    ovr: 96,
    pos: 'CB',
    tier: 'UZB_HERO',
    club: 'RC Lens',
    flag: '🇺🇿',
    stats: { pac: 97, sho: 55, pas: 86, dri: 88, def: 99, phy: 100 },
    price: 2000000,
    avatar: '🛡️'
  },
  {
    id: 'yusupov_hero',
    name: 'Utkir Yusupov',
    ovr: 94,
    pos: 'GK',
    tier: 'UZB_HERO',
    club: 'Foolad FC',
    flag: '🇺🇿',
    stats: { pac: 94, sho: 95, pas: 88, dri: 92, def: 50, phy: 95 },
    price: 1700000,
    avatar: '🧤'
  },
  {
    id: 'urunov_hero',
    name: 'Oston Urunov',
    ovr: 95,
    pos: 'RW',
    tier: 'UZB_HERO',
    club: 'Persepolis',
    flag: '🇺🇿',
    stats: { pac: 100, sho: 93, pas: 92, dri: 98, def: 62, phy: 94 },
    price: 1850000,
    avatar: '🌪️'
  },
  {
    id: 'ashurmatov_hero',
    name: 'Rustam Ashurmatov',
    ovr: 93,
    pos: 'CB',
    tier: 'UZB_HERO',
    club: 'Rubin Kazan',
    flag: '🇺🇿',
    stats: { pac: 91, sho: 50, pas: 82, dri: 84, def: 96, phy: 97 },
    price: 1500000,
    avatar: '🧱'
  },
  {
    id: 'sayfiev_hero',
    name: 'Farrukh Sayfiev',
    ovr: 93,
    pos: 'LB',
    tier: 'UZB_HERO',
    club: 'Navbahor',
    flag: '🇺🇿',
    stats: { pac: 95, sho: 75, pas: 88, dri: 89, def: 94, phy: 90 },
    price: 1400000,
    avatar: '🏃'
  },
  {
    id: 'alijonov_hero',
    name: 'Khojiakbar Alijonov',
    ovr: 93,
    pos: 'RB',
    tier: 'UZB_HERO',
    club: 'Pakhtakor',
    flag: '🇺🇿',
    stats: { pac: 96, sho: 78, pas: 90, dri: 91, def: 93, phy: 91 },
    price: 1450000,
    avatar: '⚡'
  },
  {
    id: 'shukurov_hero',
    name: 'Otabek Shukurov',
    ovr: 94,
    pos: 'CDM',
    tier: 'UZB_HERO',
    club: 'Al Fayha',
    flag: '🇺🇿',
    stats: { pac: 92, sho: 89, pas: 95, dri: 92, def: 96, phy: 96 },
    price: 1600000,
    avatar: '⚓'
  },

  // --- WORLD ELITE GOLD STARS (90 - 97 OVR) ---
  {
    id: 'yamal_gold',
    name: 'Lamine Yamal',
    ovr: 96,
    pos: 'RW',
    tier: 'GOLD',
    club: 'FC Barcelona',
    flag: '🇪🇸',
    stats: { pac: 102, sho: 94, pas: 96, dri: 101, def: 50, phy: 82 },
    price: 2100000,
    avatar: '💎'
  },
  {
    id: 'salah_gold',
    name: 'Mohamed Salah',
    ovr: 97,
    pos: 'RW',
    tier: 'GOLD',
    club: 'Liverpool',
    flag: '🇪🇬',
    stats: { pac: 98, sho: 99, pas: 94, dri: 98, def: 52, phy: 88 },
    price: 2300000,
    avatar: '👑'
  },
  {
    id: 'kane_gold',
    name: 'Harry Kane',
    ovr: 97,
    pos: 'ST',
    tier: 'GOLD',
    club: 'Bayern Munich',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    stats: { pac: 88, sho: 102, pas: 96, dri: 92, def: 55, phy: 93 },
    price: 2250000,
    avatar: '🎯'
  },
  {
    id: 'saka_gold',
    name: 'Bukayo Saka',
    ovr: 96,
    pos: 'RW',
    tier: 'GOLD',
    club: 'Arsenal',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    stats: { pac: 99, sho: 94, pas: 95, dri: 98, def: 68, phy: 87 },
    price: 2000000,
    avatar: '🌶️'
  },
  {
    id: 'wirtz_gold',
    name: 'Florian Wirtz',
    ovr: 96,
    pos: 'CAM',
    tier: 'GOLD',
    club: 'Bayer Leverkusen',
    flag: '🇩🇪',
    stats: { pac: 95, sho: 94, pas: 99, dri: 100, def: 64, phy: 84 },
    price: 2050000,
    avatar: '🎨'
  },
  {
    id: 'valverde_gold',
    name: 'Federico Valverde',
    ovr: 97,
    pos: 'CM',
    tier: 'GOLD',
    club: 'Real Madrid',
    flag: '🇺🇾',
    stats: { pac: 99, sho: 95, pas: 96, dri: 94, def: 90, phy: 98 },
    price: 2200000,
    avatar: '🦅'
  },
  {
    id: 'saliba_gold',
    name: 'William Saliba',
    ovr: 96,
    pos: 'CB',
    tier: 'GOLD',
    club: 'Arsenal',
    flag: '🇫🇷',
    stats: { pac: 94, sho: 50, pas: 85, dri: 87, def: 99, phy: 97 },
    price: 1950000,
    avatar: '🛡️'
  },
  {
    id: 'martinez_gold',
    name: 'Emiliano Martínez',
    ovr: 96,
    pos: 'GK',
    tier: 'GOLD',
    club: 'Aston Villa',
    flag: '🇦🇷',
    stats: { pac: 92, sho: 94, pas: 90, dri: 92, def: 52, phy: 97 },
    price: 1900000,
    avatar: '🧤'
  }
];

// Formation Positional Layouts (CSS % coordinates on pitch)
const FORMATIONS = {
  '4-3-3': [
    { slotId: 'gk', pos: 'GK', top: '88%', left: '50%' },
    { slotId: 'lb', pos: 'LB', top: '72%', left: '16%' },
    { slotId: 'cb1', pos: 'CB', top: '74%', left: '38%' },
    { slotId: 'cb2', pos: 'CB', top: '74%', left: '62%' },
    { slotId: 'rb', pos: 'RB', top: '72%', left: '84%' },
    { slotId: 'cm1', pos: 'CM', top: '50%', left: '26%' },
    { slotId: 'cam', pos: 'CAM', top: '44%', left: '50%' },
    { slotId: 'cm2', pos: 'CM', top: '50%', left: '74%' },
    { slotId: 'lw', pos: 'LW', top: '24%', left: '18%' },
    { slotId: 'st', pos: 'ST', top: '16%', left: '50%' },
    { slotId: 'rw', pos: 'RW', top: '24%', left: '82%' }
  ],
  '4-4-2': [
    { slotId: 'gk', pos: 'GK', top: '88%', left: '50%' },
    { slotId: 'lb', pos: 'LB', top: '72%', left: '16%' },
    { slotId: 'cb1', pos: 'CB', top: '74%', left: '38%' },
    { slotId: 'cb2', pos: 'CB', top: '74%', left: '62%' },
    { slotId: 'rb', pos: 'RB', top: '72%', left: '84%' },
    { slotId: 'lm', pos: 'LM', top: '48%', left: '18%' },
    { slotId: 'cm1', pos: 'CM', top: '50%', left: '38%' },
    { slotId: 'cm2', pos: 'CM', top: '50%', left: '62%' },
    { slotId: 'rm', pos: 'RM', top: '48%', left: '82%' },
    { slotId: 'st1', pos: 'ST', top: '20%', left: '36%' },
    { slotId: 'st2', pos: 'ST', top: '20%', left: '64%' }
  ],
  '3-5-2': [
    { slotId: 'gk', pos: 'GK', top: '88%', left: '50%' },
    { slotId: 'cb1', pos: 'CB', top: '74%', left: '24%' },
    { slotId: 'cb2', pos: 'CB', top: '76%', left: '50%' },
    { slotId: 'cb3', pos: 'CB', top: '74%', left: '76%' },
    { slotId: 'lm', pos: 'LM', top: '52%', left: '14%' },
    { slotId: 'cdm1', pos: 'CDM', top: '56%', left: '36%' },
    { slotId: 'cdm2', pos: 'CDM', top: '56%', left: '64%' },
    { slotId: 'rm', pos: 'RM', top: '52%', left: '86%' },
    { slotId: 'cam', pos: 'CAM', top: '38%', left: '50%' },
    { slotId: 'st1', pos: 'ST', top: '18%', left: '35%' },
    { slotId: 'st2', pos: 'ST', top: '18%', left: '65%' }
  ],
  '4-2-3-1': [
    { slotId: 'gk', pos: 'GK', top: '88%', left: '50%' },
    { slotId: 'lb', pos: 'LB', top: '74%', left: '16%' },
    { slotId: 'cb1', pos: 'CB', top: '76%', left: '38%' },
    { slotId: 'cb2', pos: 'CB', top: '76%', left: '62%' },
    { slotId: 'rb', pos: 'RB', top: '74%', left: '84%' },
    { slotId: 'cdm1', pos: 'CDM', top: '58%', left: '35%' },
    { slotId: 'cdm2', pos: 'CDM', top: '58%', left: '65%' },
    { slotId: 'lam', pos: 'LAM', top: '38%', left: '22%' },
    { slotId: 'cam', pos: 'CAM', top: '34%', left: '50%' },
    { slotId: 'ram', pos: 'RAM', top: '38%', left: '78%' },
    { slotId: 'st', pos: 'ST', top: '16%', left: '50%' }
  ]
};

// ===================================================================
// 3. GAME STATE & LOCALSTORAGE PERSISTENCE
// ===================================================================
class GameState {
  constructor() {
    this.STORAGE_KEY = 'fc_mobile_online_v1';
    this.data = this.loadState();
  }

  getDefaultState() {
    // Initial free club players to start with full squad
    const initialStarterIds = [
      'shomurodov_hero', 'fayzullaev_hero', 'masharipov_hero',
      'bellingham_toty', 'valverde_gold', 'rodri_toty',
      'davies_toty', 'khusanov_hero', 'saliba_gold', 'frimpong_toty',
      'yusupov_hero',
      // Some bench stars
      'mbappe_toty', 'ronaldo_icon', 'messi_icon'
    ];

    const club = initialStarterIds.map(id => {
      const p = PLAYERS_DATABASE.find(x => x.id === id);
      return { ...p, rank: 0 };
    });

    const starting11 = {
      gk: 'yusupov_hero',
      lb: 'davies_toty',
      cb1: 'khusanov_hero',
      cb2: 'saliba_gold',
      rb: 'frimpong_toty',
      cm1: 'valverde_gold',
      cam: 'fayzullaev_hero',
      cm2: 'rodri_toty',
      lw: 'masharipov_hero',
      st: 'shomurodov_hero',
      rw: 'bellingham_toty'
    };

    return {
      coins: 1000000,
      fp: 10000,
      formation: '4-3-3',
      starting11: starting11,
      club: club,
      quests: [
        { id: 'q_packs', title: '2 ta Paket ochish', target: 2, current: 0, rewardCoins: 100000, rewardFp: 1000, claimed: false },
        { id: 'q_penalty', title: '1 marta Penalti yutish', target: 1, current: 0, rewardCoins: 150000, rewardFp: 1500, claimed: false },
        { id: 'q_spin', title: 'Omad Charxpalagini aylantirish', target: 1, current: 0, rewardCoins: 80000, rewardFp: 500, claimed: false },
        { id: 'q_vsa', title: 'VS Hujumda gol urish', target: 3, current: 0, rewardCoins: 200000, rewardFp: 2000, claimed: false }
      ]
    };
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return this.getDefaultState();
  }

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  addCoins(amount) {
    this.data.coins += amount;
    this.save();
    sounds.play('coin');
    ui.renderCurrencies();
  }

  addFP(amount) {
    this.data.fp += amount;
    this.save();
    sounds.play('coin');
    ui.renderCurrencies();
  }

  addPlayerToClub(playerObj) {
    const exists = this.data.club.find(p => p.id === playerObj.id);
    if (exists) {
      exists.rank = (exists.rank || 0) + 1;
      exists.ovr = Math.min(105, exists.ovr + 1);
      ui.showToast(`✨ ${playerObj.name} kuchaytirildi! Yangi OVR: ${exists.ovr}`);
    } else {
      this.data.club.push({ ...playerObj, rank: 0 });
      ui.showToast(`🎉 ${playerObj.name} klubga qo'shildi!`);
    }
    this.save();
    ui.renderAll();
  }

  removePlayerFromClub(playerId) {
    const idx = this.data.club.findIndex(p => p.id === playerId);
    if (idx !== -1) {
      this.data.club.splice(idx, 1);
      // Remove from starting11 if slotted
      for (const slot in this.data.starting11) {
        if (this.data.starting11[slot] === playerId) {
          delete this.data.starting11[slot];
        }
      }
      this.save();
      ui.renderAll();
    }
  }

  updateQuest(questId, amount = 1) {
    const q = this.data.quests.find(x => x.id === questId);
    if (q && !q.claimed) {
      q.current = Math.min(q.target, q.current + amount);
      this.save();
      ui.renderQuests();
    }
  }
}

const state = new GameState();

// ===================================================================
// 4. UI CONTROLLER & VIEW LOGIC
// ===================================================================
class UIController {
  constructor() {
    this.currentView = 'view-home';
    this.pendingWalkoutCard = null;
    this.activeSlotSelection = null;
  }

  init() {
    this.bindNavigation();
    this.bindResourceButtons();
    this.bindPackButtons();
    this.bindSquadControls();
    this.bindLuckyWheel();
    this.bindGameModes();
    this.bindSearchAndFilters();
    this.bindModalClosers();
    this.renderAll();

    // Telegram Web App check
    if (window.Telegram && window.Telegram.WebApp) {
      try {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
      } catch (e) {}
    }
  }

  bindNavigation() {
    document.querySelectorAll('.bottom-nav .nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        sounds.play('click');
        const targetView = btn.dataset.view;
        this.switchView(targetView);
      });
    });

    // Quick Action buttons on Home
    document.getElementById('hero-open-pack')?.addEventListener('click', () => {
      sounds.play('click');
      this.switchView('view-packs');
    });

    document.getElementById('hero-goto-match')?.addEventListener('click', () => {
      sounds.play('click');
      this.switchView('view-matches');
    });

    document.getElementById('dash-my-team-btn')?.addEventListener('click', () => {
      sounds.play('click');
      this.switchView('view-squad');
    });

    document.getElementById('dash-spin-btn')?.addEventListener('click', () => {
      sounds.play('click');
      this.switchView('view-rewards');
    });

    document.getElementById('dash-quests-btn')?.addEventListener('click', () => {
      sounds.play('click');
      this.switchView('view-rewards');
    });
  }

  switchView(viewId) {
    this.currentView = viewId;
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(viewId)?.classList.add('active');

    document.querySelectorAll('.bottom-nav .nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === viewId);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.renderAll();
  }

  bindResourceButtons() {
    // 100% Free unlimited currency refills
    document.getElementById('btn-free-coins')?.addEventListener('click', () => {
      state.addCoins(1000000);
      this.showToast('🪙 +1,000,000 Bepul Oltin Tangalar olindi!');
    });

    document.getElementById('btn-free-fp')?.addEventListener('click', () => {
      state.addFP(10000);
      this.showToast('💎 +10,000 Bepul FC Points olindi!');
    });

    document.getElementById('btn-quick-coins')?.addEventListener('click', () => {
      state.addCoins(1000000);
      this.showToast('🪙 +1,000,000 Bepul Oltin qo\'shildi!');
    });

    document.getElementById('btn-quick-fp')?.addEventListener('click', () => {
      state.addFP(10000);
      this.showToast('💎 +10,000 Bepul FP qo\'shildi!');
    });

    document.getElementById('btn-sound-toggle')?.addEventListener('click', () => {
      sounds.enabled = !sounds.enabled;
      document.getElementById('sound-icon').textContent = sounds.enabled ? '🔊' : '🔇';
      this.showToast(sounds.enabled ? 'Ovoz yoqildi' : 'Ovoz o\'chirildi');
    });
  }

  bindPackButtons() {
    document.querySelectorAll('.btn-pack-open').forEach(btn => {
      btn.addEventListener('click', () => {
        const packType = btn.dataset.packId;
        this.openPack(packType);
      });
    });

    document.getElementById('btn-claim-card')?.addEventListener('click', () => {
      sounds.play('click');
      if (this.pendingWalkoutCard) {
        state.addPlayerToClub(this.pendingWalkoutCard);
        this.closeWalkout();
      }
    });

    document.getElementById('btn-sell-card')?.addEventListener('click', () => {
      sounds.play('click');
      if (this.pendingWalkoutCard) {
        state.addCoins(this.pendingWalkoutCard.price || 500000);
        this.showToast(`🪙 ${this.pendingWalkoutCard.name} sotildi va tangalar berildi!`);
        this.closeWalkout();
      }
    });
  }

  bindSquadControls() {
    const formationSel = document.getElementById('formation-select');
    if (formationSel) {
      formationSel.value = state.data.formation;
      formationSel.addEventListener('change', (e) => {
        sounds.play('click');
        state.data.formation = e.target.value;
        state.save();
        this.renderSquad();
      });
    }

    document.getElementById('btn-auto-squad')?.addEventListener('click', () => {
      sounds.play('whistle');
      this.autoBuildBestSquad();
    });

    document.getElementById('btn-clear-squad')?.addEventListener('click', () => {
      sounds.play('click');
      state.data.starting11 = {};
      state.save();
      this.renderSquad();
      this.showToast('Tarkib tozalandi.');
    });
  }

  bindSearchAndFilters() {
    const searchInp = document.getElementById('market-search');
    const posFilter = document.getElementById('market-pos-filter');
    const tierFilter = document.getElementById('market-tier-filter');

    const triggerMarket = () => this.renderMarket();

    searchInp?.addEventListener('input', triggerMarket);
    posFilter?.addEventListener('change', triggerMarket);
    tierFilter?.addEventListener('change', triggerMarket);
  }

  bindModalClosers() {
    document.getElementById('btn-close-player-modal')?.addEventListener('click', () => {
      document.getElementById('player-modal').classList.add('hidden');
    });
    document.getElementById('player-modal-backdrop')?.addEventListener('click', () => {
      document.getElementById('player-modal').classList.add('hidden');
    });
  }

  // ===================================================================
  // RENDER METHODS
  // ===================================================================
  renderAll() {
    this.renderCurrencies();
    this.renderDashboardStats();
    this.renderFeaturedShowcase();
    this.renderSquad();
    this.renderMarket();
    this.renderQuests();
  }

  renderCurrencies() {
    const coinsEl = document.getElementById('res-coins');
    const fpEl = document.getElementById('res-fp');
    if (coinsEl) coinsEl.textContent = state.data.coins.toLocaleString();
    if (fpEl) fpEl.textContent = state.data.fp.toLocaleString();
  }

  renderDashboardStats() {
    const ovr = this.calculateTeamOVR();
    const chem = this.calculateTeamChemistry();
    const slottedCount = Object.keys(state.data.starting11).length;

    const dashOvr = document.getElementById('dash-ovr');
    const dashChem = document.getElementById('dash-chem');
    const dashCount = document.getElementById('dash-player-count');
    const dashForm = document.getElementById('dash-formation');
    const dashVal = document.getElementById('dash-squad-value');

    if (dashOvr) dashOvr.textContent = ovr;
    if (dashChem) dashChem.textContent = `${chem} / 100`;
    if (dashCount) dashCount.textContent = `${slottedCount} / 11`;
    if (dashForm) dashForm.textContent = state.data.formation;
    
    // Squad total value
    let totalVal = 0;
    Object.values(state.data.starting11).forEach(pid => {
      const p = PLAYERS_DATABASE.find(x => x.id === pid);
      if (p) totalVal += p.price || 0;
    });
    if (dashVal) dashVal.textContent = `🪙 ${(totalVal / 1000000).toFixed(1)}M`;
  }

  renderFeaturedShowcase() {
    const container = document.getElementById('featured-players-carousel');
    const teaserPreview = document.getElementById('teaser-card-preview');
    if (!container) return;

    // Pick 6 prominent stars
    const topStars = PLAYERS_DATABASE.slice(0, 6);
    container.innerHTML = topStars.map(p => this.createCardHTML(p)).join('');

    // Attach click to preview card
    container.querySelectorAll('.fc-card').forEach(cardEl => {
      cardEl.addEventListener('click', () => {
        const pid = cardEl.dataset.playerId;
        const p = PLAYERS_DATABASE.find(x => x.id === pid);
        if (p) this.showPlayerDetailsModal(p);
      });
    });

    if (teaserPreview && topStars[0]) {
      teaserPreview.innerHTML = this.createCardHTML(topStars[0]);
    }
  }

  renderSquad() {
    const formationKey = state.data.formation || '4-3-3';
    const slotsDef = FORMATIONS[formationKey] || FORMATIONS['4-3-3'];
    const container = document.getElementById('pitch-slots-container');
    const benchContainer = document.getElementById('bench-cards-list');
    const benchCountEl = document.getElementById('bench-count');
    const teamOvrEl = document.getElementById('pitch-team-ovr');
    const teamChemEl = document.getElementById('pitch-team-chem');

    if (teamOvrEl) teamOvrEl.textContent = this.calculateTeamOVR();
    if (teamChemEl) teamChemEl.textContent = this.calculateTeamChemistry();

    if (!container) return;
    container.innerHTML = '';

    // Render 11 Formation Slots on Pitch
    slotsDef.forEach(slot => {
      const slottedPlayerId = state.data.starting11[slot.slotId];
      const player = state.data.club.find(p => p.id === slottedPlayerId);

      const slotEl = document.createElement('div');
      slotEl.className = 'pitch-slot';
      slotEl.style.top = slot.top;
      slotEl.style.left = slot.left;

      if (player) {
        slotEl.innerHTML = `
          <div class="slot-circle tier-${player.tier.toLowerCase()}">
            <span class="slot-pos-label">${slot.pos}</span>
            <span class="slot-player-ovr">${player.ovr}</span>
          </div>
          <div class="slot-player-name">${player.name.split(' ').pop()}</div>
        `;
        slotEl.addEventListener('click', () => {
          sounds.play('click');
          this.showPlayerDetailsModal(player, slot.slotId);
        });
      } else {
        slotEl.innerHTML = `
          <div class="slot-circle slot-empty">
            <span class="slot-pos-label">${slot.pos}</span>
            <span style="font-size: 20px; color: rgba(255,255,255,0.4);">+</span>
          </div>
          <div class="slot-player-name">Bo'sh</div>
        `;
        slotEl.addEventListener('click', () => {
          sounds.play('click');
          this.promptAssignPlayerToSlot(slot.slotId, slot.pos);
        });
      }

      container.appendChild(slotEl);
    });

    // Render Bench Cards
    if (benchContainer) {
      benchContainer.innerHTML = '';
      const slottedIds = Object.values(state.data.starting11);
      const benchPlayers = state.data.club.filter(p => !slottedIds.includes(p.id));

      if (benchCountEl) benchCountEl.textContent = benchPlayers.length;

      if (benchPlayers.length === 0) {
        benchContainer.innerHTML = '<div style="color: var(--text-muted); padding: 12px; font-size: 13px;">Zaxirada o\'yinchi yo\'q. Do\'kondan yangi paketlar oching!</div>';
      } else {
        benchPlayers.forEach(p => {
          const cardWrap = document.createElement('div');
          cardWrap.innerHTML = this.createCardHTML(p);
          const cardEl = cardWrap.firstElementChild;
          cardEl.addEventListener('click', () => {
            sounds.play('click');
            this.showPlayerDetailsModal(p);
          });
          benchContainer.appendChild(cardEl);
        });
      }
    }
  }

  promptAssignPlayerToSlot(slotId, requiredPos) {
    const slottedIds = Object.values(state.data.starting11);
    const available = state.data.club.filter(p => !slottedIds.includes(p.id));

    if (available.length === 0) {
      this.showToast('⚠️ Zaxirada o\'yinchilar yo\'q. Paketlar bo\'limidan bepul o\'yinchi oling!');
      return;
    }

    const modal = document.getElementById('player-modal');
    const content = document.getElementById('player-modal-content');

    content.innerHTML = `
      <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800;">
        ${requiredPos} pozitsiyasiga o'yinchi tanlang:
      </h3>
      <div style="display: flex; gap: 10px; overflow-x: auto; width: 100%; padding: 10px 0;">
        ${available.map(p => this.createCardHTML(p)).join('')}
      </div>
    `;

    modal.classList.remove('hidden');

    content.querySelectorAll('.fc-card').forEach(cardEl => {
      cardEl.addEventListener('click', () => {
        const pid = cardEl.dataset.playerId;
        state.data.starting11[slotId] = pid;
        state.save();
        modal.classList.add('hidden');
        sounds.play('click');
        this.showToast(`✅ ${cardEl.dataset.playerName} tarkibga qo'shildi!`);
        this.renderSquad();
        this.renderDashboardStats();
      });
    });
  }

  showPlayerDetailsModal(player, currentSlotId = null) {
    const modal = document.getElementById('player-modal');
    const content = document.getElementById('player-modal-content');

    const upgradeCost = (player.rank || 0) * 100000 + 50000;

    content.innerHTML = `
      <div style="display: flex; gap: 20px; align-items: center; width: 100%; flex-wrap: wrap; justify-content: center;">
        <div>${this.createCardHTML(player)}</div>
        <div style="flex: 1; min-width: 220px;">
          <h2 style="font-family: var(--font-heading); font-size: 24px; font-weight: 900; margin-bottom: 4px;">
            ${player.name}
          </h2>
          <div style="color: var(--accent-neon); font-family: var(--font-heading); font-weight: 800; font-size: 15px; margin-bottom: 12px;">
            ${player.flag} ${player.club} | ${player.pos} | Daraja: ${player.rank || 0}★
          </div>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; font-family: var(--font-stat); font-size: 16px; margin-bottom: 16px;">
            <div>PAC: <strong>${player.stats.pac}</strong></div>
            <div>SHO: <strong>${player.stats.sho}</strong></div>
            <div>PAS: <strong>${player.stats.pas}</strong></div>
            <div>DRI: <strong>${player.stats.dri}</strong></div>
            <div>DEF: <strong>${player.stats.def}</strong></div>
            <div>PHY: <strong>${player.stats.phy}</strong></div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <button class="btn btn-primary" id="btn-modal-rankup">
              ⚡ Rank Up / Kuchaytirish (🪙 ${upgradeCost.toLocaleString()})
            </button>
            ${currentSlotId ? `
              <button class="btn btn-secondary" id="btn-modal-bench">
                🪑 Zaxiraga o'tkazish
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');

    document.getElementById('btn-modal-rankup')?.addEventListener('click', () => {
      if (state.data.coins >= upgradeCost) {
        state.data.coins -= upgradeCost;
        player.rank = (player.rank || 0) + 1;
        player.ovr = Math.min(105, player.ovr + 1);
        player.stats.pac += 1;
        player.stats.sho += 1;
        player.stats.pas += 1;
        player.stats.dri += 1;
        player.stats.def += 1;
        player.stats.phy += 1;
        state.save();
        sounds.play('fanfare');
        this.showToast(`⭐ OVR oshirildi! Yangi OVR: ${player.ovr}`);
        modal.classList.add('hidden');
        this.renderAll();
      } else {
        this.showToast('⚠️ Tangalar yetarli emas! Bepul tangalar oling.');
      }
    });

    document.getElementById('btn-modal-bench')?.addEventListener('click', () => {
      if (currentSlotId) {
        delete state.data.starting11[currentSlotId];
        state.save();
        modal.classList.add('hidden');
        sounds.play('click');
        this.showToast('O\'yinchi zaxiraga o\'tkazildi');
        this.renderSquad();
        this.renderDashboardStats();
      }
    });
  }

  autoBuildBestSquad() {
    const formationKey = state.data.formation || '4-3-3';
    const slots = FORMATIONS[formationKey];
    const clubSorted = [...state.data.club].sort((a, b) => b.ovr - a.ovr);

    const newStarting = {};
    const usedIds = new Set();

    // 1st pass: Exact position match
    slots.forEach(slot => {
      const match = clubSorted.find(p => !usedIds.has(p.id) && p.pos === slot.pos);
      if (match) {
        newStarting[slot.slotId] = match.id;
        usedIds.add(match.id);
      }
    });

    // 2nd pass: Fill remaining with highest OVR available
    slots.forEach(slot => {
      if (!newStarting[slot.slotId]) {
        const bestAvailable = clubSorted.find(p => !usedIds.has(p.id));
        if (bestAvailable) {
          newStarting[slot.slotId] = bestAvailable.id;
          usedIds.add(bestAvailable.id);
        }
      }
    });

    state.data.starting11 = newStarting;
    state.save();
    this.renderSquad();
    this.renderDashboardStats();
    this.showToast('⚡ Eng kuchli tarkib avtomatik shakllantirildi!');
  }

  calculateTeamOVR() {
    const slottedIds = Object.values(state.data.starting11);
    if (slottedIds.length === 0) return 60;
    let sum = 0;
    slottedIds.forEach(id => {
      const p = state.data.club.find(x => x.id === id) || PLAYERS_DATABASE.find(x => x.id === id);
      if (p) sum += p.ovr;
    });
    return Math.round(sum / 11);
  }

  calculateTeamChemistry() {
    const slottedIds = Object.values(state.data.starting11);
    if (slottedIds.length < 2) return 50;
    // Calculation based on shared clubs and nations
    let matches = 0;
    const players = slottedIds.map(id => state.data.club.find(x => x.id === id)).filter(Boolean);
    players.forEach(p1 => {
      players.forEach(p2 => {
        if (p1.id !== p2.id && (p1.club === p2.club || p1.flag === p2.flag)) {
          matches++;
        }
      });
    });
    return Math.min(100, 70 + Math.floor(matches * 2));
  }

  // ===================================================================
  // CINEMATIC PACK OPENING (WALKOUT GACHA)
  // ===================================================================
  openPack(packType) {
    sounds.play('whistle');
    state.updateQuest('q_packs', 1);

    let candidatePool = [];
    if (packType === 'toty') {
      candidatePool = PLAYERS_DATABASE.filter(p => p.tier === 'TOTY');
    } else if (packType === 'icons') {
      candidatePool = PLAYERS_DATABASE.filter(p => p.tier === 'ICON');
    } else if (packType === 'uzb') {
      candidatePool = PLAYERS_DATABASE.filter(p => p.tier === 'UZB_HERO');
    } else {
      candidatePool = PLAYERS_DATABASE;
    }

    const wonPlayer = candidatePool[Math.floor(Math.random() * candidatePool.length)];
    this.pendingWalkoutCard = wonPlayer;

    const modal = document.getElementById('walkout-modal');
    const teaser = document.getElementById('wo-teaser');
    const cardStage = document.getElementById('wo-card-stage');
    const actions = document.getElementById('wo-actions');
    const sellPriceEl = document.getElementById('wo-sell-price');

    // Reset stages
    modal.classList.remove('hidden');
    teaser.classList.remove('hidden');
    cardStage.innerHTML = '';
    actions.style.opacity = '0';
    actions.style.pointerEvents = 'none';

    document.getElementById('wo-flag').textContent = wonPlayer.flag;
    document.getElementById('wo-pos').textContent = wonPlayer.pos;
    document.getElementById('wo-club').textContent = wonPlayer.club.toUpperCase();
    if (sellPriceEl) sellPriceEl.textContent = (wonPlayer.price || 500000).toLocaleString();

    // Cinematic Walkout Sequence
    setTimeout(() => {
      teaser.classList.add('hidden');
      cardStage.innerHTML = this.createCardHTML(wonPlayer);
      sounds.play('fanfare');

      setTimeout(() => {
        actions.style.opacity = '1';
        actions.style.pointerEvents = 'all';
      }, 700);
    }, 1600);
  }

  closeWalkout() {
    const modal = document.getElementById('walkout-modal');
    modal.classList.add('hidden');
    this.pendingWalkoutCard = null;
  }

  // ===================================================================
  // CARD HTML GENERATOR
  // ===================================================================
  createCardHTML(player) {
    const tierClass = `tier-${player.tier.toLowerCase()}`;
    return `
      <div class="fc-card ${tierClass}" data-player-id="${player.id}" data-player-name="${player.name}">
        <div class="card-shine"></div>
        <div class="card-inner">
          <div class="card-top-info">
            <div class="card-ovr-wrap">
              <span class="card-ovr">${player.ovr}</span>
              <span class="card-pos">${player.pos}</span>
            </div>
            <div class="card-badges-wrap">
              <span class="card-flag">${player.flag}</span>
              <span class="card-club-icon">⚽</span>
            </div>
          </div>
          
          <div class="card-player-avatar">
            <span class="avatar-silhouette">${player.avatar || '⚽'}</span>
          </div>

          <div class="card-bottom-info">
            <div class="card-player-name">${player.name}</div>
            <div class="card-stats-mini">
              <span>PAC <strong>${player.stats.pac}</strong></span>
              <span>SHO <strong>${player.stats.sho}</strong></span>
              <span>DRI <strong>${player.stats.dri}</strong></span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ===================================================================
  // TRANSFER MARKET
  // ===================================================================
  renderMarket() {
    const grid = document.getElementById('market-cards-grid');
    if (!grid) return;

    const query = (document.getElementById('market-search')?.value || '').toLowerCase();
    const posFilter = document.getElementById('market-pos-filter')?.value || 'ALL';
    const tierFilter = document.getElementById('market-tier-filter')?.value || 'ALL';

    const filtered = PLAYERS_DATABASE.filter(p => {
      const matchName = p.name.toLowerCase().includes(query) || p.club.toLowerCase().includes(query);
      
      let matchPos = true;
      if (posFilter === 'ATT') matchPos = ['ST', 'LW', 'RW', 'CF'].includes(p.pos);
      else if (posFilter === 'MID') matchPos = ['CAM', 'CM', 'CDM', 'LM', 'RM'].includes(p.pos);
      else if (posFilter === 'DEF') matchPos = ['CB', 'LB', 'RB'].includes(p.pos);
      else if (posFilter === 'GK') matchPos = p.pos === 'GK';

      let matchTier = true;
      if (tierFilter !== 'ALL') matchTier = p.tier === tierFilter;

      return matchName && matchPos && matchTier;
    });

    grid.innerHTML = filtered.map(p => {
      const isOwned = state.data.club.some(x => x.id === p.id);
      return `
        <div class="market-item-card">
          <div class="market-card-preview">${this.createCardHTML(p)}</div>
          <div class="market-card-info">
            <span class="market-price">🪙 ${p.price.toLocaleString()}</span>
            <button class="btn btn-sm ${isOwned ? 'btn-secondary' : 'btn-primary'} btn-buy-player" data-player-id="${p.id}">
              ${isOwned ? 'Sotib Olish (+1 Rank)' : 'Sotib Olish'}
            </button>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.btn-buy-player').forEach(btn => {
      btn.addEventListener('click', () => {
        const pid = btn.dataset.playerId;
        const player = PLAYERS_DATABASE.find(x => x.id === pid);
        if (player) {
          if (state.data.coins >= player.price) {
            state.data.coins -= player.price;
            state.addPlayerToClub(player);
            sounds.play('coin');
            this.showToast(`🎉 ${player.name} sotib olindi!`);
            this.renderAll();
          } else {
            this.showToast('⚠️ Oltin tangalar yetarli emas! Bepul to\'ldiring.');
          }
        }
      });
    });
  }

  // ===================================================================
  // LUCKY WHEEL (OMAD CHARXPALAGI)
  // ===================================================================
  bindLuckyWheel() {
    const canvas = document.getElementById('lucky-wheel-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const prizes = [
      { text: '🪙 1M Oltin', color: '#ffbe0b', type: 'coins', val: 1000000 },
      { text: '💎 10k FP', color: '#00f0ff', type: 'fp', val: 10000 },
      { text: '🏆 TOTY Karta', color: '#7000ff', type: 'card', tier: 'TOTY' },
      { text: '🪙 500k Oltin', color: '#ffbe0b', type: 'coins', val: 500000 },
      { text: '👑 Prime Icon', color: '#ffd700', type: 'card', tier: 'ICON' },
      { text: '💎 5k FP', color: '#00f0ff', type: 'fp', val: 5000 },
      { text: '⭐ O\'zbek Yulduzi', color: '#00ff85', type: 'card', tier: 'UZB_HERO' },
      { text: '🪙 250k Oltin', color: '#ffbe0b', type: 'coins', val: 250000 }
    ];

    let currentAngle = 0;
    let isSpinning = false;

    const drawWheel = (angle) => {
      const numSlices = prizes.length;
      const arc = (2 * Math.PI) / numSlices;
      const radius = canvas.width / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      prizes.forEach((prize, i) => {
        const start = angle + i * arc;
        const end = start + arc;

        ctx.beginPath();
        ctx.fillStyle = prize.color;
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius - 6, start, end);
        ctx.lineTo(radius, radius);
        ctx.fill();

        ctx.strokeStyle = '#07090e';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Label
        ctx.save();
        ctx.fillStyle = '#07090e';
        ctx.font = 'bold 13px Outfit, sans-serif';
        ctx.translate(radius, radius);
        ctx.rotate(start + arc / 2);
        ctx.textAlign = 'right';
        ctx.fillText(prize.text, radius - 20, 5);
        ctx.restore();
      });
    };

    drawWheel(0);

    const spin = () => {
      if (isSpinning) return;
      isSpinning = true;
      sounds.play('tick');
      state.updateQuest('q_spin', 1);

      const targetPrizeIndex = Math.floor(Math.random() * prizes.length);
      const sliceArc = (2 * Math.PI) / prizes.length;
      // We want pointer at top (-PI/2) to land on targetPrizeIndex
      const extraSpins = 5 + Math.floor(Math.random() * 3);
      const targetAngle = extraSpins * 2 * Math.PI + (prizes.length - targetPrizeIndex) * sliceArc - sliceArc / 2 - Math.PI / 2;

      const duration = 4000;
      const startTime = performance.now();
      const startAngle = currentAngle;

      let lastTick = 0;

      const animate = (time) => {
        const elapsed = time - startTime;
        const progress = Math.min(1, elapsed / duration);
        // Ease-out cubic
        const ease = 1 - Math.pow(1 - progress, 3);

        currentAngle = startAngle + (targetAngle - startAngle) * ease;
        drawWheel(currentAngle);

        if (elapsed - lastTick > 120 && progress < 0.9) {
          sounds.play('tick');
          lastTick = elapsed;
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          isSpinning = false;
          const wonPrize = prizes[targetPrizeIndex];
          sounds.play('fanfare');

          if (wonPrize.type === 'coins') {
            state.addCoins(wonPrize.val);
            this.showToast(`🎉 Tabriklaymiz! +${wonPrize.val.toLocaleString()} tanga yutib oldingiz!`);
          } else if (wonPrize.type === 'fp') {
            state.addFP(wonPrize.val);
            this.showToast(`🎉 Tabriklaymiz! +${wonPrize.val.toLocaleString()} FP yutib oldingiz!`);
          } else if (wonPrize.type === 'card') {
            const pool = PLAYERS_DATABASE.filter(p => p.tier === wonPrize.tier);
            const card = pool[Math.floor(Math.random() * pool.length)];
            state.addPlayerToClub(card);
            this.showToast(`👑 Tabriklaymiz! ${card.name} kartasi yutildi!`);
          }
        }
      };

      requestAnimationFrame(animate);
    };

    document.getElementById('btn-spin-wheel')?.addEventListener('click', spin);
    document.getElementById('btn-spin-wheel-alt')?.addEventListener('click', spin);
  }

  // ===================================================================
  // QUESTS
  // ===================================================================
  renderQuests() {
    const list = document.getElementById('quests-full-list');
    const miniList = document.getElementById('mini-quests-list');
    const badge = document.getElementById('quests-badge');

    const readyCount = state.data.quests.filter(q => q.current >= q.target && !q.claimed).length;
    if (badge) badge.textContent = `${readyCount} TAYYOR`;

    if (miniList) {
      miniList.innerHTML = state.data.quests.slice(0, 2).map(q => `
        <div style="font-size: 13px; color: var(--text-muted); display: flex; justify-content: space-between;">
          <span>${q.title}</span>
          <strong>${q.current}/${q.target}</strong>
        </div>
      `).join('');
    }

    if (!list) return;
    list.innerHTML = state.data.quests.map(q => {
      const isDone = q.current >= q.target;
      return `
        <div class="quest-item">
          <div class="quest-details">
            <span class="quest-icon">${isDone ? '✅' : '⏳'}</span>
            <div>
              <div class="quest-title">${q.title}</div>
              <div class="quest-sub">Bajarildi: ${q.current} / ${q.target}</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span class="quest-reward">🪙 +${q.rewardCoins.toLocaleString()}</span>
            <button class="btn btn-sm ${isDone && !q.claimed ? 'btn-primary' : 'btn-secondary'} btn-claim-quest" 
              data-quest-id="${q.id}" ${q.claimed || !isDone ? 'disabled' : ''}>
              ${q.claimed ? 'Olindi' : isDone ? 'Olish' : 'Jarayonda'}
            </button>
          </div>
        </div>
      `;
    }).join('');

    list.querySelectorAll('.btn-claim-quest').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.dataset.questId;
        const q = state.data.quests.find(x => x.id === qid);
        if (q && !q.claimed && q.current >= q.target) {
          q.claimed = true;
          state.addCoins(q.rewardCoins);
          state.addFP(q.rewardFp);
          sounds.play('fanfare');
          this.showToast(`🎉 Vazifa bajarildi! +${q.rewardCoins.toLocaleString()} tanga olindi!`);
          this.renderQuests();
        }
      });
    });
  }

  // ===================================================================
  // TOAST SYSTEM
  // ===================================================================
  showToast(message, icon = '✨') {
    const toast = document.getElementById('app-toast');
    const msgEl = document.getElementById('toast-msg');
    const iconEl = document.getElementById('toast-icon');

    if (!toast || !msgEl) return;
    msgEl.textContent = message;
    if (iconEl) iconEl.textContent = icon;

    toast.classList.remove('hidden');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.add('hidden');
    }, 2800);
  }

  // ===================================================================
  // GAME MODES LOGIC
  // ===================================================================
  bindGameModes() {
    // 1. PENALTY SHOOTOUT
    document.getElementById('btn-start-penalty')?.addEventListener('click', () => {
      this.startPenaltyGame();
    });
    document.getElementById('btn-close-penalty')?.addEventListener('click', () => {
      document.getElementById('penalty-arena').classList.add('hidden');
    });

    // 2. VS ATTACK
    document.getElementById('btn-start-vsattack')?.addEventListener('click', () => {
      this.startVSAttackGame();
    });
    document.getElementById('btn-close-vsattack')?.addEventListener('click', () => {
      document.getElementById('vsattack-arena').classList.add('hidden');
      clearInterval(this.vsaTimerInterval);
    });

    // 3. H2H MATCH SIM
    document.getElementById('btn-start-h2h')?.addEventListener('click', () => {
      this.startH2HGame();
    });
    document.getElementById('btn-close-h2h')?.addEventListener('click', () => {
      document.getElementById('h2h-arena').classList.add('hidden');
      clearInterval(this.h2hInterval);
    });
  }

  // --- PENALTY SHOOTOUT ENGINE ---
  startPenaltyGame() {
    const arena = document.getElementById('penalty-arena');
    arena.classList.remove('hidden');
    sounds.play('whistle');

    this.penaltyState = {
      round: 0,
      maxRounds: 5,
      userScore: 0,
      aiScore: 0,
      isUserTurn: true,
      userDots: [],
      aiDots: []
    };

    this.updatePenaltyUI();

    const targetGrid = document.getElementById('target-grid');
    targetGrid.querySelectorAll('.target-zone').forEach(btn => {
      btn.onclick = () => {
        if (!this.penaltyState.isUserTurn) return;
        this.executePenaltyUserShot(btn.dataset.pos);
      };
    });
  }

  executePenaltyUserShot(targetPos) {
    const gk = document.getElementById('gk-avatar');
    const ball = document.getElementById('penalty-ball');
    const toast = document.getElementById('pen-status-toast');

    const positions = ['tl', 'tc', 'tr', 'bl', 'bc', 'br'];
    const aiDivePos = positions[Math.floor(Math.random() * positions.length)];

    // Animate Goalkeeper dive
    let gkTranslate = 'translateX(-50%)';
    if (aiDivePos.includes('l')) gkTranslate = 'translate(-120%, -20%) rotate(-35deg)';
    else if (aiDivePos.includes('r')) gkTranslate = 'translate(20%, -20%) rotate(35deg)';
    gk.style.transform = gkTranslate;

    // Animate Ball
    let ballY = '-160px';
    let ballX = '0px';
    if (targetPos === 'tl') { ballX = '-110px'; ballY = '-210px'; }
    else if (targetPos === 'tr') { ballX = '110px'; ballY = '-210px'; }
    else if (targetPos === 'tc') { ballX = '0px'; ballY = '-210px'; }
    else if (targetPos === 'bl') { ballX = '-110px'; ballY = '-150px'; }
    else if (targetPos === 'br') { ballX = '110px'; ballY = '-150px'; }
    else if (targetPos === 'bc') { ballX = '0px'; ballY = '-150px'; }

    ball.style.transform = `translate(${ballX}, ${ballY}) scale(0.65)`;

    const isGoal = targetPos !== aiDivePos;

    setTimeout(() => {
      if (isGoal) {
        sounds.play('goal');
        toast.textContent = '⚽ GOOOOL! Ajoyib zarba!';
        toast.style.color = 'var(--accent-neon)';
        this.penaltyState.userScore++;
        this.penaltyState.userDots.push('goal');
      } else {
        sounds.play('miss');
        toast.textContent = '🧤 SEYV! Darvozabon to\'pni qaytardi!';
        toast.style.color = 'var(--accent-red)';
        this.penaltyState.userDots.push('miss');
      }

      this.updatePenaltyUI();

      // Next AI turn
      setTimeout(() => {
        this.executePenaltyAITurn();
      }, 1400);
    }, 450);
  }

  executePenaltyAITurn() {
    const gk = document.getElementById('gk-avatar');
    const ball = document.getElementById('penalty-ball');
    const toast = document.getElementById('pen-status-toast');

    // Reset ball & GK
    ball.style.transform = 'translate(0, 0) scale(1)';
    gk.style.transform = 'translateX(-50%)';
    toast.textContent = '🛡️ Raqib zarba bermoqda...';
    toast.style.color = '#fff';

    setTimeout(() => {
      const aiScores = Math.random() < 0.55;
      if (aiScores) {
        sounds.play('miss');
        toast.textContent = '🥅 Raqib gol urdi!';
        toast.style.color = 'var(--accent-red)';
        this.penaltyState.aiScore++;
        this.penaltyState.aiDots.push('goal');
      } else {
        sounds.play('whistle');
        toast.textContent = '🧤 Sizning darvozaboningiz to\'pni qaytardi!';
        toast.style.color = 'var(--accent-neon)';
        this.penaltyState.aiDots.push('miss');
      }

      this.penaltyState.round++;
      this.updatePenaltyUI();

      // Check finish
      if (this.penaltyState.round >= this.penaltyState.maxRounds) {
        setTimeout(() => this.finishPenaltyGame(), 1000);
      } else {
        toast.textContent = 'Navbat sizda! Darvoza burchagini tanlang:';
      }
    }, 1200);
  }

  updatePenaltyUI() {
    document.getElementById('pen-user-score').textContent = this.penaltyState.userScore;
    document.getElementById('pen-ai-score').textContent = this.penaltyState.aiScore;

    const userDotsWrap = document.getElementById('pen-user-dots');
    const aiDotsWrap = document.getElementById('pen-ai-dots');

    if (userDotsWrap) {
      userDotsWrap.innerHTML = this.penaltyState.userDots.map(d => `<span class="shot-dot ${d}"></span>`).join('');
    }
    if (aiDotsWrap) {
      aiDotsWrap.innerHTML = this.penaltyState.aiDots.map(d => `<span class="shot-dot ${d}"></span>`).join('');
    }
  }

  finishPenaltyGame() {
    sounds.play('whistle');
    const win = this.penaltyState.userScore > this.penaltyState.aiScore;
    if (win) {
      sounds.play('fanfare');
      state.addCoins(150000);
      state.updateQuest('q_penalty', 1);
      alert(`🏆 TABRIKLAYMIZ! Siz ${this.penaltyState.userScore} - ${this.penaltyState.aiScore} hisobida g'alaba qozondingiz!\nSovrin: +150,000 Oltin Tangalar berildi!`);
    } else {
      state.addCoins(50000);
      alert(`Uchrashuv yakunlandi: ${this.penaltyState.userScore} - ${this.penaltyState.aiScore}.\nRag'batlantiruvchi mukofot: +50,000 Oltin berildi!`);
    }
    document.getElementById('penalty-arena').classList.add('hidden');
  }

  // --- VS ATTACK ENGINE (45 SECONDS) ---
  startVSAttackGame() {
    const arena = document.getElementById('vsattack-arena');
    arena.classList.remove('hidden');
    sounds.play('whistle');

    this.vsaScore = { user: 0, ai: 0 };
    this.vsaTimeLeft = 45;

    const timerEl = document.getElementById('vsa-timer');
    const userPtsEl = document.getElementById('vsa-user-score');
    const aiPtsEl = document.getElementById('vsa-ai-score');
    const feedback = document.getElementById('vsa-feedback');

    userPtsEl.textContent = '0';
    aiPtsEl.textContent = '0';
    feedback.textContent = 'Hujumni boshlang!';

    clearInterval(this.vsaTimerInterval);
    this.vsaTimerInterval = setInterval(() => {
      this.vsaTimeLeft--;
      timerEl.textContent = `⏱️ 00:${this.vsaTimeLeft < 10 ? '0' : ''}${this.vsaTimeLeft}`;

      // AI scores randomly occasionally
      if (Math.random() < 0.18) {
        this.vsaScore.ai++;
        aiPtsEl.textContent = this.vsaScore.ai;
      }

      if (this.vsaTimeLeft <= 0) {
        clearInterval(this.vsaTimerInterval);
        sounds.play('whistle');
        if (this.vsaScore.user > this.vsaScore.ai) {
          sounds.play('fanfare');
          state.addCoins(250000);
          alert(`🔥 G'ALABA! Hisob: ${this.vsaScore.user} - ${this.vsaScore.ai}\nSovrin: +250,000 Oltin Tangalar olindi!`);
        } else {
          state.addCoins(80000);
          alert(`O'yin yakunlandi! Hisob: ${this.vsaScore.user} - ${this.vsaScore.ai}\nMukofot: +80,000 Oltin berildi!`);
        }
        arena.classList.add('hidden');
      }
    }, 1000);

    const shotHandler = (type) => {
      const ball = document.getElementById('vsa-ball');
      ball.style.transform = 'translateY(-100px) scale(0.6)';

      const success = Math.random() < 0.65;
      setTimeout(() => {
        ball.style.transform = 'translateY(0) scale(1)';
        if (success) {
          sounds.play('goal');
          this.vsaScore.user++;
          userPtsEl.textContent = this.vsaScore.user;
          state.updateQuest('q_vsa', 1);
          feedback.textContent = '🚀 GOOOOL! Qoyilmaqom zarba!';
          feedback.style.color = 'var(--accent-neon)';
        } else {
          sounds.play('miss');
          feedback.textContent = '❌ Darvozabon qaytardi yoki to\'sin tegdi!';
          feedback.style.color = 'var(--accent-red)';
        }
      }, 350);
    };

    document.getElementById('btn-vsa-power-shot').onclick = () => shotHandler('power');
    document.getElementById('btn-vsa-curl-shot').onclick = () => shotHandler('curl');
    document.getElementById('btn-vsa-chip-shot').onclick = () => shotHandler('chip');
  }

  // --- H2H MATCH SIMULATION ENGINE ---
  startH2HGame() {
    const arena = document.getElementById('h2h-arena');
    arena.classList.remove('hidden');
    sounds.play('whistle');

    let minute = 0;
    let userGoals = 0;
    let oppGoals = 0;

    const clockEl = document.getElementById('h2h-clock');
    const scoreEl = document.getElementById('h2h-score');
    const feed = document.getElementById('h2h-commentary-feed');
    const radarBall = document.getElementById('h2h-radar-ball');

    scoreEl.textContent = '0 - 0';
    feed.innerHTML = '<div class="comm-item">📢 O\'yin boshlandi! Taktikani boshqaring.</div>';

    const commentaryEvents = [
      '⚡ Fayzullaev raqib himoyachisini aylanib o\'tdi!',
      '🎯 Shomurodov bosh bilan xavfli zarba berdi!',
      '🧤 Darvozabon Yusupov super seyv ko\'rsatdi!',
      '🚀 Mbappé to\'pni olib oldinga yorib kirdi!',
      '🛡️ Khusanov raqib hujumchisini to\'xtatib qoldi!',
      '⚡ Qanotdan jarima maydonchasiga xavfli uzatma!',
      '🧤 Raqib darvozaboni to\'pni ushlab oldi.'
    ];

    clearInterval(this.h2hInterval);
    this.h2hInterval = setInterval(() => {
      minute += 5;
      clockEl.textContent = `⏱️ ${minute}'`;

      // Move radar ball
      const rx = 20 + Math.random() * 60;
      const ry = 20 + Math.random() * 60;
      radarBall.style.left = `${rx}%`;
      radarBall.style.top = `${ry}%`;

      // Match event
      if (Math.random() < 0.22) {
        // Goal opportunity
        if (Math.random() < 0.6) {
          userGoals++;
          sounds.play('goal');
          const comm = document.createElement('div');
          comm.className = 'comm-item comm-goal';
          comm.textContent = `⚽ ${minute}' GOOOOL! Jamoangiz hisobni ochdi/oshirdi!`;
          feed.prepend(comm);
        } else {
          oppGoals++;
          sounds.play('miss');
          const comm = document.createElement('div');
          comm.className = 'comm-item comm-goal';
          comm.textContent = `⚽ ${minute}' Manchester City hisobni o'zgartirdi!`;
          feed.prepend(comm);
        }
        scoreEl.textContent = `${userGoals} - ${oppGoals}`;
      } else {
        const comm = document.createElement('div');
        comm.className = 'comm-item';
        comm.textContent = `${minute}' ${commentaryEvents[Math.floor(Math.random() * commentaryEvents.length)]}`;
        feed.prepend(comm);
      }

      if (minute >= 90) {
        clearInterval(this.h2hInterval);
        sounds.play('whistle');
        if (userGoals > oppGoals) {
          sounds.play('fanfare');
          state.addCoins(500000);
          alert(`🏆 YORQIN G'ALABA! ${userGoals} - ${oppGoals}\nTabriklaymiz! +500,000 Oltin Tangalar olindi!`);
        } else {
          state.addCoins(150000);
          alert(`Uchrashuv yakunlandi: ${userGoals} - ${oppGoals}\nMukofot: +150,000 Oltin berildi!`);
        }
        arena.classList.add('hidden');
      }
    }, 1200);

    // Tactics buttons
    document.querySelectorAll('.tactic-btn').forEach(btn => {
      btn.onclick = () => {
        sounds.play('click');
        document.querySelectorAll('.tactic-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const comm = document.createElement('div');
        comm.className = 'comm-item';
        comm.textContent = `⚙️ Taktika o'zgartirildi: ${btn.textContent}`;
        feed.prepend(comm);
      };
    });
  }
}

// Global UI instance
const ui = new UIController();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  ui.init();
});
