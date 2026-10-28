# FlowAbroad 🇩🇪 ✈️

> **The Wispr Flow English & German Survival Simulator for Indian Students**  
> Master C1 International English fluency and Native German (B1/B2) survival conversations using hands-free voice dictation, multi-model Gemini AI coaching, and real-time syllable-by-syllable accent verification.

Built for the **WeMakeDevs / Wispr Flow Hackathon**.

---


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


---

## 👤 Author & Account

- **Author:** Darshan Rajput
- **GitHub:** [@Darshan3690](https://github.com/Darshan3690)
- **LIVE:**[ [FlowAbroad LIVE](https://flow-abroad.vercel.app/)
- **Institution:** Marwadi University
- **Contact:** `darshan.rajput369@gmail.com`

---

## 📄 License
MIT © 2026 Darshan Rajput [@Darshan3690](https://github.com/Darshan3690)
