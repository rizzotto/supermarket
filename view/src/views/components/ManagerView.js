import React, { useState, useEffect } from 'react'
import ManagerController from '../../controllers/ManagerController'
import SaleController from '../../controllers/SaleController'
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
    setIsOpen(ManagerController.getDayStatus())
  }

  async function handleOpenDay() {
    setIsOpen(ManagerController.openDay().isOpen)
    setValidateSell(true)
  }

  async function handleCloseDay() {
    setIsOpen(ManagerController.closeDay().isOpen)
    setValidateSell(false)
  }

  async function getReportDay() {
    const data = await SaleController.getCurrentDaySales()
    let value = 0
    data.data.map((e) => {
      value += e.value
    })
    if (data.length != 0) {
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
