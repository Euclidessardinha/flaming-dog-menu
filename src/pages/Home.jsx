
import "./Home.css";

function Home() {
  // Substituir pelo número oficial de pedidos, apenas com indicativo e dígitos.
  const whatsappNumber = "258842228183";

  const whatsappMessage = encodeURIComponent(
    "Olá, Flaming Dogs e Burgers! Gostaria de fazer um pedido."
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="home-page flaming-home">
      <header className="home-header">
        <a href="/" className="home-brand">
          <img src="/logo-flaming.png" alt="Flaming Dogs e Burgers" />
          <span>FLAMING</span>
        </a>

        <a
          href={whatsappUrl}
          className="home-header-whatsapp"
          target="_blank"
          rel="noreferrer"
        >
          Pedir agora ↗
        </a>
      </header>

      <main>
        <section className="home-hero">
          <div className="home-hero-overlay"></div>

          <div className="home-hero-content">
            <span className="home-hero-label">
              FLAMING DOGS & BURGERS
            </span>

            <h1>
              A fome pede.
              <br />
              <span>O Flaming resolve!</span>
            </h1>

            <p>
              Hot dogs e burgers gourmet para quem procura
              sabor e uma experiência que dá vontade de repetir.
            </p>

            <div className="home-hero-actions">
              <a
                href="/menu"
                className="home-button home-button-primary"
              >
                Ver o menu <span>→</span>
              </a>

              <a
                href={whatsappUrl}
                className="home-button home-button-secondary"
                target="_blank"
                rel="noreferrer"
              >
                Fazer pedido ↗
              </a>
            </div>
          </div>

          <div className="home-hero-scroll">
            <span>DESCOBRE O SABOR</span>
            <span className="home-scroll-line"></span>
          </div>
        </section>

        <section className="home-intro">
          <div className="home-intro-label">
            BEM-VINDO AO FLAMING
          </div>

          <h2>
            A tua fome.
            <br />
            <span>A nossa paixão.</span>
          </h2>

          <p>
            Descobre o nosso menu, escolhe os teus favoritos
            e prepara-te para matar a fome com muito sabor.
            O próximo pedido começa aqui.
          </p>
        </section>

        <section className="home-experience">
          <div className="home-experience-card">
            <div className="home-experience-icon">🍔</div>

            <span>BURGERS</span>

            <h3>Encontra o teu favorito</h3>

            <p>
              Explora as opções disponíveis no nosso menu
              e escolhe o burger ideal para ti.
            </p>

            <a href="/menu">
              Explorar menu <span>→</span>
            </a>
          </div>

          <div className="home-experience-card home-experience-card-featured">
            <div className="home-experience-icon">🌭</div>

            <span>HOT DOGS</span>

            <h3>Mais sabor a cada dentada</h3>

            <p>
              Descobre as opções de hot dogs disponíveis
              e encontra a tua próxima escolha.
            </p>

            <a href="/menu">
              Ver opções <span>→</span>
            </a>
          </div>

          <div className="home-experience-card">
            <div className="home-experience-icon">🔥</div>

            <span>FAZ O TEU PEDIDO</span>

            <h3>É simples e rápido</h3>

            <p>
              Consulta o menu e entra em contacto connosco
              pelo WhatsApp para fazer o teu pedido.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              Pedir pelo WhatsApp <span>→</span>
            </a>
          </div>
        </section>

        <section className="home-art flaming-order">
          <div className="home-art-content">
            <span className="home-art-label">
              ESTÁS COM FOME?
            </span>

            <h2>
              O teu próximo
              <br />
              <span>favorito está aqui.</span>
            </h2>

            <p>
              Consulta o menu, escolhe os teus produtos
              e contacta-nos para fazer o teu pedido.
            </p>

            <a href="/menu" className="home-art-button">
              Descobrir o menu <span>→</span>
            </a>
          </div>
        </section>

        <section className="home-visit">
          <div className="home-visit-header">
            <span>FLAMING DOGS & BURGERS</span>

            <h2>
              Estamos à tua espera<span>.</span>
            </h2>

            <p>
              Visita-nos na Malanga, em Maputo,
              ou contacta-nos para informações sobre pedidos.
            </p>
          </div>

          <div className="home-visit-grid">
            <div className="home-visit-card">
              <div className="home-visit-icon">📍</div>

              <div>
                <span>LOCALIZAÇÃO</span>
                <h3>Malanga, Maputo</h3>
                <p>
                  Av. Rio Tembe, Nº 135, Maputo, Moçambique.
                </p>
              </div>
            </div>

            <div className="home-visit-card">
              <div className="home-visit-icon">🕒</div>

              <div>
                <span>HORÁRIO</span>
                <h3>Todos os dias</h3>
                <p>
                  Consulta os nossos canais oficiais
                  para confirmar o horário de funcionamento.
                </p>
              </div>
            </div>

            <div className="home-visit-card">
              <div className="home-visit-icon">💬</div>

              <div>
                <span>CONTACTO</span>
                <h3>WhatsApp</h3>
                <p>
                  Fala connosco sobre o teu pedido.
                </p>
              </div>
            </div>
          </div>

          <div className="home-visit-action">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              Contactar agora <span>→</span>
            </a>
          </div>
        </section>

        <section className="home-feedback">
          <div className="home-feedback-inner">
            <span className="home-feedback-label">
              A TUA OPINIÃO CONTA
            </span>

            <h2>
              Já provaste?
              <br />
              <span>Conta-nos tudo.</span>
            </h2>

            <p>
              A tua opinião ajuda-nos a melhorar
              a experiência Flaming.
            </p>

            <a
              href="/reviews#review-form"
              className="home-feedback-button"
            >
              Avaliar experiência <span>→</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <div className="home-footer-brand">
          <img src="/logo-flaming.png" alt="Flaming Dogs e Burgers" />

          <div>
            <strong>FLAMING DOGS & BURGERS</strong>
            <span>Hotdogs e Burgers Gourmet</span>
          </div>
        </div>

        <div className="home-footer-links">
          <a href="/menu">Ver menu</a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            Fazer pedido
          </a>

          <a href="/reviews">Avaliações</a>
        </div>

        <div className="home-footer-copy">
          © {new Date().getFullYear()} Flaming Dogs & Burgers
        </div>
      </footer>
    </div>
  );
}

export default Home;