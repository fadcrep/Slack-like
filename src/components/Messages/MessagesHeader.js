import React from 'react';
import { Segment, Icon, Header, Input } from 'semantic-ui-react'

class MessagesHeader extends React.Component {
    render() {
        return (
            <Segment clearing>

                {/* Chennel Title */}

                <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
                    <span>
                        Channel
                        <Icon name={"star outline"} color="black" />
                    </span>
                    <Header.Subheader>2 users</Header.Subheader>
                </Header>

                {/* Chennel Search Input */}
                <Header floated="right">
                    <Input
                        size="mini"
                        icon="search"
                        name="searchTerm"
                        placeholder="Search Messages"
                    />

                </Header>

            </Segment >

        )
    }
}

export default MessagesHeader;