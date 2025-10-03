import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import {
  X, Loader2, Brain, Microscope, Network, Target, Lightbulb, Wrench, Building,
  BookOpen, Eye, Palette, Scale, Trophy, Flag, Compass, Search, Play,
  MessageSquare, Users, BarChart3, Zap, Database, Globe
} from 'lucide-react';

import { AnalysisAgent } from '../../agents/analysis/analysisAgent';
import { CharacterDeepAnalyzerAgent } from '../../agents/analysis/characterDeepAnalyzerAgent';
import { environment } from '../../config/environment';
import { AGENT_CONFIGS } from '../../config/agentConfigs';
import type { ProcessedFile } from '../../agents/core/fileReaderService';
import type { AIAgentConfig } from '../../types/types';

/**
 * @interface Agent
 * @description Represents an agent with its properties.
 * @property {string} id - The unique identifier of the agent.
 * @property {string} name - The name of the agent.
 * @property {string} description - The description of the agent.
 * @property {string} category - The category of the agent.
 * @property {{ creativeGeneration: boolean; analyticalReasoning: boolean; emotionalIntelligence: boolean; [key: string]: any; }} capabilities - The capabilities of the agent.
 * @property {string} systemPrompt - The system prompt for the agent.
 */
interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  capabilities: {
    creativeGeneration: boolean;
    analyticalReasoning: boolean;
    emotionalIntelligence: boolean;
    [key: string]: boolean | string | number;
  };
  systemPrompt: string;
}

/**
 * @interface AgentResult
 * @description Represents the result of an agent's analysis.
 * @property {string} agentName - The name of the agent that produced the result.
 * @property {string} result - The result of the analysis.
 * @property {Date} timestamp - The timestamp of the analysis.
 */
interface AgentResult {
  agentName: string;
  result: string;
  timestamp: Date;
}

/**
 * @interface AdvancedAgentsPopupProps
 * @description Represents the props for the AdvancedAgentsPopup component.
 * @property {boolean} isOpen - Whether the popup is open or not.
 * @property {() => void} onClose - The function to call when the popup is closed.
 * @property {string} content - The content to be analyzed by the agents.
 */
interface AdvancedAgentsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
}

/**
 * @component AdvancedAgentsPopup
 * @description A popup component for advanced agent analysis of a screenplay.
 * @param {AdvancedAgentsPopupProps} props - The props for the component.
 * @returns {JSX.Element | null} - The rendered component or null if not open.
 */
const AdvancedAgentsPopup: React.FC<AdvancedAgentsPopupProps> = ({ isOpen, onClose, content }) => {
  const [activeTab, setActiveTab] = useState<'agents' | 'results'>('agents');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AgentResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [agentOutput, setAgentOutput] = useState('');

  const analysisAgent = new AnalysisAgent(environment.geminiApiKey);
  const characterDeepAnalyzerAgent = new CharacterDeepAnalyzerAgent(environment.geminiApiKey);
  
  // Initialize agents from configs
  const agents: Agent[] = AGENT_CONFIGS.map((config: AIAgentConfig) => ({
    id: config.id || 'unknown',
    name: config.name,
    description: config.description,
    category: typeof config.category === 'string' ? config.category : 'UNKNOWN',
    capabilities: (() => {
      if (!config.capabilities) {
        return { creativeGeneration: false, analyticalReasoning: false, emotionalIntelligence: false };
      }

      // Handle string array capabilities
      if (Array.isArray(config.capabilities)) {
        return {
          creativeGeneration: config.capabilities.includes('creativeGeneration'),
          analyticalReasoning: config.capabilities.includes('analyticalReasoning'),
          emotionalIntelligence: config.capabilities.includes('emotionalIntelligence'),
          ...Object.fromEntries(config.capabilities.map(cap => [cap, true]))
        };
      }

      // Handle object capabilities
      return {
        creativeGeneration: Boolean(config.capabilities.creativeGeneration),
        analyticalReasoning: Boolean(config.capabilities.analyticalReasoning),
        emotionalIntelligence: Boolean(config.capabilities.emotionalIntelligence),
        ...Object.fromEntries(
          Object.entries(config.capabilities).map(([key, value]) => [
            key,
            typeof value === 'boolean' ? value :
            typeof value === 'string' ? value :
            typeof value === 'number' ? value :
            String(value)
          ])
        )
      };
    })(),
    systemPrompt: config.systemPrompt || ''
  }));

  /**
   * @effect
   * @description Filters the agents based on the search term.
   */
  useEffect(() => {
    if (searchTerm) {
      const filtered = agents.filter(agent => 
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAgents(filtered);
    } else {
      setFilteredAgents(agents);
    }
  }, [searchTerm]);

  /**
   * @function runAgentAnalysis
   * @description Runs the analysis for a given agent.
   * @param {Agent} agent - The agent to run the analysis with.
   * @returns {Promise<void>} Resolves once the simulated analysis workflow is complete.
   */
  const runAgentAnalysis = async (agent: Agent) => {
    setSelectedAgent(agent);
    setIsAnalyzing(true);
    
    try {
      // Simulate API call to agent
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result based on agent type
      let result = '';
      switch(agent.id) {
        case 'analysis':
          result = `تحليل نقدى شامل للنص:
          
1. نقاط القوة:
   - بنية السرد قوية
   - تطور الشخصيات واضح
   - الحوار طبيعي ومباشر

2. نقاط التحسين:
   - الحاجة لتطوير الصراع الداخلي
   - تحسين التوقيت في بعض المشاهد
   - تعميق الخلفيات الشخصية`;
          break;
        case 'creative':
          result = `اقتراحات إبداعية:
          
1. مشهد إضافي:
   - إضافة مشهد تحول في منتصف النص لتعزيز التوتر
   
2. تطوير الشخصية:
   - إضافة خلفية معقدة لأحد الشخصيات الثانوية
   
3. تحسين الحوار:
   - مراجعة بعض العبارات لتكون أكثر طبيعية`;
          break;
        case 'character-deep-analyzer':
          result = `تحليل شخصيات عميق:
          
الشخصية الرئيسية:
- الدوافع: البحث عن الهوية والانتماء
- الصراعات الداخلية: الخوف من الفشل مقابل الرغبة في النجاح
- نقاط القوة: العزيمة والمثابرة
- نقاط الضعف: عدم الثقة بالنفس`;
          break;
        case 'scene-generator':
          result = `مشهد مقترح:
          
مشهد 15 - ليل - داخلي - غرفة المعيشة

(البيت هادئ، تسكنه أنفاس ثقيلة. أحمد جالس على الأريكة، يحدق في التلفاز.)

أحمد:
(بصوت منخفض)
لا أستطيع أن أصدق ما يحدث...

(يضع يده على وجهه بحيرة وحيدة)

أحمد:
(يهمس)
كيف وصلنا إلى هذا الحد؟`;
          break;
        default:
          result = `تحليل من وكيل ${agent.name}:
          
هذا تحليل تجريبي للنص المقدم. في تطبيق حقيقي، سيتم تكامل هذا مع الذكاء الاصطناعي المتقدم لتقديم نتائج مفصلة ودقيقة.`;
      }
      
      const newResult: AgentResult = {
        agentName: agent.name,
        result,
        timestamp: new Date()
      };
      
      setAnalysisResults(prev => [newResult, ...prev]);
      setActiveTab('results');
    } catch (error) {
      console.error('Agent analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  /**
   * @function getCategoryIcon
   * @description Gets the icon for a given category.
   * @param {string} category - The category to get the icon for.
   * @returns {JSX.Element} The icon component that visually represents the category.
   */
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'CORE': return <Brain className="w-5 h-5" />;
      case 'ANALYSIS': return <Microscope className="w-5 h-5" />;
      case 'CREATIVE': return <Lightbulb className="w-5 h-5" />;
      case 'PREDICTIVE': return <Compass className="w-5 h-5" />;
      case 'ADVANCED_MODULES': return <Zap className="w-5 h-5" />;
      default: return <Database className="w-5 h-5" />;
    }
  };

  /**
   * @function getCategoryColor
   * @description Gets the color for a given category.
   * @param {string} category - The category to get the color for.
   * @returns {string} The Tailwind color utility classes tied to the category palette.
   */
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'CORE': return 'bg-blue-100 text-blue-800';
      case 'ANALYSIS': return 'bg-purple-100 text-purple-800';
      case 'CREATIVE': return 'bg-green-100 text-green-800';
      case 'PREDICTIVE': return 'bg-yellow-100 text-yellow-800';
      case 'ADVANCED_MODULES': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAgentAnalysis = async () => {
    setIsAnalyzing(true);
    setAgentOutput('');
    try {
      const processedFile: ProcessedFile = {
        name: 'screenplay.txt',
        content: content,
        mimeType: 'text/plain',
        isBase64: false,
        size: content.length
      };
      const result = await analysisAgent.execute(
        [processedFile],
        '',
        ''
      );
      setAgentOutput(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error("Analysis failed:", error);
      setAgentOutput("An error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold flex items-center">
            <Brain className="mr-2" />
            الوكلاء المتقدمة لتحليل السيناريو
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Agent Test UI */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-2">Test Agent Integration</h3>
          <button
            onClick={handleAgentAnalysis}
            disabled={isAnalyzing}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400"
          >
            {isAnalyzing ? 'Analyzing...' : 'Run Analysis Agent'}
          </button>
          {agentOutput && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
              <h4 className="font-bold mb-2">Agent Output:</h4>
              <pre className="whitespace-pre-wrap text-sm">{agentOutput}</pre>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'agents' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 dark:text-gray-400'}`}
            onClick={() => setActiveTab('agents')}
          >
            <Wrench className="inline mr-2 w-4 h-4" />
            الوكلاء المتاحة
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'results' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 dark:text-gray-400'}`}
            onClick={() => setActiveTab('results')}
          >
            <BarChart3 className="inline mr-2 w-4 h-4" />
            نتائج التحليل
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Agents List */}
          {activeTab === 'agents' && (
            <div className="flex-1 flex flex-col">
              {/* Search */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="البحث عن وكيل..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Agents Grid */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredAgents.map((agent) => (
                    <div 
                      key={agent.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow dark:bg-gray-750"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold flex items-center">
                            {getCategoryIcon(agent.category)}
                            <span className="mr-2">{agent.name}</span>
                          </h3>
                          <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${getCategoryColor(agent.category)}`}>
                            {agent.category}
                          </span>
                        </div>
                        {agent.capabilities.creativeGeneration && (
                          <Lightbulb className="w-5 h-5 text-yellow-500" />
                        )}
                        {agent.capabilities.analyticalReasoning && (
                          <Microscope className="w-5 h-5 text-purple-500" />
                        )}
                      </div>
                      
                      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {agent.description}
                      </p>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {agent.capabilities.creativeGeneration && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">إبداعي</span>
                        )}
                        {agent.capabilities.analyticalReasoning && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">تحليلي</span>
                        )}
                        {agent.capabilities.emotionalIntelligence && (
                          <span className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-full">عاطفي</span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => runAgentAnalysis(agent)}
                        disabled={isAnalyzing && selectedAgent?.id === agent.id}
                        className={`mt-4 w-full py-2 px-4 rounded-lg flex items-center justify-center ${
                          isAnalyzing && selectedAgent?.id === agent.id
                            ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        {isAnalyzing && selectedAgent?.id === agent.id ? (
                          <>
                            <Loader2 className="animate-spin ml-2 w-4 h-4" />
                            جاري التحليل...
                          </>
                        ) : (
                          <>
                            <Play className="ml-2 w-4 h-4" />
                            تشغيل التحليل
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {activeTab === 'results' && (
            <div className="flex-1 flex flex-col">
              {analysisResults.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <BarChart3 className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
                    لم يتم إجراء أي تحليل بعد
                  </h3>
                  <p className="text-gray-400 dark:text-gray-500">
                    اختر وكيلًا من القائمة وقم بتشغيل التحليل لرؤية النتائج هنا
                  </p>
                  <button
                    onClick={() => setActiveTab('agents')}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    الذهاب إلى الوكلاء
                  </button>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {analysisResults.map((result, index) => (
                      <div 
                        key={index} 
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 dark:bg-gray-750"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-bold flex items-center">
                            <Brain className="mr-2 w-4 h-4" />
                            {result.agentName}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {result.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="mt-2 bg-gray-50 dark:bg-gray-700 p-3 rounded whitespace-pre-line text-sm">
                          {result.result}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {filteredAgents.length} وكيل متاح
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAgentsPopup;