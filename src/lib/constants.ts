// Jharkhand Districts, 10 Thematic Domains, User Roles, State Schemes, SDGs & Mock Data Constants

export interface DistrictInfo {
  id: string;
  name: string;
  nameHi: string;
  division: string;
  headquarters: string;
  coordinates: [number, number]; // [lat, lng]
  blocks: string[];
}

export const JHARKHAND_DISTRICTS: DistrictInfo[] = [
  { id: "ranchi", name: "Ranchi", nameHi: "राँची", division: "South Chotanagpur", headquarters: "Ranchi", coordinates: [23.3441, 85.3096], blocks: ["Kanke", "Ratu", "Namkum", "Ormanjhi", "Angara", "Bero", "Bundu", "Sonahatu", "Tamar", "Silli", "Burmu", "Khelari", "Lapung", "Itki", "Nagri", "Chanho", "Mandar", "Torpa"] },
  { id: "dhanbad", name: "Dhanbad", nameHi: "धनबाद", division: "North Chotanagpur", headquarters: "Dhanbad", coordinates: [23.7957, 86.4304], blocks: ["Dhanbad", "Jharia", "Baghmara", "Nirsa", "Govindpur", "Baliapur", "Tundi", "Topchanchi", "Kalyaneshwari", "Egarkund"] },
  { id: "east-singhbhum", name: "East Singhbhum (Jamshedpur)", nameHi: "पूर्वी सिंहभूम", division: "Kolhan", headquarters: "Jamshedpur", coordinates: [22.8046, 86.2029], blocks: ["Golmuri-cum-Jugsalai", "Potka", "Patamda", "Borasam", "Ghatshila", "Musabani", "Dhalbhumgarh", "Dumaria", "Ghorabandha", "Chakulia", "Baharagora"] },
  { id: "bokaro", name: "Bokaro", nameHi: "बोकारो", division: "North Chotanagpur", headquarters: "Bokaro Steel City", coordinates: [23.6693, 86.1511], blocks: ["Chas", "Chandankiyari", "Jaridih", "Kasmar", "Petarwar", "Gomia", "Bermo", "Nawadih", "Chandrapura"] },
  { id: "hazaribagh", name: "Hazaribagh", nameHi: "हजारीबाग", division: "North Chotanagpur", headquarters: "Hazaribagh", coordinates: [23.9925, 85.3637], blocks: ["Sadar Hazaribagh", "Katkamsandi", "Barkagaon", "Keredari", "Ichak", "Padma", "Barhi", "Chauparan", "Bishnugarh", "Tati Jhariya", "Daroo", "Churshu"] },
  { id: "deoghar", name: "Deoghar", nameHi: "देवघर", division: "Santhal Pargana", headquarters: "Deoghar", coordinates: [24.4826, 86.7000], blocks: ["Deoghar", "Madhupur", "Sarath", "Palojori", "Karon", "Devipur", "Margomunda", "Sarwan", "Mohanpur", "Sonaraithari"] },
  { id: "giridih", name: "Giridih", nameHi: "गिरिडीह", division: "North Chotanagpur", headquarters: "Giridih", coordinates: [24.1860, 86.3050], blocks: ["Giridih", "Gandey", "Bengabad", "Pirtand", "Dumri", "Bagodar", "Suriya", "Dhanwar", "Jamua", "Deori", "Tisri", "Gawan", "Birni"] },
  { id: "palamu", name: "Palamu", nameHi: "पलामू", division: "Palamu", headquarters: "Medininagar", coordinates: [24.0416, 84.0722], blocks: ["Medininagar", "Chainpur", "Patan", "Bishrampur", "Pandu", "Untari Road", "Hussainabad", "Haidernagar", "Mohammadganj", "Chhatarpur", "Nawa Bazar", "Panki", "Manatu", "Tarhasi", "Satbarwa"] },
  { id: "dumka", name: "Dumka", nameHi: "दुमका", division: "Santhal Pargana", headquarters: "Dumka", coordinates: [24.2677, 87.2474], blocks: ["Dumka", "Gopikandar", "Kathikund", "Shikaripara", "Ranishwar", "Jama", "Jarmundi", "Saraiyahat", "Ramgarh", "Masaliya"] },
  { id: "west-singhbhum", name: "West Singhbhum", nameHi: "पश्चिमी सिंहभूम", division: "Kolhan", headquarters: "Chaibasa", coordinates: [22.5519, 85.8078], blocks: ["Chaibasa", "Khuntpani", "Jhinkpani", "Tonto", "Jagannathpur", "Noamundi", "Manjhari", "Kumardungi", "Tantnagar", "Majhgaon", "Chakradharpur", "Sonua", "Goilkera", "Manoharpur", "Anandpur", "Bandgaon", "Gudri"] },
  { id: "ramgarh", name: "Ramgarh", nameHi: "रामगढ़", division: "North Chotanagpur", headquarters: "Ramgarh Cantonment", coordinates: [23.6264, 85.5186], blocks: ["Ramgarh", "Gola", "Mandu", "Patratu", "Dulmi", "Chitarpur"] },
  { id: "seraikela-kharsawan", name: "Seraikela Kharsawan", nameHi: "सरायकेला खरसावां", division: "Kolhan", headquarters: "Seraikela", coordinates: [22.7006, 85.9298], blocks: ["Seraikela", "Kharsawan", "Kuchai", "Gamharia", "Adityapur", "Chandil", "Ichagarh", "Kukru", "Nimdih", "Rajnagar"] },
  { id: "koderma", name: "Koderma", nameHi: "कोडरमा", division: "North Chotanagpur", headquarters: "Jhumri Telaiya", coordinates: [24.4673, 85.5939], blocks: ["Koderma", "Jainagar", "Markacho", "Satgawan", "Chandwara", "Domchanch"] },
  { id: "gumla", name: "Gumla", nameHi: "गुमला", division: "South Chotanagpur", headquarters: "Gumla", coordinates: [23.0428, 84.5422], blocks: ["Gumla", "Ghaghra", "Bishunpur", "Chainpur", "Dumri", "Albert Ekka (Jari)", "Raidih", "Palkot", "Basia", "Kamdara", "Sisai", "Bharno"] },
  { id: "lohardaga", name: "Lohardaga", nameHi: "लोहरदगा", division: "South Chotanagpur", headquarters: "Lohardaga", coordinates: [23.4318, 84.6826], blocks: ["Lohardaga", "Kisko", "Senha", "Kuru", "Bhandra", "Peshrar", "Kisko"] },
  { id: "simdega", name: "Simdega", nameHi: "सिमडेगा", division: "South Chotanagpur", headquarters: "Simdega", coordinates: [22.6148, 84.5097], blocks: ["Simdega", "Kolebira", "Bano", "Jaldega", "Thethaitangar", "Kurdeg", "Bolba", "Bansjor", "Kersai", "Pakartanr"] },
  { id: "latehar", name: "Latehar", nameHi: "लातेहार", division: "Palamu", headquarters: "Latehar", coordinates: [23.7438, 84.4984], blocks: ["Latehar", "Chandwa", "Balumath", "Bariyatu", "Herhanj", "Mahuadanr", "Garu", "Barwadih", "Manika"] },
  { id: "garhwa", name: "Garhwa", nameHi: "गढ़वा", division: "Palamu", headquarters: "Garhwa", coordinates: [24.1610, 83.8118], blocks: ["Garhwa", "Meral", "Ranka", "Bhandaria", "Ramkanda", "Chiniya", "Dhurki", "Nagar Untari", "Bhavnathpur", "Kharaundhi", "Majhiaon", "Danda", "Kandi"] },
  { id: "khunti", name: "Khunti", nameHi: "खूंटी", division: "South Chotanagpur", headquarters: "Khunti", coordinates: [23.0729, 85.2783], blocks: ["Khunti", "Murhu", "Torpa", "Rania", "Karra", "Arki"] },
  { id: "godda", name: "Godda", nameHi: "गोड्डा", division: "Santhal Pargana", headquarters: "Godda", coordinates: [24.8291, 87.2132], blocks: ["Godda", "Poreyahat", "Sundarpahari", "Pathargama", "Mahagama", "Boarijor", "Meherma", "Thakurgangti"] },
  { id: "sahebganj", name: "Sahebganj", nameHi: "साहेबगंज", division: "Santhal Pargana", headquarters: "Sahebganj", coordinates: [25.2444, 87.6436], blocks: ["Sahebganj", "Rajmahal", "Taljhari", "Udhwa", "Barharwa", "Pathna", "Barhait", "Borio", "Mandro"] },
  { id: "pakur", name: "Pakur", nameHi: "पाकुड़", division: "Santhal Pargana", headquarters: "Pakur", coordinates: [24.6340, 87.8483], blocks: ["Pakur", "Hiranpur", "Littipara", "Amrapara", "Pakuria", "Maheshpur"] },
  { id: "jamtara", name: "Jamtara", nameHi: "जामताड़ा", division: "Santhal Pargana", headquarters: "Jamtara", coordinates: [23.9592, 86.8016], blocks: ["Jamtara", "Karmatar", "Narayanpur", "Kundhit", "Nala", "Fatehpur"] },
  { id: "chatra", name: "Chatra", nameHi: "चतरा", division: "North Chotanagpur", headquarters: "Chatra", coordinates: [24.2104, 84.8722], blocks: ["Chatra", "Simaria", "Tandwa", "Pratappur", "Hunterganj", "Kanhachatti", "Gidhaur", "Pathalgada", "Lawalong", "Kunda", "Mayurhand", "Itkhori"] },
];

export interface StateSchemeInfo {
  id: string;
  name: string;
  nameHi: string;
  department: string;
  description: string;
  priorityWeightBonus: number;
}

export const JHARKHAND_STATE_SCHEMES: StateSchemeInfo[] = [
  {
    id: "jal-jeevan-mission",
    name: "Jal Jeevan Mission (Har Ghar Nal Se Jal - Jharkhand)",
    nameHi: "जल जीवन मिशन (हर घर नल से जल)",
    department: "Drinking Water & Sanitation Department",
    description: "Provision of functional household tap connection with pure potability standards (fluoride/arsenic free).",
    priorityWeightBonus: 15
  },
  {
    id: "birsa-harit-gram",
    name: "Birsa Harit Gram Yojana (BHGY)",
    nameHi: "बिरसा हरित ग्राम योजना",
    department: "Rural Development Department",
    description: "Utilizing uncultivated fallow land for fruit-bearing trees (Mango, Guava) and minor forest produce livelihood.",
    priorityWeightBonus: 12
  },
  {
    id: "mukhyamantri-krishi-yojana",
    name: "Mukhyamantri Krishi Ashirwad Yojana (MMKAY)",
    nameHi: "मुख्यमंत्री कृषि आशीर्वाद योजना",
    department: "Department of Agriculture, Animal Husbandry & Co-operative",
    description: "Direct financial and agri-technology input support to small and marginal farmers across Jharkhand.",
    priorityWeightBonus: 10
  },
  {
    id: "ayushman-bharat-jharkhand",
    name: "Mukhyamantri Jan Arogya Yojana (Ayushman Jharkhand)",
    nameHi: "मुख्यमंत्री जन आरोग्य योजना (आयुष्मान झारखंड)",
    department: "Department of Health, Medical Education & Family Welfare",
    description: "Universal healthcare coverage with emphasis on sickle cell anemia screening and tribal PHC telemedicine.",
    priorityWeightBonus: 15
  },
  {
    id: "jharkhand-solar-policy",
    name: "Jharkhand Solar Policy 2022 (JREDCL)",
    nameHi: "झारखंड सौर ऊर्जा नीति 2022",
    department: "Energy Department / JREDA",
    description: "4,000 MW renewable capacity target including decentralized rural solar microgrids and off-grid irrigation pumps.",
    priorityWeightBonus: 12
  },
  {
    id: "palamu-pipeline-irrigation",
    name: "Palamu Pipeline Irrigation Scheme",
    nameHi: "पलामू पाइपलाइन सिंचाई योजना",
    department: "Water Resources Department",
    description: "Lifting water from Sone and North Koel rivers to irrigate drought-prone plateaus of Palamu and Garhwa.",
    priorityWeightBonus: 14
  }
];

export interface SDGInfo {
  id: string;
  code: string;
  name: string;
  icon: string;
  color: string;
}

export const UN_SDGS: SDGInfo[] = [
  { id: "sdg-1", code: "SDG 1", name: "No Poverty", icon: "🪙", color: "#e5243b" },
  { id: "sdg-2", code: "SDG 2", name: "Zero Hunger", icon: "🍲", color: "#dda63a" },
  { id: "sdg-3", code: "SDG 3", name: "Good Health & Well-being", icon: "🏥", color: "#4c9f38" },
  { id: "sdg-4", code: "SDG 4", name: "Quality Education", icon: "📚", color: "#c5192d" },
  { id: "sdg-5", code: "SDG 5", name: "Gender Equality", icon: "⚖️", color: "#ff3a21" },
  { id: "sdg-6", code: "SDG 6", name: "Clean Water & Sanitation", icon: "💧", color: "#26bde2" },
  { id: "sdg-7", code: "SDG 7", name: "Affordable & Clean Energy", icon: "⚡", color: "#fcc30b" },
  { id: "sdg-8", code: "SDG 8", name: "Decent Work & Economic Growth", icon: "💼", color: "#a21942" },
  { id: "sdg-9", code: "SDG 9", name: "Industry, Innovation & Infrastructure", icon: "🏭", color: "#fd6925" },
  { id: "sdg-10", code: "SDG 10", name: "Reduced Inequalities", icon: "🤝", color: "#dd1367" },
  { id: "sdg-11", code: "SDG 11", name: "Sustainable Cities & Communities", icon: "🏙️", color: "#fd9d24" },
  { id: "sdg-12", code: "SDG 12", name: "Responsible Consumption & Production", icon: "🔄", color: "#bf8b2e" },
  { id: "sdg-13", code: "SDG 13", name: "Climate Action", icon: "🌍", color: "#3f7e44" },
  { id: "sdg-15", code: "SDG 15", name: "Life on Land", icon: "🌲", color: "#56c02b" },
  { id: "sdg-17", code: "SDG 17", name: "Partnerships for the Goals", icon: "🌐", color: "#19486a" }
];

export interface ThematicDomain {
  id: string;
  title: string;
  titleHi: string;
  icon: string;
  description: string;
  descriptionHi: string;
  subcategories: string[];
  color: string;
  bgGradient: string;
}

export const THEMATIC_DOMAINS: ThematicDomain[] = [
  {
    id: "education",
    title: "Education & Skilling",
    titleHi: "शिक्षा एवं कौशल विकास",
    icon: "📚",
    description: "NEP 2020 experiential learning, tribal language digital tools, rural STEM labs, and youth vocational skills.",
    descriptionHi: "NEP 2020 प्रायोगिक शिक्षा, जनजातीय भाषा डिजिटल टूल, ग्रामीण STEM लैब एवं युवा कौशल।",
    subcategories: ["Multilingual Digital Classrooms (Santhali, Mundari, Ho, Hindi)", "Rural STEM Kits & Virtual Labs", "Youth Vocational Skilling & Placement", "Teacher Training Tools", "Drop-out Prevention Analytics"],
    color: "#7c3aed",
    bgGradient: "from-purple-500 to-indigo-700"
  },
  {
    id: "healthcare",
    title: "Healthcare & Nutrition",
    titleHi: "स्वास्थ्य एवं पोषण",
    icon: "🏥",
    description: "Telemedicine for remote tribal habitations, sickle cell anemia screening, maternal-child nutrition, and emergency response.",
    descriptionHi: "दूरदराज क्षेत्रों हेतु टेलीमेडिसिन, सिकल सेल एनीमिया जांच, मातृ-शिशु पोषण एवं आपातकालीन स्वास्थ्य।",
    subcategories: ["Tele-Consultation for Remote PHCs", "Malnutrition Diagnostic Kits", "Sickle Cell Screening", "Emergency Response & Drone Delivery", "Digital Health Records in Local Dialects"],
    color: "#e11d48",
    bgGradient: "from-rose-500 to-red-700"
  },
  {
    id: "agriculture",
    title: "Agriculture",
    titleHi: "कृषि एवं बागवानी",
    icon: "🌾",
    description: "Crop yield optimization, plateau soil health, climate-resilient farming, and organic millet processing.",
    descriptionHi: "फसल उपज सुधार, पठारी मिट्टी स्वास्थ्य, जलवायु-अनुकूल खेती एवं जैविक मिलेट प्रसंस्करण।",
    subcategories: ["Crop Protection & Pest Alert", "Plateau Soil Health Mapping", "Millet Processing Automation", "Post-Harvest Storage", "Farm Mechanization for Terrains"],
    color: "#16a34a",
    bgGradient: "from-emerald-500 to-green-700"
  },
  {
    id: "rural-livelihoods",
    title: "Rural Livelihoods",
    titleHi: "ग्रामीण आजीविका",
    icon: "🌱",
    description: "Minor forest produce (Mahua, Lac, Tussar silk) value addition, tribal SHG supply chains, and artisan empowerment.",
    descriptionHi: "लघु वनोपज (महुआ, लाह, तसर सिल्क) मूल्य संवर्धन, जनजातीय SHG सप्लाई चेन एवं शिल्पकार सशक्तिकरण।",
    subcategories: ["Tribal Produce Supply Chain", "Tussar Silk Processing Units", "Lac & Mahua Value Addition", "Handicraft E-Commerce & Fair Price", "Solar Dehydration Units for SHGs"],
    color: "#059669",
    bgGradient: "from-green-600 to-teal-800"
  },
  {
    id: "water-resources",
    title: "Water Resources & Sanitation",
    titleHi: "जल संसाधन एवं स्वच्छता",
    icon: "💧",
    description: "Groundwater recharge, rural drinking water purification, fluoride & arsenic removal, and check dam management.",
    descriptionHi: "भूजल पुनर्भरण, पेयजल शुद्धिकरण, फ्लोराइड व आर्सेनिक निष्कासन एवं चेकडैम प्रबंधन।",
    subcategories: ["Arsenic & Fluoride Filtration", "Rainwater Harvesting & Ponds", "Solar-Powered Water Pumping", "Smart Drainage & Waste Management", "Sanitation in Remote Habitations"],
    color: "#0284c7",
    bgGradient: "from-cyan-500 to-blue-700"
  },
  {
    id: "environment",
    title: "Environment & Forestry",
    titleHi: "पर्यावरण एवं वानिकी",
    icon: "🌲",
    description: "Abandoned mine land reclamation, fly ash reuse, biodiversity mapping, and forest fire early detection.",
    descriptionHi: "परित्यक्त खदान भूमि सुधार, फ्लाई ऐश उपयोग, जैव विविधता मैपिंग एवं वनाग्नि चेतावनी।",
    subcategories: ["Abandoned Mine Land Reclamation", "Forest Fire Early Warning", "Industrial Fly Ash Utilization", "Biodiversity Mapping", "Afforestation Tech in Rocky Terrains"],
    color: "#15803d",
    bgGradient: "from-emerald-600 to-emerald-900"
  },
  {
    id: "energy",
    title: "Clean Energy",
    titleHi: "स्वच्छ ऊर्जा",
    icon: "⚡",
    description: "Decentralized solar microgrids for off-grid tribal hamlets, biomass power, and energy storage.",
    descriptionHi: "दूरदराज बस्तियों हेतु सौर माइक्रोग्रिड, बायोमास ऊर्जा एवं ऊर्जा भंडारण समाधान।",
    subcategories: ["Decentralized Solar Microgrids", "Biomass Gasifiers for Villages", "Solar Cold Storage", "EV Charging for Hilly Terrain", "Smart Energy Metering"],
    color: "#d97706",
    bgGradient: "from-amber-500 to-orange-700"
  },
  {
    id: "urban-development",
    title: "Urban Development & Mobility",
    titleHi: "शहरी विकास एवं गतिशीलता",
    icon: "🏙️",
    description: "Smart municipal services, AI pothole and road safety, solid waste segregation, and sustainable transit.",
    descriptionHi: "स्मार्ट नगर पालिका सेवाएं, AI गड्ढा पहचान, ठोस अपशिष्ट प्रबंधन एवं सुलभ यातायात।",
    subcategories: ["Smart Solid Waste Segregation", "Traffic Flow AI & Road Safety", "Pothole Detection & Rapid Repair", "Public Transport Scheduling", "Slum Habitation Upgradation"],
    color: "#2563eb",
    bgGradient: "from-blue-500 to-indigo-800"
  },
  {
    id: "accessibility",
    title: "Accessibility & Assistive Tech",
    titleHi: "सुगमता एवं सहायक तकनीक",
    icon: "♿",
    description: "Assistive innovations for Persons with Disabilities (Divyangjan), barrier-free public infrastructure, and tactile tools.",
    descriptionHi: "दिव्यांगजनों हेतु सहायक नवाचार, बाधारहित सार्वजनिक बुनियादी ढांचा एवं स्पर्शनीय उपकरण।",
    subcategories: ["Assistive Tools for Persons with Disabilities", "Tactile Audio Signage in Public Places", "Low-Cost Smart Wheelchairs", "Speech-to-Text in Regional Dialects", "Braille Learning Kits"],
    color: "#8b5cf6",
    bgGradient: "from-purple-600 to-violet-900"
  },
  {
    id: "public-administration",
    title: "Public Administration & Governance",
    titleHi: "लोक प्रशासन एवं शासन",
    icon: "🏛️",
    description: "Transparent welfare delivery, AI grievance redressal, land record simplification, and scheme awareness.",
    descriptionHi: "पारदर्शी कल्याणकारी योजना वितरण, AI शिकायत निवारण, भू-अभिलेख सरलीकरण एवं जागरूकता।",
    subcategories: ["AI Grievance Classification", "Public Distribution System (PDS) Tracking", "Tribal Land Record Simplification", "Last-Mile Government Scheme Awareness", "Direct Benefit Transfer (DBT) Audit Trails"],
    color: "#0d9488",
    bgGradient: "from-teal-500 to-emerald-700"
  }
];

export interface UniversityInfo {
  id: string;
  name: string;
  shortName: string;
  location: string;
  district: string;
  specializations: string[];
  departments: string[];
  incubationLabs: string[];
  activeProjects: number;
  facultyCount: number;
  studentsRegistered: number;
  rating: number;
  avatar: string;
  contactEmail: string;
}

export const JHARKHAND_UNIVERSITIES: UniversityInfo[] = [
  {
    id: "bit-mesra",
    name: "Birla Institute of Technology (BIT) Mesra",
    shortName: "BIT Mesra",
    location: "Ranchi",
    district: "ranchi",
    specializations: ["AI & Machine Learning", "Space Engineering", "Remote Sensing & GIS", "Renewable Energy", "Water Technology", "Robotics"],
    departments: ["Chemical & Environmental Engg", "Computer Science & AI", "Civil Engineering", "Electronics & Embedded Systems", "Bio-Engineering"],
    incubationLabs: ["Water Filtration & Membrane Tech Lab", "Center for Renewable Energy", "IoT & Spatial Sensing Facility", "Tribal Tech Innovation Cell"],
    activeProjects: 14,
    facultyCount: 120,
    studentsRegistered: 850,
    rating: 4.9,
    avatar: "🎓",
    contactEmail: "dean.research@bitmesra.ac.in"
  },
  {
    id: "iit-ism-dhanbad",
    name: "Indian Institute of Technology (ISM) Dhanbad",
    shortName: "IIT (ISM) Dhanbad",
    location: "Dhanbad",
    district: "dhanbad",
    specializations: ["Mining & Mine Reclamation", "Environmental Engineering", "Clean Energy", "Geosciences", "IoT & Automation"],
    departments: ["Mining Engineering", "Environmental Science & Engg", "Electrical Engineering", "Applied Geology", "Mechanical Engineering"],
    incubationLabs: ["Center of Excellence in Mine Environment", "Clean Coal & Renewable Tech Hub", "TexMin Technology Innovation Hub"],
    activeProjects: 18,
    facultyCount: 160,
    studentsRegistered: 1200,
    rating: 4.95,
    avatar: "🏛️",
    contactEmail: "dean_sric@iitism.ac.in"
  },
  {
    id: "nit-jamshedpur",
    name: "National Institute of Technology (NIT) Jamshedpur",
    shortName: "NIT Jamshedpur",
    location: "Jamshedpur",
    district: "east-singhbhum",
    specializations: ["Manufacturing & Metallurgy", "Civil & Water Resources", "Smart Grid Technology", "Embedded Systems", "Public Transportation"],
    departments: ["Civil Engineering", "Metallurgical & Materials Engg", "Computer Science", "Electrical & Electronics"],
    incubationLabs: ["Smart City & Traffic AI Testbed", "Advanced Metallurgy & Materials Lab", "Water Quality & Flow Dynamics Center"],
    activeProjects: 11,
    facultyCount: 95,
    studentsRegistered: 780,
    rating: 4.8,
    avatar: "⚙️",
    contactEmail: "research@nitjsr.ac.in"
  },
  {
    id: "bau-ranchi",
    name: "Birsa Agricultural University (BAU)",
    shortName: "BAU Ranchi",
    location: "Kanke, Ranchi",
    district: "ranchi",
    specializations: ["Horticulture & Plateau Farming", "Soil Science", "Veterinary & Dairy", "Forestry Management", "Solar Processing for Minor Produce"],
    departments: ["Agronomy & Soil Science", "Forestry & Agro-Forestry", "Agricultural Engineering", "Veterinary Sciences"],
    incubationLabs: ["Minor Forest Produce Processing Center", "Tribal Millet & Seed Bank", "Solar Dehydration & Bio-Fertilizer Incubator"],
    activeProjects: 16,
    facultyCount: 85,
    studentsRegistered: 620,
    rating: 4.85,
    avatar: "🌾",
    contactEmail: "director.research@bauranchi.org"
  },
  {
    id: "ranchi-university",
    name: "Ranchi University",
    shortName: "Ranchi Univ",
    location: "Ranchi",
    district: "ranchi",
    specializations: ["Tribal Studies & Languages", "Public Health", "Societal Policy", "Botany & Medicinal Plants"],
    departments: ["Tribal & Regional Languages", "Botany & Ethno-Medicine", "Sociology & Rural Development", "Zoology & Public Health"],
    incubationLabs: ["Ethno-Botanical Formulation Lab", "Santhali/Mundari NLP & Digital Archive Cell", "Community Health Innovation Lab"],
    activeProjects: 9,
    facultyCount: 110,
    studentsRegistered: 1450,
    rating: 4.6,
    avatar: "📚",
    contactEmail: "research@ranchiuniversity.ac.in"
  },
  {
    id: "vbu-hazaribagh",
    name: "Vinoba Bhave University (VBU)",
    shortName: "VBU Hazaribagh",
    location: "Hazaribagh",
    district: "hazaribagh",
    specializations: ["Rural Development", "Biotechnology", "Social Sciences", "Teacher Education"],
    departments: ["Biotechnology", "Rural Economics", "Information Technology", "Education"],
    incubationLabs: ["Rural Biotech & Vermiculture Lab", "Teacher Digital Pedagogy Hub"],
    activeProjects: 7,
    facultyCount: 75,
    studentsRegistered: 900,
    rating: 4.5,
    avatar: "📖",
    contactEmail: "rnd@vbu.ac.in"
  },
  {
    id: "skmu-dumka",
    name: "Sido Kanhu Murmu University (SKMU)",
    shortName: "SKMU Dumka",
    location: "Dumka",
    district: "dumka",
    specializations: ["Santhal Pargana Ecology", "Tribal Handicrafts & Livelihood", "Primary Health Innovations", "Sickle Cell Screening"],
    departments: ["Anthropology & Tribal Livelihoods", "Life Sciences", "Chemistry", "Economics"],
    incubationLabs: ["Paharia Health & Nutrition Research Center", "Tribal Silk & Lac Artisan Hub"],
    activeProjects: 6,
    facultyCount: 60,
    studentsRegistered: 550,
    rating: 4.4,
    avatar: "🏹",
    contactEmail: "dean.research@skmu.ac.in"
  }
];

export interface IndustryPartnerInfo {
  id: string;
  name: string;
  category: "Enterprise" | "Startup" | "MSME" | "CSR Foundation" | "Research Lab";
  location: string;
  focusDomains: string[];
  fundingOfferedCr: number;
  mentorsProvided: number;
  facilitiesOffered: string[];
  logo: string;
}

export const SAMPLE_INDUSTRY_PARTNERS: IndustryPartnerInfo[] = [
  {
    id: "tata-steel-csr",
    name: "Tata Steel CSR & Innovation Hub",
    category: "Enterprise",
    location: "Jamshedpur",
    focusDomains: ["Water Resources & Sanitation", "Healthcare & Nutrition", "Education & Skilling"],
    fundingOfferedCr: 4.5,
    mentorsProvided: 28,
    facilitiesOffered: ["Materials Fabrication Workshop", "Water Testing Spectrometry Lab", "Rural Field Pilot Testbeds"],
    logo: "🏭"
  },
  {
    id: "ccl-ranchi",
    name: "Central Coalfields Limited (CCL) Innovation Cell",
    category: "Enterprise",
    location: "Ranchi",
    focusDomains: ["Environment & Forestry", "Clean Energy", "Urban Development & Mobility"],
    fundingOfferedCr: 3.2,
    mentorsProvided: 15,
    facilitiesOffered: ["Reclaimed Mine Sites for Trials", "Heavy Machinery Prototyping", "Fly Ash Processing Pilot"],
    logo: "⛏️"
  },
  {
    id: "jharkhand-agritech-startup",
    name: "GraminSetu AgriTech Labs",
    category: "Startup",
    location: "Ranchi",
    focusDomains: ["Agriculture", "Rural Livelihoods"],
    fundingOfferedCr: 0.8,
    mentorsProvided: 8,
    facilitiesOffered: ["Solar Dryer Fabrication Yard", "Farmer Producer Org (FPO) Pilot Network"],
    logo: "🚜"
  },
  {
    id: "bokaro-steel-innovations",
    name: "SAIL - Bokaro Steel CSR Foundation",
    category: "Enterprise",
    location: "Bokaro",
    focusDomains: ["Education & Skilling", "Accessibility & Assistive Tech", "Public Administration & Governance"],
    fundingOfferedCr: 2.1,
    mentorsProvided: 12,
    facilitiesOffered: ["3D Rapid Prototyping Lab", "Divyangjan Assistive Equipment Workshop"],
    logo: "🏗️"
  },
  {
    id: "arogyam-healthtech",
    name: "Arogyam Tribal Health Innovations",
    category: "MSME",
    location: "Dhanbad",
    focusDomains: ["Healthcare & Nutrition"],
    fundingOfferedCr: 1.1,
    mentorsProvided: 6,
    facilitiesOffered: ["Point-of-Care Diagnostics Lab", "Mobile Diagnostic Vans in Santhal Pargana"],
    logo: "🩺"
  }
];

export type UserRole = "citizen" | "admin" | "university" | "faculty" | "student" | "industry";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  organization?: string;
  district?: string;
  phone?: string;
  avatar?: string;
}

export type ChallengeStatus =
  | "Submitted"
  | "Under_Review"
  | "Validated"
  | "Assigned"
  | "In_Progress"
  | "Solution_Proposed"
  | "Under_Testing"
  | "Deployed"
  | "Resolved"
  | "Rejected";

export interface ChallengeItem {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  district: string;
  block?: string;
  locationCoordinates?: [number, number];
  submittedBy: {
    name: string;
    role: "citizen" | "pri" | "ulb" | "ngo" | "govt";
    contact?: string;
    anonymous?: boolean;
  };
  priority: "Low" | "Medium" | "High" | "Critical";
  priorityScore: number;
  status: ChallengeStatus;
  alignedSchemeIds?: string[];
  sdgGoals?: string[];
  assignedUniversityId?: string;
  assignedUniversityName?: string;
  collaboratingIndustryIds?: string[];
  aiClassification?: {
    confidence: number;
    thematicTags: string[];
    suggestedUniversityIds: string[];
    impactScore: number;
    duplicateCheck: { isDuplicate: boolean; similarChallengeId?: string; similarityScore?: number; reason?: string };
    routingReasoning?: string;
    tokenWeights?: { token: string; weight: number }[];
    schemeAlignmentBonus?: number;
  };
  mediaUrls?: string[];
  upvotes: number;
  views: number;
  submittedAt: string;
  updatedAt: string;
  citizenFeedback?: {
    rating: number;
    comment: string;
    evaluatedAt: string;
  };
}

export const INITIAL_MOCK_CHALLENGES: ChallengeItem[] = [
  {
    id: "CH-JH-2026-001",
    title: "High Fluoride & Arsenic Contamination in Rural Hand Pumps across Latehar",
    description: "More than 28 villages in Mahuadanr and Garu blocks suffer from severe skeletal fluorosis due to groundwater fluoride exceeding 3.5 mg/L. Existing iron-removal filters clog rapidly. Need a low-cost, decentralized filtration system using locally available red laterite clay or solar-powered electro-coagulation.",
    category: "Water Resources & Sanitation",
    subcategory: "Arsenic & Fluoride Filtration",
    district: "latehar",
    block: "Mahuadanr",
    locationCoordinates: [23.7438, 84.4984],
    submittedBy: {
      name: "Gram Panchayat Mahuadanr",
      role: "pri",
      contact: "mukhiya.mahuadanr@jharkhand.gov.in"
    },
    priority: "Critical",
    priorityScore: 94,
    status: "Assigned",
    alignedSchemeIds: ["jal-jeevan-mission"],
    sdgGoals: ["SDG 6: Clean Water & Sanitation", "SDG 3: Good Health & Well-being"],
    assignedUniversityId: "bit-mesra",
    assignedUniversityName: "Birla Institute of Technology (BIT) Mesra",
    collaboratingIndustryIds: ["tata-steel-csr"],
    aiClassification: {
      confidence: 0.96,
      thematicTags: ["Fluoride Contamination", "Water Purification", "Rural Health", "Decentralized Filtration"],
      suggestedUniversityIds: ["bit-mesra", "iit-ism-dhanbad", "nit-jamshedpur"],
      impactScore: 94,
      tokenWeights: [
        { token: "fluoride", weight: 0.95 },
        { token: "arsenic", weight: 0.92 },
        { token: "hand pumps", weight: 0.88 },
        { token: "latehar", weight: 0.85 }
      ],
      schemeAlignmentBonus: 15,
      duplicateCheck: { isDuplicate: false, similarityScore: 0.08 },
      routingReasoning: "Matched with BIT Mesra Membrane and Water Tech facility; prioritized under Jal Jeevan Mission (Har Ghar Nal Se Jal)."
    },
    mediaUrls: ["/images/water_challenge.jpg"],
    upvotes: 142,
    views: 890,
    submittedAt: "2026-08-15T10:30:00Z",
    updatedAt: "2026-08-20T14:15:00Z"
  },
  {
    id: "CH-JH-2026-002",
    title: "Severe Post-Harvest Wastage of Tribal Mahua & Forest Lac in West Singhbhum",
    description: "Tribal self-help groups (SHGs) collect over 450 metric tonnes of Mahua flowers and Kusmi lac annually in Chaibasa region. Due to lack of solar dehumidifiers and value-addition processing units, up to 40% degrades during monsoon storage, leading to distressed selling at exploitative prices.",
    category: "Rural Livelihoods",
    subcategory: "Tribal Produce Supply Chain",
    district: "west-singhbhum",
    block: "Chaibasa",
    locationCoordinates: [22.5519, 85.8078],
    submittedBy: {
      name: "Van Dhan Vikas Kendra - Chaibasa",
      role: "ngo",
      contact: "chaibasa.shg@jharkhand.gov.in"
    },
    priority: "High",
    priorityScore: 89,
    status: "In_Progress",
    alignedSchemeIds: ["birsa-harit-gram", "mukhyamantri-krishi-yojana"],
    sdgGoals: ["SDG 1: No Poverty", "SDG 8: Decent Work & Economic Growth", "SDG 12: Responsible Consumption"],
    assignedUniversityId: "bau-ranchi",
    assignedUniversityName: "Birsa Agricultural University (BAU)",
    collaboratingIndustryIds: ["jharkhand-agritech-startup"],
    aiClassification: {
      confidence: 0.94,
      thematicTags: ["Minor Forest Produce", "Solar Dehydration", "Tribal Livelihood", "Value Addition"],
      suggestedUniversityIds: ["bau-ranchi", "skmu-dumka", "bit-mesra"],
      impactScore: 89,
      tokenWeights: [
        { token: "mahua", weight: 0.94 },
        { token: "lac", weight: 0.91 },
        { token: "storage", weight: 0.86 }
      ],
      schemeAlignmentBonus: 12,
      duplicateCheck: { isDuplicate: false, similarityScore: 0.12 },
      routingReasoning: "BAU Ranchi has dedicated agro-processing incubator and Minor Forest Produce research team."
    },
    mediaUrls: [],
    upvotes: 98,
    views: 640,
    submittedAt: "2026-08-18T08:45:00Z",
    updatedAt: "2026-08-24T16:00:00Z"
  },
  {
    id: "CH-JH-2026-003",
    title: "Under-Five Child Malnutrition & Sickle Cell Anemia Early Screening in Santhal Pargana",
    description: "Dumka and Pakur districts report elevated prevalence of sickle cell trait and chronic SAM (Severe Acute Malnutrition) among Paharia tribes. Anganwadi centers lack rapid, non-invasive digital screening tools to record hemoglobin electrophoresis data and track nutritional recovery milestones.",
    category: "Healthcare & Nutrition",
    subcategory: "Sickle Cell Screening",
    district: "dumka",
    block: "Kathikund",
    locationCoordinates: [24.2677, 87.2474],
    submittedBy: {
      name: "District Health Society, Dumka",
      role: "govt",
      contact: "cs.dumka@jharkhand.gov.in"
    },
    priority: "Critical",
    priorityScore: 97,
    status: "Solution_Proposed",
    alignedSchemeIds: ["ayushman-bharat-jharkhand"],
    sdgGoals: ["SDG 3: Good Health & Well-being", "SDG 10: Reduced Inequalities"],
    assignedUniversityId: "skmu-dumka",
    assignedUniversityName: "Sido Kanhu Murmu University (SKMU)",
    collaboratingIndustryIds: ["arogyam-healthtech"],
    aiClassification: {
      confidence: 0.97,
      thematicTags: ["Sickle Cell Anemia", "Tribal Nutrition", "Point-of-Care Diagnostics", "Maternal Health"],
      suggestedUniversityIds: ["skmu-dumka", "ranchi-university", "bit-mesra"],
      impactScore: 97,
      tokenWeights: [
        { token: "sickle cell", weight: 0.98 },
        { token: "malnutrition", weight: 0.95 },
        { token: "anganwadi", weight: 0.89 }
      ],
      schemeAlignmentBonus: 15,
      duplicateCheck: { isDuplicate: false, similarityScore: 0.05 },
      routingReasoning: "SKMU Dumka Paharia Health Research Center matches geographic location and domain."
    },
    mediaUrls: [],
    upvotes: 185,
    views: 1120,
    submittedAt: "2026-08-10T11:20:00Z",
    updatedAt: "2026-08-28T09:30:00Z"
  },
  {
    id: "CH-JH-2026-004",
    title: "Multilingual Digital Learning Content for Santhali & Mundari Primary School Students",
    description: "Primary schools in East Singhbhum and Khunti face high dropout rates among tribal students transitioning from Ol Chiki / Santhali and Mundari mother tongues to Hindi/English textbooks. Need an offline-first interactive tablet app with bilingual gamified modules aligned with NEP 2020.",
    category: "Education & Skilling",
    subcategory: "Multilingual Digital Classrooms (Santhali, Mundari, Ho, Hindi)",
    district: "khunti",
    block: "Torpa",
    locationCoordinates: [23.0729, 85.2783],
    submittedBy: {
      name: "Torpa Shiksha Samiti",
      role: "citizen",
      contact: "torpa.samiti@gmail.com"
    },
    priority: "High",
    priorityScore: 91,
    status: "Under_Testing",
    alignedSchemeIds: [],
    sdgGoals: ["SDG 4: Quality Education", "SDG 10: Reduced Inequalities"],
    assignedUniversityId: "ranchi-university",
    assignedUniversityName: "Ranchi University",
    collaboratingIndustryIds: ["bokaro-steel-innovations"],
    aiClassification: {
      confidence: 0.95,
      thematicTags: ["NEP 2020", "Multilingual Pedagogy", "Ol Chiki", "Tribal Education"],
      suggestedUniversityIds: ["ranchi-university", "nit-jamshedpur", "vbu-hazaribagh"],
      impactScore: 91,
      tokenWeights: [
        { token: "santhali", weight: 0.96 },
        { token: "ol chiki", weight: 0.94 },
        { token: "dropout", weight: 0.88 }
      ],
      schemeAlignmentBonus: 10,
      duplicateCheck: { isDuplicate: false, similarityScore: 0.14 },
      routingReasoning: "Ranchi University Department of Tribal & Regional Languages has linguistic archives."
    },
    mediaUrls: [],
    upvotes: 112,
    views: 740,
    submittedAt: "2026-07-22T14:10:00Z",
    updatedAt: "2026-08-26T18:00:00Z"
  },
  {
    id: "CH-JH-2026-005",
    title: "Ecological Restoration & Fly Ash Stabilization on Abandoned Coal Mines in Jharia",
    description: "Over 40 square km of abandoned opencast mine overburden in Dhanbad produces persistent fugitive dust and ground subsidence. Standard afforestation fails due to acidic mine drainage (pH < 4.2). Require microbial bioremediation and geotextile stabilization to restore green canopy.",
    category: "Environment & Forestry",
    subcategory: "Abandoned Mine Land Reclamation",
    district: "dhanbad",
    block: "Jharia",
    locationCoordinates: [23.7957, 86.4304],
    submittedBy: {
      name: "Jharia Coalfield Action Group",
      role: "ngo",
      contact: "jharia.action@jharkhand.org"
    },
    priority: "Critical",
    priorityScore: 96,
    status: "Deployed",
    alignedSchemeIds: ["jharkhand-solar-policy"],
    sdgGoals: ["SDG 15: Life on Land", "SDG 13: Climate Action", "SDG 11: Sustainable Cities"],
    assignedUniversityId: "iit-ism-dhanbad",
    assignedUniversityName: "Indian Institute of Technology (ISM) Dhanbad",
    collaboratingIndustryIds: ["ccl-ranchi"],
    aiClassification: {
      confidence: 0.98,
      thematicTags: ["Mine Reclamation", "Fly Ash", "Acid Mine Drainage", "Air Quality"],
      suggestedUniversityIds: ["iit-ism-dhanbad", "bit-mesra", "bau-ranchi"],
      impactScore: 96,
      tokenWeights: [
        { token: "mine", weight: 0.98 },
        { token: "fly ash", weight: 0.96 },
        { token: "reclamation", weight: 0.94 }
      ],
      schemeAlignmentBonus: 12,
      duplicateCheck: { isDuplicate: false, similarityScore: 0.04 },
      routingReasoning: "IIT (ISM) Dhanbad holds national leadership in Mining Environment and Reclamation engineering."
    },
    mediaUrls: [],
    upvotes: 215,
    views: 1450,
    submittedAt: "2026-06-15T09:00:00Z",
    updatedAt: "2026-08-29T11:45:00Z",
    citizenFeedback: {
      rating: 5,
      comment: "Field trials across 5 hectares in Jharia showed 85% grass and native sapling survival with 70% reduction in airborne dust.",
      evaluatedAt: "2026-08-29"
    }
  }
];
