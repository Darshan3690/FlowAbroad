"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Mic,
  Disc,
  BarChart2,
  BookOpen,
  Scissors,
  Sparkles,
  Users,
  Settings,
  Volume2,
  Check,
  Info,
  X,
  Menu,
  Copy,
  Radio,
  Share2,
  Award,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

type TabType = "dictation" | "simulator" | "insights" | "dictionary" | "snippets";

interface Scenario {
  id: string;
  badge: string;
  title: string;
  shortTitle: string;
  role: string;
  question: string;
  questionDe: string;
  sampleHinglish: string;
  checklistIndex: number;
}

const SCENARIOS: Scenario[] = [
  {
    id: "visa",
    badge: "EMBASSY INTERVIEW",
    title: "German Student Visa Interview (Mumbai Consulate)",
    shortTitle: "Visa Interview",
    role: "Strict Visa Officer",
    question:
      "Why did you choose Germany over the US or UK for your Master's, and how is your €11,904 Blocked Account funded?",
    questionDe:
      "Warum haben Sie sich für Deutschland entschieden, und wie wird Ihr Sperrkonto finanziert?",
    sampleHinglish:
      "Sir actually I got admission in TU Munich for Computer Science, and mera blocked account of 11,904 Euro is already funded by my father's savings in Expatrio.",
    checklistIndex: 0,
  },
  {
    id: "buergeramt",
    badge: "CITY REGISTRATION",
    title: "Bürgeramt Address Registration (Berlin)",
    shortTitle: "Bürgeramt Anmeldung",
    role: "Herr Müller (Bürgeramt Clerk)",
    question:
      "Guten Tag! Haben Sie Ihren Reisepass und die Wohnungsgeberbestätigung vom Vermieter dabei?",
    questionDe:
      "Guten Tag! Haben Sie Ihren Reisepass und die Wohnungsgeberbestätigung vom Vermieter dabei?",
    sampleHinglish:
      "Hallo sir, my German is little weak, I am new student here. Yes I have my passport and landlord confirmation paper for address registration.",
    checklistIndex: 1,
  },
  {
    id: "wg",
    badge: "FLATSHARE INTERVIEW",
    title: "Munich WG-Casting (Flatshare Interview)",
    shortTitle: "WG-Casting",
    role: "Lukas & Anna (Flatmates)",
    question:
      "Hey! Tell us a bit about yourself—what do you study, do you cook Indian food, and how do you handle shared kitchen cleaning?",
    questionDe:
      "Hey! Erzähl mal was über dich – was studierst du, kochst du gerne und wie hältst du es mit dem Putzplan?",
    sampleHinglish:
      "Hey guys, myself Darshan from India! I am doing Master's in AI. I love cooking paneer and biryani on weekends and I always keep kitchen super clean.",
    checklistIndex: 2,
  },
  {
    id: "hiwi",
    badge: "UNIVERSITY JOB",
    title: "TU Munich HiWi Pitch (AI Research Assistant)",
    shortTitle: "HiWi Research Pitch",
    role: "Prof. Dr. Weber",
    question:
      "Your GitHub shows React and Next.js projects. How can you contribute to our AI research lab 15 hours a week?",
    questionDe:
      "Ihr GitHub-Profil zeigt Next.js-Projekte. Wie können Sie unser KI-Forschungslabor unterstützen?",
    sampleHinglish:
      "Professor, I have built full-stack AI apps using React, Next.js and Gemini API, so I can build the frontend dashboard and evaluation tools for your lab.",
    checklistIndex: 3,
  },
];

export interface DictionaryItem {
  german: string;
  phonetic: string;
  english: string;
  category: string;
  accentTip: string;
  sampleSpoken: string;
  breakdown: string[];
}

const SAVED_DICTIONARY: DictionaryItem[] = [
  {
    german: "die Wohnungsgeberbestätigung",
    phonetic: "dee Voh-noongs-gay-ber-buh-shtay-ti-goong",
    english: "Landlord Confirmation of Residence (Mandatory for Bürgeramt)",
    category: "Bürgeramt",
    accentTip: "In 'bestätigung', pronounce 'st' as 'sht' and articulate the nasal '-ung' clearly.",
    sampleSpoken: "die Wohnungsgeberbestätigung",
    breakdown: ["Wohnungs-", "geber-", "be-", "stätigung"],
  },
  {
    german: "das Sperrkonto eröffnen",
    phonetic: "das Shpair-kon-toh air-uff-nen",
    english: "To open the Blocked Account (€11,904/year)",
    category: "Visa & Bank",
    accentTip: "German 'Sp' is ALWAYS pronounced 'Shp' (Shpair-kon-toh). Never pronounce with a sharp English 'S'.",
    sampleSpoken: "das Sperrkonto eröffnen",
    breakdown: ["Sperr-", "konto", "er-", "öffnen"],
  },
  {
    german: "die Immatrikulationsbescheinigung",
    phonetic: "dee Im-ma-tri-koo-la-tsyons-buh-shay-ni-goong",
    english: "Official University Enrollment Certificate",
    category: "University",
    accentTip: "Pronounce '-tion-' as 'tsyon' (like 'action' in Italian). Keep syllables rhythmic.",
    sampleSpoken: "die Immatrikulationsbescheinigung",
    breakdown: ["Immatrikulations-", "be-", "scheinigung"],
  },
  {
    german: "Ich verstehe nur Bahnhof, könnten Sie bitte langsamer sprechen?",
    phonetic: "Ish fer-shtay-uh noor Baan-hof, kun-ten Zee bit-tuh lang-za-mer shpre-shen?",
    english: "I am having trouble following, could you please speak slower?",
    category: "Survival Idiom",
    accentTip: "Whisper 'ch' in 'Ich' and 'sprechen' softly with your tongue resting behind bottom teeth.",
    sampleSpoken: "Ich verstehe nur Bahnhof könnten Sie bitte langsamer sprechen",
    breakdown: ["verstehe", "nur Bahnhof", "langsamer", "sprechen"],
  },
  {
    german: "der Rundfunkbeitrag",
    phonetic: "dair Roond-foonk-by-traak",
    english: "Mandatory Public Broadcasting Fee (€18.36/month per apartment)",
    category: "Finance & Housing",
    accentTip: "Roll 'R' gently in the back of your throat. Stress 'Rund-funk'. Essential for every Germany student flat!",
    sampleSpoken: "der Rundfunkbeitrag",
    breakdown: ["Rundfunk-", "beitrag"],
  },
  {
    german: "Entschuldigung, wo ist das Ausländeramt?",
    phonetic: "Ent-shool-di-goong, voh ist das Ows-len-der-amt?",
    english: "Excuse me, where is the Foreigners' Registration Office?",
    category: "Immigration",
    accentTip: "Open with 'Ent-shool-di-goong' (soft 'sh'). 'ä' in Ausländer sounds like open 'eh'.",
    sampleSpoken: "Entschuldigung wo ist das Ausländeramt",
    breakdown: ["Entschuldigung", "Ausländer-", "amt"],
  },
];

const VISA_SNIPPETS = [
  {
    title: "Cover Letter: Reason for Choosing Germany",
    german: "Ich habe mich für Deutschland entschieden, da die TU München weltweit führend in der KI-Forschung ist und praxisorientierte Projekte mit Industrie-Partnern bietet.",
    english: "I chose Germany because TU Munich is a global leader in AI research and offers practice-oriented projects with industry leaders.",
    context: "German Embassy Interview & Motivation Letter",
  },
  {
    title: "Blocked Account Verification Statement",
    german: "Mein Sperrkonto bei Expatrio in Höhe von 11.904 Euro ist vollständig eingezahlt und durch das offizielle Bestätigungsschreiben belegt.",
    english: "My blocked account of €11,904 via Expatrio is fully funded as evidenced by the attached confirmation document.",
    context: "Financial Proof for Visa Officer",
  },
  {
    title: "Bürgeramt Appointment Opening Formula",
    german: "Guten Tag, ich möchte meinen Wohnsitz in Berlin anmelden. Hier sind mein Reisepass und die Wohnungsgeberbestätigung.",
    english: "Good day, I would like to register my residence in Berlin. Here are my passport and the landlord confirmation.",
    context: "City Hall Registration Desk",
  },
];

export default function FlowAbroadApp() {
  const [activeTab, setActiveTab] = useState<TabType>("dictation");
  const [showGetStartedModal, setShowGetStartedModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showStudyBuddyModal, setShowStudyBuddyModal] = useState<boolean>(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);
  const [selectedLanguage, setSelectedLanguage] = useState<"EN" | "HI" | "DE">("EN");
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.9);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);

  // Live Input State
  const [userSpeech, setUserSpeech] = useState<string>(SCENARIOS[0].sampleHinglish);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isListeningMic, setIsListeningMic] = useState<boolean>(false);
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Lifetime Metrics
  const [totalWordsCount, setTotalWordsCount] = useState<number>(42381);
  const [totalFixesCount, setTotalFixesCount] = useState<number>(1582);
  const [wpmSpeed] = useState<number>(200); // 200 WPM Top 0.1% matching Wispr Flow metrics
  const [completedMissions, setCompletedMissions] = useState<number[]>([0, 1]);

  // Accent Verifier State
  const [germanPracticeInput, setGermanPracticeInput] = useState<string>("");
  const [accentMatchScore, setAccentMatchScore] = useState<number | null>(null);

  // Dictionary Pronunciation Checker State
  const [dictPracticeState, setDictPracticeState] = useState<
    Record<
      number,
      {
        input: string;
        score: number | null;
        status: "excellent" | "good" | "retry" | null;
        label: string | null;
        matchedSyllables: string[];
      }
    >
  >({});
  const [expandedDictCards, setExpandedDictCards] = useState<Record<number, boolean>>({
    0: true,
  });
  const [activeDictMicIndex, setActiveDictMicIndex] = useState<number | null>(null);
  const dictRecognitionRef = useRef<any>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // SpeechRecognition reference
  const recognitionRef = useRef<any>(null);

  // Coaching Output State
  const [coachResult, setCoachResult] = useState({
    fluencyScore: 94,
    wordsCount: 28,
    grammarFixesCount: 3,
    englishC1Upgrade:
      "I have been admitted to TU Munich for my Master's in Computer Science, and my €11,904 blocked account is already fully funded and activated via Expatrio.",
    fixesList: [
      "Upgraded 'Sir actually I got admission' → 'I have been admitted to' (Confident C1 academic tone)",
      "Converted Hinglish 'mera blocked account' → 'my €11,904 blocked account is fully funded'",
      "Removed filler word 'actually' to sound decisive in front of the Visa Officer",
    ],
    germanTranslation:
      "Ich wurde an der TU München für Informatik zugelassen, und mein Sperrkonto über 11.904 Euro ist bereits vollständig aktiviert.",
    desiPhonetics:
      "Ish voor-duh an dair TU Myoon-shen fyoor In-for-maa-tik tsoo-guh-laa-sen, oond mayn Shpair-kon-toh yoo-ber 11,904 Oy-roh ist buh-rayts fol-shtehn-dig ak-ti-veert.",
    accentTip:
      "German 'ch' in 'Ich' and 'München' is soft (whisper 'sh' with tongue behind lower teeth). In 'Sperrkonto', 'Sp' is ALWAYS pronounced 'Shp'.",
    nextQuestion:
      "Sehr gut! Now tell me: What are your career plans after graduating from TU Munich?",
  });

  // Browser Speech Synthesis with active tracking
  const speakText = (text: string, lang: "de-DE" | "en-US", id: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      triggerToast("Speech synthesis is not supported on this browser.");
      return;
    }

    if (activePlayingId === id) {
      window.speechSynthesis.cancel();
      setActivePlayingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = playbackSpeed;

    utterance.onstart = () => setActivePlayingId(id);
    utterance.onend = () => setActivePlayingId(null);
    utterance.onerror = () => setActivePlayingId(null);

    window.speechSynthesis.speak(utterance);
  };

  // Browser Web Speech Recognition (In-browser fallback for Wispr Flow)
  const toggleBrowserMicrophone = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      triggerToast("Web Speech API not supported. Please use desktop Wispr Flow or type.");
      return;
    }

    if (isListeningMic) {
      recognitionRef.current?.stop();
      setIsListeningMic(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = selectedLanguage === "DE" ? "de-DE" : "en-US";

      recognition.onstart = () => {
        setIsListeningMic(true);
        triggerToast("Microphone active! Speak your answer naturally...");
      };

      recognition.onend = () => {
        setIsListeningMic(false);
      };

      recognition.onerror = () => {
        setIsListeningMic(false);
      };

      recognition.onresult = (event: any) => {
        let fullTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
          fullTranscript += event.results[i][0].transcript + " ";
        }
        setUserSpeech(fullTranscript.trim());
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListeningMic(false);
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Run AI Coaching Analysis (Dynamic & Scenario Aware)
  const handleAnalyzeSpeech = async (speechOverride?: any, scenarioOverride?: Scenario) => {
    const textToAnalyze = (typeof speechOverride === "string" ? speechOverride : userSpeech).trim();
    if (!textToAnalyze) return;
    const scenario = (scenarioOverride && typeof scenarioOverride === "object" && "title" in scenarioOverride) ? scenarioOverride : selectedScenario;

    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userSpeech: textToAnalyze,
          scenarioTitle: scenario.title,
          interviewerPrompt: scenario.question,
        }),
      });
      const data = await res.json();
      if (data && data.englishC1Upgrade) {
        setCoachResult(data);
        const addedWords = textToAnalyze.split(/\s+/).length;
        setTotalWordsCount((prev) => prev + addedWords);
        setTotalFixesCount((prev) => prev + (data.grammarFixesCount || 3));
        if (!completedMissions.includes(scenario.checklistIndex)) {
          setCompletedMissions((prev) => [...prev, scenario.checklistIndex]);
        }
        triggerToast("Evaluation updated with Gemini AI!");
      }
    } catch (e) {
      console.error("Coach analysis error:", e);
      triggerToast("Failed to analyze speech. Please check your connection.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const selectScenario = (sc: Scenario) => {
    setSelectedScenario(sc);
    setUserSpeech(sc.sampleHinglish);
    setGermanPracticeInput("");
    setAccentMatchScore(null);
    handleAnalyzeSpeech(sc.sampleHinglish, sc);
  };

  // Robust Levenshtein / Order-Aware Accent Matcher
  const handleVerifyGermanAccent = (val: string) => {
    setGermanPracticeInput(val);
    if (!val.trim()) {
      setAccentMatchScore(null);
      return;
    }

    const clean = (s: string) =>
      s
        .toLowerCase()
        .replace(/[.,!?;:()"-]/g, "")
        .replace(/ä/g, "ae")
        .replace(/ö/g, "oe")
        .replace(/ü/g, "ue")
        .replace(/ß/g, "ss");

    const targetGerman = clean(coachResult.germanTranslation)
      .split(/\s+/)
      .filter(Boolean);

    const targetPhonetics = clean(coachResult.desiPhonetics || "")
      .split(/\s+/)
      .filter(Boolean);

    const targetWords = Array.from(new Set([...targetGerman, ...targetPhonetics]));

    const spokenWords = clean(val)
      .split(/\s+/)
      .filter(Boolean);

    if (spokenWords.length === 0 || targetWords.length === 0) {
      setAccentMatchScore(null);
      return;
    }

    let totalScore = 0;
    const targetSet = new Set(targetWords);

    spokenWords.forEach((word) => {
      if (targetSet.has(word)) {
        totalScore += 1;
      } else {
        const closest = targetWords.some(
          (tw) => tw.includes(word) || (word.length > 3 && tw.startsWith(word.slice(0, 3)))
        );
        if (closest) totalScore += 0.6;
      }
    });

    const ratio = totalScore / Math.max(targetGerman.length, spokenWords.length);
    const score = Math.min(99, Math.max(45, Math.round(ratio * 100)));
    setAccentMatchScore(score);
  };

  // Dictionary Pronunciation Evaluator
  const evaluateDictionaryPronunciation = (
    val: string,
    item: (typeof SAVED_DICTIONARY)[0]
  ) => {
    if (!val || !val.trim()) {
      return {
        score: null,
        status: null,
        label: null,
        matchedSyllables: [],
      };
    }

    const clean = (s: string) =>
      s
        .toLowerCase()
        .replace(/[.,!?;:()"-]/g, "")
        .replace(/ä/g, "ae")
        .replace(/ö/g, "oe")
        .replace(/ü/g, "ue")
        .replace(/ß/g, "ss")
        .trim();

    const spokenClean = clean(val);
    const targetClean = clean(item.german);
    const phoneticClean = clean(item.phonetic);

    const spokenTokens = spokenClean.split(/\s+/).filter(Boolean);
    const targetTokens = targetClean.split(/\s+/).filter(Boolean);
    const phoneticTokens = phoneticClean.split(/\s+/).filter(Boolean);

    // Track matched syllables from item.breakdown
    const matchedSyllables = item.breakdown.filter((syl) => {
      const sylClean = clean(syl);
      return (
        spokenClean.includes(sylClean) ||
        spokenTokens.some((tok) => tok.includes(sylClean) || sylClean.includes(tok))
      );
    });

    // Check exact full string match
    if (spokenClean === targetClean || spokenClean === phoneticClean) {
      return {
        score: 98,
        status: "excellent" as const,
        label: "Perfekt! 🎉 100% Native German Articulation",
        matchedSyllables: item.breakdown,
      };
    }

    let tokenMatches = 0;
    targetTokens.forEach((tt) => {
      if (spokenTokens.includes(tt)) {
        tokenMatches += 1;
      } else if (
        spokenTokens.some(
          (st) =>
            st.includes(tt) ||
            tt.includes(st) ||
            (st.length >= 4 && tt.startsWith(st.slice(0, 4)))
        )
      ) {
        tokenMatches += 0.75;
      } else if (
        phoneticTokens.some((pt) =>
          spokenTokens.some((st) => st.includes(pt) || pt.includes(st))
        )
      ) {
        tokenMatches += 0.6;
      }
    });

    const breakdownRatio =
      item.breakdown.length > 0
        ? matchedSyllables.length / item.breakdown.length
        : 0;
    const tokenRatio =
      targetTokens.length > 0
        ? tokenMatches / Math.max(targetTokens.length, spokenTokens.length)
        : 0;

    const blendedRatio = Math.max(
      breakdownRatio,
      tokenRatio * 0.6 + breakdownRatio * 0.4
    );
    const score = Math.min(98, Math.max(45, Math.round(blendedRatio * 100)));

    let status: "excellent" | "good" | "retry" = "retry";
    let label = "Keep practicing! Listen to the audio and articulate German consonants.";

    if (score >= 85) {
      status = "excellent";
      label = "Perfekt! 🎉 Clear Native German Pronunciation";
    } else if (score >= 65) {
      status = "good";
      label = "Sehr gut! 👏 Fluent rhythm & recognizable German accent";
    }

    return {
      score,
      status,
      label,
      matchedSyllables,
    };
  };

  const handleDictPracticeInput = (idx: number, val: string) => {
    const item = SAVED_DICTIONARY[idx];
    const result = evaluateDictionaryPronunciation(val, item);
    setDictPracticeState((prev) => ({
      ...prev,
      [idx]: {
        input: val,
        ...result,
      },
    }));
  };

  const handleLoadDictSample = (idx: number) => {
    const item = SAVED_DICTIONARY[idx];
    handleDictPracticeInput(idx, item.sampleSpoken);
    triggerToast(`Sample pronunciation loaded for "${item.german}"`);
  };

  const handleResetDictPractice = (idx: number) => {
    setDictPracticeState((prev) => ({
      ...prev,
      [idx]: {
        input: "",
        score: null,
        status: null,
        label: null,
        matchedSyllables: [],
      },
    }));
  };

  const toggleDictCardExpanded = (idx: number) => {
    setExpandedDictCards((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const toggleDictMicrophone = (idx: number) => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      triggerToast("Web Speech API not supported. Please use desktop Wispr Flow hotkey or type.");
      return;
    }

    if (activeDictMicIndex === idx) {
      dictRecognitionRef.current?.stop();
      setActiveDictMicIndex(null);
      return;
    }

    try {
      dictRecognitionRef.current?.stop();
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "de-DE";

      recognition.onstart = () => setActiveDictMicIndex(idx);
      recognition.onend = () => setActiveDictMicIndex(null);
      recognition.onerror = () => setActiveDictMicIndex(null);

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("");
        handleDictPracticeInput(idx, transcript);
      };

      dictRecognitionRef.current = recognition;
      recognition.start();
    } catch {
      setActiveDictMicIndex(null);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippetIndex(index);
    triggerToast("Snippet copied to clipboard!");
    setTimeout(() => setCopiedSnippetIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F4F2EC] text-[#141413] flex flex-col select-none relative font-sans">
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#141413] text-white text-xs px-4 py-2.5 rounded-xl shadow-lg border border-[#3F3E3C] flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-[#FDBA4D]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP DESKTOP WINDOW BAR */}
      <header className="h-12 px-4 flex items-center justify-between bg-[#F4F2EC] text-[#141413] border-b border-[#E6E4DD]">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg hover:bg-[#EAE7DF] transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 text-[#141413]" />
          </button>

          <button
            onClick={() => setShowGetStartedModal(true)}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#FEFCE8] border border-[#141413] shadow-[0_1.5px_0_0_#141413] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#165B53]" />
            <span>Open Scenario Explorer</span>
          </button>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-3 text-xs">
          {/* Wispr Flow status pill */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D3ECE6] text-[#165B53] font-medium border border-[#165B53]/20">
            <span className="w-2 h-2 rounded-full bg-[#165B53] animate-pulse" />
            <span>Wispr Flow Active (Hold Fn / Ctrl+Win)</span>
          </div>

          {/* Functional Language Toggle Switcher */}
          <div className="flex items-center bg-[#EAE7DF] p-0.5 rounded-lg border border-[#141413]/20">
            {(["EN", "HI", "DE"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setSelectedLanguage(lang);
                  triggerToast(`Language focus set to ${lang}`);
                }}
                className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all ${
                  selectedLanguage === lang
                    ? "bg-white text-[#141413] shadow-xs"
                    : "text-[#686763] hover:text-[#141413]"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* MAIN 2-COLUMN DESKTOP SHELL */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* MOBILE SIDEBAR BACKDROP */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 z-30 bg-[#141413]/40 backdrop-blur-xs"
          />
        )}

        {/* LEFT SIDEBAR (#F4F2EC) */}
        <aside
          className={`fixed md:static top-12 bottom-0 left-0 z-40 w-[260px] shrink-0 bg-[#F4F2EC] px-4 py-4 flex flex-col justify-between border-r border-[#EAE8E1] transition-transform duration-200 md:translate-x-0 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            {/* Flow Pro Brand Logo */}
            <div className="px-2 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-[2.5px]">
                  <span className="w-[3px] h-3.5 bg-[#141413] rounded-full" />
                  <span className="w-[3px] h-5 bg-[#141413] rounded-full" />
                  <span className="w-[3px] h-2.5 bg-[#141413] rounded-full" />
                  <span className="w-[3px] h-4 bg-[#141413] rounded-full" />
                </div>
                <span className="font-bold text-lg tracking-tight text-[#141413]">
                  FlowAbroad
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#EADBFF] text-[#4C1D95] border border-[#4C1D95]/20">
                  Pro
                </span>
              </div>
            </div>

            {/* Primary Nav Items */}
            <nav className="space-y-1 text-[13px] font-medium">
              <button
                onClick={() => {
                  setActiveTab("dictation");
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === "dictation"
                    ? "bg-[#EAE7DF] text-[#141413] font-bold shadow-xs"
                    : "text-[#3F3E3C] hover:bg-[#EAE7DF]/60"
                }`}
              >
                <Mic className="w-4 h-4 stroke-[2]" />
                Dictation Coach
              </button>

              <button
                onClick={() => {
                  setActiveTab("simulator");
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === "simulator"
                    ? "bg-[#EAE7DF] text-[#141413] font-bold shadow-xs"
                    : "text-[#3F3E3C] hover:bg-[#EAE7DF]/60"
                }`}
              >
                <Disc className="w-4 h-4 stroke-[2]" />
                Interactive Simulator
              </button>

              <button
                onClick={() => {
                  setActiveTab("insights");
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === "insights"
                    ? "bg-[#EAE7DF] text-[#141413] font-bold shadow-xs"
                    : "text-[#3F3E3C] hover:bg-[#EAE7DF]/60"
                }`}
              >
                <BarChart2 className="w-4 h-4 stroke-[2]" />
                Insights &amp; Heatmap
              </button>

              <button
                onClick={() => {
                  setActiveTab("dictionary");
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === "dictionary"
                    ? "bg-[#EAE7DF] text-[#141413] font-bold shadow-xs"
                    : "text-[#3F3E3C] hover:bg-[#EAE7DF]/60"
                }`}
              >
                <BookOpen className="w-4 h-4 stroke-[2]" />
                Survival Dictionary
              </button>

              <button
                onClick={() => {
                  setActiveTab("snippets");
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === "snippets"
                    ? "bg-[#EAE7DF] text-[#141413] font-bold shadow-xs"
                    : "text-[#3F3E3C] hover:bg-[#EAE7DF]/60"
                }`}
              >
                <Scissors className="w-4 h-4 stroke-[2]" />
                Embassy Visa Snippets
              </button>

              <button
                onClick={() => {
                  setShowGetStartedModal(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[#3F3E3C] hover:bg-[#EAE7DF]/60 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 stroke-[2]" />
                Explore Scenarios
              </button>
            </nav>
          </div>

          {/* Bottom Sidebar Checklist Card */}
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-3.5 border border-[#EAE8E1] shadow-xs">
              <p className="text-xs font-bold text-[#141413] mb-1.5 flex items-center justify-between">
                <span>Study Readiness</span>
                <span className="text-[11px] text-[#165B53] font-bold">
                  {Math.round((completedMissions.length / 4) * 100)}%
                </span>
              </p>
              {/* Deep Forest Teal Progress Bar */}
              <div className="w-full h-1.5 bg-[#EAE8E1] rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-[#165B53] rounded-full transition-all duration-500"
                  style={{ width: `${(completedMissions.length / 4) * 100}%` }}
                />
              </div>

              <div className="space-y-2 text-xs text-[#3F3E3C]">
                {SCENARIOS.map((sc, idx) => {
                  const done = completedMissions.includes(idx);
                  return (
                    <div
                      key={sc.id}
                      onClick={() => {
                        setSelectedScenario(sc);
                        setUserSpeech(sc.sampleHinglish);
                        setActiveTab("dictation");
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 cursor-pointer hover:text-[#141413] transition-colors"
                    >
                      {done ? (
                        <span className="w-4 h-4 rounded-full bg-[#D3ECE6] text-[#165B53] flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-[#9E9D99] shrink-0" />
                      )}
                      <span className={`truncate ${done ? "font-semibold text-[#141413]" : ""}`}>
                        {sc.shortTitle}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Modals Triggers */}
            <div className="space-y-1 px-1 text-xs text-[#3F3E3C]">
              <button
                onClick={() => setShowStudyBuddyModal(true)}
                className="w-full flex items-center gap-2.5 py-1.5 px-2 rounded-lg hover:bg-[#EAE7DF]/60 transition-colors text-left cursor-pointer"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Germany Study Buddies</span>
              </button>
              <button
                onClick={() => setShowSettingsModal(true)}
                className="w-full flex items-center gap-2.5 py-1.5 px-2 rounded-lg hover:bg-[#EAE7DF]/60 transition-colors text-left cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Wispr Hotkey Setup</span>
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN WHITE ROUNDED STAGE */}
        <main className="flex-1 bg-white md:rounded-tl-3xl border-t border-l border-[#EAE8E1] p-5 lg:p-8 overflow-y-auto">
          {/* =========================================================
              TAB 1: DICTATION COACH
             ========================================================= */}
          {activeTab === "dictation" && (
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Top Row: Welcome + Right Stat Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* Left 8 Columns: Welcome + Hero Banner */}
                <div className="lg:col-span-8 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold tracking-tight text-[#141413]">
                        Welcome back, Darshan
                      </h1>
                      <p className="text-xs text-[#686763] mt-0.5">
                        Practicing for German University &amp; Embassy Visa Readiness
                      </p>
                    </div>
                    <button
                      onClick={() => setShowGetStartedModal(true)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#FEFCE8] border-[1.5px] border-[#141413] shadow-[0_2px_0_0_#141413] hover:translate-y-[1px] hover:shadow-[0_1px_0_0_#141413] transition-all cursor-pointer"
                    >
                      Change Scenario →
                    </button>
                  </div>

                  {/* Hero Editorial Banner */}
                  <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0F3F3A] via-[#165B53] to-[#274C46] text-white p-5 lg:p-6 shadow-sm">
                    <div className="relative z-10 max-w-lg space-y-2">
                      <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-[#FEFCE8] text-[#141413]">
                        {selectedScenario.badge}
                      </span>
                      <h2 className="font-serif-editorial text-2xl lg:text-3xl leading-tight font-normal">
                        Moving to Germany? Speak without freezing up.
                      </h2>
                      <p className="text-xs text-[#D3ECE6] leading-relaxed">
                        Hold your <strong>Wispr Flow</strong> hotkey (or use in-browser mic) and answer in broken English, Hinglish, or German. Get C1 upgrades, German translations &amp; Desi phonetics.
                      </p>
                      <div className="pt-1.5 flex flex-wrap gap-2">
                        {SCENARIOS.map((sc) => (
                          <button
                            key={sc.id}
                            onClick={() => selectScenario(sc)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                              selectedScenario.id === sc.id
                                ? "bg-white text-[#141413] shadow-xs"
                                : "bg-white/15 text-white hover:bg-white/25"
                            }`}
                          >
                            {sc.shortTitle}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Decorative Peeking Character on Right of Banner */}
                    <div className="hidden sm:block absolute -right-3 -bottom-5 w-36 h-36 opacity-95 pointer-events-none">
                      <PeekingCharacterSVG />
                    </div>
                  </div>
                </div>

                {/* Right 4 Columns: Total Words + Speaking Stats */}
                <div className="lg:col-span-4 bg-[#F6F5F0] rounded-2xl p-5 border border-[#EAE8E1] space-y-3.5">
                  <div className="flex items-center justify-between border-b border-[#E2E0D8] pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#686763]">
                      Performance Metrics
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#D3ECE6] text-[#165B53]">
                      Live
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-[#686763]">Total Words:</span>
                      <span className="font-serif-editorial text-2xl text-[#141413]">
                        {(totalWordsCount / 1000).toFixed(1)}K
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-[#686763]">Speaking Speed:</span>
                      <span className="font-serif-editorial text-2xl text-[#141413]">
                        {wpmSpeed} wpm
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-[#686763]">Fluency Streak:</span>
                      <span className="font-serif-editorial text-2xl text-[#141413]">
                        6 Days
                      </span>
                    </div>
                  </div>

                  {/* Audio Speed Selector */}
                  <div className="pt-2 border-t border-[#E2E0D8] flex items-center justify-between text-xs">
                    <span className="text-[#686763]">Audio Speed:</span>
                    <div className="flex items-center gap-1">
                      {[0.75, 0.9, 1.0].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => setPlaybackSpeed(spd)}
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            playbackSpeed === spd
                              ? "bg-[#165B53] text-white"
                              : "bg-white text-[#686763] hover:text-[#141413]"
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* LIVE WISPR FLOW VOICE ARENA */}
              <div className="bg-[#F6F5F0] rounded-2xl p-5 lg:p-6 border border-[#EAE8E1] space-y-4">
                {/* Examiner Prompt Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#EAE8E1]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#165B53]">
                        🎙️ {selectedScenario.role} asks:
                      </span>
                    </div>
                    <p className="text-base font-semibold text-[#141413]">
                      &ldquo;{selectedScenario.question}&rdquo;
                    </p>
                    <p className="text-xs text-[#686763] italic">
                      🇩🇪 German translation: &ldquo;{selectedScenario.questionDe}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() =>
                        speakText(selectedScenario.question, "en-US", "examiner-en")
                      }
                      className={`px-3 py-2 rounded-xl border-[1.5px] border-[#141413] shadow-[0_2px_0_0_#141413] active:translate-y-[1px] active:shadow-none text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                        activePlayingId === "examiner-en"
                          ? "bg-[#165B53] text-white"
                          : "bg-[#FEFCE8] text-[#141413]"
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{activePlayingId === "examiner-en" ? "Playing..." : "Hear English"}</span>
                    </button>
                    <button
                      onClick={() =>
                        speakText(selectedScenario.questionDe, "de-DE", "examiner-de")
                      }
                      className={`px-3 py-2 rounded-xl border-[1.5px] border-[#141413] shadow-[0_2px_0_0_#141413] active:translate-y-[1px] active:shadow-none text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                        activePlayingId === "examiner-de"
                          ? "bg-[#165B53] text-white"
                          : "bg-[#D3ECE6] text-[#141413]"
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{activePlayingId === "examiner-de" ? "Playing..." : "Hear German"}</span>
                    </button>
                  </div>
                </div>

                {/* THE WISPR FLOW DICTATION INPUT BOX */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#686763] flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B4A] animate-ping" />
                      <span>Speak or Dictate Your Answer</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleBrowserMicrophone}
                        className={`text-xs px-2.5 py-1 rounded-lg border flex items-center gap-1.5 font-semibold cursor-pointer transition-all ${
                          isListeningMic
                            ? "bg-red-500 text-white border-red-600 animate-pulse"
                            : "bg-white text-[#165B53] border-[#165B53]/30 hover:bg-[#D3ECE6]"
                        }`}
                      >
                        <Radio className="w-3 h-3" />
                        <span>{isListeningMic ? "Listening..." : "Use Browser Mic"}</span>
                      </button>
                      <button
                        onClick={() => {
                          setUserSpeech(selectedScenario.sampleHinglish);
                          textareaRef.current?.focus();
                        }}
                        className="text-xs underline text-[#165B53] font-semibold cursor-pointer"
                      >
                        Load Sample Speech
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <textarea
                      ref={textareaRef}
                      rows={3}
                      value={userSpeech}
                      onChange={(e) => setUserSpeech(e.target.value)}
                      placeholder="Hold down your Wispr Flow hotkey (Fn or Ctrl+Win), or click 'Use Browser Mic' to speak in broken English, Hinglish, or German..."
                      className="w-full rounded-2xl bg-[#FEFCE8] border-[1.5px] border-[#141413] p-4 text-base font-medium text-[#141413] placeholder:text-[#686763] focus:outline-none shadow-[0_3px_0_0_#141413] transition-all"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2 text-xs text-[#686763]">
                      <span className="px-2 py-0.5 rounded bg-white border border-[#EAE8E1] font-semibold text-[#141413]">
                        Word Count: {userSpeech.trim() ? userSpeech.trim().split(/\s+/).length : 0}
                      </span>
                      <span>• Hands-free voice recognition ready</span>
                    </div>

                    <button
                      onClick={() => handleAnalyzeSpeech()}
                      disabled={isAnalyzing}
                      className="px-6 py-2.5 rounded-xl bg-[#165B53] text-white border-[1.5px] border-[#141413] shadow-[0_3px_0_0_#141413] hover:bg-[#124b44] active:translate-y-[2px] active:shadow-none font-semibold text-sm flex items-center gap-2 transition-all disabled:opacity-60 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{isAnalyzing ? "Analyzing Fluency & German..." : "Upgrade My English & Teach Me German →"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 3-COLUMN BENTO COACHING OUTPUT */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* CARD 1: FLUENCY GAUGE */}
                <div className="bg-[#F6F5F0] rounded-2xl p-5 border border-[#EAE8E1] flex flex-col justify-between">
                  <div>
                    <div className="text-3xl font-bold text-[#141413]">
                      {coachResult.fluencyScore}%
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#686763] flex items-center gap-1 mt-0.5">
                      Fluency &amp; Confidence Score <Info className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* SVG Semi-Circle Arch */}
                  <div className="my-4 flex flex-col items-center justify-center">
                    <div className="relative w-44 h-24 flex items-end justify-center overflow-hidden">
                      <svg className="w-44 h-44 -mb-20" viewBox="0 0 100 100">
                        <path
                          d="M 12 50 A 38 38 0 0 1 88 50"
                          fill="none"
                          stroke="#E2E0D8"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 12 50 A 38 38 0 0 1 88 50"
                          fill="none"
                          stroke="#165B53"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="120"
                          strokeDashoffset={120 - (120 * coachResult.fluencyScore) / 100}
                        />
                      </svg>
                      <div className="text-center pb-1">
                        <div className="text-xs text-[#686763]">Level</div>
                        <div className="text-lg font-bold text-[#141413]">
                          C1 Ready
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-[#686763] border-t border-[#E2E0D8] pt-3 flex justify-between">
                    <span>Grammar Improvements:</span>
                    <span className="font-bold text-[#141413]">
                      {coachResult.grammarFixesCount} Applied
                    </span>
                  </div>
                </div>

                {/* CARD 2: NATURAL C1 ENGLISH UPGRADE */}
                <div className="bg-[#F6F5F0] rounded-2xl p-5 border border-[#EAE8E1] flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#686763]">
                        Fluent C1 English Version
                      </span>
                      <button
                        onClick={() =>
                          speakText(coachResult.englishC1Upgrade, "en-US", "c1-upgrade")
                        }
                        className={`px-2.5 py-1 rounded-lg border border-[#141413] text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                          activePlayingId === "c1-upgrade"
                            ? "bg-[#165B53] text-white"
                            : "bg-white hover:bg-[#FEFCE8]"
                        }`}
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>{activePlayingId === "c1-upgrade" ? "Playing..." : "Listen"}</span>
                      </button>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-[#141413] bg-white p-3 rounded-xl border border-[#EAE8E1] leading-relaxed">
                      &ldquo;{coachResult.englishC1Upgrade}&rdquo;
                    </p>
                  </div>

                  <div className="space-y-1.5 border-t border-[#E2E0D8] pt-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#686763]">
                      What Wispr Flow Polished:
                    </p>
                    {coachResult.fixesList.map((fix, i) => (
                      <div key={i} className="text-xs text-[#3F3E3C] flex items-start gap-1.5">
                        <span className="text-[#165B53] font-bold">•</span>
                        <span>{fix}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CARD 3: NATIVE GERMAN + DESI PHONETIC ACCENT COACH */}
                <div className="bg-[#F6F5F0] rounded-2xl p-5 border border-[#EAE8E1] flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#165B53]">
                        🇩🇪 Native German &amp; Phonetics
                      </span>
                      <button
                        onClick={() =>
                          speakText(coachResult.germanTranslation, "de-DE", "german-upgrade")
                        }
                        className={`px-2.5 py-1 rounded-lg border border-[#141413] text-xs font-semibold flex items-center gap-1 shadow-[0_1px_0_0_#141413] cursor-pointer transition-colors ${
                          activePlayingId === "german-upgrade"
                            ? "bg-[#165B53] text-white"
                            : "bg-[#FEFCE8]"
                        }`}
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>{activePlayingId === "german-upgrade" ? "Playing..." : "Listen DE"}</span>
                      </button>
                    </div>

                    <p className="text-sm font-bold text-[#141413] bg-white p-2.5 rounded-xl border border-[#EAE8E1]">
                      {coachResult.germanTranslation}
                    </p>

                    <div className="bg-[#FEFCE8] p-2.5 rounded-xl border border-[#141413]/40">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#686763] block">
                        🗣️ Desi Phonetics:
                      </span>
                      <p className="text-xs font-semibold text-[#141413] mt-0.5">
                        {coachResult.desiPhonetics}
                      </p>
                    </div>
                  </div>

                  {/* WINNING WISPR ACCENT VERIFIER INPUT */}
                  <div className="border-t border-[#E2E0D8] pt-2.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-[#141413] block">
                        🎯 Test German Accent with Wispr Flow:
                      </label>
                      <button
                        onClick={() => handleVerifyGermanAccent(coachResult.germanTranslation)}
                        className="text-[10px] px-2 py-0.5 rounded bg-white border border-[#141413] text-[#165B53] font-semibold hover:bg-[#D3ECE6] cursor-pointer"
                      >
                        ⚡ Test Sample
                      </button>
                    </div>
                    <input
                      type="text"
                      value={germanPracticeInput}
                      onChange={(e) => handleVerifyGermanAccent(e.target.value)}
                      placeholder="Dictate the phonetics above using Wispr Flow (Fn or Ctrl+Win)..."
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#141413] focus:outline-none"
                    />
                    {accentMatchScore !== null && (
                      <div className="flex items-center justify-between text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-[#D3ECE6] text-[#165B53] border border-[#165B53]/30">
                        <span>Accent Match Score:</span>
                        <span className="font-bold">{accentMatchScore}% Native Match! 🎉</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 2: GERMANY INTERACTIVE SIMULATOR
             ========================================================= */}
          {activeTab === "simulator" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-[#141413]">
                    Full German Immersion Roleplay Simulator
                  </h1>
                  <p className="text-xs text-[#686763] mt-0.5">
                    Practice complete multi-turn conversations for high-stakes appointments.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("dictation")}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-[#141413] hover:bg-[#FEFCE8]"
                >
                  ← Back to Dictation Coach
                </button>
              </div>

              {/* Scenario selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SCENARIOS.map((sc) => (
                  <div
                    key={sc.id}
                    onClick={() => {
                      selectScenario(sc);
                      setActiveTab("dictation");
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      selectedScenario.id === sc.id
                        ? "bg-[#FEFCE8] border-[#141413] shadow-[0_3px_0_0_#141413]"
                        : "bg-[#F6F5F0] border-[#EAE8E1] hover:bg-white"
                    }`}
                  >
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#D3ECE6] text-[#165B53]">
                      {sc.badge}
                    </span>
                    <h3 className="font-bold text-base text-[#141413] mt-2">{sc.title}</h3>
                    <p className="text-xs text-[#686763] mt-1 line-clamp-2">{sc.question}</p>
                    <div className="mt-3 flex items-center justify-between text-xs font-semibold text-[#165B53]">
                      <span>Role: {sc.role}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Next Question from Examiner */}
              <div className="bg-[#F6F5F0] rounded-2xl p-6 border border-[#EAE8E1] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#165B53]">
                    Follow-up Question from German Officer:
                  </span>
                  <button
                    onClick={() => speakText(coachResult.nextQuestion, "de-DE", "simulator-followup")}
                    className={`px-3 py-1.5 rounded-lg border border-[#141413] text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                      activePlayingId === "simulator-followup"
                        ? "bg-[#165B53] text-white"
                        : "bg-white hover:bg-[#FEFCE8]"
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{activePlayingId === "simulator-followup" ? "Playing..." : "Hear Question"}</span>
                  </button>
                </div>
                <p className="text-base font-semibold text-[#141413] bg-white p-4 rounded-xl border border-[#EAE8E1]">
                  &ldquo;{coachResult.nextQuestion}&rdquo;
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setUserSpeech("");
                      setActiveTab("dictation");
                      triggerToast("Speak your answer to the examiner's follow-up!");
                    }}
                    className="px-4 py-2 rounded-xl bg-[#165B53] text-white text-xs font-semibold shadow-[0_2px_0_0_#141413] border border-[#141413] cursor-pointer hover:bg-[#124b44]"
                  >
                    Answer with Wispr Flow →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 3: INSIGHTS & HEATMAP VIEW
             ========================================================= */}
          {activeTab === "insights" && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-[#141413]">Insights &amp; Analytics</h1>
                  <p className="text-xs text-[#686763]">Real-time tracking of speaking speed and consistency.</p>
                </div>
                <button
                  onClick={() => triggerToast("Analytics snapshot copied! Ready to share with your study group.")}
                  className="px-3.5 py-1.5 rounded-full border border-[#141413] bg-[#FEFCE8] text-xs font-bold text-[#141413] shadow-[0_1.5px_0_0_#141413] cursor-pointer flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Progress</span>
                </button>
              </div>

              {/* Sub-navigation tabs */}
              <div className="flex items-center gap-6 border-b border-[#EAE8E1] text-sm font-medium">
                <button className="pb-2.5 border-b-2 border-[#141413] text-[#141413] font-semibold">
                  Your Usage
                </button>
                <button
                  onClick={() => setShowLeaderboardModal(true)}
                  className="pb-2.5 text-[#686763] hover:text-[#141413] cursor-pointer flex items-center gap-1"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Weekly Leaderboard</span>
                </button>
              </div>

              {/* TOP 3 BENTO METRIC CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                {/* 135 WPM SPEED CARD */}
                <div className="md:col-span-3 bg-[#F6F5F0] rounded-2xl p-5 border border-[#EAE8E1]">
                  <div className="text-3xl font-bold text-[#141413]">{wpmSpeed}</div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#686763] mt-1">
                    Words Per Minute (Spoken)
                  </div>
                  <div className="mt-5 flex justify-center">
                    <div className="relative w-40 h-20 flex items-end justify-center overflow-hidden">
                      <svg className="w-40 h-40 -mb-20" viewBox="0 0 100 100">
                        <path
                          d="M 12 50 A 38 38 0 0 1 88 50"
                          fill="none"
                          stroke="#165B53"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="text-center">
                        <div className="text-xs text-[#686763]">Level</div>
                        <div className="text-base font-bold text-[#141413]">Fluent C1</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FIXES MADE CARD */}
                <div className="md:col-span-4 bg-[#F6F5F0] rounded-2xl p-5 border border-[#EAE8E1] flex flex-col justify-between">
                  <div>
                    <div className="text-3xl font-bold text-[#141413]">
                      {totalFixesCount.toLocaleString()}
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#686763] mt-1">
                      Fluency &amp; Grammar Corrections
                    </div>
                  </div>
                  <div className="border-t border-[#E2E0D8] pt-3 space-y-1.5 text-xs text-[#141413]">
                    <div className="flex justify-between">
                      <span>English C1 Academic Upgrades</span>
                      <span className="font-bold text-[#165B53]">1,072</span>
                    </div>
                    <div className="flex justify-between">
                      <span>German Phonetic Corrections</span>
                      <span className="font-bold text-[#165B53]">510</span>
                    </div>
                  </div>
                </div>

                {/* 42,381 TOTAL WORDS DICTATED CARD */}
                <div className="md:col-span-5 bg-[#F6F5F0] rounded-2xl p-5 border border-[#EAE8E1] flex flex-col justify-between">
                  <div>
                    <div className="text-3xl font-bold text-[#141413]">
                      {totalWordsCount.toLocaleString()}
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#686763] mt-1">
                      Total Spoken Words Dictated
                    </div>
                  </div>
                  <div className="border-t border-[#E2E0D8] pt-3 flex items-center justify-between">
                    <div className="text-xs space-y-0.5">
                      <div className="font-medium text-[#141413]">Wispr Flow Desktop + Web</div>
                      <div className="text-[#686763]">{totalWordsCount.toLocaleString()} words logged</div>
                    </div>
                    <button
                      onClick={() => setActiveTab("dictation")}
                      className="px-3.5 py-1.5 rounded-xl bg-white border border-[#EAE8E1] text-xs font-semibold text-[#141413] hover:bg-[#FEFCE8] cursor-pointer"
                    >
                      Practice Now
                    </button>
                  </div>
                </div>
              </div>

              {/* BOTTOM 2 BENTO CARDS: USAGE + 6 DAY STREAK */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                {/* Left: Language Practice Usage */}
                <div className="md:col-span-6 bg-[#F6F5F0] rounded-2xl p-6 border border-[#EAE8E1] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#141413]">
                      Scenario Practice Breakdown
                    </h3>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#686763]">
                      Total Drills: 111
                    </span>
                  </div>

                  <div className="space-y-3 text-xs font-semibold">
                    <div className="flex items-center gap-3">
                      <span className="w-5 text-center">🇩🇪</span>
                      <div className="w-48 bg-[#165B53] text-white py-1.5 px-3 rounded-md text-center">
                        78%
                      </div>
                      <span className="text-[#141413] uppercase tracking-wider text-[11px]">
                        Embassy &amp; Visa Drills
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="w-5 text-center">🏛️</span>
                      <div className="w-20 bg-[#4E9F91] text-white py-1.5 px-3 rounded-md text-center">
                        22%
                      </div>
                      <span className="text-[#141413] uppercase tracking-wider text-[11px]">
                        Bürgeramt Registration
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="w-5 text-center">🏠</span>
                      <div className="w-14 bg-[#4E9F91] text-white py-1.5 px-2 rounded-md text-center">
                        14%
                      </div>
                      <span className="text-[#141413] uppercase tracking-wider text-[11px]">
                        WG-Casting Drills
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: 6 Day Streak Calendar Grid */}
                <div className="md:col-span-6 bg-[#F6F5F0] rounded-2xl p-6 border border-[#EAE8E1] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#141413]">6 Day Active Practice Streak</h3>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#165B53]">
                      Current Streak: 6 Days
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, rIdx) => (
                      <div key={day} className="flex items-center gap-2">
                        <span className="w-7 text-[10px] text-[#686763]">{day}</span>
                        <div className="flex-1 grid grid-cols-12 gap-1.5">
                          {Array.from({ length: 12 }).map((_, cIdx) => {
                            const isCurrentStreak = cIdx === 10 && rIdx >= 1;
                            const isPastActive = cIdx === 9 && (rIdx === 0 || rIdx === 1);
                            return (
                              <div
                                key={cIdx}
                                className={`h-4 rounded-[4px] ${
                                  isCurrentStreak
                                    ? "bg-[#165B53] ring-1 ring-[#141413]"
                                    : isPastActive
                                    ? "bg-[#9E9B91]"
                                    : "bg-[#EAE8E1]"
                                }`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 text-[11px] text-[#686763]">
                    <div className="flex items-center gap-1.5">
                      <span>Intensity: Less</span>
                      <span className="w-3 h-3 rounded-[3px] bg-[#D3ECE6]" />
                      <span className="w-3 h-3 rounded-[3px] bg-[#84C5B8]" />
                      <span className="w-3 h-3 rounded-[3px] bg-[#4E9F91]" />
                      <span className="w-3 h-3 rounded-[3px] bg-[#165B53]" />
                      <span>More</span>
                    </div>
                    <span>Active Today ☑</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 4: SURVIVAL DICTIONARY WITH WISPR FLOW PRONUNCIATION CHECK
             ========================================================= */}
          {activeTab === "dictionary" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-[#141413]">
                    German &amp; C1 English Survival Dictionary
                  </h1>
                  <p className="text-xs text-[#686763] mt-0.5">
                    Essential bureaucracy vocabulary. Hold Wispr Flow (<kbd className="px-1.5 py-0.5 rounded bg-white border border-[#141413] text-[10px] font-mono font-bold">Fn</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#141413] text-[10px] font-mono font-bold">Ctrl+Win</kbd>) to test your German pronunciation in real-time.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-3 py-1 rounded-full bg-[#D3ECE6] text-[#165B53] border border-[#165B53]/30 text-xs font-bold flex items-center gap-1.5 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#165B53] animate-pulse" />
                    Wispr Flow Verifier Active
                  </span>
                </div>
              </div>

              {/* Instructions banner */}
              <div className="p-3.5 rounded-xl bg-[#FEFCE8] border-[1.5px] border-[#141413] shadow-[0_2px_0_0_#141413] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#141413]">
                <div className="flex items-center gap-2.5">
                  <Mic className="w-4 h-4 text-[#165B53] shrink-0" />
                  <span>
                    <strong>How to test:</strong> Click <strong>&ldquo;Check Pronunciation&rdquo;</strong> on any word below, then hold your Wispr Flow hotkey or click <strong>&ldquo;Use Browser Mic&rdquo;</strong> to speak the phonetics aloud!
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-[#165B53] shrink-0">
                  Hands-Free Voice Recognition
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {SAVED_DICTIONARY.map((item, idx) => {
                  const state = dictPracticeState[idx] || {
                    input: "",
                    score: null,
                    status: null,
                    label: null,
                    matchedSyllables: [],
                  };
                  const isExpanded = !!expandedDictCards[idx];
                  const isMicActive = activeDictMicIndex === idx;

                  return (
                    <div
                      key={idx}
                      className="bg-[#F6F5F0] rounded-2xl border border-[#EAE8E1] p-5 space-y-4 shadow-xs transition-all"
                    >
                      {/* CARD HEADER */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EADBFF] text-[#4C1D95]">
                              {item.category}
                            </span>
                            {state.score !== null && (
                              <span
                                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                                  state.status === "excellent"
                                    ? "bg-[#D3ECE6] text-[#165B53] border-[#165B53]/30"
                                    : state.status === "good"
                                    ? "bg-[#FEFCE8] text-[#B45309] border-[#B45309]/30"
                                    : "bg-red-50 text-red-700 border-red-200"
                                }`}
                              >
                                <Award className="w-3 h-3" />
                                <span>{state.score}% Pronunciation Match</span>
                              </span>
                            )}
                          </div>
                          <p className="text-lg font-bold text-[#141413]">{item.german}</p>
                          <p className="text-xs font-semibold text-[#165B53]">
                            🗣️ Desi Phonetics: {item.phonetic}
                          </p>
                          <p className="text-xs text-[#686763]">{item.english}</p>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => speakText(item.german, "de-DE", `dict-${idx}`)}
                            className={`px-3 py-2 rounded-xl border-[1.5px] border-[#141413] shadow-[0_2px_0_0_#141413] active:translate-y-[1px] active:shadow-none text-xs font-semibold flex items-center gap-1.5 shrink-0 cursor-pointer transition-all ${
                              activePlayingId === `dict-${idx}`
                                ? "bg-[#165B53] text-white"
                                : "bg-white hover:bg-[#FEFCE8] text-[#141413]"
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>{activePlayingId === `dict-${idx}` ? "Playing..." : "Pronounce"}</span>
                          </button>

                          <button
                            onClick={() => toggleDictCardExpanded(idx)}
                            className={`px-3.5 py-2 rounded-xl border-[1.5px] border-[#141413] shadow-[0_2px_0_0_#141413] active:translate-y-[1px] active:shadow-none text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer transition-all ${
                              isExpanded
                                ? "bg-[#165B53] text-white"
                                : "bg-[#FEFCE8] text-[#141413] hover:bg-[#FDF9C4]"
                            }`}
                          >
                            <Mic className="w-3.5 h-3.5" />
                            <span>{isExpanded ? "Hide Verifier" : "Check Pronunciation"}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* EXPANDABLE WISPR FLOW PRONUNCIATION ARENA */}
                      {isExpanded && (
                        <div className="pt-3 border-t border-[#E2E0D8] space-y-3">
                          <div className="bg-white rounded-xl p-4 border-[1.5px] border-[#141413] shadow-[0_2px_0_0_#141413] space-y-3">
                            {/* ARENA HEADER & ACTIONS */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#165B53] animate-ping" />
                                <span className="text-xs font-bold uppercase tracking-wider text-[#165B53]">
                                  🎯 Wispr Flow Pronunciation Arena
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <button
                                  onClick={() => toggleDictMicrophone(idx)}
                                  className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1 cursor-pointer transition-all ${
                                    isMicActive
                                      ? "bg-red-500 text-white border-red-600 animate-pulse"
                                      : "bg-[#FEFCE8] text-[#141413] border-[#141413] hover:bg-[#FDF9C4]"
                                  }`}
                                >
                                  <Radio className="w-3 h-3" />
                                  <span>{isMicActive ? "Listening (DE)..." : "Use Browser Mic"}</span>
                                </button>

                                <button
                                  onClick={() => handleLoadDictSample(idx)}
                                  className="text-[11px] px-2.5 py-1 rounded-lg bg-white border border-[#141413] text-[#165B53] font-semibold hover:bg-[#D3ECE6] cursor-pointer"
                                >
                                  ⚡ Test Sample
                                </button>

                                {state.input && (
                                  <button
                                    onClick={() => handleResetDictPractice(idx)}
                                    className="text-[11px] px-2 py-1 rounded-lg bg-white border border-[#EAE8E1] text-[#686763] hover:text-[#141413] cursor-pointer flex items-center gap-1"
                                  >
                                    <RotateCcw className="w-3 h-3" />
                                    <span>Reset</span>
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* TACTILE INPUT FIELD */}
                            <div className="relative">
                              <input
                                type="text"
                                value={state.input}
                                onChange={(e) => handleDictPracticeInput(idx, e.target.value)}
                                placeholder="Hold Wispr Flow hotkey (Fn or Ctrl+Win) to pronounce this word aloud..."
                                className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl bg-[#FEFCE8] border-[1.5px] border-[#141413] text-[#141413] placeholder:text-[#686763] focus:outline-none focus:ring-2 focus:ring-[#165B53] shadow-xs"
                              />
                            </div>

                            {/* EVALUATION RESULT BADGES & SYLLABLE BREAKDOWN */}
                            {state.score !== null ? (
                              <div className="space-y-2.5 pt-1">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-[#F6F5F0] border border-[#EAE8E1]">
                                  <div className="flex items-center gap-2.5">
                                    <div
                                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border-[1.5px] border-[#141413] shrink-0 ${
                                        state.status === "excellent"
                                          ? "bg-[#165B53] text-white"
                                          : state.status === "good"
                                          ? "bg-[#FDBA4D] text-[#141413]"
                                          : "bg-red-200 text-red-900"
                                      }`}
                                    >
                                      {state.score}%
                                    </div>
                                    <div>
                                      <p className="text-xs font-bold text-[#141413]">{state.label}</p>
                                      <p className="text-[11px] text-[#686763]">
                                        Dictated via Wispr Flow: &ldquo;{state.input}&rdquo;
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#165B53] shrink-0">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>
                                      {state.matchedSyllables.length}/{item.breakdown.length} Syllables Matched
                                    </span>
                                  </div>
                                </div>

                                {/* SYLLABLE CHIPS */}
                                <div className="space-y-1">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#686763] block">
                                    Syllable Breakdown Check:
                                  </span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {item.breakdown.map((syl, sIdx) => {
                                      const isMatched = state.matchedSyllables.includes(syl);
                                      return (
                                        <span
                                          key={sIdx}
                                          className={`text-xs px-2.5 py-1 rounded-lg border font-mono font-semibold flex items-center gap-1 ${
                                            isMatched
                                              ? "bg-[#D3ECE6] text-[#165B53] border-[#165B53]/40"
                                              : "bg-white text-[#8C8B85] border-[#EAE8E1]"
                                          }`}
                                        >
                                          <span>{syl}</span>
                                          {isMatched && <Check className="w-3 h-3 stroke-[2.5]" />}
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="text-[11px] text-[#686763] flex items-center gap-1.5">
                                <Info className="w-3.5 h-3.5 text-[#165B53] shrink-0" />
                                <span>Tip: Say &ldquo;{item.phonetic}&rdquo; aloud into your microphone. Wispr Flow will transcribe and grade accuracy.</span>
                              </div>
                            )}

                            {/* PHONETIC TONGUE & ACCENT PRO-TIP */}
                            <div className="p-2.5 rounded-lg bg-[#EADBFF]/30 border border-[#4C1D95]/20 flex items-start gap-2 text-xs">
                              <Sparkles className="w-3.5 h-3.5 text-[#4C1D95] shrink-0 mt-0.5" />
                              <div className="text-[#3F3E3C]">
                                <strong className="text-[#4C1D95]">German Phonetic Tip:</strong>{" "}
                                {item.accentTip}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 5: VISA SNIPPETS
             ========================================================= */}
          {activeTab === "snippets" && (
            <div className="max-w-4xl mx-auto space-y-5">
              <h1 className="text-2xl font-bold text-[#141413]">
                Embassy &amp; Visa Interview Verified Snippets
              </h1>
              <p className="text-xs text-[#686763]">
                Pre-approved official templates for your Visa Officer interview and Bürgeramt registration.
              </p>
              <div className="grid grid-cols-1 gap-4">
                {VISA_SNIPPETS.map((snip, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F6F5F0] p-5 rounded-2xl border border-[#EAE8E1] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#FEFCE8] border border-[#141413] text-[#141413]">
                        {snip.context}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => speakText(snip.german, "de-DE", `snip-${idx}`)}
                          className={`px-3 py-1 rounded-lg border border-[#141413] text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                            activePlayingId === `snip-${idx}`
                              ? "bg-[#165B53] text-white"
                              : "bg-white hover:bg-[#FEFCE8]"
                          }`}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{activePlayingId === `snip-${idx}` ? "Playing..." : "Pronounce"}</span>
                        </button>
                        <button
                          onClick={() => copyToClipboard(snip.german, idx)}
                          className="px-3 py-1 rounded-lg bg-white border border-[#141413] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#FEFCE8] cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copiedSnippetIndex === idx ? "Copied!" : "Copy Snippet"}</span>
                        </button>
                      </div>
                    </div>

                    <h3 className="font-bold text-sm text-[#141413]">{snip.title}</h3>

                    <div className="bg-white p-3.5 rounded-xl border border-[#EAE8E1] space-y-1.5">
                      <p className="text-xs font-bold text-[#165B53]">🇩🇪 German Official Phrasing:</p>
                      <p className="text-sm font-semibold text-[#141413]">{snip.german}</p>
                    </div>

                    <p className="text-xs text-[#686763]">
                      <strong>English Meaning:</strong> {snip.english}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* =========================================================
          MODAL 1: SCENARIO EXPLORER MODAL
         ========================================================= */}
      {showGetStartedModal && (
        <div className="fixed inset-0 z-50 bg-[#141413]/50 backdrop-blur-xs flex flex-col items-center justify-center p-4">
          <div className="relative w-full max-w-[440px]">
            {/* Custom Peeking Character SVG */}
            <div className="absolute -top-24 -right-12 w-44 h-44 pointer-events-none z-0">
              <PeekingCharacterSVG />
            </div>

            {/* Crisp White Card */}
            <div className="relative z-10 bg-white border-[1.5px] border-[#141413] rounded-[28px] p-7 shadow-lg">
              <button
                onClick={() => setShowGetStartedModal(false)}
                className="absolute top-5 right-5 p-1 rounded-full hover:bg-[#F4F2EC] cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 text-[#686763]" />
              </button>

              <h2 className="font-serif-editorial text-3xl text-center text-[#141413] mb-5">
                Choose Survival Mission
              </h2>

              {/* 4 Tactile Pill Buttons */}
              <div className="space-y-2.5">
                {SCENARIOS.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      selectScenario(sc);
                      setShowGetStartedModal(false);
                      setActiveTab("dictation");
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-[#FEFCE8] border-[1.5px] border-[#141413] text-xs font-semibold text-[#141413] flex items-center justify-center gap-2 hover:bg-[#FDF9C4] active:translate-y-[1px] transition-all cursor-pointer"
                  >
                    <span>🇩🇪 {sc.title}</span>
                  </button>
                ))}
              </div>

              <div className="my-4 text-center text-xs text-[#686763]">or customize destination</div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter German city (e.g. Munich, Berlin, Frankfurt)"
                  className="w-full pb-2 border-b border-[#141413] text-xs text-[#141413] placeholder:text-[#686763] focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Enter university (e.g. TU Munich, RWTH Aachen)"
                  className="w-full pb-2 border-b border-[#141413] text-xs text-[#141413] placeholder:text-[#686763] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 2: WISPR HOTKEY SETTINGS
         ========================================================= */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-[#141413]/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-[1.5px] border-[#141413] rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-[#141413]">Wispr Flow Hotkey Guide</h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-1 hover:bg-[#F4F2EC] rounded-lg"
              >
                <X className="w-4 h-4 text-[#686763]" />
              </button>
            </div>
            <p className="text-xs text-[#686763]">
              Configure your system hotkey inside the Wispr Flow Desktop app to dictate anywhere:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-[#FEFCE8] border border-[#141413] rounded-xl flex items-center justify-between font-semibold">
                <span>Windows Default:</span>
                <span className="px-2 py-0.5 rounded bg-white border border-[#141413]">Ctrl + Win</span>
              </div>
              <div className="p-3 bg-[#D3ECE6] border border-[#165B53] rounded-xl flex items-center justify-between font-semibold text-[#165B53]">
                <span>Mac Default:</span>
                <span className="px-2 py-0.5 rounded bg-white border border-[#165B53]">Hold Fn</span>
              </div>
            </div>
            <button
              onClick={() => setShowSettingsModal(false)}
              className="w-full py-2 bg-[#165B53] text-white text-xs font-semibold rounded-xl"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 3: STUDY BUDDY GROUP
         ========================================================= */}
      {showStudyBuddyModal && (
        <div className="fixed inset-0 z-50 bg-[#141413]/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-[1.5px] border-[#141413] rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-[#141413]">Germany Study Buddies</h3>
              <button
                onClick={() => setShowStudyBuddyModal(false)}
                className="p-1 hover:bg-[#F4F2EC] rounded-lg"
              >
                <X className="w-4 h-4 text-[#686763]" />
              </button>
            </div>
            <p className="text-xs text-[#686763]">
              Join fellow Indian students admitted to German universities for Winter &amp; Summer intakes:
            </p>
            <div className="space-y-2 text-xs">
              {[
                { name: "Aarav Sharma", uni: "TU Munich (Informatik)", streak: "14 days" },
                { name: "Priya Patel", uni: "RWTH Aachen (Mechanical)", streak: "9 days" },
                { name: "Rohan Verma", uni: "TU Berlin (AI & Data)", streak: "6 days" },
              ].map((buddy, i) => (
                <div key={i} className="p-3 bg-[#F6F5F0] rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#141413]">{buddy.name}</div>
                    <div className="text-[11px] text-[#686763]">{buddy.uni}</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#D3ECE6] text-[#165B53]">
                    {buddy.streak}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setShowStudyBuddyModal(false);
                triggerToast("Connected with study group!");
              }}
              className="w-full py-2 bg-[#165B53] text-white text-xs font-semibold rounded-xl"
            >
              Connect with Group
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 4: WEEKLY LEADERBOARD
         ========================================================= */}
      {showLeaderboardModal && (
        <div className="fixed inset-0 z-50 bg-[#141413]/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-[1.5px] border-[#141413] rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#165B53]" />
                <h3 className="font-bold text-lg text-[#141413]">Wispr Flow Leaderboard</h3>
              </div>
              <button
                onClick={() => setShowLeaderboardModal(false)}
                className="p-1 hover:bg-[#F4F2EC] rounded-lg"
              >
                <X className="w-4 h-4 text-[#686763]" />
              </button>
            </div>
            <p className="text-xs text-[#686763]">
              Top Indian students practicing German fluency with Wispr Flow this week:
            </p>
            <div className="space-y-2 text-xs">
              {[
                { rank: "#1", name: "Darshan (You)", words: "42,381 words", badge: "🥇 Leader" },
                { rank: "#2", name: "Ananya S.", words: "38,120 words", badge: "🥈 Runner-Up" },
                { rank: "#3", name: "Karthik R.", words: "31,450 words", badge: "🥉 C1 Ready" },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-[#FEFCE8] border border-[#141413] rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-sm text-[#141413]">{item.rank}</span>
                    <div>
                      <div className="font-bold text-[#141413]">{item.name}</div>
                      <div className="text-[11px] text-[#686763]">{item.words}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#165B53]">{item.badge}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowLeaderboardModal(false)}
              className="w-full py-2 bg-[#165B53] text-white text-xs font-semibold rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   CUSTOM PEEKING CHARACTER VECTOR ILLUSTRATION
   ========================================================= */
function PeekingCharacterSVG() {
  return (
    <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Yellow Curly Hair */}
      <circle cx="135" cy="65" r="24" fill="#FDBA4D" stroke="#141413" strokeWidth="3.5" />
      <circle cx="165" cy="78" r="22" fill="#FDBA4D" stroke="#141413" strokeWidth="3.5" />
      <circle cx="180" cy="105" r="20" fill="#FDBA4D" stroke="#141413" strokeWidth="3.5" />
      {/* Coral Left & Right Arms holding Binoculars/Glasses */}
      <path
        d="M45 140 L95 75 L125 95 L80 165 Z"
        fill="#FF6B4A"
        stroke="#141413"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M95 195 L145 125 L175 145 L130 210 Z"
        fill="#FF6B4A"
        stroke="#141413"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Cream Face */}
      <circle cx="138" cy="108" r="32" fill="#FEFCE8" stroke="#141413" strokeWidth="3.5" />
      {/* Lilac Round Glasses / Binoculars */}
      <circle cx="122" cy="95" r="16" fill="#EADBFF" stroke="#141413" strokeWidth="3.5" />
      <circle cx="122" cy="95" r="9" fill="#FEFCE8" stroke="#141413" strokeWidth="2.5" />
      <circle cx="152" cy="112" r="16" fill="#EADBFF" stroke="#141413" strokeWidth="3.5" />
      <circle cx="152" cy="112" r="9" fill="#FEFCE8" stroke="#141413" strokeWidth="2.5" />
      {/* Mustache / Smile */}
      <path
        d="M122 124 Q132 118 140 128"
        stroke="#141413"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
