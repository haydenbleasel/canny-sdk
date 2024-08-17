import ky from 'ky';

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
  const payload = await ky
    .post('https://canny.io/api/v1/entries/list', {
      json: {
        apiKey,
        limit,
        skip: offset * limit,
      },
    })
    .json<GetCannyChangelogsResponse>();

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
