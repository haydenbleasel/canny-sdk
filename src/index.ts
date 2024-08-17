import { getCannyBoard, getCannyBoards } from './lib/boards';
import { getCannyCategories } from './lib/categories';
import { getCannyChangelogs } from './lib/changelog';
import { getCannyComments } from './lib/comments';
import { getCannyCompanies } from './lib/companies';
import { getCannyPosts } from './lib/posts';
import { getCannyStatusChanges } from './lib/status-change';
import { getCannyTags } from './lib/tags';
import { getCannyUsers } from './lib/users';
import { getCannyVotes } from './lib/votes';

export class Canny {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  boards = {
    list: async () => {
      return await getCannyBoards(this.apiKey);
    },
    get: async (boardId: string) => {
      return await getCannyBoard(this.apiKey, boardId);
    },
  };

  async categories() {
    return await getCannyCategories(this.apiKey);
  }

  async changelogs() {
    return await getCannyChangelogs(this.apiKey);
  }

  async comments() {
    return await getCannyComments(this.apiKey);
  }

  async companies() {
    return await getCannyCompanies(this.apiKey);
  }

  async posts() {
    return await getCannyPosts(this.apiKey);
  }

  async statusChanges() {
    return await getCannyStatusChanges(this.apiKey);
  }

  async tags() {
    return await getCannyTags(this.apiKey);
  }

  async users() {
    return await getCannyUsers(this.apiKey);
  }

  async votes() {
    return await getCannyVotes(this.apiKey);
  }
}
