// Funcionalidades principais do site monetizado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const paymentModal = document.getElementById('payment-modal');
    const contentUpdateModal = document.getElementById('content-update-modal');
    const adsConfigModal = document.getElementById('ads-config-modal');
    const adminToggle = document.getElementById('admin-toggle');
    const adminMenu = document.querySelector('.admin-menu');
    const showPaymentConfig = document.getElementById('show-payment-config');
    const showContentUpdate = document.getElementById('show-content-update');
    const showAdsConfig = document.getElementById('show-ads-config');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const closeButtons = document.querySelectorAll('.close-modal');
    const paymentMethod = document.getElementById('payment-method');
    const bankDetails = document.getElementById('bank-details');
    const pixDetails = document.getElementById('pix-details');
    const paypalDetails = document.getElementById('paypal-details');
    
    // Simulação de carregamento de anúncios AdSense
    simulateAdLoading();
    
    // Abrir modal de login
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            loginModal.style.display = 'block';
        });
    }
    
    // Alternar painel de administração
    if (adminToggle) {
        adminToggle.addEventListener('click', function() {
            if (adminMenu.style.display === 'block') {
                adminMenu.style.display = 'none';
            } else {
                adminMenu.style.display = 'block';
            }
        });
    }
    
    // Abrir modais de configuração
    if (showPaymentConfig) {
        showPaymentConfig.addEventListener('click', function() {
            paymentModal.style.display = 'block';
            adminMenu.style.display = 'none';
        });
    }
    
    if (showContentUpdate) {
        showContentUpdate.addEventListener('click', function() {
            contentUpdateModal.style.display = 'block';
            adminMenu.style.display = 'none';
        });
    }
    
    if (showAdsConfig) {
        showAdsConfig.addEventListener('click', function() {
            adsConfigModal.style.display = 'block';
            adminMenu.style.display = 'none';
        });
    }
    
    // Fechar modais
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            loginModal.style.display = 'none';
            paymentModal.style.display = 'none';
            contentUpdateModal.style.display = 'none';
            adsConfigModal.style.display = 'none';
        });
    });
    
    // Fechar modais ao clicar fora
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target === paymentModal) {
            paymentModal.style.display = 'none';
        }
        if (event.target === contentUpdateModal) {
            contentUpdateModal.style.display = 'none';
        }
        if (event.target === adsConfigModal) {
            adsConfigModal.style.display = 'none';
        }
    });
    
    // Alternar detalhes de pagamento com base no método selecionado
    if (paymentMethod) {
        paymentMethod.addEventListener('change', function() {
            const method = this.value;
            
            bankDetails.style.display = 'none';
            pixDetails.style.display = 'none';
            paypalDetails.style.display = 'none';
            
            if (method === 'bank') {
                bankDetails.style.display = 'block';
            } else if (method === 'pix') {
                pixDetails.style.display = 'block';
            } else if (method === 'paypal') {
                paypalDetails.style.display = 'block';
            }
        });
    }
    
    // Carregar mais notícias (simulação)
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            loadMoreContent();
        });
    }
    
    // Simulação de envio de formulários
    const forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Configurações salvas com sucesso!');
        });
    });
    
    // Simulação de cliques em anúncios
    setupAdClickTracking();
    
    // Simulação de atualização automática de conteúdo
    setupContentUpdateSimulation();
    
    // Inicializar contador de ganhos
    initEarningsCounter();
});

// Função para simular carregamento de anúncios
function simulateAdLoading() {
    const adPlaceholders = document.querySelectorAll('.ad-placeholder');
    
    adPlaceholders.forEach(function(placeholder, index) {
        // Simular tempo de carregamento variável para cada anúncio
        const loadTime = 1000 + Math.random() * 2000;
        
        setTimeout(function() {
            placeholder.innerHTML = '<div class="ad-loading">Carregando anúncio...</div>';
            
            setTimeout(function() {
                // Diferentes formatos de anúncios
                if (index % 3 === 0) {
                    // Banner horizontal
                    placeholder.innerHTML = createAdBanner('horizontal');
                } else if (index % 3 === 1) {
                    // Banner quadrado
                    placeholder.innerHTML = createAdBanner('square');
                } else {
                    // Banner vertical
                    placeholder.innerHTML = createAdBanner('vertical');
                }
                
                // Adicionar classe para indicar que o anúncio foi carregado
                placeholder.parentElement.classList.add('ad-loaded');
                
                // Registrar impressão do anúncio
                logAdImpression(index);
            }, 1500);
        }, loadTime);
    });
}

// Criar banner de anúncio simulado
function createAdBanner(type) {
    const adTypes = {
        horizontal: {
            width: '100%',
            height: '90px',
            text: 'Anúncio em Banner Horizontal'
        },
        square: {
            width: '300px',
            height: '250px',
            text: 'Anúncio em Formato Quadrado'
        },
        vertical: {
            width: '160px',
            height: '600px',
            text: 'Anúncio em Banner Vertical'
        }
    };
    
    const ad = adTypes[type];
    const colors = ['#e6f7ff', '#fff7e6', '#f6ffed', '#fff1f0', '#f9f0ff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Escolher aleatoriamente entre anúncio do Google e afiliado
    const isAffiliate = Math.random() > 0.5;
    
    if (isAffiliate) {
        // Anúncio de afiliado
        return `
            <div class="simulated-ad affiliate-ad" style="background-color: ${randomColor}; width: ${ad.width}; height: ${ad.height}; display: flex; flex-direction: column; justify-content: center; align-items: center; cursor: pointer;" data-ad-type="affiliate">
                <div style="font-weight: bold; margin-bottom: 10px;">Oferta Especial</div>
                <div style="font-size: 18px; margin-bottom: 10px;">Até 40% de desconto</div>
                <div style="background-color: #ff4d4f; color: white; padding: 5px 15px; border-radius: 4px;">Ver Oferta</div>
                <div style="font-size: 10px; margin-top: 10px;">Anúncio de Afiliado</div>
            </div>
        `;
    } else {
        // Anúncio do Google AdSense
        return `
            <div class="simulated-ad adsense-ad" style="background-color: ${randomColor}; width: ${ad.width}; height: ${ad.height}; display: flex; flex-direction: column; justify-content: center; align-items: center; cursor: pointer;" data-ad-type="adsense">
                <div style="font-size: 14px; margin-bottom: 10px;">${ad.text}</div>
                <div style="font-size: 12px; opacity: 0.7;">Anúncios Google</div>
            </div>
        `;
    }
}

// Configurar rastreamento de cliques em anúncios
function setupAdClickTracking() {
    // Usar delegação de eventos para capturar cliques em anúncios que serão carregados dinamicamente
    document.addEventListener('click', function(e) {
        const adElement = e.target.closest('.simulated-ad');
        
        if (adElement) {
            e.preventDefault();
            
            const adType = adElement.getAttribute('data-ad-type');
            const revenue = adType === 'adsense' ? (Math.random() * 0.5).toFixed(2) : (Math.random() * 2).toFixed(2);
            
            // Registrar clique no anúncio
            logAdClick(adType, revenue);
            
            // Mostrar notificação de clique
            showNotification(`Clique em anúncio registrado! Receita estimada: R$ ${revenue}`);
            
            // Atualizar contador de ganhos
            updateEarnings(parseFloat(revenue));
            
            // Simular redirecionamento
            setTimeout(function() {
                showNotification('Redirecionamento para anunciante seria realizado aqui.');
            }, 1000);
        }
    });
}

// Registrar impressão de anúncio (simulação)
function logAdImpression(adIndex) {
    console.log(`[${new Date().toLocaleTimeString()}] Impressão de anúncio registrada - ID: ${adIndex}`);
}

// Registrar clique em anúncio (simulação)
function logAdClick(adType, revenue) {
    console.log(`[${new Date().toLocaleTimeString()}] Clique em anúncio ${adType} - Receita: R$ ${revenue}`);
}

// Mostrar notificação
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Estilizar notificação
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '20px';
    notification.style.backgroundColor = '#2563eb';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    notification.style.transition = 'opacity 0.3s, transform 0.3s';
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(function() {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remover após alguns segundos
    setTimeout(function() {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        
        setTimeout(function() {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Carregar mais conteúdo (simulação)
function loadMoreContent() {
    const mainContent = document.querySelector('.main-content');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    // Mostrar carregamento
    loadMoreBtn.textContent = 'Carregando...';
    loadMoreBtn.disabled = true;
    
    // Simular tempo de carregamento
    setTimeout(function() {
        // Adicionar novos artigos
        for (let i = 0; i < 3; i++) {
            const article = createArticle();
            
            // Inserir antes do botão de carregar mais
            mainContent.insertBefore(article, document.querySelector('.load-more'));
            
            // Adicionar anúncio após o segundo artigo novo se for o primeiro lote
            if (i === 1) {
                const adContainer = document.createElement('div');
                adContainer.className = 'ad-container inline-ad';
                adContainer.innerHTML = `
                    <div class="ad-label">Publicidade</div>
                    <div class="ad-card">
                        <div class="ad-placeholder">
                            <span>Anúncio de Afiliado</span>
                            <p>300x250</p>
                        </div>
                    </div>
                `;
                
                mainContent.insertBefore(adContainer, document.querySelector('.load-more'));
                
                // Simular carregamento do novo anúncio
                simulateAdLoading();
            }
        }
        
        // Restaurar botão
        loadMoreBtn.textContent = 'Carregar mais notícias';
        loadMoreBtn.disabled = false;
        
        // Mostrar notificação
        showNotification('Novos artigos carregados com sucesso!');
    }, 2000);
}

// Criar artigo aleatório
function createArticle() {
    const categories = ['Tecnologia', 'Saúde', 'Economia', 'Esportes', 'Cultura', 'Política'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    const titles = [
        'Nova pesquisa revela tendências surpreendentes no mercado',
        'Estudo aponta benefícios inesperados de hábito comum',
        'Especialistas alertam sobre mudanças importantes no setor',
        'Descoberta promissora pode transformar tratamento de condição comum',
        'Análise mostra impacto significativo de nova regulamentação'
    ];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    
    const contents = [
        'Pesquisadores identificaram padrões que podem ajudar a prever comportamentos futuros e orientar decisões estratégicas em diversos setores da economia.',
        'Um estudo recente com milhares de participantes demonstrou resultados que contradizem crenças anteriores e abrem novas possibilidades para melhorias na qualidade de vida.',
        'A análise de dados coletados ao longo de cinco anos revela tendências preocupantes que exigem atenção imediata de autoridades e profissionais da área.',
        'Inovações tecnológicas combinadas com abordagens tradicionais estão criando oportunidades sem precedentes para avanços significativos no campo.'
    ];
    const randomContent = contents[Math.floor(Math.random() * contents.length)];
    
    const hoursAgo = Math.floor(Math.random() * 12) + 1;
    
    const article = document.createElement('article');
    article.className = 'news-item';
    article.innerHTML = `
        <div class="article-image" style="background-image: url('https://via.placeholder.com/300x200')"></div>
        <div class="article-content">
            <span class="category">${randomCategory}</span>
            <h3>${randomTitle}</h3>
            <p>${randomContent}</p>
            <div class="article-meta">
                <span class="date">Atualizado automaticamente há ${hoursAgo} horas</span>
                <span class="source">Fonte: API Automática</span>
            </div>
        </div>
    `;
    
    return article;
}

// Configurar simulação de atualização automática de conteúdo
function setupContentUpdateSimulation() {
    // Simular atualização periódica de conteúdo
    setInterval(function() {
        // Escolher um artigo aleatório para atualizar
        const articles = document.querySelectorAll('.news-item');
        
        if (articles.length > 0) {
            const randomIndex = Math.floor(Math.random() * articles.length);
            const article = articles[randomIndex];
            
            // Atualizar timestamp
            const dateSpan = article.querySelector('.date');
            if (dateSpan) {
                dateSpan.textContent = 'Atualizado automaticamente agora';
                
                // Adicionar classe para destacar atualização
                article.classList.add('article-updated');
                
                // Remover destaque após alguns segundos
                setTimeout(function() {
                    article.classList.remove('article-updated');
                }, 5000);
                
                // Mostrar notificação
                showNotification('Conteúdo atualizado automaticamente');
            }
        }
    }, 60000); // A cada minuto
}

// Inicializar contador de ganhos
function initEarningsCounter() {
    // Valores iniciais
    window.dailyEarnings = 12.45;
    window.monthlyEarnings = 347.82;
    
    // Atualizar a cada 5 minutos com pequenos incrementos
    setInterval(function() {
        // Incremento aleatório pequeno
        const increment = (Math.random() * 0.5).toFixed(2);
        updateEarnings(parseFloat(increment));
    }, 300000); // A cada 5 minutos
}

// Atualizar contador de ganhos
function updateEarnings(amount) {
    window.dailyEarnings += amount;
    window.monthlyEarnings += amount;
    
    // Atualizar exibição
    const earningsSummary = document.querySelector('.earnings-summary');
    if (earningsSummary) {
        const paragraphs = earningsSummary.querySelectorAll('p');
        if (paragraphs.length >= 2) {
            paragraphs[0].textContent = `Hoje: R$ ${window.dailyEarnings.toFixed(2)}`;
            paragraphs[1].textContent = `Este mês: R$ ${window.monthlyEarnings.toFixed(2)}`;
        }
    }
}

// Adicionar estilos CSS para animações e efeitos
const styleElement = document.createElement('style');
styleElement.textContent = `
    .article-updated {
        animation: highlight-update 5s ease-out;
    }
    
    @keyframes highlight-update {
        0% { background-color: rgba(37, 99, 235, 0.1); }
        100% { background-color: transparent; }
    }
    
    .ad-loaded {
        transition: transform 0.3s ease;
    }
    
    .ad-loaded:hover {
        transform: scale(1.02);
    }
    
    .simulated-ad {
        transition: all 0.3s ease;
    }
    
    .simulated-ad:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`;

document.head.appendChild(styleElement);
