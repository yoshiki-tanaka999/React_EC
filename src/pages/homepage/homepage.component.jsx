import React from 'react';

import Directory from '../../components/directory/directory.component.jsx';

import { HomePageContainer } from './homepage.styles';

const HomePage = () => (
    <HomePageContainer>
        {/* Directoryに移動 */}
        <Directory />
    </HomePageContainer>
);
export default HomePage;