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
  offset = 0
): Promise<CannyTag[]> => {
  const limit = 10_000;
  const response = await fetch('https://canny.io/api/v1/tags/list', {
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

  const payload = (await response.json()) as GetCannyTagsResponse;

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  if (payload.hasMore) {
    const nextPayload = await fetchCannyTags(apiKey, offset + 1);

    return [...payload.tags, ...nextPayload];
  }

  return payload.tags;
};

export const getCannyTags = async (apiKey: string): Promise<CannyTag[]> =>
  fetchCannyTags(apiKey);
