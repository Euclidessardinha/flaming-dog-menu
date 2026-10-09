
import { useState } from "react";
import { addToCart } from "../utils/cart";
import "./DishDetails.css";

/*
  ============================================================
  FLAMING DOGS & BURGERS — DETALHES DO PRODUTO
  ============================================================

  IMPORTANTE:
  - Os produtos e preços abaixo são ilustrativos.
  - As imagens são ilustrativas e podem ser substituídas.
  - O produto é identificado através do URL /menu/:id.
  - O carrinho utiliza a função addToCart existente.
  - Não usamos react-router-dom.
  ============================================================
*/

const categories = [
  {
    id: "hamburgueres",
    name: "Hambúrgueres",
  },
  {
    id: "hot-dogs",
    name: "Hot Dogs",
  },
  {
    id: "acompanhamentos",
    name: "Acompanhamentos",
  },
  {
    id: "frango",
    name: "Frango",
  },
  {
    id: "bebidas",
    name: "Bebidas",
  },
];

const menuItems = [
  // ==========================================================
  // HAMBÚRGUERES
  // ==========================================================

  {
    id: "classic-burger",
    name: "Classic Burger",
    description:
      "Um hambúrguer clássico para quem aprecia uma combinação simples e saborosa.",
    price: 350,
    category: "hamburgueres",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85",
    available: true,
    illustrative: true,
  },

  {
    id: "double-smash-burger",
    name: "Double Smash Burger",
    description:
      "Uma opção generosa para quem procura um hambúrguer ainda mais recheado.",
    price: 500,
    category: "hamburgueres",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=85",
    available: true,
    illustrative: true,
  },

  {
    id: "bbq-bacon-burger",
    name: "BBQ Bacon Burger",
    description:
      "Uma opção de hambúrguer inspirada nos sabores barbecue.",
    price: 550,
    category: "hamburgueres",
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=1200&q=85",
    available: true,
    illustrative: true,
  },

  {
    id: "spicy-chicken-burger",
    name: "Spicy Chicken Burger",
    description:
      "Hambúrguer de frango para quem prefere uma opção com personalidade.",
    price: 400,
    category: "hamburgueres",
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1200&q=85",
    available: true,
    illustrative: true,
  },

  // ==========================================================
  // HOT DOGS
  // ==========================================================

  {
    id: "classic-hot-dog",
    name: "Classic Hot Dog",
    description:
      "Um clássico hot dog para uma refeição rápida e saborosa.",
    price: 250,
    category: "hot-dogs",
    image:
      "https://images.unsplash.com/photo-1612392062631-94dd858cba88?auto=format&fit=crop&w=1200&q=85",
    available: true,
    illustrative: true,
  },

  {
    id: "loaded-hot-dog",
    name: "Loaded Hot Dog",
    description:
      "Uma versão mais generosa do clássico hot dog.",
    price: 380,
    category: "hot-dogs",
    image:
      "https://images.unsplash.com/photo-1599599810694-b5b37304c041?auto=format&fit=crop&w=1200&q=85",
    available: true,
    illustrative: true,
  },

  // ==========================================================
  // ACOMPANHAMENTOS
  // ==========================================================

  {
    id: "batatas-fritas",
    name: "Batatas Fritas",
    description:
      "Batatas fritas para acompanhar o teu hambúrguer ou hot dog.",
    price: 150,
    category: "acompanhamentos",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1200&q=85",
    available: true,
    illustrative: true,
  },

  {
    id: "loaded-fries",
    name: "Loaded Fries",
    description:
      "Uma opção de batatas fritas para quem quer variar nos acompanhamentos.",
    price: 300,
    category: "acompanhamentos",
    image:
      "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=1200&q=85",
    available: true,
    illustrative: true,
  },

  {
    id: "onion-rings",
    name: "Onion Rings",
    description:
      "Anéis de cebola crocantes para acompanhar a tua refeição.",
    price: 200,
    category: "acompanhamentos",
    image:
      "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=1200&q=85",
    available: true,
    illustrative: true,
  },

  // ==========================================================
  // FRANGO
  // ==========================================================

  {
    id: "crispy-nuggets",
    name: "Crispy Nuggets",
    description:
      "Nuggets de frango com uma apresentação crocante.",
    price: 250,
    category: "frango",
    image:
      "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1200&q=85",
    available: true,
    illustrative: true,
  },

  {
    id: "crispy-wings",
    name: "Crispy Wings",
    description:
      "Asas de frango para uma refeição ou um acompanhamento diferente.",
    price: 400,
    category: "frango",
    image:
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=1200&q=85",
    available: true,
    illustrative: true,
  },

  // ==========================================================
  // BEBIDAS
  // ==========================================================

  {
    id: "refrigerante",
    name: "Refrigerante",
    description:
      "Uma bebida para acompanhar o teu pedido.",
    price: 100,
    category: "bebidas",
    image:
      "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=1200&q=85",
    available: true,
    illustrative: true,
  },

  {
    id: "agua-mineral",
    name: "Água Mineral",
    description:
      "Água mineral para acompanhar a tua refeição.",
    price: 60,
    category: "bebidas",
    image:
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=1200&q=85",
    available: true,
    illustrative: true,
  },
];

/*
  ============================================================
  FUNÇÕES AUXILIARES
  ============================================================
*/

const fallbackImage =
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85";

function getCategoryName(categoryId) {
  const category = categories.find(
    (item) => item.id === categoryId
  );

  return category?.name || "Menu";
}

function formatPrice(price, priceLabel) {
  if (priceLabel) {
    return priceLabel;
  }

  if (price === null || price === undefined) {
    return "Preço a confirmar";
  }

  return `${Number(price).toLocaleString("pt-MZ")} MT`;
}

function getItemIdFromUrl() {
  const path = window.location.pathname;
  const parts = path.split("/").filter(Boolean);
  const menuIndex = parts.indexOf("menu");

  if (menuIndex === -1 || !parts[menuIndex + 1]) {
    return null;
  }

  return decodeURIComponent(parts[menuIndex + 1]);
}

/*
  ============================================================
  COMPONENTE
  ============================================================
*/

function DishDetails() {
  const itemId = getItemIdFromUrl();

  const item = menuItems.find(
    (menuItem) => menuItem.id === itemId
  );

  const [quantity, setQuantity] = useState(1);

  /*
    ==========================================================
    WHATSAPP
    ==========================================================

    Substitui o número de exemplo pelo número oficial do
    Flaming Dogs & Burgers, incluindo o indicativo do país,
    sem o sinal + nem espaços.
  */

  const whatsappNumber = "258XXXXXXXXX";

  const whatsappMessage = item
    ? encodeURIComponent(
        [
          "Olá, Flaming Dogs & Burgers!",
          "",
          "Gostaria de fazer um pedido:",
          `Produto: ${item.name}`,
          `Quantidade: ${quantity}`,
          `Preço unitário: ${formatPrice(item.price, item.priceLabel)}`,
          `Total: ${formatPrice(
            item.price === null || item.price === undefined
              ? null
              : item.price * quantity,
            item.priceLabel
          )}`,
          "",
          "Aguardo a confirmação. Obrigado!",
        ].join("\n")
      )
    : "";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  /*
    ==========================================================
    PRODUTO NÃO ENCONTRADO
    ==========================================================
  */

  if (!item) {
    return (
      <div className="dish-details-page">
        <header className="dish-details-header">
          <a href="/" className="dish-details-brand">
            <img
              src="/logo-flaming.png"
              alt="Flaming Dogs & Burgers"
            />

            <div className="dish-details-brand-text">
              <strong>Flaming Dogs</strong>
              <span>& Burgers</span>
            </div>
          </a>

          <a href="/menu" className="dish-details-menu-link">
            Ver menu
          </a>
        </header>

        <main className="dish-details-not-found">
          <span className="dish-details-not-found-icon">
            🍔
          </span>

          <span className="dish-details-eyebrow">
            FLAMING DOGS & BURGERS
          </span>

          <h1>Produto não encontrado</h1>

          <p>
            O produto que procuras não está disponível nesta
            página. Volta ao menu para conheceres as opções.
          </p>

          <a href="/menu" className="dish-details-back-button">
            ← Voltar ao menu
          </a>
        </main>

        <footer className="dish-details-footer">
          <div>
            <strong>FLAMING DOGS & BURGERS</strong>
            <span>Frango crocante. Sabor que conquista.</span>
          </div>

          <a href="/">Página inicial</a>
        </footer>
      </div>
    );
  }

  /*
    ==========================================================
    QUANTIDADE
    ==========================================================
  */

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => Math.min(99, current + 1));
  };

  /*
    ==========================================================
    ADICIONAR AO CARRINHO
    ==========================================================

    Fluxo:
    1. Adiciona o produto e a quantidade ao carrinho.
    2. Redireciona para /carrinho.
    3. Mantém a integração com ../utils/cart.

    Não usamos react-router-dom.
  */

  const handleAddToCart = () => {
    if (item.available === false) return;

    addToCart(item, quantity);

    window.location.href = "/cart";
  };

  /*
    ==========================================================
    RENDER
    ==========================================================
  */

  const total = Number(item.price || 0) * quantity;

  return (
    <div className="dish-details-page">
      {/* HEADER */}

      <header className="dish-details-header">
        <a href="/" className="dish-details-brand">
          <img
            src="/logo-flaming.png"
            alt="Flaming Dogs & Burgers"
          />

          <div className="dish-details-brand-text">
            <strong>Flaming Dogs</strong>
            <span>& Burgers</span>
          </div>
        </a>

        <a href="/menu" className="dish-details-menu-link">
          Ver menu
        </a>
      </header>

      {/* CONTEÚDO PRINCIPAL */}

      <main className="dish-details-main">
        <nav className="dish-details-breadcrumb" aria-label="Navegação">
          <a href="/">Início</a>
          <span>/</span>
          <a href="/menu">Menu</a>
          <span>/</span>
          <strong>{item.name}</strong>
        </nav>

        <a href="/menu" className="dish-details-back">
          ← Voltar ao menu
        </a>

        <section className="dish-details-card">
          {/* IMAGEM */}

          <div className="dish-details-image-column">
            <div className="dish-details-image-wrapper">
              <img
                src={item.image || fallbackImage}
                alt={item.name}
                className="dish-details-image"
                onError={(event) => {
                  const image = event.currentTarget;

                  if (image.dataset.fallbackApplied) {
                    return;
                  }

                  image.dataset.fallbackApplied = "true";
                  image.src = fallbackImage;
                }}
              />

              {item.illustrative && (
                <span className="dish-details-image-badge">
                  Imagem ilustrativa
                </span>
              )}

              <span className="dish-details-image-brand">
                FLAMING
              </span>
            </div>

            <div className="dish-details-image-caption">
              <span className="dish-details-caption-dot" />
              <span>Frango crocante. Sabor que conquista.</span>
            </div>
          </div>

          {/* INFORMAÇÃO DO PRODUTO */}

          <div className="dish-details-info">
            <div className="dish-details-eyebrow">
              <span className="dish-details-red-line" />
              FLAMING DOGS & BURGERS
            </div>

            <div className="dish-details-meta">
              <span className="dish-details-category">
                {getCategoryName(item.category)}
              </span>
            </div>

            <h1>{item.name}</h1>

            <div className="dish-details-rule" />

            <div className="dish-details-price">
              {formatPrice(item.price, item.priceLabel)}
            </div>

            {item.description && (
              <div className="dish-details-description">
                <span>SOBRE ESTE PRODUTO</span>
                <p>{item.description}</p>
              </div>
            )}

            {/* QUANTIDADE E TOTAL */}

            <div className="dish-details-order">
              {item.available !== false ? (
                <>
                  <div className="dish-details-quantity">
                    <span>Quantidade</span>

                    <div className="dish-details-quantity-control">
                      <button
                        type="button"
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                        aria-label="Diminuir quantidade"
                      >
                        −
                      </button>

                      <strong aria-live="polite">
                        {quantity}
                      </strong>

                      <button
                        type="button"
                        onClick={increaseQuantity}
                        disabled={quantity >= 99}
                        aria-label="Aumentar quantidade"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="dish-details-total">
                    <span>Total do pedido</span>
                    <strong>{formatPrice(total)}</strong>
                  </div>

                  <button
                    type="button"
                    className="dish-details-add-button"
                    onClick={handleAddToCart}
                  >
                    <span aria-hidden="true">🛒</span>
                    Adicionar ao pedido
                  </button>
                </>
              ) : (
                <div className="dish-details-unavailable">
                  Este produto está indisponível neste momento.
                </div>
              )}
            </div>

            {/* WHATSAPP */}

            <div className="dish-details-whatsapp">
              <div className="dish-details-whatsapp-text">
                <span>PRECISAS DE AJUDA?</span>

                <p>
                  Contacta-nos pelo WhatsApp para esclarecer
                  dúvidas sobre o menu ou o teu pedido.
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="dish-details-whatsapp-button"
              >
                <span aria-hidden="true">◉</span>
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* RODAPÉ */}

      <footer className="dish-details-footer">
        <div>
          <strong>FLAMING DOGS & BURGERS</strong>
          <span>Frango crocante. Sabor que conquista.</span>
        </div>

        <a href="/menu">Explorar o menu</a>
      </footer>
    </div>
  );
}

export default DishDetails;

