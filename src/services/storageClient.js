// ---- LINGUAGEM EM JOGO — Cliente de armazenamento local ----
// Serviço leve de persistência no navegador usado durante o
// desenvolvimento e como representação inicial antes da migração
// para o banco de dados real. Não substitui o backend/servidor.

const STORAGE_KEY = 'linguagemEmJogo_user';

export const loadUserData = (token) => {
  if (!token) {
    return Promise.resolve(null);
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return Promise.resolve(null);
    }

    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.token || parsed.token !== token) {
      return Promise.resolve(null);
    }

    return Promise.resolve(parsed);
  } catch (error) {
    console.error('[storageClient] Falha ao ler usuário.', error);
    return Promise.resolve(null);
  }
};

export const saveUserData = (token, user) => {
  if (!token || !user) {
    return;
  }

  try {
    const data = {
      token,
      ...user
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('[storageClient] Falha ao salvar usuário.', error);
  }
};

export const clearUserData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('[storageClient] Falha ao limpar usuário.', error);
  }
};
