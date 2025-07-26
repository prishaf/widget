# Floating Accessibility Widget
A comprehensive, customizable floating accessibility widget that helps users personalize their browsing experience for better accessibility. Built with React, Next.js, and Tailwind CSS.

Features
Visual Adjustments
Contrast+: Increase color contrast by 120%
Highlight Links: Emphasize hyperlinks with borders and backgrounds
Text Size: Adjustable font size from 50% to 200%
Text Spacing: Modify letter spacing and line height

Behavior Controls
Pause Animations: Stop all CSS/JS animations and transitions
Hide Images: Toggle image visibility
Dyslexia-Friendly Font: Switch to Lexend font with improved readability

Interface Tools
Large Cursor: Enlarge pointer for better visibility
Show Tooltips: Force visible alt-text and tooltips
Page Structure: Show heading outlines (H1, H2, etc.)

Additional Features
Persistent Settings: All preferences saved to localStorage
Real-time Preview: Changes apply immediately
Reset Function: One-click reset to default settings
Responsive Design: Works on all screen sizes
WCAG 2.1 Compliant: Follows accessibility standards

Project Structure
accessibility-widget/
├── app/
│   ├── globals.css              # Global styles and custom animations
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Demo page with animations
│   └── accessibility-statement/
│       └── page.tsx             # Accessibility statement page
├── components/
│   ├── ui/                      # shadcn/ui components
│   └── accessibility-widget.tsx # Main widget component
├── public/                      # Static assets
├── README.md
├── package.json
├── tailwind.config.ts
└── tsconfig.json

Styling:
The widget uses Tailwind CSS classes.

<img width="1871" height="852" alt="Screenshot 2025-07-26 212416" src="https://github.com/user-attachments/assets/3e17fe8a-abfb-48ab-9400-719a34fffdca" />
<img width="1859" height="850" alt="Screenshot 2025-07-26 212409" src="https://github.com/user-attachments/assets/42b61f26-c85e-4d4b-ae68-b54d58214ab8" />
<img width="1880" height="833" alt="Screenshot 2025-07-26 212400" src="https://github.com/user-attachments/assets/b44b739d-2683-43e3-a8b0-fbf1952f14c5" />
<img width="1896" height="860" alt="Screenshot 2025-07-26 212349" src="https://github.com/user-attachments/assets/32c6eadc-15c0-4802-90fc-5ff7b6d2d19a" />
<img width="1890" height="869" alt="Screenshot 2025-07-26 212341" src="https://github.com/user-attachments/assets/29487cd4-5236-427c-bf6e-a3d1bec93790" />
<img width="1893" height="857" alt="Screenshot 2025-07-26 212319" src="https://github.com/user-attachments/assets/cd970508-5398-4b8f-ba22-b920bc3bacdc" />
<img width="1887" height="867" alt="Screenshot 2025-07-26 212309" src="https://github.com/user-attachments/assets/3ce0c6dd-25c1-4d2b-8a45-55124c5a728d" />
