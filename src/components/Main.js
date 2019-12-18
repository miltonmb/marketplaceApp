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
    console.log(event.label)
    this.setState({ value: event.value.toString() });
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
                pokemon.all().slice(0, 151).map((guest, index) => {
                  let val = guest.toString()

                  if(val === "Nidoran♂" ){
                    val = "Nidoran-f"
                  }
                  if(val === "Nidoran♀"){
                    val = "Nidoran-m"
                  }
                  if(val === "Farfetch’d"){
                    val = "Farfetchd"
                  }
                  return {
                    label: guest,
                    value: val,
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
              var pokemonName = product.name
              if(product.name.toString() === "Nidoran-m"){
                pokemonName = "Nidoran♀"
              }
              if(product.name.toString() === "Nidoran-f"){
                pokemonName = "Nidoran♂"
              }
              if(product.name.toString() === "Farfetchd"){
                pokemonName= "Farfetch’d"
              }
              return (
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td><img alt={product.name} src={Pokemon.getSprite(product.name.toString().toLowerCase())}></img></td>
                  <td>{pokemonName}</td>
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