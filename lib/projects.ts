export type Project = {
    detailImage?: string;
    detailAlt?: string;
    media?: { src: string; alt: string; caption: string; section: "method" | "results"; photo?: boolean }[];
    completedMonth: string;
    slug: string;
    title: string;
    fullTitle: string;
    category: string;
    year: string;
    period: string;
    venue: string;
    role: string;
    summary: string;
    image: string;
    imageAlt: string;
    tags: string[];
    contribution: string;
    outcome: string;
    resultLabel: string;
    context: string;
    contributions: {
        title: string;
        body: string;
    }[];
    methods: {
        title: string;
        body: string;
    }[];
    results: {
        value: string;
        label: string;
    }[];
    resultNote: string;
    limitation: string;
    sources: {
        label: string;
        href: string;
    }[];
};
export const projects: Project[] = [
  {
    "slug": "zero-shot-navigation",
    "completedMonth": "2026-02",
    "title": "Zero-shot object navigation",
    "fullTitle": "Zero-Shot Object Navigation Using Semantic Scene Descriptions and Dynamic Decision-Making",
    "category": "Robotics & AI",
    "year": "2026",
    "period": "Oct 2025 — Feb 2026",
    "venue": "KRoC 2026",
    "role": "Co-author · Research & implementation",
    "summary": "Turning panoramic observations into semantic scene descriptions, with additional visual reasoning at uncertain navigation decisions.",
    "image": "/images/navigation.webp",
    "imageAlt": "Navigation framework connecting semantic scene descriptions, decisions and target verification",
    "tags": [
      "Embodied AI",
      "VLM",
      "GPT-4o",
      "HM3D / MP3D"
    ],
    "contribution": "Co-developed the navigation pipeline, iterated on model architecture, and contributed to debugging and experiments.",
    "outcome": "55.0% SR · 33.7% SPL",
    "resultLabel": "Reported framework performance · HM3D",
    "context": "Presented at the 21st Korea Robotics Society Annual Conference (KRoC 2026). Authors: Yeongmok Cho, Semin Na, Jeongjun Choi, and H. Jin Kim. Supported by Samsung Research Funding & Incubation Center, SRFC-IT2402-17.",
    "contributions": [
      {
        "title": "Framework & architecture",
        "body": "Collaborated on the overall navigation framework and model architecture with the research team."
      },
      {
        "title": "Pipeline implementation",
        "body": "Jointly implemented and iterated on the navigation pipeline. Contributed to technical discussions, debugging, and experimental development."
      },
      {
        "title": "Research communication",
        "body": "Co-authored the resulting KRoC 2026 paper as the second author."
      }
    ],
    "methods": [
      {
        "title": "Semantic scene representation",
        "body": "GPT-4o generates descriptions of panoramic observations. Text representations support semantic relevance matching and address the text–image modality gap."
      },
      {
        "title": "Dynamic decision-making",
        "body": "A rotation-trigger mechanism selectively invokes panoramic observation at uncertain navigation points instead of invoking it continuously."
      },
      {
        "title": "Target verification",
        "body": "Contextual VLM re-evaluation and cumulative detections help reduce persistent false-positive target predictions."
      }
    ],
    "results": [
      {
        "value": "55.0%",
        "label": "Success rate / HM3D"
      },
      {
        "value": "33.7%",
        "label": "SPL / HM3D"
      },
      {
        "value": "+3.3 pp",
        "label": "SPL vs. reported VLFM baseline"
      }
    ],
    "resultNote": "On HM3D, the framework achieved 55.0% success rate and 33.7% SPL, a 3.3 percentage-point SPL improvement over VLFM. SPL measures success weighted by path length.",
    "limitation": "Evaluated on HM3D and MP3D navigation benchmarks.",
    "sources": [
      {
        "label": "Paper · KRoC 2026",
        "href": "/materials/KRoC2026_ZSON.pdf"
      }
    ]
  },
  {
    "slug": "vision-robot-calibration",
    "completedMonth": "2024-02",
    "title": "3D vision–robot auto calibration",
    "fullTitle": "3D Vision–Robot Auto Calibration & Tool Pose Optimization",
    "category": "Robotics & AI",
    "year": "2024",
    "period": "Jan — Feb 2024",
    "venue": "MSIT National R&D",
    "role": "Co-researcher · Algorithm implementation",
    "summary": "Aligning camera and robot coordinates without repeated manual teaching, then estimating tool orientation from 3D surface geometry.",
    "image": "/images/calibration-overview.webp",
    "imageAlt": "Vision–robot calibration and tool orientation concept",
    "tags": [
      "3D vision",
      "SVD",
      "Rodrigues",
      "Kinematics"
    ],
    "contribution": "Led the auto-calibration implementation, implemented SVD plane fitting and Rodrigues rotations, and collected experimental data.",
    "outcome": "1.21% / 1.29% axis error",
    "resultLabel": "One reported position-validation case",
    "context": "A three-person industry–academia team. MSIT / NRF grant RS-2021-NR057855. Technical advisory: Hyundai Motor Company. Industry collaboration: Ajin Industrial. Academic support: SNU Industry-Academic Cooperation.",
    "contributions": [
      {
        "title": "Auto-calibration algorithm",
        "body": "Led implementation of vision–robot auto calibration, estimating a 4×4 homogeneous transformation matrix from controlled robot displacements."
      },
      {
        "title": "Tool orientation",
        "body": "Implemented SVD plane fitting for surface-normal estimation and Rodrigues’ rotation formula for tool orientation calculation."
      },
      {
        "title": "Experiments & kinematics",
        "body": "Collected experimental data, validated coordinate estimates, and implemented six-degree-of-freedom forward kinematics for the Hyundai Robotics HH020."
      }
    ],
    "methods": [
      {
        "title": "Estimate coordinate transformation",
        "body": "Use controlled displacements to estimate the relationship between camera and robot coordinates, reducing reliance on repeated manual teaching."
      },
      {
        "title": "Fit local surface geometry",
        "body": "Apply SVD to 3D point-cloud data to estimate a local plane and its surface normal."
      },
      {
        "title": "Calculate and check tool pose",
        "body": "Use Rodrigues rotations and forward kinematics to investigate tool orientation, configuration-dependent errors, and robot constraints."
      }
    ],
    "results": [
      {
        "value": "(200, 200)",
        "label": "Approximate target position"
      },
      {
        "value": "(197.59, 202.58)",
        "label": "Reconstructed position"
      },
      {
        "value": "1.21% / 1.29%",
        "label": "Errors on evaluated axes"
      }
    ],
    "resultNote": "This coordinate comparison is from one validation case in the experiments.",
    "limitation": "Some robot configurations produced orientation errors. Joint limits and inverse kinematics need further consideration.",
    "sources": [
      {
        "label": "Code & notebooks",
        "href": "https://github.com/ben020410/bin_picking"
      }
    ],
    "detailImage": "/images/calibration-overview.webp",
    "detailAlt": "Vision–robot calibration and tool orientation workflow",
    "media": [
      {
        "src": "/images/robot-lab.webp",
        "alt": "Hyundai Robotics HH020 experimental setup",
        "caption": "HH020 robot used for calibration experiments.",
        "section": "method",
        "photo": true
      },
      {
        "src": "/images/calibration-validation.webp",
        "alt": "Surface geometry and tool orientation validation",
        "caption": "Point-cloud measurements and tool orientation validation.",
        "section": "results"
      }
    ]
  },
  {
    "slug": "vpp-v2g",
    "completedMonth": "2024-11",
    "title": "V2G-powered energy redistribution",
    "fullTitle": "Virtual Power Plant (VPP) & V2G Peak Demand Reduction Analysis",
    "category": "Data & Software",
    "year": "2024",
    "period": "Nov 2024",
    "venue": "CO-Data Station · 4th place",
    "role": "Team lead · Integration & visualization",
    "summary": "Exploring how commuter EVs could move stored electricity from surplus regions to high-demand metropolitan areas.",
    "image": "/images/vpp.webp",
    "imageAlt": "Original simulation chart showing Seoul peak demand under V2G-VPP operation",
    "tags": [
      "VPP / V2G",
      "Tableau",
      "SQL",
      "Simulation"
    ],
    "contribution": "Led a four-person team, coordinated the analysis workflow, visualized results, and integrated the final system proposal.",
    "outcome": "17.3 MW simulated peak reduction",
    "resultLabel": "Seoul summer demand · Modeled scenario",
    "context": "2024 CO-Data Station Data Science Contest: 4th place (Association President’s Award). The proposal combines commuter mobility, regional energy imbalances, and workplace charging infrastructure.",
    "contributions": [
      {
        "title": "Team coordination",
        "body": "Led the four-person interdisciplinary team and managed project structure, analysis workflows, and the final presentation."
      },
      {
        "title": "Data visualization",
        "body": "Used Tableau, SQL, and data-analysis workflows to communicate regional energy and simulation results."
      },
      {
        "title": "System integration",
        "body": "Integrated individual analyses into a coherent commuter-based V2G-VPP proposal."
      }
    ],
    "methods": [
      {
        "title": "Regional energy imbalance",
        "body": "Analyze differences in electricity generation and consumption between Incheon, Chungnam, and Seoul."
      },
      {
        "title": "Commuter-based storage",
        "body": "Model commuting EVs as distributed storage that discharges during working hours and recharges before the return trip."
      },
      {
        "title": "Infrastructure feasibility",
        "body": "Evaluate Seoul workplace charging infrastructure and time-dependent charger availability."
      }
    ],
    "results": [
      {
        "value": "47.53 MW",
        "label": "Estimated Incheon–Seoul capacity"
      },
      {
        "value": "41.89 MWh",
        "label": "Daily simulated redistribution"
      },
      {
        "value": "17.3 MW",
        "label": "Simulated summer peak reduction"
      }
    ],
    "resultNote": "The analysis combines commuter routes, regional energy demand and charging availability.",
    "limitation": "These are simulation results. Participation and charging availability affect how much electricity can be transferred.",
    "sources": [
      {
        "label": "Presentation · CO-Data Station",
        "href": "/materials/presentation_vpp.pdf"
      }
    ],
    "detailImage": "/images/vpp-concept.webp",
    "detailAlt": "Commuter-based electricity redistribution concept",
    "media": [
      {
        "src": "/images/vpp-routing.webp",
        "alt": "EV commuting routes between Incheon, Chungnam and Seoul",
        "caption": "Commuting routes used in the redistribution proposal.",
        "section": "method"
      },
      {
        "src": "/images/vpp-charging.webp",
        "alt": "Workplace charger availability in Seoul",
        "caption": "Seoul charging infrastructure and charger availability.",
        "section": "method"
      },
      {
        "src": "/images/vpp.webp",
        "alt": "Seoul summer peak demand simulation",
        "caption": "Simulated Seoul summer demand with V2G-VPP operation.",
        "section": "results"
      }
    ]
  },
  {
    "slug": "multimodal-storybook",
    "completedMonth": "2024-08",
    "title": "Personalized multimodal storybooks",
    "fullTitle": "Multimodal AI Personalized Storybook & Caricature Generation Service",
    "category": "Data & Software",
    "year": "2024",
    "period": "Aug 2024",
    "venue": "AI Convergence Hackathon · Silver prize",
    "role": "Team lead · Multimodal prompting",
    "summary": "A working prototype that turns facial features and personal inputs into an illustrated storybook with the user as its central character.",
    "image": "/images/storybook.webp",
    "imageAlt": "Original multimodal storybook generation pipeline",
    "tags": [
      "GPT-4o",
      "DALL-E 3",
      "Flask",
      "Prompt engineering"
    ],
    "contribution": "Led a four-person team and designed multi-stage prompts for feature extraction, storytelling, and character-aware illustrations.",
    "outcome": "Silver prize · 3rd place",
    "resultLabel": "2024 AI Convergence Industry-Academia Hackathon",
    "context": "A four-person hackathon team built a working personalized storybook prototype using GPT-4o, DALL-E 3, Flask, and gTTS.",
    "contributions": [
      {
        "title": "Project leadership",
        "body": "Led the hackathon team and set the overall project direction."
      },
      {
        "title": "Multi-stage prompting",
        "body": "Designed GPT-4o prompts for facial-feature extraction and combined visual features with story context and scene descriptions."
      },
      {
        "title": "Failure-case investigation",
        "body": "Iteratively refined DALL-E 3 prompts and investigated character drift, prompt sensitivity, and model bias."
      }
    ],
    "methods": [
      {
        "title": "Structured visual attributes",
        "body": "Convert a facial image into attributes such as face shape, eyes, and nose."
      },
      {
        "title": "Personalized narrative",
        "body": "Generate stories from user inputs and educational themes."
      },
      {
        "title": "Character-aware illustration",
        "body": "Combine extracted facial features with each scene to create DALL-E 3 illustration prompts."
      }
    ],
    "results": [
      {
        "value": "3rd place",
        "label": "Silver prize"
      },
      {
        "value": "4 people",
        "label": "Hackathon team"
      },
      {
        "value": "Prototype",
        "label": "Working multimodal service"
      }
    ],
    "resultNote": "We built a working storybook prototype with GPT-4o, DALL-E 3, Flask and gTTS. The project won the silver prize (3rd place) at the 2024 AI Convergence Hackathon.",
    "limitation": "Facial attributes were sensitive to prompts and model bias. Keeping the same character across scenes remained difficult.",
    "sources": [
      {
        "label": "Presentation · Hackathon",
        "href": "/materials/presentation_dalle.pdf"
      },
      {
        "label": "Watch demo",
        "href": "/materials/video_dalle.mp4"
      }
    ],
    "detailImage": "/images/storybook-overview.webp",
    "detailAlt": "Personalized multimodal storybook service overview",
    "media": [
      {
        "src": "/images/storybook.webp",
        "alt": "Facial features, story generation and illustration pipeline",
        "caption": "Facial-feature extraction, story generation and illustration.",
        "section": "method"
      },
      {
        "src": "/images/storybook-drift.webp",
        "alt": "Examples of inconsistent character appearance across generated illustrations",
        "caption": "Character appearance changed between generated scenes.",
        "section": "results"
      }
    ]
  }
];
