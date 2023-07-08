import React, { Component } from 'react'

export default class OrderPlaced extends Component {

  resetData = () => {
    this.props.onChangeCartItems([])
    this.props.onChangeCart([])
  }

  componentDidMount() {
    this.resetData()
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <h1 className='fw-bold alert alert-success text-center' role='alert'>Thank You</h1>
          <h3 className='text-center text-danger fw-bold'>We Recieved Your Order and Will Process It Within Next 24 Hours!</h3>
        </div>
      </div>
    )
  }
}
