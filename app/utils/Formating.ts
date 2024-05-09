interface ILetter {
  symbol: string;
  replace: string;
}

export class Formating {
  // latin to cyrillic
  private static incorrectLetters: ILetter[] = [
    {
      symbol: "c",
      replace: "с",
    },
    {
      symbol: "a",
      replace: "а",
    },
  ];

  static toFerisian = (text: string) => {
    const letters: ILetter[] = [
      { symbol: "ш", replace: "ß" },
      { symbol: "сс", replace: "ß" },
      { symbol: "ф", replace: "пв" },
      { symbol: "и", replace: "i" },
      { symbol: "ii", replace: "ï" },
      { symbol: "аа", replace: "ä" },
      { symbol: "оо", replace: "ö" },
      { symbol: "юю", replace: "ü" },
      { symbol: "уу", replace: "ÿ" },
    ];
    this.incorrectLetters.every(
      (l) => (text = text.replaceAll(l.symbol, l.replace))
    );
    letters.every(
      (l) => (text = text.toLowerCase().replaceAll(l.symbol, l.replace))
    );

    return text;
  };

  static toCyrillic = (text: string) => {
    const letters: ILetter[] = [
      { symbol: "ä", replace: "аа" },
      { symbol: "ö", replace: "оо" },
      { symbol: "ü", replace: "юю" },
      { symbol: "ÿ", replace: "уу" },
      { symbol: "ß", replace: "сс" },
      { symbol: "ï", replace: "ii" },
      { symbol: "i", replace: "и" },
      { symbol: "пв", replace: "ф" },
    ];
    letters.every(
      (l) => (text = text.toLowerCase().replaceAll(l.symbol, l.replace))
    );

    return text;
  };

  static toFamilyFormat = (word: string) => {
    const letters = [{ symbol: "ß", replace: "сс" }];

    word = this.toFerisian(word);
    word = cut(word);
    letters.every(
      (l) => (word = word.toLowerCase().replaceAll(l.symbol, l.replace))
    );

    const variants: string[] = [];
    variants.push(word + "iкс", word + "ула", word + "цант");

    return variants;
  };
}

export const cut = (word: string) => {
  const ends = ["а", "о", "тä", "тö", "тü", "нä", "нö", "нü", "ы"];

  for (let i = 0; i < ends.length; i++) {
    if (word.endsWith(ends[i])) {
      return word.slice(0, word.length - ends[i].length);
    }
  }
  return word;
};
