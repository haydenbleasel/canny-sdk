export type CannyStatusChange = {
  changeComment: {
    imageURLs: string[];
    value: string;
  };
  changer: {
    id: string;
    created: string;
    email: string | null;
    isAdmin: boolean;
    name: string;
    url: string;
    userID: string;
  };
  created: string;
  id: string;
  post: {
    id: string;
    author: {
      id: string;
      created: string;
      email: string | null;
      isAdmin: boolean;
      name: string;
      url: string;
      userID: string;
    };
    board: {
      created: string;
      id: string;
      name: string;
      postCount: number;
      url: string;
    };
    category: {
      id: string;
      name: string;
      postCount: number;
      url: string;
    };
    changeComment: {
      value: string;
      imageURLs: string[];
    };
    commentCount: number;
    created: string;
    details: string;
    eta: string;
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
    statusChangedAt: string;
    tags: {
      id: string;
      name: string;
      postCount: number;
      url: string;
    }[];
    title: string;
    url: string;
  };
  status: string;
};

export type GetCannyStatusChangesResponse =
  | {
      error: string;
    }
  | {
      statusChanges: CannyStatusChange[];
      hasMore: boolean;
    };

export const fetchCannyStatusChanges = async (
  apiKey: string,
  offset = 0
): Promise<CannyStatusChange[]> => {
  const limit = 10_000;
  const response = await fetch('https://canny.io/api/v1/status_changes/list', {
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

  const payload = (await response.json()) as GetCannyStatusChangesResponse;

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  if (payload.hasMore) {
    const nextPayload = await fetchCannyStatusChanges(apiKey, offset + 1);

    return [...payload.statusChanges, ...nextPayload];
  }

  return payload.statusChanges;
};

export const getCannyStatusChanges = async (
  apiKey: string
): Promise<CannyStatusChange[]> => fetchCannyStatusChanges(apiKey);
