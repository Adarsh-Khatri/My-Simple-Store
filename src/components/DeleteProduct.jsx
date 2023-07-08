import React, { Component } from 'react';
import { deleteApi } from '../services/httpServices';

export default class DeleteProduct extends Component {

  fetchData = async () => {
    try {
      let { id } = this.props.match.params;
      await deleteApi(`/products/${id}`);
      this.props.history.push('/manageproducts')
    } catch (error) {
      console.log('Error:', error);
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    return ("")
  }
}
