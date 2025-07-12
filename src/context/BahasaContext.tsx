import { createContext, useContext, useState, ReactNode } from 'react';
import id from '../bahasa/id';
import en from '../bahasa/en';


type Language = 'id' | 'en';

interface TypeBahasaContext {
    language: Language;
    changeLanguage: (lang: Language) => void;
    t: typeof id; 
  }

  const LanguageContext = createContext<TypeBahasaContext | undefined>(undefined);

  export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('id');
  
    const changeLanguage = (lang: Language) => setLanguage(lang);
  
    const t = language === 'en' ? en : id;
  
    return (
      <LanguageContext.Provider value={{ language, changeLanguage, t }}>
        {children}
      </LanguageContext.Provider>
    );
  };
  
  export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within LanguageProvider');
    return context;
  };