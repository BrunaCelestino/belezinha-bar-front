import React, { useState, useEffect } from "react";
import Page from "../components/Page";
import Order from "../components/Order";
import OrderReady from "../components/OrderReady"
import "./Atendimento.css";
import CardapioModal from "../components/CardapioModal"; 

const Atendimento = () => {
  const [cliente, setCliente] = useState("");
  const [pedidoId, setPedidoId] = useState(null);
  const [itensPedido, setItensPedido] = useState([]);
  const [observacao, setObservacao] = useState("");
  const [desconto, setDesconto] = useState(0);
  const [cardapioFiltrado, setCardapioFiltrado] = useState([]);
  const [cardapioOpen, setCardapioOpen] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => { setPedidoId(`PED${Date.now().toString().slice(-6)}`); }, []);

  const simularPedido = async () => {
    if (itensPedido.length === 0) {
      alert("Adicione pelo menos um item ao pedido!");
      return;
    }
    const payload = {
      cliente,
      pedidoId,
      itens: itensPedido.map(i => ({ productId: i.id, quantity: i.qtd, price: i.preco })),
      observacao,
      desconto,
      total: itensPedido.reduce((acc, i) => acc + i.preco * i.qtd, 0) - (Number(desconto) || 0)
    };
    console.log("Enviando pedido (simulação):", payload);
    const novoPedidoId = `PED${Date.now().toString().slice(-6)}`;
    setPedidoId(novoPedidoId);
    alert(`Pedido simulado com sucesso! Nº: ${novoPedidoId}`);
  };

  const openCardapio = () => setCardapioOpen(true);
  const closeCardapio = () => setCardapioOpen(false);

  return (
    <Page >
      <div className="content-grid">
        <Order
          cliente={cliente}
          setCliente={setCliente}
          pedidoId={pedidoId}
          itensPedido={itensPedido}
          setItensPedido={setItensPedido}
          observacao={observacao}
          setObservacao={setObservacao}
          desconto={desconto}
          setDesconto={setDesconto}
          simularPedido={simularPedido}
          onOpenCardapio={openCardapio}
        />
        <OrderReady />
      </div>

      {cardapioOpen && (
        <CardapioModal
          token= {token}
          cardapioFiltrado={cardapioFiltrado}
          setCardapioFiltrado={setCardapioFiltrado}
          onClose={closeCardapio}
          adicionarItem={item => setItensPedido(prev => {
            const existe = prev.find(i => i.id === item._id);
            if (existe) return prev.map(i => i.id === item._id ? { ...i, qtd: i.qtd + 1 } : i);
            return [...prev, { id: item._id, name: item.name, preco: Number(item.price || 0), qtd: 1 }];
          })}
        />
      )}
    </Page>
  );
};

export default Atendimento;
