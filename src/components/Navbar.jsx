import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const links = [
    { to: '/work', label: t('nav.works') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-bg/80 backdrop-blur-sm">
        <div className="page-padding flex items-center justify-between h-16 border-b border-border/50">
          {/* Left: status text */}
          <p className="hidden lg:block text-xs text-muted whitespace-pre-line leading-tight">
            {t('nav.status')}
          </p>

          {/* Center: Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <img src="/img/logo.svg" alt="Mandy Tsai" className="h-[46px] w-auto" />
          </Link>

          {/* Right: nav links + language toggle */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm transition-colors ${
                  location.pathname.startsWith(link.to)
                    ? 'text-fg font-medium'
                    : 'text-muted hover:text-fg'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Language toggle */}
            <div className="flex items-center gap-1 ml-2 border-l border-border pl-4">
              <button
                onClick={() => setLang('en')}
                className={`text-xs font-display transition-colors ${
                  lang === 'en' ? 'text-fg font-bold' : 'text-muted hover:text-fg'
                }`}
              >
                EN
              </button>
              <span className="text-muted text-xs">/</span>
              <button
                onClick={() => setLang('zh')}
                className={`text-xs font-display transition-colors ${
                  lang === 'zh' ? 'text-fg font-bold' : 'text-muted hover:text-fg'
                }`}
              >
                中
              </button>
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-4 ml-auto">
            {/* Mobile language toggle */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLang('en')}
                className={`text-xs font-display ${lang === 'en' ? 'text-fg font-bold' : 'text-muted'}`}
              >
                EN
              </button>
              <span className="text-muted text-xs">/</span>
              <button
                onClick={() => setLang('zh')}
                className={`text-xs font-display ${lang === 'zh' ? 'text-fg font-bold' : 'text-muted'}`}
              >
                中
              </button>
            </div>

            <button
              className="flex flex-col gap-1.5 z-[70] relative"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className={`block w-6 h-[2px] ${menuOpen ? 'bg-bg' : 'bg-fg'}`}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className={`block w-6 h-[2px] ${menuOpen ? 'bg-bg' : 'bg-fg'}`}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className={`block w-6 h-[2px] ${menuOpen ? 'bg-bg' : 'bg-fg'}`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu - outside nav to avoid backdrop-blur containing block */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-fg flex flex-col items-center justify-center gap-8 z-[60]"
          >
            {/* Close button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-6 text-bg text-3xl leading-none"
              aria-label="Close menu"
            >
              ✕
            </button>
            {links.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-4xl text-bg hover:text-bg/60 transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
