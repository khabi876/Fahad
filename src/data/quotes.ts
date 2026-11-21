export type QuoteCategory = 'all' | 'late-wish' | 'duas' | 'friendship';

export interface UrduQuote {
  id: string;
  index: string;
  category: Exclude<QuoteCategory, 'all'>;
  categoryLabel: string;
  urdu: string;
  roman: string;
  english: string;
  accentHue: 'gold' | 'crimson' | 'emerald' | 'sapphire';
}

export const URDU_QUOTES: UrduQuote[] = [
  {
    id: 'q1',
    index: '01',
    category: 'late-wish',
    categoryLabel: 'Late Wish',
    urdu: 'دیر سے سہی مگر دل کی گہرائیوں سے دعا ہے، فہد — تمہاری زندگی کا ہر نیا سال روشنیوں سے بھر جائے۔',
    roman: 'Der se sahi magar dil ki gehraiyon se dua hai, Fahad — tumhari zindagi ka har naya saal roshniyon se bhar jaye.',
    english: 'Though delayed in time, this prayer rises from the depths of the heart: may every new year of your life be luminous, Fahad.',
    accentHue: 'gold',
  },
  {
    id: 'q2',
    index: '02',
    category: 'late-wish',
    categoryLabel: 'Late Wish',
    urdu: 'وقت کی گرد کبھی سچے رشتوں کی چمک ماند نہیں کرتی؛ دیر سے دی گئی مبارکباد بھی اتنی ہی خالص ہوتی ہے۔',
    roman: 'Waqt ki gard kabhi sache rishton ki chamak maand nahi karti; der se di gayi mubarakbad bhi utni hi khalis hoti hai.',
    english: 'The dust of passing days never dims true bonds; a greeting sent late remains every bit as sincere.',
    accentHue: 'crimson',
  },
  {
    id: 'q3',
    index: '03',
    category: 'duas',
    categoryLabel: 'Duas & Blessings',
    urdu: 'آسمانوں سے اترے خوشیوں کی برسات، ہر قدم پر ملے کامیابی کا ساتھ — سالگرہ مبارک ہو فہد!',
    roman: 'Aasmanon se utray khushiyon ki barsaat, har qadam par mile kamyabi ka saath — Salgirah Mubarak ho Fahad!',
    english: 'May showers of joy descend from the skies, and may triumph walk beside every step you take — Happy Birthday, Fahad.',
    accentHue: 'gold',
  },
  {
    id: 'q4',
    index: '04',
    category: 'duas',
    categoryLabel: 'Duas & Blessings',
    urdu: 'خدا کرے کہ تیری عمرِ رواں میں کبھی غم کی شام نہ آئے، اور ہر صبح مسکراہٹوں کا پیغام لائے۔',
    roman: 'Khuda kare ke teri umr-e-rawan mein kabhi gham ki shaam na aaye, aur har subah muskurahaton ka paigham laaye.',
    english: 'May your unfolding years never know a sorrowful dusk, and may every dawn arrive carrying reasons to smile.',
    accentHue: 'emerald',
  },
  {
    id: 'q5',
    index: '05',
    category: 'friendship',
    categoryLabel: 'Brotherhood',
    urdu: 'کچھ لوگ زندگی میں چراغوں کی مانند ہوتے ہیں — وہ جہاں رہتے ہیں، محفل خود بخود روشن ہو جاتی ہے۔',
    roman: 'Kuch log zindagi mein chiraghon ki manind hote hain — woh jahan rehte hain, mehfil khud ba khud roshan ho jaati hai.',
    english: 'Some people move through life like lanterns — wherever they stand, the entire gathering is quietly illuminated.',
    accentHue: 'gold',
  },
  {
    id: 'q6',
    index: '06',
    category: 'duas',
    categoryLabel: 'Duas & Blessings',
    urdu: 'چراغ بن کے جلا ہر اندھیری راہوں میں، خدا کرے کہ تیرا نام روشنی بن جائے۔',
    roman: 'Chiragh ban ke jala har andheri rahon mein, Khuda kare ke tera naam roshni ban jaye.',
    english: 'You have burned like a steady lamp along darkened paths; may your very name become synonymous with light.',
    accentHue: 'sapphire',
  },
  {
    id: 'q7',
    index: '07',
    category: 'late-wish',
    categoryLabel: 'Late Wish',
    urdu: 'محفلِ سالگرہ تو گزر گئی، مگر فہد کے لیے دعاؤں کا سلسلہ آج بھی ویسا ہی تازہ ہے۔',
    roman: 'Mehfil-e-salgirah toh guzar gayi, magar Fahad ke liye duaon ka silsila aaj bhi waisa hi taza hai.',
    english: 'The birthday hour may have passed, yet the stream of prayers for Fahad remains just as fresh today.',
    accentHue: 'crimson',
  },
  {
    id: 'q8',
    index: '08',
    category: 'friendship',
    categoryLabel: 'Brotherhood',
    urdu: 'تمہاری دوستی وہ سرمایہ ہے جس پر وقت کا کوئی قرض باقی نہیں — سلامت رہو، شاد رہو، آباد رہو۔',
    roman: 'Tumhari dosti woh sarmaya hai jis par waqt ka koi qarz baqi nahi — salamat raho, shaad raho, aabad raho.',
    english: 'Your friendship is a treasure untouched by the debt of time — stay safe, stay joyful, and flourish always.',
    accentHue: 'emerald',
  },
];
