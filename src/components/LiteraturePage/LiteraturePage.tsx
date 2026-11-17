import { BookOpenText, Check, Quote } from "lucide-react";
import { InformationBox } from "../InformationBox/InformationBox";
import "./LiteraturePage.css";

// Síntese das aulas fornecidas, na mesma ordem dos oito arquivos de apresentação.
// Os exemplos abaixo são didáticos; não representam resultados de pesquisas reais.
const researchSteps = [
  {
    title: "Comece com uma boa pergunta",
    description: "Delimite o tema e o que você pretende investigar.",
    items: [
      "Escolha um recorte viável: o que será estudado, em qual contexto e com quais recursos e prazos.",
      "Transforme o problema em uma pergunta específica. Defina o objetivo e, quando couber, uma hipótese: uma resposta provisória que os dados poderão testar.",
      "Planeje como buscar evidências. O conhecimento científico exige procedimentos claros e admite revisão diante de novos resultados.",
    ],
    example: {
      label: "Exemplo de pergunta",
      text: "Como um roteiro de revisão pode ajudar estudantes de graduação a identificar problemas de clareza em seus textos?",
    },
  },
  {
    title: "Apresente a pesquisa na introdução",
    description: "Conduza o leitor do contexto ao seu objetivo.",
    items: [
      "Apresente o tema com fontes pertinentes e afunile até a lacuna: o que os estudos existentes ainda não esclarecem.",
      "Formule a pergunta de pesquisa, explique sua relevância e apresente o objetivo, a proposta e a hipótese, quando aplicável.",
      "Antecipe brevemente o método e encerre com a organização das seções. Reserve os detalhes técnicos para a metodologia.",
    ],
    example: {
      label: "Roteiro para o parágrafo",
      text: "No contexto de [tema], os estudos apontam [lacuna]. Este trabalho investiga [pergunta] e tem como objetivo [objetivo], por meio de [método].",
    },
  },
  {
    title: "Busque e compare a literatura",
    description: "Entenda o que já se sabe e situe sua contribuição.",
    items: [
      "Em uma revisão sistemática, defina antes da busca um protocolo: pergunta, bases, termos, critérios de inclusão e exclusão e avaliação da qualidade dos estudos.",
      "Combine sinônimos com OR e conceitos com AND. Adapte a sintaxe a cada base e registre datas, filtros, quantidades de estudos e motivos de exclusão.",
      "Organize autor/ano, problema, método, resultados e limitações em uma tabela. Compare os achados e explique quais escolhas sustentam sua proposta.",
    ],
    example: {
      label: "Exemplo de busca para adaptar",
      text: '("escrita acadêmica" OR "academic writing") AND ("revisão de texto" OR "text revision")',
    },
  },
  {
    title: "Explique como a pesquisa será feita",
    description: "Descreva um método que outra pessoa possa compreender e repetir.",
    items: [
      "Justifique a abordagem: qualitativa para compreender experiências, quantitativa para analisar medidas ou mista para integrar as duas.",
      "Informe o contexto, a seleção da amostra ou dos dados, os instrumentos de coleta e a forma de análise. Registre os cuidados éticos e o consentimento, quando aplicável.",
      "Descreva as etapas em sequência, com ferramentas e critérios de validação. Um fluxograma pode ajudar, acompanhado da explicação de cada etapa.",
    ],
    example: {
      label: "Esqueleto da metodologia",
      text: "A pesquisa adota [abordagem], com [amostra e critérios]. Os dados serão coletados por [instrumento] e analisados por [técnica], escolhida porque [justificativa].",
    },
  },
  {
    title: "Documente o desenvolvimento",
    description: "Mostre o que você fez e em quais condições.",
    items: [
      "Organize a execução em subseções: preparação, procedimentos e registro dos resultados. Explique ajustes feitos em relação ao planejamento.",
      "Detalhe o ambiente, as ferramentas e suas versões, a origem dos dados e os parâmetros relevantes. Em experimentos, informe as repetições e justifique o roteiro de testes.",
      "Apresente tabelas e figuras com identificação, fonte e unidades, quando cabíveis. Cite-as no texto e explique o que mostram, seguindo o padrão exigido pela instituição ou periódico.",
    ],
    example: {
      label: "Modelo de registro",
      text: "O procedimento utilizou [ferramenta e versão], com [dados e parâmetros]. Cada cenário foi executado [quantidade] vezes, registrando [medidas e unidades].",
    },
  },
  {
    title: "Avalie e interprete os resultados",
    description: "Explique o que os dados permitem afirmar.",
    items: [
      "Diferencie testar, medir e avaliar: execute o procedimento, registre as medidas e interprete seu significado em relação ao objetivo.",
      "Escolha métricas adequadas à pergunta. Compare com trabalhos relacionados sob condições compatíveis e explicite diferenças de dados, amostras ou protocolos.",
      "Use tabelas e gráficos legíveis, discuta variações e resultados inesperados. Reconheça vieses, limitações e cenários que não foram avaliados.",
    ],
    example: {
      label: "Pergunta para guiar a análise",
      text: "O resultado responde ao objetivo? Em comparação com qual referência, sob quais condições e com quais limitações?",
    },
  },
  {
    title: "Feche o raciocínio na conclusão",
    description: "Responda à pergunta com as evidências que você apresentou.",
    items: [
      "Retome o objetivo e responda diretamente ao problema. Se houver hipótese, indique se os resultados a sustentam, a contradizem ou são inconclusivos.",
      "Sintetize os achados centrais e a contribuição para a área. Use apenas evidências já discutidas, sem acrescentar novos dados ou autores.",
      "Explique como as limitações afetam o alcance da conclusão e proponha trabalhos futuros ligados às lacunas que permaneceram.",
    ],
    example: {
      label: "Estrutura para adaptar",
      text: "O estudo investigou [problema]. Os resultados indicam [resposta], nas condições [contexto]. A contribuição é [avanço]. A limitação [limite] sugere investigar [próximo passo].",
    },
  },
  {
    title: "Revise com apoio da IA",
    description: "Peça uma análise criteriosa e mantenha a decisão autoral.",
    items: [
      "Monte o pedido com papel, tarefa, contexto e formato de resposta. Informe a seção, o objetivo da pesquisa e os critérios que deseja revisar.",
      "Peça que a IA aponte trechos, problemas e sugestões de clareza e coerência. Confira cada sugestão e valide dados e referências nas fontes originais.",
      "Preserve sua autoria, proteja dados confidenciais e declare o uso de IA conforme as orientações da instituição ou periódico. A revisão humana continua necessária.",
    ],
    example: {
      label: "Exemplo de pedido à IA",
      text: "Atue como revisor científico. Analise esta introdução considerando o objetivo [objetivo]. Verifique contexto, lacuna e pergunta de pesquisa. Responda com trecho, problema e sugestão. Não invente dados ou referências. Texto: [cole o trecho].",
    },
  },
];

const finalChecks = [
  "A conclusão responde à pergunta inicial.",
  "O método explica como os resultados foram obtidos.",
  "As citações correspondem às referências.",
  "O texto reconhece as limitações do estudo.",
];

export function LiteraturePage() {
  return (
    <main className="literature-page" lang="pt-BR" aria-labelledby="literature-title">
      <header className="literature-header">
        <p className="literature-eyebrow">
          <BookOpenText size={18} aria-hidden="true" />
          Leitura essencial
        </p>
        <h1 id="literature-title">Como escrever uma pesquisa científica</h1>
        <p className="literature-intro">
          Uma boa pesquisa conecta uma pergunta clara a uma resposta sustentada
          por evidências. Use este guia para planejar, escrever e revisar seu trabalho.
        </p>
        <div className="literature-principle">
          <span>O fio condutor</span>
          <p>Pergunta bem definida. Método coerente. Conclusão fundamentada.</p>
        </div>
      </header>

      <div className="literature-layout">
        <section className="literature-guide" aria-labelledby="guide-title">
          <div className="literature-section-heading">
            <h2 id="guide-title">Seu roteiro de escrita</h2>
            <span>8 etapas</span>
          </div>
          <p className="literature-section-description">
            Abra uma etapa para ver orientações e um exemplo.
          </p>
          <div className="literature-steps">
            {researchSteps.map((step, index) => (
              <InformationBox
                key={step.title}
                {...step}
                number={String(index + 1).padStart(2, "0")}
                groupName="research-steps"
                initiallyOpen={index === 0}
              />
            ))}
          </div>
        </section>

        <aside className="literature-reference" aria-label="Apoio à escrita e revisão">
          <section className="literature-note" aria-labelledby="first-impression-title">
            <BookOpenText size={20} aria-hidden="true" />
            <h2 id="first-impression-title">Título e resumo</h2>
            <p>
              <strong>No título, seja específico.</strong> Diga o que você estuda e,
              quando pertinente, como e para quê. Evite siglas pouco conhecidas.
            </p>
            <p>
              <strong>Finalize o resumo após a análise.</strong> Apresente contexto,
              lacuna, objetivo, método, resultados e contribuição. Respeite o limite
              de palavras e escolha palavras-chave que representem o estudo.
            </p>
          </section>

          <section className="literature-note" aria-labelledby="references-title">
            <Quote size={20} aria-hidden="true" />
            <h2 id="references-title">Dê crédito às fontes</h2>
            <p>
              Cite a fonte mesmo ao escrever uma ideia com suas palavras. Em uma
              transcrição literal, sinalize a citação e indique sua localização na obra.
            </p>
            <p>
              Confira autoria, ano e dados de cada referência. Para citações,
              referências e formatação, consulte as normas ABNT e o manual
              adotados pela sua instituição ou periódico.
            </p>
          </section>

          <section className="literature-checklist" aria-labelledby="checklist-title">
            <h2 id="checklist-title">Antes de entregar</h2>
            <p>Marque os pontos que você já conferiu nesta leitura.</p>
            {finalChecks.map((check) => (
              <label className="literature-check" key={check}>
                <input type="checkbox" />
                <span className="literature-check-icon" aria-hidden="true">
                  <Check size={13} />
                </span>
                <span>{check}</span>
              </label>
            ))}
          </section>
        </aside>
      </div>

      <footer className="literature-footer">
        <p>Baseado nas aulas 1 a 8 de Metodologia Científica.</p>
        <p>Adapte o roteiro à sua área e às orientações de quem acompanha sua pesquisa.</p>
      </footer>
    </main>
  );
}
