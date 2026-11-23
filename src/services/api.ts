const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export interface Alteracao {
  descricao: string;
  justificativa: string;
}

export interface SugestaoCorrecao {
  texto_original: string;
  texto_revisado: string;
  alteracoes: Alteracao[];
  justificativa: string;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let message = `Erro ${res.status}`;
    try {
      const data = await res.json();
      if (typeof data.detail === "string") message = data.detail;
      else if (Array.isArray(data.detail))
        message = data.detail.map((d: { msg: string }) => d.msg).join("; ");
    } catch {
      /* resposta sem JSON */
    }
    throw new ApiError(res.status, message);
  }
  return res.json();
}

export const api = {
  enviarDocumento: (texto: string) =>
    post<{ documento_id: string; n_chunks: number }>("/documentos", { texto }),

  revisar: (documento_id: string, prompt: string, trecho: string) =>
    post<SugestaoCorrecao>("/revisar", { documento_id, prompt, trecho }),
};
