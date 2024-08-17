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

export const getCannyCategory = async (
  apiKey: string,
  id: string
): Promise<CannyCategory> => {
  const payload = await ky
    .post('https://canny.io/api/v1/categories/retrieve', {
      json: {
        apiKey,
        id,
      },
    })
    .json<CannyCategory | { error: string }>();

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  return payload;
};

export const createCannyCategory = async (
  apiKey: string,
  boardId: string,
  name: string,
  parentId?: string,
  subscribeAdmins?: boolean
): Promise<{ id: string }> => {
  const payload = await ky
    .post('https://canny.io/api/v1/categories/create', {
      json: {
        apiKey,
        boardId,
        name,
        parentId,
        subscribeAdmins,
      },
    })
    .json<{ id: string } | { error: string }>();

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  return payload;
};

export const deleteCannyCategory = async (
  apiKey: string,
  id: string
): Promise<{ success: boolean }> => {
  const payload = await ky
    .post('https://canny.io/api/v1/categories/delete', {
      json: {
        apiKey,
        categoryID: id,
      },
    })
    .json<{ success: boolean } | { error: string }>();

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  return payload;
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
    .json<
      | {
          categories: CannyCategory[];
          hasMore: boolean;
        }
      | {
          error: string;
        }
    >();

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
