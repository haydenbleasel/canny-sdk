import ky from 'ky';

export type CannyUser = {
  id: string;
  avatarURL: string | null;
  companies: {
    created: string;
    customFields: Record<string, string>;
    id: string;
    monthlySpend: number;
    name: string;
  }[];
  created: string;
  customFields: Record<string, string>;
  email: string | null;
  isAdmin: boolean;
  lastActivity: string;
  name: string;
  url: string;
  userID: string | null;
};

export type GetCannyUsersResponse = CannyUser[] | { error: string };

export const fetchCannyUsers = async (
  apiKey: string,
  offset = 0,
  limit = 100
): Promise<CannyUser[]> => {
  const payload = await ky
    .post('https://canny.io/api/v1/users/list', {
      json: {
        apiKey,
        limit,
        skip: offset * limit,
      },
    })
    .json<GetCannyUsersResponse>();

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  if (payload.length === limit) {
    const nextPayload = await fetchCannyUsers(apiKey, offset + 1, limit);
    return [...payload, ...nextPayload];
  }

  return payload;
};

export const getCannyUsers = async (
  apiKey: string,
  limit?: number
): Promise<CannyUser[]> => fetchCannyUsers(apiKey, 0, limit);
