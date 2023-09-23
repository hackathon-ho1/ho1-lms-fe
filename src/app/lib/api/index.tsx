const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type RequestOptions = Partial<RequestInit> & {
  endpoint: string;
};

const apiRequest = async (options: RequestOptions) => {
  const { endpoint, ...rest } = options;
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  const mergedOptions: RequestInit = {
    ...rest,
    headers: {
      ...defaultHeaders,
      ...rest.headers,
    },
  };
  const response = await fetch(`${BASE_URL}${endpoint}`, mergedOptions);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'API request failed');
  }
  return await response.json();
};

export const getGotgamList = async (month: string) => {
  return apiRequest({ endpoint: `/api/gotgam?month=${month}`, method: 'GET' });
};

export const getGotgamDetail = async (date: string) => {
  return apiRequest({ endpoint: `/api/gotgam/${date}`, method: 'GET' });
};

export const getCourseDetail = async (courseId: number) => {
  return apiRequest({ endpoint: `/api/course/${courseId}?userId=1`, method: 'GET' });
};

export const getCourseList = async (cursor: number) => {
  return apiRequest({ endpoint: `/api/course?userId=1&cursor=${cursor}&limit=20`, method: 'GET' });
};

export const submitPractice = async (lectureId: number) => {
  return apiRequest({ endpoint: `/api/course/lecture/${lectureId}?userId=1`, method: 'POST' });
};
