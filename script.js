const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const langButton = document.querySelector('.lang-toggle');
const langLabel = document.querySelector('.lang-label');
const savedTheme = localStorage.getItem('theme');
const savedLanguage = localStorage.getItem('language') || 'en';
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const translations = {
  en: {
    brandName: 'Faisal Alrajhi',
    navAbout: 'About', navWork: 'Work', navProjects: 'Projects', navChannels: 'Channels', navCollab: 'Collaborate',
    heroEyebrow: 'Kuwait-based tech creator',
    heroTitle: 'Technology, AI, and gadgets made simple.',
    heroText: 'I’m Faisal Alrajhi, a tech reviewer and content creator from Kuwait. I create Arabic content about smartphones, gadgets, AI tools, cameras, gaming, and creator technology — helping people discover what is useful, exciting, and worth their time.',
    heroBtnOne: 'Follow My Work', heroBtnTwo: 'Work With Me',
    statOne: 'Tech Reviews', statTwo: 'AI Experiments', statThree: 'Creator Tools',
    floatTop: 'AI • Gadgets • Reviews', floatBottom: 'Arabic Tech Content',
    aboutEyebrow: 'About me',
    aboutTitle: 'Honest tech content with a creator’s point of view.',
    aboutTextOne: 'My content is built around real experiences: testing devices, trying new apps, exploring AI tools, and showing how technology fits into everyday life. I focus on clear explanations, practical use cases, and engaging visuals that make technology easier to understand.',
    aboutTextTwo: 'From product reviews and unboxings to AI experiments and 3D printing projects, I create content for people who love gadgets, creativity, and future technology.',
    workEyebrow: 'What I create', workTitle: 'Content built for modern tech audiences.',
    cardOneTitle: 'Tech Reviews', cardOneText: 'Smartphones, accessories, cameras, gaming devices, smart gadgets, and real-world product impressions.',
    cardTwoTitle: 'AI & Future Tools', cardTwoText: 'Creative AI tools, automation, image generation, productivity workflows, and the future of digital creativity.',
    cardThreeTitle: 'Creator Gear', cardThreeText: 'Cameras, microphones, lighting, drones, and tools that help creators produce better content.',
    cardFourTitle: '3D Printing & Projects', cardFourText: 'Maker projects, custom designs, product ideas, and experiments with 3D printing technology.',
    projectsEyebrow: 'My projects', projectsTitle: 'Websites and tools I build.',
    fixKalamBadge: 'Arabic utility', fixKalamText: 'A simple tool that fixes Arabic and English text direction for mixed messages, numbers, links, hashtags, and punctuation.',
    fixKalamLink: 'Visit website',
    channelsEyebrow: 'Find me online', channelsTitle: 'Follow my content across platforms.', boutiqueLabel: 'Boutique',
    collabEyebrow: 'Partnerships', collabTitle: 'Let’s create content that people actually enjoy watching.',
    collabText: 'I collaborate with technology brands, agencies, and creative teams to produce reviews, product showcases, social media videos, launch coverage, and engaging Arabic content for audiences in Kuwait and the GCC.',
    emailBtn: 'Email Me', instagramBtn: 'Message on Instagram',
    footerText: 'Faisal Alrajhi. Tech Creator & AI Explorer.', backTop: 'Back to top ↑'
  },
  ar: {
    brandName: 'فيصل الراحجي',
    navAbout: 'نبذة', navWork: 'المحتوى', navProjects: 'مشاريعي', navChannels: 'الحسابات', navCollab: 'تعاون',
    heroEyebrow: 'صانع محتوى تقني من الكويت',
    heroTitle: 'التقنية والذكاء الاصطناعي بشكل أبسط.',
    heroText: 'أنا فيصل الراحجي، صانع محتوى ومراجع تقني من الكويت. أقدم محتوى عربي عن الهواتف، الأجهزة، أدوات الذكاء الاصطناعي، الكاميرات، الألعاب، وأدوات صناعة المحتوى — بطريقة سهلة، عملية، وممتعة.',
    heroBtnOne: 'تابع محتواي', heroBtnTwo: 'تعاون معي',
    statOne: 'مراجعات تقنية', statTwo: 'تجارب AI', statThree: 'أدوات صناع المحتوى',
    floatTop: 'AI • أجهزة • مراجعات', floatBottom: 'محتوى تقني عربي',
    aboutEyebrow: 'نبذة عني',
    aboutTitle: 'محتوى تقني صريح من منظور صانع محتوى.',
    aboutTextOne: 'محتواي مبني على تجارب حقيقية: أجرب الأجهزة، التطبيقات، أدوات الذكاء الاصطناعي، وأشرح شلون التقنية تدخل في حياتنا اليومية. أركز على شرح واضح، استخدامات عملية، وصورة جذابة تسهل فهم التقنية.',
    aboutTextTwo: 'من المراجعات والأنبوكسنغ إلى تجارب الذكاء الاصطناعي ومشاريع الطباعة ثلاثية الأبعاد، أصنع محتوى للناس اللي تحب الأجهزة، الإبداع، وتقنيات المستقبل.',
    workEyebrow: 'شنو أقدم', workTitle: 'محتوى مناسب لجمهور التقنية اليوم.',
    cardOneTitle: 'مراجعات تقنية', cardOneText: 'هواتف، إكسسوارات، كاميرات، أجهزة ألعاب، أجهزة ذكية، وانطباعات استخدام حقيقية.',
    cardTwoTitle: 'الذكاء الاصطناعي وأدوات المستقبل', cardTwoText: 'أدوات AI للإبداع، الأتمتة، توليد الصور، الإنتاجية، ومستقبل الإبداع الرقمي.',
    cardThreeTitle: 'معدات صناع المحتوى', cardThreeText: 'كاميرات، مايكات، إضاءة، درونز، وأدوات تساعد صناع المحتوى يطلعون بنتيجة أفضل.',
    cardFourTitle: 'الطباعة ثلاثية الأبعاد والمشاريع', cardFourText: 'مشاريع ميكر، تصاميم مخصصة، أفكار منتجات، وتجارب في عالم الطباعة ثلاثية الأبعاد.',
    projectsEyebrow: 'مشاريعي', projectsTitle: 'مواقع وأدوات أبنيها.',
    fixKalamBadge: 'أداة عربية', fixKalamText: 'أداة بسيطة تصلح اتجاه النص العربي والإنجليزي في الرسائل المختلطة مع الأرقام، الروابط، الهاشتاقات، علامات الترقيم.',
    fixKalamLink: 'زيارة الموقع',
    channelsEyebrow: 'حساباتي', channelsTitle: 'تابعني على المنصات المختلفة.', boutiqueLabel: 'البوتيك',
    collabEyebrow: 'الشراكات', collabTitle: 'خلونا نصنع محتوى الناس تستمتع بمشاهدته.',
    collabText: 'أتعاون مع العلامات التقنية، الوكالات، والفرق الإبداعية لإنتاج مراجعات، استعراض منتجات، فيديوهات للسوشيال ميديا، تغطيات إطلاق، ومحتوى عربي جذاب لجمهور الكويت والخليج.',
    emailBtn: 'راسلني بالإيميل', instagramBtn: 'راسلني على إنستغرام',
    footerText: 'فيصل الراحجي. صانع محتوى تقني ومستكشف AI.', backTop: 'الرجوع للأعلى ↑'
  }
};

if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
} else if (prefersDark) {
  root.setAttribute('data-theme', 'dark');
}

function applyLanguage(language) {
  const dictionary = translations[language];
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    if (dictionary[key]) element.textContent = dictionary[key];
  });
  root.setAttribute('lang', language);
  root.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
  langLabel.textContent = language === 'ar' ? 'EN' : 'AR';
  localStorage.setItem('language', language);
}

applyLanguage(savedLanguage);

themeButton.addEventListener('click', () => {
  const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', nextTheme);
  localStorage.setItem('theme', nextTheme);
});

langButton.addEventListener('click', () => {
  const nextLanguage = root.getAttribute('lang') === 'ar' ? 'en' : 'ar';
  applyLanguage(nextLanguage);
});

document.getElementById('year').textContent = new Date().getFullYear();

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});
