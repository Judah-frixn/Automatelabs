import { useEffect, useState, useRef } from 'react';
import './App.css';

// Premium vector SVGs representing various app systems in the flow tabs
const icons = {
  webhook: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 9h6v6H9zM9 1v2M15 1v2M9 21v2M15 21v2M1 9h2M1 15h2M21 9h2M21 15h2" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  crm: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="3" />
      <circle cx="5" cy="19" r="3" />
      <circle cx="19" cy="19" r="3" />
      <path d="M7 17l4.5-9.5M17 17l-4.5-9.5" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  signature: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M16 13a2 2 0 0 1-2 2H8v-4h4a2 2 0 0 1 2 2z" />
    </svg>
  ),
  drive: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19H2a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5l2 3h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2z" />
    </svg>
  ),
  invoice: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="2" x2="22" y2="6" />
      <path d="M7.5 8H20A1.5 1.5 0 0 1 21.5 9.5v11A1.5 1.5 0 0 1 20 22H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.5" />
      <path d="M16 14h2M16 18h2M7 14h5M7 18h3" />
    </svg>
  ),
  salesforce: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10a5 5 0 0 0-9.5-2A4 4 0 0 0 5 12a4 4 0 0 0 4 4h9a5 5 0 0 0 0-10z" />
    </svg>
  ),
  airtable: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </svg>
  ),
  notion: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16v16H4zM9 9v6M15 9v6M9 9h6M9 15h6" />
    </svg>
  ),
  slack: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  postgres: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  )
};

const tabData = {
  'lead-capture': {
    title: 'Lead Ingestion Automation',
    desc: 'Capture and assign inquiries. Connect channels to dispatch leads under five seconds.',
    target: 'Target: Ingest and assign leads under 5s',
    node1: 'Instagram Lead',
    node2: 'AI Intent Qualifier',
    node3a: 'WhatsApp Send',
    node3b: 'HubSpot CRM',
    node1Icon: icons.webhook,
    node2Icon: icons.ai,
    node3aIcon: icons.whatsapp,
    node3bIcon: icons.crm,
    step1: 'Sub-second listeners intercept incoming webhooks.',
    step1Sub: 'API listeners catch webhooks instantly from advertising layers.',
    step2: 'Contextual filtering separates real inquiries from noise.',
    step2Sub: 'Duplicate check and contact validation models scan details.',
    step3: 'Instant dispatch pipelines route data to destination APIs.',
    step3Sub: 'Trigger representative notification channels and log CRM fields.'
  },
  'intelligent-response': {
    title: 'Intelligent Response Automation',
    desc: 'Qualify prospects, answer FAQs, and book meetings dynamically.',
    target: 'Target: 24/7 sub-2m first response coverage',
    node1: 'Inbound Inquiry',
    node2: 'RAG Knowledge base',
    node3a: 'Email Relayed',
    node3b: 'Calendar Synced',
    node1Icon: icons.email,
    node2Icon: icons.ai,
    node3aIcon: icons.email,
    node3bIcon: icons.calendar,
    step1: 'API intercept captures email queries instantly.',
    step1Sub: 'Extract parameters and query vector database structures.',
    step2: 'Semantic context lookup yields valid answers.',
    step2Sub: 'Draft contextual replies using custom LLM pipelines in 800ms.',
    step3: 'Dynamic scheduling dispatch coordinates booking.',
    step3Sub: 'Cross-reference grid slots and register calendar details automatically.'
  },
  'direct-comm': {
    title: 'Direct Communication Automation',
    desc: 'Automate onboarding, invoicing, and updates instantly.',
    target: 'Target: Complete elimination of manual alerts',
    node1: 'Client Signed',
    node2: 'Folder Builder',
    node3a: 'PDF Dispatched',
    node3b: 'WhatsApp Alert',
    node1Icon: icons.signature,
    node2Icon: icons.drive,
    node3aIcon: icons.invoice,
    node3bIcon: icons.whatsapp,
    step1: 'E-signature webhooks trigger immediately upon contract lock.',
    step1Sub: 'Verify signer parameters and structure onboarding folders.',
    step2: 'Direct PDF layout engines build invoice receipts.',
    step2Sub: 'Assemble contracts and host secure cloud folders automatically.',
    step3: 'Push notification dispatches fire simultaneously.',
    step3Sub: 'Relay files via email relays and WhatsApp business APIs instantly.'
  },
  'db-syncing': {
    title: 'Database Syncing Automation',
    desc: 'Sync HubSpot, Airtable, and Notion. Eliminate data discrepancies.',
    target: 'Target: Zero human data reconciliation errors',
    node1: 'CRM Field Updated',
    node2: 'Field Mapper',
    node3a: 'Airtable Sync',
    node3b: 'Notion Database',
    node1Icon: icons.salesforce,
    node2Icon: icons.ai,
    node3aIcon: icons.airtable,
    node3bIcon: icons.notion,
    step1: 'Relational database listeners check for changes.',
    step1Sub: 'Catch field modifications, stage transactions, and verify schema.',
    step2: 'Dynamic field maps resolve translation gaps.',
    step2Sub: 'Sanitize attributes and align key maps between CRM models.',
    step3: 'Simultaneous records writing finishes in seconds.',
    step3Sub: 'Eliminate duplicate reconciliations and output dashboard updates.'
  },
  'op-routing': {
    title: 'Operational Routing Automation',
    desc: 'Scan attachments, parse data, and route approval alerts.',
    target: 'Target: Automated routing pathways for support',
    node1: 'Email Attachment',
    node2: 'OCR Parse Engine',
    node3a: 'Slack Notification',
    node3b: 'Approval Chain',
    node1Icon: icons.email,
    node2Icon: icons.ai,
    node3aIcon: icons.slack,
    node3bIcon: icons.signature,
    step1: 'Attachment intercept extracts invoice files.',
    step1Sub: 'Read document streams and launch digital parser lines.',
    step2: 'OCR document scanning retrieves tabular records.',
    step2Sub: 'Validate pricing lines, verify vendors, and check limits.',
    step3: 'Interactive approval queues post to chat tools.',
    step3Sub: 'Managers click Slack buttons to complete authorization flows.'
  },
  'context-agents': {
    title: 'Context-Aware Agent Automation',
    desc: 'Deploy assistants trained on internal documents to handle standard queries.',
    target: 'Target: Safe, verified retrieval of complex data',
    node1: 'Client Query',
    node2: 'Semantic Agent',
    node3a: 'Record Loaded',
    node3b: 'Staff Escalate',
    node1Icon: icons.whatsapp,
    node2Icon: icons.ai,
    node3aIcon: icons.postgres,
    node3bIcon: icons.crm,
    step1: 'User input queries capture context prompts.',
    step1Sub: 'Verify permissions and index prompt structures.',
    step2: 'Semantic vector indexes retrieve exact context match.',
    step2Sub: 'Extract accurate specification manuals in 500ms.',
    step3: 'Dynamic routing resolves complex edge cases.',
    step3Sub: 'Escalate inquiries directly to support staff if criteria drop.'
  }
};

const sliderMath = [
  {
    time: 'Immediate (< 1m)',
    conv: '21.0x',
    convDesc: 'Optimal respond window. Extremely likely to qualify and close.',
    convWidth: '100%',
    loss: '2%',
    lossDesc: 'Virtual elimination of lead abandonment.',
    lossWidth: '2%'
  },
  {
    time: '5 Minutes',
    conv: '18.0x',
    convDesc: 'Golden response window. Highly likely to qualify and close.',
    convWidth: '85%',
    loss: '16%',
    lossDesc: 'Minimal abandonment due to short delay.',
    lossWidth: '16%'
  },
  {
    time: '30 Minutes',
    conv: '4.5x',
    convDesc: 'Response lag sets in. Leads cool down significantly.',
    convWidth: '40%',
    loss: '45%',
    lossDesc: 'Substantial decay. High chance prospect moves to competitor.',
    lossWidth: '45%'
  },
  {
    time: '1 Hour',
    conv: '1.8x',
    convDesc: 'Sub-optimal engagement. Low probability of qualification.',
    convWidth: '18%',
    loss: '72%',
    lossDesc: 'Severe leakage. Most prospects have disengaged.',
    lossWidth: '72%'
  },
  {
    time: '2 Hours+',
    conv: '1.0x',
    convDesc: 'Base conversion probability. Extremely difficult to qualify.',
    convWidth: '5%',
    loss: '92%',
    lossDesc: 'Critical failure. Leads abandon completely.',
    lossWidth: '92%'
  }
];

const servicesMap = {
  'ai-workflow-automation': {
    title: 'AI Workflow Automation',
    tagline: 'Hire a dedicated AI workflow automation consultant to streamline your operations.',
    intro: 'We build custom AI agents, automated workflows, and robust database syncs designed to run your business operations with zero human friction. Aligned to the dynamic growth of Indian enterprises with international client outreach.',
    keyword1: 'AI workflow automation',
    keyword2: 'workflow automation consultant',
    keyword3: 'AI workflow automation for service businesses',
    bullets: [
      'Eliminate repetitive tasks using custom Python & NodeJS script blocks.',
      'Deploy semantic retrieval agents (RAG) trained on your company manuals.',
      'Active notification loops synced between webhooks and team channels.',
      'Secure, scalable API architectures connecting local data structures with global web layers.'
    ],
    tools: ['Zapier', 'Make.com', 'n8n.io', 'OpenAI', 'Python', 'NodeJS']
  },
  'business-process-automation-services': {
    title: 'Business Process Automation Services',
    tagline: 'Scale output and automate repetitive business tasks seamlessly.',
    intro: 'Standardize operations with modern business process automation services. We map, design, and deploy robust multi-step logical paths that handle core administrative and client pipelines automatically.',
    keyword1: 'business process automation services',
    keyword2: 'automate repetitive business tasks',
    keyword3: 'business workflow optimization',
    bullets: [
      'End-to-end database synchronizations executing in real-time.',
      'Automated invoice billing and tabular receipt generation.',
      'Intelligent task routing and multi-branch approval pathways.',
      'Custom performance dashboards displaying workflow execution telemetry.'
    ],
    tools: ['Salesforce', 'Zoho CRM', 'Airtable', 'SQL', 'Make.com', 'n8n.io']
  },
  'small-business-automation-services': {
    title: 'Small Business Automation Services',
    tagline: 'Practical AI automation for small and mid-sized businesses.',
    intro: 'Affordable, results-driven small business automation services tailored to help growing Indian businesses scale globally. Save time, reduce manual administrative overhead, and automate your lead capture.',
    keyword1: 'small business automation services',
    keyword2: 'AI automation for small businesses',
    keyword3: 'best AI automation services for small business',
    bullets: [
      'Connect marketing forms directly to CRMs, spreadsheets, and calendars.',
      'Automate appointment scheduling and instant WhatsApp/Email follow-up replies.',
      'Reduce manual data entry by up to 90% across your departments.',
      'Continuous 24/7 background execution to capture interest outside office hours.'
    ],
    tools: ['WhatsApp API', 'Calendly', 'Google Workspace', 'Hubspot', 'Make.com', 'Zapier']
  },
  'chatgpt-automation-for-business': {
    title: 'ChatGPT Automation for Business',
    tagline: 'Custom OpenAI LLM models & AI customer support automation.',
    intro: 'Unlock the power of large language models with custom ChatGPT automation for business. Automate customer support replies, draft complex email copy contextually, and extract key parameters from incoming documents.',
    keyword1: 'ChatGPT automation for business',
    keyword2: 'automate customer support replies with ChatGPT',
    keyword3: 'AI customer support automation',
    bullets: [
      'Contextual vector search (RAG) retrieving instant, verified answers.',
      'Dynamic AI qualifiers separating genuine inquiries from noise.',
      'Automatic ticket escalations to human support lines when confidence drops.',
      'Direct API integrations with OpenAI models operating under 1.5 seconds.'
    ],
    tools: ['OpenAI API', 'LangChain', 'Pinecone', 'ChatGPT', 'NodeJS', 'Python']
  },
  'crm-workflow-automation': {
    title: 'CRM Workflow Automation Services',
    tagline: 'Automate CRM data entry, sync systems, and optimize pipelines.',
    intro: 'Professional CRM automation services focusing on HubSpot, Salesforce, Zoho, and Airtable. Connect contact forms, spreadsheet registries, and databases to automate lead follow-up.',
    keyword1: 'CRM automation services',
    keyword2: 'CRM workflow automation',
    keyword3: 'automate CRM data entry',
    bullets: [
      'Instant client webhook capture triggering custom sales pipelines.',
      'Multi-directional field syncing to eliminate database reconciliation gaps.',
      'Automated lead qualification scoring and smart rep routing.',
      'Elimination of manual database tracking and duplicate record creation.'
    ],
    tools: ['Hubspot CRM', 'Salesforce API', 'Zoho CRM', 'Airtable Sync', 'Zapier Webhooks']
  },
  'no-code-automation-services': {
    title: 'No-Code Automation Agency & Services',
    tagline: 'Professional workflow bridges using Zapier, Make, and n8n.',
    intro: 'A leading no-code automation agency building reliable multi-step integrations. Connect your essential business tools and coordinate secure data transfers without writing custom backend code.',
    keyword1: 'no-code automation services',
    keyword2: 'no-code automation agency',
    keyword3: 'custom automation workflows for small business',
    bullets: [
      'Zapier and Make integrations featuring error tolerance and retry logic.',
      'Custom JS/Python logic modules embedded inside no-code paths.',
      'Comprehensive workflow blueprinting before launching integrations.',
      'Scale your operations without scaling unnecessary software license overhead.'
    ],
    tools: ['Zapier', 'Make.com', 'n8n.io', 'Airtable', 'Trello', 'Slack APIs']
  },
  'ai-customer-support-automation': {
    title: 'AI Customer Support Automation',
    tagline: 'Deploy 24/7 smart context-aware agents to delight customers.',
    intro: 'Elevate support metrics with advanced AI customer support automation. Deploy context-aware digital assistants trained on your specific brand standards, product guides, and FAQs.',
    keyword1: 'AI customer support automation',
    keyword2: 'automate customer support replies with ChatGPT',
    keyword3: 'best AI automation services for small business',
    bullets: [
      'Instant, contextually-drafted replies responding to customer emails.',
      'Automatic document scanners reading and routing support tickets.',
      'Direct WhatsApp Business and Slack notifications for immediate follow-up.',
      'Proactive appointment bookings and calendar slots management.'
    ],
    tools: ['OpenAI GPT-4', 'WhatsApp Business', 'Slack bot', 'Gmail API', 'Pinecone Database']
  },
  'data-integration-services': {
    title: 'Data Integration Services',
    tagline: 'Automate spreadsheet reporting and eliminate manual data entry.',
    intro: 'Ensure absolute accuracy across operations with custom data integration services for small business. Automatically consolidate databases, sync client sheets, and generate reports.',
    keyword1: 'data integration services for small business',
    keyword2: 'automate spreadsheet reporting',
    keyword3: 'reduce manual data entry with automation',
    bullets: [
      'Consolidate disjointed CSV, Excel, and SQL files into a single ledger.',
      'Automate recurring analytical reporting and database updates.',
      'Direct webhook triggers moving sales logs instantly between records.',
      'Active validation checks rejecting malformed coordinates or empty cells.'
    ],
    tools: ['Postgres SQL', 'Google Sheets API', 'Excel Automation', 'Make.com', 'Python Pandas']
  }
};

export default function App() {
  // --- SIMPLE PATH-BASED ROUTING ---
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const cleanPath = currentPath.replace(/\/index\.html$/, '').replace(/\/$/, '');
  const serviceKey = cleanPath.split('/').pop();
  const isServicePage = servicesMap.hasOwnProperty(serviceKey);
  const activeService = isServicePage ? servicesMap[serviceKey] : null;

  // --- TELEMETRY FEED STATE ---
  const [logs, setLogs] = useState([
    { id: 1, title: 'Invoice Sent', desc: 'INV-9824 dispatched to client', meta: '$2,550', type: 'invoice', metaClass: 'price' },
    { id: 2, title: 'Lead Qualified', desc: 'New lead from Website', meta: 'High Intent', type: 'lead', metaClass: 'qualify' },
    { id: 3, title: 'Follow-up Done', desc: 'Email sequence executed', meta: 'Email active', type: 'followup', metaClass: 'seq' }
  ]);

  // --- SIMULATOR STATE ---
  const [activeTab, setActiveTab] = useState('lead-capture');
  const [simStatus, setSimStatus] = useState('IDLE');
  const [node1Class, setNode1Class] = useState('sim-node');
  const [node2Class, setNode2Class] = useState('sim-node');
  const [node3aClass, setNode3aClass] = useState('sim-node');
  const [node3bClass, setNode3bClass] = useState('sim-node');
  
  const [node1StatusText, setNode1StatusText] = useState('WAITING');
  const [node2StatusText, setNode2StatusText] = useState('WAITING');
  const [node3aStatusText, setNode3aStatusText] = useState('WAITING');
  const [node3bStatusText, setNode3bStatusText] = useState('WAITING');

  const [path1Class, setPath1Class] = useState('s-path');
  const [path2aClass, setPath2aClass] = useState('s-path');
  const [path2bClass, setPath2bClass] = useState('s-path');

  const [packet1Active, setPacket1Active] = useState(false);
  const [packet2aActive, setPacket2aActive] = useState(false);
  const [packet2bActive, setPacket2bActive] = useState(false);

  const [activeStep, setActiveStep] = useState(1);
  const [simButtonDisabled, setSimButtonDisabled] = useState(false);
  const [simButtonText, setSimButtonText] = useState('Run Simulation');

  // --- CALCULATOR STATE ---
  const [sliderVal, setSliderVal] = useState(1);

  // --- REFS ---
  const manualCityRef = useRef(null);
  const automatedCityRef = useRef(null);

  const node1Ref = useRef(null);
  const node2Ref = useRef(null);
  const node3aRef = useRef(null);
  const node3bRef = useRef(null);

  const line1Ref = useRef(null);
  const line2aRef = useRef(null);
  const line2bRef = useRef(null);

  const flow1Ref = useRef(null);
  const flow2aRef = useRef(null);
  const flow2bRef = useRef(null);

  const animM1Ref = useRef(null);
  const animM2aRef = useRef(null);
  const animM2bRef = useRef(null);

  // --- 1. DESK SCROLL MORPH EFFECT ---
  useEffect(() => {
    const handleScroll = () => {
      const manualCity = manualCityRef.current;
      const automatedCity = automatedCityRef.current;

      if (!manualCity || !automatedCity) return;

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      
      const progressed = window.scrollY / scrollHeight; // 0 to 1

      const thresholdStart = 0.00;
      const thresholdEnd = 0.08;
      const t = Math.max(0, Math.min(1, (progressed - thresholdStart) / (thresholdEnd - thresholdStart)));

      // Morph Manual Desk
      manualCity.style.opacity = String((1 - t) * 0.28);
      manualCity.style.transform = `translateY(${t * -25}px) scale(${1 - t * 0.03})`;
      manualCity.style.filter = `blur(${t * 2.5}px) saturate(${1 - t * 0.3})`;

      // Morph Automated Desk
      automatedCity.style.opacity = String(t * 0.28);
      automatedCity.style.transform = `translateY(${(1 - t) * 25}px) scale(${0.97 + t * 0.03})`;

      // Body indicators
      if (t > 0.52) {
        document.body.classList.add('automated');
      } else {
        document.body.classList.remove('automated');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Initial run
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // --- 2. 3D MOUSE PARALLAX BACKDROP EFFECT ---
  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let animationFrameId = null;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const updateParallax = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      const manualLayer = manualCityRef.current?.querySelector('.desk-bg-layer');
      const autoLayer = automatedCityRef.current?.querySelector('.desk-bg-layer');

      if (manualLayer) {
        manualLayer.style.transform = `translate(${currentX * 15}px, ${currentY * 15}px)`;
      }
      if (autoLayer) {
        autoLayer.style.transform = `translate(${currentX * 15}px, ${currentY * 15}px)`;
      }

      animationFrameId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // --- 3. TELEMETRY EVENT STREAM INTERVAL LOOP ---
  useEffect(() => {
    const logTemplates = [
      { title: 'Invoice Sent', desc: 'INV-9825 dispatched to client', meta: '$4,120', type: 'invoice', metaClass: 'price' },
      { title: 'Lead Qualified', desc: 'Inquiry via LinkedIn Campaign', meta: 'High Intent', type: 'lead', metaClass: 'qualify' },
      { title: 'Follow-up Done', desc: 'WhatsApp sequence step 2 executed', meta: 'Active', type: 'followup', metaClass: 'seq' },
      { title: 'Database Synced', desc: 'HubSpot field map reconciled', meta: 'Synced', type: 'followup', metaClass: 'seq' },
      { title: 'WhatsApp Sent', desc: 'Client onboarding instructions delivered', meta: 'Sent', type: 'lead', metaClass: 'qualify' },
      { title: 'Attachment Parsed', desc: 'Client PDF contract read (OCR)', meta: 'Verified', type: 'invoice', metaClass: 'price' },
      { title: 'Meeting Scheduled', desc: 'Discovery booking synced in Google Calendar', meta: 'Confirmed', type: 'lead', metaClass: 'qualify' },
      { title: 'Invoice Sent', desc: 'INV-9826 dispatched to client', meta: '$1,895', type: 'invoice', metaClass: 'price' }
    ];

    let invoiceIndex = 9827;
    let localId = 4;

    const interval = setInterval(() => {
      const templateIdx = Math.floor(Math.random() * logTemplates.length);
      const logTemplate = logTemplates[templateIdx];
      const log = { ...logTemplate, id: localId++ };

      if (log.type === 'invoice') {
        log.desc = `INV-${invoiceIndex++} dispatched to client`;
        log.meta = `$${(Math.floor(Math.random() * 60) * 100 + 1200).toLocaleString()}`;
      }

      setLogs((prevLogs) => {
        const updated = [...prevLogs, log];
        if (updated.length > 3) {
          // Slide out first item
          return updated.slice(1);
        }
        return updated;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // --- 4. SCROLL REVEAL OBSERVER ---
  useEffect(() => {
    const revealElements = document.querySelectorAll(
      '.friction-card, .mockup-card, .sim-canvas-card, .gauge-card, .int-card, .method-step-row, .outcome-card, .section-title-wrap, .hero-copy'
    );

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -25px 0px'
    });

    revealElements.forEach(el => {
      el.classList.add('reveal-on-scroll');
      revealObserver.observe(el);
    });

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  // --- 5. OUTCOMES INT CHART ANIMATION COUNT ---
  useEffect(() => {
    const stats = document.querySelectorAll('.outcome-stat');
    if (stats.length === 0) return;

    const performCounting = (el) => {
      const target = parseFloat(el.getAttribute('data-tgt'));
      const suffix = el.getAttribute('data-suf') || '';
      const duration = 1800; // ms
      const startVal = performance.now();

      const animateCount = (currentTime) => {
        const elapsed = currentTime - startVal;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeVal = progress * (2 - progress);
        const current = Math.floor(easeVal * target);

        el.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          el.textContent = target + suffix;
        }
      };

      requestAnimationFrame(animateCount);
    };

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          performCounting(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    stats.forEach(s => obs.observe(s));

    return () => obs.disconnect();
  }, []);

  // --- 6. SIMULATOR BEZIER LINES ALIGNER ---
  const drawConnectorLines = () => {
    const node1 = node1Ref.current;
    const node2 = node2Ref.current;
    const node3a = node3aRef.current;
    const node3b = node3bRef.current;

    const line1 = line1Ref.current;
    const line2a = line2aRef.current;
    const line2b = line2bRef.current;

    const flow1 = flow1Ref.current;
    const flow2a = flow2aRef.current;
    const flow2b = flow2bRef.current;

    if (!node1 || !node2 || !node3a || !node3b) return;

    const svg = document.getElementById('simSvg');
    if (!svg) return;
    const svgRect = svg.getBoundingClientRect();

    const updatePath = (startEl, endEl, pathObj, flowObj) => {
      if (!startEl || !endEl || !pathObj || !flowObj) return;

      const rStart = startEl.getBoundingClientRect();
      const rEnd = endEl.getBoundingClientRect();

      const x1 = rStart.left + rStart.width / 2 - svgRect.left;
      const y1 = rStart.top + rStart.height / 2 - svgRect.top;
      const x2 = rEnd.left + rEnd.width / 2 - svgRect.left;
      const y2 = rEnd.top + rEnd.height / 2 - svgRect.top;

      const dx = Math.abs(x2 - x1) * 0.45;
      const d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

      pathObj.setAttribute('d', d);
      flowObj.setAttribute('d', d);
    };

    const portOut1 = node1.querySelector('.port-out');
    const portIn2 = node2.querySelector('.port-in');
    updatePath(portOut1, portIn2, line1, flow1);

    const portOut2 = node2.querySelector('.port-out');
    const portIn3a = node3a.querySelector('.port-in');
    updatePath(portOut2, portIn3a, line2a, flow2a);

    const portIn3b = node3b.querySelector('.port-in');
    updatePath(portOut2, portIn3b, line2b, flow2b);
  };

  useEffect(() => {
    // Redraw on window event changes
    window.addEventListener('resize', drawConnectorLines);
    
    // Draw lines after initial DOM mounts
    setTimeout(drawConnectorLines, 100);

    return () => {
      window.removeEventListener('resize', drawConnectorLines);
    };
  }, []);

  // Redraw when tabs toggle
  useEffect(() => {
    setTimeout(drawConnectorLines, 60);
  }, [activeTab]);

  // --- 7. SIMULATION SIMULATOR CONTROL TRIGGER ---
  const runSimulation = () => {
    if (simStatus === 'RUNNING') return;

    setSimStatus('RUNNING');
    setSimButtonDisabled(true);
    setSimButtonText('Processing...');

    // 1. Highlight Node 1
    setNode1Class('sim-node active');
    setNode1StatusText('TRIGGERED');

    // Launch first packet
    setTimeout(() => {
      setPacket1Active(true);
      setPath1Class('s-path active');
      if (animM1Ref.current) animM1Ref.current.beginElement();
    }, 300);

    // 2. Transmit to Node 2
    setTimeout(() => {
      setNode1Class('sim-node completed');
      setNode1StatusText('RECEIVED');

      setNode2Class('sim-node active');
      setNode2StatusText('PROCESSING');

      setActiveStep(2);
      setPacket1Active(false);
    }, 1100);

    // 3. Launch split packets
    setTimeout(() => {
      setNode2Class('sim-node completed');
      setNode2StatusText('COMPLETED');

      setActiveStep(3);

      setPacket2aActive(true);
      setPacket2bActive(true);
      setPath2aClass('s-path active');
      setPath2bClass('s-path active');
      
      if (animM2aRef.current) animM2aRef.current.beginElement();
      if (animM2bRef.current) animM2bRef.current.beginElement();
    }, 2600);

    // 4. Complete destination stack
    setTimeout(() => {
      setNode3aClass('sim-node completed');
      setNode3bClass('sim-node completed');

      const val3a = activeTab === 'db-syncing' ? 'SYNCED' : 'SENT';
      const val3b = (activeTab === 'db-syncing' || activeTab === 'op-routing' || activeTab === 'context-agents') ? 'SYNCED' : 'CREATED';

      setNode3aStatusText(val3a);
      setNode3bStatusText(val3b);

      setPacket2aActive(false);
      setPacket2bActive(false);

      setSimStatus('SUCCESS');
    }, 3600);

    // Auto reset
    setTimeout(() => {
      resetSimulatorUI();
    }, 6500);
  };

  const resetSimulatorUI = () => {
    setSimStatus('IDLE');
    setSimButtonDisabled(false);
    setSimButtonText('Run Simulation');

    setNode1Class('sim-node');
    setNode2Class('sim-node');
    setNode3aClass('sim-node');
    setNode3bClass('sim-node');

    setPath1Class('s-path');
    setPath2aClass('s-path');
    setPath2bClass('s-path');

    setPacket1Active(false);
    setPacket2aActive(false);
    setPacket2bActive(false);

    setNode1StatusText('WAITING');
    setNode2StatusText('WAITING');
    setNode3aStatusText('WAITING');
    setNode3bStatusText('WAITING');

    setActiveStep(1);

    setTimeout(drawConnectorLines, 50);
  };

  const selectTab = (tabKey) => {
    setActiveTab(tabKey);
    resetSimulatorUI();
  };

  // Derived current tab metrics
  const activeTabData = tabData[activeTab];

  // Derived speed calculations metrics
  const currentCalc = sliderMath[sliderVal];

  return (
    <>
      {/* ================= FIXED FULL-PAGE BACKGROUND CANVAS ================= */}
      <div className="background-city-container" aria-hidden="true" id="bgCity">
        <div className="desk-bg-wrap" ref={manualCityRef}>
          <div className="desk-bg-layer desk-bg-manual"></div>
        </div>
        <div className="desk-bg-wrap" ref={automatedCityRef} style={{ opacity: 0 }}>
          <div className="desk-bg-layer desk-bg-automated"></div>
        </div>
      </div>

      {/* ================= SCROLLABLE TEXT & INTERACTIVE CONTENT FLOW ================= */}
      <div className="main-content-flow">
        
        {/* Sticky Full-Width Header Topbar */}
        <header className="topbar" id="topbar">
          <div className="container header-container">
            <a className="brand" href="#home">
              <svg className="brand-logo-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <polygon points="3,20 6,14 10,14 7,20" />
                <polygon points="9,4 13.5,4 19,20 14.5,20" />
              </svg>
              automatelabs
            </a>
            <nav>
              <a href="#problem">The Problem</a>
              <a href="#workflows">What We Build</a>
              <a href="#speed-calc">Lead Speed Calc</a>
              <a href="#cta-section">Book a Call</a>
            </nav>
            <a className="btn btn-secondary btn-sm" href="#cta-section" style={{ borderWidth: '1.5px' }}>Book a Call</a>
          </div>
        </header>

        {isServicePage ? (
          /* ================= DEDICATED SERVICE SUBPAGE VIEW ================= */
          <>
            <section className="service-hero">
              <div className="container">
                <div className="service-hero-content">
                  <p className="eyebrow">Practical AI Service Offering</p>
                  <h1>
                    {activeService.title} <br/>
                    <span className="accent-text">for Small & Mid-Sized Businesses</span>
                  </h1>
                  <p className="intro-text">
                    {activeService.intro}
                  </p>
                  <div className="service-ctas">
                    <a className="btn btn-primary" href="https://calendly.com" target="_blank" rel="noreferrer">
                      Book an AI Strategy Call
                    </a>
                    <a className="btn btn-secondary" href="/">
                      Back to Homepage
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section className="service-details-section" style={{ paddingBottom: '8rem' }}>
              <div className="container">
                <div className="service-grid">
                  {/* Core Deliverables */}
                  <div className="deliverables-pane">
                    <h3>Core Deliverables</h3>
                    <ul className="deliverables-list">
                      {activeService.bullets.map((bullet, idx) => (
                        <li key={idx}>
                          <span className="check-circle">✓</span>
                          <div>{bullet}</div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Architecture & Targeting */}
                  <div className="strategy-pane">
                    <div className="card strategy-card">
                      <div className="tools-row">
                        <h4>Primary Technology Stack</h4>
                        <div className="tools-flex">
                          {activeService.tools.map((tool, idx) => (
                            <span key={idx} className="tool-badge">{tool}</span>
                          ))}
                        </div>
                      </div>

                      <div className="regions-card">
                        <h4>India-Centric with Global Outreach</h4>
                        <p>
                          Operated from India's tech corridor (Bengaluru, Mumbai, Chennai, Delhi NCR, Hyderabad, Pune, Kolkata). We build robust operational bridges for domestic leaders and handle deployment cycles for partners in the US, UK, Canada, Australia, and UAE.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* ================= PRIMARY HOMEPAGE CONTENT ================= */
          <>
            {/* Hero Section */}
            <section className="hero" id="home">
              <div className="container">
            <div className="hero-grid">
              <div className="hero-copy">
                <p className="eyebrow">Practical AI Automation Systems</p>
                <h1>AI Automation for <br/><span className="accent-text">Small and Mid-Sized Businesses</span></h1>
                <p>
                  Drowning in busywork? Automate repetitive tasks, connect your tools, and build AI-driven workflows that save time and reduce errors.
                </p>
                <div className="hero-ctas">
                  <a className="btn btn-primary" href="#cta-section">Book a Strategy Call</a>
                  <a className="btn btn-secondary" href="#workflows">See Live Automations</a>
                </div>
                <div className="hero-benefits">
                  <span className="benefit-tag">Custom Built</span>
                  <span className="benefit-tag">Results Driven</span>
                  <span className="benefit-tag">Secure & Reliable</span>
                </div>
              </div>

              {/* Premium Control Widget Card */}
              <div className="hero-widget-card">
                <div className="widget-row">
                  <div className="widget-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="3" width="6" height="5" rx="1" />
                      <rect x="3" y="15" width="6" height="5" rx="1" />
                      <rect x="15" y="15" width="6" height="5" rx="1" />
                      <path d="M12 8v3M6 11h12M6 11v4M18 11v4" />
                    </svg>
                  </div>
                  <div className="widget-info">
                    <span className="widget-title">DESIGN</span>
                    <span className="widget-desc">Map & plan workflows</span>
                  </div>
                </div>

                <div className="widget-row">
                  <div className="widget-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 20h16M7 20v-3l4-5M11 12l5-5M16 7h4v2" />
                      <circle cx="7" cy="17" r="1.5" />
                      <circle cx="11" cy="12" r="1.5" />
                      <circle cx="16" cy="7" r="1.5" />
                    </svg>
                  </div>
                  <div className="widget-info">
                    <span className="widget-title">AUTOMATE</span>
                    <span className="widget-desc">Build & deploy AI workflows</span>
                  </div>
                </div>

                <div className="widget-row">
                  <div className="widget-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10" strokeWidth="2.5" />
                      <line x1="12" y1="20" x2="12" y2="4" strokeWidth="2.5" />
                      <line x1="6" y1="20" x2="6" y2="14" strokeWidth="2.5" />
                      <path d="M3 16l6-6 4 4 8-8" />
                      <polyline points="16 6 21 6 21 11" />
                    </svg>
                  </div>
                  <div className="widget-info">
                    <span className="widget-title">OPTIMIZE</span>
                    <span className="widget-desc">Monitor, learn & improve</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AutomateLabs Workspace Mockup */}
        <section className="mockup-section">
          <div className="container">
            <div className="card mockup-card">
              <div className="mockup-header">
                <div className="window-dots">
                  <span className="w-dot dot-r"></span>
                  <span className="w-dot dot-y"></span>
                  <span className="w-dot dot-g"></span>
                </div>
                <span className="window-title">AutomateLabs Workspace Mockup</span>
                <span className="live-indicator-badge"><span className="live-dot"></span>LIVE</span>
              </div>
              <div className="mockup-body">
                <h3>Operational Telemetry Feed</h3>
                <div className="mockup-logs" id="mockupLogs">
                  {logs.map((log) => {
                    const borderTypeClass = log.type === 'invoice' ? 'invoice-item' : (log.type === 'lead' ? 'lead-item' : 'followup-item');
                    const iconClass = log.type === 'invoice' ? 'invoice-ic' : (log.type === 'lead' ? 'lead-ic' : 'followup-ic');
                    return (
                      <div key={log.id} className={`log-item ${borderTypeClass} new-arrival`}>
                        <div className="log-item-left">
                          <span className={`log-icon-wrap ${iconClass}`}>✓</span>
                          <div className="log-info">
                            <span className="log-t">{log.title}</span>
                            <span className="log-d">{log.desc}</span>
                          </div>
                        </div>
                        <span className={`log-meta ${log.metaClass}`}>{log.meta}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scrolling Text Marquee */}
        <section className="marquee-section">
          <div className="marquee-wrap">
            <div className="marquee-content">
              <div className="marquee-item">Less Manual Work</div>
              <div className="marquee-item">Faster Execution</div>
              <div className="marquee-item">Better Visibility</div>
              <div className="marquee-item">AI-Powered Flows</div>
              <div className="marquee-item">Zero Human Error</div>
              <div className="marquee-item">Revenue Growth</div>
              {/* Loop duplicate */}
              <div className="marquee-item">Less Manual Work</div>
              <div className="marquee-item">Faster Execution</div>
              <div className="marquee-item">Better Visibility</div>
              <div className="marquee-item">AI-Powered Flows</div>
              <div className="marquee-item">Zero Human Error</div>
              <div className="marquee-item">Revenue Growth</div>
            </div>
          </div>
        </section>

        {/* Operational Friction vs Leverage */}
        <section className="friction-section" id="problem">
          <div className="container">
            <div className="section-title-wrap">
              <span className="eyebrow">Operational Friction vs. Leverage</span>
              <h2>Most businesses don't have an execution problem. <br/><span>They have a workflow problem.</span></h2>
            </div>

            <div className="friction-grid">
              {/* Column 1: Friction */}
              <div className="card friction-card manual-theme">
                <h3>How Operations Run Today</h3>
                <ul className="friction-list">
                  <li>
                    <span className="icon red">
                      <svg className="svg-bullet cross-bullet" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <path d="M8 8 L16 16 M16 8 L8 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </span>
                    <div>
                      <strong>Teams chase updates manually</strong>
                      Disjointed tools waste hours.
                    </div>
                  </li>
                  <li>
                    <span className="icon red">
                      <svg className="svg-bullet cross-bullet" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <path d="M8 8 L16 16 M16 8 L8 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </span>
                    <div>
                      <strong>Work gets stuck between tools</strong>
                      Key alerts are missed.
                    </div>
                  </li>
                  <li>
                    <span className="icon red">
                      <svg className="svg-bullet cross-bullet" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <path d="M8 8 L16 16 M16 8 L8 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </span>
                    <div>
                      <strong>Repetitive tasks waste time</strong>
                      Data entry drains productivity.
                    </div>
                  </li>
                  <li>
                    <span className="icon red">
                      <svg className="svg-bullet cross-bullet" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <path d="M8 8 L16 16 M16 8 L8 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </span>
                    <div>
                      <strong>Growth creates admin bottlenecks</strong>
                      Response lags increase.
                    </div>
                  </li>
                </ul>
                <div className="friction-footer red-t">
                  Result: More work. Less visibility.
                </div>
              </div>

              {/* Column 2: Leverage */}
              <div className="card friction-card auto-theme">
                <h3>How We Rebuild Them</h3>
                <ul className="friction-list">
                  <li>
                    <span className="icon teal">
                      <svg className="svg-bullet check-bullet" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <path d="M8 12 L11 15 L16 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </span>
                    <div>
                      <strong>Systems stay connected</strong>
                      Data reconciles instantly.
                    </div>
                  </li>
                  <li>
                    <span className="icon teal">
                      <svg className="svg-bullet check-bullet" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <path d="M8 12 L11 15 L16 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </span>
                    <div>
                      <strong>Workflows move instantly</strong>
                      Inbound inquiries route automatically.
                    </div>
                  </li>
                  <li>
                    <span className="icon teal">
                      <svg className="svg-bullet check-bullet" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <path d="M8 12 L11 15 L16 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </span>
                    <div>
                      <strong>Operations run themselves</strong>
                      AI agents draft invoices and send alerts.
                    </div>
                  </li>
                  <li>
                    <span className="icon teal">
                      <svg className="svg-bullet check-bullet" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <path d="M8 12 L11 15 L16 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </span>
                    <div>
                      <strong>Operations scale seamlessly</strong>
                      Output grows without extra overhead.
                    </div>
                  </li>
                </ul>
                <div className="friction-footer teal-t">
                  Result: Faster execution. Predictable growth.
                </div>
              </div>
            </div>

            <div className="quote-card">
              <span className="quote-symbol">“</span>
              <p>
                The modern enterprise is built on systems, not memory. We design operational pipelines so your team can focus on leverage, not data transfer.
              </p>
              <div className="quote-author">AutomateLabs Operational philosophy</div>
            </div>
          </div>
        </section>

        {/* Engineered Workflows (Interactive Simulator) */}
        <section className="simulator-section" id="workflows">
          <div className="container">
            <div className="section-title-wrap">
              <span className="eyebrow">Engineered Workflows</span>
              <h2>Custom automations built around <br/><span>how your business actually works.</span></h2>
              <p className="section-desc">Select an automation framework below and click trigger simulation to see live system flow diagnostics.</p>
            </div>

            {/* Tab Controls */}
            <div className="simulator-tabs">
              <button className={`sim-tab ${activeTab === 'lead-capture' ? 'active' : ''}`} onClick={() => selectTab('lead-capture')}>Lead Ingestion</button>
              <button className={`sim-tab ${activeTab === 'intelligent-response' ? 'active' : ''}`} onClick={() => selectTab('intelligent-response')}>Intelligent Response</button>
              <button className={`sim-tab ${activeTab === 'direct-comm' ? 'active' : ''}`} onClick={() => selectTab('direct-comm')}>Direct Communication</button>
              <button className={`sim-tab ${activeTab === 'db-syncing' ? 'active' : ''}`} onClick={() => selectTab('db-syncing')}>Database Syncing</button>
              <button className={`sim-tab ${activeTab === 'op-routing' ? 'active' : ''}`} onClick={() => selectTab('op-routing')}>Operational Routing</button>
              <button className={`sim-tab ${activeTab === 'context-agents' ? 'active' : ''}`} onClick={() => selectTab('context-agents')}>Context-Aware Agents</button>
            </div>

            <div className="simulator-workspace">
              {/* Canvas Board */}
              <div className="card sim-canvas-card">
                <div className="sim-header">
                  <span className="sim-status">STATUS: <strong style={{ color: simStatus === 'RUNNING' ? 'var(--accent)' : (simStatus === 'SUCCESS' ? 'var(--auto)' : '') }}>{simStatus}</strong></span>
                  <button className="btn btn-primary btn-sm" disabled={simButtonDisabled} onClick={runSimulation}>{simButtonText}</button>
                </div>
                
                <div className="sim-nodes-container">
                  {/* Node 1 */}
                  <div className={node1Class} id="node1" ref={node1Ref}>
                    <div className="port-dot port-out"></div>
                    <div className="node-execution-status">
                      <svg className="exec-cog" viewBox="0 0 24 24">
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <svg className="exec-check" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="node-icon-wrap" id="node1Icon">{activeTabData.node1Icon}</div>
                    <div className="node-body">
                      <span className="n-title" id="node1Title">{activeTabData.node1}</span>
                      <span className="n-badge" id="node1Status">{node1StatusText}</span>
                    </div>
                  </div>
                  
                  {/* Node 2 */}
                  <div className={node2Class} id="node2" ref={node2Ref}>
                    <div className="port-dot port-in"></div>
                    <div className="port-dot port-out"></div>
                    <div className="node-execution-status">
                      <svg className="exec-cog" viewBox="0 0 24 24">
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <svg className="exec-check" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="node-icon-wrap" id="node2Icon">{activeTabData.node2Icon}</div>
                    <div className="node-body">
                      <span className="n-title" id="node2Title">{activeTabData.node2}</span>
                      <span className="n-badge" id="node2Status">{node2StatusText}</span>
                    </div>
                  </div>

                  {/* Node 3 Stack */}
                  <div className="sim-node-stack">
                    <div className={node3aClass} id="node3a" ref={node3aRef}>
                      <div className="port-dot port-in"></div>
                      <div className="node-execution-status">
                        <svg className="exec-cog" viewBox="0 0 24 24">
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <svg className="exec-check" viewBox="0 0 24 24">
                          <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="node-icon-wrap" id="node3aIcon">{activeTabData.node3aIcon}</div>
                      <div className="node-body">
                        <span className="n-title" id="node3aTitle">{activeTabData.node3a}</span>
                        <span className="n-badge" id="node3aStatus">{node3aStatusText}</span>
                      </div>
                    </div>
                    <div className={node3bClass} id="node3b" ref={node3bRef}>
                      <div className="port-dot port-in"></div>
                      <div className="node-execution-status">
                        <svg className="exec-cog" viewBox="0 0 24 24">
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <svg className="exec-check" viewBox="0 0 24 24">
                          <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="node-icon-wrap" id="node3bIcon">{activeTabData.node3bIcon}</div>
                      <div className="node-body">
                        <span className="n-title" id="node3bTitle">{activeTabData.node3b}</span>
                        <span className="n-badge" id="node3bStatus">{node3bStatusText}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SVG Data Packet overlay lines */}
                <svg className="sim-paths-overlay" id="simSvg">
                  <defs>
                    <filter id="packetGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  <path className={path1Class} id="line1" ref={line1Ref} d="" />
                  <path className={path2aClass} id="line2a" ref={line2aRef} d="" />
                  <path className={path2bClass} id="line2b" ref={line2bRef} d="" />

                  <path id="flow1" ref={flow1Ref} fill="none" stroke="none" d="" />
                  <circle className={`sim-packet ${packet1Active ? 'active' : ''}`} id="packet1" filter="url(#packetGlow)">
                    <animateMotion id="animM1" ref={animM1Ref} dur="0.8s" repeatCount="1" fill="freeze" begin="indefinite">
                      <mpath href="#flow1"/>
                    </animateMotion>
                  </circle>

                  <path id="flow2a" ref={flow2aRef} fill="none" stroke="none" d="" />
                  <circle className={`sim-packet ${packet2aActive ? 'active' : ''}`} id="packet2a" filter="url(#packetGlow)">
                    <animateMotion id="animM2a" ref={animM2aRef} dur="1s" repeatCount="1" fill="freeze" begin="indefinite">
                      <mpath href="#flow2a"/>
                    </animateMotion>
                  </circle>

                  <path id="flow2b" ref={flow2bRef} fill="none" stroke="none" d="" />
                  <circle className={`sim-packet ${packet2bActive ? 'active' : ''}`} id="packet2b" filter="url(#packetGlow)">
                    <animateMotion id="animM2b" ref={animM2bRef} dur="1s" repeatCount="1" fill="freeze" begin="indefinite">
                      <mpath href="#flow2b"/>
                    </animateMotion>
                  </circle>
                </svg>
              </div>

              {/* Description Side */}
              <div className="sim-details-pane">
                <h3 id="simTitle">{activeTabData.title}</h3>
                <p id="simDesc">{activeTabData.desc}</p>
                
                <ol className="sim-steps-list">
                  <li className={activeStep === 1 ? 'active' : ''} id="step1">
                    <strong id="step1Title">{activeTabData.step1}</strong>
                    <span id="step1Desc">{activeTabData.step1Sub}</span>
                  </li>
                  <li className={activeStep === 2 ? 'active' : ''} id="step2">
                    <strong id="step2Title">{activeTabData.step2}</strong>
                    <span id="step2Desc">{activeTabData.step2Sub}</span>
                  </li>
                  <li className={activeStep === 3 ? 'active' : ''} id="step3">
                    <strong id="step3Title">{activeTabData.step3}</strong>
                    <span id="step3Desc">{activeTabData.step3Sub}</span>
                  </li>
                </ol>
                
                <div className="sim-target-tag" id="simTarget">
                  {activeTabData.target}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Operational Speed Impact (Lead Speed Calc) */}
        <section className="calc-section" id="speed-calc">
          <div className="container">
            <div className="section-title-wrap">
              <span className="eyebrow">Lead Speed Calc</span>
              <h2>Operational Speed Impact <br/><span>How fast do you capture interest?</span></h2>
              <p className="section-desc">Move the respond timeline slider below to verify the impact of response times on your team’s metrics.</p>
            </div>

            <div className="calc-grid">
              {/* Interactive Slider */}
              <div className="card calc-slider-card">
                <div className="slider-header-row">
                  <label htmlFor="calcSlider">Your Time to Respond</label>
                  <span className="slider-display-val" id="calcSliderVal">{currentCalc.time}</span>
                </div>
                
                <div className="slider-wrapper">
                  <input 
                    type="range" 
                    className="retro-slider" 
                    id="calcSlider" 
                    min="0" 
                    max="4" 
                    step="1" 
                    value={sliderVal}
                    onChange={(e) => setSliderVal(parseInt(e.target.value))}
                  />
                  <div className="slider-labels">
                    <span className={`s-label ${sliderVal === 0 ? 'active' : ''}`} onClick={() => setSliderVal(0)}>Immediate</span>
                    <span className={`s-label ${sliderVal === 1 ? 'active' : ''}`} onClick={() => setSliderVal(1)}>5m</span>
                    <span className={`s-label ${sliderVal === 2 ? 'active' : ''}`} onClick={() => setSliderVal(2)}>30m</span>
                    <span className={`s-label ${sliderVal === 3 ? 'active' : ''}`} onClick={() => setSliderVal(3)}>1 Hour</span>
                    <span className={`s-label ${sliderVal === 4 ? 'active' : ''}`} onClick={() => setSliderVal(4)}>2 Hours+</span>
                  </div>
                </div>
                
                <p className="calc-card-footer">
                  Responding to a prospect within 5 minutes versus 1 hour shifts your entire customer acquisition economics.
                </p>
              </div>

              {/* Dynamic Gauges */}
              <div className="calc-gauges-stack">
                {/* Conversion Probability */}
                <div className="card gauge-card">
                  <div className="gauge-head">
                    <h4>Conversion Probability</h4>
                    <span className="gauge-badge conv-badge">MULTIPLIER</span>
                  </div>
                  <div className="gauge-value" id="calcConversion">{currentCalc.conv}</div>
                  <p className="gauge-info" id="calcConversionDesc">{currentCalc.convDesc}</p>
                  <div className="gauge-track-bar">
                    <div className="gauge-fill-bar conv-fill" id="calcConversionBar" style={{ width: currentCalc.convWidth }}></div>
                  </div>
                </div>

                {/* Est. Lead Loss Rate */}
                <div className="card gauge-card">
                  <div className="gauge-head">
                    <h4>Est. Lead Loss Rate</h4>
                    <span className="gauge-badge loss-badge">DECAY</span>
                  </div>
                  <div className="gauge-value red-value" id="calcLoss">{currentCalc.loss}</div>
                  <p className="gauge-info" id="calcLossDesc">{currentCalc.lossDesc}</p>
                  <div className="gauge-track-bar">
                    <div className="gauge-fill-bar loss-fill" id="calcLossBar" style={{ width: currentCalc.lossWidth }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tailored Integrations */}
        <section className="integrations-section" id="integrations">
          <div className="container">
            <div className="section-title-wrap">
              <span className="eyebrow">Tailored Integrations</span>
              <h2>Built for modern teams that move fast.<br/><span>Seamless operational structures tailored to your industry.</span></h2>
            </div>

            <div className="integrations-grid">
              <div className="card int-card">
                <h3>Sales Teams</h3>
                <p>Automate lead capture, CRM syncing, and follow-ups.</p>
              </div>
              <div className="card int-card">
                <h3>Agencies</h3>
                <p>Streamline client onboarding, approvals, and workflows.</p>
              </div>
              <div className="card int-card">
                <h3>Real Estate</h3>
                <p>Capture listings inquiries and route prospects instantly.</p>
              </div>
              <div className="card int-card">
                <h3>Healthcare & Clinics</h3>
                <p>Automate appointments, reminders, and patient intake forms.</p>
              </div>
              <div className="card int-card">
                <h3>E-commerce</h3>
                <p>Automate order tracking, custom support, and checkout recovery.</p>
              </div>
              <div className="card int-card">
                <h3>Startups</h3>
                <p>Build lean systems to scale output without scaling headcount.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Proven Methodology */}
        <section className="methodology-section" id="methodology">
          <div className="container">
            <div className="section-title-wrap">
              <span className="eyebrow">Proven Methodology</span>
              <h2>Simple systems. Real operational impact.<br/><span>Structured technical lifecycle logic blocks.</span></h2>
            </div>

            <div className="method-timeline">
              {/* Step 1 */}
              <div className="method-step-row">
                <div className="method-num">01</div>
                <div className="method-body">
                  <h3>Discovery</h3>
                  <p>We map your manual processes, API points, and edge cases.</p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="method-step-row">
                <div className="method-num">02</div>
                <div className="method-body">
                  <h3>System Architecture</h3>
                  <p>We design blueprints defining API logic and data pathways.</p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="method-step-row">
                <div className="method-num">03</div>
                <div className="method-body">
                  <h3>Engineering</h3>
                  <p>We build custom scripts, logic gates, and API relays.</p>
                </div>
              </div>
              {/* Step 4 */}
              <div className="method-step-row">
                <div className="method-num">04</div>
                <div className="method-body">
                  <h3>Telemetry & Uptime</h3>
                  <p>We load-test, build error handlers, and monitor live sync logs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Measurable Outcomes */}
        <section className="outcomes-section">
          <div className="container">
            <div className="section-title-wrap">
              <span className="eyebrow">Measurable Outcomes</span>
              <h2>What automation actually changes.<br/><span>Verifiable analytics in day-to-day operations.</span></h2>
            </div>

            <div className="outcomes-grid">
              <div className="card outcome-card">
                <div className="outcome-stat" data-tgt="68" data-suf="%">0%</div>
                <p className="outcome-txt">of enterprise team members spend over 10 hours weekly on manual data coordination.</p>
              </div>
              <div className="card outcome-card">
                <div className="outcome-stat" data-tgt="30" data-suf="%+">0%</div>
                <p className="outcome-txt">increase in operational output per team member following workflow implementation.</p>
              </div>
              <div className="card outcome-card">
                <div className="outcome-stat" data-tgt="80" data-suf="%">0%</div>
                <p className="outcome-txt">reduction in response lag times for inbound customer and prospect inquiries.</p>
              </div>
              <div className="card outcome-card">
                <div className="outcome-stat" data-tgt="90" data-suf="%+">0%</div>
                <p className="outcome-txt">decrease in unassigned or dropped records in customer databases.</p>
              </div>
              <div className="card outcome-card">
                <div className="outcome-stat" data-tgt="30" data-suf="h">0%</div>
                <p className="outcome-txt">administrative labor hours automated per department monthly on average.</p>
              </div>
              <div className="card outcome-card">
                <div className="outcome-stat" data-tgt="24" data-suf="/7">0%</div>
                <p className="outcome-txt">continuous execution of background triggers outside standard office hours.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Operational Philosophy */}
        <section className="philosophy-section">
          <div className="container">
            <div className="section-title-wrap">
              <span className="eyebrow">Operational Philosophy</span>
              <h2>We don’t sell templates. <br/><span>We build systems.</span></h2>
              <p className="section-desc">Generic, single-trigger integrations fail under real-world conditions. We build custom operational systems designed around process rules, data validations, and edge-case exceptions.</p>
            </div>

            <div className="phil-details-grid">
              <div className="card phil-sub-card">
                <h3>Technical Process Audit</h3>
                <p>We audit your manual workflows before writing any code.</p>
              </div>
              <div className="card phil-sub-card">
                <h3>Structured Exception Handling</h3>
                <p>Workflows feature built-in error handling to retry failed relays automatically.</p>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="card matrix-table-card">
              <table className="phil-comparison-table">
                <thead>
                  <tr>
                    <th>Approach</th>
                    <th>Standard Setup</th>
                    <th className="auto-col-title">AutomateLabs</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Pipeline Logic</strong></td>
                    <td>Single-step Zap recipes</td>
                    <td><span className="matrix-tag good">Multi-branched API orchestrations</span></td>
                  </tr>
                  <tr>
                    <td><strong>Error Tolerance</strong></td>
                    <td><span className="matrix-tag bad">Silent execution breaks</span></td>
                    <td><span className="matrix-tag good">Active error catching & retry rules</span></td>
                  </tr>
                  <tr>
                    <td><strong>Context Delivery</strong></td>
                    <td>Static prompt templates</td>
                    <td><span className="matrix-tag good">Vector Database / RAG systems</span></td>
                  </tr>
                  <tr>
                    <td><strong>Code Extensibility</strong></td>
                    <td>No custom scripting</td>
                    <td><span className="matrix-tag good">Custom NodeJS/Python logic blocks</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions Accordion */}
        <section className="faq-section" id="faq-section">
          <div className="container">
            <div className="section-title-wrap">
              <span className="eyebrow">Frequently Asked Questions</span>
              <h2>Common questions about <br/><span>business process automation services.</span></h2>
              <p className="section-desc">Understand how practical AI automation can streamline your day-to-day operations.</p>
            </div>

            <div className="faq-accordion-container">
              <div className="card faq-item-card">
                <details className="faq-details" open>
                  <summary className="faq-summary">
                    <h4>How to automate repetitive tasks in a small business?</h4>
                    <span className="faq-arrow">▼</span>
                  </summary>
                  <div className="faq-answer">
                    <p>
                      Automating repetitive tasks begins by mapping your manual processes, document pathways, and data flows. Automate Labs builds custom script relays, webhook triggers, and no-code pipelines using tools like Zapier, Make, and n8n to connect your contact forms, spreadsheets, and databases automatically. This eliminates the need for manual record copies.
                    </p>
                  </div>
                </details>
              </div>

              <div className="card faq-item-card">
                <details className="faq-details">
                  <summary className="faq-summary">
                    <h4>What are the best AI automation services for small business operations?</h4>
                    <span className="faq-arrow">▼</span>
                  </summary>
                  <div className="faq-answer">
                    <p>
                      The most practical and valuable AI automation services for small businesses focus on lead ingestion, intelligent response, and CRM database synchronization. Instead of chasing broad or complex artificial intelligence experiments, we focus on practical systems that route new ads leads under 5 seconds, sync Airtable and HubSpot fields automatically, and deploy custom context-aware AI support agents trained on your technical guides.
                    </p>
                  </div>
                </details>
              </div>

              <div className="card faq-item-card">
                <details className="faq-details">
                  <summary className="faq-summary">
                    <h4>Why hire an AI workflow automation consultant instead of using pre-made templates?</h4>
                    <span className="faq-arrow">▼</span>
                  </summary>
                  <div className="faq-answer">
                    <p>
                      Simple, single-trigger template recipes break down under real-world conditions. An AI workflow automation consultant designs custom systems built around your specific business rules, incorporating structured exception handling, automatic data sanitization, and custom NodeJS/Python script blocks. This guarantees robust error-retry tolerance and prevents silent API workflow breaks.
                    </p>
                  </div>
                </details>
              </div>

              <div className="card faq-item-card">
                <details className="faq-details">
                  <summary className="faq-summary">
                    <h4>Do your CRM automation services cover Zoho, HubSpot, and Salesforce?</h4>
                    <span className="faq-arrow">▼</span>
                  </summary>
                  <div className="faq-answer">
                    <p>
                      Yes, our CRM workflow automation and syncing services integrate with Zoho, HubSpot, Salesforce, Airtable, and Notion. We construct custom field mappings, bi-directional sync rules, and instant follow-up alerts to automate your CRM data entry and eliminate human database reconciliation errors entirely.
                    </p>
                  </div>
                </details>
              </div>

              <div className="card faq-item-card">
                <details className="faq-details">
                  <summary className="faq-summary">
                    <h4>How does ChatGPT automation for business improve customer support?</h4>
                    <span className="faq-arrow">▼</span>
                  </summary>
                  <div className="faq-answer">
                    <p>
                      By deploying custom OpenAI ChatGPT models integrated directly with your support inbox or communication channels, we automate customer support replies to common questions in under 2 minutes. The agent cross-references incoming messages with a secure semantic vector database (RAG) containing your company specifications, drafting contextually accurate responses and escalating to human staff only when necessary.
                    </p>
                  </div>
                </details>
              </div>

              <div className="card faq-item-card">
                <details className="faq-details">
                  <summary className="faq-summary">
                    <h4>Are your automation consultant services based in India?</h4>
                    <span className="faq-arrow">▼</span>
                  </summary>
                  <div className="faq-answer">
                    <p>
                      Our primary engineering office is located in Bengaluru, Karnataka, India. We heavily support high-growth Indian enterprises across Bengaluru, Mumbai, Chennai, Delhi NCR, Hyderabad, Pune, and Kolkata, while maintaining a reliable base of international delivery for clients in the United States, Canada, United Kingdom, Australia, and the United Arab Emirates.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* Scale & Call Booking CTA */}
        <section className="cta-section" id="cta-section">
          <div className="container">
            <div className="card cta-large-card">
              <h2>The businesses growing fastest today aren’t working harder. <br/><span>They’re automating smarter.</span></h2>
              <p>Whether you need lead automation, AI workflows, operational systems, or fully customized automations we help you build infrastructure that scales.</p>
              
              <a className="btn btn-primary btn-lg" href="https://calendly.com" target="_blank" rel="noreferrer">Book Your Free Strategy Call</a>
              
              <div className="cta-bullets">
                <span className="bullet-item">No generic templates</span>
                <span className="bullet-item">No unnecessary complexity</span>
                <span className="bullet-item">Just intelligent systems built around your business</span>
              </div>
            </div>
          </div>
        </section>
      </>
    )}

        {/* Footer */}
        <footer className="footer-wrap">
          <div className="container">
            <div className="footer-brand-pane">
              <a className="brand" href="#home" style={{ marginBottom: '0.5rem' }}>
                <svg className="brand-logo-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <polygon points="3,20 6,14 10,14 7,20" />
                  <polygon points="9,4 13.5,4 19,20 14.5,20" />
                </svg>
                automatelabs
              </a>
              <p>We build custom AI agents, automated workflows, and CRM integrations to eliminate repetitive operations and scale operations without overhead.</p>
            </div>

            <div className="footer-links-grid">
              <div className="footer-nav-col">
                <h4>Solutions</h4>
                <ul>
                  <li><a href="#workflows">Lead Ingestion</a></li>
                  <li><a href="#workflows">Intelligent Response</a></li>
                  <li><a href="#workflows">Direct Communication</a></li>
                  <li><a href="#workflows">Database Syncing</a></li>
                  <li><a href="#workflows">Operational Routing</a></li>
                </ul>
              </div>
              <div className="footer-nav-col">
                <h4>Company</h4>
                <ul>
                  <li><a href="#problem">The Problem</a></li>
                  <li><a href="#workflows">What We Build</a></li>
                  <li><a href="#methodology">How It Works</a></li>
                  <li><a href="#why-us">Why Us</a></li>
                </ul>
              </div>
              <div className="footer-nav-col">
                <h4>Resources</h4>
                <ul>
                  <li><a href="#why-us">Case Studies</a></li>
                  <li><a href="#cta-section">Documentation</a></li>
                  <li><a href="https://status.automatelabs.com" target="_blank" rel="noreferrer">API Status</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            
            <div className="footer-bottom-bar">
              <p>© 2026 AutomateLabs. All rights reserved.</p>
              <div className="footer-policy-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
