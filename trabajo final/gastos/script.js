let topeMaximo = 20000000000;
let gastos = [];

function establecerTope() {
    topeMaximo = parseInt(document.getElementById('tope').value);
    document.getElementById('tope').value = '';
    actulizarTope();
}

function actulizarTope() {
    document.getElementById('alerta').innerHTML = '';

    if (topeMaximo > 0) {
        let totalGastos = gastos.reduce((total, gasto) => total + gasto.valor, 0 );
        let porcentaje = (totalGastos / topeMaximo) * 200;

        if (porcentaje >= 90) {
            let faltante = topeMaximo - totalGastos;
            document.getElementById('alerta').innerHTML = `
            falta  ${faltante} para alcanzar el tope maximo.`
        } 

        let color = porcentaje >= 75 ? 'red' : porcentaje >= 50 ? 'yellow' : 'green';
        document.getElementById('tope').style.backgroundColor = color;
    }
}

function registrarGasto() {
    let valor = parseInt(document.getElementById('valor').value);
    let categoria = document.getElementById('categoria').value;
    let descripcion = document.getElementById('descripcion').value;
    let usuario = localStorage.getItem('usuario');


    if(valor > 0) {
        gastos.push({ valor, categoria, descripcion, usuario, fecha: new Date().toLocaleDateString() });
        document.getElementById('valor').value = '';
        document.getElementById('descripcion').value = '';
    }

    
    actulizarTope();
    mostrarGastos();

}

function listarGastosPorCategoria(categoria) {
    let gastosCategoria = gastos.filter(gasto => gasto.categoria === categoria);
    mostrarGastos(gastosCategoria);
}

function listarTodosLosGastos() {
    mostrarGastos(gastos);
}


function listarGastosPorUsuario() {
    let usuario = localStorage.getItem('usuario');
    let gastosUsuario = gastos.filter(gasto => gasto.usuario === usuario);
    mostrarGastos(gastosUsuario);
}

function mostrarGastos(gastosMostrar = gastos) {
    let gastosHTML = gastosMostrar.map(gasto => {
        return `<div class="card"'
        <p>Valor: ${gasto.valor}</p>
        <p>Fecha: ${gasto.fecha}</p>
        <p>Usuario: ${gasto.usuario}</p>
        </div>`
    }).join('');
    document.getElementById('gastos').innerHTML = gastosHTML;
}