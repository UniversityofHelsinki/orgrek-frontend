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
import parseISO from 'date-fns/parseISO';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';

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
      dispatch(fetchNodeParents(node.uniqueId, selectedDay, selectedHierarchy));
      dispatch(
        fetchNodeChildren(node.uniqueId, selectedDay, selectedHierarchy)
      );
      dispatch(fetchNodeFullNames(node.uniqueId, selectedDay));
    }
  };

  useEffect(() => {
    if (!node || !selectedDay || !selectedHierarchy) {
      return;
    }

    const startDate = node.startDate ? parseISO(node.startDate) : null;
    const endDate = node.endDate ? parseISO(node.endDate) : null;

    let date;
    if (isBefore(selectedDay, startDate)) {
      date = startDate;
    } else if (isAfter(selectedDay, endDate)) {
      date = endDate;
    } else {
      date = selectedDay;
    }

    fetchNodeDetails(node, date, showHistory, showComing, selectedHierarchy);
  }, [node, showComing, showHistory, selectedHierarchy]);
};

export default useFetchNodeDetails;
