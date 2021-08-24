import React from 'react';
import { connect } from 'react-redux';

const Footer = (props) => {
    return (
        <div>
            <hy-footer>
                <hy-footer-action
                    updated-text="Updated on 14.10.2020"
                    up-button-label="Up"
                ></hy-footer-action>
                <hy-footer-base
                    logo-label="University of Helsinki"
                    logo-url="/"
                    some-label="Follow us"
                    copyright-text="© University of Helsinki 2020"
                    data-footer-base-links='[
                      {"label": "People finder", "url": "#"},
                      {"label": "Press and media", "url": "#"},
                      {"label": "Opening hours", "url": "#"},
                      {"label": "Flamma", "url": "#"},
                      {"label": "Library", "url": "#"},
                      {"label": "Webshop", "url": "#"},
                      {"label": "About website", "url": "#"},
                      {"label": "Data protection", "url": "#"},
                      {"label": "More Data protection", "url": "#"},
                      {"label": "Accessibility", "url": "#"},
                      {"label": "Give feedback", "url": "#"}
                    ]'
                    data-footer-base-some='[
                        {"label": "Follow us on Facebook", "url": "#", "type": "facebook"},
                          {"label": "Follow us on Twitter", "url": "#", "type": "twitter"},
                          {"label": "Follow us on Youtube", "url": "#", "type": "youtube"},
                          {"label": "Follow us on LinkedIn", "url": "#", "type": "linkedin"},
                          {"label": "Follow us on Instagram", "url": "#", "type": "instagram"}
                        ]'
                >
                    <div slot="content">
                        P.O. Box 4<br/>
                        (Yliopistonkatu 3)<br/>
                        00014 University of Helsinki<br/>
                        <br/>
                        Switchboard:<br/>
                        +358 (0) 2941 911
                    </div>
                </hy-footer-base>
            </hy-footer>
        </div>
    );
};

const mapStateToProps = state => ({

});


export default connect(mapStateToProps, null)(Footer);
