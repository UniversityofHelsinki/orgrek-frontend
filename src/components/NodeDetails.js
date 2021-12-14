import React from 'react';
import { connect } from 'react-redux';
import NodeDetailsTable from './NodeDetailsTable';
import NodeViewControl from './NodeViewControl';
import { parseDisplayNames } from '../actions/utilAction';
import { useTranslation } from 'react-i18next';

const NodeDetails = (props) => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const codeAttributes = [
        'unique_id',
        'talous_tunnus',
        'lyhenne',
        'hr_lyhenne',
        'hr_tunnus',
        'tutkimus_tunnus',
        'oppiaine_tunnus',
        'oppiaine_surrogaatti',
        'laskutus_tunnus',
        'mainari_tunnus',
        'emo_lyhenne',
        'iam_ryhma'];

    const isCodeAttribute = (elem) => {
        return codeAttributes.includes(elem);
    };

    const orderCodeAttributes = (elems) => {
        const result = [];
        props.node.unique_id ? result.push({ 'key': 'unique_id', 'value': props.node.unique_id, startDate: null, endDate: null }) : result.push({ 'key': 'unique_id', 'value': t('no_value'), startDate: null, endDate: null });
        codeAttributes.map(codeAttribute => {
            const match = elems.find(elem => elem.key === codeAttribute);
            match ? result.push(match) : '';
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

    const nameInfoData = props.nodeAttributes ? props.nodeAttributes.filter(elem => isLanguageAttribute(elem.key)) : false;
    const displayNameData = props.nodeAttributes ? parseDisplayNames(nameInfoData, props.nodeAttributes.find(elem => elem.key === 'lyhenne'), props.nodeAttributes.find(elem => elem.key === 'emo_lyhenne')) : false;
    const DisplayName = displayNameData ?  matchNameToLang(displayNameData) : false;
    const codeAttributesData = props.nodeAttributes ? orderCodeAttributes(props.nodeAttributes) : false;
    const typeAttributeData = props.nodeAttributes ? props.nodeAttributes.filter(elem => elem.key === 'type') : false;
    const otherAttributesData = props.nodeAttributes ? props.nodeAttributes.filter(elem => !isCodeAttribute(elem.key) && elem.key !== 'type' && !isLanguageAttribute(elem.key)) : false;
    const validityData = props.node ? [props.node] : false;
    const parentsData = props.parents ? props.parents : false;
    const childrenData = props.children ? props.children : false;
    const predecessorData = props.predecessors ? props.predecessors : false;
    const successorsData = props.successors ? props.successors : false;
    React.useEffect(() => {
    }, [props.nodeAttributes]);

    return (
        <>
        {props.nodeAttributes &&
            <>
                <h3>{DisplayName}</h3>
                <NodeViewControl />
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
    parents : state.hr.parents,
    children : state.hr.children,
    predecessors : state.nrd.nodePredecessors,
    successors : state.nrd.nodeSuccessorsconst,
    selectedDay: state.dr.selectedDay,
});

export default connect(mapStateToProps)(NodeDetails);
