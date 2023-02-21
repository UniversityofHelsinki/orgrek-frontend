import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import { changeDate } from '../actions/dayChangeAction';
import styled from 'styled-components';
import fi from 'date-fns/locale/fi';
import { Button, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
registerLocale('fi', fi);

const TodayButton = styled(Button)`
  background-color: #107eab;
  border-color: #107eab;
  &:hover {
    background-color: #0e688b;
  }
`;
const SelectDate = (props) => {
  const { t, i18n } = useTranslation();

  React.useEffect(() => {}, [props.selectedDay]);

  const changeToCurrentDate = () => {
    const date = new Date();
    props.onDayChange(date);
    i18n.loadNamespaces('nodeattr' + date.toLocaleDateString('EN-CA'));
  };

  return (
    <Fragment>
      <Col xs={6}>
        <DatePicker
          wrapperClassName="datePicker"
          locale="fi"
          dateFormat="dd.MM.yyyy"
          className="form-control"
          selected={props.selectedDay ? props.selectedDay : new Date()}
          onChange={(date) => {
            props.onDayChange(date);
            i18n.loadNamespaces('nodeattr' + date.toLocaleDateString('EN-CA'));
          }}
        />
      </Col>
      <Col xs={6}>
        <TodayButton
          className="returnTodayButton"
          onClick={changeToCurrentDate}
        >
          {t('return_to_today')}
        </TodayButton>
      </Col>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  selectedDay: state.dr.selectedDay,
});

const mapDispatchToProps = (dispatch) => ({
  onDayChange: (day) => {
    console.log(day);
    dispatch(changeDate(day));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectDate);
