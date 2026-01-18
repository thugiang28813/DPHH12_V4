import React, { useState, useEffect, useMemo } from "react";
import {
  BookOpen,
  BrainCircuit,
  Search,
  RotateCcw,
  Check,
  X,
  FlaskConical,
  Trophy,
  ArrowRightLeft,
  Clock,
} from "lucide-react";
// --- DỮ LIỆU HÓA 12 (CHUẨN CT 2018) ---
const grade12Data = [
  // --- CHƯƠNG 1: ESTER - LIPID ---
  {
    id: 1,
    formula: "HCOOCH3",
    name: "Methyl methanoate",
    type: "Ester",
    commonName: "Methyl formate, chất khí",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 2,
    formula: "HCOOC2H5",
    name: "Ethyl methanoate",
    type: "Ester",
    commonName: "Ethyl formate",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 3,
    formula: "CH3COOCH3",
    name: "Methyl ethanoate",
    type: "Ester",
    commonName: "Methyl acetate",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 4,
    formula: "HCOOCH2CH2CH3",
    name: "Propyl methanoate",
    type: "Ester",
    commonName: "Propyl formate",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 5,
    formula: "HCOOCH(CH3)2",
    name: "Isopropyl methanoate ",
    type: "Ester",
    commonName: "Isopropyl formate",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 6,
    formula: "CH3COOC2H5",
    name: "Ethyl ethanoate",
    type: "Ester",
    commonName: "Ethyl acetate",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 7,
    formula: "C2H5COOCH3",
    name: "Methyl propanoate",
    commonName: "Methyl propionate",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 8,
    formula: "C6H5COOCH3",
    name: "Methyl benzoate",
    type: "Ester",
    commonName: "",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 9,
    formula: "CH3COOC6H5",
    name: "Phenyl ethanoate",
    type: "Ester",
    commonName: "Phenyl acetate",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 10,
    formula: "CH3COOCH=CH2",
    name: "Vinyl ethanoate",
    type: "Ester",
    commonName: "Vinyl acetate",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 11,
    formula: "CH2=CHCOOCH3",
    name: "Methyl propenoate",
    type: "Ester",
    commonName: "Methyl acrylate",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 12,
    formula: "CH3COOCH2C6H5",
    name: "Benzyl acetate",
    type: "Ester",
    commonName: "",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 13,
    formula: "CH3COOCH2CH2CH(CH3)2",
    name: "Isoamyl acetate",
    type: "Ester",
    commonName: "",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 14,
    formula: "CH2=C(CH3)COOCH3",
    name: "Methyl metacrylate",
    type: "Ester",
    commonName: "",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 15,
    formula: "C15H31COOH",
    name: "Palmitic acid",
    type: "Acid béo",
    commonName: "",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 16,
    formula: "C17H35COOH",
    name: "Stearic acid",
    type: "Acid béo",
    commonName: "",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 17,
    formula: "C17H33COOH",
    name: "Oleic acid",
    type: "Acid béo",
    commonName: "",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 18,
    formula: "(C15H31COO)3C3H5",
    name: "Tripalmitin",
    type: "Chất béo",
    commonName: "",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 19,
    formula: "(C17H35COO)3C3H5",
    name: "Tristearin",
    type: "Chất béo",
    commonName: "",
    chapter: "Chương 1: Ester-Lipid",
  },
  {
    id: 20,
    formula: "(C17H33COO)3C3H5",
    name: "Triolein",
    type: "Chất béo",
    commonName: "",
    chapter: "Chương 1: Ester-Lipid",
  },
  // --- CHƯƠNG 2: CARBOHYDRATE ---
  {
    id: 21,
    formula: "C6H12O6",
    name: "Glucose",
    type: "Monosaccharide",
    commonName: "Đường nho",
    chapter: "Chương 2: Carbohydrate",
  },
  {
    id: 22,
    formula: "C6H12O6",
    name: "Fructose",
    type: "Monosaccharide",
    commonName: "Đường mật ong",
    chapter: "Chương 2: Carbohydrate",
  },
  {
    id: 23,
    formula: "C12H22O11",
    name: "Saccharose",
    type: "Disaccharide",
    commonName: "Sucrose / Đường mía",
    chapter: "Chương 2: Carbohydrate",
  },
  {
    id: 24,
    formula: "C12H22O11",
    name: "Maltose",
    type: "Disaccharide",
    commonName: "Đường mạch nha",
    chapter: "Chương 2: Carbohydrate",
  },
  {
    id: 25,
    formula: "(C6H10O5)n",
    name: "Tinh bột",
    type: "Polysaccharide",
    commonName: "",
    chapter: "Chương 2: Carbohydrate",
  },
  {
    id: 26,
    formula: "(C6H10O5)n",
    name: "Cellulose",
    type: "Polysaccharide",
    commonName: "",
    chapter: "Chương 2: Carbohydrate",
  },
  // --- CHƯƠNG 3: AMINE - AMINO ACID - PEPTIDE ---
  {
    id: 27,
    formula: "CH3NH2",
    name: "Methanamine",
    type: "Amine",
    commonName: "Methylamine",
    chapter: "Chương 3: Amine - Amino acid - Peptide",
  },
  {
    id: 28,
    formula: "C2H5NH2",
    name: "Ethanamine",
    type: "Amine",
    commonName: "Ethylamine",
    chapter: "Chương 3: Amine - Amino acid - Peptide",
  },
  {
    id: 29,
    formula: "CH3CH2CH2NH2",
    name: "Propan-1-amine",
    type: "Amine",
    commonName: "Propylamine",
    chapter: "Chương 3: Amine - Amino acid - Peptide",
  },
  {
    id: 30,
    formula: "CH3NHCH3",
    name: "N-methylmethanamine",
    type: "Amine",
    commonName: "Dimethylamine",
    chapter: "Chương 3: Amine - Amino acid - Peptide",
  },
  {
    id: 31,
    formula: "C2H5NHCH3",
    name: "N-methylethanamine",
    type: "Amine",
    commonName: "Ethylmethylamine",
    chapter: "Chương 3: Amine - Amino acid - Peptide",
  },
  {
    id: 32,
    formula: "CH3CH(NH2)CH3",
    name: "Propan-2-amine",
    type: "Amine",
    commonName: "Isopropylamine",
    chapter: "Chương 3: Amine - Amino acid - Peptide",
  },
  {
    id: 33,
    formula: "(CH3)3N",
    name: "N,N-dimethylmethanamine",
    type: "Amine",
    commonName: "Trimethylamine",
    chapter: "Chương 3: Amine - Amino acid - Peptide",
  },
  {
    id: 34,
    formula: "C6H5NH2",
    name: "Benzenamine",
    type: "Amine",
    commonName: "Phenylamine / Aniline",
    chapter: "Chương 3: Amine - Amino acid - Peptide",
  },
  {
    id: 35,
    formula: "H2NCH2COOH",
    name: "Aminoethanoic acid",
    type: "Amino Acid",
    commonName: "Aminoacetic acid / Glycine (Gly)",
    chapter: "CChương 3: Amine - Amino acid - Peptide",
  },
  {
    id: 36,
    formula: "CH3CH(NH2)COOH",
    name: "2-aminopropanoic acid",
    type: "Amino Acid",
    commonName: "α-aminopropionic acid / Alanine (Ala)",
    chapter: "Chương 3: Amine - Amino acid - Peptide",
  },
  {
    id: 37,
    formula: "(CH3)2CHCH(NH2)COOH",
    name: "2-amino-3-methylbutanoic acid",
    type: "Amino Acid",
    commonName: "α-aminoisovaleric acid / Valine (Val)",
    chapter: "CChương 3: Amine - Amino acid - Peptide",
  },
  {
    id: 38,
    formula: "H2N[CH2]4CH(NH2)COOH",
    name: "2,6-diaminohexanoic acid",
    type: "Amino Acid",
    commonName: "α,ε-diaminocaproic acid / Lysine (Lys)",
    chapter: "Chương 3: Amine - Amino acid - Peptide",
  },
  {
    id: 39,
    formula: "HOOC[CH2]2CH(NH2)COOH",
    name: "2-aminopentanedioic acid",
    type: "Amino Acid",
    commonName: "α-aminoglutaric acid / Glutamic acid (Glu)",
    chapter: "Chương 3: Amine - Amino acid - Peptide",
  },
  {
    id: 40,
    formula: "H2N-[CH2]5-COOH",
    name: "6-aminohexanoic acid",
    type: "Amino Acid",
    commonName: "ε-aminocaproic acid",
    chapter: "Chương 3: Amine - Amino acid - Peptide",
  },
  {
    id: 41,
    formula: "H2N-[CH2]6-COOH",
    name: "7-aminoheptanoic acid",
    type: "Amino Acid",
    commonName: "ω-aminoenanthic acid",
    chapter: "Chương 3: Amine - Amino acid - Peptide",
  },
  {
    id: 42,
    formula: "H2N-CH2-CONH-CH(CH3)-COOH",
    name: "Gly-Ala",
    type: "Peptide",
    commonName: "",
    chapter: "Chương 3: Amine - Amino acid - Peptide",
  },
  // --- CHƯƠNG 4: POLYMER ---
  {
    id: 43,
    formula: "(-CH2-CH2-)n",
    name: "Poly ethylene",
    type: "Chất dẻo",
    commonName: "PE",
    chapter: "Chương 4: Polymer",
  },
  {
    id: 44,
    formula: "(-CH2-CH(CH3)-)n",
    name: "Poly propylene",
    type: "Chất dẻo",
    commonName: "PP",
    chapter: "Chương 4: Polymer",
  },
  {
    id: 45,
    formula: "(-CH2-CH(C6H5)-)n",
    name: "Poly styrene",
    type: "Chất dẻo",
    commonName: "PS",
    chapter: "Chương 4: Polymer",
  },
  {
    id: 46,
    formula: "(-CH2-CHCl-)n",
    name: "Poly (vinyl chloride)",
    type: "Chất dẻo",
    commonName: "PVC",
    chapter: "Chương 4: Polymer",
  },
  {
    id: 47,
    formula: "(-CH2-C(CH3)(COOCH3)-)n",
    name: "Poly (methyl methacrylate)",
    type: "Chất dẻo",
    commonName: "PMM / Plexiglas / Thủy tinh hữu cơ",
    chapter: "Chương 4: Polymer",
  },
  {
    id: 48,
    formula: "(-C6H3(OH)CH2-)n",
    name: "Poly (phenol formaldehyde)",
    type: "Chất dẻo",
    commonName: "PPF",
    chapter: "Chương 4: Polymer",
  },
  {
    id: 49,
    formula: "(-NH[CH2]6NHCO[CH2]4CO-)n",
    name: "Poly (hexamethylene adipamide)",
    type: "Tơ",
    commonName: "Nylon-6,6",
    chapter: "Chương 4: Polymer",
  },
  {
    id: 50,
    formula: "(-NH[CH2]5CO-)n",
    name: "Poly caproamide",
    type: "Tơ",
    commonName: "capron",
    chapter: "Chương 4: Polymer",
  },
  {
    id: 51,
    formula: "(-CH2-CH(CN)-)n",
    name: "Poly acrylonitrile",
    type: "Tơ",
    commonName: "Tơ nitron / olon",
    chapter: "Chương 4: Polymer",
  },
  {
    id: 52,
    formula: "[C6H7O2(OH)(OCOCH3)2]n",
    name: "Cellulose diacetate",
    type: "Tơ",
    commonName: "",
    chapter: "Chương 4: Polymer",
  },
  {
    id: 53,
    formula: "[C6H7O2(OCOCH3)3]n",
    name: "Cellulose triacetate",
    type: "Tơ",
    commonName: "",
    chapter: "Chương 4: Polymer",
  },
  {
    id: 54,
    formula: "(-CH2-CH=CH-CH2-)n",
    name: "Cao su buna",
    type: "Cao su",
    commonName: "",
    chapter: "Chương 4: Polymer",
  },
  {
    id: 55,
    formula: "(-CH2-CH=CH-CH2-CH2-CH(C6H5)-)n",
    name: "Cao su buna-S",
    type: "Cao su",
    commonName: "",
    chapter: "Chương 4: Polymer",
  },
  {
    id: 56,
    formula: "(-CH2CH=CHCH2-CH2CH(CN)-)n",
    name: "Cao su buna-N",
    type: "Cao su",
    commonName: "",
    chapter: "Chương 4: Polymer",
  },
  {
    id: 57,
    formula: "(-CH2C(CH3)=CHCH2-)n",
    name: "Cao su isoprene",
    type: "Cao su",
    commonName: "",
    chapter: "Chương 4: Polymer",
  },
  {
    id: 58,
    formula: "(-CH2C(Cl)=CHCH2-)n",
    name: "Cao su chloroprene",
    type: "Cao su",
    commonName: "",
    chapter: "Chương 4: Polymer",
  },
  {
    id: 59,
    formula: "(-NHCONH-CH2-)n",
    name: "Keo dán poly(urea - formaldehyde)",
    type: "Keo dán",
    commonName: "",
    chapter: "Chương 4: Polymer",
  },
];
// --- HELPER COMPONENTS ---
const ChemicalFormula = ({ text, className = "" }) => {
  if (!text) return null;
  const parts = text.split(/(\d+|n)/);
  return (
    <span className={`font-mono tracking-wide ${className}`}>
      {parts.map((part, index) =>
        /^(\d+|n)$/.test(part) ? (
          <sub key={index} className="text-[0.75em] relative top-[0.2em]">
            {part}
          </sub>
        ) : (
          part
        )
      )}
    </span>
  );
};
// --- MODES ---
const FlashcardMode = () => {
  const [chapter, setChapter] = useState("All");
  const [queue, setQueue] = useState([]);
  const [masteredCount, setMasteredCount] = useState(0);
  const [totalSessionCards, setTotalSessionCards] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const startSession = (selectedChapter) => {
    let data = grade12Data;
    if (selectedChapter !== "All") {
      data = grade12Data.filter((c) => c.chapter === selectedChapter);
    }
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    setQueue(shuffled);
    setTotalSessionCards(shuffled.length);
    setMasteredCount(0);
    setIsFlipped(false);
    setIsFinished(false);
  };
  useEffect(() => {
    startSession("All");
  }, []);
  const handleNext = (mastered) => {
    setIsFlipped(false);
    setTimeout(() => {
      if (mastered) {
        setMasteredCount((prev) => prev + 1);
        setQueue((prev) => {
          const [, ...rest] = prev;
          if (rest.length === 0) setIsFinished(true);
          return rest;
        });
      } else {
        setQueue((prev) => {
          const [current, ...rest] = prev;
          return [...rest, current];
        });
      }
    }, 200);
  };
  const currentCard = queue[0];
  const progress =
    totalSessionCards > 0 ? (masteredCount / totalSessionCards) * 100 : 0;
  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center animate-in fade-in">
        {" "}
        <Trophy className="w-16 h-16 text-yellow-500 mb-4" />{" "}
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Hoàn Thành Chương!
        </h2>{" "}
        <p className="text-slate-500 mb-6">
          Bạn đã ôn tập xong {totalSessionCards} chất.
        </p>{" "}
        <button
          onClick={() => startSession(chapter)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg active:scale-95"
        >
          {" "}
          Học Lại{" "}
        </button>{" "}
      </div>
    );
  }
  if (!currentCard)
    return <div className="p-10 text-center">Đang tải dữ liệu...</div>;
  return (
    <div className="flex flex-col items-center w-full h-full max-w-md mx-auto p-4 pb-20">
      {" "}
      {/* Filter & Controls */}{" "}
      <div className="w-full mb-4 space-y-2">
        {" "}
        <div className="flex justify-between items-center">
          {" "}
          <select
            className="bg-white border border-slate-200 text-sm rounded-lg p-2 font-medium text-slate-700 max-w-[60%]"
            value={chapter}
            onChange={(e) => {
              setChapter(e.target.value);
              startSession(e.target.value);
            }}
          >
            {" "}
            <option value="All">Tất cả các chương</option>{" "}
            <option value="Chương 1: Ester-Lipid">Chương 1: Ester-Lipid</option>{" "}
            <option value="Chương 2: Carbohydrate">
              Chương 2: Carbohydrate
            </option>{" "}
            <option value="Chương 3: Amine - Amino acid - Peptide">
              Chương 3: Amine - Amino Acid - Peptide
            </option>{" "}
            <option value="Chương 4: Polymer">Chương 4: Polymer</option>{" "}
          </select>{" "}
          <div className="text-xs font-bold text-blue-600">
            {masteredCount}/{totalSessionCards}
          </div>{" "}
        </div>{" "}
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          {" "}
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />{" "}
        </div>{" "}
      </div>{" "}
      {/* Toggle Reverse */}{" "}
      <button
        onClick={() => {
          setIsReversed(!isReversed);
          setIsFlipped(false);
        }}
        className="mb-4 flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full"
      >
        {" "}
        <ArrowRightLeft className="w-3 h-3" />{" "}
        {isReversed ? "Chế độ: Tên -> Công thức" : "Chế độ: Công thức -> Tên"}{" "}
      </button>{" "}
      {/* Card */}{" "}
      <div
        className="relative w-full flex-1 min-h-[300px] perspective-1000 group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {" "}
        <div
          className={`relative w-full h-full transition-all duration-500 transform-style-3d cursor-pointer shadow-2xl rounded-3xl ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {" "}
          {/* FRONT */}{" "}
          <div className="absolute w-full h-full bg-white rounded-3xl border border-slate-100 flex flex-col items-center justify-center backface-hidden p-6">
            {" "}
            <div className="absolute top-4 left-4 px-2 py-1 bg-slate-50 rounded text-[10px] font-bold text-slate-400 uppercase">
              {currentCard.chapter}
            </div>{" "}
            <div className="text-sm uppercase tracking-widest text-slate-400 mb-4 font-bold">
              {" "}
              {isReversed ? "Tên gọi" : "Công thức"}{" "}
            </div>{" "}
            {isReversed ? (
              <h3 className="text-2xl font-bold text-slate-800 text-center">
                {currentCard.name}
              </h3>
            ) : (
              <ChemicalFormula
                text={currentCard.formula}
                className="text-2xl sm:text-3xl text-slate-800 font-bold text-center"
              />
            )}{" "}
            <div className="mt-8 text-blue-500 text-xs font-medium animate-pulse bg-blue-50 px-3 py-1 rounded-full">
              Chạm để lật
            </div>{" "}
          </div>{" "}
          {/* BACK */}{" "}
          <div className="absolute w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex flex-col items-center justify-center backface-hidden rotate-y-180 text-white p-6">
            {" "}
            <div className="text-sm uppercase tracking-widest text-blue-100 mb-2 font-bold">
              {" "}
              {isReversed ? "Công thức" : "Tên IUPAC"}{" "}
            </div>{" "}
            {isReversed ? (
              <ChemicalFormula
                text={currentCard.formula}
                className="text-4xl font-bold mb-4"
              />
            ) : (
              <h3 className="text-2xl font-bold mb-4 text-center">
                {currentCard.name}
              </h3>
            )}{" "}
            {currentCard.commonName && (
              <div className="mt-2 bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm text-center">
                {" "}
                <div className="text-[10px] opacity-70 uppercase tracking-wide">
                  Tên thường / Khác
                </div>{" "}
                <div className="text-lg font-medium text-yellow-300">
                  {currentCard.commonName}
                </div>{" "}
              </div>
            )}{" "}
            <div className="mt-4 inline-block bg-black/20 px-2 py-1 rounded text-xs">
              Loại: {currentCard.type}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* Actions - Only show when flipped */}{" "}
      <div
        className={`w-full grid grid-cols-2 gap-3 mt-6 transition-opacity duration-300 ${
          isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {" "}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext(false);
          }}
          className="bg-red-100 text-red-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95"
        >
          {" "}
          <RotateCcw className="w-4 h-4" /> Chưa thuộc{" "}
        </button>{" "}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext(true);
          }}
          className="bg-green-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-200 active:scale-95"
        >
          {" "}
          <Check className="w-4 h-4" /> Đã thuộc{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
};
const QuizMode = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const [history, setHistory] = useState([]);

  // 1. Khởi tạo đề thi & Lịch sử
  useEffect(() => {
    const chapters = [...new Set(grade12Data.map((item) => item.chapter))];
    let selectedQuestions = [];

    // Đảm bảo mỗi chương có ít nhất 1 câu
    chapters.forEach((ch) => {
      const chapterItems = grade12Data.filter((item) => item.chapter === ch);
      if (chapterItems.length > 0) {
        selectedQuestions.push(
          chapterItems[Math.floor(Math.random() * chapterItems.length)]
        );
      }
    });

    // Lấy thêm cho đủ 10 câu
    const remainingPool = grade12Data.filter(
      (item) => !selectedQuestions.find((sq) => sq.id === item.id)
    );
    const extra = remainingPool
      .sort(() => 0.5 - Math.random())
      .slice(0, 10 - selectedQuestions.length);

    setQuizQuestions(
      [...selectedQuestions, ...extra].sort(() => 0.5 - Math.random())
    );

    // Tải lịch sử
    const saved = JSON.parse(localStorage.getItem("quiz_history") || "[]");
    setHistory(saved);
  }, []);

  // 2. Logic Đếm ngược
  useEffect(() => {
    if (finished || quizQuestions.length === 0) return;

    if (timeLeft <= 0) {
      handleFinish(score);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, finished, quizQuestions]);

  const handleFinish = (finalScore) => {
    setFinished(true);
    const newEntry = {
      score: finalScore,
      date: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
      }),
    };
    const updatedHistory = [newEntry, ...history].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem("quiz_history", JSON.stringify(updatedHistory));
  };

  const handleSelect = (opt) => {
    if (selected || finished) return;
    setSelected(opt);

    const isCorrect = opt.id === quizQuestions[currentQ].id;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);

    setTimeout(() => {
      if (currentQ < quizQuestions.length - 1) {
        setCurrentQ((prev) => prev + 1);
        setSelected(null);
      } else {
        handleFinish(newScore);
      }
    }, 800);
  };

  // 3. Tạo phương án trả lời (Dùng useMemo để không bị reset khi đồng hồ chạy)
  const currentQuestion = quizQuestions[currentQ];
  const options = useMemo(() => {
    if (!currentQuestion) return [];
    const wrong = grade12Data
      .filter((i) => i.id !== currentQuestion.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    return [...wrong, currentQuestion].sort(() => 0.5 - Math.random());
  }, [currentQ, quizQuestions]); // Chỉ tính lại khi đổi câu hỏi

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const rs = s % 60;
    return `${m}:${rs < 10 ? "0" : ""}${rs}`;
  };

  // Giao diện kết thúc
  if (finished)
    return (
      <div className="flex flex-col items-center p-6 w-full max-w-md mx-auto animate-in fade-in">
        <Trophy className="w-16 h-16 text-yellow-500 mb-2" />
        <h2 className="text-2xl font-bold text-slate-800">Kết quả</h2>
        <div className="text-5xl font-black text-blue-600 my-4">{score}/10</div>

        <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
            <RotateCcw className="w-3 h-3" /> 5 lần gần nhất
          </h3>
          {history.map((entry, i) => (
            <div
              key={i}
              className="flex justify-between py-2 border-b border-slate-50 last:border-0 text-sm"
            >
              <span className="text-slate-500">{entry.date}</span>
              <span className="font-bold text-slate-700">{entry.score}/10</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => window.location.reload()}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95"
        >
          Làm đề mới
        </button>
      </div>
    );

  if (quizQuestions.length === 0)
    return <div className="p-10 text-center">Đang tải câu hỏi...</div>;

  return (
    <div className="w-full max-w-md mx-auto p-4 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full font-bold text-xs ${
            timeLeft < 30
              ? "bg-red-100 text-red-600 animate-pulse"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          <Clock className="w-3 h-3" /> {formatTime(timeLeft)}
        </div>
        <div className="text-sm font-bold text-blue-600">Đúng: {score}</div>
      </div>

      <div className="w-full h-1.5 bg-slate-200 rounded-full mb-6">
        <div
          className="h-full bg-blue-500 transition-all"
          style={{ width: `${((currentQ + 1) / 10) * 100}%` }}
        />
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl mb-6 text-center">
        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">
          {currentQuestion.chapter}
        </div>
        <div className="text-xs text-slate-400 mb-4 uppercase">
          Câu {currentQ + 1}: Chất này tên là gì?
        </div>
        <ChemicalFormula
          text={currentQuestion.formula}
          className="text-2xl font-bold text-slate-800"
        />
      </div>

      <div className="grid gap-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt)}
            disabled={!!selected}
            className={`p-4 rounded-2xl font-bold text-left transition-all border-2 ${
              selected
                ? opt.id === currentQuestion.id
                  ? "bg-green-500 border-green-500 text-white"
                  : opt === selected
                  ? "bg-red-500 border-red-500 text-white"
                  : "bg-white border-slate-100 text-slate-200"
                : "bg-white border-slate-100 text-slate-600 hover:border-blue-200"
            }`}
          >
            {opt.name}
          </button>
        ))}
      </div>
    </div>
  );
};
const DictionaryMode = () => {
  const [search, setSearch] = useState("");
  const filtered = grade12Data.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.formula.toLowerCase().includes(search.toLowerCase()) ||
      (c.commonName &&
        c.commonName.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div className="flex flex-col h-full p-4 max-w-md mx-auto pb-20">
      {" "}
      <div className="relative mb-4">
        {" "}
        <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />{" "}
        <input
          type="text"
          placeholder="Tìm: Ester, Glucose, Ala..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />{" "}
      </div>{" "}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {" "}
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex justify-between items-center"
          >
            {" "}
            <div>
              {" "}
              <div className="font-bold text-blue-700">
                <ChemicalFormula text={item.formula} />
              </div>{" "}
              <div className="font-bold text-slate-800 text-sm">
                {item.name}
              </div>{" "}
              {item.commonName && (
                <div className="text-xs text-slate-500 italic">
                  {item.commonName}
                </div>
              )}{" "}
            </div>{" "}
            <div className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded uppercase max-w-[80px] text-right">
              {item.type}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
};
// --- APP SHELL ---
const App = () => {
  const [tab, setTab] = useState("learn");
  return (
    <div className="fixed inset-0 bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Header */}
      <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-center shrink-0 z-10">
        {" "}
        <div className="flex items-center gap-2 font-bold text-lg text-slate-800">
          <FlaskConical className="w-6 h-6 text-blue-600" />
          Hóa 12{" "}
          <span className="text-blue-600 text-xs border border-blue-600 px-1 rounded ml-1">
            2018
          </span>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 overflow-hidden relative">
        {tab === "learn" && <FlashcardMode />}
        {tab === "quiz" && <QuizMode />}
        {tab === "dict" && <DictionaryMode />}
      </div>
      {/* Bottom Tab Bar (Mobile Style) */}
      <div className="h-16 bg-white border-t border-slate-200 flex justify-around items-center shrink-0 pb-safe z-20">
        <TabItem
          icon={<BookOpen className="w-6 h-6" />}
          label="Học bài"
          active={tab === "learn"}
          onClick={() => setTab("learn")}
        />
        <TabItem
          icon={<BrainCircuit className="w-6 h-6" />}
          label="Kiểm tra"
          active={tab === "quiz"}
          onClick={() => setTab("quiz")}
        />
        <TabItem
          icon={<Search className="w-6 h-6" />}
          label="Tra cứu"
          active={tab === "dict"}
          onClick={() => setTab("dict")}
        />
      </div>
    </div>
  );
};
const TabItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
      active ? "text-blue-600" : "text-slate-400"
    }`}
  >
    {icon}
    <span className="text-[10px] font-bold mt-1">{label}</span>
  </button>
);
export default App;
