import React from 'react';

class LFG extends React.Component {
    getStatusPercentage() {
        return (this.props.have / this.props.group_size)*100 + "%";
    }

    render () {
        return (
            <div className="lfg--block lfg--margin-bottom-4">
                <div className="lfg--flex-row lfg--flex-between">
                    <div className="lfg--position-relative">
                        <img className="lfg--display-block" src={ this.props.avatar_url } width="86px" height="86px"/>
                        <span className="lfg--image-caption lfg--color-success">+1</span>
                    </div>
                    <div className="lfg--margin-left-2 lfg--flex-grow-1 lfg--flex-basis-0 lfg--flex-column lfg--flex-between">
                        <div className="lfg--text-uppercase lfg--text-bold">{ this.props.name }</div>
                        <div className="lfg--color-secondary lfg--tag-list">
                            <span className="lfg--tag"><i className="material-icons lfg--tag-icon">mic</i> mic required</span>
                            <span className="lfg--tag"><i className="material-icons lfg--tag-icon">mic</i> mic required</span>
                        </div>
                        <div className="lfg--flex-row">
                            <div className="lfg--flex-basis-0 lfg--text-center lfg--margin-0 lfg--progress-bar-outer lfg--position-relative lfg--flex-grow-1">
                                <div className="lfg--progress-bar-inner" style={{width: this.getStatusPercentage()}}></div>
                                <div className="lfg--progress-bar-label lfg--padding-1">{this.props.have}/{this.props.group_size}</div>
                            </div>
                            <a className="lfg--flex-basis-0 lfg--margin-0 lfg--button lfg--margin-left-2" href={"/group/" + this.props.id }>Join</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = LFG;
