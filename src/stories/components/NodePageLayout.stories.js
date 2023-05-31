import React, { useState, useRef, useLayoutEffect } from 'react';
import Box from '@mui/material/Box';
import Layout from '../../components/Layout';
import { Route, Routes } from 'react-router-dom';
import { createAdmin, mockGetTree, tree, withMockStore } from '../../mockStore';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { FormControlLabel, Switch, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import DateField from '../../components/inputs/DateField';
import HierarchySelection from '../../components/HierarchySelection';
import NodeField from '../../components/inputs/NodeField';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import Tree from '../../components/Tree';
import Divider from '@mui/material/Divider';

// Use a fixed date to ensure that tests always have a consistent result
const now = new Date('2023-03-22T14:28:00+0200');

const selectedHierarchy = 'talous';

export default {
  component: Layout,
  parameters: {
    layout: 'fullscreen',
    systemTime: now,
    msw: {
      handlers: [
        mockGetTree({ hierarchies: selectedHierarchy, selectedDay: now }, tree),
      ],
    },
  },
};

/**
 * Sticky header example with some dummy controls.
 *
 * TODO: Replace the dummy date field with the actual functionality currently provided in ReviewDate component
 * TODO: Replace dummy switches with actual functionality and customize the theme to match the design system
 *
 * @see https://mui.com/material-ui/react-switch/#customization
 */
const StickyHeader = React.forwardRef(function StickyHeader(props, ref) {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Paper
      ref={ref}
      elevation={0}
      sx={{
        top: 0,
        position: 'sticky',
        pt: 2,
        pb: 2,
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Stack direction="row" alignItems="center" gap={2}>
        <DateField
          size="small"
          label={t('display_date')}
          componentsProps={{
            actionBar: { actions: ['today'] },
          }}
        />
        <HierarchySelection size="small" limitTags={2} />
        <NodeField
          variant="search"
          size="small"
          label={t('search_by_name_or_code')}
          sx={{ width: 350 }}
          onChange={() => {}}
        />
        <Box sx={{ flex: 1 }} />
        <FormControlLabel
          label={t('show_history')}
          control={<Switch />}
          labelPlacement="start"
        />
        <FormControlLabel
          label={t('show_coming')}
          control={<Switch />}
          labelPlacement="start"
        />
      </Stack>
    </Paper>
  );
});

const Sidebar = ({ top, width }) => {
  return (
    <Box
      component="aside"
      sx={{
        width,
        position: 'sticky',
        top,
        alignSelf: 'flex-start',
      }}
    >
      <Box
        sx={{
          overflowY: 'auto',
          maxHeight: `calc(100vh - ${top}px)`,
          pb: 3,
        }}
      >
        {/* TODO: Move this border style override to the Tree component */}
        <Tree sx={{ borderStyle: 'none' }} />
      </Box>
    </Box>
  );
};

/**
 * Just to demo how the sticky header works with the scrollable sidebar.
 */
const DemoPage = () => {
  const stickyHeaderRef = useRef(null);
  const [sidebarTop, setSidebarTop] = useState(0);
  const [sidebarWidth] = useState(400);

  useLayoutEffect(() => {
    if (stickyHeaderRef.current) {
      setSidebarTop(stickyHeaderRef.current.clientHeight);
    }
  });

  const mainContent = (
    <Box
      component="main"
      id="main-content"
      sx={{ pl: 4, pr: 4, pb: 8, flex: 1 }}
    >
      <Typography variant="h1" mt={5} mb={5}>
        Main content
      </Typography>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dapibus,
        ipsum a consequat mollis, ex magna lacinia est, ac finibus nunc eros sit
        amet elit. Etiam ullamcorper orci ligula, vitae placerat libero molestie
        eu. Curabitur molestie tincidunt ultrices. Curabitur sagittis nisl
        convallis lacus iaculis, ut malesuada dui dictum. Proin ac sollicitudin
        magna. Sed mattis justo ut est pharetra, id faucibus nisi mattis. Donec
        iaculis nunc eros, non gravida sem ullamcorper vitae. Aliquam erat
        volutpat. Vivamus luctus orci at ligula pretium tincidunt. Donec
        ultricies lacinia elementum. Duis vitae est justo. Vivamus finibus,
        ligula et lobortis dictum, enim magna vehicula quam, in tempor eros
        sapien sit amet magna. Duis quis enim ultrices, tristique odio vel,
        volutpat augue. Fusce interdum ipsum congue, consequat turpis sed,
        interdum massa. In sed commodo massa. Etiam varius porta libero eu
        ultricies.
      </p>
      <p>
        Cras vel augue vel erat imperdiet dictum. Nam rhoncus blandit ultricies.
        Vestibulum vulputate sem vel imperdiet laoreet. Nunc aliquet mauris nec
        lectus hendrerit viverra. Proin ex nisl, blandit eu neque vitae, blandit
        rhoncus ex. Cras metus ex, vestibulum nec dictum vitae, posuere eget
        mauris. Vivamus molestie arcu vitae lacus scelerisque ultricies. Sed
        tincidunt auctor sagittis. Pellentesque luctus leo eget ipsum aliquam,
        quis convallis urna auctor.
      </p>
      <p>
        In eu malesuada nisl, ac commodo tellus. Phasellus id porta tortor.
        Donec nec varius lorem. Donec feugiat tellus laoreet neque bibendum
        semper. Proin ut eleifend urna. Donec egestas posuere egestas. Sed sed
        vulputate leo. Pellentesque sodales dictum justo efficitur volutpat.
        Aliquam facilisis, sem a egestas porttitor, sem purus varius turpis,
        rutrum pharetra velit justo ut ligula. Morbi ornare purus felis, nec
        mollis mauris pellentesque cursus. Donec ornare feugiat est quis
        pellentesque. Donec congue leo ac purus tincidunt, et bibendum ex
        tempor. Pellentesque et semper turpis, quis consequat orci. Nulla
        suscipit tortor augue. Aenean accumsan metus tellus, pellentesque porta
        turpis maximus et.
      </p>
      <p>
        Nullam posuere volutpat est sit amet lacinia. Integer nec erat sapien.
        Phasellus gravida magna id neque fringilla tempus. Quisque eu massa
        neque. Duis elementum turpis convallis mauris mollis mollis. Praesent
        dapibus placerat iaculis. Etiam urna felis, aliquet faucibus enim sit
        amet, finibus aliquet odio. Praesent sed enim ac leo auctor malesuada
        sed ut augue. Morbi quis bibendum diam. Praesent dictum nibh in suscipit
        elementum. Praesent sit amet purus eu leo hendrerit imperdiet. Etiam at
        neque sem. Maecenas consectetur elit leo, sit amet pellentesque tortor
        fringilla a. Quisque ullamcorper cursus libero, at aliquam purus
        consequat a. Curabitur non mattis tellus, vel euismod lorem.
      </p>
      <p>
        Sed ut suscipit ipsum. Ut ultrices, mauris nec pharetra accumsan, lectus
        sapien posuere tortor, sed feugiat leo nisl sit amet elit. In nec justo
        mauris. Sed blandit nunc id arcu convallis sodales. Vestibulum sapien
        nisl, mollis eget mi ut, semper venenatis quam. Proin non varius erat.
        Aliquam et volutpat sem. Morbi molestie est a erat tincidunt, nec
        vestibulum ipsum vulputate.
      </p>
      <p>
        Ut porttitor pretium cursus. Integer sapien eros, volutpat at nulla
        vitae, interdum convallis nunc. Ut scelerisque ipsum non mollis mollis.
        Morbi at rutrum orci. Praesent sit amet libero leo. Proin sed hendrerit
        mauris, eget tempor dolor. Curabitur fringilla lorem sit amet arcu
        ultrices, nec lobortis diam consequat.
      </p>
      <p>
        Fusce non nulla neque. Nulla hendrerit erat eros, et ornare tellus
        gravida a. Integer pharetra auctor mauris, id fringilla urna pulvinar
        non. Vestibulum euismod luctus dolor. Nulla eget lectus mollis,
        ullamcorper mauris non, dignissim purus. Sed eu quam nisl. Fusce
        lobortis tristique ex quis consequat. Proin non sapien at metus
        imperdiet ultricies. Suspendisse pellentesque id orci sit amet bibendum.
        Aenean sollicitudin et tortor at maximus. Aliquam dignissim, enim sit
        amet scelerisque ultricies, nisi ipsum congue sem, et malesuada nisi
        orci vel mi. In hac habitasse platea dictumst. Nam sodales ipsum ut eros
        tempor, sed accumsan felis fermentum.
      </p>
      <p>
        Aenean id felis ultrices, cursus arcu vitae, accumsan ligula. Aliquam
        eget sapien interdum, pulvinar justo ut, maximus ante. Praesent nec
        vehicula arcu. Phasellus vitae metus ut libero porttitor commodo id
        fermentum nibh. Cras vulputate, augue quis congue convallis, lorem nunc
        feugiat ex, ut scelerisque sem nisl sed metus. Sed sed lectus non mi
        semper facilisis non vitae tellus. Cras quis mi congue, viverra ex nec,
        interdum ex. Vivamus vulputate justo sed nibh imperdiet placerat. Donec
        fringilla fermentum massa, sit amet gravida leo auctor nec. Curabitur
        eget tempor eros. In aliquam aliquam libero, eget sollicitudin nulla
        scelerisque id. Maecenas lacinia tortor vitae tempor cursus. Maecenas
        eget ex fermentum quam rhoncus consectetur.
      </p>
      <p>
        Donec lacinia porta nibh, ac gravida mauris semper vel. Pellentesque
        placerat massa nec sagittis dictum. Morbi fringilla in arcu eleifend
        pellentesque. Donec consectetur pulvinar nunc, in tincidunt elit
        vehicula nec. Nam quis turpis et elit consectetur ornare. Nulla lobortis
        sapien non nisl bibendum fermentum. Duis laoreet ornare libero non
        efficitur. Aenean eu ullamcorper dui. Morbi pulvinar nisi ut velit
        congue dictum. Sed turpis risus, mollis sed cursus eu, viverra maximus
        velit.
      </p>
      <p>
        In ac metus non purus euismod laoreet. Curabitur commodo aliquam metus a
        varius. Curabitur fermentum dignissim enim, vel finibus nunc consectetur
        et. Aliquam id imperdiet neque. Duis a est odio. Phasellus rutrum nibh
        pulvinar egestas dapibus. Sed bibendum euismod elit. Proin sollicitudin,
        lorem in imperdiet egestas, diam libero hendrerit libero, vitae dapibus
        ante enim facilisis nisl.
      </p>
    </Box>
  );

  return (
    <Container sx={{ pb: 3 }}>
      <StickyHeader ref={stickyHeaderRef} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Sidebar top={sidebarTop} width={sidebarWidth} />
        {/* TODO: Drag the divider to change sidebarWidth */}
        <Divider orientation="vertical" flexItem component="div" />
        {mainContent}
      </Box>
    </Container>
  );
};

export const NodePageLayout = {
  render: () => {
    // Wrap DemoPage with Layout component. This works only with the router.
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DemoPage />} />
        </Route>
      </Routes>
    );
  },
  decorators: [
    withMockStore({
      dr: {
        selectedDay: now,
      },
      tree: {
        selectedHierarchy,
        selectableHierarchies: [
          'tutkimus',
          'henkilosto',
          'toiminnanohjaus',
          'opetus',
          'history',
          'talous',
        ],
      },
      ur: {
        user: createAdmin(),
      },
    }),
  ],
};
