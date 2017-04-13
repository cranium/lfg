import ReactDOM from 'react-dom';
import React from 'react';
import LFGList from './components/LFGList.jsx';

ReactDOM.render(
    <LFGList lfgs={LFGS}/>,
    document.getElementById('content')
);
