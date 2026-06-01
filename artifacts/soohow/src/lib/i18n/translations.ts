export const locales = ["en", "uz", "ru"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  uz: "UZ",
  ru: "RU",
};

const en = {
  nav: {
    home: "HOME",
    about: "ABOUT",
    products: "PRODUCTS",
    contact: "CONTACT",
  },
  common: {
    requestQuote: "Request Quote",
    search: "Search",
    toggleTheme: "Toggle theme",
    selectLanguage: "Select language",
    exploreInstruments: "Explore Instruments",
    aboutUs: "About us →",
    getPrice: "Get Price",
    request: "Request",
    featuredInstrument: "Featured Instrument",
    featuredProduct: "FS500 CCD Spark Optical Emission Spectrometer",
  },
  intro: {
    clickHint: "Click the left mouse button",
  },
  hero: {
    badge: "Official dealer in Central Asia",
    title1: "PRECISION",
    title2: "QUALITY",
    title3: "INNOVATIONS",
    description:
      "OOO FALCON TRADE LINES supplies world-class industrial measurement instruments and analytical equipment to laboratories and manufacturing plants across Central Asia.",
    primaryCta: "Catalog",
    scrollDown: "Scroll down",
    statProducts: "40+ Products",
    statClients: "200+ Clients",
    statYears: "10+ Years",
  },
  homeIntro: {
    badge: "Our services",
    title: "OOO FALCON TRADE LINES YOUR RELIABLE PARTNER",
    lead:
      "As the authorized partner of KUNSHAN SOOHOW INSTRUMENT TECHNOLOGY CO., LTD. in Central Asia, we supply spectral metal analysis systems, oil and lubricant analyzers, wear analyzers, ferrography equipment, particle counters, and medical analyzers. Browse the catalog by category, request a quote online, and rely on warranty service, OEM spare parts, and engineer support.",
    pillars: [
      {
        title: "Official SOOHOW partner",
        description:
          "OOO FALCON TRADE LINES is the authorized representative of Kunshan Soohow Instrument in Central Asia — spectral metal analysis, oil and lubricant testing, wear and ferrography diagnostics, particle counting, and medical analyzers with ISO-backed quality.",
      },
      {
        title: "Equipment & solutions",
        description:
          "Browse 40+ instruments across six catalog categories: spectral metal analysis, oil and lubricant analyzers, wear analyzers, ferrography, particle counters, and medical analyzers. Request a quote online or ask our engineers for a tailored configuration.",
      },
      {
        title: "Service & support",
        description:
          "Warranty and post-warranty repair, original OEM spare parts, calibration, and technical consulting. Reach us by phone, email, or the contact form — we respond during business hours.",
      },
    ],
    ctaAbout: "About us",
    ctaProducts: "View catalog",
  },
  equipmentPromo: {
    badge: "New equipment",
    cta: "View in catalog",
    prev: "Previous slide",
    next: "Next slide",
  },
  scientific: {
    title: "SCIENTIFIC POTENTIAL",
    tag: "02",
    badge: "Technological assets",
    lead:
      "Modern R&D, expert knowledge, and the deployment of innovative analytical solutions — backed by patents, software, and national-level projects.",
    cardTitle: "Years of proven industry experience",
    overlayTitle: "TECHNOLOGICAL ASSETS",
    overlaySubtitle: "Certified excellence",
    metrics: [
      { value: "15", label: "Invention patents" },
      { value: "18", label: "Software copyrights" },
      { value: "7", label: "Software products" },
      { value: "4", label: "Leading local products" },
    ],
    items: [
      "15 invention patents",
      "18 software copyrights",
      "7 software products",
      "1 national and international advanced-level project",
      "4 leading local products",
    ],
    imageAlt: "SOOHOW team at an international exhibition",
  },
  industrial: {
    badge: "MANUFACTURING EXCELLENCE",
    eyebrow: "Scale · automation · QC",
    title: "Smart production complex",
    titleSub: "Automated analytical instrument lines",
    intro:
      "A 12,300 m² facility combines automated spectrometer and analyzer assembly lines, optical metrology, and ISO-certified labs for incoming, in-process, and final inspection. Production covers OES/GD-OES systems, oil and wear analyzers, ferrography, particle counters, and laboratory instruments — over 2,000 units shipped every year.",
    statValue: "2,000+",
    statUnit: "instruments / year",
    statCaption: "Annual output capacity",
    statNote: "Spectrometers, oil analyzers, and specialty laboratory systems built on ISO-certified processes.",
    highlights: ["12,300 m² facility", "Smart workshop", "Full-cycle QC"],
    cards: [
      {
        tag: "Core line",
        title: "Spectrometer assembly",
        description:
          "High-precision build lines for atomic-emission and optical emission analytical systems.",
      },
      {
        tag: "Metrology",
        title: "Optical calibration",
        description:
          "Dedicated dark rooms and alignment rigs for ultra-stable sensor performance.",
      },
      {
        tag: "Quality",
        title: "ISO-certified laboratories",
        description:
          "Incoming, in-process, and final inspection at every stage of manufacturing.",
      },
      {
        tag: "Fluid lab",
        title: "Intelligent oil analysis kit",
        description:
          "Portable viscometry, flash point, and dielectric strength tools for field and lab use.",
      },
      {
        tag: "Digital lab",
        title: "Smart oil analysis suite",
        description:
          "Particle moisture analysis, Smart Lu series modules, and integrated reporting software.",
      },
      {
        tag: "Life science",
        title: "Protein analyzer systems",
        description:
          "Fully and semi-automatic protein analyzers for food, feed, and research applications.",
      },
    ],
  },
  warranty: {
    badge: "Technical support",
    title: "Warranty & service maintenance",
    paragraph1:
      "We provide a complete cycle of equipment technical support — from warranty repairs to professional service maintenance. We use only original certified spare parts (OEM), ensuring reliability, safety, and a long service life for your equipment.",
    paragraph2:
      "Our team of qualified engineers performs accurate diagnostics, upgrades, and technical maintenance using modern specialized equipment. We help keep your equipment running stably and without interruption at every stage of operation.",
    highlights: [
      "Warranty & post-warranty repair",
      "Original OEM certified parts",
      "Diagnostics, upgrades & maintenance",
    ],
  },
  partners: {
    badge: "Trust of leaders",
    title: "OUR PARTNERS",
    names: [
      "CNOOC",
      "XCMG",
      "STATE GRID",
      "LOVOL",
      "Deli",
      "SINOPEC",
      "CNPC",
      "PetroChina",
      "CSCEC",
      "CRRC",
      "Haier",
      "Midea",
      "Huawei",
      "BYD",
    ],
  },
  news: {
    badge: "Industry updates",
    title: "LATEST NEWS",
    subtitle: "Updates from the world of precision and innovation",
    readMore: "Read more",
    items: [
      {
        category: "International",
        date: "2026.03.19",
        title:
          "UK Customer Dr. Giebeler Visited Soohow Instrument for In-Depth Review of Oil Analyzers",
        imageAlt: "Dr. Giebeler reviewing Soohow oil analyzers",
      },
      {
        category: "Customer visit",
        date: "2026.02.14",
        title:
          "Indian Customer Visits Soohow Instruments, AU8000 Gold Analyzer Gains On-Site Recognition",
        imageAlt: "Indian customer with AU8000 gold analyzer at Soohow",
      },
      {
        category: "Events",
        date: "2026.01.08",
        title:
          "Kunshan's Vice Mayor Yu Qianchi Visits Soohow Instrument for Inspection and Guidance",
        imageAlt: "Kunshan Vice-Mayor Yu Qianchi at Soohow Instrument",
      },
    ],
  },
  whyChoose: {
    title: "FOUR REASONS TO CHOOSE\nUS",
    badge: "Advantages",
    lead: "What sets SOOHOW Central Asia apart — in four clear strengths.",
    readMore: "More details",
    years: "10+ YEARS",
    excellence: "Certified excellence",
    openCertificate: "View certificate full size",
    closeLightbox: "Close",
    pillars: [
      {
        tag: "01",
        chip: "OEM · Service",
        title: "Official dealer & authorized service",
        teaser:
          "Original OEM supply, certified engineers, and factory-backed service across Central Asia.",
        description:
          "Guarantee of original products and qualified maintenance — from supply and commissioning to warranty support under factory procedures.",
        highlights: [
          "Authorized SOOHOW partner in Central Asia",
          "Certified engineers and OEM spare parts",
          "Installation, training, and after-sales care",
        ],
      },
      {
        tag: "02",
        chip: "R&D · Lab",
        title: "Scientific potential",
        teaser: "R&D expertise, spectrometry know-how, and innovative laboratory solutions.",
        description:
          "Modern developments, expert knowledge, and deployment of innovative solutions for metals analysis, oil diagnostics, and laboratory workflows.",
        highlights: [
          "Method development and application consulting",
          "Spectrometry and analytical expertise",
          "Continuous innovation from Soohow R&D",
        ],
      },
      {
        tag: "03",
        chip: "Smart complex",
        title: "Smart production complex",
        teaser: "Automated instrument lines, optical metrology, and ISO quality control.",
        description:
          "A 12,300 m² facility with automated spectrometer and analyzer assembly, optical metrology, and full-cycle ISO labs — over 2,000 analytical instruments every year.",
        highlights: [
          "Automated lines and process control",
          "Optical metrology and quality labs",
          "Stable output for global deliveries",
        ],
      },
      {
        tag: "04",
        chip: "ISO · Global",
        title: "International management recognition",
        teaser: "ISO management systems independently audited to international standards.",
        description:
          "Compliance with world-class quality and management standards — independently audited systems that protect your investment and data.",
        highlights: [
          "ISO 9001 · ISO 14001 · ISO 45001",
          "ISO/IEC 27001 · ISO/IEC 20000-1",
          "GJB9001C and international audits",
        ],
      },
    ],
  },
  pillarShowcase: {
    trustNote0:
      "Original OEM supply, factory-backed warranty, and certified engineers — one partner for the full equipment lifecycle in Central Asia.",
    trustNote1:
      "Patents, software products, and applied R&D — analytical expertise you can deploy in your lab or production line.",
    trustNote2:
      "Automated lines and ISO quality labs — stable capacity for spectrometers and analyzers shipped worldwide.",
    ctaContact: "Contact us",
    ctaQuote: "Request a quote",
  },
  footer: {
    tagline:
      "The premier supplier of industrial measurement instruments and analytical equipment in Central Asia. Precision you can trust.",
    navigation: "Navigation",
    categories: "Categories",
    contactUs: "Contact Us",
    home: "Home",
    about: "About",
    products: "Products",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    rights: "All rights reserved.",
    hours: "Mon–Fri: 09:00–18:00",
  },
  legal: {
    backHome: "Back to home",
    privacy: {
      title: "Privacy Policy",
      updated: "Last updated: 19 May 2026",
      paragraphs: [
        "OOO FALCON TRADE LINES (“we”, “our”, “us”) respects your privacy. This policy explains how we collect, use, and protect personal information when you visit soohowcentralasia.com or contact us through forms, email, or phone.",
        "We may collect your name, company, phone number, email address, product interest, and message content when you request a quote, contact us, or subscribe to updates. Technical data such as IP address, browser type, and cookies may also be collected to improve site performance and security.",
        "We use your information to respond to inquiries, prepare commercial offers, deliver products and services, improve our website, and comply with applicable laws. We do not sell your personal data to third parties.",
        "Data may be shared with trusted service providers (hosting, messaging, logistics) only as needed to operate our business, and with authorities when required by law. We apply reasonable technical and organizational measures to protect your information.",
        "You may request access, correction, or deletion of your personal data by contacting us at info@soohowcentralasia.com. We retain data only as long as necessary for the purposes described above.",
        "Our website may contain links to third-party sites. We are not responsible for their privacy practices. Continued use of this site after policy updates constitutes acceptance of the revised policy.",
      ],
    },
    terms: {
      title: "Terms of Service",
      updated: "Last updated: 19 May 2026",
      paragraphs: [
        "By accessing soohowcentralasia.com and using the services of OOO FALCON TRADE LINES, you agree to these Terms of Service. If you do not agree, please do not use this website.",
        "Product descriptions, specifications, images, and prices on this site are for general information and may change without notice. Final terms of supply are confirmed in written quotations, contracts, or invoices.",
        "You agree to provide accurate information in contact and quote forms. We may refuse or cancel requests that contain false, misleading, or unlawful content.",
        "All content on this website—including text, logos, graphics, and layout—is owned by OOO FALCON TRADE LINES or its licensors and may not be copied or reused without prior written permission.",
        "To the fullest extent permitted by law, OOO FALCON TRADE LINES is not liable for indirect, incidental, or consequential damages arising from use of this website or reliance on its content. Liability for supplied goods is governed by applicable contract and warranty terms.",
        "These terms are governed by the laws of the Republic of Uzbekistan. We may update these terms at any time; the current version is always published on this page.",
      ],
    },
  },
  search: {
    placeholder: "Search by instrument name or model...",
    noResults: "No products found",
    tryDifferent: "Try a different search term",
  },
  stats: {
    products: "Products Listed",
    clients: "Clients Served",
    partners: "Brand Partners",
    years: "Years Active",
    reagents: "OEM Parts Supplied",
  },
  badges: {
    bestseller: "BESTSELLER",
    new: "NEW",
  },
  about: {
    title: "ADVANCED LABORATORY TECHNOLOGIES",
    subtitle:
      "Engineering trust in every measurement. Building partnerships across Central Asia's most demanding industries.",
    p1: "Kunshan Soohow Instrument Technology Co., Ltd. is a national high-tech enterprise focused on the research, development, manufacturing, and sales of laboratory instruments, optical analytical instruments, and their software. Founded in 2012, Soohow Instrument operates an industrialized facility of nearly 12,300 m², a research and development center of nearly 3,000 m², and a smart manufacturing workshop.",
    p2: "Since its establishment, Soohow Instrument has remained committed to technological innovation and has successively passed ISO 9001 Quality Management, ISO 14001 Environmental Management, ISO 45001 Occupational Health & Safety Management, and GJB9001C-2017 Military Equipment Quality Management certifications.",
    achievementsTitle: "CORPORATE ACHIEVEMENTS",
    achievements: [
      "National high-tech enterprise",
      "Specialized and innovative SME in Jiangsu Province",
      "Suzhou atomic emission spectrometry engineering technology center",
      "Suzhou Gazelle Enterprise",
      "Specialized and innovative SME in Kunshan City",
      "Kunshan innovation and entrepreneurship talent enterprise",
      "Kunshan R&D institution",
    ],
    statCards: [
      { value: "74", label: "Intellectual property" },
      { value: "15", label: "Invention patents" },
    ],
    facilityCard: {
      imageAlt: "Soohow Instrument manufacturing and R&D facility",
      stats: [
        { value: "2012", label: "Founded" },
        { value: "3000m²", label: "R&D center" },
      ],
    },
    timelineTitle: "INDUSTRIAL TIMELINE",
    milestones: [
      {
        year: "2012",
        title: "Company founded",
        desc: "On March 27, Kunshan Soohow Instrument Technology Co., Ltd. was registered on Zhipu Road, Qiandeng Town. The spark direct-reading spectrometer AES998 was successfully developed.",
      },
      {
        year: "2013",
        title: "Relocation & industrialization",
        desc: "Relocated to Shipu Fengshou North Road, Qiandeng Town. The AES998 achieved industrialization with an annual sales volume of 30 units.",
      },
      {
        year: "2014",
        title: "HCD1000 breakthrough",
        desc: "Hollow cathode spectrometer HCD1000 was successfully developed and recognized by special steel and aerospace enterprises. Oil spectrometer research and development was initiated.",
      },
      {
        year: "2015",
        title: "Major contracts & FS500",
        desc: "Became a qualified supplier of Baoshan Iron & Steel Co., Ltd. and signed the first HCD1000 purchase contract. Full-spectrum direct-reading spectrometer FS500 was developed. Won honors including Jiangsu First Set and Jiangsu Standard Leading Project.",
      },
      {
        year: "2016",
        title: "Scale production",
        desc: "Signed a purchase contract for 50 FS500 units and a second HCD1000 contract with Airline Beijing 621 Institute.",
      },
      {
        year: "2017",
        title: "Certifications & OIL8000",
        desc: "HCD1000 received Jiangsu major equipment certification and industrial transformation funding. Oil spectrometer OIL8000 received Jiangsu industry upgrading support.",
      },
      {
        year: "2018",
        title: "Industrial sector",
        desc: "Expanded into the industrial measurement instruments sector.",
      },
      {
        year: "2019",
        title: "European partnerships",
        desc: "Established direct partnerships with leading European instrument manufacturers.",
      },
      {
        year: "2020",
        title: "Oil & gas division",
        desc: "Launched a dedicated oil and gas instrumentation network.",
      },
      {
        year: "2022",
        title: "200+ clients",
        desc: "Reached 200+ corporate clients across Central Asia.",
      },
      {
        year: "2024",
        title: "500+ catalog",
        desc: "Catalog surpassed 500+ products with 15+ certified brand partners.",
      },
    ],
    certsTitle: "Certified To The Highest Standards",
  },
  aboutTeam: {
    badge: "Our expert team",
    title: "The basis of our technological leadership",
    imageAlt: "Soohow Instrument expert team",
    graduateTitle: "100% graduate",
    graduateDesc:
      "We employ a digital industrial technical consultant with ten years of professional experience, responsible for technical solutions and details to prevent errors in product development.",
    p1: "Soohow Instrument R&D staff are 100% bachelor's degree or higher, including 1 PhD, 2 master's degrees, 3 senior engineers, 10 mid-level engineers, and 14 assistant engineers. Core team members have approximately 10 years of experience in spectrometer technology research and development. Our team structure ensures professional complementarity, clear division of labor, and strict discipline.",
    p2: "Through twelve years of steady development and dedicated research, we have built rich experience in high-end spectrometer design, manufacturing, and integration. Our technology and production processes have reached an international leading level.",
    stats: [
      { value: "1", label: "PhD" },
      { value: "2", label: "Masters" },
      { value: "3", label: "Senior engineers" },
      { value: "10", label: "Mid-level engineers" },
    ],
  },
  productsPage: {
    title: "INDUSTRIAL INSTRUMENTS",
    subtitle:
      "Precision measurement and analytical equipment for demanding industrial and laboratory environments.",
    filterAll: "All",
    catIndustrial: "Industrial Measurement",
    catMetalSpectral: "Spectral Metal Analysis",
    catOilLubricant: "Oil & Lubricant Analyzers",
    catWear: "Wear Analyzers",
    catFerrography: "Ferrography",
    catParticleCounter: "Particle Counters",
    catMedical: "Medical Analyzers",
    catMetalSpectralShort: "Metal spectral",
    catOilLubricantShort: "Oil & lube",
    catWearShort: "Wear",
    catFerrographyShort: "Ferrography",
    catParticleCounterShort: "Particle counters",
    catMedicalShort: "Medical",
    filterCategoriesAria: "Product categories",
    modelLabel: "Model",
  },
  productModal: {
    productsBreadcrumb: "Products",
    techSpecs: "Technical Specifications",
    pricingNote: "Pricing and availability on request. Bulk discounts available.",
    getQuote: "Get Price Quote",
    share: "Share",
    copyLink: "Copy product link",
    linkCopied: "Copied",
    telegram: "Telegram",
    related: "Related Instruments",
  },
  contact: {
    title: "GET IN TOUCH",
    subtitle: "Ready to supply your facility. Reach us through any channel or request a callback.",
    headquarters: "Headquarters",
    address:
      "Republic of Uzbekistan, Tashkent, Yakkasaray district, Damaryk mahalla, Small Beshyagach street, building 72",
    city: "",
    directLines: "Direct Lines",
    phone: "+998 77 744 40 48",
    email: "Email",
    emailAddress: "info@soohowcentralasia.com",
    workingHours: "Working Hours",
    hoursWeek: "Mon–Fri: 09:00–18:00",
    hoursSat: "Sat: 09:00–14:00, Sun: Closed",
    mapCoords: "TASHKENT · 41.283848, 69.265665",
    mapTitle: "Office location on map",
    mapOpenLink: "Open in Google Maps",
    faqTitle: "FREQUENTLY ASKED QUESTIONS",
    formName: "Name *",
    formPhone: "Phone *",
    formEmail: "Email",
    formMessage: "Your message *",
    sendMessage: "Send Message",
    messageSent: "Message Sent",
    messageSentDesc: "We've received your inquiry and will respond shortly.",
    sendFailed: "Failed to send.",
    subjects: ["General Inquiry", "Price Quote", "Technical Support", "Partnership"],
    faqs: [
      { q: "Do you provide product certifications and datasheets?", a: "Yes. All instruments come with manufacturer certificates, calibration records, and full technical documentation in Uzbek, Russian, or English." },
      { q: "Do you supply original OEM spare parts?", a: "Yes. We provide manufacturer-original parts for spectrometers and analyzers with full traceability and documentation." },
      { q: "Do you deliver outside Tashkent?", a: "We deliver across all regions of Uzbekistan and export to Kazakhstan, Kyrgyzstan, and Tajikistan." },
      { q: "What is your calibration and service policy?", a: "We offer on-site calibration, installation supervision, and warranty service for all instruments. Training for operators is included." },
      { q: "How quickly can I get a price quote?", a: "Send a request through the website or Telegram — we respond within 30 minutes during working hours." },
    ],
  },
  quote: {
    title: "Request a Quote",
    subtitle: "Fill out the form below and our specialists will contact you within 30 minutes during working hours.",
    received: "Request Received",
    receivedDesc: "Thank you for your interest. A specialist will be in touch with you shortly.",
    close: "Close Window",
    sendFailed: "Failed to send request. Please try again or contact us directly via email.",
    selectedProduct: "Selected Product",
    fullName: "Full Name *",
    phone: "Phone *",
    company: "Company / Organization *",
    email: "Email Address",
    interestedProduct: "Interested Product / Category",
    quantity: "Quantity needed",
    requirements: "Special Requirements",
    send: "Send Request →",
    placeholders: {
      name: "John Doe",
      phone: "+998 90 123 45 67",
      company: "Acme Industrial",
      email: "john@example.com",
      product: "e.g. Ultrasonic Flow Meters",
      quantity: "1",
      message: "Any specific technical requirements, certifications needed, or delivery timeline?",
    },
  },
  phoneCountries: {
    select: "Select country",
    uz: "Uzbekistan",
    kz: "Kazakhstan",
    kg: "Kyrgyzstan",
    tj: "Tajikistan",
    tm: "Turkmenistan",
  },
  validation: {
    nameRequired: "Name required",
    phoneRequired: "Phone required",
    emailInvalid: "Invalid email",
    messageRequired: "Message required",
    nameMin: "Name is required",
    phoneMin: "Valid phone number required",
    companyMin: "Company name is required",
  },
  searchExt: {
    popularCategories: "Popular Categories",
    resultsFound: "RESULTS FOUND",
    tryTypos: "Try checking for typos or searching with more general terms.",
    tags: ["OES Spectrometers", "Oil Analyzers", "Metal Analysis", "RDE-OES", "Gold Analyzers", "GD-OES"],
  },
  certificates: {
    badge: "Management systems",
    tag: "04",
    title: "INTERNATIONAL MANAGEMENT\nSYSTEM RECOGNITION",
    lead:
      "Compliance with global quality standards and effective management systems — confirmed by independent certification.",
    sublead:
      "Official ISO certificates for Kunshan Soohow Instrument demonstrate audited processes in IT services, information security, and quality management.",
    company: "Kunshan Soohow Instrument Co., Ltd.",
    galleryLabel: "Certified management systems",
    viewAll: "View certificates",
    enlarge: "A4",
    hint: "Click a certificate to view the full A4 document.",
    autoRotate: "Slides change every 10 seconds · hover to pause",
    prev: "Previous certificates",
    next: "Next certificates",
    slide: "Slide",
    certificateAlt: "Certificate",
    standards: [
      "ISO/IEC 20000-1",
      "ISO/IEC 27001",
      "ISO 9001",
      "ISO 14001",
      "ISO 45001",
      "GJB9001C",
    ],
    items: [
      {
        standard: "ITSM",
        title: "ISO/IEC 20000-1:2018",
        subtitle: "IT Service Management System",
      },
      {
        standard: "ISMS",
        title: "ISO/IEC 27001:2022",
        subtitle: "Information Security Management",
      },
      {
        standard: "EMS",
        title: "ISO 14001:2015",
        subtitle: "Environmental Management System",
      },
      {
        standard: "QMS",
        title: "ISO 9001:2015",
        subtitle: "Quality Management System",
      },
      {
        standard: "OHS",
        title: "ISO 45001:2018",
        subtitle: "Occupational Health & Safety",
      },
      {
        standard: "GJB",
        title: "GJB9001C-2017",
        subtitle: "Military Equipment Quality Management",
      },
      {
        standard: "CNAS",
        title: "CNAS Accreditation",
        subtitle: "Laboratory & testing competence",
      },
      {
        standard: "CE",
        title: "CE Conformity",
        subtitle: "Product safety & regulatory compliance",
      },
      {
        standard: "IP",
        title: "Intellectual Property",
        subtitle: "Patents & proprietary technology",
      },
      {
        standard: "HTE",
        title: "High-Tech Enterprise",
        subtitle: "National innovation recognition",
      },
    ],
  },
  whyChooseImages: {
    alt1: "ISO/IEC 20000-1 certificate — Kunshan Soohow Instrument",
    alt2: "ISO/IEC 27001 certificate — Kunshan Soohow Instrument",
    alt3: "ISO 14001 certificate — Kunshan Soohow Instrument",
  },
};

export type TranslationTree = typeof en;

const uz: TranslationTree = {
  nav: {
    home: "BOSH SAHIFA",
    about: "BIZ HAQIMIZDA",
    products: "MAHSULOTLAR",
    contact: "ALOQA",
  },
  common: {
    requestQuote: "Narx so'rash",
    search: "Qidiruv",
    toggleTheme: "Mavzuni almashtirish",
    selectLanguage: "Tilni tanlash",
    exploreInstruments: "Uskunalarni ko'rish",
    aboutUs: "Biz haqimizda →",
    getPrice: "Narx olish",
    request: "So'rov",
    featuredInstrument: "Tavsiya etilgan uskuna",
    featuredProduct: "FS500 CCD yorug'lik emissiya spektrometri",
  },
  intro: {
    clickHint: "Chap tugmani bosing",
  },
  hero: {
    badge: "Markaziy Osiyada rasmiy diler",
    title1: "ANIQLIK",
    title2: "SIFAT",
    title3: "INNOVATSIYALAR",
    description:
      "OOO FALCON TRADE LINES laboratoriyalar va ishlab chiqarish zavodlari uchun dunyo darajasidagi sanoat o'lchov uskunalari va analitik jihozlarni ta'minlaydi.",
    primaryCta: "Katalog",
    scrollDown: "Pastga tushish",
    statProducts: "40+ Mahsulot",
    statClients: "200+ Mijoz",
    statYears: "10+ Yil",
  },
  homeIntro: {
    badge: "Xizmatlarimiz",
    title: "OOO FALCON TRADE LINES ISHONCHLI HAMKORINGIZ",
    lead:
      "Markaziy Osiyoda KUNSHAN SOOHOW INSTRUMENT TECHNOLOGY CO., LTD. rasmiy vakili sifatida metallarning spektral tahlili, moy va moylash materiallari analizatorlari, eskirish analizatorlari, ferrografiya, zarracha hisoblagichlar va tibbiy analizatorlarni yetkazib beramiz. Katalogda kategoriya bo'yicha tanlang, saytda narx so'rovi yuboring, kafolatli servis, OEM ehtiyot qismlar va muhandis maslahatidan foydalaning.",
    pillars: [
      {
        title: "Rasmiy SOOHOW hamkori",
        description:
          "OOO FALCON TRADE LINES — Kunshan Soohow Instrument kompaniyasining Markaziy Osiyodagi vakili: spektral metall tahlili, moy va moylash tahlili, eskirish va ferrografiya diagnostikasi, zarracha hisoblash va tibbiy analizatorlar — ISO sertifikatlangan sifat bilan.",
      },
      {
        title: "Uskunalar va yechimlar",
        description:
          "Katalogda 40+ asbob — oltita kategoriya: metallarning spektral tahlili, moy va moylash analizatorlari, eskirish analizatorlari, ferrografiya, zarracha hisoblagichlar va tibbiy analizatorlar. Saytdan narx so'rovi yuboring yoki muhandislarimizdan mos konfiguratsiya so'rang.",
      },
      {
        title: "Servis va qo'llab-quvvatlash",
        description:
          "Kafolatli va kafolatdan keyingi ta'mir, original OEM ehtiyot qismlar, kalibrlash va texnik maslahat. Telefon, email yoki aloqa formasi orqali bog'laning — ish vaqtida javob beramiz.",
      },
    ],
    ctaAbout: "Biz haqimizda",
    ctaProducts: "Katalogni ko'rish",
  },
  equipmentPromo: {
    badge: "Yangi uskunalar",
    cta: "Katalogda ko'rish",
    prev: "Oldingi slayd",
    next: "Keyingi slayd",
  },
  scientific: {
    title: "ILMIY SALOHIYAT",
    tag: "02",
    badge: "Texnologik aktivlar",
    lead:
      "Zamonaviy ishlanmalar, ekspert bilim va innovatsion analitik yechimlar — patentlar, dasturiy ta'minot va milliy darajadagi loyihalar bilan tasdiqlangan.",
    cardTitle: "Sanoat sohasidagi ko'p yillik tajriba",
    overlayTitle: "TEXNOLOGIK AKTIVLAR",
    overlaySubtitle: "Sertifikatlangan mukammallik",
    metrics: [
      { value: "15", label: "Ixtiro patenti" },
      { value: "18", label: "Dasturiy ta'minot huquqi" },
      { value: "7", label: "Dasturiy mahsulot" },
      { value: "4", label: "Yetakchi mahsulot" },
    ],
    items: [
      "15 ta ixtiro patenti",
      "18 ta dasturiy ta'minot mualliflik huquqi",
      "7 ta dasturiy mahsulot",
      "1 ta milliy va xalqaro ilg'or darajadagi loyiha",
      "4 ta yetakchi mahalliy mahsulot",
    ],
    imageAlt: "SOOHOW jamoasi xalqaro ko'rgazmada",
  },
  industrial: {
    badge: "ISHLAB CHIQARISH",
    eyebrow: "Hajm · avtomatlashtirish · nazorat",
    title: "Aqlli ishlab chiqarish kompleksi",
    titleSub: "Analitik uskunalar avtomat liniyalari",
    intro:
      "12 300 m² maydonda spektrometr va analitik komplekslarni yig'ish avtomat liniyalari, optik metrologiya hamda kiruvchi, jarayon ichidagi va yakuniy nazorat uchun ISO laboratoriyalari birlashtirilgan. OES/GD-OES, moy va eskirish tahlili, ferrografiya, zarracha hisoblagichlar va laboratoriya uskunalari — yiliga 2000 dan ortiq mahsulot ISO standartlari bo'yicha.",
    statValue: "2000+",
    statUnit: "dona / yil",
    statCaption: "Yillik ishlab chiqarish quvvati",
    statNote: "ISO jarayonlari asosida spektrometrlar, moy tahlilchilar va maxsus laboratoriya tizimlari.",
    highlights: ["12 300 m² maydon", "Aqlli sex", "To'liq sifat nazorati"],
    cards: [
      {
        tag: "Asosiy liniya",
        title: "Spektrometr yig'ish",
        description:
          "Atom-emissiya va optik emissiya tahlil tizimlari uchun yuqori aniqlikdagi montaj.",
      },
      {
        tag: "Metrologiya",
        title: "Optik kalibrlash",
        description:
          "Datchiklarning barqaror ishlashi uchun maxsus qorong'u xonalar va sozlash stendlari.",
      },
      {
        tag: "Sifat",
        title: "ISO laboratoriyalari",
        description:
          "Kiruvchi, jarayon ichidagi va yakuniy nazorat — ishlab chiqarishning har bosqichida.",
      },
      {
        tag: "Moy laboratoriyasi",
        title: "Aqlli moy tahlili to'plami",
        description:
          "Portativ viskozimetriya, yonish nuqtasi va dielektrik mustahkamlik o'lchovlari.",
      },
      {
        tag: "Raqamli laboratoriya",
        title: "Smart moy tahlili kompleksi",
        description:
          "Zarracha-namlik tahlili, Smart Lu seriyasi modullari va integratsiyalangan hisobot dasturi.",
      },
      {
        tag: "Bio tahlil",
        title: "Oqsil analizatorlari",
        description:
          "Oziq-ovqat, yem va ilmiy tadqiqotlar uchun to'liq va yarim avtomatik tizimlar.",
      },
    ],
  },
  warranty: {
    badge: "Texnik qo'llab-quvvatlash",
    title: "Kafolat va servis xizmatlari",
    paragraph1:
      "Biz uskunalarga to'liq texnik qo'llab-quvvatlash tsiklini ta'minlaymiz — kafolatli ta'mirdan professional servis xizmatigacha. Faqat original sertifikatlangan ehtiyot qismlar (OEM) ishlatiladi, bu uskunaning ishonchliligi, xavfsizligi va uzoq xizmat muddatini kafolatlaydi.",
    paragraph2:
      "Malakali muhandislar jamoamiz zamonaviy maxsus uskunalar yordamida aniq diagnostika, modernizatsiya va texnik xizmat ko'rsatadi. Biz ekspluatatsiyaning har bir bosqichida uskunangizning barqaror va uzluksiz ishlashini ta'minlashga yordam beramiz.",
    highlights: [
      "Kafolatli va kafolatdan keyingi ta'mir",
      "Original OEM sertifikatlangan qismlar",
      "Diagnostika, modernizatsiya va TO",
    ],
  },
  partners: {
    badge: "Etkachilar ishonchi",
    title: "BIZNING HAMKORLARIMIZ",
    names: [
      "CNOOC",
      "XCMG",
      "STATE GRID",
      "LOVOL",
      "Deli",
      "SINOPEC",
      "CNPC",
      "PetroChina",
      "CSCEC",
      "CRRC",
      "Haier",
      "Midea",
      "Huawei",
      "BYD",
    ],
  },
  news: {
    badge: "Sanoat yangiliklari",
    title: "SO'NGGI YANGILIKLAR",
    subtitle: "Aniqlik va innovatsiyalar dunyosidan yangiliklar",
    readMore: "Batafsil",
    items: [
      {
        category: "Xalqaro",
        date: "2026.03.19",
        title:
          "Buyuk Britaniya mijozi doktor Giebeler Soohow Instrumentga tashrif buyurib, moy analizatorlarini chuqur ko'rib chiqdi",
        imageAlt: "Doktor Giebeler Soohow moy analizatorlarini ko'rib chiqmoqda",
      },
      {
        category: "Mijoz tashrifi",
        date: "2026.02.14",
        title:
          "Hindiston mijozi Soohow Instrumentsga tashrif buyurdi, AU8000 oltin analizatori joyida tan olindi",
        imageAlt: "Hindiston mijozi Soohowda AU8000 oltin analizatori bilan",
      },
      {
        category: "Voqealar",
        date: "2026.01.08",
        title:
          "Kunshan shahri vitse-meri Yu Qianchi Soohow Instrumentga tekshiruv va yo'naltirish uchun tashrif buyurdi",
        imageAlt: "Kunshan vitse-meri Yu Qianchi Soohow Instrumentda",
      },
    ],
  },
  whyChoose: {
    title: "BIZNI TANLASHNING\nTO'RTTA SABABI",
    badge: "Afzalliklari",
    lead: "SOOHOW Central Asia ni ajratib turadigan to'rt aniq ustunlik.",
    readMore: "Batafsil",
    years: "10+ YIL",
    excellence: "Sertifikatlangan mukammallik",
    openCertificate: "Sertifikatni to'liq ko'rish",
    closeLightbox: "Yopish",
    pillars: [
      {
        tag: "01",
        chip: "OEM · Servis",
        title: "Rasmiy diler va vakolatli servis",
        teaser:
          "Original OEM yetkazib berish, sertifikatlangan muhandislar va zavod kafolatli servis Markaziy Osiyoda.",
        description:
          "Original mahsulot va malakali xizmat kafolati — yetkazib berish va ishga tushirishdan kafolatli servisgacha, zavod tartib-qoidalariga mos.",
        highlights: [
          "Markaziy Osiyodagi vakolatli SOOHOW hamkori",
          "Sertifikatlangan muhandislar va OEM qismlar",
          "O'rnatish, o'qitish va sotuvdan keyingi xizmat",
        ],
      },
      {
        tag: "02",
        chip: "R&D · Laboratoriya",
        title: "Ilmiy salohiyat",
        teaser: "R&D tajribasi, spektrometriya va laboratoriya uchun innovatsion yechimlar.",
        description:
          "Zamonaviy ishlanmalar, ekspert bilim va innovatsion yechimlar — metall tahlili, moy diagnostikasi va laboratoriya jarayonlari uchun.",
        highlights: [
          "Usul ishlab chiqish va ilova bo'yicha maslahat",
          "Spektrometriya va analitik tajriba",
          "Soohow R&D dan doimiy yangilanishlar",
        ],
      },
      {
        tag: "03",
        chip: "Aqlli kompleks",
        title: "Aqlli ishlab chiqarish kompleksi",
        teaser: "Analitik uskunalar avtomat liniyalari, optik metrologiya va ISO sifat nazorati.",
        description:
          "12 300 m² maydon — spektrometr va analizatorlarni avtomat yig'ish, optik metrologiya va to'liq sikl ISO laboratoriyalari; yiliga 2000 dan ortiq analitik uskuna.",
        highlights: [
          "Avtomatlashtirilgan liniyalar va jarayon nazorati",
          "Optik metrologiya va sifat laboratoriyalari",
          "Global yetkazib berish uchun barqaror hajm",
        ],
      },
      {
        tag: "04",
        chip: "ISO · Global",
        title: "Boshqaruv tizimlarining xalqaro tan olinishi",
        teaser: "Xalqaro standartlarga mos, mustaqil auditdan o'tgan ISO tizimlari.",
        description:
          "Dunyo darajasidagi sifat va boshqaruv standartlariga muvofiqlik — mustaqil auditdan o'tgan tizimlar, investitsiya va ma'lumotlaringizni himoya qiladi.",
        highlights: [
          "ISO 9001 — sifat menejmenti",
          "ISO/IEC 27001 — axborot xavfsizligi",
          "ISO/IEC 20000-1 — IT xizmatlar boshqaruvi",
        ],
      },
    ],
  },
  pillarShowcase: {
    trustNote0:
      "Original OEM yetkazib berish, zavod kafolati va sertifikatlangan muhandislar — Markaziy Osiyoda uskuna hayot sikli uchun yagona hamkor.",
    trustNote1:
      "Patentlar, dasturiy mahsulotlar va amaliy R&D — laboratoriya va ishlab chiqarishda qo'llanadigan analitik tajriba.",
    trustNote2:
      "Avtomatlashtirilgan liniyalar va ISO sifat laboratoriyalari — dunyoga yetkazib berish uchun barqaror quvvat.",
    ctaContact: "Bog'lanish",
    ctaQuote: "Narx so'rash",
  },
  footer: {
    tagline:
      "Markaziy Osiyoda sanoat o'lchov uskunalari va analitik jihozlarning yetakchi yetkazib beruvchisi. Ishonchli aniqlik.",
    navigation: "Navigatsiya",
    categories: "Kategoriyalar",
    contactUs: "Bog'lanish",
    home: "Bosh sahifa",
    about: "Biz haqimizda",
    products: "Mahsulotlar",
    contact: "Aloqa",
    privacy: "Maxfiylik siyosati",
    terms: "Foydalanish shartlari",
    rights: "Barcha huquqlar himoyalangan.",
    hours: "Dush–Jum: 09:00–18:00",
  },
  legal: {
    backHome: "Bosh sahifaga",
    privacy: {
      title: "Maxfiylik siyosati",
      updated: "Oxirgi yangilanish: 2026-yil 19-may",
      paragraphs: [
        "OOO FALCON TRADE LINES (“biz”) foydalanuvchilarning maxfiyligini hurmat qiladi. Ushbu siyosat soohowcentralasia.com saytiga tashrif buyurganingizda yoki forma, email va telefon orqali murojaat qilganingizda shaxsiy ma’lumotlaringiz qanday yig‘ilishi, ishlatilishi va himoyalanishini tushuntiradi.",
        "Narx so‘rovi, aloqa formasi yoki yangiliklarga obuna bo‘lganingizda ism, kompaniya, telefon, email, mahsulot qiziqishi va xabar matni yig‘ilishi mumkin. Sayt ishlashi va xavfsizligi uchun IP manzil, brauzer turi va cookie ma’lumotlari ham qayd etilishi mumkin.",
        "Ma’lumotlaringiz murojaatlarga javob berish, tijoriy taklif tayyorlash, mahsulot va xizmat ko‘rsatish, saytni yaxshilash hamda qonunchilik talablariga rioya qilish uchun ishlatiladi. Shaxsiy ma’lumotlar uchinchi shaxslarga sotilmaydi.",
        "Ma’lumotlar faqat biznes faoliyatimiz uchun zarur bo‘lgan ishonchli xizmat ko‘rsatuvchilar (hosting, xabar almashish, logistika) bilan va qonun talab qilganda davlat organlari bilan baham ko‘rilishi mumkin. Ma’lumotlarni himoya qilish uchun oqilona texnik va tashkiliy choralalar qo‘llaniladi.",
        "Shaxsiy ma’lumotlaringizga kirish, tuzatish yoki o‘chirishni info@soohowcentralasia.com orqali so‘rashingiz mumkin. Ma’lumotlar faqat yuqoridagi maqsadlar uchun zarur bo‘lgan muddatda saqlanadi.",
        "Saytimizda uchinchi tomon havolalari bo‘lishi mumkin; ularning maxfiylik amaliyotlari uchun javobgar emasmiz. Siyosat yangilangach saytdan foydalanish davom etishi yangi shartlarga rozilik bildiradi.",
      ],
    },
    terms: {
      title: "Foydalanish shartlari",
      updated: "Oxirgi yangilanish: 2026-yil 19-may",
      paragraphs: [
        "soohowcentralasia.com saytidan foydalanish va OOO FALCON TRADE LINES xizmatlaridan foydalanish ushbu Foydalanish shartlariga roziligingizni anglatadi. Rozi bo‘lmasangiz, saytdan foydalanmang.",
        "Saytdagi mahsulot tavsiflari, texnik xususiyatlar, rasmlar va narxlar umumiy ma’lumot uchun berilgan bo‘lib, oldindan xabar berilmasdan o‘zgarishi mumkin. Yetkazib berishning yakuniy shartlari yozma taklif, shartnoma yoki hisob-fakturada tasdiqlanadi.",
        "Aloqa va narx so‘rovi formalarida to‘g‘ri ma’lumot taqdim etishingiz shart. Yolg‘on, chalg‘ituvchi yoki noqonuniy murojaatlar rad etilishi yoki bekor qilinishi mumkin.",
        "Saytdagi barcha kontent — matn, logotip, grafika va dizayn — OOO FALCON TRADE LINES yoki litsenziarlar mulki hisoblanadi va yozma ruxsatsiz ko‘chirilmasligi kerak.",
        "Qonun ruxsat bergan darajada OOO FALCON TRADE LINES saytdan foydalanish yoki undagi ma’lumotlarga tayanish natijasida yuzaga keladigan bilvosita zararlar uchun javobgar emas. Yetkazilgan mahsulotlar bo‘yicha javobgarlik shartnoma va kafolat shartlariga muvofiq belgilanadi.",
        "Ushbu shartlar O‘zbekiston Respublikasi qonunchiligiga bo‘ysunadi. Shartlar istalgan vaqtda yangilanishi mumkin; amaldagi versiya doim shu sahifada e’lon qilinadi.",
      ],
    },
  },
  search: {
    placeholder: "Uskuna nomi yoki model bo'yicha qidiring...",
    noResults: "Mahsulot topilmadi",
    tryDifferent: "Boshqa so'z bilan qidirib ko'ring",
  },
  stats: {
    products: "Ro'yxatdagi mahsulotlar",
    clients: "Xizmat ko'rsatilgan mijozlar",
    partners: "Hamkor brendlar",
    years: "Faol yillar",
    reagents: "OEM ehtiyot qismlar",
  },
  badges: { bestseller: "ENG KO'P SOTILGAN", new: "YANGI" },
  about: {
    title: "ILG'OR LABORATORIYA TEXNOLOGIYALARI",
    subtitle: "Har bir o'lchovda ishonch. Markaziy Osiyoning eng talabchan sanoatlarida hamkorlik.",
    p1: "Kunshan Soohow Instrument Technology Co., Ltd. milliy yuqori texnologiyali korxona bo'lib, asosan laboratoriya uskunalari, optik tahlil uskunalari va ularning dasturiy ta'minotini tadqiq qilish, ishlab chiqish, ishlab chiqarish va sotish bilan shug'ullanadi. 2012-yilda tashkil etilgan Soohow Instrument qariyb 12 300 kvadrat metr qurilish maydoniga ega sanoatlashtirish binosiga, qariyb 3 000 kvadrat metrlik tadqiqot va ishlanmalar markaziga va aqlli ishlab chiqarish ustaxonasiga ega.",
    p2: "Tashkil etilganidan buyon Soohow Instrument doimo texnologik innovatsiyalarga sodiq qoldi va ketma-ket ISO 9001 sifat menejmenti tizimi, ISO 14001 atrof-muhitni boshqarish tizimi, ISO 45001 mehnatni muhofaza qilish va xavfsizlikni boshqarish tizimi hamda GJB9001C-2017 qurol-yarog' uskunalarini sifatini boshqarish tizimi sertifikatlaridan o'tdi.",
    achievementsTitle: "KORPORATIV YUTUQLAR",
    achievements: [
      "Milliy yuqori texnologiyali korxona",
      "Jiangsu provinsiyasi ixtisoslashgan va innovatsion kichik va o'rta korxona",
      "Suzhou atom emissiya spektrometri muhandislik texnologiyalari markazi",
      "Suzhou Gazelle Enterprise",
      "Kunshan ixtisoslashgan va innovatsion kichik va o'rta korxona",
      "Kunshan innovatsiya va tadbirkorlik iste'dodli korxonasi",
      "Kunshan R&D muassasasi",
    ],
    statCards: [
      { value: "74", label: "Intellektual mulk" },
      { value: "15", label: "Ixtiro patentlari" },
    ],
    facilityCard: {
      imageAlt: "Soohow Instrument ishlab chiqarish va R&D obyekti",
      stats: [
        { value: "2012", label: "Tashkil etilgan" },
        { value: "3000m²", label: "R&D markazi" },
      ],
    },
    timelineTitle: "SANOAT TIMELINE",
    milestones: [
      {
        year: "2012",
        title: "Kompaniya tashkil etildi",
        desc: "27-martda Kunshan Soohow Instrument Technology Co., Ltd. Qiandeng shahri, Zhipu yo'lida ro'yxatdan o'tkazildi. Uchqun to'g'ridan-to'g'ri o'qish spektrometri AES998 muvaffaqiyatli ishlab chiqildi.",
      },
      {
        year: "2013",
        title: "Ko'chish va sanoatlashtirish",
        desc: "Kompaniya rivojlanishi sababli Qiandeng shahri, Shipu Fengshou North Road manziliga ko'chirildi. AES998 yiliga 30 dona sotish hajmi bilan sanoatlashtirildi.",
      },
      {
        year: "2014",
        title: "HCD1000 yutuqi",
        desc: "Bo'sh katodli spektrometr HCD1000 muvaffaqiyatli ishlab chiqildi va maxsus po'lat hamda aerokosmik korxonalar tomonidan tan olindi. Moy spektrometri tadqiqoti boshlandi.",
      },
      {
        year: "2015",
        title: "Yirik shartnomalar va FS500",
        desc: "Baoshan Iron & Steel Co., Ltd. uchun malakali yetkazib beruvchi bo'ldi va birinchi HCD1000 shartnomasi imzolandi. To'liq spektrli FS500 ishlab chiqildi. Jiangsu First Set va Standard Leading Project mukofotlari qo'lga kiritildi.",
      },
      {
        year: "2016",
        title: "Ommaviy ishlab chiqarish",
        desc: "50 dona FS500 va Airline Beijing 621 Institute bilan ikkinchi HCD1000 uchun xarid-sotish shartnomalari imzolandi.",
      },
      {
        year: "2017",
        title: "Sertifikatlar va OIL8000",
        desc: "HCD1000 Jiangsu viloyatidagi yirik uskunalar sertifikati va sanoat transformatsiyasi grantini oldi. Moy spektrometri OIL8000 Jiangsu sanoat modernizatsiyasi dasturini qo'llab-quvvatladi.",
      },
      {
        year: "2018",
        title: "Sanoat sektori",
        desc: "Sanoat o'lchov uskunalari sektoriga kengayish.",
      },
      {
        year: "2019",
        title: "Yevropa hamkorliklari",
        desc: "Yevropa uskunalar ishlab chiqaruvchilari bilan to'g'ridan-to'g'ri hamkorlik o'rnatildi.",
      },
      {
        year: "2020",
        title: "Neft va gaz bo'limi",
        desc: "Neft va gaz uskunalari tarmog'i ishga tushirildi.",
      },
      {
        year: "2022",
        title: "200+ mijozlar",
        desc: "Markaziy Osiyo bo'ylab 200+ korporativ mijozlarga erishildi.",
      },
      {
        year: "2024",
        title: "500+ katalog",
        desc: "15+ sertifikatlangan brendlar bilan 500+ mahsulot katalogi shakllantirildi.",
      },
    ],
    certsTitle: "Eng yuqori standartlar bo'yicha sertifikatlangan",
  },
  aboutTeam: {
    badge: "Bizning ekspertlar jamoasi",
    title: "Texnologik yetakchiligimizning asosi",
    imageAlt: "Soohow Instrument ekspertlar jamoasi",
    graduateTitle: "100% bitiruvchi",
    graduateDesc:
      "Mahsulotni ishlab chiqishda xatolarga yo'l qo'ymaslik uchun texnik echimlar va tafsilotlar uchun mas'ul bo'lgan, o'n yillik professional tajribaga ega raqamli sanoat texnik maslahatchisini yolladik.",
    p1: "Soohow Instrumentning R&D xodimlari 100% bakalavr yoki undan yuqori darajaga ega, jumladan 1 PhD, 2 magistr, 3 katta muhandis, 10 o'rta darajali muhandis va 14 yordamchi muhandis. Asosiy jamoa a'zolari spektrometr texnologiyasini tadqiq qilish va ishlab chiqishda taxminan 10 yillik tajribaga ega. Jamoamiz tuzilishi professional to'ldiruvchanlik, aniq mehnat taqsimoti va qat'iy intizomni ta'minlaydi.",
    p2: "O'n ikki yillik barqaror rivojlanish va bag'ishlangan tadqiqotlar orqali biz yuqori darajadagi spektrometriyalar dizayni, ishlab chiqarilishi va integratsiyasi bo'yicha boy tajriba to'pladik. Bizning texnologiyamiz va ishlab chiqarish jarayonimiz xalqaro yetakchi darajaga yetdi.",
    stats: [
      { value: "1", label: "PhD" },
      { value: "2", label: "Magistrlar" },
      { value: "3", label: "Katta muhandislar" },
      { value: "10", label: "O'rta muhandislar" },
    ],
  },
  productsPage: {
    title: "SANoat USKUNALARI",
    subtitle: "Talabchan sanoat va laboratoriya muhiti uchun aniq o'lchov va analitik uskunalar.",
    filterAll: "Barchasi",
    catIndustrial: "Sanoat o'lchovi",
    catMetalSpectral: "Metallarning spektral tahlili",
    catOilLubricant: "Moy va moylash materiallari analizatorlari",
    catWear: "Eskirish analizatorlari",
    catFerrography: "Ferrografiya",
    catParticleCounter: "Zarracha hisoblagichlar",
    catMedical: "Tibbiy analizatorlar",
    catMetalSpectralShort: "Spektral metall",
    catOilLubricantShort: "Moy analizatorlari",
    catWearShort: "Eskirish",
    catFerrographyShort: "Ferrografiya",
    catParticleCounterShort: "Zarrachalar",
    catMedicalShort: "Tibbiy",
    filterCategoriesAria: "Mahsulot kategoriyalari",
    modelLabel: "Model",
  },
  productModal: {
    productsBreadcrumb: "Mahsulotlar",
    techSpecs: "Texnik xususiyatlar",
    pricingNote: "Narx va mavjudlik so'rov bo'yicha. Ulgurji chegirmalar mavjud.",
    getQuote: "Narx so'rash",
    share: "Ulashish",
    copyLink: "Mahsulot havolasini nusxalash",
    linkCopied: "Nusxa olindi",
    telegram: "Telegram",
    related: "O'xshash uskunalar",
  },
  contact: {
    title: "BOG'LANISH",
    subtitle: "Obyektingizni ta'minlashga tayyormiz. Har qanday kanal orqali yoki qayta qo'ng'iroq so'rang.",
    headquarters: "Bosh ofis",
    address:
      "O'zbekiston Respublikasi, Toshkent shahri, Yakkasaroy tumani, Damaryk mahallasi, Kichik Beshyagach ko'chasi, 72-uy",
    city: "",
    directLines: "To'g'ridan-to'g'ri liniyalar",
    phone: "+998 77 744 40 48",
    email: "Email",
    emailAddress: "info@soohowcentralasia.com",
    workingHours: "Ish vaqti",
    hoursWeek: "Dush–Jum: 09:00–18:00",
    hoursSat: "Shan: 09:00–14:00, Yak: Dam olish",
    mapCoords: "TOSHKENT · 41.283848, 69.265665",
    mapTitle: "Ofis joylashuvi xaritada",
    mapOpenLink: "Google Xaritada ochish",
    faqTitle: "KO'P BERILADIGAN SAVOLLAR",
    formName: "Ism *",
    formPhone: "Telefon *",
    formEmail: "Email",
    formMessage: "Xabaringiz *",
    sendMessage: "Xabar yuborish",
    messageSent: "Xabar yuborildi",
    messageSentDesc: "So'rovingiz qabul qilindi. Tez orada javob beramiz.",
    sendFailed: "Yuborish muvaffaqiyatsiz.",
    subjects: ["Umumiy so'rov", "Narx so'rovi", "Texnik yordam", "Hamkorlik"],
    faqs: [
      { q: "Mahsulot sertifikatlari va ma'lumot varaqlarini berasizmi?", a: "Ha. Barcha uskunalar ishlab chiqaruvchi sertifikatlari, kalibrlash yozuvlari va to'liq texnik hujjatlar bilan keladi (o'zbek, rus yoki ingliz tilida)." },
      { q: "Original OEM ehtiyot qismlarini yetkazasizmi?", a: "Ha. Spektrometr va analizatorlar uchun ishlab chiqaruvchining original qismlarini to'liq hujjatlar bilan ta'minlaymiz." },
      { q: "Toshkentdan tashqariga yetkazasizmi?", a: "O'zbekistonning barcha hududlariga va Qozog'iston, Qirg'iziston, Tojikistonga eksport qilamiz." },
      { q: "Kalibrlash va servis siyosatingiz qanday?", a: "Barcha uskunalar uchun joyida kalibrlash, o'rnatish nazorati va kafolat xizmati. Operatorlar uchun o'qitish ham kiritilgan." },
      { q: "Narx taklifini qanchalik tez olsam bo'ladi?", a: "Sayt yoki Telegram orqali so'rov yuboring — ish vaqtida 30 daqiqa ichida javob beramiz." },
    ],
  },
  quote: {
    title: "Narx so'rash",
    subtitle: "Formani to'ldiring — ish vaqtida mutaxassislarimiz 30 daqiqa ichida bog'lanadi.",
    received: "So'rov qabul qilindi",
    receivedDesc: "Qiziqishingiz uchun rahmat. Mutaxassis tez orada siz bilan bog'lanadi.",
    close: "Oynani yopish",
    sendFailed: "Yuborish muvaffaqiyatsiz. Qayta urinib ko'ring yoki email orqali yozing.",
    selectedProduct: "Tanlangan mahsulot",
    fullName: "To'liq ism *",
    phone: "Telefon *",
    company: "Kompaniya / Tashkilot *",
    email: "Email manzil",
    interestedProduct: "Qiziqtirgan mahsulot / Kategoriya",
    quantity: "Kerakli miqdor",
    requirements: "Maxsus talablar",
    send: "So'rov yuborish →",
    placeholders: {
      name: "Ism Familiya",
      phone: "+998 90 123 45 67",
      company: "Kompaniya nomi",
      email: "email@example.com",
      product: "masalan, Ultratovushli oqim o'lchagichlar",
      quantity: "1",
      message: "Texnik talablar, sertifikatlar yoki yetkazib berish muddati?",
    },
  },
  phoneCountries: {
    select: "Davlatni tanlang",
    uz: "O'zbekiston",
    kz: "Qozog'iston",
    kg: "Qirg'iziston",
    tj: "Tojikiston",
    tm: "Turkmaniston",
  },
  validation: {
    nameRequired: "Ism talab qilinadi",
    phoneRequired: "Telefon talab qilinadi",
    emailInvalid: "Noto'g'ri email",
    messageRequired: "Xabar talab qilinadi",
    nameMin: "Ism talab qilinadi",
    phoneMin: "To'g'ri telefon raqam kiriting",
    companyMin: "Kompaniya nomi talab qilinadi",
  },
  searchExt: {
    popularCategories: "Mashhur kategoriyalar",
    resultsFound: "NATIJA TOPILDI",
    tryTypos: "Imlo xatosini tekshiring yoki umumiyroq so'z bilan qidiring.",
    tags: ["OES spektrometr", "Moy analizatori", "Metall tahlili", "RDE-OES", "Oltin analizatori", "GD-OES"],
  },
  certificates: {
    badge: "Boshqaruv tizimlari",
    tag: "04",
    title: "BOSHQARUV TIZIMLARINING\nXALQARO TAN OLINISHI",
    lead:
      "Dunyo sifat standartlari va samarali boshqaruv tizimlariga muvofiqlik — mustaqil sertifikatlash bilan tasdiqlangan.",
    sublead:
      "Kunshan Soohow Instrument uchun rasmiy ISO sertifikatlari IT xizmatlari, axborot xavfsizligi va sifat menejmenti bo'yicha auditdan o'tgan jarayonlarni ko'rsatadi.",
    company: "Kunshan Soohow Instrument Co., Ltd.",
    galleryLabel: "Sertifikatlangan boshqaruv tizimlari",
    viewAll: "Sertifikatlarni ko'rish",
    enlarge: "A4",
    hint: "To'liq A4 hujjat uchun sertifikatni bosing.",
    autoRotate: "Har 10 soniyada almashadi · to'xtatish uchun sichqonchani ushlab turing",
    prev: "Oldingi sertifikatlar",
    next: "Keyingi sertifikatlar",
    slide: "Slayd",
    certificateAlt: "Sertifikat",
    standards: [
      "ISO/IEC 20000-1",
      "ISO/IEC 27001",
      "ISO 9001",
      "ISO 14001",
      "ISO 45001",
      "GJB9001C",
    ],
    items: [
      {
        standard: "ITSM",
        title: "ISO/IEC 20000-1:2018",
        subtitle: "IT xizmatlarini boshqarish tizimi",
      },
      {
        standard: "ISMS",
        title: "ISO/IEC 27001:2022",
        subtitle: "Axborot xavfsizligi boshqaruvi",
      },
      {
        standard: "EMS",
        title: "ISO 14001:2015",
        subtitle: "Atrof-muhitni boshqarish tizimi",
      },
      {
        standard: "QMS",
        title: "ISO 9001:2015",
        subtitle: "Sifat menejmenti tizimi",
      },
      {
        standard: "OHS",
        title: "ISO 45001:2018",
        subtitle: "Mehnat xavfsizligi va salomatligi",
      },
      {
        standard: "GJB",
        title: "GJB9001C-2017",
        subtitle: "Harbiy uskunalar sifatini boshqarish",
      },
      {
        standard: "CNAS",
        title: "CNAS akkreditatsiyasi",
        subtitle: "Laboratoriya va sinov kompetensiyasi",
      },
      {
        standard: "CE",
        title: "CE muvofiqlik",
        subtitle: "Mahsulot xavfsizligi va me'yoriy talablar",
      },
      {
        standard: "IP",
        title: "Intellektual mulk",
        subtitle: "Patentlar va o'zlashtirilgan texnologiyalar",
      },
      {
        standard: "HTE",
        title: "Yuqori texnologiyali korxona",
        subtitle: "Milliy innovatsiya tan olinishi",
      },
    ],
  },
  whyChooseImages: {
    alt1: "ISO/IEC 20000-1 sertifikati — Kunshan Soohow Instrument",
    alt2: "ISO/IEC 27001 sertifikati — Kunshan Soohow Instrument",
    alt3: "ISO 14001 sertifikati — Kunshan Soohow Instrument",
  },
};

const ru: TranslationTree = {
  nav: {
    home: "ГЛАВНАЯ",
    about: "О НАС",
    products: "ПРОДУКТЫ",
    contact: "КОНТАКТЫ",
  },
  common: {
    requestQuote: "Запросить цену",
    search: "Поиск",
    toggleTheme: "Сменить тему",
    selectLanguage: "Выбрать язык",
    exploreInstruments: "Смотреть приборы",
    aboutUs: "О нас →",
    getPrice: "Узнать цену",
    request: "Запрос",
    featuredInstrument: "Рекомендуемый прибор",
    featuredProduct: "FS500 CCD спектрометр оптической эмиссии",
  },
  intro: {
    clickHint: "Нажмите левую кнопку мыши",
  },
  hero: {
    badge: "Официальный дилер в Центральной Азии",
    title1: "ТОЧНОСТЬ",
    title2: "КАЧЕСТВА",
    title3: "ИННОВАЦИИ",
    description:
      "OOO FALCON TRADE LINES поставляет промышленные измерительные приборы и аналитическое оборудование для лабораторий и производственных предприятий Центральной Азии.",
    primaryCta: "Каталог",
    scrollDown: "Листайте вниз",
    statProducts: "40+ продуктов",
    statClients: "200+ клиентов",
    statYears: "10+ лет",
  },
  homeIntro: {
    badge: "Наши услуги",
    title: "OOO FALCON TRADE LINES ВАШ НАДЕЖНЫЙ ПАРТНЕР",
    lead:
      "Как официальный партнёр KUNSHAN SOOHOW INSTRUMENT TECHNOLOGY CO., LTD. в Центральной Азии мы поставляем оборудование для спектрального анализа металлов, анализаторы масел и смазочных материалов, анализаторы износа, феррографию, счётчики частиц и медицинские анализаторы. Выбирайте в каталоге по категориям, запрашивайте цену на сайте, пользуйтесь гарантийным сервисом, оригинальными запчастями OEM и консультацией инженеров.",
    pillars: [
      {
        title: "Официальный партнёр SOOHOW",
        description:
          "OOO FALCON TRADE LINES — уполномоченный представитель Kunshan Soohow Instrument в Центральной Азии: спектральный анализ металлов, анализ масел и смазок, диагностика износа и феррография, счётчики частиц и медицинские анализаторы — качество по ISO.",
      },
      {
        title: "Оборудование и решения",
        description:
          "В каталоге 40+ приборов в шести категориях: спектральный анализ металлов, анализаторы масел и смазочных материалов, анализаторы износа, феррография, счётчики частиц и медицинские анализаторы. Запросите цену на сайте или получите подбор конфигурации от наших инженеров.",
      },
      {
        title: "Сервис и поддержка",
        description:
          "Гарантийный и послегарантийный ремонт, оригинальные запчасти OEM, калибровка и технические консультации. Свяжитесь по телефону, email или через форму — отвечаем в рабочее время.",
      },
    ],
    ctaAbout: "О нас",
    ctaProducts: "Каталог",
  },
  equipmentPromo: {
    badge: "Новое оборудование",
    cta: "Смотреть в каталоге",
    prev: "Предыдущий слайд",
    next: "Следующий слайд",
  },
  scientific: {
    title: "НАУЧНЫЙ ПОТЕНЦИАЛ",
    tag: "02",
    badge: "Технологические активы",
    lead:
      "Современные разработки, экспертные знания и внедрение инновационных решений — подтверждены патентами, ПО и проектами национального уровня.",
    cardTitle: "Многолетний опыт в промышленности",
    overlayTitle: "ТЕХНОЛОГИЧЕСКИЕ АКТИВЫ",
    overlaySubtitle: "Сертифицированное качество",
    metrics: [
      { value: "15", label: "Патентов на изобретения" },
      { value: "18", label: "Авторских прав на ПО" },
      { value: "7", label: "Программных продуктов" },
      { value: "4", label: "Ведущих продукта" },
    ],
    items: [
      "15 патентов на изобретения",
      "18 авторских прав на ПО",
      "7 программных продуктов",
      "1 проект национального и международного уровня",
      "4 ведущих локальных продукта",
    ],
    imageAlt: "Команда SOOHOW на международной выставке",
  },
  industrial: {
    badge: "ПРОИЗВОДСТВО",
    eyebrow: "Масштаб · автоматизация · контроль",
    title: "Умный производственный комплекс",
    titleSub: "Автоматизированные линии приборов",
    intro:
      "Площадка 12 300 м² объединяет автоматизированные линии сборки спектрометров и аналитических комплексов, участки оптической метрологии и ISO-лаборатории входного, межоперационного и финального контроля. Выпускаем OES/GD-OES, анализаторы масел и износа, феррографию, счётчики частиц и лабораторное оборудование — свыше 2000 приборов в год.",
    statValue: "2000+",
    statUnit: "приборов / год",
    statCaption: "Годовая мощность",
    statNote: "Спектрометры, анализаторы масел и специализированные лабораторные системы по процессам ISO.",
    highlights: ["12 300 м² площадь", "Умный цех", "Полный контроль качества"],
    cards: [
      {
        tag: "Основная линия",
        title: "Сборка спектрометров",
        description:
          "Высокоточные линии для атомно-эмиссионных и оптико-эмиссионных аналитических систем.",
      },
      {
        tag: "Метрология",
        title: "Оптическая калибровка",
        description:
          "Темные комнаты и стенды юстировки для стабильной работы датчиков.",
      },
      {
        tag: "Качество",
        title: "Лаборатории ISO",
        description:
          "Входной, межоперационный и финальный контроль на каждом этапе производства.",
      },
      {
        tag: "Масла",
        title: "Комплект анализа масел",
        description:
          "Портативная вискозиметрия, температура вспышки и диэлектрическая прочность.",
      },
      {
        tag: "Цифровая лаборатория",
        title: "Smart-комплекс анализа масел",
        description:
          "Анализ влажности частиц, модули Smart Lu и интегрированное ПО отчётности.",
      },
      {
        tag: "Биоанализ",
        title: "Анализаторы белка",
        description:
          "Полностью и полуавтоматические системы для пищевой, кормовой и научной отрасли.",
      },
    ],
  },
  warranty: {
    badge: "Техническая поддержка",
    title: "Гарантийное и сервисное обслуживание",
    paragraph1:
      "Мы обеспечиваем полный цикл технической поддержки оборудования — от гарантийного ремонта до профессионального сервисного обслуживания. Используем только оригинальные сертифицированные запчасти (OEM), что гарантирует надежность, безопасность и долгий срок службы техники.",
    paragraph2:
      "Наша команда квалифицированных инженеров проводит точную диагностику, модернизацию и техническое обслуживание с использованием современного специализированного оборудования. Мы помогаем поддерживать стабильную и бесперебойную работу вашей техники на каждом этапе эксплуатации.",
    highlights: [
      "Гарантийный и послегарантийный ремонт",
      "Оригинальные запчасти OEM",
      "Диагностика, модернизация и ТО",
    ],
  },
  partners: {
    badge: "Доверие лидеров",
    title: "НАШИ ПАРТНЁРЫ",
    names: [
      "CNOOC",
      "XCMG",
      "STATE GRID",
      "LOVOL",
      "Deli",
      "SINOPEC",
      "CNPC",
      "PetroChina",
      "CSCEC",
      "CRRC",
      "Haier",
      "Midea",
      "Huawei",
      "BYD",
    ],
  },
  news: {
    badge: "Отраслевые новости",
    title: "ПОСЛЕДНИЕ НОВОСТИ",
    subtitle: "Новости из мира точности и инноваций",
    readMore: "Подробнее",
    items: [
      {
        category: "Международные",
        date: "2026.03.19",
        title:
          "Клиент из Великобритании доктор Гибелер посетил Soohow Instrument для детального обзора анализаторов масел",
        imageAlt: "Доктор Гибелер осматривает анализаторы масел Soohow",
      },
      {
        category: "Визит клиента",
        date: "2026.02.14",
        title:
          "Индийский клиент посетил Soohow Instruments, анализатор золота AU8000 получил признание на месте",
        imageAlt: "Индийский клиент с анализатором золота AU8000 в Soohow",
      },
      {
        category: "События",
        date: "2026.01.08",
        title:
          "Вице-мэр Куньшаня Ю Цяньчи посетил Soohow Instrument для инспекции и руководства",
        imageAlt: "Вице-мэр Куньшаня Ю Цяньчи в Soohow Instrument",
      },
    ],
  },
  whyChoose: {
    title: "ЧЕТЫРЕ ПРИЧИНЫ ВЫБРАТЬ\nНАС",
    badge: "Преимущества",
    lead: "Четыре ключевых преимущества SOOHOW Central Asia.",
    readMore: "Подробнее",
    years: "10+ ЛЕТ",
    excellence: "Сертифицированное качество",
    openCertificate: "Открыть сертификат в полном размере",
    closeLightbox: "Закрыть",
    pillars: [
      {
        tag: "01",
        chip: "OEM · Сервис",
        title: "Официальный дилер и авторизованный сервис",
        teaser:
          "Оригинальные поставки OEM, сертифицированные инженеры и сервис с заводской гарантией в Центральной Азии.",
        description:
          "Гарантия оригинальной продукции и квалифицированного обслуживания — от поставки и пусконаладки до гарантийной поддержки по стандартам завода.",
        highlights: [
          "Авторизованный партнёр SOOHOW в Центральной Азии",
          "Сертифицированные инженеры и запчасти OEM",
          "Монтаж, обучение и послепродажный сервис",
        ],
      },
      {
        tag: "02",
        chip: "НИОКР · Лаборатория",
        title: "Научный потенциал",
        teaser: "НИОКР, спектрометрия и инновационные решения для лабораторий.",
        description:
          "Современные разработки, экспертные знания и внедрение инновационных решений для анализа металлов, диагностики масел и лабораторных процессов.",
        highlights: [
          "Разработка методик и прикладные консультации",
          "Спектрометрия и аналитическая экспертиза",
          "Постоянные инновации от R&D Soohow",
        ],
      },
      {
        tag: "03",
        chip: "Умный комплекс",
        title: "Умный производственный комплекс",
        teaser: "Автоматизированные линии приборов, оптическая метрология и ISO-контроль качества.",
        description:
          "Площадка 12 300 м² — автоматизированная сборка спектрометров и анализаторов, оптическая метрология и ISO-лаборатории полного цикла; свыше 2000 приборов в год.",
        highlights: [
          "Автоматизированные линии и контроль процессов",
          "Оптическая метрология и лаборатории качества",
          "Стабильные объёмы для мировых поставок",
        ],
      },
      {
        tag: "04",
        chip: "ISO · Мир",
        title: "Международное признание систем управления",
        teaser: "Системы менеджмента ISO с независимым международным аудитом.",
        description:
          "Соответствие мировым стандартам качества и эффективности управления — независимо аудированные системы, защищающие ваши инвестиции и данные.",
        highlights: [
          "ISO 9001 — менеджмент качества",
          "ISO/IEC 27001 — информационная безопасность",
          "ISO/IEC 20000-1 — управление IT-услугами",
        ],
      },
    ],
  },
  pillarShowcase: {
    trustNote0:
      "Оригинальные поставки OEM, заводская гарантия и сертифицированные инженеры — один партнёр на весь жизненный цикл оборудования в Центральной Азии.",
    trustNote1:
      "Патенты, программные продукты и прикладные НИОКР — аналитическая экспертиза для вашей лаборатории и производства.",
    trustNote2:
      "Автоматизированные линии и лаборатории качества ISO — стабильные объёмы для мировых поставок.",
    ctaContact: "Связаться с нами",
    ctaQuote: "Запросить цену",
  },
  footer: {
    tagline:
      "Ведущий поставщик промышленных измерительных приборов и аналитического оборудования в Центральной Азии. Точность, которой можно доверять.",
    navigation: "Навигация",
    categories: "Категории",
    contactUs: "Связаться с нами",
    home: "Главная",
    about: "О нас",
    products: "Продукты",
    contact: "Контакты",
    privacy: "Политика конфиденциальности",
    terms: "Условия использования",
    rights: "Все права защищены.",
    hours: "Пн–Пт: 09:00–18:00",
  },
  legal: {
    backHome: "На главную",
    privacy: {
      title: "Политика конфиденциальности",
      updated: "Последнее обновление: 19 мая 2026 г.",
      paragraphs: [
        "OOO FALCON TRADE LINES («мы») уважает вашу конфиденциальность. Настоящая политика объясняет, как мы собираем, используем и защищаем персональные данные при посещении soohowcentralasia.com или обращении через формы, email и телефон.",
        "При запросе коммерческого предложения или обращении мы можем получить имя, компанию, телефон, email, интерес к продукции и текст сообщения. Для работы и безопасности сайта также могут собираться IP-адрес, тип браузера и cookie.",
        "Данные используются для ответов на запросы, подготовки предложений, поставки продукции и услуг, улучшения сайта и соблюдения законодательства. Мы не продаём персональные данные третьим лицам.",
        "Информация может передаваться доверенным поставщикам услуг (хостинг, обмен сообщениями, логистика) в объёме, необходимом для деятельности компании, а также государственным органам по требованию закона. Применяются разумные меры защиты данных.",
        "Вы можете запросить доступ, исправление или удаление данных, связавшись с нами: info@soohowcentralasia.com. Данные хранятся только в течение срока, необходимого для указанных целей.",
        "Сайт может содержать ссылки на сторонние ресурсы; мы не отвечаем за их политику конфиденциальности. Продолжение использования сайта после обновления политики означает согласие с новой редакцией.",
      ],
    },
    terms: {
      title: "Условия использования",
      updated: "Последнее обновление: 19 мая 2026 г.",
      paragraphs: [
        "Используя soohowcentralasia.com и услуги OOO FALCON TRADE LINES, вы соглашаетесь с настоящими Условиями. Если вы не согласны, пожалуйста, не используйте сайт.",
        "Описания продукции, характеристики, изображения и цены носят информационный характер и могут изменяться без предварительного уведомления. Окончательные условия поставки подтверждаются в письменном предложении, договоре или счёте.",
        "Вы обязуетесь предоставлять достоверные данные в формах обратной связи и запроса цен. Мы вправе отклонить обращения с ложной, вводящей в заблуждение или незаконной информацией.",
        "Весь контент сайта — тексты, логотипы, графика и оформление — принадлежит OOO FALCON TRADE LINES или правообладателям и не может копироваться без письменного разрешения.",
        "В пределах, допускаемых законом, OOO FALCON TRADE LINES не несёт ответственности за косвенные убытки, возникшие при использовании сайта или доверии к его содержанию. Ответственность за поставленную продукцию определяется договором и гарантийными условиями.",
        "Настоящие условия регулируются законодательством Республики Узбекистан. Условия могут обновляться; актуальная версия всегда публикуется на этой странице.",
      ],
    },
  },
  search: {
    placeholder: "Поиск по названию или модели...",
    noResults: "Продукты не найдены",
    tryDifferent: "Попробуйте другой запрос",
  },
  stats: {
    products: "Продуктов в каталоге",
    clients: "Обслуженных клиентов",
    partners: "Брендов-партнёров",
    years: "Лет на рынке",
    reagents: "Оригинальные запчасти OEM",
  },
  badges: { bestseller: "ХИТ ПРОДАЖ", new: "НОВИНКА" },
  about: {
    title: "ПЕРЕДОВЫЕ ЛАБОРАТОРНЫЕ ТЕХНОЛОГИИ",
    subtitle: "Доверие в каждом измерении. Партнёрство с самыми требовательными отраслями Центральной Азии.",
    p1: "Kunshan Soohow Instrument Technology Co., Ltd. — национальное высокотехнологичное предприятие, занимающееся исследованиями, разработкой, производством и продажей лабораторных и оптико-аналитических приборов и программного обеспечения. Основанная в 2012 году, компания располагает производственной площадью около 12 300 м², центром НИОКР около 3 000 м² и цехом интеллектуального производства.",
    p2: "С момента основания Soohow Instrument неизменно следует курсу технологических инноваций и последовательно прошла сертификацию по ISO 9001, ISO 14001, ISO 45001 и GJB9001C-2017 (система управления качеством военной техники).",
    achievementsTitle: "КОРПОРАТИВНЫЕ ДОСТИЖЕНИЯ",
    achievements: [
      "Национальное высокотехнологичное предприятие",
      "Специализированное инновационное МСП провинции Цзянсу",
      "Инженерный центр атомно-эмиссионной спектрометрии Сучжоу",
      "Suzhou Gazelle Enterprise",
      "Специализированное инновационное МСП города Куньшань",
      "Предприятие инноваций и предпринимательства Куньшань",
      "НИОКР-учреждение Куньшань",
    ],
    statCards: [
      { value: "74", label: "Интеллектуальная собственность" },
      { value: "15", label: "Патентов на изобретения" },
    ],
    facilityCard: {
      imageAlt: "Производственный и НИОКР-комплекс Soohow Instrument",
      stats: [
        { value: "2012", label: "Год основания" },
        { value: "3000м²", label: "Центр НИОКР" },
      ],
    },
    timelineTitle: "ПРОМЫШЛЕННАЯ ХРОНОЛОГИЯ",
    milestones: [
      {
        year: "2012",
        title: "Основание компании",
        desc: "27 марта Kunshan Soohow Instrument Technology Co., Ltd. зарегистрирована на ул. Zhipu, г. Цяньдэн. Успешно разработан искровой спектрометр прямого чтения AES998.",
      },
      {
        year: "2013",
        title: "Переезд и индустриализация",
        desc: "Переезд на Shipu Fengshou North Road, г. Цяньдэн. AES998 вышел на промышленное производство с годовым объёмом продаж 30 единиц.",
      },
      {
        year: "2014",
        title: "Прорыв HCD1000",
        desc: "Разработан спектрометр с полым катодом HCD1000, признанный предприятиями спецстали и аэрокосмической отрасли. Начаты НИОКР масляного спектрометра.",
      },
      {
        year: "2015",
        title: "Крупные контракты и FS500",
        desc: "Статус поставщика Baoshan Iron & Steel Co., Ltd. и первый контракт на HCD1000. Разработан спектрометр FS500 полного спектра. Награды Jiangsu First Set и Standard Leading Project.",
      },
      {
        year: "2016",
        title: "Масштабное производство",
        desc: "Контракт на 50 единиц FS500 и второй контракт HCD1000 с Airline Beijing 621 Institute.",
      },
      {
        year: "2017",
        title: "Сертификация и OIL8000",
        desc: "HCD1000 получил сертификацию крупного оборудования провинции Цзянсу и грант трансформации. Масляный спектрометр OIL8000 поддержан программой модернизации промышленности.",
      },
      {
        year: "2018",
        title: "Промышленный сектор",
        desc: "Расширение в сектор промышленных измерительных приборов.",
      },
      {
        year: "2019",
        title: "Европейские партнёрства",
        desc: "Прямое партнёрство с ведущими европейскими производителями приборов.",
      },
      {
        year: "2020",
        title: "Нефтегазовое направление",
        desc: "Запущена сеть приборов для нефтегазовой отрасли.",
      },
      {
        year: "2022",
        title: "200+ клиентов",
        desc: "Более 200 корпоративных клиентов по Центральной Азии.",
      },
      {
        year: "2024",
        title: "Каталог 500+",
        desc: "Каталог свыше 500 продуктов и 15+ сертифицированных брендов.",
      },
    ],
    certsTitle: "Сертифицированы по высшим стандартам",
  },
  aboutTeam: {
    badge: "Наша команда экспертов",
    title: "Основа нашего технологического лидерства",
    imageAlt: "Команда экспертов Soohow Instrument",
    graduateTitle: "100% с высшим образованием",
    graduateDesc:
      "Мы привлекли цифрового промышленного технического консультанта с десятилетним профессиональным опытом, ответственного за технические решения и детали, чтобы исключить ошибки при разработке продукции.",
    p1: "Сотрудники НИОКР Soohow Instrument на 100% имеют степень бакалавра и выше, включая 1 PhD, 2 магистра, 3 старших инженера, 10 инженеров среднего звена и 14 младших инженеров. Ключевые члены команды имеют около 10 лет опыта в исследованиях и разработке спектрометрических технологий. Структура команды обеспечивает профессиональную взаимодополняемость, чёткое разделение труда и строгую дисциплину.",
    p2: "За двенадцать лет устойчивого развития и целенаправленных исследований мы накопили богатый опыт в проектировании, производстве и интеграции спектрометров высокого класса. Наши технологии и производственные процессы достигли международного уровня.",
    stats: [
      { value: "1", label: "PhD" },
      { value: "2", label: "Магистра" },
      { value: "3", label: "Старших инженера" },
      { value: "10", label: "Инженеров среднего звена" },
    ],
  },
  productsPage: {
    title: "ПРОМЫШЛЕННЫЕ ПРИБОРЫ",
    subtitle: "Точные измерительные и аналитические приборы для сложных промышленных и лабораторных условий.",
    filterAll: "Все",
    catIndustrial: "Промышленные измерения",
    catMetalSpectral: "Спектральный анализ металлов",
    catOilLubricant: "Анализаторы масел и смазочных материалов",
    catWear: "Анализаторы износа",
    catFerrography: "Феррография",
    catParticleCounter: "Счетчики частиц",
    catMedical: "Медицинские анализаторы",
    catMetalSpectralShort: "Спектр. металлы",
    catOilLubricantShort: "Масла и смазки",
    catWearShort: "Износ",
    catFerrographyShort: "Феррография",
    catParticleCounterShort: "Счётчики частиц",
    catMedicalShort: "Медицинские",
    filterCategoriesAria: "Категории продукции",
    modelLabel: "Модель",
  },
  productModal: {
    productsBreadcrumb: "Продукты",
    techSpecs: "Технические характеристики",
    pricingNote: "Цена и наличие по запросу. Скидки на опт.",
    getQuote: "Запросить цену",
    share: "Поделиться",
    copyLink: "Копировать ссылку на продукт",
    linkCopied: "Скопировано",
    telegram: "Telegram",
    related: "Похожие приборы",
  },
  contact: {
    title: "СВЯЗАТЬСЯ С НАМИ",
    subtitle: "Готовы обеспечить ваш объект. Свяжитесь любым способом или закажите обратный звонок.",
    headquarters: "Головной офис",
    address:
      "Республика Узбекистан, г. Ташкент, Яккасарайский район, махалля Дамарык, ул. Малый Бешагач, дом 72",
    city: "",
    directLines: "Прямые линии",
    phone: "+998 77 744 40 48",
    email: "Email",
    emailAddress: "info@soohowcentralasia.com",
    workingHours: "Режим работы",
    hoursWeek: "Пн–Пт: 09:00–18:00",
    hoursSat: "Сб: 09:00–14:00, Вс: выходной",
    mapCoords: "ТАШКЕНТ · 41.283848, 69.265665",
    mapTitle: "Расположение офиса на карте",
    mapOpenLink: "Открыть в Google Maps",
    faqTitle: "ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ",
    formName: "Имя *",
    formPhone: "Телефон *",
    formEmail: "Email",
    formMessage: "Ваше сообщение *",
    sendMessage: "Отправить сообщение",
    messageSent: "Сообщение отправлено",
    messageSentDesc: "Мы получили ваш запрос и скоро ответим.",
    sendFailed: "Не удалось отправить.",
    subjects: ["Общий запрос", "Запрос цены", "Техподдержка", "Партнёрство"],
    faqs: [
      { q: "Предоставляете ли сертификаты и паспорта на продукцию?", a: "Да. Все приборы с сертификатами производителя, записями калибровки и полной документацией на узбекском, русском или английском." },
      { q: "Поставляете ли оригинальные запчасти OEM?", a: "Да. Обеспечиваем оригинальные детали производителя для спектрометров и анализаторов с полной документацией." },
      { q: "Доставляете ли за пределы Ташкента?", a: "По всему Узбекистану, а также в Казахстан, Кыргызстан и Таджикистан." },
      { q: "Какова политика калибровки и сервиса?", a: "Выездная калибровка, надзор за установкой и гарантийное обслуживание. Обучение операторов включено." },
      { q: "Как быстро получить коммерческое предложение?", a: "Отправьте запрос через сайт или Telegram — ответим в течение 30 минут в рабочее время." },
    ],
  },
  quote: {
    title: "Запросить цену",
    subtitle: "Заполните форму — специалисты свяжутся в течение 30 минут в рабочее время.",
    received: "Запрос получен",
    receivedDesc: "Спасибо за интерес. Специалист свяжется с вами в ближайшее время.",
    close: "Закрыть окно",
    sendFailed: "Не удалось отправить. Попробуйте снова или напишите на email.",
    selectedProduct: "Выбранный продукт",
    fullName: "Полное имя *",
    phone: "Телефон *",
    company: "Компания / Организация *",
    email: "Email адрес",
    interestedProduct: "Интересующий продукт / Категория",
    quantity: "Необходимое количество",
    requirements: "Особые требования",
    send: "Отправить запрос →",
    placeholders: {
      name: "Иван Иванов",
      phone: "+998 90 123 45 67",
      company: "Название компании",
      email: "email@example.com",
      product: "напр. ультразвуковые расходомеры",
      quantity: "1",
      message: "Технические требования, сертификаты или сроки поставки?",
    },
  },
  phoneCountries: {
    select: "Выберите страну",
    uz: "Узбекистан",
    kz: "Казахстан",
    kg: "Кыргызстан",
    tj: "Таджикистан",
    tm: "Туркменистан",
  },
  validation: {
    nameRequired: "Укажите имя",
    phoneRequired: "Укажите телефон",
    emailInvalid: "Некорректный email",
    messageRequired: "Укажите сообщение",
    nameMin: "Укажите имя",
    phoneMin: "Введите корректный номер",
    companyMin: "Укажите название компании",
  },
  searchExt: {
    popularCategories: "Популярные категории",
    resultsFound: "НАЙДЕНО РЕЗУЛЬТАТОВ",
    tryTypos: "Проверьте опечатки или используйте более общий запрос.",
    tags: ["OES-спектрометры", "Анализаторы масла", "Анализ металлов", "RDE-OES", "Анализаторы золота", "GD-OES"],
  },
  certificates: {
    badge: "Системы управления",
    tag: "04",
    title: "МЕЖДУНАРОДНОЕ ПРИЗНАНИЕ\nСИСТЕМ УПРАВЛЕНИЯ",
    lead:
      "Соответствие мировым стандартам качества и эффективности управления — подтверждено независимой сертификацией.",
    sublead:
      "Официальные сертификаты ISO Kunshan Soohow Instrument подтверждают прохождение аудита процессов в области IT-услуг, информационной безопасности и менеджмента качества.",
    company: "Kunshan Soohow Instrument Co., Ltd.",
    galleryLabel: "Сертифицированные системы управления",
    viewAll: "Смотреть сертификаты",
    enlarge: "A4",
    hint: "Нажмите на сертификат для просмотра документа в формате A4.",
    autoRotate: "Смена каждые 10 секунд · наведите курсор, чтобы остановить",
    prev: "Предыдущие сертификаты",
    next: "Следующие сертификаты",
    slide: "Слайд",
    certificateAlt: "Сертификат",
    standards: [
      "ISO/IEC 20000-1",
      "ISO/IEC 27001",
      "ISO 9001",
      "ISO 14001",
      "ISO 45001",
      "GJB9001C",
    ],
    items: [
      {
        standard: "ITSM",
        title: "ISO/IEC 20000-1:2018",
        subtitle: "Система управления IT-услугами",
      },
      {
        standard: "ISMS",
        title: "ISO/IEC 27001:2022",
        subtitle: "Система управления информационной безопасностью",
      },
      {
        standard: "EMS",
        title: "ISO 14001:2015",
        subtitle: "Система экологического менеджмента",
      },
      {
        standard: "QMS",
        title: "ISO 9001:2015",
        subtitle: "Система менеджмента качества",
      },
      {
        standard: "OHS",
        title: "ISO 45001:2018",
        subtitle: "Охрана труда и промышленная безопасность",
      },
      {
        standard: "GJB",
        title: "GJB9001C-2017",
        subtitle: "Качество военной техники",
      },
      {
        standard: "CNAS",
        title: "Аккредитация CNAS",
        subtitle: "Компетентность лабораторий и испытаний",
      },
      {
        standard: "CE",
        title: "Соответствие CE",
        subtitle: "Безопасность продукции и нормативы",
      },
      {
        standard: "IP",
        title: "Интеллектуальная собственность",
        subtitle: "Патенты и собственные технологии",
      },
      {
        standard: "HTE",
        title: "Высокотехнологичное предприятие",
        subtitle: "Государственное признание инноваций",
      },
    ],
  },
  whyChooseImages: {
    alt1: "Сертификат ISO/IEC 20000-1 — Kunshan Soohow Instrument",
    alt2: "Сертификат ISO/IEC 27001 — Kunshan Soohow Instrument",
    alt3: "Сертификат ISO 14001 — Kunshan Soohow Instrument",
  },
};

export const translations: Record<Locale, TranslationTree> = { en, uz, ru };
