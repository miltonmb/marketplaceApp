import React, { Component } from 'react';
import Select from 'react-select';
import pokemon from 'pokemon'
import Pokemon from 'pokemon-images';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.label.toString() });
  };

  render() {
    return (
      <div>
        <h1>Add Pokemon</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.state.value
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          this.props.createProduct(name, price)
        }}>
          <div className="form-group mr-sm-2">
            <Select
              id="productName"
              value={this.state.value}
              onChange={this.handleChange}
              options={
                pokemon.all().map((guest, index) => {
                  return {
                    label: guest,
                    value: guest,
                    key: index
                  }
                })
              }
              required
            />



          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Pokemon Price"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Pokemon</button>
        </form>
        <p>&nbsp;</p>
        <h2>Buy Pokemon</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            {this.props.products.map((product, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td><img src={Pokemon.getSprite(product.name.toString().toLowerCase())}></img></td>
                  <td>{product.name}</td>
                  <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                  <td>{product.owner}</td>
                  <td>
                    {!product.purchased
                      ? <button
                        name={product.id}
                        value={product.price}
                        onClick={(event) => {
                          this.props.purchaseProduct(event.target.name, event.target.value)
                        }}
                      >
                        Buy
                        </button>
                      : null
                    }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;