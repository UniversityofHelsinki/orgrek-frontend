/* eslint-disable max-lines */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import NodeDetailsTable from './NodeDetailsTable';
import NodeViewControl from './NodeViewControl';
import { filterAttributeDuplicates, filterNodeDuplicates, parseDisplayNames, datesOverlap } from '../actions/utilAction';
import {
    fetchNodeParents,
    fetchNodeChildren,
    fetchNodeParentsHistory,
    fetchNodeChildrenHistory, fetchNodeParentsFuture, fetchNodeChildrenFuture
} from '../actions/hierarchyAction';
import {
    fetchNodeAttributes, fetchNodeAttributesFuture,
    fetchNodeAttributesHistory,
    fetchNodePredecessors,
    fetchNodeSuccessors
} from '../actions/nodeAction';
import { useTranslation } from 'react-i18next';
import { codeAttributes } from '../constants/variables';

// eslint-disable-next-line complexity
const NodeDetails = (props) => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const [attributeData, setAttributeData] = useState(false);
    const [parentsData, setParentsData] = useState(false);
    const [childrenData, setChildrenData] = useState(false);
    const [headerData, setHeaderData] = useState(false);

    const isCodeAttribute = (elem) => {
        return codeAttributes.includes(elem);
    };

    const sortOtherAttributes = elems => {
        const sortedList = elems.filter((data) => data.startDate || data.endDate).sort((a, b) => {
            return new Date(b.endDate) - new Date(a.startDate);
        });
        return sortedList;
    };

    const sortAttributesByName = elems => {
        elems.sort((a, b) => {
            if (lang === 'sv') {
                return a.displayNameSv && b.displayNameSv && a.displayNameSv.toLowerCase().localeCompare(b.displayNameSv.toLowerCase());
            } else if (lang === 'en') {
                return a.displayNameEn && b.displayNameEn && a.displayNameEn.toLowerCase().localeCompare(b.displayNameEn.toLowerCase());
            } else {
                return a.displayNameFi && b.displayNameFi && a.displayNameFi.toLowerCase().localeCompare(b.displayNameFi.toLowerCase());
            }
        });
        return elems;
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

    const orderCodeAttributes = (elems) => {
        const result = [];
        props.node ? result.push({ 'key': 'unique_id', 'value': props.node.uniqueId, startDate: null, endDate: null })
            : result.push({ 'key': 'unique_id', 'value': t('no_value'), startDate: null, endDate: null });
        codeAttributes.map(codeAttribute => {
            for (let i = 0, len = elems.length; i < len; i++) {
                const match = elems[i].key === codeAttribute;
                match ? result.push(elems[i]) : '';
            }
        });

        return sortCodeAttributesByDate(result, codeAttributes);
    };

    const sortNameAttributesByDate = (elems, order) => {

        let result = [];

        for (let property in order) {

            const filteredBatch = elems.filter(e => {
              return e.key === property;
            });

            filteredBatch.sort((a,b) => {
                return new Date(b.endDate) - new Date(a.startDate);
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

    const isLanguageAttribute = (elem) => {
        return (elem.startsWith('name') && elem.length === 7);
    };

    const matchNameToLang = (displayNames) => {
        let fallBack;
        let matchedName = undefined;
        displayNames.map(elem => {
            const langCode =  isLanguageAttribute(elem.key) ? elem.key.slice(5) : '';
            if (langCode === 'fi') {
                fallBack = elem.value;
            }
            if (langCode === lang) {
                matchedName = elem.value;
            }
        });
        return matchedName ? matchedName : fallBack;
    };

    const selectData = () => {
        if (props.showHistory && props.showComing && props.nodeAttributesHistory && props.nodeAttributes) {
            setAttributeData(filterAttributeDuplicates(props.nodeAttributesHistory, props.nodeAttributesFuture));
            setChildrenData(filterNodeDuplicates(props.childrenHistory, props.childrenFuture));
            setParentsData(filterNodeDuplicates(props.parentsHistory, props.parentsFuture));
            setHeaderData(props.nodeAttributes);
        } else if (props.showHistory && props.nodeAttributesHistory) {
            setAttributeData(props.nodeAttributesHistory);
            setChildrenData(props.childrenHistory);
            setParentsData(props.parentsHistory);
            setHeaderData(props.nodeAttributes);
        } else if (props.showComing && props.nodeAttributesFuture) {
            setAttributeData(props.nodeAttributesFuture);
            setChildrenData(props.childrenFuture);
            setParentsData(props.parentsFuture);
            setHeaderData(props.nodeAttributes);
        } else {
            setAttributeData(props.nodeAttributes);
            setChildrenData(props.children);
            setParentsData(props.parents);
            setHeaderData(props.nodeAttributes);
        }
    };
    const nameInfoData = attributeData ? attributeData.filter(elem => isLanguageAttribute(elem.key)) : false;
    const nameInfoDataOrderedByLanguage = nameInfoData ? orderNameAttributesByLanguage(nameInfoData) : false;
    const displayNameData = attributeData ? parseDisplayNames(nameInfoData, attributeData.find(elem => elem.key === 'lyhenne'), attributeData.find(elem => elem.key === 'emo_lyhenne')) : false;
    const headerInfoData = headerData ? headerData.filter(elem => isLanguageAttribute(elem.key)) : false;
    const headerNameData = headerData ? parseDisplayNames(headerInfoData, headerData.find(elem => elem.key === 'lyhenne'), headerData.find(elem => elem.key === 'emo_lyhenne')) : false;
    const headerNameDataOrderedByLang = headerData ? orderNameAttributesByLanguage(headerNameData) : false;
    const headerName = headerNameDataOrderedByLang ?  matchNameToLang(headerNameDataOrderedByLang) : false;
    const codeAttributesData = attributeData ? orderCodeAttributes(attributeData) : false;
    const typeAttributeData = attributeData ? attributeData.filter(elem => elem.key === 'type') : false;
    const otherAttributesData = attributeData ? attributeData.filter(elem => !isCodeAttribute(elem.key) && elem.key !== 'type' && !isLanguageAttribute(elem.key)) : false;
    const sortedOtherAttributesData = otherAttributesData ? sortOtherAttributes(otherAttributesData) : false;
    const validityData = props.node ? [props.node] : false;
    const predecessorData = props.predecessors ? sortAttributesByName(props.predecessors) : false;
    const successorsData = props.successors ? sortAttributesByName(props.successors) : false;
    const sortedParentsByName = parentsData ? sortAttributesByName(parentsData) : false;
    const sortedChildrenByName = childrenData ? sortAttributesByName(childrenData) : false;

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
                props.fetchNodeDetails(props.node, props.selectedDay, props.showHistory, props.showComing);
            } else if (endDate && new Date(endDate).getTime() <= props.selectedDay.getTime()) {
                props.fetchNodeDetails(props.node, new Date(endDate), props.showHistory, props.showComing);
            } else if (startDate && new Date(startDate).getTime() >= props.selectedDay.getTime()) {
                props.fetchNodeDetails(props.node, new Date(startDate), props.showHistory, props.showComing);
            }
        }
    }, [props.node]);

    React.useLayoutEffect(() => {
        selectData();
    }, [props.showComing, props.showHistory,
        props.parentsFuture, props.parentsHistory,
        props.childrenHistory, props.childrenFuture,
        props.children, props.parents,
        props.nodeAttributes, props.nodeAttributesHistory,
        props.nodeAttributesFuture]);

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
                    <h3>{headerName}</h3>
                    <NodeViewControl node={props.node} selectedDay={props.selectedDay} />
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
                        contentData={displayNameData}
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
                        dataFilter={data => (isPast || isFuture) && !(props.showHistory || props.showComing) ? data.filter(attr => attr.key === 'uniqueId') : data}
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
                        contentData={sortedParentsByName}
                        hasValidity={false}
                        dataFilter={pastFutureFilter}
                    />
                    <NodeDetailsTable
                        selectedDay={props.selectedDay}
                        type='node-hierarchy'
                        heading='subunits'
                        tableLabels={['unit', 'hierarchies', 'hierarchy_valid']}
                        contentData={sortedChildrenByName}
                        hasValidity={false}
                        dataFilter={pastFutureFilter}
                    />
                    <NodeDetailsTable
                        selectedDay={props.selectedDay}
                        type='name-validity'
                        heading='predecessors'
                        tableLabels={['name', 'valid_dates', 'predecessor_edge_valid']}
                        contentData={predecessorData}
                        hasValidity={false}
                    />
                    <NodeDetailsTable
                        selectedDay={props.selectedDay}
                        type='name-validity'
                        heading='successors'
                        tableLabels={['name', 'valid_dates', 'successor_edge_valid']}
                        contentData={successorsData}
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
    showComing: state.nvrd.showComing
});

const mapDispatchToProps = dispatch => ({
    fetchNodeDetails: (node, selectedDay, showHistory, showComing) => {
        dispatch(fetchNodeAttributes(node.uniqueId, selectedDay));
        dispatch(fetchNodeParents(node.uniqueId, selectedDay));
        dispatch(fetchNodeChildren(node.uniqueId, selectedDay));
        dispatch(fetchNodePredecessors(node.uniqueId, selectedDay));
        dispatch(fetchNodeSuccessors(node.uniqueId, selectedDay));

        if (showHistory) {
            dispatch(fetchNodeParentsHistory(node.uniqueId, selectedDay));
            dispatch(fetchNodeChildrenHistory(node.uniqueId, selectedDay));
            dispatch(fetchNodeAttributesHistory(node.uniqueId, selectedDay));
        }
        if (showComing) {
            dispatch(fetchNodeParentsFuture(node.uniqueId, selectedDay));
            dispatch(fetchNodeChildrenFuture(node.uniqueId, selectedDay));
            dispatch(fetchNodeAttributesFuture(node.uniqueId, selectedDay));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NodeDetails);
