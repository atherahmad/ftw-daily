// Add here the translations of the country names using key "<language_code>: 'transalation'" e.g. fi: 'Afganistan'
// prettier-ignore
const roomamountCodes = [
  { code: 1 },
  { code: 2 },
  { code: 3 },
  { code: 4},
  { code: 5},
  { code: 6},
  { code: 7},
  { code: 8},
  { code: 9},
  { code: 10},
  { code: 11},
  { code: 12},
  { code: 13},
  { code: 14},
  { code: 15},
  { code: 16},
  { code: 17},
  { code: 18},
  { code: 19},
  { code: 20},
  { code: 21},
  { code: 22},
  { code: 23},
  { code: 24},
  { code: 25},
  { code: 26},
  { code: 27},
  { code: 28},
  { code: 29},
  { code: 30},
  { code: 31},
  { code: 32},
  { code: 33},
  { code: 34},
  { code: 35},
  { code: 36},
  { code: 37},
  { code: 38},
  { code: 39},
  { code: 40},
  { code: 41},
  { code: 42},
  { code: 43},
  { code: 44},
  { code: 45},
  { code: 46},
  { code: 47},
  { code: 48},
  { code: 49},
  { code: 50},
  { code: 51 },
  { code: 52 },
  { code: 53 },
  { code: 54},
  { code: 55},
  { code: 56},
  { code: 57},
  { code: 58},
  { code: 59},
  { code: 60},
  { code: 61},
  { code: 62},
  { code: 63},
  { code: 64},
  { code: 65},
  { code: 66},
  { code: 67},
  { code: 68},
  { code: 69},
  { code: 70},
  { code: 71},
  { code: 72},
  { code: 73},
  { code: 74},
  { code: 75},
  { code: 76},
  { code: 77},
  { code: 78},
  { code: 79},
  { code: 80},
  { code: 81},
  { code: 82},
  { code: 83},
  { code: 84},
  { code: 85},
  { code: 86},
  { code: 87},
  { code: 88},
  { code: 89},
  { code: 90},
  { code: 91},
  { code: 92},
  { code: 93},
  { code: 94},
  { code: 95},
  { code: 96},
  { code: 97},
  { code: 98},
  { code: 99},
  { code: 100},
 




];

const getRoomamountCodes = lang => {
  // Add the lnew locale here so that the correct translations will be returned.
  // If locale is unknown or the translation is missing, this will default to english coutnry name.

  const codes = roomamountCodes.map(c => {
    const roomamountName = c[lang] ? c['en'] : c['en'];
    const roomamountCode = c.code;

    return { code: roomamountCode, name: roomamountName };
  });

  return codes;
};

export default getRoomamountCodes;
