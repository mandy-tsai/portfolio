import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="page-padding py-16 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="space-y-3">
          <p className="text-xs text-muted">&copy; {new Date().getFullYear()}</p>
          <p className="text-sm">
            {t('footer.hello')}<br />
            <a href="mailto:mandytsaiyaching@gmail.com" className="link-underline text-fg">mandytsaiyaching@gmail.com</a>
          </p>
          <button onClick={scrollToTop} className="text-xs text-muted hover:text-fg transition-colors mt-4 block">{t('footer.backToTop')}</button>
        </div>
        <div className="flex justify-center">
          <img src="/img/logo.svg" alt="Logo" className="h-12 w-auto" style={{ filter: 'brightness(0)' }} />
        </div>
        <div className="md:text-right space-y-1">
          {[
            { name: 'Behance', url: 'https://www.behance.net/mandytsaiyaching' },
            { name: 'LinkedIn', url: 'https://www.linkedin.com/in/yachingtsai-mandy/' },
            { name: 'Instagram', url: 'https://www.instagram.com/mo__design.studio/' },
          ].map(({ name, url }) => (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="block text-sm text-muted hover:text-fg transition-colors">{name}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
