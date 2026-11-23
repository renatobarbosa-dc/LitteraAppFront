import { Form } from "../Form/Form";
import { Loading } from "../Loading/Loading";
import { Chat } from "../Chat/Chat";
import { useState, useEffect } from "react";
import "./Notebook.css";
import logoPrincipal from "./../../assets/logo-principal.svg";
import type { Chat as ChatData } from "../../App";
import { api, ApiError, type SugestaoCorrecao } from "../../services/api";

type View = "home" | "loading" | "chat";

interface Message {
  role: "user" | "ai";
  content: string;
}

interface NotebookProps {
  activeChat: ChatData | null;
  onSaveChat: (chat: ChatData) => void;
}

function formatarSugestao(s: SugestaoCorrecao): string {
  const alteracoes = s.alteracoes
    .map((a, i) => `${i + 1}. ${a.descricao}\n   ${a.justificativa}`)
    .join("\n");

  return [
    "Texto revisado:",
    s.texto_revisado,
    "",
    "Justificativa:",
    s.justificativa,
    alteracoes ? `\nAlterações:\n${alteracoes}` : "",
  ].join("\n");
}

const erroParaTexto = (e: unknown) =>
  e instanceof ApiError ? `Erro: ${e.message}` : "Falha ao conectar com a API.";

export function Notebook({ activeChat, onSaveChat }: NotebookProps) {
  const [view, setView] = useState<View>("home");
  const [messages, setMessages] = useState<Message[]>([]);
  const [wikiUrl, setWikiUrl] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (activeChat) {
      setMessages(activeChat.messages);
      setWikiUrl(activeChat.wikiUrl);
      setView("chat");
    } else {
      setMessages([]);
      setWikiUrl("");
      setView("home");
    }
  }, [activeChat?.id]);

  // Vem do Form: 1º campo = prompt, 2º campo = texto do documento
  const handleSubmit = async (prompt: string, texto: string) => {
    setErro(null);
    setView("loading");

    try {
      const { documento_id } = await api.enviarDocumento(texto);
      const sugestao = await api.revisar(documento_id, prompt, texto);

      const newMessages: Message[] = [
        { role: "user", content: prompt },
        { role: "ai", content: formatarSugestao(sugestao) },
      ];

      setMessages(newMessages);
      setView("chat");

      onSaveChat({
        id: crypto.randomUUID(),
        title: texto.slice(0, 30),
        wikiUrl: "",
        documentoId: documento_id,
        trechoAtual: sugestao.texto_revisado,
        messages: newMessages,
      });
    } catch (e) {
      setErro(erroParaTexto(e));
      setView("home");
    }
  };

  // Vem do Chat: perguntas seguintes
  const handleNewMessage = async (question: string) => {
    const updated: Message[] = [
      ...messages,
      { role: "user", content: question },
    ];
    setMessages(updated);

    // chats antigos (salvos antes da API) não têm documentoId
    if (!activeChat?.documentoId) {
      setMessages([
        ...updated,
        {
          role: "ai",
          content:
            "Este chat foi criado antes da integração com a API. Crie uma nova página para continuar.",
        },
      ]);
      return;
    }

    setIsTyping(true);

    let resposta: string;
    let novoTrecho = activeChat.trechoAtual;

    try {
      const sugestao = await api.revisar(
        activeChat.documentoId,
        question,
        activeChat.trechoAtual ?? "",
      );
      resposta = formatarSugestao(sugestao);
      novoTrecho = sugestao.texto_revisado;
    } catch (e) {
      resposta = erroParaTexto(e);
    }

    setIsTyping(false);
    const final: Message[] = [...updated, { role: "ai", content: resposta }];
    setMessages(final);

    onSaveChat({ ...activeChat, trechoAtual: novoTrecho, messages: final });
  };

  return (
    <div className="notebook">
      <div className="main-container">
        {view === "home" && (
          <>
            <div className="logo-container">
              <img className="logo-svg" src={logoPrincipal} />
            </div>
            <div className="forms-container">
              {erro && <p className="erro">{erro}</p>}
              <Form onSubmit={handleSubmit} />
            </div>
          </>
        )}

        {view === "chat" && (
          <Chat
            messages={messages}
            wikiUrl={wikiUrl}
            onNewMessage={handleNewMessage}
            isTyping={isTyping}
          />
        )}
      </div>

      {view === "loading" && (
        <div className="loading-overlay">
          <Loading />
        </div>
      )}
    </div>
  );
}
