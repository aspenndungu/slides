import { 
  Settings, Mic2, Trophy, Phone, Calendar, 
  History, CheckCircle2, FileText, Layout, 
  MessageSquare, UserCircle2, ArrowRight
} from "lucide-react";

export type SlideType = 
  | 'title' 
  | 'chapters' 
  | 'proof' 
  | 'problem' 
  | 'flow' 
  | 'architecture' 
  | 'grid' 
  | 'schema' 
  | 'verdict' 
  | 'table' 
  | 'winner'
  | 'cta';

export interface SlideData {
  id: string;
  light?: boolean;
  kicker: string;
  title: string;
  desc?: string;
  ghost?: string;
  type: SlideType;
  tags?: string[];
  phoneCaption?: string;
  panel?: { kicker: string; title: string; desc: string; badge?: string };
  steps?: { n: string; t: string; d: string }[];
  cards?: { t: string; d: string; i: any }[];
  flowNodes?: string[];
  diagram?: { t: string; d: string }[];
  schema?: { input: string[]; output: string[] };
  mega?: { n: string; s: string };
  tableData?: string[][];
  say: string;
  screen: string;
}

export const SLIDES: SlideData[] = [
  {
    id: "s01",
    light: true,
    type: "title",
    ghost: "BATTLE",
    kicker: "The AI Agent Battle",
    title: "Vapi vs Retell: I Let Two AI Agents Battle",
    desc: "The ultimate 3-round showdown to find the superior voice agent for your business.",
    tags: ["n8n logic", "Live Testing", "2026 Ready"],
    phoneCaption: "FIRED vs HIRED",
    say: "This AI just handled an angry customer and booked a demo—without me lifting a finger. I built it on Vapi... and then I built the exact same agent on Retell. One of them is currently running my business. The other got fired. Here is the ultimate AI voice agent battle.",
    screen: "Start with fast-paced B-roll. Phone buzzing on desk. Satisfying ding as calendar updates."
  },
  {
    id: "s02",
    type: "problem",
    kicker: "the context",
    title: "The Rules of the Test",
    desc: "If you run a business, missed calls equal lost money. I needed an AI that could answer, qualify, and book 24/7.",
    steps: [
      { n: "1", t: "Check Availability", d: "Direct Google Calendar lookup via webhook." },
      { n: "2", t: "Find Alt Slots", d: "Suggest 3 smart backups if the time is taken." },
      { n: "3", t: "Book Appt", d: "Lock in the slot and send confirmation." },
      { n: "4", t: "Log Call", d: "Save transcript and summary for visibility." }
    ],
    say: "To make this a fair fight, they need the exact same brain. I used n8n—the glue between apps—to build the logic. 4 simple endpoints: Check, Find Alts, Book, and Log. Let's see who handles real customers better.",
    screen: "Zoom in on n8n canvas. Highlight the 4 nodes as they are spoken. SFX: Pop, Pop, Pop, Pop."
  },
  {
    id: "s01b",
    type: "chapters",
    ghost: "ROUND 1",
    kicker: "01:00 - 02:00",
    title: "ROUND 1: SETUP & CUSTOMIZATION",
    desc: "Evaluating the developer experience and system flexibility.",
    cards: [
      { t: "Vapi UI", d: "Developer-first, deep IVR trees, exact pronunciation.", i: Settings },
      { t: "Retell UI", d: "User-friendly, rapid deployment, clean interface.", i: Layout }
    ],
    say: "Round one: The Setup. Both platforms let you paste in a prompt in minutes. But Vapi's developer experience is on another level.",
    screen: "Split screen. Vapi UI on left, Retell UI on right."
  },
  {
    id: "s03",
    type: "proof",
    light: true,
    kicker: "Round 01",
    title: "Setup & Customization",
    desc: "Pastel the prompt, connect the voice, and tune the developer experience.",
    panel: { 
      kicker: "Scoreboard", 
      title: "Vapi: 1 | Retell: 0", 
      desc: "Vapi takes Round 1 for sheer power and customizability. Complex IVR trees and exact pronunciation tweaking.",
      badge: "Vapi Wins Setup"
    },
    say: "Round one: The Setup. Both platforms let you paste in a prompt in minutes. But Vapi's developer experience is on another level. From complex IVR trees to exact pronunciation, Vapi gives you ultimate control.",
    screen: "Punch-in on Vapi's advanced IVR and routing settings. Graphic: Scoreboard Ding."
  },
  {
    id: "s03b",
    type: "chapters",
    ghost: "ROUND 2",
    kicker: "02:00 - 03:15",
    title: "ROUND 2: THE PERFECT BOOKING",
    desc: "A live test to measure booking accuracy and conversational latency.",
    cards: [
      { t: "Test 1: Vapi", d: "Monitoring n8n webhooks and execution speed.", i: Phone },
      { t: "Test 2: Retell", d: "Measuring turn-taking and natural flow.", i: Mic2 }
    ],
    say: "Round two: The Live Call. Let's see how Vapi handles a standard booking... and then, the exact same script, using Retell.",
    screen: "Creator holding up a phone on speaker. Text overlay: Test 1: Vapi, then Test 2: Retell."
  },
  {
    id: "s04",
    type: "verdict",
    kicker: "Round 02",
    title: "The Perfect Booking",
    desc: "Audio comparison: Listen to the gap between my sentence and the AI's response.",
    mega: { n: "200", s: "ms" },
    say: "Both achieved the goal perfectly. But did you catch the difference? Listen to the gap. Retell's turn-taking was about 200 milliseconds faster. In a phone call, that's the difference between a natural chat and a dropped line.",
    screen: "Show audio waveform graph comparing the two. Overlay latency metrics."
  },
  {
    id: "s05",
    type: "table",
    kicker: "Round 02 Score",
    title: "Latency Battle Results",
    tableData: [
      ["Metric", "Vapi", "Retell", "Leader"],
      ["Accuracy", "High", "High", "Tie"],
      ["Latency", "2.1s", "1.7s", "Retell"],
      ["Natural Feel", "Solid", "Superior", "Retell"],
      ["Score", "1", "1", "Tie"]
    ],
    say: "Both achieved the goal, but Retell takes Round 2 for the conversational speed. We are currently 1 to 1.",
    screen: "Show table. Update scoreboard to 1-1."
  },
  {
    id: "s05b",
    type: "chapters",
    ghost: "ROUND 3",
    kicker: "03:15 - 04:30",
    title: "ROUND 3: THE STRESS TEST",
    desc: "The Tiebreaker. Can they handle an angry customer and an interruption?",
    cards: [
      { t: "Vapi Call", d: "Response to frustration and handoff request.", i: History },
      { t: "Retell Call", d: "Interruption detection and emotional matching.", i: MessageSquare }
    ],
    say: "It is one to one. Whoever wins this stress test runs my business. What happens when the customer gets frustrated and demands a human?",
    screen: "Creator looking serious. Prepare for the 'Angry Customer' audio comparison."
  },
  {
    id: "s06",
    type: "winner",
    kicker: "Round 03",
    title: "The Stress Test",
    say: "It is one to one. Whoever wins this stress test runs my business. Booking an open slot is easy. But what happens when the caller gets frustrated and demands a human?",
    screen: "Creator looking serious. Quick zoom-in. Prepare for the interruption test comparison."
  },
  {
    id: "s07",
    type: "schema",
    light: true,
    kicker: "Interruption Handling",
    title: "The Human Handoff",
    desc: "Vapi hesitated. Retell recognized the interruption instantly and matched the empathy.",
    schema: {
      input: ["User Interruption", "Frustrated Tone", "Request Human"],
      output: ["Callback Node Triggered", "Empathy Response", "Handoff Logic"]
    },
    say: "Vapi did the job, but it hesitated. Retell instantly recognized the interruption, matched the tone, and triggered the callback node. Retell wins the battle.",
    screen: "Split screen kinetic typography. Animate the text of the conversation aggressively."
  },
  {
    id: "s08",
    type: "title",
    ghost: "WINNER",
    kicker: "The Final Verdict",
    title: "Retell is staying in production.",
    desc: "Lower latency, brilliant interruption handling, and more natural flow.",
    tags: ["Latency Winner", "Empathy Winner", "Retell AI"],
    phoneCaption: "HIRED",
    say: "So Retell wins the battle. The latency is lower, the interruption handling is brilliant, and the conversational flow just feels slightly more human. Vapi is still incredible for heavy backend routing, but Retell is staying in my production environment.",
    screen: "Creator full screen. Satisfied conclusion."
  },
  {
    id: "s09",
    type: "flow",
    kicker: "the build",
    title: "4-Node n8n Backend",
    flowNodes: ["Webhook", "Calendar Check", "Conditional logic", "Reply Node"],
    panel: { kicker: "Tutorial", title: "Step by Step", desc: "Start with the checkAvailability node. Connect your Google Auth. Map the requested slot." },
    say: "Neither work if your logic is broken. If you want to see exactly how to build this 4-node n8n backend, I'm showing you step-by-step right now. Step one: your webhook listening node...",
    screen: "Dynamic text overlays for Step 1, Step 2, Step 3. Fast-paced visual tutorial."
  },
  {
    id: "s10",
    type: "cta",
    light: true,
    kicker: "The Payoff",
    title: "Get the Cheat Sheet",
    desc: "Skip the build and copy my exact n8n workflow, prompts, and testing checklist.",
    say: "If you want to skip the build and just copy my exact workflow, I put it all in a free cheat sheet in the description. Once your AI is taking calls, you'll need follow-ups. Click this video to see how to close those leads.",
    screen: "End screen elements appear. Lead-gen offer prominent."
  }
];
