import { useGetTreeQuery } from '../store';
import { useSelector } from 'react-redux';
import useHierarchies from './useHierarchies';
import useContentLanguage from './useContentLanguage';
import { useMemo } from 'react';
import { valueComparator } from '../components/admin/fieldComparator';

const copyTree = (tree) => {
  const children = [];
  for (const child of tree.children) {
    const childCopy = copyTree({ ...child });
    children.push(childCopy);
  }
  return { ...tree, children: children };
};

const sortTree = (tree, comparator) => {
  tree.children.sort(comparator);
  for (const child of tree.children) {
    sortTree(child, comparator);
  }
};

const nameGetter = (language) => {
  return (node) => {
    const field = language === 'ia' ? 'fi' : language;
    return node.names[field];
  };
};

const nodeComparator = (language) => {
  return (a, b) => {
    const aHasChildren = a.children.length > 0;
    const bHasChildren = b.children.length > 0;
    if (aHasChildren && !bHasChildren) {
      return -1;
    } else if (bHasChildren && !aHasChildren) {
      return 1;
    }
    return valueComparator(nameGetter(language))(a, b);
  };
};

/**
 * Fetches the tree on the selected day and including selected hierarchies.
 */
const useTree = () => {
  const { selectedDay } = useSelector((state) => ({
    selectedDay: state.dr.selectedDay,
  }));

  const [hierarchies] = useHierarchies();
  const language = useContentLanguage();

  const { data, error, isFetching } = useGetTreeQuery({
    hierarchies,
    selectedDay,
  });

  const emptyTrees = [];
  const sortedByLocalName = useMemo(() => {
    const trees = data || emptyTrees;
    const copy = [];
    for (const root of trees) {
      const rootCopy = copyTree(root);
      sortTree(rootCopy, nodeComparator(language));
      copy.push(rootCopy);
    }
    copy.sort(nodeComparator(language));
    return copy;
  }, [language, data]);

  if (error) {
    return { trees: emptyTrees, error, isFetching };
  }
  return { trees: sortedByLocalName, error, isFetching };
};

export default useTree;
