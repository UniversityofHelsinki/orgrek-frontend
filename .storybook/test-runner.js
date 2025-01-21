const { injectAxe, checkA11y, configureAxe } = require('axe-playwright');
const { getStoryContext } = require('@storybook/test-runner');

module.exports = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context);

    await configureAxe(page, {
      rules: storyContext.parameters?.a11y?.config?.rules,
    });

    const element = storyContext.parameters?.a11y?.element ?? '#storybook-root';
    await checkA11y(
      page,
      element,
      {
        detailedReport: true,
      },
      true,
      'v2'
    );
  },
};
