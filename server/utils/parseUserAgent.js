// Lightweight, dependency-free UA sniffing — good enough for informational
// display in enquiry emails. Not intended for feature detection.

const BROWSER_RULES = [
  { name: "Edge", pattern: /Edg(?:e|A|iOS)?\/([\d.]+)/i },
  { name: "Opera", pattern: /(?:OPR|Opera)\/([\d.]+)/i },
  { name: "Chrome", pattern: /Chrome\/([\d.]+)/i },
  { name: "Firefox", pattern: /Firefox\/([\d.]+)/i },
  { name: "Safari", pattern: /Version\/([\d.]+).*Safari/i },
  { name: "Internet Explorer", pattern: /(?:MSIE |Trident.*rv:)([\d.]+)/i },
];

const OS_RULES = [
  { name: "Windows 11/10", pattern: /Windows NT 10\.0/i },
  { name: "Windows 8.1", pattern: /Windows NT 6\.3/i },
  { name: "Windows 8", pattern: /Windows NT 6\.2/i },
  { name: "Windows 7", pattern: /Windows NT 6\.1/i },
  { name: "Windows", pattern: /Windows NT/i },
  { name: "iOS", pattern: /iPhone|iPad|iPod/i },
  { name: "macOS", pattern: /Mac OS X/i },
  { name: "Android", pattern: /Android ([\d.]+)/i },
  { name: "Linux", pattern: /Linux/i },
];

function matchFirst(ua, rules) {
  for (const rule of rules) {
    const match = ua.match(rule.pattern);
    if (match) {
      return match[1] ? `${rule.name} ${match[1]}` : rule.name;
    }
  }
  return "Unknown";
}

export function parseUserAgent(userAgent) {
  if (!userAgent || typeof userAgent !== "string") {
    return { browser: "Unknown", os: "Unknown" };
  }

  return {
    browser: matchFirst(userAgent, BROWSER_RULES),
    os: matchFirst(userAgent, OS_RULES),
  };
}
