import React, { useState, useEffect } from 'react'
import api from '../services/api'
import './ManagerView.css'

export default function ManagerView() {
  const [isOpen, setIsOpen] = useState(false)
  const [validateSell, setValidateSell] = useState(true)
  const [totalValue, setTotalValue] = useState(0)
  const [day, setDay] = useState('')

  useEffect(() => {
    checkIfOpen()
    getReportDay()
  }, [])

  async function checkIfOpen() {
    setIsOpen((await api.get('/getDayStatus')).data)
  }

  async function handleOpenDay() {
    setIsOpen((await api.post('/openDay')).data.isOpen)
    setValidateSell(true)
  }

  async function handleCloseDay() {
    setIsOpen((await api.post('/closeDay')).data.isOpen)
    setValidateSell(false)
  }

  async function getReportDay() {
    const data = await api.get('/getSales')
    let value = 0
    data.data.map((e) => {
      value += e.value
      console.log(value)
    })
    console.log(data.data)
    if (data.data.length != 0) {
      setTotalValue(value)
      setDay(data.data[0].createdAt)
    }
  }
  return (
    <div className="main-manager">
      <h1>Página do gerente</h1>
      <div className="button-container">
        <button
          className="button"
          onClick={() => (!isOpen ? handleOpenDay() : handleCloseDay())}
        >
          {!isOpen ? 'Abrir caixas' : 'Fechar caixas'}
        </button>
        {console.log(isOpen)}
      </div>

      {validateSell ? (
        <></>
      ) : (
        <div className="report">
          <p>
            Comprovante do dia <strong>{day}</strong>
          </p>
          <p>
            Valor Totalizado: <strong>{totalValue.toFixed(2)} R$</strong>
          </p>
        </div>
      )}
    </div>
  )
}
