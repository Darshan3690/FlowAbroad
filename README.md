# FlowAbroad 🇩🇪 ✈️

> **The Wispr Flow English & German Survival Simulator for Indian Students**  
> Master C1 International English fluency and Native German (B1/B2) survival conversations using hands-free voice dictation, Gemini 2.5 Flash, and real-time accent verification.

Built for the **WeMakeDevs / Wispr Flow Hackathon**.

---

## 🎨 Faithful Wispr Flow UI/UX Replication

FlowAbroad faithfully replicates the signature **Wispr Flow visual language**:
- **Warm Oatmeal Shell (`#F4F2EC`)** with dark espresso typography (`#141413`).
- **Clean Inset Stage (`#FFFFFF`)** with crisp borders and rounded corners.
- **Neo-Brutalist 3D Tactile Pill Buttons (`#FEFCE8`)** featuring `#141413` borders and tactile press depth.
- **Deep Forest Teal (`#165B53`)** semi-circle fluency gauge and accent states.
- **Custom Vector Peeking Character SVG** with yellow curls, coral arms, and lilac glasses.
- **Insights & 6-Day Streak Heatmap** matching Wispr Flow's analytics screen.
- **Zero-Latency Judge Fallback** so judges can experience the full interactive evaluation instantly without configuring an API key.

---

## 🏗️ End-to-End System Workflow

```
┌───────────────────────────┐      ┌─────────────────────────────┐      ┌──────────────────────────────┐
│ 1. Select Survival Mission│ ───► │ 2. Hear AI Examiner (EN/DE) │ ───► │ 3. Hold Wispr Flow & Dictate │
│ (Embassy, Bürgeramt, WG)  │      │ (Browser SpeechSynthesis)   │      │ (Broken English / Hinglish)  │
└───────────────────────────┘      └─────────────────────────────┘      └──────────────┬───────────────┘
                                                                                       │
┌───────────────────────────┐      ┌─────────────────────────────┐      ┌──────────────▼───────────────┐
│ 6. Insights & Streak Sync │ ◄─── │ 5. Wispr German Accent Test │ ◄─── │ 4. Gemini 2.5 Bento Breakdown│
│ (WPM, 1.5K Fixes, Heatmap)│      │ (Target Word Match Engine)  │      │ (C1 English, DE, Phonetics)  │
└───────────────────────────┘      └─────────────────────────────┘      └──────────────────────────────┘
```

---

## 🚀 Step-by-Step User Journey

### Phase 1: Entry & Mission Selection (0:00 – 0:15)
- Land directly on the **"Welcome back, Darshan"** main stage without authentication roadblocks.
- Open the **"✨ Get Started" 3D Modal** featuring the peeking character illustration and 4 tactile `#FEFCE8` buttons.
- Pick a high-stakes challenge:
  - 🏛️ **German Student Visa Officer** (Mumbai Consulate)
  - 🏢 **Bürgeramt Anmeldung** (Berlin City Clerk)
  - 🏠 **Munich WG-Casting** (Student Flatshare)
  - 🔬 **TU Munich HiWi Pitch** (Research Assistant Interview)

### Phase 2: Examiner Audio Immersion (0:15 – 0:30)
- Hear the examiner's prompt read aloud in authentic accents via native browser `window.speechSynthesis` in both **English (`en-US`)** and **German (`de-DE`)**.

### Phase 3: Hands-Free Dictation via Wispr Flow (0:30 – 0:55)
- Click the tactile yellow dictation box (`#FEFCE8`), hold the Wispr Flow hotkey (`Fn` or `Ctrl + Win`), and speak naturally.
- Speak in broken English, Hinglish, or hesitant German without freezing.
- *(For rapid judge testing, click **"Load Sample Student Speech"** to populate realistic speech in one click).*

### Phase 4: Gemini 2.5 Flash 3-Card Bento Evaluation (0:55 – 1:25)
Instant structured JSON evaluation returns 3 rich cards:
1. **Fluency & Confidence Score:** Semi-circle teal gauge (`#165B53`) displaying readiness percentage and grammar fixes applied.
2. **Fluent C1 English Upgrade:** Polished international English phrasing with a bulleted breakdown of replaced Indian-English idioms.
3. **Native German + Desi Phonetics:** Natural German translation paired with syllable-by-syllable phonetics crafted specifically for Indian speakers (e.g., *"Ish voor-duh an dair TU Myoon-shen..."*).

### Phase 5: Wispr Accent Verifier (1:25 – 1:45)
- Read the Desi phonetics out loud into the **"Test Your German Accent"** input using Wispr Flow.
- Real-time word token matching calculates your native accuracy score (e.g., **`95% Native Match! 🎉`**).

### Phase 6: Insights, Heatmap & Survival Dictionary (1:45 – 2:00)
- View the **Insights** tab with:
  - 200 Words Per Minute gauge (Top 0.1%).
  - 1,582 grammar & phonetic fixes counter.
  - 42.4K total words counter.
  - 6-day streak calendar heatmap.
- Explore the **Dictionary** tab for essential German bureaucratic survival terms (*Wohnungsgeberbestätigung*, *Sperrkonto*, *Immatrikulationsbescheinigung*) with audio pronunciation.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, Custom Neo-Brutalist Design Tokens
- **AI Engine:** Google Gemini 2.5 Flash (`@google/genai`)
- **Speech Synthesis:** Native Browser `speechSynthesis` (Zero external audio API latency)
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
- **[1:15 - 1:40] Accent Verifier:**  
  *"Now dictate the German phonetics using Wispr Flow into the Accent Verifier to score a 95% Native Match."*
- **[1:40 - 2:00] Insights & Close:**  
  *"Check the Insights tab for the 42.4K word counter and 6-day streak heatmap. FlowAbroad turns speech anxiety into German readiness with Wispr Flow."*

---

## 📄 License
MIT © 2026 Darshan Rajput @darshan3690
