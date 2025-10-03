import React from 'react';
import { FolderOpen, ArrowRight } from 'lucide-react';

interface ProjectsPageProps {
  onBack: () => void;
}

export default function ProjectsPage({ onBack }: ProjectsPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <FolderOpen className="w-24 h-24 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">المشاريع</h1>
          <p className="text-xl text-gray-600 mb-8">
            صفحة إدارة المشاريع قيد التطوير
          </p>
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <p className="text-gray-700 mb-2">الوظائف القادمة:</p>
            <ul className="text-right text-gray-600 space-y-2">
              <li>• إنشاء مشاريع جديدة</li>
              <li>• حفظ وإدارة المسودات</li>
              <li>• تنظيم السيناريوهات في مجلدات</li>
              <li>• مشاركة المشاريع مع الفريق</li>
            </ul>
          </div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <ArrowRight className="w-5 h-5" />
            العودة للصفحة الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}
