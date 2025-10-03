/**
 * اختبار نظام تحميل التعليمات
 * يتحقق من أن جميع ملفات JSON موجودة ويمكن تحميلها بنجاح
 */

import { agentInstructions } from './agent-instructions';

// قائمة الوكلاء المتوقعة
const EXPECTED_AGENTS = [
  'analysis',
  'creative',
  'character-analyzer',
  'dialogue-forensics',
  'style-fingerprint',
  'platform-adapter',
  'adaptive-rewriting',
  'integrated',
  'thematic-mining',
  'world-builder',
  'tension-optimizer',
  'audience-resonance',
  'character-deep-analyzer',
  'dialogue-advanced-analyzer',
  'visual-cinematic-analyzer',
  'themes-messages-analyzer',
  'cultural-historical-analyzer',
  'producibility-analyzer',
  'target-audience-analyzer',
  'literary-quality-analyzer',
  'recommendations-generator',
  'character-network',
  'character-voice',
  'conflict-dynamics',
  'plot-predictor'
];

export class InstructionsSystemTester {
  
  /**
   * اختبار شامل لنظام التعليمات
   */
  async runFullTest(): Promise<TestResults> {
    
    const results: TestResults = {
      totalAgents: EXPECTED_AGENTS.length,
      successfulLoads: 0,
      failedLoads: 0,
      errors: [],
      loadedAgents: [],
      missingAgents: []
    };

    // اختبار تحميل كل وكيل
    for (const agentId of EXPECTED_AGENTS) {
      try {
        const instructions = await agentInstructions.getInstructions(agentId);
        
        if (this.validateInstructions(instructions, agentId)) {
          results.successfulLoads++;
          results.loadedAgents.push(agentId);
        } else {
          results.failedLoads++;
          results.errors.push(`تعليمات غير صالحة للوكيل: ${agentId}`);
        }
      } catch (error) {
        results.failedLoads++;
        results.missingAgents.push(agentId);
        results.errors.push(`فشل تحميل ${agentId}: ${error}`);
      }
    }

    // اختبار حالة التخزين المؤقت
    const cacheStatus = agentInstructions.getCacheStatus();

    return results;
  }

  /**
   * التحقق من صحة تعليمات الوكيل
   */
  private validateInstructions(instructions: any, agentId: string): boolean {
    if (!instructions) return false;
    
    // التحقق من الحقول الأساسية
    if (!instructions.systemPrompt || typeof instructions.systemPrompt !== 'string') {
      return false;
    }

    if (!instructions.instructions || !Array.isArray(instructions.instructions)) {
      return false;
    }

    return true;
  }

  /**
   * اختبار سريع لوكيل واحد
   */
  async testSingleAgent(agentId: string): Promise<boolean> {
    try {
      const instructions = await agentInstructions.getInstructions(agentId);
      return this.validateInstructions(instructions, agentId);
    } catch {
      return false;
    }
  }

  /**
   * طباعة تقرير مفصل
   */
  printReport(results: TestResults): void {
    
    if (results.missingAgents.length > 0) {
    }
    
    if (results.errors.length > 0) {
    }
    
  }
}

export interface TestResults {
  totalAgents: number;
  successfulLoads: number;
  failedLoads: number;
  errors: string[];
  loadedAgents: string[];
  missingAgents: string[];
}

// تصدير مثيل للاختبار
export const instructionsTester = new InstructionsSystemTester();

// دالة مساعدة للاختبار السريع
export async function quickTest(): Promise<void> {
  const tester = new InstructionsSystemTester();
  const results = await tester.runFullTest();
  tester.printReport(results);
}