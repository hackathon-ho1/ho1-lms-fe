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
    throw new Error('API request failed');
  }
  const data = await response.json();
  return data;
};

export const getGotgamList = async (month: number) => {
  return apiRequest({ endpoint: `/api/gotgom?=${month}` });
};

// // POST 예시
// export const createGotgam = async (data: any) => {
//     return apiRequest({
//       endpoint: '/v1/gotgam',
//       method: 'POST',
//       body: JSON.stringify(data),
//     });
//   };
