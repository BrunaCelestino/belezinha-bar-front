import React, { useState, useEffect, useMemo } from "react";
import "./CardapioModal.css";

const API_BASE = process.env.REACT_APP_API_URL;

const CardapioModal = ({ token, adicionarItem, onClose }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cardapioFiltrado, setCardapioFiltrado] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("TUDO");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWithToken = async (url, options = {}) => {
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };
    return fetch(url, { ...options, headers });
  };

  useEffect(() => {
    let mounted = true;
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchWithToken(`${API_BASE}/product/find/all`);
        if (!res.ok) throw new Error(`Erro ${res.status}`);
        const json = await res.json();
        if (mounted) {
          const produtos = Array.isArray(json.data) ? json.data : [];
          setAllProducts(produtos);
          setCardapioFiltrado(produtos);
        }
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        if (mounted) setError("Não foi possível carregar o cardápio.");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchAll();
    return () => { mounted = false; };
  }, [token]);

  const categories = useMemo(() => {
    const setCat = new Set();
    allProducts.forEach(p => { if (p.category) setCat.add(p.category); });
    return ["TUDO", ...Array.from(setCat).sort()];
  }, [allProducts]);

  useEffect(() => {
    let filtered = allProducts;

    if (selectedCategory !== "TUDO") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (onlyAvailable) {
      filtered = filtered.filter(p => !!p.available);
    }
    if (pesquisa.trim() !== "") {
      const term = pesquisa.toLowerCase();
      filtered = filtered.filter(p => {
        const nameMatch = (p.name || "").toLowerCase().includes(term);
        const descMatch = (p.description || "").toLowerCase().includes(term);
        const tagsMatch = Array.isArray(p.tags) && p.tags.some(tag => tag.toLowerCase().includes(term));
        return nameMatch || descMatch || tagsMatch;
      });
    }

    setCardapioFiltrado(filtered);
  }, [pesquisa, selectedCategory, onlyAvailable, allProducts]);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-container">
        <div className="modal-header">
          <h2>CARDÁPIO</h2>
          <button onClick={onClose} className="btn-close">X</button>
        </div>

        <div className="modal-filters">
          <input
            type="text"
            placeholder="Pesquisar produto..."
            value={pesquisa}
            onChange={e => setPesquisa(e.target.value)}
          />
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <label>
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={e => setOnlyAvailable(e.target.checked)}
            /> Disponível
          </label>
        </div>

        <div className="modal-body">
          {loading && <p>Carregando produtos...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && cardapioFiltrado.length === 0 && <p className="muted">Nenhum item encontrado.</p>}

          {cardapioFiltrado.map(item => {
            const nome = item.name || item.nome || "Sem nome";
            const descricao = item.description || item.descricao || "";
            const preco = Number(item.price ?? item.preco ?? 0);
            const disponivel = !!item.available;

            return (
              <div
                key={item._id}
                className={`cardapio-item ${!disponivel ? "not-available" : ""}`}
                onClick={() => disponivel && adicionarItem(item)}
              >
                <div className="cardapio-main">
                  <div>
                    <h4>{nome}</h4>
                    <p className="desc">{descricao}</p>
                  </div>
                  <div className="price-col">
                    <span className="preco">R$ {preco.toFixed(2)}</span>
                    {!disponivel && <small className="badge-unavailable">Indisponível</small>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CardapioModal;
