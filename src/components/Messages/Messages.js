import React from 'react';
import { Segment, Comment, MessageHeader, Grid, Button } from 'semantic-ui-react';
import firebase from '../../firebase';
import MessageForm from './MessageForm';
import MessagesHeader from './MessagesHeader';
import Message from './Message';
import { connect } from 'react-redux';
import { setMessageList } from '../../actions';



class Messages extends React.Component {

    state = {
        messagesRef: firebase.database().ref('messages'),
        messages: [],
        messagesLoading: true,
        channel: this.props.currentChannel,
        user: this.props.currentUser
    }


    componentDidMount() {
        const { channel, user } = this.state;

        if (channel && user) {
            this.addListeners(channel.id);
        }
    }

    addListeners = channelId => {
        this.addMessageListener(channelId);
    }

    addMessageListener = channelId => {
        let loadedMessages = [];
        this.state.messagesRef.child(channelId).on('child_added', snap => {
            loadedMessages.push(snap.val());
            console.log(loadedMessages);
            this.props.setMessageList(loadedMessages)
            this.setState({
                messages: loadedMessages,
                messagesLoading: false
            });
        });
    };


    handleRemove = (message, user, channel) => {

        console.log(message.timestamp + " time");
        console.log((message.user.id === user.id));
        console.log(firebase.database().ref(+ message.timestamp));
        //console.log(channel.id);
        //firebase.database().ref('messages/' + '-LuhLP7SZBBS61Tv9YqZ/' + '-LuhLR0kgn4QX9NZI2uT').remove();

        if (message.user.id === user.id) {

            /*   this.state.messagesRef.child(channel.id).on('child_removed', snap => {
               messages.pop(snap.val());
               console.log(messages);
               this.setState({
               messages: messages,
               messagesLoading: false  
               
           });  
       } 
       ); */

            //this.state.messagesRef.ref('-Luc_nVWMKE_iUxhDjKj').remove();





        }

    }

    displayMessages = (messages, user, channel) => (
        messages.length > 0 && messages.map(message => (
            <Message

                message={message}
                user={this.state.user}
                channel={this.state.channel}

            />
            /*  <Grid>
                 
                  <Grid.Column >
                      <Button onClick={ (event) => this.handleRemove(message,user , channel)}>Supprimer</Button>
                  </Grid.Column>
              </Grid> */




        )
        )
    )





    render() {

        const { messagesRef, messages, channel, user } = this.state
        return (
            <React.Fragment>
                <Segment>
                    <Comment.Group className="messages">
                        {this.displayMessages(messages, user)}
                    </Comment.Group>
                </Segment>

                <MessageForm
                    messagesRef={messagesRef}
                    currentChannel={channel}
                    currentUser={user}
                />
            </React.Fragment>
        )
    }
}


export default connect(
    null,
    { setMessageList }
)(Messages);