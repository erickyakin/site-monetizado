// Simulação de fluxo de pagamento e processamento
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar simulação de pagamentos
    initPaymentSimulation();
    
    // Configurar modal de pagamentos
    setupPaymentModal();
    
    // Inicializar dashboard de ganhos
    initEarningsDashboard();
    
    // Adicionar botão de pagamento rápido
    addQuickPaymentButton();
});

// Inicializar simulação de pagamentos
function initPaymentSimulation() {
    // Dados simulados de ganhos
    window.paymentData = {
        adsense: {
            today: 8.45,
            week: 52.37,
            month: 247.82,
            pending: 247.82,
            lastPayment: 312.50,
            lastPaymentDate: '15/04/2025'
        },
        affiliate: {
            today: 4.00,
            week: 28.75,
            month: 100.00,
            pending: 100.00,
            lastPayment: 150.00,
            lastPaymentDate: '10/04/2025'
        },
        total: {
            today: 12.45,
            week: 81.12,
            month: 347.82,
            pending: 347.82,
            lastPayment: 462.50,
            lastPaymentDate: '15/04/2025'
        },
        paymentMethod: 'bank',
        paymentThreshold: 200,
        paymentFrequency: 'monthly',
        nextPaymentDate: '15/05/2025'
    };
    
    // Adicionar histórico de pagamentos
    window.paymentHistory = [
        {
            date: '15/04/2025',
            amount: 462.50,
            method: 'Transferência Bancária',
            status: 'Concluído',
            reference: 'PAY-2025041501'
        },
        {
            date: '15/03/2025',
            amount: 389.75,
            method: 'Transferência Bancária',
            status: 'Concluído',
            reference: 'PAY-2025031501'
        },
        {
            date: '15/02/2025',
            amount: 412.30,
            method: 'Transferência Bancária',
            status: 'Concluído',
            reference: 'PAY-2025021501'
        }
    ];
    
    // Atualizar exibição de ganhos no painel de administração
    updateEarningsDisplay();
}

// Atualizar exibição de ganhos
function updateEarningsDisplay() {
    const earningsSummary = document.querySelector('.earnings-summary');
    if (earningsSummary) {
        const paragraphs = earningsSummary.querySelectorAll('p');
        if (paragraphs.length >= 2) {
            paragraphs[0].textContent = `Hoje: R$ ${window.paymentData.total.today.toFixed(2)}`;
            paragraphs[1].textContent = `Este mês: R$ ${window.paymentData.total.month.toFixed(2)}`;
        }
    }
}

// Configurar modal de pagamentos
function setupPaymentModal() {
    const paymentForm = document.getElementById('payment-form');
    const paymentMethod = document.getElementById('payment-method');
    const bankDetails = document.getElementById('bank-details');
    const pixDetails = document.getElementById('pix-details');
    const paypalDetails = document.getElementById('paypal-details');
    
    if (paymentForm && paymentMethod) {
        // Preencher formulário com dados simulados
        paymentMethod.value = window.paymentData.paymentMethod;
        
        // Mostrar detalhes do método selecionado
        bankDetails.style.display = 'none';
        pixDetails.style.display = 'none';
        paypalDetails.style.display = 'none';
        
        if (window.paymentData.paymentMethod === 'bank') {
            bankDetails.style.display = 'block';
        } else if (window.paymentData.paymentMethod === 'pix') {
            pixDetails.style.display = 'block';
        } else if (window.paymentData.paymentMethod === 'paypal') {
            paypalDetails.style.display = 'block';
        }
        
        // Configurar seletor de limite mínimo
        const paymentThreshold = document.getElementById('payment-threshold');
        if (paymentThreshold) {
            paymentThreshold.value = window.paymentData.paymentThreshold.toString();
        }
        
        // Configurar seletor de frequência
        const paymentFrequency = document.getElementById('payment-frequency');
        if (paymentFrequency) {
            paymentFrequency.value = window.paymentData.paymentFrequency;
        }
        
        // Manipular envio do formulário
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Atualizar dados de pagamento
            window.paymentData.paymentMethod = paymentMethod.value;
            window.paymentData.paymentThreshold = parseInt(paymentThreshold.value);
            window.paymentData.paymentFrequency = paymentFrequency.value;
            
            // Atualizar próxima data de pagamento com base na frequência
            const today = new Date();
            let nextPaymentDate;
            
            if (paymentFrequency.value === 'weekly') {
                nextPaymentDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            } else if (paymentFrequency.value === 'biweekly') {
                nextPaymentDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
            } else {
                // Mensal - próximo dia 15
                nextPaymentDate = new Date(today.getFullYear(), today.getMonth() + 1, 15);
            }
            
            window.paymentData.nextPaymentDate = `${nextPaymentDate.getDate().toString().padStart(2, '0')}/${(nextPaymentDate.getMonth() + 1).toString().padStart(2, '0')}/${nextPaymentDate.getFullYear()}`;
            
            // Fechar modal
            const paymentModal = document.getElementById('payment-modal');
            if (paymentModal) {
                paymentModal.style.display = 'none';
            }
            
            // Mostrar notificação de sucesso
            showPaymentNotification('Configurações de pagamento atualizadas com sucesso!', 'success');
            
            // Atualizar dashboard
            updatePaymentDashboard();
        });
    }
}

// Inicializar dashboard de ganhos
function initEarningsDashboard() {
    // Criar elemento de dashboard
    const earningsDashboard = document.createElement('div');
    earningsDashboard.className = 'earnings-dashboard';
    earningsDashboard.innerHTML = `
        <div class="dashboard-header">
            <h2>Dashboard de Ganhos</h2>
            <button class="close-dashboard">&times;</button>
        </div>
        <div class="dashboard-content">
            <div class="earnings-summary-full">
                <div class="earnings-card total">
                    <h3>Ganhos Totais</h3>
                    <div class="amount">R$ ${window.paymentData.total.month.toFixed(2)}</div>
                    <div class="period">Este mês</div>
                </div>
                <div class="earnings-cards">
                    <div class="earnings-card adsense">
                        <h3>Google AdSense</h3>
                        <div class="amount">R$ ${window.paymentData.adsense.month.toFixed(2)}</div>
                        <div class="period">Este mês</div>
                    </div>
                    <div class="earnings-card affiliate">
                        <h3>Programas de Afiliados</h3>
                        <div class="amount">R$ ${window.paymentData.affiliate.month.toFixed(2)}</div>
                        <div class="period">Este mês</div>
                    </div>
                </div>
            </div>
            
            <div class="payment-status">
                <h3>Status de Pagamento</h3>
                <div class="status-cards">
                    <div class="status-card">
                        <div class="status-label">Pendente</div>
                        <div class="status-value">R$ ${window.paymentData.total.pending.toFixed(2)}</div>
                    </div>
                    <div class="status-card">
                        <div class="status-label">Limite Mínimo</div>
                        <div class="status-value">R$ ${window.paymentData.paymentThreshold.toFixed(2)}</div>
                    </div>
                    <div class="status-card">
                        <div class="status-label">Próximo Pagamento</div>
                        <div class="status-value">${window.paymentData.nextPaymentDate}</div>
                    </div>
                </div>
                <div class="payment-progress">
                    <div class="progress-label">Progresso para próximo pagamento</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${Math.min(100, (window.paymentData.total.pending / window.paymentData.paymentThreshold) * 100)}%"></div>
                    </div>
                    <div class="progress-text">R$ ${window.paymentData.total.pending.toFixed(2)} de R$ ${window.paymentData.paymentThreshold.toFixed(2)}</div>
                </div>
            </div>
            
            <div class="payment-method">
                <h3>Método de Pagamento</h3>
                <div class="method-details">
                    <div class="method-icon ${window.paymentData.paymentMethod}"></div>
                    <div class="method-info">
                        <div class="method-name">
                            ${window.paymentData.paymentMethod === 'bank' ? 'Transferência Bancária' : 
                              window.paymentData.paymentMethod === 'pix' ? 'PIX' : 'PayPal'}
                        </div>
                        <div class="method-description">
                            ${window.paymentData.paymentMethod === 'bank' ? 'Pagamento direto para sua conta bancária' : 
                              window.paymentData.paymentMethod === 'pix' ? 'Transferência instantânea via PIX' : 'Transferência para sua conta PayPal'}
                        </div>
                    </div>
                    <button class="change-method-btn">Alterar</button>
                </div>
            </div>
            
            <div class="payment-history">
                <h3>Histórico de Pagamentos</h3>
                <table class="history-table">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Valor</th>
                            <th>Método</th>
                            <th>Status</th>
                            <th>Referência</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${window.paymentHistory.map(payment => `
                            <tr>
                                <td>${payment.date}</td>
                                <td>R$ ${payment.amount.toFixed(2)}</td>
                                <td>${payment.method}</td>
                                <td><span class="status-${payment.status.toLowerCase()}">${payment.status}</span></td>
                                <td>${payment.reference}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <div class="dashboard-actions">
                <button class="request-payment-btn">Solicitar Pagamento</button>
                <button class="export-report-btn">Exportar Relatório</button>
            </div>
        </div>
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(earningsDashboard);
    
    // Configurar eventos
    const closeDashboardBtn = earningsDashboard.querySelector('.close-dashboard');
    if (closeDashboardBtn) {
        closeDashboardBtn.addEventListener('click', function() {
            earningsDashboard.classList.remove('active');
        });
    }
    
    const changeMethodBtn = earningsDashboard.querySelector('.change-method-btn');
    if (changeMethodBtn) {
        changeMethodBtn.addEventListener('click', function() {
            const paymentModal = document.getElementById('payment-modal');
            if (paymentModal) {
                paymentModal.style.display = 'block';
            }
            earningsDashboard.classList.remove('active');
        });
    }
    
    const requestPaymentBtn = earningsDashboard.querySelector('.request-payment-btn');
    if (requestPaymentBtn) {
        requestPaymentBtn.addEventListener('click', function() {
            simulatePaymentRequest();
        });
    }
    
    const exportReportBtn = earningsDashboard.querySelector('.export-report-btn');
    if (exportReportBtn) {
        exportReportBtn.addEventListener('click', function() {
            simulateReportExport();
        });
    }
}

// Adicionar botão de pagamento rápido
function addQuickPaymentButton() {
    const quickPaymentBtn = document.createElement('button');
    quickPaymentBtn.className = 'quick-payment-btn';
    quickPaymentBtn.innerHTML = `
        <div class="payment-icon"></div>
        <div class="payment-amount">R$ ${window.paymentData.total.pending.toFixed(2)}</div>
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(quickPaymentBtn);
    
    // Configurar evento de clique
    quickPaymentBtn.addEventListener('click', function() {
        const earningsDashboard = document.querySelector('.earnings-dashboard');
        if (earningsDashboard) {
            earningsDashboard.classList.add('active');
        }
    });
    
    // Atualizar valor periodicamente
    setInterval(function() {
        const randomIncrease = (Math.random() * 0.1).toFixed(2);
        window.paymentData.adsense.today += parseFloat(randomIncrease);
        window.paymentData.adsense.week += parseFloat(randomIncrease);
        window.paymentData.adsense.month += parseFloat(randomIncrease);
        window.paymentData.adsense.pending += parseFloat(randomIncrease);
        
        window.paymentData.total.today += parseFloat(randomIncrease);
        window.paymentData.total.week += parseFloat(randomIncrease);
        window.paymentData.total.month += parseFloat(randomIncrease);
        window.paymentData.total.pending += parseFloat(randomIncrease);
        
        // Atualizar exibição
        const paymentAmount = quickPaymentBtn.querySelector('.payment-amount');
        if (paymentAmount) {
            paymentAmount.textContent = `R$ ${window.paymentData.total.pending.toFixed(2)}`;
        }
        
        // Atualizar dashboard se estiver aberto
        updatePaymentDashboard();
        
        // Atualizar exibição de ganhos no painel de administração
        updateEarningsDisplay();
        
        // Verificar se atingiu o limite para pagamento
        checkPaymentThreshold();
    }, 60000); // A cada minuto
}

// Atualizar dashboard de pagamentos
function updatePaymentDashboard() {
    const dashboard = document.querySelector('.earnings-dashboard');
    if (!dashboard) return;
    
    // Atualizar valores de ganhos
    const totalAmount = dashboard.querySelector('.earnings-card.total .amount');
    if (totalAmount) {
        totalAmount.textContent = `R$ ${window.paymentData.total.month.toFixed(2)}`;
    }
    
    const adsenseAmount = dashboard.querySelector('.earnings-card.adsense .amount');
    if (adsenseAmount) {
        adsenseAmount.textContent = `R$ ${window.paymentData.adsense.month.toFixed(2)}`;
    }
    
    const affiliateAmount = dashboard.querySelector('.earnings-card.affiliate .amount');
    if (affiliateAmount) {
        affiliateAmount.textContent = `R$ ${window.paymentData.affiliate.month.toFixed(2)}`;
    }
    
    // Atualizar status de pagamento
    const pendingValue = dashboard.querySelector('.status-cards .status-card:nth-child(1) .status-value');
    if (pendingValue) {
        pendingValue.textContent = `R$ ${window.paymentData.total.pending.toFixed(2)}`;
    }
    
    const thresholdValue = dashboard.querySelector('.status-cards .status-card:nth-child(2) .status-value');
    if (thresholdValue) {
        thresholdValue.textContent = `R$ ${window.paymentData.paymentThreshold.toFixed(2)}`;
    }
    
    const nextPaymentValue = dashboard.querySelector('.status-cards .status-card:nth-child(3) .status-value');
    if (nextPaymentValue) {
        nextPaymentValue.textContent = window.paymentData.nextPaymentDate;
    }
    
    // Atualizar barra de progresso
    const progressFill = dashboard.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = `${Math.min(100, (window.paymentData.total.pending / window.paymentData.paymentThreshold) * 100)}%`;
    }
    
    const progressText = dashboard.querySelector('.progress-text');
    if (progressText) {
        progressText.textContent = `R$ ${window.paymentData.total.pending.toFixed(2)} de R$ ${window.paymentData.paymentThreshold.toFixed(2)}`;
    }
    
    // Atualizar método de pagamento
    const methodIcon = dashboard.querySelector('.method-icon');
    if (methodIcon) {
        methodIcon.className = `method-icon ${window.paymentData.paymentMethod}`;
    }
    
    const methodName = dashboard.querySelector('.method-name');
    if (methodName) {
        methodName.textContent = window.paymentData.paymentMethod === 'bank' ? 'Transferência Bancária' : 
                                window.paymentData.paymentMethod === 'pix' ? 'PIX' : 'PayPal';
    }
    
    const methodDescription = dashboard.querySelector('.method-description');
    if (methodDescription) {
        methodDescription.textContent = window.paymentData.paymentMethod === 'bank' ? 'Pagamento direto para sua conta bancária' : 
                                      window.paymentData.paymentMethod === 'pix' ? 'Transferência instantânea via PIX' : 'Transferência para sua conta PayPal';
    }
}

// Verificar se atingiu o limite para pagamento
function checkPaymentThreshold() {
    if (window.paymentData.total.pending >= window.paymentData.paymentThreshold) {
        // Mostrar notificação
        showPaymentNotification(`Você atingiu o limite mínimo de R$ ${window.paymentData.paymentThreshold.toFixed(2)} para pagamento!`, 'threshold');
        
        // Destacar botão de pagamento rápido
        const quickPaymentBtn = document.querySelector('.quick-payment-btn');
        if (quickPaymentBtn) {
            quickPaymentBtn.classList.add('threshold-reached');
            
            // Remover destaque após alguns segundos
            setTimeout(function() {
                quickPaymentBtn.classList.remove('threshold-reached');
            }, 5000);
        }
    }
}

// Simular solicitação de pagamento
function simulatePaymentRequest() {
    // Verificar se atingiu o limite mínimo
    if (window.paymentData.total.pending < window.paymentData.paymentThreshold) {
        showPaymentNotification(`Você ainda não atingiu o limite mínimo de R$ ${window.paymentData.paymentThreshold.toFixed(2)} para pagamento.`, 'error');
        return;
    }
    
    // Mostrar notificação de processamento
    showPaymentNotification('Processando solicitação de pagamento...', 'loading');
    
    // Simular processamento
    setTimeout(function() {
        // Adicionar ao histórico de pagamentos
        const today = new Date();
        const paymentDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
        const paymentReference = `PAY-${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}${today.getHours().toString().padStart(2, '0')}`;
        
        const newPayment = {
            date: paymentDate,
            amount: window.paymentData.total.pending,
            method: window.paymentData.paymentMethod === 'bank' ? 'Transferência Bancária' : 
                    window.paymentData.paymentMethod === 'pix' ? 'PIX' : 'PayPal',
            status: 'Processando',
            reference: paymentReference
        };
        
        window.paymentHistory.unshift(newPayment);
        
        // Atualizar valores
        window.paymentData.lastPayment = window.paymentData.total.pending;
        window.paymentData.lastPaymentDate = paymentDate;
        window.paymentData.total.pending = 0;
        window.paymentData.adsense.pending = 0;
        window.paymentData.affiliate.pending = 0;
        
        // Atualizar dashboard
        updatePaymentDashboard();
        
        // Atualizar tabela de histórico
        updatePaymentHistoryTable();
        
        // Mostrar notificação de sucesso
        showPaymentNotification(`Pagamento de R$ ${newPayment.amount.toFixed(2)} solicitado com sucesso! O valor será transferido em até 3 dias úteis.`, 'success');
        
        // Simular mudança de status após alguns segundos
        setTimeout(function() {
            window.paymentHistory[0].status = 'Concluído';
            updatePaymentHistoryTable();
            
            showPaymentNotification(`Pagamento de R$ ${newPayment.amount.toFixed(2)} concluído! O valor foi transferido para sua conta.`, 'success');
        }, 10000);
    }, 3000);
}

// Atualizar tabela de histórico de pagamentos
function updatePaymentHistoryTable() {
    const historyTable = document.querySelector('.history-table tbody');
    if (!historyTable) return;
    
    historyTable.innerHTML = window.paymentHistory.map(payment => `
        <tr>
            <td>${payment.date}</td>
            <td>R$ ${payment.amount.toFixed(2)}</td>
            <td>${payment.method}</td>
            <td><span class="status-${payment.status.toLowerCase()}">${payment.status}</span></td>
            <td>${payment.reference}</td>
        </tr>
    `).join('');
}

// Simular exportação de relatório
function simulateReportExport() {
    // Mostrar notificação de processamento
    showPaymentNotification('Gerando relatório de ganhos...', 'loading');
    
    // Simular processamento
    setTimeout(function() {
        // Mostrar notificação de sucesso
        showPaymentNotification('Relatório de ganhos gerado com sucesso! O download começará automaticamente.', 'success');
        
        // Simular download
        setTimeout(function() {
            showPaymentNotification('Download do relatório concluído.', 'success');
        }, 2000);
    }, 3000);
}

// Mostrar notificação de pagamento
function showPaymentNotification(message, type) {
    // Verificar se já existe uma notificação
    let notification = document.querySelector('.payment-notification');
    
    // Se não existir, criar uma nova
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'payment-notification';
        document.body.appendChild(notification);
    }
    
    // Definir classe baseada no tipo
    notification.className = 'payment-notification';
    notification.classList.add(type);
    
    // Definir conteúdo
    if (type === 'loading') {
        notification.innerHTML = `
            <div class="notification-spinner"></div>
            <div class="notification-message">${message}</div>
        `;
    } else {
        notification.innerHTML = `
            <div class="notification-icon ${type}"></div>
            <div class="notification-message">${message}</div>
        `;
    }
    
    // Mostrar notificação
    notification.classList.add('active');
    
    // Se for sucesso, erro ou threshold, esconder após alguns segundos
    if (type === 'success' || type === 'error' || type === 'threshold') {
        setTimeout(function() {
            notification.classList.remove('active');
        }, 5000);
    }
}

// Adicionar estilos CSS para simulação de pagamentos
const paymentStyleElement = document.createElement('style');
paymentStyleElement.textContent = `
    .earnings-dashboard {
        position: fixed;
        top: 0;
        right: -600px;
        width: 600px;
        height: 100vh;
        background-color: #fff;
        box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        overflow-y: auto;
        transition: right 0.3s ease;
    }
    
    .earnings-dashboard.active {
        right: 0;
    }
    
    .dashboard-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .dashboard-header h2 {
        margin: 0;
        font-size: 24px;
        color: #1e40af;
    }
    
    .close-dashboard {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #64748b;
        padding: 0;
    }
    
    .dashboard-content {
        padding: 20px;
    }
    
    .earnings-summary-full {
        margin-bottom: 30px;
    }
    
    .earnings-card {
        background-color: #f8fafc;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 15px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    }
    
    .earnings-card.total {
        background-color: #1e40af;
        color: #fff;
    }
    
    .earnings-card h3 {
        margin: 0 0 10px 0;
        font-size: 16px;
        font-weight: 500;
    }
    
    .earnings-card.total h3 {
        color: #fff;
    }
    
    .earnings-card .amount {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 5px;
    }
    
    .earnings-card .period {
        font-size: 14px;
        opacity: 0.8;
    }
    
    .earnings-cards {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
    }
    
    .earnings-card.adsense {
        border-left: 4px solid #4f46e5;
    }
    
    .earnings-card.affiliate {
        border-left: 4px solid #10b981;
    }
    
    .payment-status {
        margin-bottom: 30px;
    }
    
    .payment-status h3, .payment-method h3, .payment-history h3 {
        margin: 0 0 15px 0;
        font-size: 18px;
        color: #1e40af;
        padding-bottom: 10px;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .status-cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
        margin-bottom: 20px;
    }
    
    .status-card {
        background-color: #f8fafc;
        border-radius: 8px;
        padding: 15px;
        text-align: center;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    }
    
    .status-label {
        font-size: 14px;
        color: #64748b;
        margin-bottom: 5px;
    }
    
    .status-value {
        font-size: 18px;
        font-weight: 600;
        color: #0f172a;
    }
    
    .payment-progress {
        margin-top: 20px;
    }
    
    .progress-label {
        font-size: 14px;
        color: #64748b;
        margin-bottom: 10px;
    }
    
    .progress-bar {
        height: 10px;
        background-color: #e2e8f0;
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 10px;
    }
    
    .progress-fill {
        height: 100%;
        background-color: #3b82f6;
        border-radius: 5px;
        transition: width 0.3s ease;
    }
    
    .progress-text {
        font-size: 14px;
        color: #64748b;
        text-align: right;
    }
    
    .payment-method {
        margin-bottom: 30px;
    }
    
    .method-details {
        display: flex;
        align-items: center;
        background-color: #f8fafc;
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    }
    
    .method-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #e2e8f0;
        margin-right: 15px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 60%;
    }
    
    .method-icon.bank {
        background-color: #dbeafe;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%233b82f6'%3E%3Cpath d='M4 10h3v7H4v-7zm6.5-7l-8.53 7H7V20H4v2h16v-2h-3v-7h3.53l-8.53-7h-1.5zM17 10h3v7h-3v-7zm-5 0h3v7h-3v-7z'/%3E%3C/svg%3E");
    }
    
    .method-icon.pix {
        background-color: #dcfce7;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2310b981'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z'/%3E%3C/svg%3E");
    }
    
    .method-icon.paypal {
        background-color: #dbeafe;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%233b82f6'%3E%3Cpath d='M19.897 8.565c0.034-0.280 0.051-0.566 0.051-0.854 0-3.866-4.137-7-9.231-7h-6.649l-0.111 0.685l-2.104 13.293-0.052 0.311h3.213l0.157-0.985 0.567-3.596 0.033-0.184 0.051-0.331h0.891c4.459 0 7.948-1.811 8.961-7.054 0.073-0.365 0.109-0.745 0.109-1.135 0-0.885-0.254-1.752-0.73-2.514 0.789 0.748 1.254 1.745 1.254 2.814 0 0.288-0.017 0.574-0.051 0.854-1.013 5.243-4.502 7.054-8.961 7.054h-0.891l-0.051 0.331-0.601 3.780-0.033 0.184h3.213l0.157-0.985 0.567-3.596 0.033-0.184 0.051-0.331h0.891c4.459 0 7.948-1.811 8.961-7.054z'/%3E%3C/svg%3E");
    }
    
    .method-info {
        flex: 1;
    }
    
    .method-name {
        font-size: 16px;
        font-weight: 600;
        color: #0f172a;
        margin-bottom: 5px;
    }
    
    .method-description {
        font-size: 14px;
        color: #64748b;
    }
    
    .change-method-btn {
        background-color: #f1f5f9;
        color: #0f172a;
        border: 1px solid #e2e8f0;
        padding: 8px 15px;
        font-size: 14px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .change-method-btn:hover {
        background-color: #e2e8f0;
    }
    
    .payment-history {
        margin-bottom: 30px;
    }
    
    .history-table {
        width: 100%;
        border-collapse: collapse;
    }
    
    .history-table th, .history-table td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .history-table th {
        font-weight: 600;
        color: #64748b;
        font-size: 14px;
    }
    
    .history-table td {
        font-size: 14px;
        color: #0f172a;
    }
    
    .status-concluído {
        color: #10b981;
        font-weight: 500;
    }
    
    .status-processando {
        color: #f59e0b;
        font-weight: 500;
    }
    
    .dashboard-actions {
        display: flex;
        gap: 15px;
    }
    
    .request-payment-btn, .export-report-btn {
        flex: 1;
        padding: 12px;
        font-size: 16px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .request-payment-btn {
        background-color: #2563eb;
        color: #fff;
    }
    
    .request-payment-btn:hover {
        background-color: #1d4ed8;
    }
    
    .export-report-btn {
        background-color: #f1f5f9;
        color: #0f172a;
        border: 1px solid #e2e8f0;
    }
    
    .export-report-btn:hover {
        background-color: #e2e8f0;
    }
    
    .quick-payment-btn {
        position: fixed;
        bottom: 90px;
        right: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        padding: 10px 15px;
        display: flex;
        align-items: center;
        z-index: 900;
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
    }
    
    .quick-payment-btn:hover {
        transform: translateY(-5px);
    }
    
    .quick-payment-btn.threshold-reached {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(37, 99, 235, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
        }
    }
    
    .payment-icon {
        width: 24px;
        height: 24px;
        background-color: #dbeafe;
        border-radius: 50%;
        margin-right: 10px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%233b82f6'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z'/%3E%3C/svg%3E");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 60%;
    }
    
    .payment-amount {
        font-size: 16px;
        font-weight: 600;
        color: #0f172a;
    }
    
    .payment-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        padding: 15px 20px;
        display: flex;
        align-items: center;
        z-index: 1000;
        transform: translateY(100px);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
    }
    
    .payment-notification.active {
        transform: translateY(0);
        opacity: 1;
    }
    
    .payment-notification.success {
        border-left: 4px solid #10b981;
    }
    
    .payment-notification.error {
        border-left: 4px solid #ef4444;
    }
    
    .payment-notification.loading {
        border-left: 4px solid #3b82f6;
    }
    
    .payment-notification.threshold {
        border-left: 4px solid #f59e0b;
    }
    
    .notification-spinner {
        width: 20px;
        height: 20px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #3b82f6;
        border-radius: 50%;
        margin-right: 15px;
        animation: spin 1s linear infinite;
    }
    
    .notification-icon {
        width: 24px;
        height: 24px;
        margin-right: 15px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
    }
    
    .notification-icon.success {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2310b981'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/%3E%3C/svg%3E");
    }
    
    .notification-icon.error {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ef4444'%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/%3E%3C/svg%3E");
    }
    
    .notification-icon.threshold {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f59e0b'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'/%3E%3C/svg%3E");
    }
    
    .notification-message {
        font-size: 14px;
        color: #0f172a;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @media (max-width: 768px) {
        .earnings-dashboard {
            width: 100%;
            right: -100%;
        }
        
        .status-cards {
            grid-template-columns: 1fr;
        }
        
        .earnings-cards {
            grid-template-columns: 1fr;
        }
    }
`;

document.head.appendChild(paymentStyleElement);
