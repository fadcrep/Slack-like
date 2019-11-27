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
        key: '',
        messageRef: firebase.database().ref('messages')


    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    /* createMessage = () => {
         const { messagesRef } = this.props;
         const key = messagesRef.push().key;
         const copy = Object.assign({}, this.state);
         copy['key'] = key;
         this.setState(copy);
         const message = {
             id: key,
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
         const { message, channel, key } = this.state;
 
         if (message) {
             const newMessage = this.createMessage()
             this.setState({ loading: true });
             messagesRef
                 .child(channel.id)
                 .push()
                 .set(newMessage)
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
 
     } */


    addMessage = () => {
        const { messageRef, channel, message, user } = this.state;
        const key = messageRef.push().key;
        if (message) {
            const newMessage = {
                id: key,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: {
                    id: user.uid,
                    name: user.displayName,
                    avatar: user.photoURL

                },
                content: message


            };


            messageRef
                .child(channel.id)
                .child(key)
                .update(newMessage)
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

                    className={
                        errors.some(error => error.message.includes('message')) ? 'error' : ''
                    }
                    icon={<Icon name='send' inverted circular link onClick={this.addMessage} />}

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