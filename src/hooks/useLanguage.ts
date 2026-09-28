import { useEffect, useState } from 'react'
import type { Language } from '../content'

const storageKey = 'ys-portfolio-language'

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = window.localStorage.getItem(storageKey)
    if (savedLanguage === 'en' || savedLanguage === 'id') return savedLanguage
    return window.navigator.language.toLowerCase().startsWith('id') ? 'id' : 'en'
  })

  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem(storageKey, language)
  }, [language])

  return [language, setLanguage] as const
}
