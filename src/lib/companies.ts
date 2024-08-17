import ky from 'ky';

export type CannyCompany = {
  id: string;
  created: string;
  customFields: {
    number: number;
    bool: boolean;
    string: string;
  };
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
  offset = 0
): Promise<CannyCompany[]> => {
  const limit = 10_000;
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

  if (payload.hasMore) {
    const nextPayload = await fetchCannyCompanies(apiKey, offset + 1);

    return [...payload.companies, ...nextPayload];
  }

  return payload.companies;
};

export const getCannyCompanies = async (
  apiKey: string
): Promise<CannyCompany[]> => fetchCannyCompanies(apiKey);
