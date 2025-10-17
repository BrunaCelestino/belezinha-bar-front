import React, { useState, useEffect } from "react";
import OrderCard from "./OrderCard";
import "./OrderReady.css";

const OrderReady = () => {
      const [pedidosAguardando, setPedidosAguardando] = useState([]);
    
 useEffect(() => {
    setPedidosAguardando([
      {
        id: "B1126",
        cliente: "0191",
        area: "BAR",
        status: "PRONTO",
        horario: "15:30",
        observacao: "JACA LOUCA SEM RÚCULA",
        motivoImpedimento: null,
        produtos: ["1xMOJITO"]
      },
      {
        id: "C1127",
        cliente: "0310",
        area: "COZINHA",
        status: "IMPEDIDO",
        horario: "15:20",
        observacao: "COM VINAGRETE",
        motivoImpedimento: "Acabou o vinagrete",
        produtos: ["2xCHORIPAN", "1xFRITAS BELEZINHA"]
      }
    ]);
  }, []);

    return (
        <div className="right-section">
            <div className="top-bar">
                <h1>AGUARDANDO RETIRADA</h1>
            </div>
            <div className="aguardando-retirada">
                <div className="pedidos-lista">
                    {pedidosAguardando && pedidosAguardando.length > 0 ? (
                        pedidosAguardando.map(pedido => (
                           <OrderCard key={pedido.id} pedido={pedido} />
                        ))
                    ) : (
                        <p className="muted">Nenhum pedido aguardando.</p>
                    )}
                </div>
            </div>

            <div className="bottom-row">
            </div>
        </div>
    );
};

export default OrderReady;
