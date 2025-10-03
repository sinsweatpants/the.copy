# نظام تعليمات الوكلاء (Agent Instructions System)

## نظرة عامة

تم ترحيل نظام تعليمات الوكلاء من ملفات TypeScript إلى ملفات JSON منفصلة لتحسين الأداء وسهولة الصيانة.

## البنية الجديدة

### ملفات التعليمات
```
public/instructions/
├── analysis.json
├── creative.json
├── character-analyzer.json
├── dialogue-forensics.json
├── style-fingerprint.json
├── platform-adapter.json
├── adaptive-rewriting.json
├── integrated.json
├── thematic-mining.json
├── world-builder.json
├── tension-optimizer.json
├── audience-resonance.json
├── character-deep-analyzer.json
├── dialogue-advanced-analyzer.json
├── visual-cinematic-analyzer.json
├── themes-messages-analyzer.json
├── cultural-historical-analyzer.json
├── producibility-analyzer.json
├── target-audience-analyzer.json
├── literary-quality-analyzer.json
├── recommendations-generator.json
├── character-network.json
├── character-voice.json
├── conflict-dynamics.json
└── plot-predictor.json
```

### خدمات النظام
```
src/services/
├── instructions-loader.ts      # محمل التعليمات الأساسي
├── agent-instructions.ts      # خدمة إدارة التعليمات
└── test-instructions-system.ts # نظام اختبار التعليمات
```

## تنسيق ملف التعليمات

كل ملف JSON يحتوي على البنية التالية:

```json
{
  "systemPrompt": "التعليمات الأساسية للوكيل",
  "instructions": [
    "تعليمة 1",
    "تعليمة 2",
    "تعليمة 3"
  ],
  "outputFormat": {
    "field1": "وصف الحقل الأول",
    "field2": "وصف الحقل الثاني"
  },
  "examples": [
    {
      "input": "مثال على المدخل",
      "output": "مثال على المخرج"
    }
  ]
}
```

## الاستخدام

### تحميل تعليمات وكيل

```typescript
import { agentInstructions } from './services/agent-instructions';

// تحميل تعليمات وكيل محدد
const instructions = await agentInstructions.getInstructions('analysis');

// تحميل آمن مع معالجة الأخطاء
const safeInstructions = await agentInstructions.safeGetInstructions('creative');
```

### التحميل المسبق

```typescript
// تحميل مسبق لوكلاء متعددة
await agentInstructions.preloadAgents(['analysis', 'creative', 'character-analyzer']);
```

### إدارة التخزين المؤقت

```typescript
// الحصول على حالة التخزين المؤقت
const status = agentInstructions.getCacheStatus();
console.log('الوكلاء المحملون:', status.cached);

// مسح التخزين المؤقت
agentInstructions.clearCache();
```

## الاختبار

### تشغيل الاختبار الشامل

```typescript
import { quickTest } from './services/test-instructions-system';

// اختبار سريع لجميع الوكلاء
await quickTest();
```

### اختبار وكيل محدد

```typescript
import { instructionsTester } from './services/test-instructions-system';

// اختبار وكيل واحد
const isValid = await instructionsTester.testSingleAgent('analysis');
```

## المزايا الجديدة

### 1. الأداء المحسن
- تحميل ديناميكي للتعليمات حسب الحاجة
- تخزين مؤقت ذكي لتجنب التحميل المتكرر
- تحميل متوازي للوكلاء المتعددة

### 2. سهولة الصيانة
- ملفات JSON منفصلة لكل وكيل
- إمكانية تحديث التعليمات دون إعادة تجميع
- بنية واضحة ومنظمة

### 3. معالجة الأخطاء
- تعليمات احتياطية في حالة فشل التحميل
- تسجيل مفصل للأخطاء
- اختبارات شاملة للتحقق من سلامة النظام

### 4. المرونة
- إمكانية إضافة وكلاء جديدة بسهولة
- تحديث التعليمات في الوقت الفعلي
- دعم للتحميل الشرطي

## إرشادات التطوير

### إضافة وكيل جديد

1. إنشاء ملف JSON في `public/instructions/`
2. تحديث قائمة `EXPECTED_AGENTS` في ملف الاختبار
3. تشغيل الاختبارات للتأكد من صحة التكوين

### تحديث تعليمات موجودة

1. تعديل ملف JSON المقابل
2. تشغيل اختبار الوكيل المحدد
3. مسح التخزين المؤقت إذا لزم الأمر

### استكشاف الأخطاء

```typescript
// التحقق من توفر وكيل
const isAvailable = await agentInstructions.isAgentAvailable('agent-id');

// الحصول على قائمة الوكلاء المتاحين
const availableAgents = agentInstructions.getAvailableAgents();
```

## الترحيل من النظام القديم

تم ترحيل جميع تكوينات الوكلاء من ملفات TypeScript إلى ملفات JSON. الوكلاء الموجودة تحتاج إلى:

1. تحديث خاصية `id` لتتطابق مع اسم ملف JSON
2. إضافة `modelConfig` بدلاً من التكوين المنفصل
3. تحديث البنية لتتطابق مع `AIAgentConfig`

## الحالة الحالية

✅ **مكتمل:**
- جميع ملفات JSON موجودة ومكتملة
- خدمة تحميل التعليمات تعمل بشكل صحيح
- نظام التخزين المؤقت فعال
- اختبارات شاملة متوفرة

⚠️ **يحتاج مراجعة:**
- بعض ملفات الوكلاء قد تحتاج تحديث للتطابق مع النظام الجديد
- التأكد من تطابق المعرفات بين ملفات TypeScript و JSON

🔄 **التحسينات المستقبلية:**
- إضافة تحديث تلقائي للتعليمات
- دعم للتعليمات متعددة اللغات
- واجهة إدارة التعليمات