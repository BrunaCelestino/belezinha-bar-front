import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import "./Order.css";

const Order = ({
    cliente, setCliente,
    pedidoId, setPedidoId,
    itensPedido, setItensPedido,
    observacao, setObservacao,
    desconto, setDesconto,
    simularPedido,
    onOpenCardapio
}) => {

    const [pago, setPago] = useState(false); // ✅ checkbox de "Pago"

    const removerItem = (id) => {
        setItensPedido(prev => prev.filter(i => i.id !== id));
    };

    const renderItensPedido = () =>
        itensPedido.map(item => (
            <div key={item.id} className="pedido-item">
                <div className="pedido-item-header">
                    <strong>{item.name.toUpperCase()}</strong>
                    <button onClick={() => removerItem(item.id)} className="btn-remove">REMOVER</button>
                </div>
                <div className="item-details">
                    Qtd:
                    <input
                        type="text"
                        min="1"
                        value={item.qtd}
                        onChange={e =>
                            setItensPedido(prev =>
                                prev.map(i => i.id === item.id ? { ...i, qtd: Number(e.target.value) } : i)
                            )
                        }
                    />
                    Valor: <input disabled={true} value={"R$ " + item.preco.toFixed(2).replace(".", ",")} />
                    Total: <input disabled={true} value={"R$ " + (item.preco * item.qtd).toFixed(2).replace(".", ",")} />
                </div>
            </div>
        ));

    const calcularTotal = () => {
        const total = itensPedido.reduce((acc, item) => acc + item.preco * item.qtd, 0) - (Number(desconto) || 0);
        return total < 0 ? 0 : total;
    }

    return (
        <div className="left-section">
            <div className="top-bar">
                <h1>REALIZAR PEDIDO</h1>
            </div>
            <div className="order-top-bar">
                <label>
                    Cliente:
                    <input
                        type="text"
                        value={cliente}
                        onChange={e => setCliente(e.target.value)}
                    />
                </label>

                <label>
                    Pedido:
                    <input
                        disabled={true}
                        type="text"
                        value={pedidoId || ""}
                        onChange={e => setPedidoId(e.target.value)}
                    />
                </label>

                <div className="menu-icon" onClick={onOpenCardapio}>
                    <FiMenu />
                </div>
            </div>

            <div className="pedido-items">
                {itensPedido.length > 0 ? renderItensPedido() : <p className="muted"></p>}
            </div>

            <div className="obs-desconto">
                <div className="label-obs">
                    <label>OBS:</label>
                    <input
                        value={observacao}
                        onChange={e => setObservacao(e.target.value)}
                    />
                </div>

                <div className="bottom-row">
                    <div className="row-top">


                        <div className="valores-container">
                            <div className="desconto-total">

                                <label className="status pago">
                                    <input
                                        type="checkbox"
                                        checked={pago}
                                        onChange={(e) => setPago(e.target.checked)}
                                    />
                                    PAGO
                                </label>
                            </div>

                            <div className="desconto-total">

                                <strong>Desconto:</strong>
                                <input
                                    type="text"
                                    value={desconto}
                                    onChange={e => setDesconto(parseFloat(e.target.value) || 0)}
                                    min="0"
                                    step="0.01"
                                />
                            </div>

                            <div className="desconto-total">
                                <strong>Total:</strong>
                                <input
                                    type="text"
                                    value={"R$ " + calcularTotal().toFixed(2)}
                                    disabled={true}
                                />
                            </div>

                        </div>
                    </div>

                    <div className="row-bottom">
                        <button onClick={simularPedido} className="btn-finalizar">
                            FINALIZAR PEDIDO
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
