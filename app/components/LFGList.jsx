import React from 'react';
import LFG from './LFGListItem.jsx';

class LFGList extends React.Component {
    render () {
        var rows = this.props.lfgs.map((lfg) =>
            <LFG key={lfg.id} {...lfg} />
        );

        return (<div>{rows}</div>);
    }
}

module.exports = LFGList;
