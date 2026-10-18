@echo off
REM Linguagem em Jogo — LinguaJogo
REM Script de inicialização local do projeto.

cd /d "%~dp0"

echo.
echo [Linguagem em Jogo] Atualizando dependências...
call npm install
if errorlevel 1 (
  echo.
  echo [ERRO] Falha ao instalar as dependências.
  pause
  exit /b 1
)

echo.
echo [Linguagem em Jogo] Iniciando servidor de API...
start /b cmd /c "npm run server"

echo.
echo [Linguagem em Jogo] Iniciando servidor de desenvolvimento (Vite)...
call npm run dev
