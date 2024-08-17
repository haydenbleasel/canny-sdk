import ky from 'ky';

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
  offset = 0,
  limit = 10_000
): Promise<CannyPost[]> => {
  const payload = await ky
    .post('https://canny.io/api/v1/posts/list', {
      json: {
        apiKey,
        limit,
        skip: offset * limit,
      },
    })
    .json<GetCannyPostsResponse>();

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  const posts = payload.posts;

  if (payload.hasMore) {
    const nextPosts = await fetchCannyPosts(apiKey, offset + 1, limit);
    return [...posts, ...nextPosts];
  }

  return posts;
};

export const getCannyPosts = async (
  apiKey: string,
  limit?: number
): Promise<CannyPost[]> => fetchCannyPosts(apiKey, 0, limit);
