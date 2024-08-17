import ky from 'ky';

export type CannyVote = {
  id: string;
  board: {
    created: string;
    id: string;
    name: string;
    postCount: number;
    url: string;
  };
  by: unknown;
  created: string;
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
  voter: {
    id: string;
    created: string;
    email: string | null;
    isAdmin: boolean;
    name: string;
    url: string;
    userID: string;
  };
  zendeskTicket: {
    url: string;
    id: number;
    created: string;
    subject: string;
    description: string;
  };
};

export type GetCannyVotesResponse =
  | {
      error: string;
    }
  | {
      votes: CannyVote[];
      hasMore: boolean;
    };

export const fetchCannyVotes = async (
  apiKey: string,
  offset = 0,
  limit = 10_000
): Promise<CannyVote[]> => {
  const payload = await ky
    .post('https://canny.io/api/v1/votes/list', {
      json: {
        apiKey,
        limit,
        skip: offset * limit,
      },
    })
    .json<GetCannyVotesResponse>();

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  const votes = payload.votes;

  if (payload.hasMore) {
    const nextVotes = await fetchCannyVotes(apiKey, offset + 1, limit);
    return [...votes, ...nextVotes];
  }

  return votes;
};

export const getCannyVotes = async (
  apiKey: string,
  limit?: number
): Promise<CannyVote[]> => fetchCannyVotes(apiKey, 0, limit);
