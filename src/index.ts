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
import {
  deleteCannyCompany,
  getCannyCompanies,
  updateCannyCompany,
} from './lib/companies';
import { getCannyOpportunities } from './lib/opportunities';
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

  board = {
    list: async () => {
      return await getCannyBoards(this.apiKey);
    },
    get: async (props: Parameters<typeof getCannyBoard>[1]) => {
      return await getCannyBoard(this.apiKey, props);
    },
  };

  category = {
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

  changelog = {
    list: async (limit?: number) => {
      return await getCannyChangelogs(this.apiKey, limit);
    },
    create: async (props: Parameters<typeof createCannyChangelog>[1]) => {
      return await createCannyChangelog(this.apiKey, props);
    },
  };

  comment = {
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

  company = {
    list: async (limit?: number) => {
      return await getCannyCompanies(this.apiKey, limit);
    },
    update: async (props: Parameters<typeof updateCannyCompany>[1]) => {
      return await updateCannyCompany(this.apiKey, props);
    },
    delete: async (props: Parameters<typeof deleteCannyCompany>[1]) => {
      return await deleteCannyCompany(this.apiKey, props);
    },
  };

  opportunity = {
    list: async (limit?: number) => {
      return await getCannyOpportunities(this.apiKey, limit);
    },
  };

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
