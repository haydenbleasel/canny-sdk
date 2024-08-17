import ky from 'ky';

export type CannyCategory = {
  id: string;
  board: {
    created: string;
    id: string;
    name: string;
    postCount: number;
    url: string;
  };
  created: string;
  name: string;
  parentID: string;
  postCount: number;
  url: string;
};

export type GetCannyCategoriesResponse =
  | {
      categories: CannyCategory[];
      hasMore: boolean;
    }
  | {
      error: string;
    };

export const fetchCannyCategories = async (
  apiKey: string,
  offset = 0
): Promise<CannyCategory[]> => {
  const limit = 10_000;
  const payload = await ky
    .post('https://canny.io/api/v1/categories/list', {
      json: {
        apiKey,
        limit,
        skip: offset * limit,
      },
    })
    .json<GetCannyCategoriesResponse>();

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  if (payload.hasMore) {
    const nextPayload = await fetchCannyCategories(apiKey, offset + 1);

    return [...payload.categories, ...nextPayload];
  }

  return payload.categories;
};

export const getCannyCategories = async (
  apiKey: string
): Promise<CannyCategory[]> => fetchCannyCategories(apiKey);
