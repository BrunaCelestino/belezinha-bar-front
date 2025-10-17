import React from "react";
import "./OrderCard.css";

const OrderCard = ({ pedido }) => {
  const { id, cliente, area, status, horario, observacao, produtos, motivoImpedimento } = pedido;

  // Formata a lista de produtos como string separada por vírgula
  const produtosStr = produtos?.join(", ") || "";

  return (
    <div className={`pedido-item ${status.toLowerCase()}`}>
      <div className="pedido-header">
        <strong>PEDIDO {id} | CLIENTE {cliente} | {area}</strong>
      </div>

      <div className="pedido-info">
        <small>{produtosStr}</small>
        {observacao && <small>OBS: {observacao}</small>}
      </div>

      {status === "IMPEDIDO" && (
        <div className="impedimento">
          <small>IMPEDIMENTO: {motivoImpedimento || "Sem detalhes"}</small>
        </div>
      )}

      <div className="pedido-actions">
        {status === "PRONTO" && (
          <button className="btn-entregar">ENTREGAR</button>
        )}
        {status === "IMPEDIDO" && (
          <>
            <button className="btn-cancelar">CANCELAR</button>
            <button className="btn-realizar">REALIZAR</button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderCard;