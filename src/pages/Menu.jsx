import { useEffect, useMemo, useState } from "react";
import { addToCart, getCart } from "../utils/cart";
import "./Menu.css";

const CATEGORIES = [
  { id: "todos", name: "Todos" },
  { id: "hamburgueres", name: "Hambúrgueres" },
  { id: "hot-dogs", name: "Hot Dogs" },
  { id: "acompanhamentos", name: "Acompanhamentos" },
  { id: "frango", name: "Frango" },
  { id: "bebidas", name: "Bebidas" },
];

const PRODUCTS = [
  {
    id: "classic-burger",
    name: "Classic Burger",
    category: "hamburgueres",
    price: 350,
    description:
      "Hambúrguer clássico com carne, queijo, alface, tomate e molho da casa.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "double-smash",
    name: "Double Smash Burger",
    category: "hamburgueres",
    price: 500,
    description:
      "Duas camadas de carne, queijo derretido e molho especial num pão macio.",
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "bbq-bacon",
    name: "BBQ Bacon Burger",
    category: "hamburgueres",
    price: 550,
    description:
      "Hambúrguer com queijo, bacon e molho barbecue.",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "spicy-chicken",
    name: "Spicy Chicken Burger",
    category: "hamburgueres",
    price: 400,
    description:
      "Hambúrguer de frango crocante com alface e molho picante.",
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "classic-hot-dog",
    name: "Classic Hot Dog",
    category: "hot-dogs",
    price: 250,
    description:
      "Salsicha no pão com molhos e acompanhamentos clássicos.",
    image:
      "https://images.unsplash.com/photo-1612392062126-2f4e1e7c6c36?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "loaded-hot-dog",
    name: "Loaded Hot Dog",
    category: "hot-dogs",
    price: 380,
    description:
      "Hot dog com queijo, cebola crocante e molhos.",
    image:
      "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "fries",
    name: "Batatas Fritas",
    category: "acompanhamentos",
    price: 150,
    description:
      "Batatas fritas douradas e crocantes.",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "loaded-fries",
    name: "Loaded Fries",
    category: "acompanhamentos",
    price: 300,
    description:
      "Batatas fritas com queijo e molho.",
    image:
      "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "onion-rings",
    name: "Onion Rings",
    category: "acompanhamentos",
    price: 200,
    description:
      "Anéis de cebola envolvidos numa cobertura crocante.",
    image:
      "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "crispy-nuggets",
    name: "Crispy Nuggets",
    category: "frango",
    price: 250,
    description:
      "Pedaços de frango panados e crocantes.",
    image:
      "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "crispy-wings",
    name: "Crispy Wings",
    category: "frango",
    price: 400,
    description:
      "Asas de frango crocantes, acompanhadas de molho.",
    image:
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "soft-drink",
    name: "Refrigerante",
    category: "bebidas",
    price: 100,
    description:
      "Refrigerante servido fresco.",
    image:
      "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "mineral-water",
    name: "Água Mineral",
    category: "bebidas",
    price: 60,
    description:
      "Água mineral servida fresca.",
    image:
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=900&q=85",
  },
];

const formatPrice = (price) =>
  `${new Intl.NumberFormat("pt-MZ", {
    maximumFractionDigits: 2,
  }).format(price)} MT`;

function getCartCount(cart) {
  if (!Array.isArray(cart)) return 0;

  return cart.reduce((total, item) => {
    const quantity = Number(item.quantity ?? item.qty ?? 1);
    return total + (Number.isFinite(quantity) ? quantity : 1);
  }, 0);
}

function ProductImage({ src, alt }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="menu-dish-image">
      {!imageError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          className="menu-image-placeholder"
          role="img"
          aria-label={alt}
        >
          <span>🍔</span>
          <small>Imagem ilustrativa</small>
        </div>
      )}

      <span className="menu-image-label">
        Imagem ilustrativa
      </span>
    </div>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount(getCart()));
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("pt");

    return PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === "todos" ||
        product.category === activeCategory;

      const matchesSearch =
        !normalizedSearch ||
        product.name.toLocaleLowerCase("pt").includes(normalizedSearch) ||
        product.description
          .toLocaleLowerCase("pt")
          .includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  function handleAddToCart(product) {
    try {
      addToCart(product);

      setCartCount(getCartCount(getCart()));
      setNotice(`${product.name} adicionado ao carrinho.`);

      window.setTimeout(() => {
        setNotice("");
      }, 2500);
    } catch (error) {
      console.error(
        "Erro ao adicionar produto ao carrinho:",
        error
      );

      setNotice(
        "Não foi possível adicionar o produto. Tenta novamente."
      );
    }
  }

  return (
    <main className="menu-page">
      <header className="menu-header">
        <a
          href="/"
          className="menu-brand"
          aria-label="Página inicial"
        >
          <img
            src="/logo-flaming.png"
            alt="Flaming Dogs & Burgers"
            className="menu-logo"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />

          <span className="menu-brand-text">
            <strong>FLAMING</strong>
            <span>DOGS & BURGERS</span>
          </span>
        </a>

        <nav
          className="menu-header-actions"
          aria-label="Navegação"
        >
          <a href="/" className="menu-home-link">
            Início
          </a>

          <a href="/carrinho" className="menu-cart-link">
            <span aria-hidden="true">🛒</span>
            <span>Carrinho</span>
            <span className="menu-cart-count">
              {cartCount}
            </span>
          </a>
        </nav>
      </header>

      <section className="menu-intro">
        <span className="menu-eyebrow">
          FLAMING DOGS & BURGERS
        </span>

        <h1>
          O teu próximo
          <span> sabor favorito.</span>
        </h1>

        <p>
          Hambúrgueres, hot dogs, frango crocante e acompanhamentos
          para tornar cada refeição especial.
        </p>

        <a href="#menu-produtos" className="menu-cta">
          Explorar o menu <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="menu-content" id="menu-produtos">
        <div className="menu-section-heading">
          <div>
            <span className="menu-eyebrow">
              ESCOLHE O TEU FAVORITO
            </span>
            <h2>O nosso menu</h2>
          </div>

          <span className="menu-product-total">
            {filteredProducts.length} produtos
          </span>
        </div>

        <div className="menu-search-section">
          <label htmlFor="menu-search">
            Pesquisar no menu
          </label>

          <div className="menu-search-box">
            <span aria-hidden="true">⌕</span>

            <input
              id="menu-search"
              type="search"
              placeholder="Ex.: burger, batatas, frango..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Limpar pesquisa"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div
          className="menu-categories"
          aria-label="Categorias do menu"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`menu-category-button ${
                activeCategory === category.id ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
              aria-pressed={activeCategory === category.id}
            >
              {category.name}
            </button>
          ))}
        </div>

        {notice && (
          <div className="menu-notice" role="status">
            <span aria-hidden="true">✓</span>
            {notice}
          </div>
        )}

        {filteredProducts.length > 0 ? (
          <div className="menu-results">
            {filteredProducts.map((product) => (
              <article
                className="menu-dish-card"
                key={product.id}
              >
                <a
                  href={`/menu/${product.id}`}
                  className="menu-product-link"
                  aria-label={`Ver detalhes de ${product.name}`}
                >
                  <ProductImage
                    src={product.image}
                    alt={`${product.name} — imagem ilustrativa`}
                  />
                </a>

                <div className="menu-dish-content">
                  <span className="menu-dish-category">
                    {
                      CATEGORIES.find(
                        (category) =>
                          category.id === product.category
                      )?.name
                    }
                  </span>

                  <h3>{product.name}</h3>

                  <p>{product.description}</p>

                  <div className="menu-dish-footer">
                    <div className="menu-dish-price">
                      {formatPrice(product.price)}
                      <small>Preço ilustrativo</small>
                    </div>

                    <button
                      type="button"
                      className="menu-add-button"
                      onClick={() => handleAddToCart(product)}
                      aria-label={`Adicionar ${product.name} ao carrinho`}
                    >
                      <span aria-hidden="true">+</span>
                      <span>Adicionar</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="menu-empty-state">
            <span aria-hidden="true">🍔</span>

            <h3>Nenhum produto encontrado</h3>

            <p>
              Experimenta outra pesquisa ou seleciona uma categoria
              diferente.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("todos");
              }}
            >
              Ver todos os produtos
            </button>
          </div>
        )}
      </section>

      <section className="menu-whatsapp-section">
        <span className="menu-eyebrow">
          A TUA PRÓXIMA REFEIÇÃO COMEÇA AQUI
        </span>

        <h2>Já escolheste o teu favorito?</h2>

        <p>
          Adiciona os teus produtos ao carrinho e prepara o teu pedido.
        </p>

        <a href="/carrinho" className="menu-cta">
          Ver carrinho <span aria-hidden="true">→</span>
        </a>
      </section>

      <footer className="menu-footer">
        <a href="/" className="menu-footer-brand">
          FLAMING <span>DOGS & BURGERS</span>
        </a>

        <p>Frango crocante. Sabor que conquista.</p>

        <small>
          © {new Date().getFullYear()} Flaming Dogs & Burgers.
          Todos os direitos reservados.
        </small>

        <small className="menu-disclaimer">
          Produtos, descrições, preços e imagens apresentados são
          ilustrativos e devem ser confirmados antes da publicação oficial.
        </small>
      </footer>
    </main>
  );
}