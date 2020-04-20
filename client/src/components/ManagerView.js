import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./ManagerView.css";

export default function ManagerView(){

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        checkIfOpen();
    })

    async function checkIfOpen(){
        setIsOpen((await api.get('/getDayStatus')).data)
    }

    async function handleOpenDay(){
        setIsOpen((await api.post('/openDay')).data.isOpen)
    }

    async function handleCloseDay(){
        setIsOpen((await api.post('/closeDay')).data.isOpen)
    }

    console.log(isOpen)

    return(
        <div className="main-manager">
            <h1>Página do gerente</h1>
            <div className="button-container">
                <button onClick={() => (!isOpen) ? handleOpenDay() : handleCloseDay()}>
                    {(!isOpen) ? "Abrir caixas" : "Fechar caixas"}
                </button>
            </div>
        </div> 
    )
}