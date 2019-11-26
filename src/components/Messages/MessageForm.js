import React from 'react';
import { Segment, Button, Input } from 'semantic-ui-react'

class MessageForm extends React.Component {
    render() {
        return (
            <Segment className="message__form">
                <Input
                    fluid
                    name="message"
                    placeholder="répondre ici"
                    style={{ marginBottom: '0.7em' }}
                    label={< Button icon={'add'} />}
                />
                <Button.Group icon widths="2">
                    <Button
                        color="green"
                        content="Répondre"
                        labelPosition=""
                        icon="edit"
                    />

                    <Button
                        color="blue"
                        content="Image"
                        labelPosition="right"
                        icon="cloud upload"
                    />

                </Button.Group>
            </Segment>
        )
    }
}

export default MessageForm;