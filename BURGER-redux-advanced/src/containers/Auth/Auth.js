import React, { Component } from 'react';
import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class Auth extends Component {
    state= {
            controlForm : {
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false
                },
                password: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Password'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                }
        },
        isSignup: true
    }
    signupHandler = ( event ) => {
        event.preventDefault();
  
        const signupData = {
            email: this.state.controlForm.email.value,
            password: this.state.controlForm.password.value,
            isSignup: this.state.isSignup
            
        }

        this.props.onAuth(signupData);
        
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.controlForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        
        this.setState({controlForm: updatedOrderForm});
    }

    swithSignupSignin =()=>{
        this.setState(prevState => {
            return {isSignup:!prevState.isSignup}
        })
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.controlForm) {
            formElementsArray.push({
                id: key,
                config: this.state.controlForm[key]
            });
        }
        let form = (<form onSubmit={this.signupHandler}>
            {formElementsArray.map(formElement => (
                <Input 
                key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                />
            ))}
            <Button btnType="Success" >SIGNUP</Button>
        </form>);
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        
        
        return (
            <div className={classes.Auth}>
                {form}
                <Button
                clicked={this.swithSignupSignin} btnType="Danger">{this.state.isSignup? 'SignIn' : 'SignUp'}</Button>
            </div>
        )
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        onAuth : (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}
export default connect(null, mapDispatchtoProps)(Auth);