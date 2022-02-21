import React, { useState } from 'react';
import { connect } from 'react-redux';
import NodeDetailsTable from './NodeDetailsTable';
import NodeViewControl from './NodeViewControl';
import { parseDisplayNames, filterAttributeDuplicates, filterNodeDuplicates } from '../actions/utilAction';
import { useTranslation } from 'react-i18next';
import { codeAttributes } from '../constants/variables';

const NodeDetails = (props) => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const [attributeData, setAttributeData] = useState(false);
    const [parentsData, setParentsData] = useState(false);
    const [childrenData, setChildrenData] = useState(false);

    const isCodeAttribute = (elem) => {
        return codeAttributes.includes(elem);
    };

    const orderCodeAttributes = (elems) => {
        const result = [];
        props.node ? result.push({ 'key': 'unique_id', 'value': props.node.unique_id, startDate: null, endDate: null })
                    : result.push({ 'key': 'unique_id', 'value': t('no_value'), startDate: null, endDate: null });
        codeAttributes.map(codeAttribute => {
            for (let i = 0, len = elems.length; i < len; i++) {
                const match = elems[i].key === codeAttribute;
                match ? result.push(elems[i]) : '';
            }
        });

        return result;
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
        } else if (props.showHistory && props.nodeAttributesHistory) {
            setAttributeData(props.nodeAttributesHistory);
            setChildrenData(props.childrenHistory);
            setParentsData(props.parentsHistory);
        } else if (props.showComing && props.nodeAttributesFuture) {
            setAttributeData(props.nodeAttributesFuture);
            setChildrenData(props.childrenFuture);
            setParentsData(props.parentsFuture);
        } else {
            setAttributeData(props.nodeAttributes);
            setChildrenData(props.children);
            setParentsData(props.parents);
        }
    };

    const nameInfoData = attributeData ? attributeData.filter(elem => isLanguageAttribute(elem.key)) : false;
    const displayNameData = attributeData ? parseDisplayNames(nameInfoData, attributeData.find(elem => elem.key === 'lyhenne'), attributeData.find(elem => elem.key === 'emo_lyhenne')) : false;
    const DisplayName = displayNameData ?  matchNameToLang(displayNameData) : false;
    const codeAttributesData = attributeData ? orderCodeAttributes(attributeData) : false;
    const typeAttributeData = attributeData ? attributeData.filter(elem => elem.key === 'type') : false;
    const otherAttributesData = attributeData ? attributeData.filter(elem => !isCodeAttribute(elem.key) && elem.key !== 'type' && !isLanguageAttribute(elem.key)) : false;
    const validityData = props.node ? [props.node] : false;
    const predecessorData = props.predecessors ? props.predecessors : false;
    const successorsData = props.successors ? props.successors : false;

    React.useLayoutEffect(() => {
        selectData(props.showHistory, props.showComing);
    }, [props.showComing, props.showHistory,
        props.parentsFuture, props.parentsHistory,
        props.childrenHistory, props.childrenFuture,
        props.children, props.parents,
        props.nodeAttributes, props.nodeAttributesHistory,
        props.nodeAttributesFuture]);

    return (
        <>
        {props.nodeAttributes &&
            <>
                <h3>{DisplayName}</h3>
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
                    contentData={nameInfoData}
                    hasValidity={true}
                />
                <NodeDetailsTable
                    selectedDay={props.selectedDay}
                    type='key-value'
                    heading='display_name_info'
                    tableLabels={['text_language_header', 'name']}
                    contentData={displayNameData}
                    hasValidity={true}
                />
                <NodeDetailsTable
                    selectedDay={props.selectedDay}
                    type='key-value'
                    heading='codes'
                    tableLabels={['code_namespace', 'value']}
                    contentData={codeAttributesData}
                    hasValidity={true}
                />
                <NodeDetailsTable
                    selectedDay={props.selectedDay}
                    type='key-value'
                    heading='unit_type'
                    tableLabels={[]}
                    contentData={typeAttributeData}
                    hasValidity={true}
                />
                <NodeDetailsTable
                    selectedDay={props.selectedDay}
                    type='node-hierarchy'
                    heading='upper_units'
                    tableLabels={['unit', 'hierarchies']}
                    contentData={parentsData}
                    hasValidity={false}
                />
                <NodeDetailsTable
                    selectedDay={props.selectedDay}
                    type='node-hierarchy'
                    heading='subunits'
                    tableLabels={['unit', 'hierarchies']}
                    contentData={childrenData}
                    hasValidity={false}
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
                    contentData={otherAttributesData}
                    hasValidity={true}
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
    successors : state.nrd.nodeSuccessorsconst,
    selectedDay: state.dr.selectedDay,
    showHistory: state.nvrd.showHistory,
    showComing: state.nvrd.showComing
});

export default connect(mapStateToProps)(NodeDetails);
