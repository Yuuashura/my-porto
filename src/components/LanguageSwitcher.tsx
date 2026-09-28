import type { Language, PortfolioContent } from '../content'

export function LanguageSwitcher({
  language,
  copy,
  onChange,
}: {
  language: Language
  copy: PortfolioContent
  onChange: (language: Language) => void
}) {
  return (
    <div className="language-switcher" role="group" aria-label={copy.language.label}>
      <button
        type="button"
        className={language === 'en' ? 'is-active' : ''}
        aria-label={copy.language.english}
        aria-pressed={language === 'en'}
        onClick={() => onChange('en')}
      >
        EN
      </button>
      <button
        type="button"
        className={language === 'id' ? 'is-active' : ''}
        aria-label={copy.language.indonesian}
        aria-pressed={language === 'id'}
        onClick={() => onChange('id')}
      >
        ID
      </button>
    </div>
  )
}
