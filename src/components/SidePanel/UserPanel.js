import React from 'react';
import firebase from '../../firebase';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';


class UserPanel extends React.Component {

    state = {
        user: this.props.currentUser

    }

    dropdownOptions = () => [
        {
            key: 'user',
            text: <span> Connecté  <strong>({this.state.user.displayName})</strong></span>,
            disabled: true
        },
        {
            key: 'avatar',
            text: <span>Changer l'avatar</span>
        },

        {
            key: 'signout',
            text: <span onClick={this.handleSignout}>Se déconnecter</span>
        },
    ];

    handleSignout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => console.log("signed out!"));
    }

    render() {
        const { user } = this.state;

        return (
            <Grid style={{ background: '#4c3c4C' }}>
                <Grid.Column>
                    <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
                        {/*  App header */}
                        <Header inverted floated="left" as="h3">
                            <Icon name="code" />
                            <Header.Content>EstiamChat</Header.Content>
                        </Header>
                    </Grid.Row>

                    {/* User Dropdown */}

                    <Header style={{ padding: '0.25em' }} as="H4" inverted>
                        <Dropdown trigger={
                            <span>
                                <Image src={user.photoURL} spaced="right" avatar />
                                {user.displayName}
                            </span>
                        } options={this.dropdownOptions()} />
                    </Header>
                </Grid.Column>

            </Grid >

        )
    }
}




export default UserPanel;