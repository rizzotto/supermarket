import React, { useState, useEffect } from 'react'
import api from '../services/api'
import './SaleView.css'

export default function SaleView() {
  const [products, setProducts] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [saleValue, setSaleValue] = useState(0)
  const [payment, setPayment] = useState('')
  const [exchange, setExchange] = useState('')
  const [showExchange, setShowExchange] = useState('')
  const [productId, setProductId] = useState(0)

  useEffect(() => {
    checkIfOpen()
    getListData()
  }, [])

  async function getListData() {
    const data = await api.get('/product')
    setProducts(data.data)
  }

  async function checkIfOpen() {
    setIsOpen((await api.get('/getDayStatus')).data)
  }

  async function addItem(product, id) {
    if (
      document.getElementById(id).style.border !== '1px solid rgb(99, 112, 255)'
    ) {
      document.getElementById(id).style.border = '1px solid #6370ff'
      setSelectedItems([...selectedItems, { product }])
    } else {
      document.getElementById(id).style.border = '1px solid #dbe9f5'
      setSelectedItems(
        selectedItems.filter((e) => e.product.name !== product.name)
      )
    }
  }

  async function handleBuyClick() {

    if(!selectedItems || selectedItems.length === 0){
      alert('Nennhum produto selecionado!')
      return
    }

    const products = []

    selectedItems.map((product) => {
      products.push({
        name: product.product.name,
        code: product.product.code,
        price: product.product.price,
      })
      document.getElementById(product.product._id).style.border =
        '1px solid #dbe9f5'
    })

    let value = 0
    selectedItems.map((item) => {
      value = value + item.product.price
    })

    const change = exchange - value

    if (change < 0 && payment === 'Dinheiro') {
      alert('Valor em dinheiro inválido!')
      return
    }

    const data = await api.post('/registerSale', { products, payment: payment })
    setSaleValue(data.data.value)

    setSelectedItems([])
    await setShowExchange(change)

    setTimeout(() => {
      setPayment('')
      setSaleValue(0)
    }, 2500)
  }

  async function paymentCheck(event) {
    await setPayment(event.target.value)
  }

  async function handleExchange(e) {
    await setExchange(e.target.value)
  }

  function handleCodeInput(e) {
    setProductId(e.target.value)
  }

  async function handleCodeClick() {
    const product = products.filter((item) => {
      return item.code === productId ? item : null
    })[0]
    if (!product) {
      alert('codigo inválido')
      return
    }
    await setSelectedItems(...selectedItems, { product })
    addItem(product, product._id)
  }

  function isRadioSelected(paymentText){
    return (paymentText === payment)
  }

  if (!isOpen) {
    return <h1>Aguarde o gerente abrir as operações dos caixas!</h1>
  } else {
    return (
      <div className="container">
        <div className="list">
          <p className="itemTitle">
            {selectedItems.length} produto(s) selecionado(s)
          </p>
          {products.map((e) => {
            return (
              <button
                className="button"
                id={e._id}
                key={e._id}
                onClick={() => addItem(e, e._id)}
              >
                {e.name}: #{e.code} <p className="price">{e.price} R$</p>
              </button>
            )
          })}
        </div>
        <div className="containerId">
          <p>Digite o código do produto</p>
          <input
            className="inputId"
            type="text"
            onChange={(e) => handleCodeInput(e)}
            placeholder="ID do produto"
          ></input>
          <button
            className="bt"
            onClick={() => handleCodeClick()}
            className="idButton"
          >
            Adicionar
          </button>
        </div>
        <div className="total">
          {saleValue === 0 ? (
            <p className="saleValue">Realize uma compra</p>
          ) : (
            <div className="saleValue">
              Valor da compra: <strong>{saleValue.toFixed(2)} R$</strong>
              {payment !== '' ? (
                <div className="way">
                  Forma de Pagamento: <strong>{payment}</strong>
                  {payment === 'Dinheiro' ? (
                    <p>
                      Troco: <strong>{showExchange} R$</strong>
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          )}
          <div className="change">
            <div className="payment" onChange={(e) => paymentCheck(e)}>
              <input type="radio" value="Débito" name="payment" checked={isRadioSelected("Débito")}/> Débito
              <input type="radio" value="Crédito" name="payment" checked={isRadioSelected("Crédito")}/> Crédito
              <input type="radio" value="Dinheiro" name="payment" checked={isRadioSelected("Dinheiro")}/> Dinheiro
            </div>
            {payment === 'Dinheiro' ? (
              <div className="exchange">
                <input
                  onChange={(e) => handleExchange(e)}
                  placeholder="Valor"
                  type="text"
                ></input>
              </div>
            ) : (
              <></>
            )}
          </div>
          <button
            disabled={!payment}
            className={!payment ? 'buyButtonDisabled' : 'buyButton'}
            onClick={() => handleBuyClick()}
          >
            Comprar
          </button>
        </div>
      </div>
    )
  }
}
