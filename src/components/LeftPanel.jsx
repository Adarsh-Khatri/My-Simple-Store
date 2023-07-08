import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class LeftPanel extends Component {

  state = {
    categoryArr: ["Watches", "Sunglasses", "Belts", "Handbags", "Wallets", "Formal Shoes", "Sports Shoes", "Floaters", "Sandals"]
  }

  makeCategoryList = (arr) => {
    return (
      <>
        <ul class="list-group fw-bold">
          <NavLink className="list-group-item bg-light" activeClassName="my-active-link" to='/products' exact>All</NavLink>
          {
            arr.map(a => <NavLink className="list-group-item bg-light" activeClassName="my-active-link" to={`/products/${a}`}>{a}</NavLink>)
          }
        </ul>
      </>
    )
  }

  render() {
    let { categoryArr } = this.state;
    return (
      <>
        {this.makeCategoryList(categoryArr)}
      </>
    )
  }
}
