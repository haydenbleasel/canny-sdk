import { getCannyBoard, getCannyBoards } from './lib/boards';
import {
  createCannyCategory,
  deleteCannyCategory,
  getCannyCategories,
  getCannyCategory,
} from './lib/categories';
import { createCannyChangelog, getCannyChangelogs } from './lib/changelog';
import {
  createCannyComment,
  deleteCannyComment,
  getCannyComment,
  getCannyComments,
} from './lib/comments';
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
    get: async (props: Parameters<typeof getCannyBoard>[1]) => {
      return await getCannyBoard(this.apiKey, props);
    },
  };

  categories = {
    list: async (limit?: number) => {
      return await getCannyCategories(this.apiKey, limit);
    },
    get: async (props: Parameters<typeof getCannyCategory>[1]) => {
      return await getCannyCategory(this.apiKey, props);
    },
    create: async (props: Parameters<typeof createCannyCategory>[1]) => {
      return await createCannyCategory(this.apiKey, props);
    },
    delete: async (props: Parameters<typeof deleteCannyCategory>[1]) => {
      return await deleteCannyCategory(this.apiKey, props);
    },
  };

  changelogs = {
    list: async (limit?: number) => {
      return await getCannyChangelogs(this.apiKey, limit);
    },
    create: async (props: Parameters<typeof createCannyChangelog>[1]) => {
      return await createCannyChangelog(this.apiKey, props);
    },
  };

  comments = {
    list: async (limit?: number) => {
      return await getCannyComments(this.apiKey, limit);
    },
    get: async (props: Parameters<typeof getCannyComment>[1]) => {
      return await getCannyComment(this.apiKey, props);
    },
    create: async (props: Parameters<typeof createCannyComment>[1]) => {
      return await createCannyComment(this.apiKey, props);
    },
    delete: async (props: Parameters<typeof deleteCannyComment>[1]) => {
      return await deleteCannyComment(this.apiKey, props);
    },
  };

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
