const { useState } = React;
const { Shuffle, RefreshCw, Settings, BookOpen, Sparkles, Users, Crown } = lucide;

// Dicionário de palavras por categoria, tema e raridade
// Raridade: 1=muito comum, 2=comum, 3=incomum, 4=raro
const DICIONARIO = {
  substantivos: {
    geral: [
      {palavra: 'casa', raridade: 1}, {palavra: 'porta', raridade: 1}, {palavra: 'caminho', raridade: 1}, {palavra: 'noite', raridade: 1},
      {palavra: 'livro', raridade: 2}, {palavra: 'sombra', raridade: 2}, {palavra: 'carta', raridade: 2}, {palavra: 'janela', raridade: 2}, {palavra: 'espelho', raridade: 2}, {palavra: 'chave', raridade: 2},
      {palavra: 'floresta', raridade: 3}, {palavra: 'portal', raridade: 3}, {palavra: 'relógio', raridade: 3}, {palavra: 'cofre', raridade: 3}, {palavra: 'mapa', raridade: 3}, {palavra: 'torre', raridade: 3},
      {palavra: 'labirinto', raridade: 4}, {palavra: 'obelisco', raridade: 4}, {palavra: 'átrio', raridade: 4}
    ],
    misterio: [
      {palavra: 'pista', raridade: 1}, {palavra: 'suspeito', raridade: 1},
      {palavra: 'segredo', raridade: 2}, {palavra: 'enigma', raridade: 2}, {palavra: 'testemunha', raridade: 2}, {palavra: 'detetive', raridade: 2},
      {palavra: 'arquivo', raridade: 3}, {palavra: 'código', raridade: 3}, {palavra: 'evidência', raridade: 3}, {palavra: 'conspiração', raridade: 3},
      {palavra: 'subterfúgio', raridade: 4}, {palavra: 'charada', raridade: 4}
    ],
    aventura: [
      {palavra: 'caminho', raridade: 1}, {palavra: 'montanha', raridade: 1},
      {palavra: 'tesouro', raridade: 2}, {palavra: 'caverna', raridade: 2}, {palavra: 'oceano', raridade: 2}, {palavra: 'navio', raridade: 2},
      {palavra: 'bússola', raridade: 3}, {palavra: 'tempestade', raridade: 3}, {palavra: 'ilha', raridade: 3}, {palavra: 'deserto', raridade: 3},
      {palavra: 'vulcão', raridade: 4}, {palavra: 'abismo', raridade: 4}
    ],
    fantasia: [
      {palavra: 'magia', raridade: 1}, {palavra: 'reino', raridade: 1},
      {palavra: 'dragão', raridade: 2}, {palavra: 'feitiço', raridade: 2}, {palavra: 'cristal', raridade: 2}, {palavra: 'poção', raridade: 2},
      {palavra: 'ruína', raridade: 3}, {palavra: 'oráculo', raridade: 3}, {palavra: 'profecia', raridade: 3}, {palavra: 'artefato', raridade: 3},
      {palavra: 'grimório', raridade: 4}, {palavra: 'ente', raridade: 4}
    ],
    cotidiano: [
      {palavra: 'café', raridade: 1}, {palavra: 'parque', raridade: 1}, {palavra: 'telefone', raridade: 1},
      {palavra: 'estação', raridade: 2}, {palavra: 'escritório', raridade: 2}, {palavra: 'mercado', raridade: 2}, {palavra: 'vizinho', raridade: 2},
      {palavra: 'envelope', raridade: 3}, {palavra: 'fotografia', raridade: 3}, {palavra: 'diário', raridade: 3},
      {palavra: 'almanaque', raridade: 4}, {palavra: 'vitrine', raridade: 4}
    ]
  },
  verbos: {
    acao: [
      {palavra: 'correr', raridade: 1}, {palavra: 'saltar', raridade: 1}, {palavra: 'cair', raridade: 1},
      {palavra: 'escapar', raridade: 2}, {palavra: 'perseguir', raridade: 2}, {palavra: 'lutar', raridade: 2}, {palavra: 'nadar', raridade: 2},
      {palavra: 'escalar', raridade: 3}, {palavra: 'voar', raridade: 3}, {palavra: 'deslizar', raridade: 3},
      {palavra: 'esquivar', raridade: 4}, {palavra: 'espreitar', raridade: 4}
    ],
    percepcao: [
      {palavra: 'ver', raridade: 1}, {palavra: 'ouvir', raridade: 1}, {palavra: 'sentir', raridade: 1},
      {palavra: 'descobrir', raridade: 2}, {palavra: 'observar', raridade: 2}, {palavra: 'escutar', raridade: 2}, {palavra: 'notar', raridade: 2},
      {palavra: 'perceber', raridade: 3}, {palavra: 'reconhecer', raridade: 3}, {palavra: 'avistar', raridade: 3},
      {palavra: 'vislumbrar', raridade: 4}, {palavra: 'divisar', raridade: 4}
    ],
    comunicacao: [
      {palavra: 'falar', raridade: 1}, {palavra: 'gritar', raridade: 1},
      {palavra: 'sussurrar', raridade: 2}, {palavra: 'revelar', raridade: 2}, {palavra: 'prometer', raridade: 2}, {palavra: 'contar', raridade: 2},
      {palavra: 'confessar', raridade: 3}, {palavra: 'mentir', raridade: 3}, {palavra: 'questionar', raridade: 3},
      {palavra: 'murmurar', raridade: 4}, {palavra: 'tagarelar', raridade: 4}
    ],
    mudanca: [
      {palavra: 'abrir', raridade: 1}, {palavra: 'fechar', raridade: 1}, {palavra: 'quebrar', raridade: 1},
      {palavra: 'transformar', raridade: 2}, {palavra: 'surgir', raridade: 2}, {palavra: 'construir', raridade: 2}, {palavra: 'destruir', raridade: 2},
      {palavra: 'desaparecer', raridade: 3}, {palavra: 'fragmentar', raridade: 3}, {palavra: 'fundir', raridade: 3},
      {palavra: 'transmutar', raridade: 4}, {palavra: 'esvanecer', raridade: 4}
    ],
    pensamento: [
      {palavra: 'pensar', raridade: 1}, {palavra: 'lembrar', raridade: 1}, {palavra: 'esquecer', raridade: 1},
      {palavra: 'imaginar', raridade: 2}, {palavra: 'planejar', raridade: 2}, {palavra: 'decidir', raridade: 2},
      {palavra: 'hesitar', raridade: 3}, {palavra: 'duvidar', raridade: 3}, {palavra: 'compreender', raridade: 3},
      {palavra: 'ponderar', raridade: 4}, {palavra: 'conjecturar', raridade: 4}
    ]
  },
  adjetivos: {
    aparencia: [
      {palavra: 'grande', raridade: 1}, {palavra: 'pequeno', raridade: 1}, {palavra: 'escuro', raridade: 1},
      {palavra: 'antigo', raridade: 2}, {palavra: 'brilhante', raridade: 2}, {palavra: 'estranho', raridade: 2}, {palavra: 'prateado', raridade: 2},
      {palavra: 'dourado', raridade: 3}, {palavra: 'transparente', raridade: 3}, {palavra: 'opaco', raridade: 3}, {palavra: 'desbotado', raridade: 3},
      {palavra: 'diáfano', raridade: 4}, {palavra: 'translúcido', raridade: 4}
    ],
    emocao: [
      {palavra: 'triste', raridade: 1}, {palavra: 'feliz', raridade: 1},
      {palavra: 'assustador', raridade: 2}, {palavra: 'misterioso', raridade: 2}, {palavra: 'reconfortante', raridade: 2},
      {palavra: 'perturbador', raridade: 3}, {palavra: 'nostálgico', raridade: 3}, {palavra: 'inquietante', raridade: 3}, {palavra: 'fascinante', raridade: 3},
      {palavra: 'melancólico', raridade: 4}, {palavra: 'lúgubre', raridade: 4}
    ],
    tamanho: [
      {palavra: 'grande', raridade: 1}, {palavra: 'pequeno', raridade: 1},
      {palavra: 'alto', raridade: 2}, {palavra: 'baixo', raridade: 2}, {palavra: 'estreito', raridade: 2},
      {palavra: 'imenso', raridade: 3}, {palavra: 'minúsculo', raridade: 3}, {palavra: 'vasto', raridade: 3}, {palavra: 'profundo', raridade: 3},
      {palavra: 'colossal', raridade: 4}, {palavra: 'diminuto', raridade: 4}
    ],
    qualidade: [
      {palavra: 'bom', raridade: 1}, {palavra: 'mau', raridade: 1},
      {palavra: 'perfeito', raridade: 2}, {palavra: 'quebrado', raridade: 2}, {palavra: 'valioso', raridade: 2},
      {palavra: 'inútil', raridade: 3}, {palavra: 'sagrado', raridade: 3}, {palavra: 'proibido', raridade: 3}, {palavra: 'esquecido', raridade: 3},
      {palavra: 'lendário', raridade: 4}, {palavra: 'imaculado', raridade: 4}
    ]
  },
  conectores: [
    {palavra: 'através', raridade: 2}, {palavra: 'entre', raridade: 2}, {palavra: 'dentro', raridade: 2}, {palavra: 'sem', raridade: 2},
    {palavra: 'além', raridade: 3}, {palavra: 'contra', raridade: 3}, {palavra: 'sob', raridade: 3}, {palavra: 'sobre', raridade: 3},
    {palavra: 'durante', raridade: 3}, {palavra: 'apesar', raridade: 3}, {palavra: 'enquanto', raridade: 3}, {palavra: 'até', raridade: 2}, {palavra: 'desde', raridade: 2}
  ],
  outros: [
    {palavra: 'nunca', raridade: 1}, {palavra: 'sempre', raridade: 1},
    {palavra: 'súbito', raridade: 2}, {palavra: 'finalmente', raridade: 2}, {palavra: 'novamente', raridade: 2}, {palavra: 'talvez', raridade: 2},
    {palavra: 'certamente', raridade: 3}, {palavra: 'apenas', raridade: 3}, {palavra: 'quase', raridade: 3},
    {palavra: 'jamais', raridade: 4}, {palavra: 'outrossim', raridade: 4}
  ]
};

const PERSONAGENS = {
  nomes: ['Marina', 'Lucas', 'Sofia', 'Diego', 'Aurora', 'Dante', 'Íris', 'Theo', 'Luna', 'Atlas'],
  profissoes: ['arquiteta', 'detetive', 'professor', 'artista', 'cientista', 'jornalista', 'músico', 'chef', 'piloto', 'bibliotecária'],
  tracos: ['perfeccionista', 'impulsivo', 'observador', 'sonhador', 'cético', 'corajoso', 'cauteloso', 'carismático', 'introspectivo', 'idealista'],
  habilidades: ['memória fotográfica', 'intuição aguçada', 'talento artístico', 'conhecimento obscuro', 'reflexos rápidos', 'empatia excepcional', 'lógica impecável'],
  defeitos: ['teme alturas', 'não confia em ninguém', 'obcecado pelo passado', 'evita confrontos', 'mente compulsivo', 'não sabe dizer não', 'guarda segredos demais'],
  lugares: ['terraço de arranha-céu', 'biblioteca antiga', 'estação de trem', 'galeria de arte', 'laboratório', 'floresta nebulosa', 'mansão abandonada', 'café movimentado'],
  eventos: ['as luzes apagaram', 'encontrou uma carta misteriosa', 'reconheceu um rosto familiar', 'ouviu um som estranho', 'percebeu que estava sendo seguido', 'o relógio parou']
};

const TEMAS_CHECKPOINT = [
  { nome: 'Ação', cor: '#e74c3c', palavra: 'SÚBITO' },
  { nome: 'Mistério', cor: '#9b59b6', palavra: 'PORÉM' },
  { nome: 'Revelação', cor: '#f39c12', palavra: 'FINALMENTE' },
  { nome: 'Perigo', cor: '#c0392b', palavra: 'ATENÇÃO' },
  { nome: 'Romance', cor: '#e91e63', palavra: 'NAQUELE MOMENTO' },
  { nome: 'Comédia', cor: '#3498db', palavra: 'IRONICAMENTE' }
];

export default function StoryWeave() {
  const [tela, setTela] = useState('inicio'); // inicio, jogadores, jogo, config
  const [personagem, setPersonagem] = useState(null);
  const [personagemVisivel, setPersonagemVisivel] = useState(true);
  const [palavrasAtuais, setPalavrasAtuais] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [numeroJogadores, setNumeroJogadores] = useState(3);
  const [jogadorAtual, setJogadorAtual] = useState(1); // 1, 2, 3, ...
  const [rodadaAtual, setRodadaAtual] = useState(1); // rodada completa (todos jogaram)
  const [turnoNaRodada, setTurnoNaRodada] = useState(1); // qual turno dentro da rodada
  const [checkpointProximo, setCheckpointProximo] = useState(false);
  const [config, setConfig] = useState({
    quantidadePalavras: 6,
    tema: 'geral',
    checkpointACada: 3 // checkpoint a cada X rodadas completas
  });

  // Função para selecionar aleatoriamente de um array
  const escolher = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Gerar personagem inicial
  const gerarPersonagem = () => {
    const p = {
      nome: escolher(PERSONAGENS.nomes),
      profissao: escolher(PERSONAGENS.profissoes),
      traco: escolher(PERSONAGENS.tracos),
      habilidade: escolher(PERSONAGENS.habilidades),
      defeito: escolher(PERSONAGENS.defeitos),
      lugar: escolher(PERSONAGENS.lugares),
      evento: escolher(PERSONAGENS.eventos)
    };
    setPersonagem(p);
    return p;
  };

  // Calcular peso de uma palavra baseado em histórico, tema e raridade
  const calcularPeso = (palavraObj, tema) => {
    let peso = 1.0;
    const palavra = palavraObj.palavra;
    
    // Penaliza repetições nos últimos 20 turnos
    const recentes = historico.slice(-20);
    const vezesUsada = recentes.filter(p => p === palavra).length;
    peso *= Math.exp(-0.5 * vezesUsada);
    
    // Bonus se for palavra temática (apenas se não for tema geral)
    if (tema !== 'geral' && palavraObj.tematico) {
      peso *= 1.8;
    }
    
    return peso;
  };

  // Gerar distribuição de palavras por categoria gramatical
  const calcularDistribuicao = (total) => {
    // Distribuição fixa otimizada para narrativa
    const proporcoes = { 
      substantivos: 0.35, 
      verbos: 0.30, 
      adjetivos: 0.20, 
      conectores: 0.10, 
      outros: 0.05 
    };
    
    const resultado = {};
    
    for (const [tipo, proporcao] of Object.entries(proporcoes)) {
      resultado[tipo] = Math.max(1, Math.round(total * proporcao));
    }
    
    // Ajusta para garantir total exato
    const soma = Object.values(resultado).reduce((a, b) => a + b, 0);
    if (soma < total) resultado.substantivos += total - soma;
    else if (soma > total) resultado.outros = Math.max(0, resultado.outros - (soma - total));
    
    return resultado;
  };

  // Selecionar palavras com pesos e controle de raridade
  // Distribuição: 15% raridade 1 (muito comum), 30% raridade 2 (comum), 
  //               30% raridade 3 (incomum), 15% raridade 4 (raro), 10% qualquer
  const selecionarComPesos = (palavras, quantidade) => {
    // Calcula quantas palavras de cada raridade
    const qtdRaridade1 = Math.round(quantidade * 0.15);
    const qtdRaridade2 = Math.round(quantidade * 0.30);
    const qtdRaridade3 = Math.round(quantidade * 0.30);
    const qtdRaridade4 = Math.round(quantidade * 0.15);
    const qtdQualquer = quantidade - (qtdRaridade1 + qtdRaridade2 + qtdRaridade3 + qtdRaridade4);
    
    const selecionadas = [];
    
    // Função auxiliar para selecionar de uma raridade específica
    const selecionarPorRaridade = (raridade, qtd) => {
      const candidatos = palavras
        .filter(p => p.raridade === raridade)
        .map(p => ({
          ...p,
          peso: calcularPeso(p, config.tema)
        }))
        .sort((a, b) => b.peso - a.peso);
      
      if (candidatos.length === 0) return [];
      
      // Pega top candidatos e embaralha
      const topCandidatos = candidatos.slice(0, Math.min(qtd * 3, candidatos.length));
      const embaralhados = topCandidatos.sort(() => Math.random() - 0.5);
      
      return embaralhados.slice(0, Math.min(qtd, embaralhados.length));
    };
    
    // Seleciona por cada categoria de raridade
    selecionadas.push(...selecionarPorRaridade(1, qtdRaridade1));
    selecionadas.push(...selecionarPorRaridade(2, qtdRaridade2));
    selecionadas.push(...selecionarPorRaridade(3, qtdRaridade3));
    selecionadas.push(...selecionarPorRaridade(4, qtdRaridade4));
    
    // Para o restante, seleciona das melhores independente da raridade
    if (qtdQualquer > 0 && selecionadas.length < quantidade) {
      const jaSelecionadas = new Set(selecionadas.map(p => p.palavra));
      const candidatos = palavras
        .filter(p => !jaSelecionadas.has(p.palavra))
        .map(p => ({
          ...p,
          peso: calcularPeso(p, config.tema)
        }))
        .sort((a, b) => b.peso - a.peso);
      
      const topCandidatos = candidatos.slice(0, Math.min(qtdQualquer * 3, candidatos.length));
      const embaralhados = topCandidatos.sort(() => Math.random() - 0.5);
      
      selecionadas.push(...embaralhados.slice(0, Math.min(qtdQualquer, embaralhados.length)));
    }
    
    return selecionadas.map(p => p.palavra);
  };

  // Função principal de geração
  const gerarPalavras = () => {
    const distribuicao = calcularDistribuicao(config.quantidadePalavras);
    const novasPalavras = [];
    
    // Substantivos
    let poolSubstantivos = DICIONARIO.substantivos.geral.map(p => ({...p, tematico: false}));
    if (config.tema !== 'geral' && DICIONARIO.substantivos[config.tema]) {
      const tematicos = DICIONARIO.substantivos[config.tema].map(p => ({...p, tematico: true}));
      poolSubstantivos = [...poolSubstantivos, ...tematicos];
    }
    novasPalavras.push(...selecionarComPesos(poolSubstantivos, distribuicao.substantivos));
    
    // Verbos
    const todosVerbos = Object.values(DICIONARIO.verbos).flat();
    novasPalavras.push(...selecionarComPesos(todosVerbos, distribuicao.verbos));
    
    // Adjetivos
    const todosAdjetivos = Object.values(DICIONARIO.adjetivos).flat();
    novasPalavras.push(...selecionarComPesos(todosAdjetivos, distribuicao.adjetivos));
    
    // Conectores
    novasPalavras.push(...selecionarComPesos(DICIONARIO.conectores, distribuicao.conectores));
    
    // Outros
    novasPalavras.push(...selecionarComPesos(DICIONARIO.outros, distribuicao.outros));
    
    // Embaralha resultado final
    const embaralhadas = novasPalavras.sort(() => Math.random() - 0.5);
    
    setPalavrasAtuais(embaralhadas);
    setHistorico(prev => [...prev, ...embaralhadas]);
    
    // Avança para o próximo jogador
    const proximoJogador = jogadorAtual === numeroJogadores ? 1 : jogadorAtual + 1;
    const proximoTurno = turnoNaRodada + 1;
    
    setJogadorAtual(proximoJogador);
    
    // Se completou uma rodada (todos jogaram)
    if (proximoJogador === 1 && turnoNaRodada === numeroJogadores) {
      setRodadaAtual(prev => prev + 1);
      setTurnoNaRodada(1);
      
      // Verifica se próxima rodada é checkpoint
      if ((rodadaAtual + 1) % config.checkpointACada === 0) {
        setCheckpointProximo(true);
      } else {
        setCheckpointProximo(false);
      }
    } else {
      setTurnoNaRodada(proximoTurno);
    }
  };

  // Início do jogo
  const iniciarJogo = () => {
    const p = gerarPersonagem();
    setTela('jogo');
    setRodadaAtual(1);
    setJogadorAtual(1);
    setTurnoNaRodada(1);
    setHistorico([]);
    setPalavrasAtuais([]);
    setCheckpointProximo(false);
    setPersonagemVisivel(true); // Sempre começa visível
  };

  // Tela de seleção de número de jogadores
  if (tela === 'jogadores') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-6 flex items-center justify-center">
        <div className="max-w-md w-full">
          <button
            onClick={() => setTela('inicio')}
            className="mb-6 text-amber-700 hover:text-amber-900 flex items-center gap-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            ← Voltar
          </button>

          <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-xl border border-amber-200">
            <div className="text-center mb-8">
              <Users className="w-16 h-16 mx-auto mb-4 text-amber-600" strokeWidth={1.5} />
              <h2 className="text-3xl font-bold mb-2 text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
                Quantos jogadores?
              </h2>
              <p className="text-amber-700" style={{ fontFamily: 'Georgia, serif' }}>
                Selecione o número de participantes
              </p>
            </div>

            <div className="mb-8">
              <input
                type="range"
                min="2"
                max="8"
                value={numeroJogadores}
                onChange={(e) => setNumeroJogadores(parseInt(e.target.value))}
                className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
              <div className="text-center mt-4">
                <div className="text-6xl font-bold text-amber-700 mb-2">
                  {numeroJogadores}
                </div>
                <div className="text-amber-600" style={{ fontFamily: 'Georgia, serif' }}>
                  {numeroJogadores === 1 ? 'jogador' : 'jogadores'}
                </div>
              </div>
            </div>

            <button
              onClick={iniciarJogo}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              <Sparkles className="w-5 h-5" />
              Começar História
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Renderização da tela inicial
  if (tela === 'inicio') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-6 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="text-center mb-12 animate-fadeIn">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-amber-800" strokeWidth={1.5} />
            <h1 className="text-6xl font-bold mb-2 text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
              Story Weave
            </h1>
            <p className="text-amber-700 text-lg" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
              Teça histórias colaborativas
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-xl border border-amber-200">
            <h2 className="text-2xl font-semibold mb-4 text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
              Como Jogar
            </h2>
            <ol className="space-y-3 text-amber-800 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              <li className="flex gap-3">
                <span className="font-bold text-amber-600">1.</span>
                <span>Defina quantos jogadores participarão</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-amber-600">2.</span>
                <span>Um personagem inicial será gerado automaticamente</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-amber-600">3.</span>
                <span>Cada jogador recebe 6 palavras e cria frases usando pelo menos 3 delas</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-amber-600">4.</span>
                <span>Passe o dispositivo para o próximo jogador após narrar</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-amber-600">5.</span>
                <span>O líder da rodada recebe uma palavra especial nos checkpoints</span>
              </li>
            </ol>
            
            <button
              onClick={() => setTela('jogadores')}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              <Sparkles className="w-5 h-5" />
              Começar Nova História
            </button>
            
            <button
              onClick={() => setTela('config')}
              className="w-full mt-3 bg-white/50 text-amber-800 py-3 rounded-xl font-medium border border-amber-300 hover:bg-white/70 transition-all duration-200 flex items-center justify-center gap-2"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              <Settings className="w-4 h-4" />
              Configurações
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (tela === 'config') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-6">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => setTela('inicio')}
            className="mb-6 text-amber-700 hover:text-amber-900 flex items-center gap-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            ← Voltar
          </button>
          
          <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-xl border border-amber-200">
            <h2 className="text-3xl font-bold mb-6 text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
              Configurações
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-amber-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  Quantidade de Palavras
                </label>
                <input
                  type="range"
                  min="4"
                  max="8"
                  value={config.quantidadePalavras}
                  onChange={(e) => setConfig({...config, quantidadePalavras: parseInt(e.target.value)})}
                  className="w-full"
                />
                <div className="text-center text-2xl font-bold text-amber-700 mt-2">
                  {config.quantidadePalavras}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-amber-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  Tema
                </label>
                <select
                  value={config.tema}
                  onChange={(e) => setConfig({...config, tema: e.target.value})}
                  className="w-full p-3 rounded-lg border border-amber-300 bg-white/70 text-amber-900 font-medium"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  <option value="geral">Geral (Variado)</option>
                  <option value="misterio">Mistério</option>
                  <option value="aventura">Aventura</option>
                  <option value="fantasia">Fantasia</option>
                  <option value="cotidiano">Cotidiano</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-amber-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  Checkpoint a cada X rodadas
                </label>
                <input
                  type="range"
                  min="2"
                  max="5"
                  value={config.checkpointACada}
                  onChange={(e) => setConfig({...config, checkpointACada: parseInt(e.target.value)})}
                  className="w-full"
                />
                <div className="text-center text-2xl font-bold text-amber-700 mt-2">
                  {config.checkpointACada} {config.checkpointACada === 1 ? 'rodada' : 'rodadas'}
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800" style={{ fontFamily: 'Georgia, serif' }}>
                  <strong>Sistema de Raridade:</strong> As palavras são distribuídas automaticamente: 
                  15% muito comuns, 30% comuns, 30% incomuns, 15% raras e 10% variadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela do Jogo
  const ehLider = jogadorAtual === 1;
  const progressoRodada = ((turnoNaRodada - 1) / numeroJogadores) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4 pb-20">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
              Story Weave
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-amber-700" style={{ fontFamily: 'Georgia, serif' }}>
                Rodada {rodadaAtual}
              </span>
              <span className="text-amber-400">•</span>
              <span className="text-sm text-amber-700" style={{ fontFamily: 'Georgia, serif' }}>
                Turno {turnoNaRodada}/{numeroJogadores}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              if (confirm('Iniciar nova história?')) {
                setTela('inicio');
              }
            }}
            className="p-2 text-amber-700 hover:text-amber-900 transition-colors"
          >
            <RefreshCw className="w-6 h-6" />
          </button>
        </div>

        {/* Barra de Progresso da Rodada */}
        <div className="mb-6 bg-white/50 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
            style={{ width: `${progressoRodada}%` }}
          />
        </div>

        {/* Indicador do Jogador Atual */}
        <div className={`mb-6 rounded-2xl p-4 shadow-md border-2 ${
          ehLider 
            ? 'bg-gradient-to-r from-yellow-100 to-amber-100 border-amber-400' 
            : 'bg-white/70 border-amber-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {ehLider && <Crown className="w-6 h-6 text-amber-600" />}
              <div>
                <div className="text-sm text-amber-600 font-medium" style={{ fontFamily: 'Georgia, serif' }}>
                  {ehLider ? 'Líder da Rodada' : 'Jogador Atual'}
                </div>
                <div className="text-2xl font-bold text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
                  Jogador {jogadorAtual}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-amber-600" style={{ fontFamily: 'Georgia, serif' }}>
                Próximo
              </div>
              <div className="text-lg font-semibold text-amber-800" style={{ fontFamily: 'Georgia, serif' }}>
                Jogador {jogadorAtual === numeroJogadores ? 1 : jogadorAtual + 1}
              </div>
            </div>
          </div>
        </div>

        {/* Personagem Inicial - Sempre Visível */}
        {personagem && (
          <div className="mb-6">
            <button
              onClick={() => setPersonagemVisivel(!personagemVisivel)}
              className="w-full bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-4 shadow-lg border-2 border-amber-300 transition-all hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <h3 className="text-lg font-bold text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
                    Personagem Principal
                  </h3>
                </div>
                <div className="text-amber-600 font-bold">
                  {personagemVisivel ? '−' : '+'}
                </div>
              </div>
            </button>
            
            {personagemVisivel && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-b-2xl p-6 pt-4 border-2 border-t-0 border-amber-300 animate-slideDown">
                <p className="text-amber-800 leading-relaxed" style={{ fontFamily: 'Georgia, serif', fontSize: '1.05rem' }}>
                  <strong>{personagem.nome}</strong>, {personagem.profissao} {personagem.traco} com {personagem.habilidade}, 
                  mas {personagem.defeito}, estava em {personagem.lugar} quando {personagem.evento}.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Checkpoint Alert */}
        {checkpointProximo && ehLider && (
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6 shadow-lg border-2 border-purple-300 animate-pulse">
            <div className="flex items-center gap-3 mb-3">
              <Crown className="w-8 h-8 text-purple-600" />
              <div>
                <h3 className="text-xl font-bold text-purple-900" style={{ fontFamily: 'Georgia, serif' }}>
                  🎲 Checkpoint!
                </h3>
                <p className="text-purple-800" style={{ fontFamily: 'Georgia, serif' }}>
                  Como líder desta rodada, você deve criar uma reviravolta!
                </p>
              </div>
            </div>
            <div className="mt-3 p-3 bg-white/50 rounded-lg">
              <p className="text-sm text-purple-700 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                Palavra especial:
              </p>
              <p className="text-2xl font-bold" style={{ 
                fontFamily: 'Georgia, serif',
                color: escolher(TEMAS_CHECKPOINT).cor 
              }}>
                {escolher(TEMAS_CHECKPOINT).palavra}
              </p>
            </div>
          </div>
        )}

        {/* Palavras Geradas */}
        {palavrasAtuais.length > 0 ? (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Use pelo menos 3 destas palavras:
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {palavrasAtuais.map((palavra, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-4 shadow-md border-2 border-amber-200 hover:border-amber-400 transition-all hover:scale-105 cursor-pointer"
                  style={{
                    animationDelay: `${idx * 0.05}s`,
                    animation: 'slideUp 0.4s ease-out forwards'
                  }}
                >
                  <p className="text-2xl font-bold text-amber-900 text-center" style={{ fontFamily: 'Georgia, serif' }}>
                    {palavra}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/60 rounded-2xl p-12 text-center mb-6 border-2 border-dashed border-amber-300">
            <Shuffle className="w-12 h-12 mx-auto mb-4 text-amber-400" />
            <p className="text-amber-700 text-lg" style={{ fontFamily: 'Georgia, serif' }}>
              Gere palavras para {rodadaAtual === 1 && turnoNaRodada === 1 ? 'começar a história' : 'continuar'}
            </p>
          </div>
        )}

        {/* Botão Gerar */}
        <button
          onClick={gerarPalavras}
          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          <Shuffle className="w-6 h-6" />
          {palavrasAtuais.length > 0 ? 'Passar para Próximo Jogador' : 'Gerar Palavras'}
        </button>

        {/* Info de uso */}
        {palavrasAtuais.length > 0 && (
          <div className="mt-4 text-center text-sm text-amber-600" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            Após narrar sua parte da história, clique no botão acima
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
// Exporta para uso global
window.StoryWeave = StoryWeave;
