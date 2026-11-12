import { InformationBox } from "../InformationBox/InformationBox";
import "./LiteraturePage.css";

export function LiteraturePage() {
  return (
    <div className="literature-page">
      <div className="main-container">
        <h1>Você sabe como escrever uma pesquisa científica?</h1>

        <p>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <div className="information-boxes">
          <InformationBox
            title="Dicas para Escrever uma Pesquisa Científica"
            items={[
              "Use linguagem clara e objetiva.",
              "Cite fontes confiáveis.",
              "Revise o trabalho com atenção.",
            ]}
          />
          <InformationBox
            title="Dicas para Escrever uma Pesquisa Científica"
            items={[
              "Use linguagem clara e objetiva.",
              "Cite fontes confiáveis.",
              "Revise o trabalho com atenção.",
            ]}
          />
        </div>
      </div>
    </div>
  );
}
