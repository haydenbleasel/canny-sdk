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
  offset = 0
): Promise<CannyVote[]> => {
  const limit = 10_000;
  const response = await fetch('https://canny.io/api/v1/votes/list', {
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

  const payload = (await response.json()) as GetCannyVotesResponse;

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  if (payload.hasMore) {
    const nextPayload = await fetchCannyVotes(apiKey, offset + 1);

    return [...payload.votes, ...nextPayload];
  }

  return payload.votes;
};

export const getCannyVotes = async (apiKey: string): Promise<CannyVote[]> =>
  fetchCannyVotes(apiKey);
