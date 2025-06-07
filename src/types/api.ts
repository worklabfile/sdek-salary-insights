// Базовые типы данных
export interface Vacancy {
  id: string;
  position: string;
  company: string;
  salary: number;
  salaryType: 'gross' | 'net' | 'from' | 'to';
  city: string;
  region: string;
  sourceUrl: string;
  benefits?: string[];
  employmentType: 'full-time' | 'part-time' | 'contract';
  experience?: string;
  schedule?: string;
  createdAt: string;
  updatedAt: string;
  // Дополнительные поля для курьеров
  pointsCount?: number;
  fuel?: boolean;
  parking?: boolean;
  // Дополнительные поля для склада
  shiftType?: 'day' | 'night' | 'rotating';
  warehouseSize?: string;
}

export interface AnalyticsData {
  median: number;
  q1: number;
  q3: number;
  average: number;
  count: number;
  trend: number;
  recommendations: string[];
  distribution: {
    byCity: Array<{
      city: string;
      count: number;
      median: number;
    }>;
    byPosition: Array<{
      position: string;
      count: number;
      median: number;
    }>;
  };
  trends: Array<{
    date: string;
    marketMedian: number;
    cdekSalary: number;
  }>;
}

export interface ComparisonData {
  position: string;
  city: string;
  marketMedian: number;
  cdekSalary: number;
  difference: number;
  percentDiff: number;
  marketQ1: number;
  marketQ3: number;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: TemplateField[];
  isCustom: boolean;
}

export interface TemplateField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'checkbox';
  required: boolean;
  options?: string[];
}

// Типы для запросов
export interface FilterOptions {
  city?: string;
  position?: string;
  dateFrom?: string;
  dateTo?: string;
  salaryFrom?: number;
  salaryTo?: number;
  employmentType?: string;
  experience?: string;
}

// Типы для ответов API
export interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    pageSize: number;
  };
  error?: {
    code: string;
    message: string;
  };
}

// Типы для статистики
export interface StatisticsData {
  today: {
    added: number;
    updated: number;
    deleted: number;
  };
  week: {
    added: number;
    updated: number;
    deleted: number;
  };
  user: {
    added: number;
    updated: number;
    deleted: number;
  };
} 