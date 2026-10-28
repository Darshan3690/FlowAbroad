# FlowAbroad 🇩🇪 ✈️

> **The Wispr Flow English & German Survival Simulator for Indian Students**  
> Master C1 International English fluency and Native German (B1/B2) survival conversations using hands-free voice dictation, multi-model Gemini AI coaching, and real-time syllable-by-syllable accent verification.

Built for the **WeMakeDevs / Wispr Flow Hackathon**.

---

## 🎨 Faithful Wispr Flow UI/UX Replication

FlowAbroad faithfully replicates the signature **Wispr Flow visual language**:
- **Warm Oatmeal Shell (`#F4F2EC`)** with dark espresso typography (`#141413`).
- **Clean Inset Stage (`#FFFFFF`)** with crisp borders and rounded corners.
- **Neo-Brutalist 3D Tactile Pill Buttons (`#FEFCE8`)** featuring `#141413` borders and tactile press depth.
- **Deep Forest Teal (`#165B53`)** semi-circle fluency gauge and accent states.
- **Custom Vector Peeking Character SVG** with yellow curls, coral arms, and lilac glasses.
- **Insights & 6-Day Streak Heatmap** matching Wispr Flow's analytics screen (200 WPM Top 0.1% gauge, 42.4K words, 1,582 fixes).
- **Multi-Model Cascade & Zero-Latency Dynamic Heuristic Fallback** so judges and students experience instant evaluation without API roadblocks.

---

## 🏗️ End-to-End System Workflow

```
┌───────────────────────────┐      ┌─────────────────────────────┐      ┌──────────────────────────────┐
│ 1. Select Survival Mission│ ───► │ 2. Hear AI Examiner (EN/DE) │ ───► │ 3. Hold Wispr Flow & Dictate │
│ (Embassy, Bürgeramt, WG)  │      │ (Browser SpeechSynthesis)   │      │ (Broken English / Hinglish)  │
└───────────────────────────┘      └─────────────────────────────┘      └──────────────┬───────────────┘
                                                                                       │
┌───────────────────────────┐      ┌─────────────────────────────┐      ┌──────────────▼───────────────┐
│ 6. Insights & Streak Sync │ ◄─── │ 5. Syllable Accent Verifier │ ◄─── │ 4. Multi-Model Gemini Bento  │
│ (200 WPM, Fixes, Heatmap) │      │ (Token & Phonetic Engine)   │      │ (C1 English, DE, Phonetics)  │
└───────────────────────────┘      └─────────────────────────────┘      └──────────────────────────────┘
```

---

## 🤖 Intelligent AI Coach Bot Engine

FlowAbroad's AI Coach (`/api/coach`) features a resilient multi-tier architecture:

1. **Multi-Model Waterfall Cascade**:
   - Primary: `gemini-3.1-flash-lite`
   - Secondary: `gemini-3.5-flash-lite`
   - Tertiary: `gemini-3.5-flash`
   - Quaternary: `gemini-flash-latest`
2. **Context-Aware Heuristic Simulation**:
   - Detects user intent and spoken scenario:
     - 🏛️ **German Student Visa Officer** (Mumbai Consulate financial & blocked account proof)
     - 🏢 **Bürgeramt Anmeldung** (Berlin residence registration & *Wohnungsgeberbestätigung*)
     - 🏠 **Munich WG-Casting** (Flatshare roommate introduction, cooking & cleaning *Putzplan*)
     - 🔬 **TU Munich HiWi Pitch** (Research assistant interview & full-stack AI lab skills)
   - Parses student identity and dynamically generates tailored C1 international English upgrades, specific Hinglish idiom replacements, natural German translations, Desi syllable phonetics, and German phonetic mouth/tongue tips.
3. **Structured JSON Output**: Guarantees typed schema compatibility with zero UI breakage.

---

## 🚀 Step-by-Step User Journey

### Phase 1: Entry & Mission Selection (0:00 – 0:15)
- Land directly on the **"Welcome back, Darshan"** main stage without authentication roadblocks.
- Open the **"✨ Get Started" 3D Modal** featuring the peeking character illustration and 4 tactile `#FEFCE8` buttons.
- Select a high-stakes scenario to automatically load contextual prompts and student speech templates.

### Phase 2: Examiner Audio Immersion (0:15 – 0:30)
- Hear the examiner's prompt read aloud in authentic accents via native browser `window.speechSynthesis` in both **English (`en-US`)** and **German (`de-DE`)**.

### Phase 3: Hands-Free Dictation via Wispr Flow (0:30 – 0:55)
- Click the tactile yellow dictation box (`#FEFCE8`), hold the Wispr Flow hotkey (`Fn` or `Ctrl + Win`), and speak naturally.
- Speak in broken English, Hinglish, or hesitant German without freezing.
- Continuous Web Speech API microphone mode with interim live streaming is also built-in.
- *(For rapid judge testing, click **"Load Sample Student Speech"** to populate realistic speech in one click).*

### Phase 4: Gemini 3-Card Bento Evaluation (0:55 – 1:25)
Instant structured evaluation returns 3 rich cards:
1. **Fluency & Confidence Score:** Semi-circle teal gauge (`#165B53`) displaying readiness percentage and grammar fixes applied.
2. **Fluent C1 English Upgrade:** Polished international English phrasing with a bulleted breakdown of replaced Indian-English idioms.
3. **Native German + Desi Phonetics:** Natural German translation paired with syllable-by-syllable phonetics crafted specifically for Indian speakers (e.g., *"Ish voor-duh an dair TU Myoon-shen..."*).

### Phase 5: Syllable-by-Syllable Accent Verifiers (1:25 – 1:45)
- **Main Mission Accent Test:** Dictate the generated German phonetics into the verifier for instant native percentage scoring.
- **Interactive Dictionary Pronunciation Checker:** Expand bureaucratic survival words (*Wohnungsgeberbestätigung*, *Sperrkonto*, *Immatrikulationsbescheinigung*, *Rundfunkbeitrag*) with:
  - Syllable breakdown check chips (`Wohnungs-`, `geber-`, `be-`, `stätigung`).
  - Real-time token matching and syllable verification.
  - Dedicated mic dictation per dictionary term.
  - Articulation pro-tips for guttural *ch*, rounded *ü*, and *sp/st* pronunciation.

### Phase 6: Insights, Heatmap & Survival Snippets (1:45 – 2:00)
- **Insights Tab:**
  - 200 Words Per Minute gauge (Top 0.1% matching Wispr Flow).
  - 1,582 grammar & phonetic fixes counter.
  - 42.4K total words counter.
  - 6-day streak calendar heatmap.
- **Snippets Tab:** Quick one-click copy and native audio pronunciation (`Pronounce`) for everyday survival phrases.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, Custom Neo-Brutalist Design Tokens
- **AI Engine:** Google Gemini Flash Models (`gemini-3.1-flash-lite`, `gemini-3.5-flash`, `gemini-flash-latest`)
- **Speech Synthesis & Recognition:** Native Web Speech API (`SpeechSynthesis` & `webkitSpeechRecognition`)
- **Icons:** Lucide React
- **Typography:** Instrument Serif (`--font-serif`) & Plus Jakarta Sans (`--font-sans`)

---

## ⚡ Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/Darshan3690/FlowAbroad.git
cd FlowAbroad
npm install
```

### 2. Configure Environment (Optional)
The application includes realistic offline fallback evaluations so judges can test without an API key. To enable live Gemini calls:
```bash
cp .env.local.example .env.local
# Add your key to .env.local:
# GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎬 2-Minute Demo Video Script (For Judges)

- **[0:00 - 0:20] Hook & UI:**  
  *"This is FlowAbroad, replicating the exact Wispr Flow aesthetic for Indian students moving to Germany. Click the 3D 'Get Started' modal to see the custom peeking character and tactile buttons."*
- **[0:20 - 0:45] Audio & Dictation:**  
  *"We select the Mumbai Consulate Visa Officer scenario. Click 'Hear German' to listen to native pronunciation. Now hold the Wispr Flow hotkey and speak naturally in Hinglish into the yellow dictation box."*
- **[0:45 - 1:15] AI Evaluation:**  
  *"Click 'Upgrade My English & Teach Me German'. In under 2 seconds, Gemini delivers our Fluency Gauge, C1 academic upgrade, and Desi phonetics so students can actually pronounce tough German words."*
- **[1:15 - 1:40] Accent & Dictionary Verification:**  
  *"Dictate into the Accent Verifier to score a 95% Native Match. Check the Dictionary tab to see real-time syllable matching on tough words like Wohnungsgeberbestätigung."*
- **[1:40 - 2:00] Insights & Close:**  
  *"Check the Insights tab for the 200 WPM top 0.1% gauge and 6-day streak heatmap. FlowAbroad turns speech anxiety into German readiness with Wispr Flow."*

---

## 👤 Author & Account

- **Author:** Darshan Rajput
- **GitHub:** [@Darshan3690](https://github.com/Darshan3690)
- **Repository:** [FlowAbroad on GitHub](https://github.com/Darshan3690/FlowAbroad)
- **Institution:** Marwadi University
- **Contact:** `darshan.rajput123091@marwadiuniversity.ac.in`

---

## 📄 License
MIT © 2026 Darshan Rajput [@Darshan3690](https://github.com/Darshan3690)
