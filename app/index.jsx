import ReactDOM from 'react-dom';
import React from 'react';
import LFGList from './components/LFGList.jsx';
import UserBox from './components/UserBox.jsx';

ReactDOM.render(
    <LFGList lfgs={LFGS}/>,
    document.getElementById('content')
);

ReactDOM.render(
    <UserBox user={USER}/>,
    document.getElementById('sidebar')
);
