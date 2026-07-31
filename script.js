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
    navHome: 'Home', navReviews: 'Reviews', navBrands: 'Brands', navAboutFaisal: 'About Faisal', navContact: 'Contact',
    heroEyebrow: 'Kuwait-based reviewer and creator',
    heroTitle: 'Reviews people can watch, read, and trust.',
    heroText: 'I’m Faisal Alrajhi, a reviewer and content creator from Kuwait. My reviews started as videos on YouTube, TikTok, and Instagram, and I’m expanding them into a written review hub so more people can discover useful places, products, and experiences.',
    heroBtnOne: 'Explore Reviews', heroBtnTwo: 'For Brands',
    statOne: 'Video Reviews', statTwo: 'Blog Reviews', statThree: 'Brand Visits',
    floatTop: 'AI • Gadgets • Reviews', floatBottom: 'Arabic Tech Content',
    reviewsEyebrow: 'Reviews', reviewsTitle: 'Video reviews today, written reviews next.',
    cardOneTitle: 'Video Reviews', cardOneText: 'Short, useful reviews shared across YouTube, TikTok, and Instagram so people can quickly see what is worth visiting, trying, or buying.',
    cardTwoTitle: 'Reviews Blog', cardTwoText: 'A WordPress review hub is coming soon, with organized posts, links, and searchable recommendations from my review work.',
    cardThreeTitle: 'Places & Experiences', cardThreeText: 'Reviews can cover places, products, services, and experiences with a clear creator perspective and practical details.',
    cardFourTitle: 'WordPress Link', cardFourText: 'Once the review website is ready, this section will link visitors directly to the full blog.',
    reviewsComingSoon: 'Coming soon',
    brandsEyebrow: 'Brands', brandsTitle: 'Reviews and campaigns built for real attention.',
    brandsText: 'I collaborate with technology brands, agencies, and creative teams to produce reviews, product showcases, social media videos, launch coverage, and engaging Arabic content for audiences in Kuwait and the GCC.',
    aboutEyebrow: 'About Faisal',
    aboutTitle: 'A creator turning video reviews into a searchable review hub.',
    aboutTextOne: 'My content is built around real experiences: visiting places, testing products, trying services, and showing what people should know before they spend their time or money.',
    aboutTextTwo: 'I started with reviews on YouTube, TikTok, and Instagram. Now I’m expanding into written reviews so more people can discover, search, and share my recommendations.',
    contactEyebrow: 'Contact', contactTitle: 'Follow, message, or collaborate.', boutiqueLabel: 'Boutique',
    emailBtn: 'Email Me', instagramBtn: 'Message on Instagram',
    footerText: 'Faisal Alrajhi. Reviews, brands, and creator work.', backTop: 'Back to top ↑'
  },
  ar: {
    brandName: 'فيصل الراجحي',
    navHome: 'الرئيسية', navReviews: 'المراجعات', navBrands: 'العلامات', navAboutFaisal: 'عن فيصل', navContact: 'تواصل',
    heroEyebrow: 'مراجع وصانع محتوى من الكويت',
    heroTitle: 'مراجعات الناس تقدر تشوفها، تقراها، وتثق فيها.',
    heroText: 'أنا فيصل الراجحي، مراجع وصانع محتوى من الكويت. بدأت مراجعاتي كفيديوهات على يوتيوب، تيك توك، وإنستغرام، والحين أوسعها إلى منصة مراجعات مكتوبة حتى يقدر الناس يكتشفون أماكن، منتجات، وتجارب مفيدة بسهولة.',
    heroBtnOne: 'استكشف المراجعات', heroBtnTwo: 'للشركات والعلامات',
    statOne: 'مراجعات فيديو', statTwo: 'مراجعات مكتوبة', statThree: 'زيارات للعلامات',
    floatTop: 'AI • أجهزة • مراجعات', floatBottom: 'محتوى تقني عربي',
    reviewsEyebrow: 'المراجعات', reviewsTitle: 'مراجعات فيديو اليوم، ومراجعات مكتوبة قريباً.',
    cardOneTitle: 'مراجعات فيديو', cardOneText: 'مراجعات قصيرة ومفيدة أنشرها على يوتيوب، تيك توك، وإنستغرام حتى يعرف الناس بسرعة شنو يستحق الزيارة أو التجربة أو الشراء.',
    cardTwoTitle: 'مدونة المراجعات', cardTwoText: 'منصة مراجعات ووردبريس قادمة قريباً، فيها مقالات مرتبة، روابط، وتوصيات قابلة للبحث من محتوى المراجعات.',
    cardThreeTitle: 'أماكن وتجارب', cardThreeText: 'المراجعات ممكن تغطي أماكن، منتجات، خدمات، وتجارب بمنظور صانع محتوى واضح وتفاصيل عملية.',
    cardFourTitle: 'رابط ووردبريس', cardFourText: 'لما يكون موقع المراجعات جاهز، هذا القسم راح يوجه الزوار مباشرة للمدونة الكاملة.',
    reviewsComingSoon: 'قريباً',
    brandsEyebrow: 'العلامات', brandsTitle: 'مراجعات وحملات مصممة لجذب انتباه حقيقي.',
    brandsText: 'أتعاون مع العلامات التقنية، الوكالات، والفرق الإبداعية لإنتاج مراجعات، استعراض منتجات، فيديوهات للسوشيال ميديا، تغطيات إطلاق، ومحتوى عربي جذاب لجمهور الكويت والخليج.',
    aboutEyebrow: 'عن فيصل',
    aboutTitle: 'صانع محتوى يحول مراجعات الفيديو إلى منصة مراجعات قابلة للبحث.',
    aboutTextOne: 'محتواي مبني على تجارب حقيقية: زيارة أماكن، تجربة منتجات، اختبار خدمات، وشرح اللي يحتاج الناس يعرفونه قبل ما يصرفون وقتهم أو فلوسهم.',
    aboutTextTwo: 'بدأت بالمراجعات على يوتيوب، تيك توك، وإنستغرام. والحين أتوسع للمراجعات المكتوبة حتى يقدر الناس يكتشفون توصياتي، يبحثون عنها، ويشاركونها بسهولة.',
    contactEyebrow: 'تواصل', contactTitle: 'تابعني، راسلني، أو تعاون معي.', boutiqueLabel: 'البوتيك',
    emailBtn: 'راسلني بالإيميل', instagramBtn: 'راسلني على إنستغرام',
    footerText: 'فيصل الراجحي. مراجعات، علامات، ومحتوى إبداعي.', backTop: 'الرجوع للأعلى ↑'
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
