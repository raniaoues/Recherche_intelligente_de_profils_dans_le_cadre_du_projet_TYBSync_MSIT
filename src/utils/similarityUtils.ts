
import { Employee } from "@/types/employee";

/**
 * Calculate similarity score between search query and employee profile
 * @param query Search query
 * @param employee Employee profile
 * @returns Similarity score between 0 and 1
 */
export const calculateSimilarity = (query: string, employee: Employee): number => {
  const queryLower = query.toLowerCase();
  const queryTerms = queryLower.split(/\s+/).filter(term => term.length > 2);
  
  if (queryTerms.length === 0) return 0;
  
  let matchCount = 0;
  let totalWeight = 0;
  
  // Check matches in name (weight: 2)
  const nameWeight = 2;
  totalWeight += nameWeight;
  const nameLower = employee.nom.toLowerCase();
  if (nameLower.includes(queryLower)) {
    matchCount += nameWeight;
  } else {
    for (const term of queryTerms) {
      if (nameLower.includes(term)) {
        matchCount += nameWeight / queryTerms.length;
      }
    }
  }
  
  // Check matches in tags (weight: 3)
  const tagsWeight = 3;
  totalWeight += tagsWeight;
  const tagMatches = employee.tags.filter(tag => {
    const tagLower = tag.toLowerCase();
    if (tagLower.includes(queryLower)) return true;
    
    for (const term of queryTerms) {
      if (tagLower.includes(term)) return true;
    }
    return false;
  }).length;
  
  matchCount += (tagMatches / employee.tags.length) * tagsWeight;
  
  // Check matches in bio (weight: 2)
  const bioWeight = 2;
  totalWeight += bioWeight;
  const bioLower = employee.bio.toLowerCase();
  let bioMatchCount = 0;
  
  for (const term of queryTerms) {
    if (bioLower.includes(term)) {
      bioMatchCount++;
    }
  }
  
  matchCount += (bioMatchCount / queryTerms.length) * bioWeight;
  
  // Normalize score between 0 and 1
  return matchCount / totalWeight;
};

/**
 * Highlight matching terms in text
 * @param text Original text
 * @param query Search query
 * @returns HTML string with highlighted matches
 */
export const highlightMatches = (text: string, query: string): string => {
  const queryTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 2);
  if (queryTerms.length === 0) return text;
  
  let highlightedText = text;
  
  // Case-insensitive regexp to match all query terms
  const regexPattern = queryTerms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`(${regexPattern})`, 'gi');
  
  // Replace matches with highlighted span
  highlightedText = highlightedText.replace(regex, '<span class="bg-yellow-100 font-medium">$1</span>');
  
  return highlightedText;
};
