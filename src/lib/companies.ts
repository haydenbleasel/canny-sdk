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

export const updateCannyCompany = async (
  apiKey: string,
  props: {
    id: string;
    created?: Date;
    customFields?: Record<string, number | boolean | string>;
    monthlySpend?: number;
    name?: string;
  }
): Promise<CannyCompany> => {
  const payload = await ky
    .post('https://canny.io/api/v1/companies/update', {
      json: {
        apiKey,
        ...props,
        created: props.created?.toISOString(),
      },
    })
    .json<CannyCompany | { error: string }>();

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  return payload;
};

export const deleteCannyCompany = async (
  apiKey: string,
  props: {
    id: string;
  }
): Promise<{ success: boolean }> => {
  const payload = await ky
    .post('https://canny.io/api/v1/companies/delete', {
      json: {
        apiKey,
        companyID: props.id,
      },
    })
    .json<{ success: boolean } | { error: string }>();

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  return payload;
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
    .json<
      | {
          companies: CannyCompany[];
          hasMore: boolean;
        }
      | {
          error: string;
        }
    >();

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
