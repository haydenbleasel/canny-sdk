export type CannyChangelog = {
  id: string;
  created: string;
  labels: {
    id: string;
    created: string;
    entryCount: number;
    name: string;
    url: string;
  }[];
  lastSaved: string;
  markdownDetails: string;
  plaintextDetails: string;
  posts: {
    category: {
      id: string;
      name: string;
      postCount: number;
      url: string;
    };
    commentCount: number;
    eta: string;
    id: string;
    imageURLs: string[];
    jira: {
      linkedIssues: {
        id: string;
        key: string;
        url: string;
      }[];
    };
    score: number;
    status: string;
    tags: {
      id: string;
      name: string;
      postCount: number;
      url: string;
    }[];
    title: string;
    url: string;
  }[];
  publishedAt: string;
  reactions: {
    like: number;
  };
  scheduledFor: string | null;
  status: 'draft' | 'published' | 'scheduled';
  title: string;
  types: ('fixed' | 'improved' | 'new')[];
  url: string;
};

export type GetCannyChangelogsResponse =
  | {
      entries: CannyChangelog[];
      hasMore: boolean;
    }
  | {
      error: string;
    };

export const fetchCannyChangelogs = async (
  apiKey: string,
  offset = 0
): Promise<CannyChangelog[]> => {
  const limit = 10_000;
  const response = await fetch('https://canny.io/api/v1/entries/list', {
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

  const payload = (await response.json()) as GetCannyChangelogsResponse;

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  if (payload.hasMore) {
    const nextPayload = await fetchCannyChangelogs(apiKey, offset + 1);

    return [...payload.entries, ...nextPayload];
  }

  return payload.entries;
};

export const getCannyChangelogs = async (
  apiKey: string
): Promise<CannyChangelog[]> => fetchCannyChangelogs(apiKey);
