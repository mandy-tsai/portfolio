import { Fragment } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { getProjects } from '../data/projects';
import { useLanguage } from '../i18n/LanguageContext';

const pad = (n) => String(n).padStart(2, '0');

function Section({ label, children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
      {label && <p className="label mb-6">{label}</p>}
      {children}
    </motion.div>
  );
}

function Img({ src, alt = '' }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 mb-14">
      <div className="overflow-hidden bg-border/20 rounded-sm">
        <img src={src} alt={alt} className="w-full h-auto" />
      </div>
    </motion.div>
  );
}

function RichText({ text, className = '' }) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <p className={className}>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={i} className="font-bold text-fg">{part.slice(2, -2)}</strong>
          : part
      )}
    </p>
  );
}

function ContentBlockRenderer({ blocks }) {
  return (
    <div className="flex flex-col">
      {blocks.map((b, i) => {
        const k = `b-${i}`;
        const isFirst = i === 0;
        if (b.type === 'label') return <div key={k} className={`${isFirst ? 'mt-0' : 'mt-16'} mb-6`}><h2 className="font-semibold text-[1.875rem] leading-tight pb-2">{b.text}</h2><hr className="border-t border-border" /></div>;
        if (b.type === 'heading') return <p key={k} className="font-bold text-base mt-12 mb-0">{b.text}</p>;
        if (b.type === 'heading-tight') return <p key={k} className="font-bold text-base mt-12 mb-0">{b.text}</p>;
        if (b.type === 'subheading') return <h3 key={k} className="font-semibold text-2xl leading-snug mt-12 mb-0">{b.text}</h3>;
        if (b.type === 'text') return <RichText key={k} text={b.text} className="text-base leading-relaxed text-muted whitespace-pre-line mt-6" />;
        if (b.type === 'image') return <Img key={k} src={b.src} alt={b.text || ''} />;
        if (b.type === 'image-spaced') return (
          <motion.div key={k} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-6 mb-6">
            <div className="overflow-hidden bg-border/20 rounded-sm"><img src={b.src} alt="" className="w-full h-auto" /></div>
          </motion.div>
        );
        if (b.type === 'images') return (
          <div key={k} className="grid grid-cols-3 gap-4 my-6">
            {b.srcs.map((s, j) => <div key={j} className="overflow-hidden bg-border/20 rounded-sm"><img src={s} alt="" className="w-full h-auto object-cover aspect-square" /></div>)}
          </div>
        );
        if (b.type === 'images-row') return (
          <div key={k} className="grid grid-cols-2 gap-4 my-6">
            {b.srcs.map((s, j) => <div key={j} className="overflow-hidden bg-border/20 rounded-sm"><img src={s} alt="" className="w-full h-auto" /></div>)}
          </div>
        );
        if (b.type === 'three-columns') return (
          <div key={k} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {(b.cols || b.items || []).map((item, j) => (
              <div key={j} className="bg-border/15 rounded-lg p-5">
                <p className="font-bold text-base mb-2">{item.heading}</p>
                <p className="text-sm leading-relaxed text-muted whitespace-pre-line">{item.text}</p>
              </div>
            ))}
          </div>
        );
        if (b.type === 'four-columns') return (
          <div key={k} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {(b.cols || []).map((item, j) => (
              <div key={j} className="bg-border/15 rounded-lg p-5">
                <p className="font-bold text-base mb-2">{item.heading}</p>
                <p className="text-sm leading-relaxed text-muted whitespace-pre-line">{item.text}</p>
              </div>
            ))}
          </div>
        );
        if (b.type === 'insight') return (
          <div key={k} className="bg-border/15 rounded-lg p-5 mt-3.5">
            <p className="font-bold text-base mb-1">💡 {b.title}</p>
            <p className="text-sm leading-relaxed text-muted">{b.desc}</p>
          </div>
        );
        if (b.type === 'callout') return (
          <div key={k} className="bg-border/15 rounded-lg p-6 mt-6">
            <p className="font-bold text-base mb-2">{b.title}</p>
            <p className="text-sm leading-relaxed text-muted whitespace-pre-line">{b.text}</p>
          </div>
        );
        if (b.type === 'columns') {
          const bothHaveContent = (b.left.type === 'image' && b.right.type === 'text') || (b.left.type === 'text' && b.right.type === 'image');
          const imageOnly = (b.left.type === 'image' && !b.right.type) || (!b.left.type && b.right.type === 'image');
          const hasImageAndText = (b.left.type === 'image' && b.right.type === 'text') || (b.left.type === 'text' && b.right.type === 'image');
          const gridClass = hasImageAndText ? 'grid-cols-1 md:grid-cols-2 items-center' : 'grid-cols-1 md:grid-cols-2 items-start';
          return (
          <div key={k} className={`grid gap-8 mt-8 mb-0 ${gridClass}`}>
            <div>
              {b.left.type === 'image'
                ? <div className="w-full"><img src={b.left.src} alt="" className="w-full h-auto" /></div>
                : <div>{b.left.heading && <h4 className="font-bold text-base mb-0">{b.left.heading}</h4>}<RichText text={b.left.text} className="text-base leading-relaxed text-muted whitespace-pre-line" /></div>}
            </div>
            <div>
              {b.right.type === 'image'
                ? <div className="w-full"><img src={b.right.src} alt="" className="w-full h-auto" /></div>
                : <div>{b.right.heading && <h4 className="font-bold text-base mb-0">{b.right.heading}</h4>}<RichText text={b.right.text} className="text-base leading-relaxed text-muted whitespace-pre-line" /></div>}
            </div>
          </div>
        );
        }
        return null;
      })}
    </div>
  );
}

function StandardContent({ project, t }) {
  const hasRichResults = project.results.length > 0 && typeof project.results[0] === 'object';

  return (
    <>
      <section className="page-padding py-16 max-w-4xl">
        <Section label={t('project.overview')}>
          {project.overviewSections && project.overviewSections.length > 0 ? (
            <ContentBlockRenderer blocks={project.overviewSections} />
          ) : (
            <>
              <p className="text-lg leading-relaxed text-muted">{project.description}</p>
              {project.descriptionImage && <Img src={project.descriptionImage} alt="Background" />}
              {project.objective && <p className="text-lg leading-relaxed text-muted mt-4">{project.objective}</p>}
            </>
          )}
        </Section>

        <Section label={t('project.challenge')}>
          {Array.isArray(project.challenge) ? (
            <div className="space-y-3">{project.challenge.map((l, i) => <p key={i} className="text-lg leading-relaxed text-muted">{l}</p>)}</div>
          ) : (
            <p className="text-lg leading-relaxed text-muted">{project.challenge}</p>
          )}
        </Section>

        {project.exploration && (
          <Section label={t('project.exploration')}>
            {project.explorationImage && <Img src={project.explorationImage} alt="Exploration" />}
            <p className="text-lg leading-relaxed text-muted">{project.exploration}</p>
            {project.explorationImages && project.explorationImages.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                {project.explorationImages.map((img, i) => <div key={i} className="overflow-hidden bg-border/20 rounded-sm"><img src={img} alt="" className="w-full h-auto" /></div>)}
              </div>
            )}
          </Section>
        )}

        {project.thoughtImage && <Img src={project.thoughtImage} alt="Thought process" />}

        {project.insights && project.insights.length > 0 && (
          <Section label={t('project.insights')}>
            <div className="space-y-6">
              {project.insights.map((ins, i) => (
                <div key={i} className="border-l-2 border-fg/20 pl-6 py-2">
                  <p className="font-semibold text-sm mb-1">💡 {ins.title}</p>
                  <p className="text-sm leading-relaxed text-muted">{ins.desc}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        <Section label={project.solutionLabel || t('project.solution')}>
          {project.solutionImage && <Img src={project.solutionImage} alt="Solution" />}
          <p className="text-lg leading-relaxed text-muted">{project.solution}</p>
        </Section>
      </section>

      <section className="page-padding py-16 divider">
        <p className="label mb-10">{t('project.results')}</p>
        {hasRichResults ? (
          <div className="max-w-4xl space-y-16">
            {project.results.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="font-serif text-xl md:text-2xl italic mb-3">{r.title}</h3>
                <p className="text-muted leading-relaxed mb-6">{r.desc}</p>
                {r.image && <div className="overflow-hidden bg-border/20 rounded-sm"><img src={r.image} alt={r.title} className="w-full h-auto" /></div>}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {project.results.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border border-border p-6">
                <span className="font-display text-xs text-muted">{pad(i + 1)}</span>
                <p className="text-sm mt-3 leading-relaxed">{r}</p>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {project.learnings && project.learnings.length > 0 && (
        <section className="page-padding py-16 divider">
          <p className="label mb-8">{t('project.learnings')}</p>
          <div className="max-w-3xl space-y-6">
            {project.learnings.map((l, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p className="text-muted leading-relaxed">{l}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const { t } = useLanguage();
  const projects = getProjects(t);
  const project = projects.find((p) => p.id === id);
  if (!project) return <Navigate to="/work" replace />;

  const currentIndex = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const hasContentBlocks = project.contentBlocks && project.contentBlocks.length > 0;

  const infoItems = [
    { label: t('project.role'), value: project.role },
    { label: t('project.duration'), value: project.duration },
    ...(project.responsibility ? [{ label: t('project.responsibility'), value: project.responsibility }] : []),
    { label: t('project.tools'), value: project.tools.join(', ') },
  ];

  return (
    <PageTransition>
      <section className="page-padding pt-28 pb-16 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end mb-6">
          <p className="label">↗ {project.category} / {project.year} / {pad(currentIndex + 1)}</p>
          <Link to="/work" className="label hover:text-fg transition-colors">{t('project.back')}</Link>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="heading-xl mb-4">{project.title}</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-serif text-2xl md:text-3xl text-muted italic">{project.subtitle}</motion.p>
      </section>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="page-padding max-w-4xl mx-auto">
        <div className="overflow-hidden bg-border/30"><img src={project.hero} alt={project.title} className="w-full h-auto" /></div>
      </motion.div>

      <section className="page-padding py-12 divider mt-12 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {infoItems.map((item) => (
            <div key={item.label} className="min-w-0"><p className="label mb-2">{item.label}</p><p className="text-sm font-medium">{item.value}</p></div>
          ))}
        </div>
      </section>

      {hasContentBlocks ? (
        <section className="page-padding py-16 max-w-4xl mx-auto">
          <ContentBlockRenderer blocks={project.contentBlocks} />
        </section>
      ) : (
        <StandardContent project={project} t={t} />
      )}

      <section className="page-padding py-20 divider max-w-4xl mx-auto">
        <p className="label mb-4">{t('project.next')}</p>
        <Link to={`/work/${nextProject.id}`} className="group">
          <h3 className="font-serif text-4xl md:text-6xl italic group-hover:text-muted transition-colors">
            {nextProject.title}<span className="inline-block ml-4 transition-transform group-hover:translate-x-4">↗</span>
          </h3>
        </Link>
      </section>
    </PageTransition>
  );
}
