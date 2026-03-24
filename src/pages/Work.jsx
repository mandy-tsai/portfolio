import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { getProjects } from '../data/projects';
import { useLanguage } from '../i18n/LanguageContext';

export default function Work() {
  const { t } = useLanguage();
  const projects = getProjects(t);

  return (
    <PageTransition>
      <section className="page-padding pt-28 pb-20 max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-6xl md:text-8xl lg:text-9xl text-fg/[0.06] italic mb-16 select-none"
        >
          Selected Projects
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i % 2 * 0.1 }}
            >
              <Link to={`/work/${project.id}`} className="group block">
                <div className="overflow-hidden rounded-xl bg-border/20 mb-5">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="font-semibold text-xl md:text-2xl mb-1 group-hover:text-muted transition-colors">{project.title}</h2>
                    <p className="text-sm text-muted">{project.subtitle}</p>
                  </div>
                  <span className="shrink-0 text-xs font-display tracking-wide text-muted border border-border rounded-full px-3 py-1 mt-1">
                    {project.category}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
