import ky from 'ky';

export type CannyCompany = {
  id: string;
  created: string;
  customFields: Record<string, number | boolean | string>;
  domain: string;
  memberCount: number;
  monthlySpend: number;
  name: string;
};

export type GetCannyCompaniesResponse =
  | {
      companies: CannyCompany[];
      hasMore: boolean;
    }
  | {
      error: string;
    };

export const fetchCannyCompanies = async (
  apiKey: string,
  offset = 0,
  limit = 10_000
): Promise<CannyCompany[]> => {
  const payload = await ky
    .post('https://canny.io/api/v1/companies/list', {
      json: {
        apiKey,
        limit,
        skip: offset * limit,
      },
    })
    .json<GetCannyCompaniesResponse>();

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  const companies = payload.companies;

  if (payload.hasMore) {
    const nextCompanies = await fetchCannyCompanies(apiKey, offset + 1, limit);
    return [...companies, ...nextCompanies];
  }

  return companies;
};

export const getCannyCompanies = async (
  apiKey: string,
  limit?: number
): Promise<CannyCompany[]> => fetchCannyCompanies(apiKey, 0, limit);
