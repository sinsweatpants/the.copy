import React from 'react';
import { Film, Sparkles, FileText, Bot, FolderOpen, LayoutTemplate, Download, Settings } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <Film className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">محرر السيناريو العربي</h1>
          <p className="text-xl text-gray-600">منصة متكاملة لكتابة وتحليل السيناريوهات العربية</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button
            onClick={() => onNavigate('basic-editor')}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow group"
          >
            <FileText className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">المحرر الأساسي</h3>
            <p className="text-gray-600">محرر بسيط وسريع لكتابة السيناريوهات</p>
          </button>

          <button
            onClick={() => onNavigate('advanced-editor')}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow group"
          >
            <Sparkles className="w-12 h-12 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">المحرر المتقدم</h3>
            <p className="text-gray-600">محرر متقدم مع أدوات التحليل والذكاء الاصطناعي</p>
          </button>

          <button
            onClick={() => onNavigate('instructions')}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow group"
          >
            <FileText className="w-12 h-12 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">تعليمات الوكلاء</h3>
            <p className="text-gray-600">إدارة وتخصيص تعليمات وكلاء الذكاء الاصطناعي</p>
          </button>

          <button
            onClick={() => onNavigate('agents')}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow group"
          >
            <Bot className="w-12 h-12 text-orange-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">وظائف الوكلاء</h3>
            <p className="text-gray-600">استخدام وكلاء الذكاء الاصطناعي للتحليل والإنشاء</p>
          </button>

          <button
            onClick={() => onNavigate('projects')}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow group"
          >
            <FolderOpen className="w-12 h-12 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">المشاريع</h3>
            <p className="text-gray-600">إدارة وتنظيم مشاريع السيناريو</p>
          </button>

          <button
            onClick={() => onNavigate('templates')}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow group"
          >
            <LayoutTemplate className="w-12 h-12 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">القوالب</h3>
            <p className="text-gray-600">قوالب جاهزة للسيناريوهات</p>
          </button>

          <button
            onClick={() => onNavigate('export')}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow group"
          >
            <Download className="w-12 h-12 text-green-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">التصدير</h3>
            <p className="text-gray-600">تصدير بصيغ مختلفة ومشاركة</p>
          </button>

          <button
            onClick={() => onNavigate('settings')}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow group"
          >
            <Settings className="w-12 h-12 text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">الإعدادات</h3>
            <p className="text-gray-600">تخصيص وإعدادات التطبيق</p>
          </button>
        </div>
      </div>
    </div>
  );
}