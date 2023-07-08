import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    let { cartItems, user } = this.props;
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-dark px-5">
          <Link className="navbar-brand lead fw-bold fs-4 text-light" to="/products">MyStore</Link>
          <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active text-light" activeClassLink="my-active-nav-link" aria-current="page" to="/products/Watches">Watches</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active text-light" activeClassLink="my-active-nav-link" aria-current="page" to="/products/Sunglasses">Sunglasses</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active text-light" activeClassLink="my-active-nav-link" aria-current="page" to="/products/Belts">Belts</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active text-light" activeClassLink="my-active-nav-link" aria-current="page" to="/products/Wallets">Wallets</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active text-light" activeClassLink="my-active-nav-link" aria-current="page" to="/products/Handbags">Handbags</NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle text-light" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Footwears
                </Link>
                <ul className="dropdown-menu bg-warning">
                  <li><Link className="dropdown-item fw-bold" to="/products/Formal Shoes">Formal Shoes</Link></li>
                  <li><Link className="dropdown-item fw-bold" to="/products/Sports Shoes">Sports Shoes</Link></li>
                  <li><Link className="dropdown-item fw-bold" to="/products/Floaters">Floaters</Link></li>
                  <li><Link className="dropdown-item fw-bold" to="/products/Sandals">Sandals</Link></li>
                </ul>
              </li>
            </ul>
            <div className="row" >
              {
                user?.username ? (
                  <div className='col-sm-7 d-flex align-items-center'>
                    <div className="nav-item dropdown">
                      <Link className="nav-link dropdown-toggle text-light" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {user.username}
                      </Link>
                      <ul className="dropdown-menu bg-danger">
                        <li><Link className="dropdown-item fw-bold" to="/myorders">My Orders</Link></li>
                        <li><Link className="dropdown-item fw-bold" to="/manageproducts">Manage Products</Link></li>
                        <hr />
                        <li><Link className="dropdown-item fw-bold" to="/logout">Logout</Link></li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className='col-sm-7'>
                    <Link className="btn btn-outline-success" to="/login">Login</Link>
                  </div>
                )
              }
              <div className='col-sm-5 d-flex align-items-center justify-content-center gap-2'><Link to="/cart"><i className='bi bi-cart3 text-light fs-4'></i></Link><span className='badge rounded-pill text-bg-success'>{cartItems.reduce((acc, cur) => cur.qty + acc, 0)}</span></div>
            </div>
          </div>
        </nav>
      </>
    )
  }
}
