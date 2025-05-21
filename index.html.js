// Atualização para configuração automática de PIX
document.addEventListener('DOMContentLoaded', function() {
    // Configurar automaticamente o método de pagamento para PIX
    const paymentMethod = document.getElementById('payment-method');
    if (paymentMethod) {
        paymentMethod.value = 'pix';
        
        // Mostrar detalhes do PIX e esconder outros
        const bankDetails = document.getElementById('bank-details');
        const pixDetails = document.getElementById('pix-details');
        const paypalDetails = document.getElementById('paypal-details');
        
        if (bankDetails) bankDetails.style.display = 'none';
        if (pixDetails) pixDetails.style.display = 'block';
        if (paypalDetails) paypalDetails.style.display = 'none';
        
        // Preencher dados do PIX
        const pixKey = document.getElementById('pix-key');
        const pixType = document.getElementById('pix-type');
        
        if (pixKey) pixKey.value = '41125620803';
        if (pixType) pixType.value = 'cpf';
    }
    
    // Atualizar dados de pagamento no objeto de simulação
    if (window.paymentData) {
        window.paymentData.paymentMethod = 'pix';
        window.paymentData.bankName = 'Banco Inter';
    }
    
    // Atualizar exibição do método de pagamento no dashboard
    const methodName = document.querySelector('.method-name');
    if (methodName) {
        methodName.textContent = 'PIX';
    }
    
    const methodDescription = document.querySelector('.method-description');
    if (methodDescription) {
        methodDescription.textContent = 'Transferência instantânea via PIX para Banco Inter';
    }
    
    const methodIcon = document.querySelector('.method-icon');
    if (methodIcon) {
        methodIcon.className = 'method-icon pix';
    }
});
