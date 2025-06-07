import axios from 'axios';
import { 
  Vacancy, 
  AnalyticsData, 
  ComparisonData, 
  Template, 
  FilterOptions, 
  ApiResponse,
  StatisticsData 
} from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Здесь можно добавить глобальную обработку ошибок
    return Promise.reject(error);
  }
);

export const apiService = {
  // Вакансии
  getVacancies: async (filters?: FilterOptions): Promise<ApiResponse<Vacancy[]>> => {
    const response = await api.get('/vacancies', { params: filters });
    return response.data;
  },

  createVacancy: async (vacancy: Omit<Vacancy, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Vacancy>> => {
    const response = await api.post('/vacancies', vacancy);
    return response.data;
  },

  updateVacancy: async (id: string, vacancy: Partial<Vacancy>): Promise<ApiResponse<Vacancy>> => {
    const response = await api.put(`/vacancies/${id}`, vacancy);
    return response.data;
  },

  deleteVacancy: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/vacancies/${id}`);
    return response.data;
  },

  // Аналитика
  getAnalytics: async (filters?: FilterOptions): Promise<ApiResponse<AnalyticsData>> => {
    const response = await api.get('/analytics', { params: filters });
    return response.data;
  },

  // Сравнение зарплат
  getSalaryComparison: async (filters?: FilterOptions): Promise<ApiResponse<ComparisonData[]>> => {
    const response = await api.get('/analytics/comparison', { params: filters });
    return response.data;
  },

  // Шаблоны
  getTemplates: async (): Promise<ApiResponse<Template[]>> => {
    const response = await api.get('/templates');
    return response.data;
  },

  createTemplate: async (template: Omit<Template, 'id'>): Promise<ApiResponse<Template>> => {
    const response = await api.post('/templates', template);
    return response.data;
  },

  updateTemplate: async (id: string, template: Partial<Template>): Promise<ApiResponse<Template>> => {
    const response = await api.put(`/templates/${id}`, template);
    return response.data;
  },

  deleteTemplate: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/templates/${id}`);
    return response.data;
  },

  // Статистика
  getStatistics: async (): Promise<ApiResponse<StatisticsData>> => {
    const response = await api.get('/statistics');
    return response.data;
  }
}; 