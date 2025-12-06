#!/bin/bash

# Script para criar novo jogo no monorepo
# Uso: bash scripts/new-game.sh

echo "🎮 Criar Novo Jogo"
echo ""

# Pede informações
read -p "Nome do jogo (ex: meu-jogo): " GAME_NAME
read -p "Título do jogo (ex: Meu Jogo Incrível): " GAME_TITLE
read -p "Descrição curta: " GAME_DESC

# Cria diretório
mkdir -p "$GAME_NAME"
cd "$GAME_NAME"

# Cria index.html básico
cat > index.html << EOF
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$GAME_TITLE</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      font-family: Georgia, serif;
    }
  </style>
</head>
<body class="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 min-h-screen flex items-center justify-center p-6">
  <div class="max-w-2xl w-full bg-white/80 backdrop-blur rounded-2xl p-8 shadow-xl border-2 border-amber-200">
    <h1 class="text-4xl font-bold text-amber-900 mb-4">
      $GAME_TITLE
    </h1>
    
    <p class="text-amber-700 mb-6 leading-relaxed">
      $GAME_DESC
    </p>
    
    <div class="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 text-center">
      <p class="text-amber-800 font-semibold">
        🚧 Em Desenvolvimento
      </p>
    </div>
    
    <div class="mt-6 text-center">
      <a href="../" class="text-amber-600 hover:text-amber-800 underline">
        ← Voltar para todos os jogos
      </a>
    </div>
  </div>
</body>
</html>
EOF

# Cria README
cat > README.md << EOF
# $GAME_TITLE

$GAME_DESC

## Status

🚧 Em Desenvolvimento

## Tecnologias

- HTML
- CSS
- JavaScript

## Como Jogar

1. Acesse: \`https://seu-usuario.github.io/jogos/$GAME_NAME/\`
2. ...

## Desenvolvimento Local

\`\`\`bash
cd $GAME_NAME
python -m http.server 8000
# Acesse: http://localhost:8000
\`\`\`

## To-Do

- [ ] Implementar mecânica principal
- [ ] Adicionar UI
- [ ] Testar em mobile
- [ ] Adicionar thumbnail para landing page
EOF

# Volta para raiz
cd ..

echo ""
echo "✅ Jogo '$GAME_NAME' criado com sucesso!"
echo ""
echo "📝 Próximos passos:"
echo "   1. Edite: $GAME_NAME/index.html"
echo "   2. Adicione thumbnail em: assets/images/$GAME_NAME-thumb.png"
echo "   3. Adicione card na landing page (index.html)"
echo "   4. Commit:"
echo "      git add ."
echo "      git commit -m 'Add: $GAME_TITLE'"
echo "      git push"
echo ""
echo "🌐 Estará disponível em:"
echo "   https://seu-usuario.github.io/jogos/$GAME_NAME/"
