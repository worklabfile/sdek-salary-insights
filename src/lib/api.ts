
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Types for API data
export interface VacancyData {
  id?: string;
  position: string;
  company: string;
  salary: number;
  salaryType: 'gross' | 'net';
  city: string;
  region: string;
  source: string;
  url?: string;
  benefits?: string[];
  employmentType: 'full-time' | 'part-time' | 'contract';
  experience: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AnalyticsData {
  median: number;
  q1: number;
  q3: number;
  average: number;
  count: number;
  trend: number;
  recommendations: string[];
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

export interface TemplateData {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: {
    name: string;
    type: 'text' | 'number' | 'select' | 'checkbox' | 'textarea';
    required: boolean;
    options?: string[];
  }[];
}

export interface FilterOptions {
  cities?: string[];
  positions?: string[];
  companies?: string[];
  salaryRange?: [number, number];
  dateRange?: [Date, Date];
  employmentTypes?: string[];
  sources?: string[];
}

// Mock API functions (replace with real API calls)
const mockDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockApiCall = async <T>(data: T): Promise<T> => {
  await mockDelay(Math.random() * 1000 + 500);
  return data;
};

// API Services
export const apiService = {
  // Vacancies
  getVacancies: async (filters?: FilterOptions): Promise<VacancyData[]> => {
    console.log('Fetching vacancies with filters:', filters);
    const mockData: VacancyData[] = [
      {
        id: '1',
        position: 'Курьер',
        company: 'ООО "Конкурент 1"',
        salary: 110000,
        salaryType: 'gross',
        city: 'Иркутск',
        region: 'Иркутская область',
        source: 'hh.ru',
        url: 'https://hh.ru/vacancy/123',
        benefits: ['ДМС', 'Корпоративный транспорт'],
        employmentType: 'full-time',
        experience: '1-3 года',
        createdAt: new Date(),
      },
      {
        id: '2',
        position: 'Курьер',
        company: 'ООО "Конкурент 2"',
        salary: 105000,
        salaryType: 'gross',
        city: 'Иркутск',
        region: 'Иркутская область',
        source: 'superjob.ru',
        employmentType: 'full-time',
        experience: 'Без опыта',
        createdAt: new Date(),
      }
    ];
    return mockApiCall(mockData);
  },

  createVacancy: async (vacancy: Omit<VacancyData, 'id' | 'createdAt' | 'updatedAt'>): Promise<VacancyData> => {
    console.log('Creating vacancy:', vacancy);
    const newVacancy: VacancyData = {
      ...vacancy,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return mockApiCall(newVacancy);
  },

  updateVacancy: async (id: string, vacancy: Partial<VacancyData>): Promise<VacancyData> => {
    console.log('Updating vacancy:', id, vacancy);
    const updatedVacancy: VacancyData = {
      id,
      position: 'Updated Position',
      company: 'Updated Company',
      salary: 120000,
      salaryType: 'gross',
      city: 'Иркутск',
      region: 'Иркутская область',
      source: 'manual',
      employmentType: 'full-time',
      experience: '1-3 года',
      ...vacancy,
      updatedAt: new Date(),
    };
    return mockApiCall(updatedVacancy);
  },

  deleteVacancy: async (id: string): Promise<void> => {
    console.log('Deleting vacancy:', id);
    return mockApiCall(undefined);
  },

  // Analytics
  getAnalytics: async (filters?: FilterOptions): Promise<AnalyticsData> => {
    console.log('Fetching analytics with filters:', filters);
    const mockData: AnalyticsData = {
      median: 109971,
      q1: 95000,
      q3: 125000,
      average: 110500,
      count: 156,
      trend: 3.2,
      recommendations: [
        'Увеличить ЗП на 3,177 ₽ для достижения медианы рынка',
        'Рассмотреть дополнительные бенефиты для конкурентности',
      ],
    };
    return mockApiCall(mockData);
  },

  // Comparison
  getSalaryComparison: async (filters?: FilterOptions): Promise<ComparisonData[]> => {
    console.log('Fetching salary comparison with filters:', filters);
    const mockData: ComparisonData[] = [
      {
        position: 'Курьер',
        city: 'Иркутск',
        marketMedian: 109971,
        cdekSalary: 106794,
        difference: -3177,
        percentDiff: -2.9,
        marketQ1: 95000,
        marketQ3: 125000,
      },
      {
        position: 'Кладовщик',
        city: 'Иркутск',
        marketMedian: 95500,
        cdekSalary: 98000,
        difference: 2500,
        percentDiff: 2.6,
        marketQ1: 85000,
        marketQ3: 110000,
      },
    ];
    return mockApiCall(mockData);
  },

  // Templates
  getTemplates: async (): Promise<TemplateData[]> => {
    console.log('Fetching templates');
    const mockData: TemplateData[] = [
      {
        id: 'delivery-extended',
        name: 'Доставка расширенный',
        description: 'Подробная форма для курьеров и водителей',
        category: 'delivery',
        fields: [
          { name: 'position', type: 'text', required: true },
          { name: 'company', type: 'text', required: true },
          { name: 'salary', type: 'number', required: true },
          { name: 'gsm', type: 'checkbox', required: false },
          { name: 'pointsPerShift', type: 'number', required: false },
        ],
      },
      {
        id: 'warehouse-basic',
        name: 'Склад базовый',
        description: 'Базовая форма для складских работников',
        category: 'warehouse',
        fields: [
          { name: 'position', type: 'text', required: true },
          { name: 'company', type: 'text', required: true },
          { name: 'salary', type: 'number', required: true },
          { name: 'shift', type: 'select', required: false, options: ['День', 'Ночь', 'Сутки'] },
        ],
      },
    ];
    return mockApiCall(mockData);
  },

  // Parsing sources
  parseSource: async (url: string): Promise<VacancyData[]> => {
    console.log('Parsing source:', url);
    const mockData: VacancyData[] = [
      {
        id: 'parsed-1',
        position: 'Курьер',
        company: 'Parsed Company',
        salary: 108000,
        salaryType: 'gross',
        city: 'Иркутск',
        region: 'Иркутская область',
        source: url,
        employmentType: 'full-time',
        experience: '1-3 года',
      },
    ];
    return mockApiCall(mockData);
  },
};

// React Query Hooks
export const useVacancies = (filters?: FilterOptions) => {
  return useQuery({
    queryKey: ['vacancies', filters],
    queryFn: () => apiService.getVacancies(filters),
  });
};

export const useCreateVacancy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiService.createVacancy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      queryClient.invalidateQueries({ queryKey: ['comparison'] });
    },
  });
};

export const useUpdateVacancy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, vacancy }: { id: string; vacancy: Partial<VacancyData> }) =>
      apiService.updateVacancy(id, vacancy),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      queryClient.invalidateQueries({ queryKey: ['comparison'] });
    },
  });
};

export const useDeleteVacancy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiService.deleteVacancy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      queryClient.invalidateQueries({ queryKey: ['comparison'] });
    },
  });
};

export const useAnalytics = (filters?: FilterOptions) => {
  return useQuery({
    queryKey: ['analytics', filters],
    queryFn: () => apiService.getAnalytics(filters),
  });
};

export const useSalaryComparison = (filters?: FilterOptions) => {
  return useQuery({
    queryKey: ['comparison', filters],
    queryFn: () => apiService.getSalaryComparison(filters),
  });
};

export const useTemplates = () => {
  return useQuery({
    queryKey: ['templates'],
    queryFn: apiService.getTemplates,
  });
};

export const useParseSource = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiService.parseSource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
    },
  });
};
