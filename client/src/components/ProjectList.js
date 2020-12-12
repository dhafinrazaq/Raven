import React, { Component } from 'react'
import {
    Container, ListGroup, ListGroupItem, Button
} from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuid } from 'uuid';

export class ProjectList extends Component {
    state = {
        projects: [
            {id: uuid(), name: 'trackr'},
            {id: uuid(), name: 'trackr2'},
            {id: uuid(), name: 'trackr3'},
        ]
    }
    render() {
        const { projects } = this.state;
        return (
            <Container>
                <Button 
                    color="dark" 
                    style={{marginBottom: '2rem'}} 
                    onClick={() => {
                        const name = prompt('Enter project');
                        if (name) {
                            this.setState(state => ({
                                projects: [...state.projects, { id: uuid(), name }]
                            }));
                        }
                    }}>Add Project
                </Button>

                <ListGroup horizontal>
                    {/* <TransitionGroup className="project-list"> */}
                        {projects.map(({ id, name }) => (
                            // <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className= "remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={() => {
                                            this.setState(state => ({
                                                projects: state.projects.filter(project => project.id !== id)
                                            }))
                                        }}>x
                                    </Button>
                                    {name}
                                </ListGroupItem>
                            // </CSSTransition>
                        ))}
                    {/* </TransitionGroup> */}
                </ListGroup>
            </Container>
        )
    }
}

export default ProjectList
