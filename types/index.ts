// Tipos TypeScript para o projeto

export interface Usuario {
  id: number;
  email: string;
  nomeUsuario: string;
  data_criacao: string;
}

export interface LoginRequest {
  nomeUsuario: string;
  senha: string;
}

export interface RegisterRequest {
  email: string;
  nomeUsuario: string;
  senha: string;
}

export interface Token {
  acesso_token: string;
  token_tipo: string;
}

export interface Mensagem {
  id: number;
  id_conversa: number;
  papel: 'user' | 'assistant';
  conteudo: string;
  ferramentas?: string[] | null;
  criado_em: string;
}

export interface Conversa {
  id: number;
  usuario_id: number;
  titulo: string;
  data_criacao: string;
  atualizado_em: string;
}

export interface ConversaDetalhada extends Conversa {
  mensagens: Mensagem[];
}

export interface EnviarMensagemRequest {
  mensagem: string;
  id_conversa?: number | null;
}

export interface MensagemResponse {
  id_conversa: number;
  resposta: string;
  ferramentas_usadas?: string[] | null;
}
