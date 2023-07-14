import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NodePage from './NodePage';
import TextsPage from './TextsPage';
import HierarchyFiltersPage from './HierarchyFiltersPage';
import SectionsPage from './SectionsPage';
import useCurrentUser from '../hooks/useCurrentUser';
import useSelectedHierarchies from '../hooks/useSelectedHierarchies';
import { authActions, isAuthorized } from '../auth';
import Layout from '../components/Layout';
import useScrollToTop from '../hooks/useScrollToTop';
import HierarchyPage from './HierarchyPage';
import useHierarchies from '../hooks/useHierarchies';

const AppRoutes = () => {
  useScrollToTop();
  const user = useCurrentUser();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<NodePage />} />
        {isAuthorized(user, authActions.texts.edit) && (
          <Route path="texts" element={<TextsPage />} />
        )}
        {isAuthorized(user, authActions.hierarchyFilters.view) && (
          <Route path="hierarchyfilters" element={<HierarchyFiltersPage />} />
        )}
        {isAuthorized(user, authActions.sections.view) && (
          <Route path="sections" element={<SectionsPage />} />
        )}
        {isAuthorized(user, authActions.hierarchies.view) && (
          <Route path="hierarchies" element={<HierarchyPage />} />
        )}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
