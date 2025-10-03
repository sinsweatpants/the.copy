import React, { useState } from 'react';
import { ArrowLeft, FileText, Eye, Edit3 } from 'lucide-react';

interface InstructionsPageProps {
  onBack: () => void;
}

export default function InstructionsPage({ onBack }: InstructionsPageProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const instructionFiles = [
    'adaptive_rewriting_instructions.ts',
    'analysis_instructions.ts',
    'audience_resonance_instructions.ts',
    'character_deep_analyzer_instructions.ts',
    'character_network_instructions.ts',
    'character_voice_instructions.ts',
    'completion_instructions.ts',
    'conflict_dynamics_instructions.ts',
    'creative_instructions.ts',
    'cultural_historical_analyzer_instructions.ts',
    'dialogue_advanced_analyzer_instructions.ts',
    'dialogue_forensics_instructions.ts',
    'integrated_instructions.ts',
    'literary_quality_analyzer_instructions.ts',
    'platform_adapter_instructions.ts',
    'plot_predictor_instructions.ts',
    'producibility_analyzer_instructions.ts',
    'prompts.ts',
    'recommendations_generator_instructions.ts',
    'rhythm_mapping_instructions.ts',
    'scene_generator_instructions.ts',
    'style_fingerprint_instructions.ts',
    'target_audience_analyzer_instructions.ts',
    'tension_optimizer_instructions.ts',
    'thematic_mining_instructions.ts',
    'themes_messages_analyzer_instructions.ts',
    'visual_cinematic_analyzer_instructions.ts',
    'world_builder_instructions.ts'
  ];

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

        <h1 className="text-3xl font-bold text-gray-900 mb-8">تعليمات وكلاء الذكاء الاصطناعي</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">ملفات التعليمات</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {instructionFiles.map((file) => (
                  <button
                    key={file}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-right p-3 rounded-lg transition-colors ${
                      selectedFile === file
                        ? 'bg-blue-100 text-blue-800'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm">{file.replace('.ts', '').replace(/_/g, ' ')}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              {selectedFile ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{selectedFile}</h3>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Eye className="w-4 h-4" />
                        عرض
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        <Edit3 className="w-4 h-4" />
                        تحرير
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-600">
                    <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>سيتم عرض محتوى الملف هنا</p>
                    <p className="text-sm mt-2">اختر "عرض" لقراءة التعليمات أو "تحرير" لتعديلها</p>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">اختر ملف تعليمات</h3>
                  <p>اختر ملف من القائمة لعرض أو تحرير التعليمات</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}