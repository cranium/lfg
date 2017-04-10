import React from 'react';
import ReactDOM from 'react-dom';

class LFG extends React.Component {
    render () {
        var name = "hello";
        var id = 1;

        return (
            <div className="lfg--block lfg--padding-1 lfg--margin-bottom-4">
                <div className="lfg--flex-row">
                    <div className="lfg--position-relative">
                        <img className="lfg--display-block-" src={ this.props.avatar_url } width="86" height="86" />
                            <span className="lfg--image-caption lfg--color-success">+1</span>
                    </div>
                    <div className="lfg--flex-grow-1 lfg--flex-basis-0" style={{height: 100 + '%'}}>
                        <p className="lfg--margin-0 lfg--padding-vert-2 lfg--text-uppercase lfg--text-bold">{ name }</p>
                        <p className="lfg--margin-0 lfg--padding-vert-2 lfg--color-secondary">
                            <span className="lfg--tag"><i className="material-icons lfg--tag-icon">mic</i> mic required</span>
                        </p>
                        <div className="lfg--margin-0 lfg--padding-vert-2">
                            <div className="lfg--progress-bar-outer lfg--position-relative">
                                <span className="lfg--progress-bar-label">1/10</span>
                                <div className="lfg--progress-bar-inner" style={{width: 20 + '%' }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="lfg--text-right">
                        <a className="lfg--button" href={"/group/" + id }>Join</a>
                    </div>
                </div>
            </div>
    );
    }
}

class MyClass extends React.Component {
    render () {
        var rows = this.props.lfgs.map((lfg) =>
            <LFG {...lfg} />
        );

        return (<div>{rows}</div>);
    }
}

ReactDOM.render(
    <MyClass lfgs={LFGS}/>,
    document.getElementById('content')
);
