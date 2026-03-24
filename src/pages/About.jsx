import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { getProjects } from '../data/projects';
import { useLanguage } from '../i18n/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  const projects = getProjects(t);
  const experiences = t('about.experiences');
  const skills = t('about.skills');

  return (
    <PageTransition>
      <section className="page-padding pt-28 pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl md:text-7xl lg:text-[8rem] leading-[0.95] whitespace-pre-line"
        >
          {t('about.greeting')}<span className="italic">{t('about.name')}</span>{t('about.greetingEnd')}
        </motion.h1>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid md:grid-cols-[1fr_auto] gap-12 mt-16 items-center">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
            <p className="text-muted leading-relaxed">{t('about.bio1')}</p>
            <div>
              <p className="text-muted leading-relaxed mb-4">
                {t('about.bio2')}{' '}
                <a href="mailto:mandytsaiyaching@gmail.com" className="text-fg link-underline">mandytsaiyaching@gmail.com</a>
                {t('about.bio2End')}
              </p>
              <Link to="/contact" className="text-sm font-display font-medium hover:text-muted transition-colors">{t('about.getInTouch')}</Link>
            </div>
          </div>
          <div className="hidden md:block w-48 lg:w-56 flex-shrink-0">
            <img src="/img/portrait.png" alt="Mandy Tsai" className="w-full h-auto rounded-2xl" />
          </div>
        </motion.div>
      </section>

      {/* Arch cards */}
      <section className="page-padding pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {projects.slice(0, 4).map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Link to={`/work/${project.id}`} className="group block">
                <div className="relative overflow-hidden bg-fg aspect-[3/5]" style={{ borderRadius: '999px 999px 0 0' }}>
                  <div className="absolute top-4 right-4 z-10"><span className="text-bg/30 text-xl">✦</span></div>
                  <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-end mt-6">
          <Link to="/work" className="text-sm link-underline text-muted hover:text-fg">{t('about.seeAllWorks')}</Link>
        </div>
      </section>

      <div className="divider" />

      {/* Experience */}
      <section className="page-padding py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="label mb-8">{t('about.expLabel')}</p>
          <div className="space-y-0">
            {Array.isArray(experiences) && experiences.map((exp, i) => (
              <div key={i} className="grid md:grid-cols-[200px_1fr_2fr] gap-6 py-8 divider group">
                <p className="text-xs text-muted font-display">{exp.year}</p>
                <div>
                  <h3 className="font-serif text-xl italic group-hover:text-muted transition-colors">{exp.role}</h3>
                  <p className="text-sm text-muted mt-1">{exp.company}</p>
                </div>
                <p className="text-sm text-muted leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="divider" />

      {/* Skills */}
      <section className="page-padding py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="label mb-8">{t('about.skillsLabel')}</p>
          <div className="grid md:grid-cols-3 gap-12">
            {Array.isArray(skills) && skills.map((group) => (
              <div key={group.title}>
                <h3 className="font-serif text-lg italic mb-4">{group.title}</h3>
                <div className="space-y-2">
                  {group.items.map((skill) => (<p key={skill} className="text-sm text-muted">{skill}</p>))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="page-padding py-24 text-center divider">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-serif text-4xl md:text-6xl mb-8 italic">{t('about.ctaTitle')}</h2>
          <Link to="/contact" className="inline-block font-display font-medium text-sm uppercase tracking-widest px-10 py-4 transition-colors text-white hover:opacity-80" style={{ backgroundColor: 'rgb(20, 0, 237)' }}>{t('about.ctaButton')}</Link>
        </motion.div>
      </section>
    </PageTransition>
  );
}
