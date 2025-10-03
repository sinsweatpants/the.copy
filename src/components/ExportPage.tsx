import React from 'react';
import { Download, ArrowRight } from 'lucide-react';

interface ExportPageProps {
  onBack: () => void;
}

export default function ExportPage({ onBack }: ExportPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <Download className="w-24 h-24 text-green-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">التصدير</h1>
          <p className="text-xl text-gray-600 mb-8">
            أدوات التصدير والمشاركة قيد التطوير
          </p>
          <div className="bg-green-50 rounded-lg p-6 mb-8">
            <p className="text-gray-700 mb-2">الوظائف القادمة:</p>
            <ul className="text-right text-gray-600 space-y-2">
              <li>• تصدير بصيغة PDF</li>
              <li>• تصدير بصيغة Word (DOCX)</li>
              <li>• تصدير بصيغة Final Draft</li>
              <li>• تصدير كملف نصي مع التنسيق</li>
            </ul>
          </div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            <ArrowRight className="w-5 h-5" />
            العودة للصفحة الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}
