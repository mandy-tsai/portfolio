const projectsBase = [
  {
    id: 'biggo-extension',
    year: '2023',
    thumbnail: '/img/biggo/biggo-extension-hero.webp',
    hero: '/img/biggo/biggo-extension-hero.webp',
    tags: ['ui', 'ux'],
    tools: ['Figma'],
    images: [
      '/img/biggo/simple-and-clear-ui.webp',
      '/img/biggo/search-functionality.webp',
      '/img/biggo/history-price.webp',
      '/img/biggo/similar-products.webp',
      '/img/biggo/wireframe-setup.webp',
    ],
  },
  {
    id: 'edreams',
    year: '2023',
    thumbnail: '/img/edreams/eDreamsHero.png',
    hero: '/img/edreams/eDreamsHero.png',
    tags: ['redesign', 'ui', 'ux', 'case study'],
    tools: ['Figma'],
    images: [
      '/img/edreams/ExplorationandAnalysis.png',
      '/img/edreams/CompetitiveAnalysis.png',
      '/img/edreams/Thought-process.png',
      '/img/edreams/Components.png',
      '/img/edreams/Solution.png',
    ],
  },
  {
    id: 'futura',
    year: '2023',
    thumbnail: '/img/futura/FuturaDigitalBanking.png',
    hero: '/img/futura/FuturaDigitalBanking.png',
    tags: ['ui', 'ux', 'case study'],
    tools: ['Figma'],
    images: [
      '/img/futura/Benchmarking-research.png',
      '/img/futura/EdgarPersona.png',
      '/img/futura/UserJourney.png',
      '/img/futura/Wireframe 1.png',
      '/img/futura/FuturaPrototype.png',
    ],
  },
  {
    id: 'biggo-design-system',
    year: '2023',
    thumbnail: '/img/design-system/portfolio_biggo-design-system-01.png',
    hero: '/img/design-system/portfolio_biggo-design-system-01.png',
    tags: ['ui', 'brand'],
    tools: ['Figma'],
    images: [
      '/img/design-system/design-system-01.png',
      '/img/design-system/design-system-02.png',
      '/img/design-system/portfolio_biggo-design-system-01.png',
    ],
  },
];

export function getProjects(t) {
  const translated = t('projects');
  return projectsBase.map((base, i) => ({
    ...base,
    title: translated[i]?.title ?? base.id,
    subtitle: translated[i]?.subtitle ?? '',
    category: translated[i]?.category ?? '',
    description: translated[i]?.description ?? '',
    overviewSections: translated[i]?.overviewSections ?? [],
    contentBlocks: translated[i]?.contentBlocks ?? [],
    role: translated[i]?.role ?? '',
    duration: translated[i]?.duration ?? '',
    responsibility: translated[i]?.responsibility ?? '',
    objective: translated[i]?.objective ?? '',
    challenge: translated[i]?.challenge ?? '',
    descriptionImage: translated[i]?.descriptionImage ?? '',
    exploration: translated[i]?.exploration ?? '',
    explorationImage: translated[i]?.explorationImage ?? '',
    explorationImages: translated[i]?.explorationImages ?? [],
    insights: translated[i]?.insights ?? [],
    thoughtImage: translated[i]?.thoughtImage ?? '',
    solutionLabel: translated[i]?.solutionLabel ?? '',
    solution: translated[i]?.solution ?? '',
    solutionImage: translated[i]?.solutionImage ?? '',
    results: translated[i]?.results ?? [],
    learnings: translated[i]?.learnings ?? [],
  }));
}

export default projectsBase;
