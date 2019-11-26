import React from 'react';
import { Segment, Comment, MessageHeader } from 'semantic-ui-react';
import firebase from '../../firebase';
import MessageForm from './MessageForm';
import MessagesHeader from './MessagesHeader';



class Messages extends React.Component {

    state = {
        messagesRef: firebase.database().ref('message')

    }
    render() {


        return (
            <React.Fragment>
                <MessagesHeader />
                <Segment>
                    <Comment.Group className="messages">

                    </Comment.Group>
                </Segment>

                <MessageForm />
            </React.Fragment>
        )
    }
}


export default Messages;