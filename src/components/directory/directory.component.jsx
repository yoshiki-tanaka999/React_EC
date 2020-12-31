import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDirectorySections } from '../../redux/directory/directory.selectors';

import MenuItem from '../menu-item/menu-item.component.jsx';

import './directory.styles.scss';

// おそらく、classは、state, propsなどを利用する際、起点となるコンポーネントで書かれる
const  Directory = ({ sections }) =>  (
    <div className='directory-menu'>
        { 
            // map関数で、state.sections内のデータを参照
            // プロパティを引数として渡す
            // スプレッド構文でPropsを渡す
            sections.map(({ id, ...otherSectionProps}) => (
                // MenuItemコンポーネントで利用する、プロパティをpropsとして渡してあげる
                <MenuItem key={ id } {...otherSectionProps}/>
            ))}
    </div>
);

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);