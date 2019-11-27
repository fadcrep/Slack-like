import React from 'react';
import { Comment, Popup, Grid, Button } from 'semantic-ui-react';
import moment from 'moment';
import firebase from 'firebase';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";


const isOwnMessage = (message, user) => {
    return message.user.id === user.uid ? 'message__self' : '';
};

const handleRemove = (message, user, channel, messages) => {




    if (message.user.id === user.uid) {
        firebase
            .database()
            .ref('messages')
            .child(channel.id)
            .child(message.id)
            .remove()
            .then();
        console.log("message delete");
        window.location.reload(false);


    }
};


const timefromNow = timestamp => moment(timestamp).fromNow();

const Message = ({ message, user, channel, messages }) => (

    < Comment >
        <Comment.Avatar src={message.user.avatar} />
        <Comment.Content className={isOwnMessage(message, user)}>
            <Comment.Author as="a"> {message.user.name}</Comment.Author>
            <Comment.Metadata>{timefromNow(message.timestamp)}</Comment.Metadata>

            <Popup
                trigger={<Comment.Text>{message.content}</Comment.Text>}
                flowing hoverable>

                <Grid.Column textAlign='center' className={message.user.id === user.uid ? '' : 'hidePopup'}>

                    <Button onClick={(event) => handleRemove(message, user, channel)}>Supprimer</Button>


                </Grid.Column>
            </Popup>
        </Comment.Content>

    </Comment >
)


export default Message;