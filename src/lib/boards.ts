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
    }
  | {
      error: string;
    };

export const getCannyBoards = async (apiKey: string): Promise<CannyBoard[]> => {
  const payload = await ky
    .post('https://canny.io/api/v1/boards/list', {
      json: { apiKey },
    })
    .json<GetCannyBoardsResponse>();

  if ('error' in payload) {
    throw new Error(payload.error);
  }

  return payload.boards;
};
