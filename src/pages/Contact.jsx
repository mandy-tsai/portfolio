import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import PageTransition from '../components/PageTransition';
import { useLanguage } from '../i18n/LanguageContext';

function generateCaptcha() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { question: `${a} + ${b} = ?`, answer: a + b };
}

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [captcha, setCaptcha] = useState(() => generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseInt(captchaInput, 10) !== captcha.answer) {
      setCaptchaError(true);
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
      return;
    }
    setCaptchaError(false);
    setSending(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'b4d16f60-30ca-4e7e-8abb-f0e8e09582b0',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio contact from ${formData.name}`,
        }),
      });
      if (res.ok) setSubmitted(true);
    } catch (_) {
      setSubmitted(true);
    }
    setSending(false);
  };

  return (
    <PageTransition>
      <section className="page-padding pt-28 pb-24 min-h-screen">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl md:text-7xl lg:text-[7rem] leading-[0.95] mb-16"
        >
          {t('contact.title1')}<br />
          <span className="italic ml-12 md:ml-24">{t('contact.title2')}</span>
        </motion.h1>

        <div className="divider mb-16" />

        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            {submitted ? (
              <div className="py-16 text-center">
                <span className="text-4xl mb-6 block">✓</span>
                <h3 className="font-serif text-2xl italic mb-3">{t('contact.successTitle')}</h3>
                <p className="text-muted text-sm">{t('contact.successDesc')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="label block mb-3">{t('contact.nameLabel')}</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-transparent border-b border-border py-3 text-fg outline-none focus:border-fg transition-colors placeholder:text-muted/40 text-sm" placeholder={t('contact.namePlaceholder')} />
                </div>
                <div>
                  <label className="label block mb-3">{t('contact.emailLabel')}</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-transparent border-b border-border py-3 text-fg outline-none focus:border-fg transition-colors placeholder:text-muted/40 text-sm" placeholder={t('contact.emailPlaceholder')} />
                </div>
                <div>
                  <label className="label block mb-3">{t('contact.messageLabel')}</label>
                  <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-transparent border-b border-border py-3 text-fg outline-none focus:border-fg transition-colors resize-none placeholder:text-muted/40 text-sm" placeholder={t('contact.messagePlaceholder')} />
                </div>
                <div>
                  <label className="label block mb-3">{t('contact.captchaLabel') || 'CAPTCHA'}</label>
                  <div className="flex items-center gap-4">
                    <span className="text-base font-medium select-none">{captcha.question}</span>
                    <input
                      type="text"
                      required
                      value={captchaInput}
                      onChange={(e) => { setCaptchaInput(e.target.value); setCaptchaError(false); }}
                      className={`w-24 bg-transparent border-b py-3 text-fg outline-none transition-colors text-sm ${captchaError ? 'border-red-500' : 'border-border focus:border-fg'}`}
                      placeholder={t('contact.captchaPlaceholder') || '?'}
                    />
                  </div>
                  {captchaError && <p className="text-red-500 text-xs mt-2">{t('contact.captchaError') || 'Incorrect, please try again.'}</p>}
                </div>
                <button type="submit" disabled={sending} className="font-display font-medium text-sm uppercase tracking-widest px-10 py-4 transition-colors text-white hover:opacity-80 w-full md:w-auto disabled:opacity-50" style={{ backgroundColor: 'rgb(20, 0, 237)' }}>{sending ? '...' : t('contact.submit')}</button>
              </form>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-10">
            <div>
              <p className="label mb-3">Email</p>
              <a href="mailto:mandytsaiyaching@gmail.com" className="text-lg font-serif italic link-underline">mandytsaiyaching@gmail.com</a>
            </div>
            <div>
              <p className="label mb-3">{t('contact.locationLabel')}</p>
              <p className="text-sm">{t('contact.location')}</p>
            </div>
            <div>
              <p className="label mb-3">{t('contact.socialLabel')}</p>
              <div className="space-y-2">
                {[
                  { name: 'Behance', url: 'https://www.behance.net/mandytsaiyaching' },
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/yachingtsai-mandy/' },
                  { name: 'Instagram', url: 'https://www.instagram.com/mo__design.studio/' },
                ].map(({ name, url }) => (
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="block text-sm text-muted hover:text-fg transition-colors">{name} ↗</a>
                ))}
              </div>
            </div>
            <div>
              <p className="label mb-3">{t('contact.availLabel')}</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <p className="text-sm">{t('contact.availText')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
