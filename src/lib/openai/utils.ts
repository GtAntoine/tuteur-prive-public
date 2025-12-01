import { AnalysisResult } from './types';

export function parseAnalysisResponse(result: string): AnalysisResult {
  const sections = result.split('\n\n');
  return {
    summary: sections[0]?.replace(/^Summary:/, '').trim(),
    questions: sections[1]?.split('\n').filter(q => q.trim()),
    feedback: sections[2]?.replace(/^Feedback:/, '').trim()
  };
}