import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { postApi } from '../services/httpServices';

class DeliveryDetails extends Component {

  state = {
    form: { name: '', address: '', city: '' }, errors: {}
  }

  handleChange = ({ target }) => {
    let { name, value } = target;
    this.handleValidate(target);
    this.setState((prevState) => ({ form: { ...prevState.form, [name]: value } }));
  };

  async placeOrder(url) {
    let { cartItems } = this.props;
    let { form } = this.state;
    let amount = `Rs. ${cartItems.reduce((acc, cur) => cur.price + acc, 0)}`;
    let items = cartItems.reduce((acc, cur) => cur.qty + acc, 0);
    try {
      await postApi(url, { ...form, amount, items })
      this.props.history.push('/orderplaced');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        let errors = {};
        errors.status = err.response.data;
        this.setState({ errors });
      }
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      this.placeOrder('/orders')
    } else {
      this.setState({ errors: errors })
    }
  }


  // --------------------------------------------------------------------------------------------- VALIDATING ERROR


  handleValidate = ({ name, value }) => {
    let s1 = { ...this.state };
    switch (name) {
      case 'name':
        s1.errors.name = this.validateName(value);
        break;
      case 'address':
        s1.errors.address = this.validateAddress(value);
        break;
      case 'city':
        s1.errors.city = this.validateCity(value);
        break;
      default:
        break;
    }
    this.setState(s1);
  }

  isValid = (errors) => {
    let { cartItems } = this.props;
    let keys = Object.keys(errors)
    let count = keys.reduce((acc, cur) => errors[cur] ? acc + 1 : acc, 0)
    return count === 0 && Object.keys(cartItems).length > 0;
  }

  isFormValid = () => {
    let errors = this.validateAll();
    return this.isValid(errors)
  }

  validateAll = () => {
    const { name, address, city } = this.state.form;
    const errors = {};
    errors.name = this.validateName(name);
    errors.address = this.validateAddress(address);
    errors.city = this.validateCity(city);
    return errors;
  }

  validateName = (name) => !name ? 'Name is Required' : '';

  validateAddress = (address) => !address ? 'Address is Required' : '';

  validateCity = (city) => !city ? 'City is Required' : '';


  // ---------------------------------------------------------------------------------------------


  makeInputField = (name, label, value, placeH, errors) => {
    return (
      <>
        <label htmlFor={name} className="form-label lead fw-bold">{label}</label>
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
    let { name, address, city } = this.state.form;
    let { errors = null } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className='col-sm-12 bg-light rounded rounded-5 p-5'>
            <h1 className='fw-bold text-center'>Delivery Details</h1>
            {errors.status && <div className="fw-bold text-danger text-center">{errors.status}</div>}
            <div className="form-group my-3">
              {this.makeInputField('name', 'Name', name, 'Enter Your Name', errors)}
            </div>
            <div className="form-group">
              {this.makeInputField('address', 'Address', address, 'Enter Your Address', errors)}
            </div>
            <div className="form-group">
              {this.makeInputField('city', 'City', city, 'Enter Your City', errors)}
            </div>
            <div className='mt-3 text-center'>
              <button type='button' className='btn btn-primary my-3' disabled={!this.isFormValid()} onClick={(e) => this.handleSubmit(e)}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(DeliveryDetails)