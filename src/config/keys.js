// ---- LINGUAGEM EM JOGO — Configuração central de rotas ----
// Alterar oPUBLIC_BASE_URL somente se o aplicativo for empilhado
// em um subpatho diferente (ex.: /app). Em produção, definir a
// origem real do backend no ambiente.

export const PUBLIC_BASE_URL = import.meta.env.VITE_PUBLIC_BASE_URL || '/';

export const Path = {
  STUDENT_HOME: `${PUBLIC_BASE_URL}aluno`,
  STUDENT_ACTIVITIES: `${PUBLIC_BASE_URL}aluno/ativas`,
  STUDENT_ACTIVITY_PLAY: (activityId) => `${PUBLIC_BASE_URL}aluno/ativas/${activityId}`,
  STUDENT_JOURNEY: `${PUBLIC_BASE_URL}aluno/minha-jornada`,

  TEACHER_LOGIN: `${PUBLIC_BASE_URL}professor/login`,
  TEACHER_DASHBOARD: `${PUBLIC_BASE_URL}professor`,
  TEACHER_CLASSROOM_MGMT: `${PUBLIC_BASE_URL}professor/turmas`,
  TEACHER_STUDENTS_MGMT: `${PUBLIC_BASE_URL}professor/alunos`,
  TEACHER_STUDENT_PROFILE: `${PUBLIC_BASE_URL}professor/alunos/:id`,
  TEACHER_ACTIVITIES_MGMT: `${PUBLIC_BASE_URL}professor/ativas`,
  TEACHER_REPORTS: `${PUBLIC_BASE_URL}professor/relatorios`,
  TEACHER_ACCESSIBILITY: `${PUBLIC_BASE_URL}professor/acessibilidade`,
  TEACHER_ACCESSIBILITY_FORM: `${PUBLIC_BASE_URL}professor/acessibilidade/formulario`
};

export const API = {
  BASE: `${PUBLIC_BASE_URL}api`
};

export const Auth = {
  LOGIN_ENDPOINT: `${API.BASE}/auth/login`,
  REGISTER_ENDPOINT: `${API.BASE}/auth/register`
};
