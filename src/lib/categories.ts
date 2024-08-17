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
  offset = 0,
  limit = 10_000
): Promise<CannyCategory[]> => {
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

  const categories = payload.categories;

  if (payload.hasMore) {
    const nextCategories = await fetchCannyCategories(
      apiKey,
      offset + 1,
      limit
    );
    return [...categories, ...nextCategories];
  }

  return categories;
};

export const getCannyCategories = async (
  apiKey: string,
  limit?: number
): Promise<CannyCategory[]> => fetchCannyCategories(apiKey, 0, limit);
