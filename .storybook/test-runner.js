const { injectAxe, checkA11y } = require('axe-playwright');

module.exports = {
  async preRender(page) {
    await injectAxe(page);
  },
  async postRender(page) {
    await checkA11y(
      page,
      '#storybook-root',
      {
        detailedReport: true,
      },
      false,
      'v2'
    );

    const accessibilityTree = await page.accessibility.snapshot();
    expect(accessibilityTree).toMatchSnapshot();
  },
};
