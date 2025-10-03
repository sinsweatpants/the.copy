import React, { useState } from 'react';
import { ArrowLeft, Bot, Play, Settings, BarChart3, Sparkles, FileText, Users } from 'lucide-react';

interface AgentsPageProps {
  onBack: () => void;
}

export default function AgentsPage({ onBack }: AgentsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('analysis');

  const agentCategories = {
    analysis: {
      title: 'وكلاء التحليل',
      icon: BarChart3,
      color: 'blue',
      agents: [
        'analysisAgent',
        'characterDeepAnalyzerAgent',
        'characterNetworkAgent',
        'characterVoiceAgent',
        'conflictDynamicsAgent',
        'culturalHistoricalAnalyzerAgent',
        'dialogueAdvancedAnalyzerAgent',
        'dialogueForensicsAgent',
        'literaryQualityAnalyzerAgent',
        'plotPredictorAgent',
        'producibilityAnalyzerAgent',
        'rhythmMappingAgent',
        'targetAudienceAnalyzerAgent',
        'thematicMiningAgent',
        'themesMessagesAnalyzerAgent',
        'visualCinematicAnalyzerAgent'
      ]
    },
    generation: {
      title: 'وكلاء الإنشاء',
      icon: Sparkles,
      color: 'green',
      agents: [
        'completionAgent',
        'creativeAgent',
        'recommendationsGeneratorAgent',
        'sceneGeneratorAgent',
        'worldBuilderAgent'
      ]
    },
    evaluation: {
      title: 'وكلاء التقييم',
      icon: FileText,
      color: 'purple',
      agents: [
        'audienceResonanceAgent',
        'tensionOptimizerAgent'
      ]
    },
    transformation: {
      title: 'وكلاء التحويل',
      icon: Users,
      color: 'orange',
      agents: [
        'adaptiveRewritingAgent',
        'platformAdapterAgent',
        'styleFingerprintAgent'
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            العودة للرئيسية
          </button>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">وكلاء الذكاء الاصطناعي</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">فئات الوكلاء</h2>
              <div className="space-y-2">
                {Object.entries(agentCategories).map(([key, category]) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`w-full text-right p-3 rounded-lg transition-colors ${
                        selectedCategory === key
                          ? `bg-${category.color}-100 text-${category.color}-800`
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-5 h-5" />
                        <span>{category.title}</span>
                        <span className="text-sm opacity-60">({category.agents.length})</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {agentCategories[selectedCategory as keyof typeof agentCategories].title}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agentCategories[selectedCategory as keyof typeof agentCategories].agents.map((agent) => (
                  <div key={agent} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Bot className="w-5 h-5 text-gray-600" />
                        <h4 className="font-semibold text-gray-900">
                          {agent.replace('Agent', '').replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      وصف مختصر لوظيفة هذا الوكيل سيتم إضافته لاحقاً
                    </p>
                    
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                        <Play className="w-3 h-3" />
                        تشغيل
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">
                        <Settings className="w-3 h-3" />
                        إعدادات
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}