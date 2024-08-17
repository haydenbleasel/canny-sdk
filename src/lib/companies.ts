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
  const response = await fetch('https://canny.io/api/v1/companies/list', {
    method: 'POST',
    body: JSON.stringify({
      apiKey,
      limit,
      skip: offset * limit,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: 0,
    },
  });

  const payload = (await response.json()) as GetCannyCompaniesResponse;

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
