import dotenv from 'dotenv';
import { Canny } from '../src/index';

dotenv.config();

const apiKey = process.env.CANNY_API_KEY;

if (!apiKey) {
  throw new Error('CANNY_API_KEY is not set in the environment variables');
}

const canny = new Canny(apiKey);

async function runTests() {
  try {
    // Test Board functions
    console.log('Testing Board functions...');
    const boards = await canny.board.list();
    console.log('Boards:', boards);

    if (boards.length > 0) {
      const board = await canny.board.get({ id: boards[0].id });
      console.log('Single Board:', board);
    }

    // Test Category functions
    console.log('\nTesting Category functions...');
    const categories = await canny.category.list();
    console.log('Categories:', categories);

    if (categories.length > 0) {
      const category = await canny.category.get({ id: categories[0].id });
      console.log('Single Category:', category);
    }

    const newCategory = await canny.category.create({
      boardID: boards[0].id,
      name: 'Test Category',
    });
    console.log('New Category:', newCategory);

    await canny.category.delete({ id: newCategory.id });
    console.log('Category deleted');

    // Test Changelog functions
    console.log('\nTesting Changelog functions...');
    const changelogs = await canny.changelog.list();
    console.log('Changelogs:', changelogs);

    const newChangelog = await canny.changelog.create({
      title: 'Test Changelog',
      details: 'This is a test changelog',
      type: 'new',
      notify: false,
      published: true,
    });
    console.log('New Changelog:', newChangelog);

    // Test Comment functions
    console.log('\nTesting Comment functions...');
    const comments = await canny.comment.list();
    console.log('Comments:', comments);

    if (comments.length > 0) {
      const comment = await canny.comment.get({ id: comments[0].id });
      console.log('Single Comment:', comment);
    }

    // Test Company functions
    console.log('\nTesting Company functions...');
    const companies = await canny.company.list();
    console.log('Companies:', companies);

    if (companies.length > 0) {
      const updatedCompany = await canny.company.update({
        id: companies[0].id,
        name: 'Updated Company Name',
      });
      console.log('Updated Company:', updatedCompany);
    }

    // Test Opportunity functions
    console.log('\nTesting Opportunity functions...');
    const opportunities = await canny.opportunity.list();
    console.log('Opportunities:', opportunities);

    // Test Post functions
    console.log('\nTesting Post functions...');
    const posts = await canny.post.list();
    console.log('Posts:', posts);

    if (posts.length > 0) {
      const post = await canny.post.get({ id: posts[0].id });
      console.log('Single Post:', post);

      const updatedPost = await canny.post.update({
        postID: post.id,
        title: 'Updated Post Title',
      });
      console.log('Updated Post:', updatedPost);

      if (categories.length > 1) {
        const categoryUpdatedPost = await canny.post.category.update({
          postID: post.id,
          categoryID: categories[1].id,
        });
        console.log('Category Updated Post:', categoryUpdatedPost);
      }

      const statusUpdatedPost = await canny.post.status.update({
        changerID: '123',
        postID: post.id,
        commentImageURLs: [],
        commentValue: 'Test Comment',
        shouldNotifyVoters: false,
        status: 'planned',
      });
      console.log('Status Updated Post:', statusUpdatedPost);
    }

    // Test Status Changes functions
    console.log('\nTesting Status Changes functions...');
    const statusChanges = await canny.statusChange.list({
      boardID: boards[0].id,
    });
    console.log('Status Changes:', statusChanges);

    // Test Tag functions
    console.log('\nTesting Tag functions...');
    const tags = await canny.tag.list();
    console.log('Tags:', tags);

    if (tags.length > 0) {
      const tag = await canny.tag.get({ id: tags[0].id });
      console.log('Single Tag:', tag);
    }

    const newTag = await canny.tag.create({
      boardID: boards[0].id,
      name: 'Test Tag',
    });
    console.log('New Tag:', newTag);

    // Test User functions
    console.log('\nTesting User functions...');
    const users = await canny.user.list();
    console.log('Users:', users);

    if (users.length > 0) {
      const user = await canny.user.get({ id: users[0].id });
      console.log('Single User:', user);
    }

    const newUser = await canny.user.upsert({
      name: 'Test User',
      userID: '123',
    });
    console.log('New/Updated User:', newUser);

    // Test Vote functions
    console.log('\nTesting Vote functions...');
    const votes = await canny.vote.list();
    console.log('Votes:', votes);

    if (votes.length > 0) {
      const vote = await canny.vote.get({ id: votes[0].id });
      console.log('Single Vote:', vote);
    }

    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('An error occurred during testing:', error);
  }
}

runTests();
