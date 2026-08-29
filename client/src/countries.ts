/** Sovereign corridor data — intentionally isolated from NodalMap.tsx so
 *  route chunks that only need the country list (Pipeline, Corridor, Visions,
 *  Countries) don't pull the 129KB world-map SVG chunk. */

export interface CountryNode {
    id: string;
    iso: string;
    cx: number;
    cy: number;
    status: "active" | "pipeline";
    region: string;
    projects: number;
    capital: string;
    capitalAr: string;
}

export const COUNTRIES: CountryNode[] = [
    { id: "The Gambia", iso: "gm", cx: 366.72, cy: 497.01, status: "active", region: "West Africa", projects: 4, capital: "Banjul", capitalAr: "بانجول" },
    { id: "Sierra Leone", iso: "sl", cx: 372.80, cy: 509.79, status: "active", region: "West Africa", projects: 6, capital: "Freetown", capitalAr: "فريتاون" },
    { id: "Côte d'Ivoire", iso: "ci", cx: 388.48, cy: 521.56, status: "active", region: "West Africa", projects: 8, capital: "Yamoussoukro", capitalAr: "ياموسوكرو" },
    { id: "Burkina Faso", iso: "bf", cx: 404.49, cy: 493.50, status: "active", region: "West Africa", projects: 5, capital: "Ouagadougou", capitalAr: "واغادوغو" },
    { id: "Ghana", iso: "gh", cx: 399.09, cy: 513.18, status: "active", region: "West Africa", projects: 12, capital: "Accra", capitalAr: "أكرا" },
    { id: "Angola", iso: "ao", cx: 437.37, cy: 547.46, status: "pipeline", region: "Central Africa", projects: 3, capital: "Luanda", capitalAr: "لواندا" },
    { id: "Sudan", iso: "sd", cx: 466.14, cy: 505.04, status: "active", region: "North/East Africa", projects: 7, capital: "Khartoum", capitalAr: "الخرطوم" },
    { id: "Egypt", iso: "eg", cx: 466.16, cy: 449.22, status: "active", region: "North Africa", projects: 14, capital: "Cairo", capitalAr: "القاهرة" },
    { id: "Jordan", iso: "jo", cx: 484.50, cy: 433.00, status: "active", region: "Middle East", projects: 9, capital: "Amman", capitalAr: "عمان" },
    { id: "Syria", iso: "sy", cx: 487.55, cy: 422.18, status: "active", region: "Middle East", projects: 4, capital: "Damascus", capitalAr: "دمشق" },
    { id: "Saudi Arabia", iso: "sa", cx: 519.81, cy: 458.02, status: "active", region: "Middle East", projects: 16, capital: "Riyadh", capitalAr: "الرياض" }
];
