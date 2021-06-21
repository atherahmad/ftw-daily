import Cookies from 'universal-cookie';
const cookies = new Cookies();
// Add here the translations of the country names using key "<language_code>: 'transalation'" e.g. fi: 'Afganistan'
// prettier-ignore
const categoryCodes = [
  { code: 'Bildung', en: 'Education', de: 'Bildung' },
  { code: 'Naturschutz', en: 'Nature preservation', de: 'Naturschutz' },
  { code: 'Community', en: 'Community', de: 'Community' },
  { code: 'Tierschutz', en: 'animal protection', de: 'Tierschutz' },




];

const getCategoryCodes = lang => {
  // Add the lnew locale here so that the correct translations will be returned.
  // If locale is unknown or the translation is missing, this will default to english coutnry name.

  const codes =
    cookies.get('language') === 'en'
      ? categoryCodes.map(c => {
          const categoryName = c[lang] ? c['en'] : c['en'];
          const categoryCode = c.code;

          return { code: categoryCode, name: categoryName };
        })
      : categoryCodes.map(c => {
          const categoryName = c[lang] ? c['de'] : c['de'];
          const categoryCode = c.code;

          return { code: categoryCode, name: categoryName };
        });
  return codes;
};

export default getCategoryCodes;
