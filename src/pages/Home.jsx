import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { getProjects } from '../data/projects';
import { useLanguage } from '../i18n/LanguageContext';

const pad = (n) => String(n).padStart(2, '0');
const icons = ['☺', '⚡', '⊕', '◎', '❖', '✦'];

function Marquee({ text }) {
  return (
    <div className="overflow-hidden py-6 divider">
      <motion.div
        animate={{ x: [0, -1400] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="flex whitespace-nowrap"
      >
        {[...Array(5)].map((_, i) => (
          <span key={i} className="font-serif text-5xl md:text-7xl lg:text-8xl text-fg/[0.06] italic mx-6">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const projects = getProjects(t);
  const approaches = t('home.approaches');

  return (
    <PageTransition>
      {/* Hero */}
      <section className="page-padding pt-28 pb-16 relative">
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="heading-xl"
          >
            <span className="block">{t('home.title1')}</span>
            <span className="flex items-center gap-6 flex-wrap">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="w-28 h-36 md:w-36 md:h-44 overflow-hidden inline-block flex-shrink-0 grayscale"
                style={{ imageRendering: 'pixelated' }}
              >
                <img
                  src="/img/portrait.png"
                  alt="Mandy Tsai"
                  className="w-full h-full object-cover hover:filter-none transition-all duration-700"
                  style={{ imageRendering: 'pixelated' }}
                />
              </motion.div>
              <span>{t('home.title2')}</span>
            </span>
            <span className="block ml-5 md:ml-24 lg:ml-48">{t('home.title3')}</span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-between items-end mt-16"
        >
          <div>
            <p className="label mb-1">Email</p>
            <a href="mailto:mandytsaiyaching@gmail.com" className="text-sm link-underline">mandytsaiyaching@gmail.com</a>
          </div>
          <p className="text-sm text-muted max-w-xs text-right hidden md:block whitespace-pre-line">
            {t('home.tagline')}
          </p>
        </motion.div>
      </section>

      <Marquee text={t('home.marquee1')} />

      {/* Projects Grid */}
      <section className="page-padding py-20">
        <div className="flex justify-between items-center mb-12">
          <p className="label">{t('home.selectedWork')}</p>
          <Link to="/work" className="label hover:text-fg transition-colors">{t('home.seeAll')}</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <Link to={`/work/${project.id}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden mb-4 bg-border/30">
                  <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex justify-between items-start">
                  <p className="label mb-1">↗ {project.title} / {project.category} / {project.year}</p>
                  <span className="font-display font-bold text-3xl text-fg/10 group-hover:text-fg/30 transition-colors leading-none">{pad(i + 1)}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-end mt-8">
          <Link to="/work" className="text-sm link-underline text-muted hover:text-fg">{t('home.seeAllWorks')}</Link>
        </div>
      </section>

      <Marquee text={t('home.marquee2')} />

      {/* Working Approach */}
      <section className="page-padding py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl flex items-center gap-4 flex-wrap">
            <span className="italic">{t('home.workingTitle1')}</span>
            <span className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden inline-block flex-shrink-0">
              <img src="/img/portrait.png" alt="" className="w-full h-full object-cover" />
            </span>
            <span>{t('home.workingTitle2')}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {Array.isArray(approaches) && approaches.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-bg p-8 group">
              <div className="flex justify-between items-start mb-6">
                <span className="font-display text-xs text-muted">{pad(i + 1)}</span>
                <span className="text-2xl">{icons[i]}</span>
              </div>
              <p className="text-sm leading-relaxed">
                <strong className="font-semibold">{item.title}</strong> {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="page-padding py-24 text-center divider">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="label mb-4">{t('home.ctaLabel')}</p>
          <h2 className="font-serif text-4xl md:text-6xl mb-8 italic">{t('home.ctaTitle')}</h2>
          <Link to="/contact" className="inline-block font-display font-medium text-sm uppercase tracking-widest px-10 py-4 transition-colors text-white hover:opacity-80" style={{ backgroundColor: 'rgb(20, 0, 237)' }}>
            {t('home.ctaButton')}
          </Link>
        </motion.div>
      </section>
    </PageTransition>
  );
}
