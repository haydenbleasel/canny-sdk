import ky from 'ky';

export type CannyUser = {
  id: string;
  avatarURL: string | null;
  companies: {
    created: string;
    customFields: {
      field1: string;
      field2: string;
    };
    id: string;
    monthlySpend: number;
    name: string;
  }[];
  created: string;
  customFields: {
    field1: string;
    field2: string;
  };
  email: string | null;
  isAdmin: boolean;
  lastActivity: string;
  name: string;
  url: string;
  userID: string | null;
};

export type GetCannyUsersResponse =
  | CannyUser[]
  | {
      error: string;
    };

export const fetchCannyUsers = async (
  apiKey: string,
  offset = 0
): Promise<CannyUser[]> => {
  const limit = 100;
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
    const nextPayload = await fetchCannyUsers(apiKey, offset + 1);

    return [...payload, ...nextPayload];
  }

  return payload;
};

export const getCannyUsers = async (apiKey: string): Promise<CannyUser[]> =>
  fetchCannyUsers(apiKey);
