import React from 'react';

const RealDate = Date;

/**
 * Storybook decorator for mocking current time.
 *
 * Sets current time to a fixed value if systemTime is defined in story
 * parameters, otherwise uses the real time.
 */
export const withMockDate = (Story, { parameters }) => {
  if (parameters.systemTime) {
    const systemTime = new Date(parameters.systemTime);

    // eslint-disable-next-line no-global-assign
    Date = class extends Date {
      constructor(...args) {
        if (args.length === 0) {
          super(systemTime.valueOf());
        } else {
          super(...args);
        }
      }

      static now() {
        return systemTime.getTime();
      }
    };
  } else {
    // eslint-disable-next-line no-global-assign
    Date = RealDate;
  }

  return <Story />;
};
