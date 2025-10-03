import React from 'react';
import { LayoutTemplate, ArrowRight } from 'lucide-react';

interface TemplatesPageProps {
  onBack: () => void;
}

export default function TemplatesPage({ onBack }: TemplatesPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <LayoutTemplate className="w-24 h-24 text-purple-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">القوالب</h1>
          <p className="text-xl text-gray-600 mb-8">
            مكتبة القوالب الجاهزة قيد التطوير
          </p>
          <div className="bg-purple-50 rounded-lg p-6 mb-8">
            <p className="text-gray-700 mb-2">الوظائف القادمة:</p>
            <ul className="text-right text-gray-600 space-y-2">
              <li>• قوالب سيناريوهات جاهزة</li>
              <li>• قوالب حسب النوع (دراما، كوميديا، حركة)</li>
              <li>• إنشاء قوالب مخصصة</li>
              <li>• استيراد قوالب من المجتمع</li>
            </ul>
          </div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            <ArrowRight className="w-5 h-5" />
            العودة للصفحة الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}
