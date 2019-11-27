import React from 'react';
import { Segment, Button, Input, Icon } from 'semantic-ui-react';
import firebase from '../../firebase';

class MessageForm extends React.Component {

    state = {
        message: '',
        channel: this.props.currentChannel,
        loading: false,
        user: this.props.currentUser,
        errors: [],

    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    createMessage = () => {
        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.state.user.uid,
                name: this.state.user.displayName,
                avatar: this.state.user.photoURL

            },
            content: this.state.message
        };
        return message;
    }

    sendMessage = () => {
        const { messagesRef } = this.props;
        const { message, channel } = this.state;

        if (message) {
            this.setState({ loading: true });
            messagesRef
                .child(channel.id)
                .push()
                .set(this.createMessage())
                .then(() => {
                    this.setState({ loading: false, message: '', errors: [] })
                })
                .catch(err => {
                    console.error(err);
                    this.setState({
                        loading: false,
                        errors: this.state.errors.concat(err)

                    })
                })
        } else {
            this.setState({
                errors: this.state.errors.concat({ message: 'Ecrivez un message' })
            })
        }

    }


    render() {

        const { errors, message, loading } = this.state;

        return (
            <Segment className="message__form">
                <Input
                    fluid
                    name="message"
                    value={message}
                    onChange={this.handleChange}
                    placeholder="répondre ici"
                    style={{ marginBottom: '0.7em' }}
                    label={< Button icon={'add'} />}
                    className={
                        errors.some(error => error.message.includes('message')) ? 'error' : ''
                    }
                    icon={<Icon name='send' inverted circular link onClick={this.sendMessage} />}

                />
                {/** 

                    <Button.Group icon widths="2">
                    <Button
                        color="green"
                        content="Répondre"
                        onClick={this.sendMessage}
                        labelPosition=""
                        disabled={loading}
                        icon="edit"
                    />

                    <Button
                        color="blue"
                        content="Image"
                        labelPosition="right"
                        icon="cloud upload"
                    />

                </Button.Group>

                */}
            </Segment>
        )
    }
}

export default MessageForm;