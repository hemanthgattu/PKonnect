import React, { Component } from 'react';

import { Container, Row, Col } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div>

                <Container fluid>
                    <Row>
                        <Col>  {this.props.children}</Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
