import React from 'react';
import styled from '@emotion/styled';

const ExternalLinks = {
    LINKEDIN: 'https://www.linkedin.com/in/emrerdem94/',
    GITHUB: 'https://github.com/emrerdem1/teeter-totter-game',
};

const ContactContainer = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;

    a {
        height: 50%;

        :first-child {
            margin-right: 1em;
        }

        img {
            height: 100%;
        }
    }
`;

const ContactView: React.FC = () => {
    return (
        <ContactContainer>
            <a href={ExternalLinks.GITHUB} rel="noopener noreferrer" target="_blank">
                <img src="/github.svg" alt="github icon" />
            </a>
            <a href={ExternalLinks.LINKEDIN} rel="noopener noreferrer" target="_blank">
                <img src="/linkedin.svg" alt="linkedin icon" />
            </a>
        </ContactContainer>
    );
};

export default ContactView;
