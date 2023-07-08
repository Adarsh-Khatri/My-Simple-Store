import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { postApi } from '../services/httpServices';

export default class AddProduct extends Component {

  state = {
    product: { category: '', description: '', imgLink: '', name: '', price: '' }, categoryArr: ["Watches", "Sunglasses", "Belts", "Wallets", "Handbags", "Formal Shoes", "Sports Shoes", "Floaters", "Sandals"], errors: {}
  }

  handleChange = ({ target }) => {
    let { name, value } = target;
    this.handleValidate(target);
    this.setState((prevState) => ({ product: { ...prevState.product, [name]: value } }));
  };


  async postData(url, obj) {
    try {
      let user = await postApi(url, obj);
      this.props.history.push('/manageproducts');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert(err.response.data)
      }
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
    let { product } = this.state;
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      this.postData(`/products`, product)
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
      case 'description':
        s1.errors.description = this.validateDescription(value);
        break;
      case 'price':
        s1.errors.price = this.validatePrice(value);
        break;
      case 'imgLink':
        s1.errors.imgLink = this.validateImgLink(value);
        break;
      case 'category':
        s1.errors.category = this.validateCategory(value);
        break;
      default:
        break;
    }
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
    const { category, description, imgLink, name, price } = this.state.product;
    const errors = {};
    errors.name = this.validateName(name);
    errors.description = this.validateDescription(description);
    errors.price = this.validatePrice(price);
    errors.imgLink = this.validateImgLink(imgLink);
    errors.category = this.validateCategory(category);
    return errors;
  }


  validateName = (name) => !name ? 'Name is Required' : '';

  validateDescription = (description) => !description ? 'Description is Required' : description.length < 7 ? 'Description should be atleast 7 Characters long' : '';

  validatePrice = (price) => !price ? 'Price is Required' : isNaN(price) ? 'Not Valid' : '';

  validateImgLink = (imgLink) => !imgLink ? 'Image URL is Required' : '';

  validateCategory = (category) => !category ? 'Category is Required' : '';


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

  makeDD = (label, name, value, startValue, arr, errors) => {
    return (
      <>
        <label htmlFor={name} className="form-label lead fw-bold">
          {label}
        </label>
        <select name={name} value={value} id={name} className='form-select' onChange={this.handleChange}>
          <option value="" readOnly disabled>{startValue}</option>
          {
            arr.map(a => <option value={a}>{a}</option>)
          }
        </select>
        {errors[name] && (
          <div className="text-center alert alert-danger alert-sm fs-6 fw-bold" role="alert">{errors[name]}</div>
        )}
      </>
    )
  }


  render() {
    let { product, categoryArr, errors = null } = this.state;
    let { category, description, imgLink, name, price } = product;

    return (
      <div className="container">
        <div className="row">
          <h1 className='text-center fw-bold'>Add A Product</h1>
        </div>
        <div className="row">
          <div className="col-sm-2"></div>
          <div className='col-sm-8 bg-light rounded rounded-5 p-5'>
            <div className="form-group my-3">
              {this.makeInputField('name', 'Name', name, 'Enter Product Name', errors)}
            </div>
            <div className="form-group">
              {this.makeInputField('description', 'Description', description, 'Enter Product Description', errors)}
            </div>
            <div className="form-group">
              {this.makeInputField('price', 'Price', price, 'Enter Product Price', errors)}
            </div>
            <div className="form-group">
              {this.makeInputField('imgLink', 'Image', imgLink, 'Enter Product Image URL', errors)}
            </div>
            <div className="form-group">
              {this.makeDD('Category', 'category', category, 'Select Category', categoryArr, errors)}
            </div>
            <div className='mt-3 d-flex'>
              <div>
                <button type='button' className='btn btn-primary' disabled={!this.isFormValid()} onClick={(e) => this.handleSubmit(e)}>Add</button>
              </div>
              <div className='ms-auto'>
                <Link className="btn btn-outline-secondary" to={`/manageproducts`}>Back</Link>
              </div>
            </div>
          </div>
          <div className="col-sm-2"></div>
        </div>
      </div>
    )
  }
}
