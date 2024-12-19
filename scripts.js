function formatarNumero (input) {
    // Remove caracteres diferentes de número ou ponto
    let value = input.value.replace(/[^0-9.]/g, '');

    // Limitar a entrada a um ponto decimal apenas
    let parts = value.split('.');
    if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
    }

    // Limita a entrada a oito casas decimais
    if (parts.length === 2 && parts[1].length > 8) {
        value = parts[0] + '.' + parts[1].slice(0, 8);
    }

    // Atualiza o valor do input
    input.value = value;
}

function calcularQuantidadePlacas (consumo, instalacao) {
    const geracaoPlaca = 72; // em condições normais, gera 72kWh/mês
    let consumoMinimo;

    // Consumo mínimo referente ao tipo da instalação
    if (instalacao === 'monofasica') {
        consumoMinimo = 30.0;
    } else if (instalacao === 'bifasica') {
        consumoMinimo = 50.0;
    } else if (instalacao === 'trifasica') {
        consumoMinimo = 100.0;
    } else {
        return { error: 'Instalação Inválida' };
    }

    // Para calcular o consumo compensável
    const consumoCompensavel = consumo - consumoMinimo;

    // Para calcular número de placas
    const numeroPlacas = Math.ceil(consumoCompensavel / geracaoPlaca);

    const custoEnergia = document.getElementById('custoEnergia').value;

    const economia = consumoCompensavel * custoEnergia;

    return { numeroPlacas, economia };
}

function calcular () {
    const consumoMedio = document.getElementById('consumo').value;
    const tipoInstalacao = document.getElementById('instalacao').value;


    const resultado = calcularQuantidadePlacas(consumoMedio, tipoInstalacao);

    if (resultado.error) {
        document.getElementById('resultado').innerText = resultado.error;
    } else {

        document.getElementById('resultado').innerText = `Quantidade de placas necessárias: ${resultado.numeroPlacas}\nEconomia prevista: R$ ${resultado.economia.toFixed(2)}`;

    }

}
