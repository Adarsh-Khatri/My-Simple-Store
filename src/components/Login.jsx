import React, { Component } from 'react';
import { postApi } from '../services/httpServices';
import { storeUser } from '../services/authServices';
import Ad from './Ad';


export default class Login extends Component {

    state = {
        form: { username: '', password: '' }, errors: {}
    }

    handleChange = ({ target }) => {
        let { name, value } = target;
        this.handleValidate(target);
        this.setState((prevState) => ({ form: { ...prevState.form, [name]: value } }));
    };

    async login(url, obj) {
        try {
            let user = await postApi(url, obj);
            storeUser(user)
            this.props.history.push('/products');
        } catch (err) {
            if (err.response && err.response.status === 401) {
                alert(err.response.data)
            }
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        let { form } = this.state;
        let errors = this.validateAll();
        if (this.isValid(errors)) {
            this.login("/login", form)
        } else {
            this.setState({ errors: errors })
        }
    }


    // --------------------------------------------------------------------------------------------- VALIDATING ERROR


    handleValidate = ({ name, value }) => {
        let s1 = { ...this.state };
        switch (name) {
            case 'username':
                s1.errors.username = this.validateUsername(value);
                break;
            case 'password':
                s1.errors.password = this.validatePassword(value);
                break;
            default:
                break;
        }
        console.log(s1.errors);
        this.setState(s1);
    }

    isValid = (errors) => {
        let keys = Object.keys(errors)
        let count = keys.reduce((acc, cur) => errors[cur] ? acc + 1 : acc, 0)
        return count === 0;
    }

    isFormValid = () => {
        let errors = this.validateAll();
        return this.isValid(errors)
    }

    validateAll = () => {
        const { username, password } = this.state.form;
        const errors = {};
        errors.username = this.validateUsername(username);
        errors.password = this.validatePassword(password);
        return errors;
    }


    validateUsername = (username) => !username ? 'Username is Required' : '';

    validatePassword = (password) => !password ? 'Password is Required' : password.length < 7 ? 'Password should be atleast 7 Characters long' : '';


    // ---------------------------------------------------------------------------------------------


    makeInputField = (name, label, value, placeH, errors) => {
        return (
            <>
                <label htmlFor={name} className="form-label lead fw-bold">
                    {label}<sup className='text-danger'>*</sup>
                </label>
                <div className="">
                    <input
                        type="text"
                        className="form-control"
                        id={name}
                        name={name}
                        placeholder={`${placeH}`}
                        value={value}
                        onChange={this.handleChange}
                        required
                    />
                    {errors[name] && (
                        <div className="text-center alert alert-danger alert-sm fs-6 fw-bold" role="alert">{errors[name]}</div>
                    )}
                </div>
            </>
        )
    }

    render() {
        let { username, password } = this.state.form;
        let { errors = null } = this.state;
        return (
            <div className="container">
                <div className="row"><Ad /></div>
                <h1 className='fw-bold text-center my-2'>LOGIN</h1>
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className='col-sm-6 bg-light rounded rounded-5 p-5'>
                        {errors.status && <div className="fw-bold text-danger text-center">{errors.status}</div>}
                        <div className="form-group my-3">
                            {this.makeInputField('username', 'Username', username, 'Enter Your Username', errors)}
                        </div>
                        <div className="form-group">
                            {this.makeInputField('password', 'Password', password, 'Enter Your Password', errors)}
                        </div>
                        <div className='mt-3 text-center'>
                            <button type='button' className='btn btn-primary my-3' disabled={!this.isFormValid()} onClick={(e) => this.handleSubmit(e)}>Login</button>
                        </div>
                    </div>
                    <div className="col-sm-3"></div>
                </div>
            </div>
        )
    }
}

