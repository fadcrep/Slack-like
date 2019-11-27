import React from 'react';
import { Comment, Popup, Grid, Button } from 'semantic-ui-react';
import moment from 'moment';
import firebase from 'firebase';


const isOwnMessage = (message, user) => {
    return message.user.id === user.uid ? 'message__self' : '';
};

/* handleRemove = (message, user) => {
    if (message.user.id === user.id) {
        firebase.database().ref('messages').child(message.timestamp).remove();
        console.log("message delete");
    }
}; */


const timefromNow = timestamp => moment(timestamp).fromNow();

const Message = ({ message, user }) => (
    <Comment>
        <Comment.Avatar src={message.user.avatar} />
        <Comment.Content className={isOwnMessage(message, user)}>
            <Comment.Author as="a"> {message.user.name}</Comment.Author>
            <Comment.Metadata>{timefromNow(message.timestamp)}</Comment.Metadata>

            <Popup
                trigger={<Comment.Text>{message.content}</Comment.Text>}
                flowing hoverable>

                <Grid.Column textAlign='center'>
                    <Button >Supprimer</Button>
                </Grid.Column>
            </Popup>
        </Comment.Content>

    </Comment>
)


export default Message;