import ky from 'ky';

export type CannyComment = {
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
  created: string;
  imageURLs: string[];
  internal: boolean;
  likeCount: number;
  mentions: unknown[];
  parentID: string;
  post: {
    category: {
      id: string;
      name: string;
      postCount: number;
      url: string;
    };
    commentCount: number;
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
  };
  private: boolean;
  reactions: {
    like: number;
  };
  value: string;
};

export type GetCannyCommentsResponse =
  | {
      comments: CannyComment[];
      hasMore: boolean;
    }
  | {
      error: string;
    };

export const fetchCannyComments = async (
  apiKey: string,
  offset = 0,
  limit = 10_000
): Promise<CannyComment[]> => {
  const payload = await ky
    .post('https://canny.io/api/v1/comments/list', {
      json: {
        apiKey,
        limit,
        skip: offset * limit,
      },
    })
    .json<GetCannyCommentsResponse>();

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  const comments = payload.comments;

  if (payload.hasMore) {
    const nextComments = await fetchCannyComments(apiKey, offset + 1, limit);
    return [...comments, ...nextComments];
  }

  return comments;
};

export const getCannyComments = async (
  apiKey: string,
  limit?: number
): Promise<CannyComment[]> => fetchCannyComments(apiKey, 0, limit);
