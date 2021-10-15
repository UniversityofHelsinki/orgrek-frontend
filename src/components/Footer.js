import React from 'react';
import { connect } from 'react-redux';

const Footer = ( ) => {
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
                    copyright-text="© University of Helsinki 2021"
                    data-footer-base-links='[
                      {"label": "Flamma", "url": "#"},
                      {"label": "About website", "url": "#"},
                      {"label": "Accessibility", "url": "#"},
                      {"label": "Give feedback", "url": "#"}
                    ]'
                    data-footer-base-some='[
                        {"label": "Follow us on Facebook", "url": "https://www.facebook.com/HelsinkiUniversity", "type": "facebook"},
                          {"label": "Follow us on Twitter", "url": "https://twitter.com/helsinkiuni", "type": "twitter"},
                          {"label": "Follow us on Youtube", "url": "https://www.youtube.com/user/universityofhelsinki", "type": "youtube"},
                          {"label": "Follow us on LinkedIn", "url": "https://fi.linkedin.com/school/university-of-helsinki/", "type": "linkedin"},
                          {"label": "Follow us on Instagram", "url": "https://www.instagram.com/universityofhelsinki/", "type": "instagram"}
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
