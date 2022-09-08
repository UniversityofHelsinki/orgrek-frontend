/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import NodeDetailsTable from './NodeDetailsTable';
import NodeViewControl from './NodeViewControl';
import { filterAttributeDuplicates, datesOverlap } from '../actions/utilAction';
import { switchHistory, switchComing, updateAttributes } from '../actions/nodeViewAction';

import {
    fetchNodeParents,
    fetchNodeChildren
} from '../actions/hierarchyAction';
import {
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
import { Button, Col, Row } from 'react-bootstrap';
import moment from 'moment';

// eslint-disable-next-line complexity
const NodeDetails = (props) => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const [attributeData, setAttributeData] = useState(false);
    const [edit, setEdit] = useState(false);
    const FEEDBACK_TIMEOUT_MS = 10000;
    const [feedback, setFeedback] = useState();
    const [awaitingSaveFeedback, setAwaitingSaveFeedback] = useState(false);
    const [feedbackTimeoutID, setFeedbackTimeoutID] = useState();
    const [modified, setModified] = useState({}); //{} makes map. Change map to list when sending to backend
    //const [newrowdata, setNewrowdata] = useState([]); //{} makes map. Change map to list when sending to backend

    const toggleEdit = (newMode) => {
         if (!newMode) {
             setModified({});//initialize modified map, when cancel button presses. When response got after
             //save button pressed, modidied should be initialized.
         }
        setEdit(newMode);
    };
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
    const validityData = props.node ? [props.node] : false;

    const isCurrent = datesOverlap(
        props.node?.startDate && new Date(Date.parse(props.node.startDate)),
        props.node?.endDate && new Date(Date.parse(props.node.endDate)),
        props.selectedDay
    );
    const isPast = !isCurrent && props.node?.endDate && new Date(Date.parse(props.node.endDate)).getTime() <= props.selectedDay.getTime();
    const isFuture = !isCurrent && props.node?.startDate && new Date(Date.parse(props.node.startDate)).getTime() >= props.selectedDay.getTime();

    useEffect(() => {
        if (feedbackTimeoutID) {
            clearTimeout(feedbackTimeoutID);
        }
    }, []);

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
            if (awaitingSaveFeedback) {
                if (feedbackTimeoutID) {
                    clearTimeout(feedbackTimeoutID);
                }
                setFeedbackTimeoutID(setTimeout(setFeedback, FEEDBACK_TIMEOUT_MS));
                setAwaitingSaveFeedback(false);
                setFeedback(props.feedback);
            }
        }
    }, [props.node, props.showComing, props.showHistory, props.selectedHierarchy, props.feedback]);

    React.useLayoutEffect(() => {
        selectData();
    }, [props.nodeAttributes, props.nodeAttributesFuture, props.nodeAttributesHistory]);

    const pastFutureFilter = (data) => {
        if (isCurrent || props.showComing || props.showHistory) {
            return data;
        }
        return [];
    };

    /*const addNewrow = (event) => {
    ==============================================================================================================
        Jokaiselle NodeDetailsTable:lle (jota voi editoida/lisätä riveja) lisättävä oma newrowdata array, että osaa tulostaa
        kuhunkin kohtaan oikeat tyhjät rivit, (jotka sit täytetään ja lisätään kantaan jne....)
    ==============================================================================================================
            //newrowdata.length +1 ni saat arvon tohon alle key:
            //se on tiedettävä, jos päivittää jälkeenpäin kys. riviä.
            //const target = { key: '17',value: 'lili' };//creates a ne elem object
            //setNewrowdata([{ ...newrowdata, '17': target }]);//adds new empty object in modified array
           //- piti laitta toho riville yllä [{ ...newrowdata, '17': target }] muuten ei toiminu
        let index = modified.length +1;
        setModified([{ ...modified, index:[{ key: '',value: '' }] }]);
    };*/

    const onValueChange = (event, elem) => {
        if (modified[elem.id]) {//element has already been modified at least once, because its found in modified array
            const target = { ...modified[elem.id], [event.target.name]: event.target.value };//makes copy of modified[elem.id] and updates its value with event.target.value
            setModified({ ...modified, [elem.id]: target });//updates row
        } else {//This is the first time this element is modified so its not found in modified array
            const target = { ...elem, [event.target.name]: event.target.value };//creates a new elem object based on elem object and updates its value with event.target.value
            setModified({ ...modified, [elem.id]: target });//adds this new object in modified map
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
            const target = { ...modified[elem.id], [name]: date };//makes copy of modified[elem.id] and updates its value with date
            setModified({ ...modified, [elem.id]: target });//updates row
        } else {//This is the first time this element is modified so its not found in modified array
            const target = { ...elem, [name]: date };//creates a new elem object based on elem object and updates its value with date
            setModified({ ...modified, [elem.id]: target });//adds this new object in modified map
        }
    };

    const saveModifiedAttributes = ()  => {
      const modifiedArr = Object.values(modified);
      //modifiedArr.map((mod,index) => console.log(index + ' = ' + mod + ' = ' + mod[index]));
      props.updatingAttributes(props.node, modifiedArr);
      setAwaitingSaveFeedback(true);
    };

    return (
        <div>
            {props.nodeAttributes &&
                <>
                    {isAdmin(props.user) ? <EditButtons /> : null }
                    <div className="organisation-unit-title">
                        <h3>{props.favorableNames[lang === 'ia' && 'fi' || lang]?.[0]?.name}</h3>
                        <NodeViewControl node={props.node} selectedDay={props.selectedDay} selectedHierarchy={props.selectedHierarchy} />
                    </div>
                    <div className="right-side">
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
    user : state.ur.user,
    feedback: state.nrd.feedback,
});

const mapDispatchToProps = dispatch => ({
    onSwitchHistory: (input) => {
        dispatch(switchHistory(input));
    },
    onSwitchComing: (input) => {
        dispatch(switchComing(input));
    },
    updatingAttributes: (node, attributes) => {
        dispatch(updateAttributes(node.uniqueId, attributes));
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NodeDetails);
