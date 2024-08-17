# canny-sdk

[![Version](https://img.shields.io/npm/v/canny-sdk.svg)](https://www.npmjs.org/package/canny-sdk) [![Build Status](https://github.com/haydenbleasel/canny-sdk/actions/workflows/push.yml/badge.svg?branch=main)](https://github.com/haydenbleasel/canny-sdk/actions?query=branch%3Amain)

![canny-sdk](/sample.png)

A TypeScript SDK for interacting with the Canny API, powered by [ky](https://github.com/sindresorhus/ky).

## Requirements

- Node.js 18.x or later
- A Canny account

## Installation

You can install `canny-sdk` using any JavaScript package manager:

```bash
# npm
npm install canny-sdk

# yarn
yarn add canny-sdk

# pnpm
pnpm add canny-sdk

# bun
bun add canny-sdk
```

## Usage

To use `canny-sdk`, you will need to have a Canny account and generate an API key. You can generate an API key by logging into the Canny web interface and navigating to the "API" section of your account settings.

```ts
import { Canny } from 'canny-sdk';

const canny = new Canny('your-api-key');
```

Then, you can use the `canny` object to interact with the Canny API. The library is structured in a way that mirrors the Canny REST API, with methods for posts, comments, and more.

## Examples

### Boards

```ts
// List all boards
const boards = await canny.board.list();
console.log(boards);

// Get a specific board
const board = await canny.board.get({ id: 'board-id' });
console.log(board);
```

### Categories

```ts
// List all categories
const categories = await canny.category.list();
console.log(categories);

// Get a specific category
const category = await canny.category.get({ id: 'category-id' });
console.log(category);

// Create a new category
const newCategory = await canny.category.create({
  boardID: 'board-id',
  name: 'New Category'
});
console.log(newCategory);

// Delete a category
const deleteResult = await canny.category.delete({ id: 'category-id' });
console.log(deleteResult);
```

### Changelog

```ts
// List all changelogs
const changelogs = await canny.changelog.list();
console.log(changelogs);

// Create a new changelog
const newChangelog = await canny.changelog.create({
  title: 'New Feature Release',
  details: 'We have added exciting new features!',
  type: 'new',
  notify: true,
  published: true,
  publishedOn: new Date(),
  postIDs: ['post-id-1', 'post-id-2'],
  labelIDs: ['tag-id-1', 'tag-id-2']
});
console.log(newChangelog);
```

### Comments

```ts
// List all comments
const comments = await canny.comment.list();
console.log(comments);

// Get a specific comment
const comment = await canny.comment.get({ id: 'comment-id' });
console.log(comment);

// Create a new comment
const newComment = await canny.comment.create({
  postID: 'post-id',
  value: 'This is a new comment',
});
console.log(newComment);

// Delete a comment
await canny.comment.delete({ id: 'comment-id' });
console.log('Comment deleted successfully');
```

### Companies

```ts
// List all companies
const companies = await canny.company.list();
console.log(companies);

// Update a company
const updatedCompany = await canny.company.update({
  id: 'company-id',
  name: 'Updated Company Name',
  monthlySpend: 1000,
  customFields: {
    industry: 'Technology',
    size: 'Enterprise'
  }
});
console.log(updatedCompany);

// Delete a company
await canny.company.delete({ id: 'company-id' });
console.log('Company deleted successfully');
```

### Opportunities

```ts
// List all opportunities
const opportunities = await canny.opportunities.list();
console.log(opportunities);
```

### Posts

```ts
// List all posts
const posts = await canny.post.list();
console.log(posts);

// Get a specific post
const post = await canny.post.get({ id: 'post-id' });
console.log(post);

// Create a new post
const newPost = await canny.post.create({
  authorID: 'user-id',
  boardID: 'board-id',
  title: 'New Feature Request',
  details: 'This is a detailed description of the feature request.',
  categoryID: 'category-id',
  customFields: { priority: 'High' },
  eta: new Date('2023-12-31'),
  etaPublic: true,
  imageURLs: ['https://example.com/image.jpg'],
  createdAt: new Date()
});
console.log(newPost);

// Change post category
const updatedPostCategory = await canny.post.changeCategory({
  postID: 'post-id',
  categoryID: 'new-category-id'
});
console.log(updatedPostCategory);

// Change post status
const updatedPostStatus = await canny.post.changeStatus({
  changerID: 'admin-id',
  postID: 'post-id',
  shouldNotifyVoters: true,
  status: 'In Progress',
  commentValue: 'We have started working on this feature.',
  commentImageURLs: []
});
console.log(updatedPostStatus);

// Add tag to post
const postWithNewTag = await canny.post.tag.add({
  postID: 'post-id',
  tagID: 'tag-id'
});
console.log(postWithNewTag);

// Remove tag from post
const postWithRemovedTag = await canny.post.tag.delete({
  postID: 'post-id',
  tagID: 'tag-id'
});
console.log(postWithRemovedTag);

// Update a post
await canny.post.update({
  postID: 'post-id',
  title: 'Updated Feature Request',
  details: 'This is an updated description of the feature request.',
  customFields: { priority: 'Medium' },
  eta: new Date('2024-06-30'),
  etaPublic: false,
  imageURLs: ['https://example.com/updated-image.jpg']
});
console.log('Post updated successfully');
```

### Status Changes

```ts
// List status changes
const statusChanges = await canny.statusChange.list();
console.log(statusChanges);

// List status changes for a specific board
const statusChanges = await canny.statusChange.list({
  boardID: 'board-id'
});
console.log(statusChanges);
```

### Tags

```ts
// Retrieve a tag
const tag = await canny.tags.get({
  id: 'tag-id'
});
console.log(tag);

// Create a new tag
const newTag = await canny.tags.create({
  boardID: 'board-id',
  name: 'New Feature'
});
console.log(newTag);

// List all tags
const allTags = await canny.tags.list();
console.log(allTags);

// List tags with a limit
const limitedTags = await canny.tags.list(100);
console.log(limitedTags);
```

### Users

```ts
// Retrieve a user
const user = await canny.users.get({
  id: 'user-id'
});
console.log(user);

// Retrieve a user by email
const userByEmail = await canny.users.get({
  email: 'user@example.com'
});
console.log(userByEmail);

// Retrieve a user by userID
const userByUserID = await canny.users.get({
  userID: 'custom-user-id'
});
console.log(userByUserID);

// Upsert (create or update) a user
const upsertedUser = await canny.users.upsert({
  name: 'John Doe',
  email: 'john@example.com',
  userID: 'custom-user-id',
  avatarURL: 'https://example.com/avatar.jpg',
  companies: [
    {
      id: 'company-id',
      name: 'Acme Inc',
      monthlySpend: 1000,
      customFields: { role: 'Admin' }
    }
  ],
  created: new Date(),
  customFields: { department: 'Engineering' }
});
console.log(upsertedUser);

// Delete a user
await canny.users.delete({
  id: 'user-id'
});
console.log('User deleted successfully');

// Remove a user from a company
await canny.users.removeFromCompany({
  id: 'user-id',
  companyID: 'company-id'
});
console.log('User removed from company successfully');

// List all users
const allUsers = await canny.users.list();
console.log(allUsers);
```

### Votes

```ts
// Retrieve a vote by ID
const vote = await canny.votes.get({
  id: 'vote-id'
});
console.log(vote);

// Create a vote
const createdVote = await canny.votes.create({
  postID: 'post-id',
  voterID: 'voter-id',
  byID: 'optional-by-id'
});
console.log(createdVote);

// Delete a vote
await canny.votes.delete({
  postID: 'post-id',
  voterID: 'voter-id'
});
console.log('Vote deleted successfully');

// List all votes
const allVotes = await canny.votes.list();
console.log(allVotes);
```
