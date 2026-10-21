# 🚀 Patrick Nance | Modern Developer Portfolio & Android App

A high-performance, cross-platform portfolio web application and native Android app built with **React 19**, **TypeScript**, **Tailwind CSS**, and **Capacitor 8**.

**Connect with me:**
- 🐙 [GitHub: JPatoChan](https://github.com/JPatoChan)
- 💼 [LinkedIn: Patrick Nance](https://linkedin.com/in/patrick-nance)

---

## 🌟 Highlights & Architecture

- **Cross-Platform Ready**: Runs seamlessly as a modern web app in any browser, as an installable PWA, and as a native Android APK compiled through Android Studio / Gradle.
- **Three Core Tabs**:
  1. **About Tab**:
     - Modern hero section with status badges, career metrics, and quick action triggers.
     - Interactive filterable skills matrix (Mobile / Android, Frontend, Backend, Cloud & DevOps).
     - Professional journey timeline with impact accomplishments.
     - Engineering philosophy pillars (Performance First, Clean Architecture, Intuitive UX, Cross-Platform Cohesion).
  2. **Features Tab** (Dynamic Mini-Apps Showcase):
     - Interactive list / selector displaying feature tools based on selection.
     - Search bar and category filter pills (`Tools`, `Design & UI`, `Productivity`, `API & Networking`, `Mobile & Hardware`).
     - Includes 6 fully functional interactive micro-apps:
       - **PaletteCraft Pro**: Harmonious 5-color palette generator with hex locks and WCAG AA/AAA contrast ratio scoring.
       - **MarkCraft Live**: Zero-dependency real-time Markdown editor, live previewer, formatting toolbar, and word counters.
       - **DevConverter Suite**: Multi-tool converter for PX ⟷ REM/EM, Byte/Data units, Unix Timestamps, and Currency exchange.
       - **TaskPulse Micro-Kanban**: Agile task board with priority queues, state progression (`todo` ➔ `in-progress` ➔ `done`), and `localStorage` persistence.
       - **ApiSandbox Inspector**: Interactive RESTful API explorer simulating endpoints, configurable latency (0ms, 150ms, 500ms), headers, and syntax-formatted JSON.
       - **Device & Platform Lab**: Runtime detector (Web vs Native Android via Capacitor), viewport metrics, network connection state, and haptic feedback pulse test.
     - Toggle between **Interactive Demo** and **View Source Code** for each feature.
  3. **Contact Tab**:
     - Interactive message form with client-side validation and confirmation feedback.
     - Direct email copy-to-clipboard button and mailto launcher.
     - Live location card with real-time Austin, TX clock ticker.
     - Social and repository profile links ([GitHub](https://github.com/JPatoChan), [LinkedIn](https://linkedin.com/in/patrick-nance)).
- **Mobile First UX**:
  - Android-style bottom tab bar with haptic feedback vibration.
  - Safe-area insets support (`env(safe-area-inset-bottom)`) for Android gesture bars and edge-to-edge displays.
  - Hardware back button handler support.

---

## 🛠️ Project Structure

```text
portfolio-app/
├── android/                         # Native Android Gradle Project
│   ├── app/                         # Android application module
│   │   ├── src/main/assets/public/  # Synced web distribution
│   │   └── build/outputs/apk/debug/ # Pre-built debug APK (app-debug.apk)
│   └── build.gradle
├── src/
│   ├── components/
│   │   ├── about/                   # About tab sections (Hero, Skills, Experience, Philosophy)
│   │   ├── features/                # 6 interactive micro-apps & selector container
│   │   ├── contact/                 # Contact form, live clock, direct actions
│   │   ├── icons/                   # Custom SVG social icons
│   │   ├── Navbar.tsx               # Desktop header & runtime indicator
│   │   ├── MobileNav.tsx            # Android bottom navigation bar
│   │   └── Footer.tsx               # Footer with back-to-top action
│   ├── data/
│   │   └── portfolioData.ts         # Centralized portfolio data
│   ├── types/                       # TypeScript interfaces
│   ├── utils/                       # Platform detection & haptic helpers
│   ├── App.tsx                      # Root application & tab routing
│   └── main.tsx
├── capacitor.config.ts              # Capacitor configuration
├── tailwind.config.js               # Tailwind styling configuration
└── package.json
```

---

## 🚀 Getting Started

### 1. Web Development Server

```bash
cd portfolio-app
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

### 2. Build Web Production Bundle

```bash
npm run build
```

The optimized static assets are emitted into the `dist/` directory.

### 3. Sync to Android Native Project

```bash
npm run cap:build
```

This compiles the web app and syncs all assets into the Android native project folder (`android/app/src/main/assets/public`).

### 4. Build or Run Android APK

To assemble the Android APK from the command line:

```powershell
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
cd android
.\gradlew.bat assembleDebug
```

The compiled APK will be located at:
`portfolio-app/android/app/build/outputs/apk/debug/app-debug.apk`

To open the project directly in **Android Studio**:

```bash
npm run cap:open
```
