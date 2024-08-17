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
  const response = await fetch('https://canny.io/api/v1/categories/list', {
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

  const payload = (await response.json()) as GetCannyCategoriesResponse;

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
