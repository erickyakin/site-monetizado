// Modificação do script de pagamento para usar PIX do Banco Inter por padrão
document.addEventListener('DOMContentLoaded', function() {
    // Sobrescrever dados de pagamento para usar PIX como padrão
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
        paymentMethod: 'pix',
        bankName: 'Banco Inter',
        pixKey: '41125620803',
        pixType: 'cpf',
        paymentThreshold: 100,
        paymentFrequency: 'monthly',
        nextPaymentDate: '15/05/2025'
    };
    
    // Atualizar histórico de pagamentos para mostrar PIX
    window.paymentHistory = [
        {
            date: '15/04/2025',
            amount: 462.50,
            method: 'PIX (Banco Inter)',
            status: 'Concluído',
            reference: 'PAY-2025041501'
        },
        {
            date: '15/03/2025',
            amount: 389.75,
            method: 'PIX (Banco Inter)',
            status: 'Concluído',
            reference: 'PAY-2025031501'
        },
        {
            date: '15/02/2025',
            amount: 412.30,
            method: 'PIX (Banco Inter)',
            status: 'Concluído',
            reference: 'PAY-2025021501'
        }
    ];
    
    // Atualizar exibição de ganhos no painel de administração
    updateEarningsDisplay();
    
    // Atualizar dashboard de pagamentos se estiver aberto
    updatePaymentDashboard();
});
