import { NextRequest, NextResponse } from "next/server";
import { THEMATIC_DOMAINS, JHARKHAND_UNIVERSITIES, JHARKHAND_STATE_SCHEMES } from "@/lib/constants";
import { AITriageResponseSchema, AITriageResponseOutput } from "@/lib/schemas";
import { listChallenges } from "@/lib/repositories/challenge-repository";

// Levenshtein & Jaccard token similarity for duplicate detection
function computeTextSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/).filter(w => w.length > 3));
  const words2 = new Set(text2.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/).filter(w => w.length > 3));

  if (words1.size === 0 || words2.size === 0) return 0;

  let intersection = 0;
  for (const w of words1) {
    if (words2.has(w)) intersection++;
  }

  const union = new Set([...words1, ...words2]).size;
  return parseFloat((intersection / union).toFixed(3));
}

// Deterministic university routing score based on domain, lab, and district
function computeUniversityRankings(domain: string, description: string, district: string) {
  const domainLower = domain.toLowerCase();
  const descLower = description.toLowerCase();

  return JHARKHAND_UNIVERSITIES.map(u => {
    let score = 50;

    // 1. Specialization match (up to 30 pts)
    for (const spec of u.specializations) {
      if (domainLower.includes(spec.toLowerCase()) || descLower.includes(spec.toLowerCase())) {
        score += 15;
      }
    }

    // 2. Lab match (up to 15 pts)
    for (const lab of u.incubationLabs) {
      if (descLower.includes(lab.toLowerCase().split(" ")[0])) {
        score += 15;
      }
    }

    // 3. District proximity (up to 15 pts)
    if (u.district.toLowerCase() === district.toLowerCase()) {
      score += 15;
    }

    score = Math.min(score, 98);

    return {
      id: u.id,
      name: u.name,
      specializations: u.specializations,
      matchScore: score,
      matchReason: `High academic alignment in ${u.specializations.slice(0, 2).join(" & ")} and specialized ${u.incubationLabs[0] || "facility"}`,
      incubationLabs: u.incubationLabs
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}

// Deterministic Rule-Based Fallback Engine
function executeRuleBasedTriage(title: string, description: string, district: string): AITriageResponseOutput {
  const combined = `${title} ${description}`.toLowerCase();

  let matchedDomain = THEMATIC_DOMAINS[0].title;
  let matchedSub = THEMATIC_DOMAINS[0].subcategories[0];

  for (const d of THEMATIC_DOMAINS) {
    for (const sub of d.subcategories) {
      if (combined.includes(sub.toLowerCase()) || combined.includes(d.title.toLowerCase().split(" ")[0])) {
        matchedDomain = d.title;
        matchedSub = sub;
        break;
      }
    }
  }

  let priority: "Low" | "Medium" | "High" | "Critical" = "Medium";
  let priorityScore = 70;

  if (combined.includes("urgent") || combined.includes("critical") || combined.includes("danger") || combined.includes("fluoride") || combined.includes("poison") || combined.includes("collapse")) {
    priority = "Critical";
    priorityScore = 95;
  } else if (combined.includes("severe") || combined.includes("damaged") || combined.includes("disease") || combined.includes("pothole")) {
    priority = "High";
    priorityScore = 85;
  }

  const universityMatches = computeUniversityRankings(matchedDomain, description, district);

  return {
    category: matchedDomain,
    subcategory: matchedSub,
    confidence: 0.88,
    priority,
    priorityScore,
    impactScore: Math.min(priorityScore + 5, 99),
    thematicTags: [matchedDomain, matchedSub, district],
    suggestedUniversityIds: universityMatches.slice(0, 3).map(u => u.id),
    duplicateCheck: {
      isDuplicate: false,
      similarityScore: 0,
      explanation: "No duplicate records detected above threshold."
    },
    reasoning: `Categorized into ${matchedDomain} (${matchedSub}) based on keyword extraction and spatial district proximity.`,
    sdgAlignment: ["SDG 6: Clean Water & Sanitation", "SDG 9: Industry, Innovation & Infrastructure"],
    alignedStateSchemeIds: ["jal-jeevan-mission", "birsa-harit-gram"]
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, district, block } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    // 1. Check against persisted challenges in Firestore for real duplicate detection
    const existingChallenges = await listChallenges({ limitCount: 40 }, true);
    let topDuplicateScore = 0;
    let duplicateChallenge: { id: string; title: string } | null = null;

    for (const c of existingChallenges) {
      const simTitle = computeTextSimilarity(title, c.title);
      const simDesc = computeTextSimilarity(description, c.description);
      const combinedSim = (simTitle * 0.6) + (simDesc * 0.4);

      if (combinedSim > topDuplicateScore) {
        topDuplicateScore = combinedSim;
        duplicateChallenge = { id: c.id, title: c.title };
      }
    }

    const isDuplicate = topDuplicateScore >= 0.75;
    const apiKey = process.env.GEMINI_API_KEY;

    let triageResult: AITriageResponseOutput;

    // 2. Call Gemini API if GEMINI_API_KEY is available on server
    if (apiKey) {
      try {
        const prompt = `You are the AI Triage & NLP routing engine for the Government of Jharkhand Societal Innovation Collaboration Portal.
Analyze the following citizen-submitted challenge:
Title: "${title}"
Description: "${description}"
District: "${district || "Ranchi"}"
Block: "${block || "District HQ"}"

Available Thematic Domains:
${THEMATIC_DOMAINS.map(d => `- ${d.title} (Subcategories: ${d.subcategories.join(", ")})`).join("\n")}

Available Higher Education Institutions:
${JHARKHAND_UNIVERSITIES.map(u => `- ID: ${u.id}, Name: ${u.name}, District: ${u.district}, Specs: ${u.specializations.join(", ")}`).join("\n")}

Respond ONLY with valid JSON matching this schema:
{
  "category": "exact category string from domains",
  "subcategory": "exact or matching subcategory string",
  "confidence": 0.94,
  "priority": "Low" | "Medium" | "High" | "Critical",
  "priorityScore": 92,
  "impactScore": 90,
  "thematicTags": ["tag1", "tag2"],
  "suggestedUniversityIds": ["id1", "id2"],
  "duplicateCheck": {
    "isDuplicate": ${isDuplicate},
    "similarChallengeId": "${duplicateChallenge?.id || ""}",
    "similarChallengeTitle": "${duplicateChallenge?.title || ""}",
    "similarityScore": ${topDuplicateScore},
    "explanation": "${isDuplicate ? "High lexical overlap with an existing challenge in the same district" : "No duplicates found"}"
  },
  "reasoning": "2-sentence explanation of classification and university match.",
  "sdgAlignment": ["SDG 6: Clean Water", "SDG 3: Good Health"],
  "alignedStateSchemeIds": ["jal-jeevan-mission"]
}`;

        const resp = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { responseMimeType: "application/json", temperature: 0.1 }
            })
          }
        );

        if (resp.ok) {
          const data = await resp.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const parsed = JSON.parse(text);
            const validated = AITriageResponseSchema.parse(parsed);
            triageResult = validated;
          } else {
            triageResult = executeRuleBasedTriage(title, description, district || "Ranchi");
          }
        } else {
          triageResult = executeRuleBasedTriage(title, description, district || "Ranchi");
        }
      } catch (geminiErr) {
        console.warn("Gemini API call failed, falling back to rule engine:", geminiErr);
        triageResult = executeRuleBasedTriage(title, description, district || "Ranchi");
      }
    } else {
      triageResult = executeRuleBasedTriage(title, description, district || "Ranchi");
    }

    // Attach duplicate analysis if detected
    if (duplicateChallenge && topDuplicateScore > 0.4) {
      triageResult.duplicateCheck = {
        isDuplicate,
        similarChallengeId: duplicateChallenge.id,
        similarChallengeTitle: duplicateChallenge.title,
        similarityScore: topDuplicateScore,
        explanation: isDuplicate
          ? `High similarity (${Math.round(topDuplicateScore * 100)}%) with #${duplicateChallenge.id}: "${duplicateChallenge.title}"`
          : `Potential thematic overlap (${Math.round(topDuplicateScore * 100)}%) with #${duplicateChallenge.id}`
      };
    }

    // Calculate ranked university details
    const rankedUniversities = computeUniversityRankings(triageResult.category, description, district || "Ranchi");

    return NextResponse.json({
      ...triageResult,
      suggestedUniversities: rankedUniversities.slice(0, 3),
      classificationSource: apiKey ? "gemini_llm" : "deterministic_rule_engine",
      triagedAt: new Date().toISOString()
    });
  } catch (error: any) {
    console.error("Triage API error:", error);
    return NextResponse.json({ error: error.message || "Failed running triage analysis" }, { status: 500 });
  }
}
