import { Button, Col, Row } from 'react-bootstrap';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const EditButtons = () => {
    const { t, i18n } = useTranslation();

    const [edit, setEdit] = useState(false);

    const toggleEdit = () => {
        setEdit(!edit);
    };

    return (
        <div>
            {edit ? (
                <Row>
                    <Col md="auto">
                        <Button size="sm" variant="warning" onClick={toggleEdit}>
                            {t('texts_cancel_button')}
                        </Button>
                    </Col>
                    <Col>
                        <Button size="sm" variant="success" onClick={toggleEdit}>
                            {t('texts_save_button')}
                        </Button>
                    </Col>
                </Row>
            ) : (
                <Button size="sm" onClick={toggleEdit}>
                    {t('texts_edit_button')}
                </Button>)}
        </div>
    );

};

export default EditButtons;
