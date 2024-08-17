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
    }
  | {
      error: string;
    };

export const getCannyBoards = async (apiKey: string): Promise<CannyBoard[]> => {
  const response = await fetch('https://canny.io/api/v1/boards/list', {
    method: 'POST',
    body: JSON.stringify({ apiKey }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const payload = (await response.json()) as GetCannyBoardsResponse;

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  return payload.boards;
};
