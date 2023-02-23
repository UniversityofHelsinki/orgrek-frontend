import { useDispatch, useSelector } from 'react-redux';
import {
  fetchNodeAttributes,
  fetchNodeFavorableFullNames,
  fetchNodeFullNames,
  fetchNodePredecessors,
  fetchNodeSuccessors,
} from '../actions/nodeAction';
import {
  fetchNodeChildren,
  fetchNodeParents,
} from '../actions/hierarchyAction';
import { useEffect } from 'react';
import { datesOverlap } from '../actions/utilAction';

/**
 * Fetches node attributes when the component using this hook is rendered
 * first time or when the selected node changes.
 */
const useFetchNodeDetails = () => {
  const dispatch = useDispatch();
  const { node, selectedDay, showHistory, showComing, selectedHierarchy } =
    useSelector((state) => ({
      node: state.nrd.node,
      selectedDay: state.dr.selectedDay,
      showHistory: state.nvrd.showHistory,
      showComing: state.nvrd.showComing,
      selectedHierarchy: state.tree.selectedHierarchy,
    }));

  const fetchNodeDetails = (
    node,
    selectedDay,
    showHistory,
    showComing,
    selectedHierarchy
  ) => {
    dispatch(fetchNodePredecessors(node.uniqueId, selectedDay));
    dispatch(fetchNodeSuccessors(node.uniqueId, selectedDay));
    dispatch(fetchNodeFavorableFullNames(node.uniqueId, selectedDay));
    if (!(showHistory || showComing)) {
      dispatch(
        fetchNodeAttributes(node.uniqueId, selectedDay, selectedHierarchy)
      );
      dispatch(fetchNodeParents(node.uniqueId, selectedDay));
      dispatch(fetchNodeChildren(node.uniqueId, selectedDay));
      dispatch(fetchNodeFullNames(node.uniqueId, selectedDay));
    }
  };

  useEffect(() => {
    if (!node) {
      return;
    }

    const startDate = Date.parse(node.startDate) || undefined;
    const endDate = Date.parse(node.endDate) || undefined;

    if (
      datesOverlap(
        startDate && new Date(startDate),
        endDate && new Date(endDate),
        selectedDay
      )
    ) {
      fetchNodeDetails(
        node,
        selectedDay,
        showHistory,
        showComing,
        selectedHierarchy
      );
    } else if (
      endDate &&
      new Date(endDate).getTime() <= selectedDay.getTime()
    ) {
      fetchNodeDetails(
        node,
        new Date(endDate),
        showHistory,
        showComing,
        selectedHierarchy
      );
    } else if (
      startDate &&
      new Date(startDate).getTime() >= selectedDay.getTime()
    ) {
      fetchNodeDetails(
        node,
        new Date(startDate),
        showHistory,
        showComing,
        selectedHierarchy
      );
    }
    fetchNodeDetails(
      node,
      new Date(endDate),
      showHistory,
      showComing,
      selectedHierarchy
    );
  }, [node, showComing, showHistory, selectedHierarchy]);
};

export default useFetchNodeDetails;
