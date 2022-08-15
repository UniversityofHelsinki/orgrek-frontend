/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import NodeDetailsTable from './NodeDetailsTable';
import NodeViewControl from './NodeViewControl';
import { filterAttributeDuplicates, datesOverlap } from '../actions/utilAction';
import {
    fetchNodeParents,
    fetchNodeChildren
} from '../actions/hierarchyAction';
import {
    fetchNodeAttributes,
    fetchNodePredecessors,
    fetchNodeSuccessors,
    fetchNodeFullNames
} from '../actions/nodeAction';
import { useTranslation } from 'react-i18next';
import { codeAttributes } from '../constants/variables';

// eslint-disable-next-line complexity
const NodeDetails = (props) => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const [attributeData, setAttributeData] = useState(false);

    const uniqueIdAttribute = props.node
                    ? { 'key': 'unique_id', 'value': props.node.uniqueId, startDate: null, endDate: null }
                    : { 'key': 'unique_id', 'value': t('no_value'), startDate: null, endDate: null };
    const isCodeAttribute = (elem) => {
        return codeAttributes.includes(elem);
    };

    const sortOtherAttributes = elems => {
        const sortedList = elems.sort((a, b) => {
            if (!a.startDate && !a.endDate) {
                return -1;
            }
            if (!b.startDate && !b.endDate) {
                return 1;
            }
            if (b.endDate && a.startDate) {
                return new Date(b.endDate) - new Date(a.startDate);
            }
            return new Date(a.startDate) - new Date(b.startDate);
        });
        return sortedList;
    };

    const sortCodeAttributesByDate = (elems, order) => {
        let result = [];
        order.forEach(element => {
            const filteredBatch = elems.filter(e => {
                return e.key === element;
            });
            filteredBatch.sort((a,b) => {
                return new Date(b.endDate) - new Date(a.startDate);
            });
            result.push(filteredBatch);
        });
        return result.flat();
    };

    const byCodesAndDates = (a,b) => {
        if (a.key === b.key) {
            if (!a.startDate && !a.endDate) {
                return -1;
            }
            if (!b.startDate && !b.endDate) {
                return 1;
            }
            if (b.endDate && a.startDate) {
                return new Date(b.endDate) - new Date(a.startDate);
            }
            return new Date(a.startDate) - new Date(b.startDate);
        }
        const aOrder = codeAttributes.findIndex(key => key === a.key);
        const bOrder = codeAttributes.findIndex(key => key === b.key);
        if (aOrder < bOrder) {
            return -1;
        } else if (aOrder > bOrder) {
            return 1;
        }
        return 0;
    };

    const sortNameAttributesByDate = (elems, order) => {

        let result = [];

        for (let property in order) {

            const filteredBatch = elems.filter(e => {
              return e.key === property;
            });

            filteredBatch.sort((a,b) => {
                return (!(a.endDate || b.endDate) && 0) || (!a.endDate && -1) || (!b.endDate && 1) || new Date(b.endDate) - new Date(a.endDate);
            });

            result.push(filteredBatch);
        }

        return result.flat();
    };

    const orderNameAttributesByLanguage = (elems) => {
        const order = { name_fi : 0, name_sv : 1, name_en : 2, default: 3 };
        elems.sort((a,b) => order[a.key] - order[b.key]);
        return sortNameAttributesByDate(elems, order);
    };

    const selectData = () => {
        if (props.showHistory && props.showComing && props.nodeAttributesHistory && props.nodeAttributes) {
            setAttributeData(filterAttributeDuplicates(props.nodeAttributesHistory, props.nodeAttributesFuture));
        } else if (props.showHistory && props.nodeAttributesHistory) {
            setAttributeData(props.nodeAttributesHistory);
        } else if (props.showComing && props.nodeAttributesFuture) {
            setAttributeData(props.nodeAttributesFuture);
        } else {
            setAttributeData(props.nodeAttributes);
        }
    };
    const nameInfoData = attributeData ? attributeData.filter(elem => /^name_(fi|sv|en)$/.test(elem.key)) : false;
    const nameInfoDataOrderedByLanguage = nameInfoData ? orderNameAttributesByLanguage(nameInfoData) : false;
    const typeAttributeData = attributeData ? attributeData.filter(elem => elem.key === 'type') : false;
    const codeAttributesData = attributeData
                                    ? [uniqueIdAttribute, ...attributeData.filter(a => codeAttributes.includes(a.key))]
                                            .sort(byCodesAndDates)
                                            .filter(a => !nameInfoData.includes(a) && !typeAttributeData.includes(a))
                                    : false;
    const otherAttributesData = attributeData ? attributeData.filter(elem => {
        return !nameInfoData.includes(elem) && !typeAttributeData.includes(elem) && !codeAttributesData.includes(elem);
    }) : false;
    const sortedOtherAttributesData = otherAttributesData ? sortOtherAttributes(otherAttributesData) : false;
    console.log(codeAttributesData);
    console.log(otherAttributesData);
    console.log(sortedOtherAttributesData);
    const validityData = props.node ? [props.node] : false;

    const isCurrent = datesOverlap(
        props.node?.startDate && new Date(Date.parse(props.node.startDate)),
        props.node?.endDate && new Date(Date.parse(props.node.endDate)),
        props.selectedDay
    );
    const isPast = !isCurrent && props.node?.endDate && new Date(Date.parse(props.node.endDate)).getTime() <= props.selectedDay.getTime();
    const isFuture = !isCurrent && props.node?.startDate && new Date(Date.parse(props.node.startDate)).getTime() >= props.selectedDay.getTime();

    useEffect(() => {
        if (props.node) {
            const startDate = Date.parse(props.node.startDate) || undefined;
            const endDate = Date.parse(props.node.endDate) || undefined;
            if (datesOverlap(startDate && new Date(startDate), endDate && new Date(endDate), props.selectedDay)) {
                props.fetchNodeDetails(props.node, props.selectedDay, props.showHistory, props.showComing, props.selectedHierarchy);
            } else if (endDate && new Date(endDate).getTime() <= props.selectedDay.getTime()) {
                props.fetchNodeDetails(props.node, new Date(endDate), props.showHistory, props.showComing, props.selectedHierarchy);
            } else if (startDate && new Date(startDate).getTime() >= props.selectedDay.getTime()) {
                props.fetchNodeDetails(props.node, new Date(startDate), props.showHistory, props.showComing, props.selectedHierarchy);
            }
        }
    }, [props.node, props.showComing, props.showHistory, props.selectedHierarchy]);

    React.useLayoutEffect(() => {
        selectData();
    }, [props.nodeAttributes, props.nodeAttributesFuture, props.nodeAttributesHistory]);

    const pastFutureFilter = (data) => {
        if (isCurrent || props.showComing || props.showHistory) {
            return data;
        }
        return [];
    };

    return (
        <>
            {props.nodeAttributes &&
                <>
                    <h3>{props.displayNames[lang === 'ia' && 'fi' || lang]?.[0]?.name}</h3>
                    <NodeViewControl node={props.node} selectedDay={props.selectedDay} selectedHierarchy={props.selectedHierarchy} />
                    <NodeDetailsTable
                        selectedDay={props.selectedDay}
                        type='key-value'
                        heading='valid_dates'
                        tableLabels={[]}
                        contentData={validityData}
                        hasValidity={true}
                    />
                    <NodeDetailsTable
                        selectedDay={props.selectedDay}
                        type='key-value'
                        heading='name_info'
                        tableLabels={['text_language_header', 'name']}
                        contentData={nameInfoDataOrderedByLanguage}
                        hasValidity={true}
                        dataFilter={pastFutureFilter}
                    />
                    <NodeDetailsTable
                        selectedDay={props.selectedDay}
                        type='key-value'
                        heading='display_name_info'
                        tableLabels={['text_language_header', 'name']}
                        contentData={[...(props.displayNames.fi || []), ...(props.displayNames.sv || []), ...(props.displayNames.en || [])].filter(n => n).map(dn => ({ ...dn, key: `name_${dn.language.toLowerCase()}`, value: dn.name }))}
                        hasValidity={true}
                        dataFilter={pastFutureFilter}
                    />
                    <NodeDetailsTable
                        selectedDay={props.selectedDay}
                        type='key-value'
                        heading='codes'
                        tableLabels={['code_namespace', 'value']}
                        contentData={codeAttributesData}
                        hasValidity={true}
                        dataFilter={data => (isPast || isFuture) && !(props.showHistory || props.showComing) ? data.filter(attr => attr.key === 'unique_id') : data}
                    />
                    <NodeDetailsTable
                        selectedDay={props.selectedDay}
                        type='key-value'
                        heading='unit_type'
                        tableLabels={[]}
                        contentData={typeAttributeData}
                        hasValidity={true}
                        dataFilter={pastFutureFilter}
                    />
                    <NodeDetailsTable
                        selectedDay={props.selectedDay}
                        type='node-hierarchy'
                        heading='upper_units'
                        tableLabels={['unit', 'hierarchies', 'hierarchy_valid']}
                        contentData={props.parents[lang === 'ia' && 'fi' || lang]}
                        hasValidity={false}
                        dataFilter={pastFutureFilter}
                    />
                    <NodeDetailsTable
                        selectedDay={props.selectedDay}
                        type='node-hierarchy'
                        heading='subunits'
                        tableLabels={['unit', 'hierarchies', 'hierarchy_valid']}
                        contentData={props.children[lang === 'ia' && 'fi' || lang]}
                        hasValidity={false}
                        dataFilter={pastFutureFilter}
                    />
                    <NodeDetailsTable
                        selectedDay={props.selectedDay}
                        type='name-validity'
                        heading='predecessors'
                        tableLabels={['name', 'valid_dates', 'predecessor_edge_valid']}
                        contentData={props.predecessors[lang === 'ia' && 'fi' || lang]}
                        hasValidity={false}
                    />
                    <NodeDetailsTable
                        selectedDay={props.selectedDay}
                        type='name-validity'
                        heading='successors'
                        tableLabels={['name', 'valid_dates', 'successor_edge_valid']}
                        contentData={props.successors[lang === 'ia' && 'fi' || lang]}
                        hasValidity={false}
                    />
                    <NodeDetailsTable
                        selectedDay={props.selectedDay}
                        type='key-value'
                        heading='other_attributes'
                        tableLabels={['attribute', 'value']}
                        contentData={sortedOtherAttributesData}
                        hasValidity={true}
                        dataFilter={pastFutureFilter}
                    />
                </>
            }
        </>
    );
};

const mapStateToProps = state => ({
    node : state.nrd.node,
    nodeAttributes : state.nrd.nodeAttributes,
    nodeAttributesFuture: state.nrd.nodeAttributesFuture,
    nodeAttributesHistory: state.nrd.nodeAttributesHistory,
    parents : state.hr.parents,
    parentsHistory: state.hr.parentsHistory,
    parentsFuture: state.hr.parentsFuture,
    children : state.hr.children,
    childrenHistory: state.hr.childrenHistory,
    childrenFuture: state.hr.childrenFuture,
    predecessors : state.nrd.nodePredecessors,
    successors : state.nrd.nodeSuccessors,
    selectedDay: state.dr.selectedDay,
    showHistory: state.nvrd.showHistory,
    showComing: state.nvrd.showComing,
    displayNames: state.nrd.nodeDisplayNames,
    selectedHierarchy: state.tree.selectedHierarchy,
});

const mapDispatchToProps = dispatch => ({
    fetchNodeDetails: (node, selectedDay, showHistory, showComing, selectedHierarchy) => {
        dispatch(fetchNodePredecessors(node.uniqueId, selectedDay));
        dispatch(fetchNodeSuccessors(node.uniqueId, selectedDay));
        if (!(showHistory || showComing)) {
            dispatch(fetchNodeAttributes(node.uniqueId, selectedDay, selectedHierarchy));
            dispatch(fetchNodeParents(node.uniqueId, selectedDay));
            dispatch(fetchNodeChildren(node.uniqueId, selectedDay));
            dispatch(fetchNodeFullNames(node.uniqueId, selectedDay));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NodeDetails);
