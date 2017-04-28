import React from 'react';

class UserBox extends React.Component {
    renderLoggedIn() {
        return (
            <div className="lfg--block lfg--padding-1">Welcome back, {this.props.user.name}</div>
        );
    }

    renderLoggedOut() {
        return (
            <div className="lfg--block lfg--padding-1 lfg--text-center">
                <a href="/login">
                    <img src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png" />
                </a>
            </div>
        );
    }

    render () {
        return this.props.user.logged_in ? this.renderLoggedIn() : this.renderLoggedOut();
    }
}

module.exports = UserBox;
