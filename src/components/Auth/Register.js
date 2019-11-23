import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Form, Button, Segment, Header, Message, Icon, Container } from 'semantic-ui-react';
import firebase from '../../firebase'
import md5 from 'md5';
class Register extends React.Component {
    state = {
        errors: [],
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        loading: false,
        usersRef: firebase.database().ref('users')

    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    isFormValid = () => {
        let errors = [];
        let error;
        if (this.isFormEmpty(this.state)) {
            error = { message: 'Veuillez renseignez tous les champs' };
            this.setState({ errors: errors.concat(error) });
            return false;

        } else if (!this.isPasswordValid(this.state)) {
            error = { message: 'Password pas identique ou inférieur à 6 caractères' };
            this.setState({ errors: errors.concat(error) });
            return false;

        } else {
            return true;
        }

    }

    isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
        return !username.length || !email.length || !password.length || !passwordConfirmation.length;
    };

    isPasswordValid = ({ password, passwordConfirmation }) => {
        if (password.length < 6 || passwordConfirmation.length < 6) {
            return false;
        } else if (password !== passwordConfirmation) {
            return false;
        } else {
            return true;
        }

    };

    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);



    handleSubmit = event => {
        let errors = [];
        let error;
        event.preventDefault();

        if (this.isFormValid()) {
            this.setState(({ errors: [], loading: true }));
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    console.log(createdUser);
                    createdUser.user.updateProfile({
                        displayName: this.state.username,
                        //ce sont des côtes de travers
                        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon` //Générer avatar à chaque nouvel utilisateur
                    })
                        .then(() => {
                            this.saveUser(createdUser).then(() => {
                                console.log('user saved');
                            })
                            this.setState({ loading: false });
                            error = { message: 'Utilisateur créé avec succès' };
                            this.setState({ errors: errors.concat(error) });

                        })
                        .catch(err => {
                            console.error(err);
                            this.setState({ errors: errors.concat(err), loading: false });
                        })
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ errors: this.state.errors.concat(err), loading: false });
                });
        }
    };


    saveUser = createdUser => {
        return this.state.usersRef.child(createdUser.user.uid).set({

            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        })
    }

    handleInputError = (errors, inputName) => {
        return errors.some(error =>
            error.message.toLowerCase().includes(inputName)
        )
            ? "error"
            : ""

    }

    render() {

        const { username, email, password, passwordConfirmation, errors, loading } = this.state;

        return (

            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h1" icon color="blue" textAlign="center">
                        <Icon name="signup" color="blue" />

                        Créer un compte sur MLH Estiam
                    </Header>
                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Form.Input fluid name="username" icon="user" iconPosition="left"
                            placeholder="Nom d'utilisateur" onChange={this.handleChange} type="text" value={username} >

                        </Form.Input>

                        <Form.Input fluid name="email" icon="mail" iconPosition="left"
                            placeholder="Email" onChange={this.handleChange} type="email" value={email} className={this.handleInputError(errors, 'email')}>

                        </Form.Input>

                        <Form.Input fluid name="password" icon="lock" iconPosition="left"
                            placeholder="Password" onChange={this.handleChange} type="password" value={password} className={this.handleInputError(errors, 'password')}>

                        </Form.Input>

                        <Form.Input fluid name="passwordConfirmation" icon="repeat" iconPosition="left"
                            placeholder=" Confirmer votre Password" onChange={this.handleChange} type="password" value={passwordConfirmation} className={this.handleInputError(errors, 'password')}>

                        </Form.Input>
                        <Button disabled={loading} className={loading ? 'loading' : ''} color="blue" fluid size="large">Inscription</Button>

                    </Form>
                    {errors.length > 0 &&
                        (<Message error>
                            <h3>Erreur</h3>
                            {this.displayErrors(errors)}
                        </Message>)}
                    <Message>Déja Inscrit? <Link to="/login">Se connecter</Link></Message>

                </Grid.Column>

            </Grid >


        );


    }

}

export default Register;