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

    /* https://github.com/dequelabs/axe-core/issues/3426
     * https://github.com/dequelabs/axe-core/issues/3528
     *
     * page.evaluate: Error: Axe is already running. Use `await axe.run()` to wait for the previous run to finish before starting a new run.
     *
     * Disabled until the bug above in axe-core is fixed.
     *
     */
    /*
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
    */
  },
};
