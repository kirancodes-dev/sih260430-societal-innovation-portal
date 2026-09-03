import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6ldW-fnOC3WqW_gXTRKeUAO5epHmD27o",
  authDomain: "jharkhand-societal-innovation.firebaseapp.com",
  projectId: "jharkhand-societal-innovation",
  storageBucket: "jharkhand-societal-innovation.firebasestorage.app",
  messagingSenderId: "767712163503",
  appId: "1:767712163503:web:788687eb5bedd20a24865a",
  measurementId: "G-K0MYQRJF9E"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const SAMPLE_CHALLENGES = [
  {
    id: "CH-JH-2026-001",
    title: "High Fluoride & Arsenic Contamination in Rural Hand Pumps across Latehar",
    description: "More than 28 villages in Mahuadanr and Garu blocks suffer from severe skeletal fluorosis due to groundwater fluoride exceeding 3.5 mg/L. Need a low-cost decentralized filtration system.",
    category: "Water Resources & Sanitation",
    subcategory: "Arsenic & Fluoride Filtration",
    district: "latehar",
    block: "Mahuadanr",
    locationCoordinates: [23.7438, 84.4984],
    priority: "Critical",
    priorityScore: 94,
    status: "Assigned",
    assignedUniversityName: "Birla Institute of Technology (BIT) Mesra",
    alignedSchemeIds: ["jal-jeevan-mission"],
    sdgGoals: ["SDG 6: Clean Water & Sanitation", "SDG 3: Good Health"],
    submittedAt: new Date().toISOString()
  },
  {
    id: "CH-JH-2026-002",
    title: "Severe Post-Harvest Wastage of Tribal Mahua & Forest Lac in West Singhbhum",
    description: "Tribal SHGs collect over 450 tonnes of Mahua flowers annually. Up to 40% degrades during monsoon storage. Need solar dehumidifiers.",
    category: "Rural Livelihoods",
    subcategory: "Tribal Produce Supply Chain",
    district: "west-singhbhum",
    block: "Chaibasa",
    locationCoordinates: [22.5519, 85.8078],
    priority: "High",
    priorityScore: 89,
    status: "In_Progress",
    assignedUniversityName: "Birsa Agricultural University (BAU)",
    alignedSchemeIds: ["birsa-harit-gram"],
    sdgGoals: ["SDG 1: No Poverty", "SDG 8: Decent Work"],
    submittedAt: new Date().toISOString()
  },
  {
    id: "CH-JH-2026-003",
    title: "Under-Five Child Malnutrition & Sickle Cell Anemia Early Screening in Santhal Pargana",
    description: "Dumka and Pakur districts report elevated sickle cell anemia among Paharia tribes. Anganwadi centers lack rapid digital screening tools.",
    category: "Healthcare & Nutrition",
    subcategory: "Sickle Cell Screening",
    district: "dumka",
    block: "Kathikund",
    locationCoordinates: [24.2677, 87.2474],
    priority: "Critical",
    priorityScore: 97,
    status: "Solution_Proposed",
    assignedUniversityName: "Sido Kanhu Murmu University (SKMU)",
    alignedSchemeIds: ["ayushman-bharat-jharkhand"],
    sdgGoals: ["SDG 3: Good Health & Well-being"],
    submittedAt: new Date().toISOString()
  },
  {
    id: "CH-JH-2026-004",
    title: "Multilingual Digital Learning Content for Santhali & Mundari Primary Students",
    description: "Primary schools in Khunti face high dropout rates among tribal students transitioning from Ol Chiki to Hindi. Need offline bilingual tablet app.",
    category: "Education & Skilling",
    subcategory: "Multilingual Digital Classrooms",
    district: "khunti",
    block: "Torpa",
    locationCoordinates: [23.0729, 85.2783],
    priority: "High",
    priorityScore: 91,
    status: "Under_Testing",
    assignedUniversityName: "Ranchi University",
    alignedSchemeIds: [],
    sdgGoals: ["SDG 4: Quality Education"],
    submittedAt: new Date().toISOString()
  },
  {
    id: "CH-JH-2026-005",
    title: "Ecological Restoration & Fly Ash Stabilization on Abandoned Coal Mines in Jharia",
    description: "Over 40 sq km of opencast mine overburden in Dhanbad produces fugitive dust and acid drainage. Require microbial bioremediation.",
    category: "Environment & Forestry",
    subcategory: "Abandoned Mine Land Reclamation",
    district: "dhanbad",
    block: "Jharia",
    locationCoordinates: [23.7957, 86.4304],
    priority: "Critical",
    priorityScore: 96,
    status: "Deployed",
    assignedUniversityName: "IIT (ISM) Dhanbad",
    alignedSchemeIds: ["jharkhand-solar-policy"],
    sdgGoals: ["SDG 15: Life on Land", "SDG 13: Climate Action"],
    submittedAt: new Date().toISOString()
  },
  {
    id: "CH-JH-2026-006",
    title: "Collapsed Culvert & Dangerous Potholes on Rural Link Road connecting Bundu to Ranchi",
    description: "Heavy monsoon floods washed away the masonry culvert on the Bundu-Tamar arterial link. Over 14,000 villagers and school buses are stranded with no emergency ambulance access. Urgent modular bridge design required.",
    category: "Urban Infrastructure & Smart Mobility",
    subcategory: "Roads & Bridges",
    district: "ranchi",
    block: "Bundu",
    locationCoordinates: [23.1783, 85.5867],
    priority: "Critical",
    priorityScore: 95,
    status: "Under_Review",
    assignedUniversityName: "Birla Institute of Technology (BIT) Mesra",
    alignedSchemeIds: ["pmgsy"],
    sdgGoals: ["SDG 9: Industry, Innovation and Infrastructure", "SDG 11: Sustainable Cities and Communities"],
    submittedAt: new Date().toISOString()
  },
  {
    id: "CH-JH-2026-007",
    title: "Frequent Grid Outages & Defunct Solar Street Lighting in Netarhat Hilly Forest Hamlets",
    description: "Latehar and Gumla border hill villages remain in total darkness for 18 hours a day. Need smart microgrid with battery storage telemetry to power community health posts and school dormitories.",
    category: "Clean Energy & Rural Electrification",
    subcategory: "Solar Microgrid & Telemetry",
    district: "latehar",
    block: "Garu",
    locationCoordinates: [23.4795, 84.2694],
    priority: "High",
    priorityScore: 88,
    status: "In_Progress",
    assignedUniversityName: "NIT Jamshedpur",
    alignedSchemeIds: ["jharkhand-solar-policy"],
    sdgGoals: ["SDG 7: Affordable and Clean Energy"],
    submittedAt: new Date().toISOString()
  },
  {
    id: "CH-JH-2026-008",
    title: "High Turbidity & Iron Sediments in Drinking Tubewells across Palamu Tribal Belts",
    description: "Daltonganj rural drinking water sources show iron levels exceeding 4.2 mg/L causing gastrointestinal distress among children. Need gravity-fed sand and activated charcoal community filters.",
    category: "Water Resources & Sanitation",
    subcategory: "Iron Removal Filters",
    district: "palamu",
    block: "Daltonganj",
    locationCoordinates: [24.0375, 84.0674],
    priority: "High",
    priorityScore: 92,
    status: "Assigned",
    assignedUniversityName: "IIT (ISM) Dhanbad",
    alignedSchemeIds: ["jal-jeevan-mission"],
    sdgGoals: ["SDG 6: Clean Water & Sanitation"],
    submittedAt: new Date().toISOString()
  }
];

async function seed() {
  console.log("Seeding documents into Cloud Firestore...");
  for (const c of SAMPLE_CHALLENGES) {
    await setDoc(doc(db, "challenges", c.id), c);
    console.log(`✓ Created document in 'challenges': ${c.id}`);
  }
  console.log("All sample challenges seeded successfully into Firebase!");
  process.exit(0);
}

seed().catch(err => {
  console.error("Firestore Seed Error:", err);
  process.exit(1);
});
