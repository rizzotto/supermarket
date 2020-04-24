import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './ProductList.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [saleValue, setSaleValue] = useState(0);

  useEffect(() => {
    checkIfOpen();
    getListData();
  }, []);

  async function getListData() {
    const data = await api.get('/product');
    console.log(data.data);
    setProducts(data.data);
  }

  async function checkIfOpen() {
    setIsOpen((await api.get('/getDayStatus')).data);
  }

  async function handleItemClick(product, id) {
    if (
      document.getElementById(id).style.border === '1px solid rgb(99, 112, 255)'
    ) {
      document.getElementById(id).style.border = '1px solid #dbe9f5';
      setSelectedItems(
        selectedItems.filter((e) => e.product.name !== product.name)
      );
      return;
    }

    document.getElementById(id).style.border = '1px solid #6370ff';

    setSelectedItems([...selectedItems, { product }]);
  }

  async function handleBuyClick() {
    const products = [];

    selectedItems.map((product) => {
      products.push({
        name: product.product.name,
        code: product.product.code,
        price: product.product.price,
      });
      document.getElementById(product.product._id).style.border =
        '1px solid #dbe9f5';
    });

    console.log(products);
    const data = await api.post('/registerSell', { products });
    setSaleValue(data.data.value);
    setSelectedItems([]);
  }

  if (!isOpen) {
    return <h1>Aguarde o gerente abrir as operações dos caixas!</h1>;
  } else {
    return (
      <div className="container">
        <div className="list">
          {console.log(selectedItems)}
          <p className="itemTitle">
            {selectedItems.length} produto(s) selecionado(s)
          </p>
          {products.map((e) => {
            return (
              <button
                className="button"
                id={e._id}
                key={e._id}
                onClick={() => handleItemClick(e, e._id)}
              >
                {e.name} <p className="price">{e.price} R$</p>
              </button>
            );
          })}
          <button className="buyButton" onClick={() => handleBuyClick()}>
            Comprar
          </button>
        </div>
        <div className="total">
          {saleValue === 0 ? (
            <p className="saleValue">Nenhuma compra realizada</p>
          ) : (
            <p className="saleValue">
              Valor da compra: <strong>{saleValue.toFixed(2)} R$</strong>
            </p>
          )}
        </div>
      </div>
    );
  }
}
