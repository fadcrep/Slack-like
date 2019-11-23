import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Form, Button, Segment, Header, Message, Icon, Container } from 'semantic-ui-react';
import firebase from '../../firebase';

class Login extends React.Component {
    state = {
        errors: [],
        email: '',
        password: '',
        loading: false


    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };



    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);



    handleSubmit = event => {
        let errors = [];
        let error;
        event.preventDefault();

        if (this.isFormValid(this.state)) {
            this.setState(({ errors: [], loading: true }));
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(signedInUser => {
                    console.log(signedInUser);
                })
                .catch(err => {
                    console.error(err);
                    this.setState({
                        errors: errors.concat(err),
                        loading: false
                    });
                })

        }
    };

    isFormValid = ({ email, password }) => email && password;

    handleInputError = (errors, inputName) => {
        return errors.some(error =>
            error.message.toLowerCase().includes(inputName)
        )
            ? "error"
            : ""

    }

    render() {

        const { email, password, errors, loading } = this.state;

        return (

            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h1" icon color="teal" textAlign="center">
                        <Icon name="signup" color="teal" />

                        Connectez-vous sur MLH Estiam
                    </Header>
                    <Form size="large" onSubmit={this.handleSubmit}>

                        <Form.Input fluid name="email" icon="mail" iconPosition="left"
                            placeholder="Email" onChange={this.handleChange} type="email" value={email} className={this.handleInputError(errors, 'email')}>

                        </Form.Input>

                        <Form.Input fluid name="password" icon="lock" iconPosition="left"
                            placeholder="Password" onChange={this.handleChange} type="password" value={password} className={this.handleInputError(errors, 'password')}>

                        </Form.Input>
                        <Button disabled={loading} className={loading ? 'loading' : ''} color="teal" fluid size="large">Connexion</Button>

                    </Form>
                    {errors.length > 0 &&
                        (<Message error>
                            <h3>Erreur</h3>
                            {this.displayErrors(errors)}
                        </Message>)}
                    <Message>Pas encore inscrit ? <Link to="/register">S'inscrire</Link></Message>

                </Grid.Column>

            </Grid >


        );


    }

}

export default Login;