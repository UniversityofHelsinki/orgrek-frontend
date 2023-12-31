import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default {
  title: 'Typography',
  component: Typography,
};

export const Primary = {
  render: () => (
    <Stack gap={2}>
      <Typography variant="h1">
        h1. Lorem ipsum dolor sit amet,
        <br />
        consectetur adipiscing elit.
      </Typography>
      <Typography variant="h2">
        h2. Lorem ipsum dolor sit amet,
        <br />
        consectetur adipiscing elit.
      </Typography>
      <Typography variant="h3">
        h3. Lorem ipsum dolor sit amet,
        <br />
        consectetur adipiscing elit.
      </Typography>
      <Typography variant="h4">
        h4. Lorem ipsum dolor sit amet,
        <br />
        consectetur adipiscing elit.
      </Typography>
      <Typography variant="h5">
        h5. Lorem ipsum dolor sit amet,
        <br />
        consectetur adipiscing elit.
      </Typography>
      <Typography variant="h6">
        h6. Lorem ipsum dolor sit amet,
        <br />
        consectetur adipiscing elit.
      </Typography>
      <Typography variant="ingress">
        ingress. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
        dapibus vulputate diam eu pretium. Mauris elit orci, ultricies id
        fermentum vel, porta et eros. Vestibulum condimentum lectus in convallis
        feugiat. Sed vulputate fringilla felis.
      </Typography>
      <Typography variant="body1" component="div">
        <p>
          body1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
          dapibus vulputate diam eu pretium. Mauris elit orci, ultricies id
          fermentum vel, porta et eros. Vestibulum condimentum lectus in
          convallis feugiat. Sed vulputate fringilla felis. Aliquam ut arcu et
          dui feugiat scelerisque eu quis diam. Mauris placerat congue dui sit
          amet blandit. Phasellus condimentum libero vel velit auctor, sit amet
          tincidunt velit varius.
        </p>
        <p>
          Mauris lacinia porta faucibus. Fusce eu est ac eros vulputate mollis
          in ac felis. Aenean commodo scelerisque mi sed imperdiet. Donec at
          hendrerit nisi, eget vestibulum nisi. Sed sit amet magna luctus,
          facilisis erat quis, sagittis ligula. Aenean dignissim velit quis leo
          consequat ultricies. Proin quis pretium justo. Vestibulum at eros
          nisl. Fusce lobortis erat ante, eu cursus sapien molestie at.
          Pellentesque placerat ante diam, et euismod lacus dictum vel.
          Phasellus vitae sollicitudin mi.
        </p>
        <p>
          In pulvinar eleifend convallis. Suspendisse elit erat, venenatis eget
          ullamcorper ut, laoreet iaculis nisl. Sed porta, felis id rhoncus
          aliquet, quam ipsum pellentesque metus, in sodales quam nunc vitae
          risus.
        </p>
      </Typography>
      <Typography variant="button">Button text</Typography>
      <Typography variant="navigationLink">Navigation link</Typography>
      <Typography variant="caption">Caption text</Typography>
      <Typography variant="label">Label text</Typography>
      <Typography variant="accordionTitle">Accordion title</Typography>
      <Typography variant="tableHead">Table head</Typography>
      <Typography variant="tableBody">Table body</Typography>
    </Stack>
  ),
};
