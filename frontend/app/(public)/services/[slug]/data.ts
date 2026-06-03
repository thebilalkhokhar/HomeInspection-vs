export type ServiceData = {
  slug: string;
  title: string;
  tagline: string;
  heroImage: string;
  overviewHeading: string;
  overviewBody: string[];
  overviewImage: string;
  categories: {
    title: string;
    items: { name: string; description: string }[];
  }[];
  steps: { title: string; description: string }[];
  statValue: string;
  statLabel: string;
  statNote: string;
  related: { slug: string; title: string; image: string }[];
};

export const services: Record<string, ServiceData> = {
  "standard-home-inspection": {
    slug: "standard-home-inspection",
    title: "Standard Home Inspection",
    tagline:
      "A thorough top-to-bottom evaluation of every major system and component — delivered in a clear, photo-rich report.",
    heroImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80",
    overviewHeading: "Everything covered. Nothing missed.",
    overviewBody: [
      "Our standard home inspection is a comprehensive evaluation of the property's visible and accessible systems and components — from the roof and attic to the foundation and crawl space.",
      "Every finding is documented with photos and written in plain language so buyers, sellers, and agents can quickly understand the condition of the property and prioritize next steps.",
      "We deliver your report within 24 hours so your transaction timeline stays on track.",
    ],
    overviewImage:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    categories: [
      {
        title: "Structural",
        items: [
          { name: "Foundation", description: "Visible cracks, settlement, moisture intrusion, and structural integrity." },
          { name: "Roof Structure", description: "Rafters, trusses, sheathing, and signs of damage or sagging." },
          { name: "Walls & Framing", description: "Interior and exterior wall conditions, signs of movement or deterioration." },
          { name: "Attic", description: "Insulation levels, ventilation, moisture, and structural framing." },
        ],
      },
      {
        title: "Systems",
        items: [
          { name: "HVAC", description: "Heating and cooling equipment, ductwork, filters, and overall performance." },
          { name: "Electrical", description: "Panel, wiring, outlets, switches, and safety compliance." },
          { name: "Plumbing", description: "Supply and drain lines, water heater, fixtures, and visible leaks." },
          { name: "Water Heater", description: "Age, condition, TPR valve, venting, and connections." },
        ],
      },
      {
        title: "Interior & Exterior",
        items: [
          { name: "Roof Covering", description: "Shingles, flashing, gutters, downspouts, and drainage." },
          { name: "Windows & Doors", description: "Operation, sealing, glazing condition, and weatherstripping." },
          { name: "Siding & Cladding", description: "Exterior finish condition, caulking, and signs of moisture damage." },
          { name: "Garage", description: "Door operation, fire separation, structure, and electrical." },
        ],
      },
    ],
    steps: [
      { title: "Book Online", description: "Schedule your inspection in minutes through our online booking form." },
      { title: "On-Site Inspection", description: "A licensed inspector evaluates all accessible systems and components." },
      { title: "Detailed Report", description: "Receive a photo-rich digital report within 24 hours of the inspection." },
      { title: "Follow-Up Support", description: "We're available to answer questions and clarify findings after delivery." },
    ],
    statValue: "90%",
    statLabel: "of homes have at least one defect",
    statNote:
      "According to ASHI, 9 in 10 homes inspected have at least one issue requiring attention. A thorough inspection puts those findings on paper before closing.",
    related: [
      { slug: "radon-testing", title: "Radon Testing", image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80" },
      { slug: "mold-air-quality", title: "Mold / Air Quality", image: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&w=800&q=80" },
      { slug: "termite-wdo-inspection", title: "Termite / WDO", image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80" },
    ],
  },

  "radon-testing": {
    slug: "radon-testing",
    title: "Radon Testing",
    tagline:
      "Radon is the second leading cause of lung cancer in the US. Our certified testing process gives you accurate results and clear next steps.",
    heroImage:
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1920&q=80",
    overviewHeading: "Invisible. Odorless. Dangerous.",
    overviewBody: [
      "Radon is a naturally occurring radioactive gas that forms from the decay of uranium in soil and rock. It can seep into homes through foundation cracks, gaps around pipes, and construction joints — accumulating to dangerous levels without any visible signs.",
      "The EPA recommends taking action if radon levels reach 4 pCi/L or higher. Our certified testing process measures your home's radon concentration accurately so you know exactly where you stand.",
      "Results are delivered with a clear explanation of your levels and practical mitigation recommendations if needed.",
    ],
    overviewImage:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
    categories: [
      {
        title: "Testing Process",
        items: [
          { name: "Continuous Monitoring", description: "Electronic continuous radon monitors provide hourly readings for the most accurate results." },
          { name: "Short-Term Testing", description: "48–96 hour test period following EPA-approved closed-house conditions." },
          { name: "Lowest Level Testing", description: "Testing focuses on the lowest livable area of the home where radon concentrates most." },
          { name: "Tamper Detection", description: "Monitors detect any interference that could compromise the accuracy of results." },
        ],
      },
      {
        title: "Reporting & Recommendations",
        items: [
          { name: "Clear Results", description: "Radon levels reported in pCi/L with EPA action-level context clearly explained." },
          { name: "Mitigation Guidance", description: "If levels exceed 4 pCi/L, we outline recommended mitigation system options." },
          { name: "Re-Test Advice", description: "Guidance on when and how to re-test after mitigation is installed." },
          { name: "Documentation", description: "Full report suitable for real estate transactions and lender requirements." },
        ],
      },
    ],
    steps: [
      { title: "Schedule Testing", description: "Book your radon test alongside your home inspection or as a standalone service." },
      { title: "Device Placement", description: "A certified monitor is placed in the lowest livable level under closed-house conditions." },
      { title: "48-Hour Test", description: "The monitor collects continuous readings over a minimum 48-hour period." },
      { title: "Results & Report", description: "Receive your radon report with levels, context, and mitigation recommendations if needed." },
    ],
    statValue: "1 in 15",
    statLabel: "US homes has elevated radon levels",
    statNote:
      "The EPA estimates that 1 in 15 homes in the US has radon levels at or above the action level of 4 pCi/L. Testing is the only way to know.",
    related: [
      { slug: "standard-home-inspection", title: "Standard Home Inspection", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80" },
      { slug: "mold-air-quality", title: "Mold / Air Quality", image: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&w=800&q=80" },
      { slug: "termite-wdo-inspection", title: "Termite / WDO", image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80" },
    ],
  },

  "mold-air-quality": {
    slug: "mold-air-quality",
    title: "Mold / Air Quality",
    tagline:
      "Hidden mold and poor air quality affect the health of your family and the value of your home. We find it before it becomes a bigger problem.",
    heroImage:
      "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&w=1920&q=80",
    overviewHeading: "What you can't see can still hurt you.",
    overviewBody: [
      "Mold thrives in damp, poorly ventilated areas — behind walls, under flooring, in attics and crawl spaces. By the time it's visible, the problem is often already significant. Our inspection targets the moisture sources and conditions that allow mold to grow.",
      "We conduct a thorough visual inspection combined with targeted air and surface sampling where warranted. Findings are documented and contextualized so you understand the scope and urgency.",
      "Our report identifies problem areas, likely causes, and recommended next steps — giving you the information you need to act before the problem escalates.",
    ],
    overviewImage:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    categories: [
      {
        title: "Inspection Areas",
        items: [
          { name: "Bathrooms & Kitchens", description: "High-humidity areas prone to moisture accumulation and mold growth." },
          { name: "Attic & Crawl Space", description: "Poor ventilation and condensation create ideal mold conditions." },
          { name: "Basement & Foundation", description: "Water intrusion and humidity levels assessed for mold risk." },
          { name: "HVAC & Ductwork", description: "Air handling systems can spread mold spores throughout the home." },
        ],
      },
      {
        title: "Testing & Analysis",
        items: [
          { name: "Visual Inspection", description: "Thorough assessment of visible mold growth, staining, and moisture damage." },
          { name: "Moisture Readings", description: "Non-invasive moisture meters used to identify hidden moisture problems." },
          { name: "Air Sampling", description: "Targeted air quality samples sent to certified laboratory for analysis." },
          { name: "Surface Sampling", description: "Tape lift or swab samples taken from suspected mold areas." },
        ],
      },
    ],
    steps: [
      { title: "Initial Assessment", description: "Visual inspection of all accessible areas with focus on moisture-prone zones." },
      { title: "Moisture Mapping", description: "Non-invasive moisture readings taken throughout to identify hidden problem areas." },
      { title: "Targeted Sampling", description: "Air and surface samples collected where mold presence is suspected." },
      { title: "Lab Report & Guidance", description: "Results delivered with lab analysis, context, and remediation recommendations." },
    ],
    statValue: "$3,000+",
    statLabel: "average mold remediation cost",
    statNote:
      "Early detection dramatically reduces remediation costs. Catching mold before it spreads can mean the difference between a minor fix and a major renovation.",
    related: [
      { slug: "standard-home-inspection", title: "Standard Home Inspection", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80" },
      { slug: "radon-testing", title: "Radon Testing", image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80" },
      { slug: "termite-wdo-inspection", title: "Termite / WDO", image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80" },
    ],
  },

  "termite-wdo-inspection": {
    slug: "termite-wdo-inspection",
    title: "Termite / WDO Inspection",
    tagline:
      "Wood-destroying organisms cause billions in structural damage every year. Our WDO inspection identifies infestations and risk areas before they cost you.",
    heroImage:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1920&q=80",
    overviewHeading: "Structural damage you can't afford to miss.",
    overviewBody: [
      "Termites, carpenter ants, wood-boring beetles, and wood-decaying fungi are collectively known as wood-destroying organisms (WDO). They can compromise the structural integrity of a home while leaving minimal visible evidence — until the damage is severe.",
      "Our licensed WDO inspector examines all accessible structural wood, sill plates, framing, and wood-to-soil contact areas for evidence of active infestation, past damage, and high-risk conditions.",
      "The WDO report is accepted by most lenders and real estate transactions and includes findings, conditions observed, and recommended treatment or repair actions.",
    ],
    overviewImage:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
    categories: [
      {
        title: "Organisms Inspected",
        items: [
          { name: "Subterranean Termites", description: "The most destructive termite species — identified by mud tubes, frass, and damaged wood." },
          { name: "Drywood Termites", description: "Live inside wood without soil contact — detected by pellet droppings and galleries." },
          { name: "Carpenter Ants", description: "Excavate wood to nest — identified by smooth galleries and sawdust-like frass." },
          { name: "Wood-Decaying Fungi", description: "Moisture-driven rot that weakens structural wood, often found in crawl spaces." },
        ],
      },
      {
        title: "Inspection Areas",
        items: [
          { name: "Foundation & Sill Plates", description: "Primary entry points for subterranean termites and areas prone to wood-to-soil contact." },
          { name: "Crawl Space & Basement", description: "Accessible structural wood evaluated for infestation, damage, and conducive conditions." },
          { name: "Attic Framing", description: "Roof framing and sheathing inspected for drywood termites and wood-boring insects." },
          { name: "Exterior Wood", description: "Decks, fences, window frames, and exterior trim assessed for WDO activity." },
        ],
      },
    ],
    steps: [
      { title: "Schedule Inspection", description: "Book your WDO inspection standalone or bundled with a standard home inspection." },
      { title: "Full Property Walkthrough", description: "Licensed inspector examines all accessible wood structures inside and outside." },
      { title: "Evidence Documentation", description: "Active infestations, prior damage, and conducive conditions photographed and recorded." },
      { title: "Official WDO Report", description: "State-compliant report delivered within 24 hours, accepted by lenders and agents." },
    ],
    statValue: "$5B",
    statLabel: "in termite damage annually in the US",
    statNote:
      "The NPMA estimates US homeowners spend over $5 billion on termite damage and control each year. Most homeowner insurance policies do not cover termite damage.",
    related: [
      { slug: "standard-home-inspection", title: "Standard Home Inspection", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80" },
      { slug: "radon-testing", title: "Radon Testing", image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80" },
      { slug: "mold-air-quality", title: "Mold / Air Quality", image: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&w=800&q=80" },
    ],
  },
};
