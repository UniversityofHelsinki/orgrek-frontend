import React, { useEffect } from 'react';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import NodePage from './NodePage';
import TextsPage from './TextsPage';
import HierarchyFiltersPage from './HierarchyFiltersPage';
import useCurrentUser from '../hooks/useCurrentUser';
import useSelectedHierarchies from '../hooks/useSelectedHierarchies';
import { isAdmin } from '../actions/userAction';
import Layout from '../components/Layout';
import useScrollToTop from '../hooks/useScrollToTop';
import { useDispatch } from 'react-redux';

const AppRoutes = () => {
  useScrollToTop();
  useSelectedHierarchies();
  const user = useCurrentUser();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<NodePage />} />
        {isAdmin(user) && (
          <>
            <Route path="texts" element={<TextsPage />} />
            <Route path="hierarchyfilters" element={<HierarchyFiltersPage />} />
          </>
        )}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
