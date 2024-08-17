export type CannyPost = {
  id: string;
  author: {
    id: string;
    created: string;
    email: string | null;
    isAdmin: boolean;
    name: string;
    url: string;
    userID: string;
  } | null;
  board: {
    created: string;
    id: string;
    name: string;
    postCount: number;
    url: string;
  };
  by: {
    id: string;
    created: string;
    email: string | null;
    isAdmin: boolean;
    name: string;
    url: string;
    userID: string;
  };
  category: {
    id: string;
    name: string;
    parentID: unknown;
    postCount: number;
    url: string;
  } | null;
  clickup: {
    linkedTasks: {
      id: string;
      linkID: string;
      name: string;
      postID: string;
      status: string;
      url: string;
    }[];
  };
  commentCount: number;
  created: string;
  customFields: {
    id: string;
    name: string;
    value: string;
  }[];
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
  mergeHistory: {
    created: string;
    post: {
      created: string;
      details: string;
      id: string;
      imageURLs: string[];
      title: string;
    };
  }[];
  owner: {
    id: string;
    created: string;
    email: string | null;
    isAdmin: boolean;
    name: string;
    url: string;
    userID: string;
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

export type GetCannyPostsResponse =
  | {
      error: string;
    }
  | {
      posts: CannyPost[];
      hasMore: boolean;
    };

export const fetchCannyPosts = async (
  apiKey: string,
  offset = 0
): Promise<CannyPost[]> => {
  const limit = 10_000;
  const response = await fetch('https://canny.io/api/v1/posts/list', {
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

  const payload = (await response.json()) as GetCannyPostsResponse;

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  if (payload.hasMore) {
    const nextPayload = await fetchCannyPosts(apiKey, offset + 1);

    return [...payload.posts, ...nextPayload];
  }

  return payload.posts;
};

export const getCannyPosts = async (apiKey: string): Promise<CannyPost[]> =>
  fetchCannyPosts(apiKey);
