// Simulação avançada de atualização automática de conteúdo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar simulação de atualização automática
    initContentUpdateSimulation();
    
    // Configurar modal de atualização de conteúdo
    setupContentUpdateModal();
    
    // Inicializar indicadores de fonte de dados
    initDataSourceIndicators();
});

// Inicializar simulação de atualização automática de conteúdo
function initContentUpdateSimulation() {
    // Configurar temporizador para atualizações periódicas
    window.contentUpdateInterval = setInterval(simulateContentUpdate, 30000); // A cada 30 segundos
    
    // Configurar atualização inicial após 10 segundos
    setTimeout(function() {
        simulateInitialContentLoad();
    }, 10000);
    
    // Adicionar indicador de status de atualização
    addUpdateStatusIndicator();
}

// Simular carregamento inicial de conteúdo
function simulateInitialContentLoad() {
    // Mostrar notificação de carregamento inicial
    showUpdateNotification('Carregando dados das APIs configuradas...', 'loading');
    
    // Simular tempo de processamento
    setTimeout(function() {
        // Atualizar timestamps em todos os artigos
        updateAllContentTimestamps();
        
        // Mostrar notificação de conclusão
        showUpdateNotification('Conteúdo inicial carregado com sucesso de 5 fontes de dados', 'success');
        
        // Atualizar indicador de status
        updateStatusIndicator('Última atualização: agora mesmo', 'success');
        
        // Iniciar contador de tempo desde última atualização
        startUpdateTimer();
    }, 3000);
}

// Simular atualização periódica de conteúdo
function simulateContentUpdate() {
    // Determinar se haverá atualização (80% de chance)
    if (Math.random() < 0.8) {
        // Selecionar número aleatório de artigos para atualizar (1-3)
        const articlesToUpdate = Math.floor(Math.random() * 3) + 1;
        
        // Mostrar notificação de início de atualização
        showUpdateNotification(`Verificando atualizações em ${articlesToUpdate} categorias...`, 'loading');
        
        // Simular tempo de processamento
        setTimeout(function() {
            // Atualizar artigos aleatórios
            updateRandomArticles(articlesToUpdate);
            
            // Determinar fonte de dados aleatória
            const dataSources = ['NewsAPI', 'Alpha Vantage', 'TechCrunch API', 'Twitter API', 'Google Trends'];
            const randomSource = dataSources[Math.floor(Math.random() * dataSources.length)];
            
            // Mostrar notificação de conclusão
            showUpdateNotification(`${articlesToUpdate} artigos atualizados via ${randomSource}`, 'success');
            
            // Atualizar indicador de status
            updateStatusIndicator('Última atualização: agora mesmo', 'success');
            
            // Reiniciar contador de tempo
            resetUpdateTimer();
        }, 2000);
    }
}

// Atualizar artigos aleatórios
function updateRandomArticles(count) {
    const articles = document.querySelectorAll('.news-item, .featured-main, .featured-secondary article');
    const articleCount = articles.length;
    
    // Garantir que não tentamos atualizar mais artigos do que existem
    count = Math.min(count, articleCount);
    
    // Array para rastrear índices já atualizados
    const updatedIndices = [];
    
    for (let i = 0; i < count; i++) {
        // Escolher um artigo aleatório que ainda não foi atualizado
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * articleCount);
        } while (updatedIndices.includes(randomIndex));
        
        updatedIndices.push(randomIndex);
        const article = articles[randomIndex];
        
        // Atualizar conteúdo do artigo
        updateArticleContent(article);
    }
}

// Atualizar conteúdo de um artigo específico
function updateArticleContent(article) {
    // Adicionar classe de animação para destacar atualização
    article.classList.add('content-updating');
    
    // Simular tempo de atualização
    setTimeout(function() {
        // Atualizar título (50% de chance)
        if (Math.random() < 0.5) {
            const titleElement = article.querySelector('h3');
            if (titleElement) {
                const newTitles = [
                    'Novos dados revelam tendência surpreendente no mercado',
                    'Estudo atualizado mostra resultados inesperados',
                    'Análise recente aponta para mudança significativa',
                    'Especialistas revisam previsões após novos acontecimentos',
                    'Dados em tempo real mostram evolução importante no cenário'
                ];
                
                const randomTitle = newTitles[Math.floor(Math.random() * newTitles.length)];
                
                // Animar mudança de título
                titleElement.style.opacity = '0';
                setTimeout(function() {
                    titleElement.textContent = randomTitle;
                    titleElement.style.opacity = '1';
                }, 300);
            }
        }
        
        // Atualizar timestamp
        const dateSpan = article.querySelector('.date');
        if (dateSpan) {
            dateSpan.textContent = 'Atualizado automaticamente agora';
            dateSpan.classList.add('recent-update');
            
            // Remover destaque após 1 minuto
            setTimeout(function() {
                dateSpan.classList.remove('recent-update');
            }, 60000);
        }
        
        // Atualizar fonte (30% de chance)
        if (Math.random() < 0.3) {
            const sourceSpan = article.querySelector('.source');
            if (sourceSpan) {
                const sources = ['API de Notícias', 'API Financeira', 'API de Tendências', 'API de Redes Sociais', 'Verificação Cruzada'];
                const randomSource = sources[Math.floor(Math.random() * sources.length)];
                sourceSpan.textContent = `Fonte: ${randomSource}`;
            }
        }
        
        // Remover classe de animação
        article.classList.remove('content-updating');
        article.classList.add('content-updated');
        
        // Remover destaque após alguns segundos
        setTimeout(function() {
            article.classList.remove('content-updated');
        }, 5000);
    }, 1000);
}

// Atualizar timestamps em todos os artigos
function updateAllContentTimestamps() {
    const articles = document.querySelectorAll('.news-item, .featured-main, .featured-secondary article');
    
    articles.forEach(function(article) {
        const dateSpan = article.querySelector('.date');
        if (dateSpan) {
            const minutes = Math.floor(Math.random() * 30);
            dateSpan.textContent = `Atualizado automaticamente há ${minutes} minutos`;
        }
    });
}

// Mostrar notificação de atualização
function showUpdateNotification(message, type) {
    // Verificar se já existe uma notificação de atualização
    let updateNotification = document.querySelector('.update-notification');
    
    // Se não existir, criar uma nova
    if (!updateNotification) {
        updateNotification = document.createElement('div');
        updateNotification.className = 'update-notification';
        document.body.appendChild(updateNotification);
    }
    
    // Definir classe baseada no tipo
    updateNotification.className = 'update-notification';
    if (type === 'loading') {
        updateNotification.classList.add('loading');
    } else if (type === 'success') {
        updateNotification.classList.add('success');
    } else if (type === 'error') {
        updateNotification.classList.add('error');
    }
    
    // Definir conteúdo
    if (type === 'loading') {
        updateNotification.innerHTML = `
            <div class="spinner"></div>
            <span>${message}</span>
        `;
    } else {
        updateNotification.innerHTML = `
            <span>${message}</span>
        `;
    }
    
    // Mostrar notificação
    updateNotification.style.display = 'flex';
    
    // Se for sucesso ou erro, esconder após alguns segundos
    if (type === 'success' || type === 'error') {
        setTimeout(function() {
            updateNotification.style.opacity = '0';
            setTimeout(function() {
                updateNotification.style.display = 'none';
                updateNotification.style.opacity = '1';
            }, 500);
        }, 3000);
    }
}

// Adicionar indicador de status de atualização
function addUpdateStatusIndicator() {
    // Criar elemento de status
    const statusIndicator = document.createElement('div');
    statusIndicator.className = 'update-status-indicator';
    statusIndicator.innerHTML = `
        <div class="status-icon"></div>
        <div class="status-text">Aguardando primeira atualização...</div>
        <div class="time-since-update">00:00</div>
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(statusIndicator);
    
    // Adicionar evento de clique para mostrar detalhes
    statusIndicator.addEventListener('click', function() {
        // Mostrar modal de detalhes de atualização
        const contentUpdateModal = document.getElementById('content-update-modal');
        if (contentUpdateModal) {
            contentUpdateModal.style.display = 'block';
        }
    });
}

// Atualizar indicador de status
function updateStatusIndicator(text, status) {
    const statusIndicator = document.querySelector('.update-status-indicator');
    if (statusIndicator) {
        const statusText = statusIndicator.querySelector('.status-text');
        const statusIcon = statusIndicator.querySelector('.status-icon');
        
        if (statusText) {
            statusText.textContent = text;
        }
        
        if (statusIcon) {
            statusIcon.className = 'status-icon';
            statusIcon.classList.add(status);
        }
    }
}

// Iniciar contador de tempo desde última atualização
function startUpdateTimer() {
    window.updateTimerStart = new Date();
    window.updateTimerInterval = setInterval(updateTimeSinceLastUpdate, 1000);
}

// Reiniciar contador de tempo
function resetUpdateTimer() {
    window.updateTimerStart = new Date();
}

// Atualizar tempo desde última atualização
function updateTimeSinceLastUpdate() {
    if (!window.updateTimerStart) return;
    
    const now = new Date();
    const diff = Math.floor((now - window.updateTimerStart) / 1000);
    
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    const timeElement = document.querySelector('.time-since-update');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Configurar modal de atualização de conteúdo
function setupContentUpdateModal() {
    const contentUpdateForm = document.getElementById('content-update-form');
    if (contentUpdateForm) {
        contentUpdateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter fontes de dados selecionadas
            const selectedSources = [];
            const sourceCheckboxes = contentUpdateForm.querySelectorAll('input[name="data-source"]:checked');
            sourceCheckboxes.forEach(function(checkbox) {
                selectedSources.push(checkbox.value);
            });
            
            // Obter frequência de atualização
            const updateFrequency = contentUpdateForm.querySelector('input[name="update-frequency"]:checked').value;
            
            // Simular aplicação das configurações
            showUpdateNotification('Aplicando novas configurações de atualização...', 'loading');
            
            setTimeout(function() {
                // Atualizar intervalo com base na frequência selecionada
                clearInterval(window.contentUpdateInterval);
                
                let intervalTime;
                if (updateFrequency === 'realtime') {
                    intervalTime = 15000; // 15 segundos
                } else if (updateFrequency === 'hourly') {
                    intervalTime = 60000; // 1 minuto (simulando 1 hora)
                } else {
                    intervalTime = 120000; // 2 minutos (simulando 1 dia)
                }
                
                window.contentUpdateInterval = setInterval(simulateContentUpdate, intervalTime);
                
                // Atualizar indicadores de fonte de dados
                updateDataSourceIndicators(selectedSources);
                
                // Fechar modal
                const contentUpdateModal = document.getElementById('content-update-modal');
                if (contentUpdateModal) {
                    contentUpdateModal.style.display = 'none';
                }
                
                // Mostrar notificação de sucesso
                showUpdateNotification('Configurações de atualização aplicadas com sucesso', 'success');
                
                // Forçar uma atualização imediata
                setTimeout(simulateContentUpdate, 2000);
            }, 2000);
        });
    }
}

// Inicializar indicadores de fonte de dados
function initDataSourceIndicators() {
    // Criar container para indicadores
    const dataSourceIndicators = document.createElement('div');
    dataSourceIndicators.className = 'data-source-indicators';
    
    // Adicionar indicadores iniciais
    const initialSources = ['news-api', 'finance-api', 'tech-api'];
    initialSources.forEach(function(source) {
        const indicator = document.createElement('div');
        indicator.className = 'data-source-indicator active';
        indicator.setAttribute('data-source', source);
        
        let sourceName;
        switch(source) {
            case 'news-api':
                sourceName = 'NewsAPI';
                break;
            case 'finance-api':
                sourceName = 'Finanças';
                break;
            case 'tech-api':
                sourceName = 'Tecnologia';
                break;
            case 'sports-api':
                sourceName = 'Esportes';
                break;
            case 'entertainment-api':
                sourceName = 'Entretenimento';
                break;
            default:
                sourceName = source;
        }
        
        indicator.textContent = sourceName;
        dataSourceIndicators.appendChild(indicator);
    });
    
    // Adicionar ao DOM
    document.body.appendChild(dataSourceIndicators);
}

// Atualizar indicadores de fonte de dados
function updateDataSourceIndicators(activeSources) {
    const indicators = document.querySelectorAll('.data-source-indicator');
    
    indicators.forEach(function(indicator) {
        const source = indicator.getAttribute('data-source');
        
        if (activeSources.includes(source)) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Adicionar estilos CSS para simulação de atualização
const updateStyleElement = document.createElement('style');
updateStyleElement.textContent = `
    .update-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        padding: 15px 20px;
        display: flex;
        align-items: center;
        z-index: 1000;
        transition: opacity 0.5s ease;
    }
    
    .update-notification.loading {
        border-left: 4px solid #3b82f6;
    }
    
    .update-notification.success {
        border-left: 4px solid #10b981;
    }
    
    .update-notification.error {
        border-left: 4px solid #ef4444;
    }
    
    .spinner {
        width: 20px;
        height: 20px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #3b82f6;
        border-radius: 50%;
        margin-right: 15px;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .update-status-indicator {
        position: fixed;
        bottom: 20px;
        left: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        padding: 10px 15px;
        display: flex;
        align-items: center;
        z-index: 900;
        cursor: pointer;
        transition: transform 0.3s ease;
    }
    
    .update-status-indicator:hover {
        transform: translateY(-5px);
    }
    
    .status-icon {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #9ca3af;
        margin-right: 10px;
    }
    
    .status-icon.success {
        background-color: #10b981;
    }
    
    .status-icon.error {
        background-color: #ef4444;
    }
    
    .status-text {
        font-size: 14px;
        margin-right: 15px;
    }
    
    .time-since-update {
        font-size: 14px;
        font-family: monospace;
        color: #6b7280;
    }
    
    .content-updating {
        position: relative;
        overflow: hidden;
    }
    
    .content-updating::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.7);
        z-index: 1;
    }
    
    .content-updating::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30px;
        height: 30px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #3b82f6;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 2;
    }
    
    .content-updated {
        animation: highlight-update 5s ease-out;
    }
    
    .recent-update {
        color: #10b981;
        font-weight: bold;
    }
    
    .data-source-indicators {
        position: fixed;
        top: 80px;
        right: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 900;
    }
    
    .data-source-indicator {
        background-color: #fff;
        border-radius: 4px;
        padding: 8px 12px;
        font-size: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        opacity: 0.5;
        transition: all 0.3s ease;
    }
    
    .data-source-indicator.active {
        opacity: 1;
        border-left: 3px solid #3b82f6;
    }
`;

document.head.appendChild(updateStyleElement);
