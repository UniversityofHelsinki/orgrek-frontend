/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import NodeDetailsTable from './NodeDetailsTable';
import { filterAttributeDuplicates, datesOverlap } from '../actions/utilAction';
import { switchHistory, switchComing, updateAttributes } from '../actions/nodeViewAction';

import {
    fetchNodeParents,
    fetchNodeChildren
} from '../actions/hierarchyAction';
import {
    fetchNode,
    fetchNodeAttributes,
    fetchNodeFavorableFullNames,
    fetchNodeFullNames,
    fetchNodePredecessors,
    fetchNodeSuccessors
} from '../actions/nodeAction';
import { useTranslation } from 'react-i18next';
import { codeAttributes } from '../constants/variables';
import EditButtons from './EditButtons';
import { isAdmin } from '../actions/userAction';
import moment from 'moment';
import NewUpperUnit from './NewUpperUnit';

// eslint-disable-next-line complexity
const NodeDetails = (props) => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const [attributeData, setAttributeData] = useState(false);
    const [modified, setModified] = useState({});
    const [modifiedParents, setModifiedParents] = useState({});

    const uniqueIdAttribute = props.node
        ? { 'key': 'unique_id', 'value': props.node.uniqueId, startDate: null, endDate: null }
        : { 'key': 'unique_id', 'value': t('no_value'), startDate: null, endDate: null };

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
    let validityData = props.node ? [props.node] : false;

    const isCurrent = datesOverlap(
        props.node?.startDate && new Date(Date.parse(props.node.startDate)),
        props.node?.endDate && new Date(Date.parse(props.node.endDate)),
        props.selectedDay
    );
    const isPast = !isCurrent && props.node?.endDate && new Date(Date.parse(props.node.endDate)).getTime() <= props.selectedDay.getTime();
    const isFuture = !isCurrent && props.node?.startDate && new Date(Date.parse(props.node.startDate)).getTime() >= props.selectedDay.getTime();

    useEffect(() => {
        if (props.node) {
            validityData = props.node ? [props.node] : false;
            console.log(props.node);
            console.log(validityData);
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
    }, [props.node, props.nodeAttributes, props.nodeAttributesFuture, props.nodeAttributesHistory]);

    const pastFutureFilter = (data) => {
        if (isCurrent || props.showComing || props.showHistory) {
            return data;
        }
        return [];
    };

    const onValueChange = (event, elem) => {
        if (modified[elem.id]) {//element has already been modified at least once, because its found in modified array
            const target = { ...modified[elem.id], [event.target.name]: event.target.value , validity: false, 'err': '' };//makes copy of modified[elem.id] and updates its value with event.target.value
            setModified({ ...modified, [elem.id]: target });//updates row
        } else {//This is the first time this element is modified so its not found in modified array
            const target = { ...elem, [event.target.name]: event.target.value, validity: false, 'err': '' };//creates a new elem object based on elem object and updates its value with event.target.value
            setModified({ ...modified, [elem.id]: target, 'err': '' });//adds this new object in modified map
        }
    };


    const onDateChange = (dateChanged) => {
        let elem = dateChanged.elem;
        let date = moment(dateChanged.date).utcOffset(0).format('YYYY-MM-DDTHH:mm:ss.sss+00:00');
        if (date === 'Invalid date') {
            date = null;
        }
        let name = dateChanged.whichDate; //startDate or endDate

        if (modified[elem.id]) {//element has already been modified at least once, because its found in modified array
            const target = { ...modified[elem.id], [name]: date, validity: dateChanged.validity, 'err': '' };//makes copy of modified[elem.id] and updates its value with date
            setModified({ ...modified, [elem.id]: target });//updates row
        } else {//This is the first time this element is modified so its not found in modified array
            const target = { ...elem, [name]: date, validity: dateChanged.validity, 'err': '' };//creates a new elem object based on elem object and updates its value with date
            setModified({ ...modified, [elem.id]: target });//adds this new object in modified map
    };

    const onParentDateChange = (dateChanged) => {
        let elem = dateChanged.elem;
        let date = moment(dateChanged.date).utcOffset(0).format('YYYY-MM-DDTHH:mm:ss.sss+00:00');
        if (date === 'Invalid date') {
            date = null;
        }
        let name = dateChanged.whichDate;
        let hierarchyIndex = elem.hierarchies.findIndex((obj => obj.hierarchy === dateChanged.hierarchy));
        if (name === 'startDate') {
            elem.hierarchies[hierarchyIndex].startDate = date;
        }
        if (name === 'endDate') {
            elem.hierarchies[hierarchyIndex].endDate = date;
        }
        if (modifiedParents[elem.id]) {
            setModifiedParents({ ...modifiedParents, [elem.id]: elem });
        } else {
            setModifiedParents({ ...modifiedParents, [elem.id]: elem });
        }
    };

    return (
        <div>
            {props.nodeAttributes &&
                <>
                    {isAdmin(props.user) ? <EditButtons modifiedParents={modifiedParents} setModified={setModified} node={props.node} selectedDay={props.selectedDay} selectedHierarchy={props.selectedHierarchy} modified={modified} /> : null }
                    <div className="right-side">
                        <div>
                            <h3>{props.favorableNames[lang === 'ia' && 'fi' || lang]?.[0]?.name}</h3>
                        </div>
                        <NodeDetailsTable
                            selectedDay={props.selectedDay}
                            type='key-value'
                            heading='valid_dates'
                            tableLabels={[]}
                            contentData={validityData ? [...validityData.map((elem => {
                                if (modified[elem.id]) {
                                    return modified[elem.id];
                                }
                                return elem;
                            }))] : validityData }
                            hasValidity={true}
                            onValueChange={onValueChange}
                            onDateChange={onDateChange}
                            fullname={false}
                        />
                        <NodeDetailsTable
                            selectedDay={props.selectedDay}
                            type='key-value'
                            heading='name_info'
                            tableLabels={['text_language_header', 'name']}
                            contentData={nameInfoDataOrderedByLanguage ? [...nameInfoDataOrderedByLanguage.map((elem => {
                                if (modified[elem.id]) {
                                    return modified[elem.id];
                                }
                                return elem;
                            }))] : nameInfoDataOrderedByLanguage }
                            hasValidity={true}
                            dataFilter={pastFutureFilter}
                            onValueChange={onValueChange}
                            onDateChange={onDateChange}
                            fullname={false}
                        />
                        <NodeDetailsTable
                            selectedDay={props.selectedDay}
                            type='key-value'
                            heading='display_name_info'
                            tableLabels={['text_language_header', 'name']}
                            contentData={[...(props.displayNames.fi || []), ...(props.displayNames.sv || []), ...(props.displayNames.en || [])].filter(n => n).map(dn => ({ ...dn, key: `name_${dn.language.toLowerCase()}`, value: dn.name }))}
                            hasValidity={true}
                            dataFilter={pastFutureFilter}
                            fullname={true}
                            onValueChange={onValueChange}
                            onDateChange={onDateChange}
                        />
                        <NodeDetailsTable
                            selectedDay={props.selectedDay}
                            type='key-value'
                            heading='codes'
                            tableLabels={['code_namespace', 'value']}
                            contentData={codeAttributesData ? [...codeAttributesData.map((elem => {
                                if (modified[elem.id]) {
                                    return modified[elem.id];
                                }
                                return elem;
                            }))]: codeAttributesData }
                            hasValidity={true}
                            dataFilter={data => (isPast || isFuture) && !(props.showHistory || props.showComing) ? data.filter(attr => attr.key === 'unique_id') : data}
                            onValueChange={onValueChange}
                            onDateChange={onDateChange}
                            fullname={false}
                        />
                        <NodeDetailsTable
                            selectedDay={props.selectedDay}
                            type='key-value'
                            heading='unit_type'
                            tableLabels={[]}
                            contentData={typeAttributeData ? [...typeAttributeData.map((elem => {
                                if (modified[elem.id]) {
                                    return modified[elem.id];
                                }
                                return elem;
                            }))]: typeAttributeData }
                            hasValidity={true}
                            dataFilter={pastFutureFilter}
                            onValueChange={onValueChange}
                            onDateChange={onDateChange}
                            fullname={false}
                        />
                        <NodeDetailsTable
                            selectedDay={props.selectedDay}
                            type='node-hierarchy'
                            heading='upper_units'
                            tableLabels={['unit', 'hierarchies', 'hierarchy_valid']}
                            contentData={props.parents[lang === 'ia' && 'fi' || lang]}
                            hasValidity={false}
                            dataFilter={pastFutureFilter}
                            onValueChange={onValueChange}
                            onDateChange={onParentDateChange}
                            fullname={false}
                        />
                        <NewUpperUnit />
                        <NodeDetailsTable
                            selectedDay={props.selectedDay}
                            type='node-hierarchy'
                            heading='subunits'
                            tableLabels={['unit', 'hierarchies', 'hierarchy_valid']}
                            contentData={props.children[lang === 'ia' && 'fi' || lang]}
                            hasValidity={false}
                            dataFilter={pastFutureFilter}
                            onValueChange={onValueChange}
                            onDateChange={onDateChange}
                            fullname={false}
                        />
                        <NodeDetailsTable
                            selectedDay={props.selectedDay}
                            type='name-validity'
                            heading='predecessors'
                            tableLabels={['name', 'valid_dates', 'predecessor_edge_valid']}
                            contentData={props.predecessors[lang === 'ia' && 'fi' || lang]}
                            hasValidity={false}
                            onValueChange={onValueChange}
                            onDateChange={onDateChange}
                            fullname={false}
                        />
                        <NodeDetailsTable
                            selectedDay={props.selectedDay}
                            type='name-validity'
                            heading='successors'
                            tableLabels={['name', 'valid_dates', 'successor_edge_valid']}
                            contentData={props.successors[lang === 'ia' && 'fi' || lang]}
                            hasValidity={false}
                            onValueChange={onValueChange}
                            onDateChange={onDateChange}
                            fullname={false}
                        />
                        <NodeDetailsTable
                            selectedDay={props.selectedDay}
                            type='key-value'
                            heading='other_attributes'
                            tableLabels={['attribute', 'value']}
                            contentData={sortedOtherAttributesData ? [...sortedOtherAttributesData.map((elem => {
                                if (modified[elem.id]) {
                                    return modified[elem.id];
                                }
                                return elem;
                            }))] : sortedOtherAttributesData }
                            hasValidity={true}
                            dataFilter={pastFutureFilter}
                            onValueChange={onValueChange}
                            onDateChange={onDateChange}
                            fullname={false}
                        />
                    </div>
                </>
            }
        </div>
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
    favorableNames: state.nrd.nodeFavorableNames,
    selectedHierarchy: state.tree.selectedHierarchy,
    user : state.ur.user
});

const mapDispatchToProps = dispatch => ({
    onSwitchHistory: (input) => {
        dispatch(switchHistory(input));
    },
    onSwitchComing: (input) => {
        dispatch(switchComing(input));
    },
    fetchNodeDetails: (node, selectedDay, showHistory, showComing, selectedHierarchy) => {
        dispatch(fetchNodePredecessors(node.uniqueId, selectedDay));
        dispatch(fetchNodeSuccessors(node.uniqueId, selectedDay));
        dispatch(fetchNodeFavorableFullNames(node.uniqueId, selectedDay));
        if (!(showHistory || showComing)) {
            dispatch(fetchNodeAttributes(node.uniqueId, selectedDay, selectedHierarchy));
            dispatch(fetchNodeParents(node.uniqueId, selectedDay));
            dispatch(fetchNodeChildren(node.uniqueId, selectedDay));
            dispatch(fetchNodeFullNames(node.uniqueId, selectedDay));
        }
    },
    fetchNode: (uniqueId) => dispatch(fetchNode(uniqueId))
});

export default connect(mapStateToProps, mapDispatchToProps)(NodeDetails);
