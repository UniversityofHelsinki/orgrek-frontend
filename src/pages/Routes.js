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

const AppRoutes = () => {
  useScrollToTop();
  useSelectedHierarchies();
  const user = useCurrentUser();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<NodePage />} />
        {isAuthorized(user, authActions.texts.edit) && (
          <Route path="texts" element={<TextsPage />} />
        )}
        {isAuthorized(user, authActions.hierarchyFilters.edit) && (
          <Route path="hierarchyfilters" element={<HierarchyFiltersPage />} />
        )}
        <Route path="sections" element={<SectionsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
