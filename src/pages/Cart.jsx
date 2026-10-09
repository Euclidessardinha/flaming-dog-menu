import { useEffect, useState } from "react";

import {
getCart,
updateCartItemQuantity,
removeFromCart,
clearCart,
getCartTotal,
} from "../utils/cart";

import "./Cart.css";

const WHATSAPP_NUMBER = "258842228183"; // Substituir pelo número oficial do Flaming Dogs e Burgers, apenas com indicativo e dígitos.

const FALLBACK_IMAGE =
"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80";

function Cart() {
const [cart, setCart] = useState([]);

useEffect(() => {
setCart(getCart());
}, []);

const formatPrice = (price) => {
if (price === null || price === undefined) {
return "A confirmar";
}


return `${Number(price).toLocaleString("pt-MZ")} MT`;


};

const handleIncrease = (item) => {
const updatedCart = updateCartItemQuantity(
item.id,
item.quantity + 1
);


setCart(updatedCart);


};

const handleDecrease = (item) => {
if (item.quantity <= 1) return;


const updatedCart = updateCartItemQuantity(
  item.id,
  item.quantity - 1
);

setCart(updatedCart);


};

const handleRemove = (itemId) => {
const updatedCart = removeFromCart(itemId);


setCart(updatedCart);


};

const handleClearCart = () => {
clearCart();
setCart([]);
};

const total = getCartTotal();

const itemCount = cart.reduce(
(sum, item) => sum + Number(item.quantity || 0),
0
);

const handleWhatsApp = () => {
if (!cart.length) return;


if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
  window.alert(
    "Configura o número oficial do WhatsApp do Flaming Dogs no ficheiro Cart.jsx."
  );
  return;
}

const orderLines = cart
  .map((item) => {
    const itemTotal =
      item.price !== null && item.price !== undefined
        ? formatPrice(Number(item.price) * item.quantity)
        : "A confirmar";

    return [
      `${item.quantity}x ${item.name}`,
      `Preço unitário: ${formatPrice(item.price)}`,
      `Subtotal: ${itemTotal}`,
    ].join("\n");
  })
  .join("\n\n");

const message = encodeURIComponent(
  [
    "🍔 FLAMING DOGS & BURGERS",
    "",
    "Olá! Gostaria de fazer o seguinte pedido:",
    "",
    orderLines,
    "",
    "━━━━━━━━━━━━━━━━",
    `TOTAL: ${formatPrice(total)}`,
    "━━━━━━━━━━━━━━━━",
    "",
    "Gostaria de confirmar este pedido.",
    "Obrigado!",
  ].join("\n")
);

const whatsappUrl =
  `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

window.open(
  whatsappUrl,
  "_blank",
  "noopener,noreferrer"
);


};

return ( <div className="cart-page">
{/* HEADER */}


  <header className="cart-header">
    <a href="/" className="cart-brand">
      <img
        src="/logo-flaming.png"
        alt="Flaming Dogs & Burgers"
      />

      <div className="cart-brand-text">
        <strong>Flaming Dogs</strong>
        <span>& Burgers</span>
      </div>
    </a>

    <a href="/menu" className="cart-back-menu">
      ← Continuar a ver o menu
    </a>
  </header>

  {/* CONTEÚDO PRINCIPAL */}

  <main className="cart-main">
    <div className="cart-container">
      <div className="cart-title">
        <span>FLAMING DOGS & BURGERS</span>

        <h1>Meu Carrinho</h1>

        {cart.length > 0 && (
          <p>
            {itemCount}{" "}
            {itemCount === 1 ? "item" : "itens"}{" "}
            selecionado{itemCount === 1 ? "" : "s"}
          </p>
        )}
      </div>

      {/* CARRINHO VAZIO */}

      {cart.length === 0 ? (
        <section className="cart-empty">
          <div
            className="cart-empty-icon"
            aria-hidden="true"
          >
            🛒
          </div>

          <span className="cart-empty-eyebrow">
            O TEU PEDIDO COMEÇA AQUI
          </span>

          <h2>O teu carrinho está vazio</h2>

          <p>
            Ainda não adicionaste nenhum produto.
            Explora os nossos hambúrgueres, hot dogs
            e acompanhamentos.
          </p>

          <a
            href="/menu"
            className="cart-empty-button"
          >
            Explorar o menu
          </a>
        </section>
      ) : (
        <div className="cart-layout">
          {/* LISTA DE PRODUTOS */}

          <section
            className="cart-items"
            aria-label="Produtos no carrinho"
          >
            {cart.map((item) => (
              <article
                key={item.id}
                className="cart-item"
              >
                <div className="cart-item-image">
                  <img
                    src={item.image || FALLBACK_IMAGE}
                    alt={item.name}
                    loading="lazy"
                    onError={(event) => {
                      const image = event.currentTarget;

                      if (image.dataset.fallbackApplied) {
                        return;
                      }

                      image.dataset.fallbackApplied = "true";
                      image.src = FALLBACK_IMAGE;
                    }}
                  />
                </div>

                <div className="cart-item-info">
                  <h2>{item.name}</h2>

                  <span className="cart-item-price">
                    {formatPrice(item.price)}{" "}
                    <span className="cart-unit-label">
                      / unidade
                    </span>
                  </span>

                  <div className="cart-item-bottom">
                    <div
                      className="cart-quantity"
                      aria-label={`Quantidade de ${item.name}`}
                    >
                      <button
                        type="button"
                        onClick={() => handleDecrease(item)}
                        disabled={item.quantity <= 1}
                        aria-label={`Diminuir quantidade de ${item.name}`}
                      >
                        −
                      </button>

                      <strong aria-live="polite">
                        {item.quantity}
                      </strong>

                      <button
                        type="button"
                        onClick={() => handleIncrease(item)}
                        disabled={item.quantity >= 99}
                        aria-label={`Aumentar quantidade de ${item.name}`}
                      >
                        +
                      </button>
                    </div>

                    <strong className="cart-item-total">
                      {item.price !== null &&
                      item.price !== undefined
                        ? formatPrice(
                            Number(item.price) * item.quantity
                          )
                        : "A confirmar"}
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="cart-remove"
                  onClick={() => handleRemove(item.id)}
                  aria-label={`Remover ${item.name}`}
                  title="Remover produto"
                >
                  ×
                </button>
              </article>
            ))}

            <button
              type="button"
              className="cart-clear"
              onClick={handleClearCart}
            >
              Limpar carrinho
            </button>
          </section>

          {/* RESUMO DO PEDIDO */}

          <aside className="cart-summary">
            <div className="cart-summary-header">
              <span>RESUMO DO PEDIDO</span>
              <h2>O teu pedido</h2>
            </div>

            <div className="cart-summary-lines">
              <div>
                <span>Produtos ({itemCount})</span>
                <strong>{formatPrice(total)}</strong>
              </div>

              <div>
                <span>Taxa de entrega</span>
                <strong>A combinar</strong>
              </div>
            </div>

            <div className="cart-summary-total">
              <span>Total dos produtos</span>
              <strong>{formatPrice(total)}</strong>
            </div>

            <p className="cart-delivery-note">
              O valor da entrega será confirmado
              diretamente com a equipa.
            </p>

            <button
              type="button"
              className="cart-whatsapp-button"
              onClick={handleWhatsApp}
            >
              <span
                className="cart-whatsapp-icon"
                aria-hidden="true"
              >
                ◉
              </span>

              <span className="cart-whatsapp-button-text">
                <small>FINALIZAR PEDIDO</small>
                <strong>Pedir pelo WhatsApp</strong>
              </span>

              <span
                className="cart-whatsapp-arrow"
                aria-hidden="true"
              >
                →
              </span>
            </button>

            <p className="cart-note">
              O teu pedido será preparado para envio
              pelo WhatsApp do Flaming Dogs & Burgers.
            </p>

            <a
              href="/menu"
              className="cart-continue-link"
            >
              ← Adicionar mais produtos
            </a>
          </aside>
        </div>
      )}
    </div>
  </main>

  {/* RODAPÉ */}

  <footer className="cart-footer">
    <div className="cart-footer-brand">
      <strong>FLAMING DOGS & BURGERS</strong>
      <span>Burgers • Hot Dogs • Snacks</span>
    </div>

    <a href="/menu">
      Ver menu completo →
    </a>
  </footer>
</div>


);
}

export default Cart;
