import React from 'react';
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

// directoryコンポーネントから渡された、propsを引数にする
const menuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
    // 渡されたdataで、動的にスタイリングする
    <div 
        className={`${size} menu-item`} 
        onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
        <div 
            className='background-image' 
            style={{
                backgroundImage: `url(${imageUrl})`
            }}
        />
            <div className='content'>
                <h1 className='title'>{ title.toUpperCase() }</h1>                
                <span className='sub-title'>SHOP NOW</span>                
            </div>
    </div>
);

export default withRouter(menuItem);