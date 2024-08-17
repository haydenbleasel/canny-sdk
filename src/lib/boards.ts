import ky from 'ky';

export type CannyBoard = {
  id: string;
  created: string;
  isPrivate: boolean;
  name: string;
  postCount: number;
  privateComments: boolean;
  token: string;
  url: string;
};

export type GetCannyBoardsResponse =
  | {
      boards: CannyBoard[];
      hasMore: boolean;
    }
  | {
      error: string;
    };

export const fetchCannyBoards = async (
  apiKey: string,
  offset = 0
): Promise<CannyBoard[]> => {
  const limit = 10_000;
  const payload = await ky
    .post('https://canny.io/api/v1/boards/list', {
      json: {
        apiKey,
        limit,
        skip: offset * limit,
      },
    })
    .json<GetCannyBoardsResponse>();

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  if (payload.hasMore) {
    const nextPayload = await fetchCannyBoards(apiKey, offset + 1);
    return [...payload.boards, ...nextPayload];
  }

  return payload.boards;
};

export const getCannyBoards = async (apiKey: string): Promise<CannyBoard[]> =>
  fetchCannyBoards(apiKey);
