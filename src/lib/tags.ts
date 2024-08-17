import ky from 'ky';

export type CannyTag = {
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
  postCount: number;
  url: string;
};

export type GetCannyTagsResponse =
  | {
      error: string;
    }
  | {
      tags: CannyTag[];
      hasMore: boolean;
    };

export const fetchCannyTags = async (
  apiKey: string,
  offset = 0,
  limit = 10_000
): Promise<CannyTag[]> => {
  const payload = await ky
    .post('https://canny.io/api/v1/tags/list', {
      json: {
        apiKey,
        limit,
        skip: offset * limit,
      },
    })
    .json<GetCannyTagsResponse>();

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  const tags = payload.tags;

  if (payload.hasMore) {
    const nextTags = await fetchCannyTags(apiKey, offset + 1, limit);
    return [...tags, ...nextTags];
  }

  return tags;
};

export const getCannyTags = async (
  apiKey: string,
  limit?: number
): Promise<CannyTag[]> => fetchCannyTags(apiKey, 0, limit);
