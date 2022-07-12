/*function mudaMapaParaVolta(){
    const urlParams = new URLSearchParams(location.search);
    const codConsulta=urlParams.get('codConsulta')
    const mapaAtual=document.querySelector('#mapaAtual').value
    if(mapaAtual==1){
    //muda o mapa da consulta para volta
    document.querySelector('#urlMapa').innerHTML=`
    <input type="hidden" id="mapaAtual" value="2">
    <iframe id="mapa" frameborder="0" height="100%" src="http://mapas.captatec.com.br/home/index?consulta=${codConsulta}&sentido=2&rota=1&trajeto=1&h=608&w=1348&z=13" width="100%" overflow="hidden">
    </iframe>`
    //fim muda o mapa da consulta para volta
    }
}

function mudaMapaParaIda(){
    const urlParams = new URLSearchParams(location.search);
    const codConsulta=urlParams.get('codConsulta')
    const mapaAtual=document.querySelector('#mapaAtual').value
    if(mapaAtual==2){
    //muda o mapa da consulta para ida
    document.querySelector('#urlMapa').innerHTML=`
    <input type="hidden" id="mapaAtual" value="1">
    <iframe id="mapa" frameborder="0" height="100%" src="http://mapas.captatec.com.br/home/index?consulta=${codConsulta}&sentido=1&rota=1&trajeto=1&h=608&w=1348&z=13" width="100%" overflow="hidden">
    </iframe>`
    //fim carrega o mapa da consulta (ida por padrão)
    }
}*/


//monta a página de resultado
function rotResultado(){
    const urlParams = new URLSearchParams(location.search);

    //imprime cod consulta no cabeçalho
    const codConsulta=urlParams.get('codConsulta')
    document.querySelector('#codConsulta').innerHTML=codConsulta
    //fim imprime cod consulta no cabeçalho

    //carrega o mapa da consulta (ida por padrão)
    document.querySelector('#urlMapa').innerHTML=`
    <input type="hidden" id="mapaAtual" value="1">
    <iframe id="mapa" frameborder="0" height="100%" src="http://mapas.captatec.com.br/home/index?consulta=${codConsulta}&sentido=1&rota=1&trajeto=1&h=1000&w=1500&z=12" width="100%" style="overflow:hidden !important; overflow-x:hidden !important; overflow-y:hidden !important" scrolling="no">
    </iframe>`
    //fim carrega o mapa da consulta (ida por padrão)


    const codFuncionario=urlParams.get('codFuncionario')
    let request = new Request(`http://rotaslink.captatec.com.br/api/RTL_Roteirizar?appCode=2&codconsulta=${codConsulta}&codFuncionario=${codFuncionario}`)
    fetch(request)
    .then(response=>response.json().then(body=>{
        const codSta=(body).codigo
        if(codSta==0){
            console.log((body))
            rotResultado()
        }

        else{

        //imprime valor total no cabeçalho
        const valorVtTotal=(body).dadosConsulta.valorVtTotal
        document.querySelector('#valorVtTotal').innerHTML=`R$${valorVtTotal}`
        //fim imprime valor total no cabeçalho

        //imprime distancia total caminhada no cabeçalho
        if((body).trajetoIda[0].tipoTransp=='Caminhada'){
        const distanciaCaminhada=(body).trajetoIda[0].distanciaTj
        document.querySelector('#distanciaTotal').innerHTML=`${distanciaCaminhada}m`
        // fim imprime distancia total caminhada no cabeçalho

        //imprime tempo total caminhada no cabeçalho
        const tempoCaminhada=(body).trajetoIda[0].tempoTj
        document.querySelector('#tempoTotal').innerHTML=`${tempoCaminhada} min`
        }

        else{
            document.querySelector('#distanciaTotal').innerHTML=`0m`
            document.querySelector('#tempoTotal').innerHTML=`0 min`
        }
        // fim imprime tempo total caminhada no cabeçalho



        //cria a tabela ida
const trajetoIda=(body).trajetoIda
const destinoIda=(body).dadosTrajetoIda.endDestino
const dadosTrajetoIda=trajetoIda.map(trajetoIda=>[
 /*[0]-tipo de transporte*/          trajetoIda.tipoTransp,
 /*[1]-origem da caminhada*/         trajetoIda.origemCaminhada, 
 /*[2]-destino da caminhada*/        trajetoIda.destinoCaminhada,
 /*[3]-embarque no transporte*/      trajetoIda.embarque, 
 /*[4]-desembarque do transporte*/   trajetoIda.desembarque,
 /*[5]-distancia trajeto*/           trajetoIda.distanciaTj,
 /*[6]-tempo trajeto*/               trajetoIda.tempoTj, 
 /*[7]-letreiro do transporte*/      trajetoIda.letreiroTransporte, 
 /*[8]-valores de cada bilhete*/     trajetoIda.valorBilTrecho, 
 /*[9]-operadora de cada transporte*/trajetoIda.operadora])

 const trajetoIdaHTML=document.querySelector('#trajetoIda')
 const destinoFinalIda=document.querySelector('#destinoFinalIda')
 const destinoFinalIdaImprime=`<td><strong>${destinoIda}</strong></td>`
 destinoFinalIda.insertAdjacentHTML('beforeend', destinoFinalIdaImprime)

dadosTrajetoIda.forEach(trajetoIda=>{
    if(trajetoIda[0]==null||trajetoIda==null){
        window.location.href='erroProcessamento.html'
    }
    else if(trajetoIda[0]=='Caminhada'){
        const dados=
        `
        <tr>
        <td class="icon"><i class="fa-solid fa-person-walking icon"></i></td>
        <td><strong>${trajetoIda[1]}</strong><br><br>Caminhar<br>${trajetoIda[6]} min | ${trajetoIda[5]} m <br><br><strong>${trajetoIda[2]}</strong></td>
        </tr>
        <tr>
        <td><img src="./images/transporteIcon.svg" style="width:110%;"></td>
        </tr>
        `

        trajetoIdaHTML.insertAdjacentHTML('beforeend', dados)
        }

    else if(trajetoIda[0]=='Trem'){
        const dados=
        `
        <tr>
        <td class="icon"><i class="fa-solid fa-train icon"></i></td>
        <td><strong>${trajetoIda[3]}</strong><br><br>Embarque no trem<br><strong>${trajetoIda[7]}</strong><br>R$${trajetoIda[8]}<br>${trajetoIda[9]}<br>${trajetoIda[6]} min | ${trajetoIda[5]} m<br><br><strong>${trajetoIda[4]}</strong>
        </tr>
        <tr>
        <td><img src="./images/transporteIcon.svg" style="width:110%;"></td>
        </tr>
        `

        trajetoIdaHTML.insertAdjacentHTML('beforeend', dados)
    }

    else if(trajetoIda[0]=='Ônibus'){
        const dados=
        `
        <tr>
        <td class="icon"><i class="fa-solid fa-bus icon"></i></td>
        <td><strong>${trajetoIda[3]}</strong><br><br>Embarque no ônibus<br><strong>${trajetoIda[7]}</strong><br>R$${trajetoIda[8]}<br>${trajetoIda[9]}<br>${trajetoIda[6]} min | ${trajetoIda[5]} m<br><br><strong>${trajetoIda[4]}</strong></td>
        </tr>
        <tr>
        <td><img src="./images/transporteIcon.svg" style="width:110%;"></td>
        </tr>
        `

        trajetoIdaHTML.insertAdjacentHTML('beforeend', dados)
    }
   
    else if(trajetoIda[0]=='Metrô'){
        const dados=
        `
        <tr>
        <td class="icon"><i class="fa-solid fa-train-subway icon"></i></td>
        <td><strong>${trajetoIda[3]}</strong><br><br>Embarque no metrô<br><strong>${trajetoIda[7]}</strong><br>R$${trajetoIda[8]}<br>${trajetoIda[9]}<br>${trajetoIda[6]} min | ${trajetoIda[5]} m<br><br><strong>${trajetoIda[4]}</strong></td>
        </tr>
        <tr>
        <td><img src="./images/transporteIcon.svg" style="width:110%;"></td>
        </tr>
        `

        trajetoIdaHTML.insertAdjacentHTML('beforeend', dados)
    }

    else if(trajetoIda[0]=='Fretado'){
        const dados=
        `
        <tr>
        <td class="icon"><i class="fa-solid fa-bus-simple icon"></i></td>
        <td><strong>${trajetoIda[3]}</strong><br><br>Embarque no fretado<br><strong>${trajetoIda[7]}</strong><br>R$${trajetoIda[8]}<br>${trajetoIda[9]}<br>${trajetoIda[6]} min | ${trajetoIda[5]} m<br><br><strong>${trajetoIda[4]}</strong></td>
        </tr>
        <tr>
        <td><img src="./images/transporteIcon.svg" style="width:110%;"></td>
        </tr>
        `

        trajetoIdaHTML.insertAdjacentHTML('beforeend', dados)
    }

    else if(trajetoIda[0]=='Fluvial'){
        const dados=
        `
        <tr>
        <td class="icon"><i class="fa-solid fa-ferry icon"></i></td>
        <td><strong>${trajetoIda[3]}</strong><br><br>Embarque na barca<br><strong>${trajetoIda[7]}</strong><br>R$${trajetoIda[8]}<br>${trajetoIda[9]}<br>${trajetoIda[6]} min | ${trajetoIda[5]} m<br><br><strong>${trajetoIda[4]}</strong></td>
        </tr>
        <tr>
        <td><img src="./images/transporteIcon.svg" style="width:110%;"></td>
        </tr>
        `

        trajetoIdaHTML.insertAdjacentHTML('beforeend', dados)
    }

    else if(trajetoIda[0]=='Integração'){
        const dados=
        `
        <tr>
        <td class="icon"><i class="fa-solid fa-bus icon"></i></td>
        <td><strong>${trajetoIda[3]}</strong><br><br>Embarque no transporte<br><strong>${trajetoIda[7]}</strong><br>R$${trajetoIda[8]}<br>${trajetoIda[9]}<br>${trajetoIda[6]} min | ${trajetoIda[5]} m<br><br><strong>${trajetoIda[4]}</strong></td>
        </tr>
        <tr>
        <td><img src="./images/transporteIcon.svg" style="width:110%;"></td>
        </tr>
        `

        trajetoIdaHTML.insertAdjacentHTML('beforeend', dados)
    }
}
)
    //fim cria a tabela ida
    //fim imprime tabela ida


    //cria a tabela volta
const trajetoVolta=(body).trajetoVolta
const destinoVolta=(body).dadosTrajetoVolta.endDestino
const dadosTrajetoVolta=trajetoVolta.map(trajetoVolta=>[
 /*0*/   trajetoVolta.tipoTransp,
 /*1*/   trajetoVolta.origemCaminhada, 
 /*2*/   trajetoVolta.destinoCaminhada,
 /*3*/   trajetoVolta.embarque, 
 /*4*/   trajetoVolta.desembarque,
 /*5*/   trajetoVolta.distanciaTj,
 /*6*/   trajetoVolta.tempoTj, 
 /*7*/   trajetoVolta.letreiroTransporte, 
 /*8*/   trajetoVolta.valorBilTrecho, 
 /*9*/   trajetoVolta.operadora])

 const trajetoVoltaHTML=document.querySelector('#trajetoVolta')
 const destinoFinalVolta=document.querySelector('#destinoFinalVolta')
 const destinoFinalVoltaImprime=`<td><strong>${destinoVolta}</strong></td>`
 destinoFinalVolta.insertAdjacentHTML('beforeend', destinoFinalVoltaImprime)
 dadosTrajetoVolta.forEach(trajetoVolta=>{
    if(trajetoVolta[0]=='Caminhada'){
        const dados=
        `
        <tr>
        <td class="icon"><i class="fa-solid fa-person-walking icon"></i></td>
        <td><strong>${trajetoVolta[1]}</strong><br><br>Caminhar<br>${trajetoVolta[6]} min | ${trajetoVolta[5]} m <br><br><strong>${trajetoVolta[2]}</strong></td>
        </tr>
        <tr>
        <td><img src="./images/transporteIcon.svg" style="width:110%;"></td>
        </tr>
        `
        trajetoVoltaHTML.insertAdjacentHTML('beforeend', dados)
        }

    else if(trajetoVolta[0]=='Trem'){
        const dados=
        `
        <tr>
        <td class="icon"><i class="fa-solid fa-train icon"></i></td>
        <td><strong>${trajetoVolta[3]}</strong><br><br>Embarque no trem<br><strong>${trajetoVolta[7]}</strong><br>R$${trajetoVolta[8]}<br>${trajetoVolta[9]}<br>${trajetoVolta[6]} min | ${trajetoVolta[5]} m<br><br><strong>${trajetoVolta[4]}</strong>
        </tr>
        <tr>
        <td><img src="./images/transporteIcon.svg" style="width:110%;"></td>
        </tr>
        `

        trajetoVoltaHTML.insertAdjacentHTML('beforeend', dados)
    }

    else if(trajetoVolta[0]=='Ônibus'){
        const dados=
        `
        <tr>
        <td class="icon"><i class="fa-solid fa-bus icon"></i></td>
        <td><strong>${trajetoVolta[3]}</strong><br><br>Embarque no ônibus<br><strong>${trajetoVolta[7]}</strong><br>R$${trajetoVolta[8]}<br>${trajetoVolta[9]}<br>${trajetoVolta[6]} min | ${trajetoVolta[5]} m<br><br><strong>${trajetoVolta[4]}</strong></td>
        </tr>
        <tr>
        <td><img src="./images/transporteIcon.svg" style="width:110%;"></td>
        </tr>
        `

        trajetoVoltaHTML.insertAdjacentHTML('beforeend', dados)
    }
   
    else if(trajetoVolta[0]=='Metrô'){
        const dados=
        `
        <tr>
        <td class="icon"><i class="fa-solid fa-train-subway icon"></i></td>
        <td><strong>${trajetoVolta[3]}</strong><br><br>Embarque no metrô<br><strong>${trajetoVolta[7]}</strong><br>R$${trajetoVolta[8]}<br>${trajetoVolta[9]}<br>${trajetoVolta[6]} min | ${trajetoVolta[5]} m<br><br><strong>${trajetoVolta[4]}</strong></td>
        </tr>
        <tr>
        <td><img src="./images/transporteIcon.svg" style="width:110%;"></td>
        </tr>
        `

        trajetoVoltaHTML.insertAdjacentHTML('beforeend', dados)
    }

    else if(trajetoVolta[0]=='Fretado'){
        const dados=
        `
        <tr>
        <td><img src="./images/transporteIcon.svg" "></td>
        <td><strong>${trajetoVolta[3]}</strong><br><br>Embarque no fretado<br><strong>${trajetoVolta[7]}</strong><br>R$${trajetoVolta[8]}<br>${trajetoVolta[9]}<br>${trajetoVolta[6]} min | ${trajetoVolta[5]} m<br><br><strong>${trajetoVolta[4]}</strong></td>
        </tr>
        <tr>
        <td><img src="./images/transporteIcon.svg" style="width:110%;"></td>
        </tr>
        `

        trajetoVoltaHTML.insertAdjacentHTML('beforeend', dados)
    }

    else if(trajetoVolta[0]=='Fluvial'){
        const dados=
        `
        <tr>
        <td class="icon"><i class="fa-solid fa-ferry icon"></i></td>
        <td><strong>${trajetoVolta[3]}</strong><br><br>Embarque na barca<br><strong>${trajetoVolta[7]}</strong><br>R$${trajetoVolta[8]}<br>${trajetoVolta[9]}<br>${trajetoVolta[6]} min | ${trajetoVolta[5]} m<br><br><strong>${trajetoVolta[4]}</strong></td>
        </tr>
        <tr>
        <td><img src="./images/transporteIcon.svg" style="width:110%;"></td>
        </tr>
        `

        trajetoVoltaHTML.insertAdjacentHTML('beforeend', dados)
    }

    else if(trajetoVolta[0]=='Integração'){
        const dados=
        `
        <tr>
        <td class="icon"><i class="fa-solid fa-bus icon"></i></td>
        <td><strong>${trajetoVolta[3]}</strong><br><br>Embarque no transporte<br><strong>${trajetoVolta[7]}</strong><br>R$${trajetoVolta[8]}<br>${trajetoVolta[9]}<br>${trajetoVolta[6]} min | ${trajetoVolta[5]} m<br><br><strong>${trajetoVolta[4]}</strong></td>
        </tr>
        <tr>
        <td><img src="./images/transporteIcon.svg" style="width:110%;"></td>
        </tr>
        `

        trajetoVoltaHTML.insertAdjacentHTML('beforeend', dados)
    }
}
)
    //fim cria tabela volta
    //fim imprime tabela volta

    //cria a tabela bilhetes
const bilhetes=(body).valeTransp
const valeTransp=bilhetes.map(valeTransp=>[
 /*0*/   valeTransp.linkOPLogo,
 /*1*/   valeTransp.operadora, 
 /*2*/   valeTransp.tipoTransp,
 /*3*/   valeTransp.tarifaVt, 
 /*4*/   valeTransp.qtdVt,
 /*5*/   valeTransp.totVt,
 ])
//insere no tbody
 const tabelaBilhetesHTML=document.querySelector('.bilhetes')
 valeTransp.forEach(valeTransp=>{
        const dados=
        `
        <tr>
        <td>  <img src="${valeTransp[0]}" alt="#" style="width:60%;"></td>
        <td>${valeTransp[1]}</td>
        <td>R$${valeTransp[3]}</td>
        <td>${valeTransp[4]}</td>
        <td>R$${valeTransp[5]}</td>
        </tr>
        `

        tabelaBilhetesHTML.insertAdjacentHTML('beforeend', dados)
    }
    )
//fim insere no tbody

//insere no tfoot
const imprimeValorTotalTbBilhetes=document.querySelector('.totalDosBilhetes')
const tfoot=
`
<tr>
<tr>
<td></td>
<td></td>
<td colspan="3" style="text-align: right;"><strong>Valor total=R$${valorVtTotal}</strong></td>
</tr>
</tr>
`    
imprimeValorTotalTbBilhetes.insertAdjacentHTML('beforeend', tfoot)
//fim insere no tfoot

//fim cria a tabela bilhetes



//cria a tabela bilhetes na hora de revisar para aceitar

//insere no tbody
 const tabelaBilhetesHTML2=document.querySelector('.bilhetes2')
 valeTransp.forEach(valeTransp=>{
        const dados=
        `
        <tr>
        <td>  <img src="${valeTransp[0]}" alt="#" style="width:20%;"></td>
        <td>${valeTransp[1]}</td>
        <td>R$${valeTransp[3]}</td>
        <td>${valeTransp[4]}</td>
        <td>R$${valeTransp[5]}</td>
        </tr>
        `

        tabelaBilhetesHTML2.insertAdjacentHTML('beforeend', dados)
    }
    )
//fim insere no tbody

//insere no tfoot
const imprimeValorTotalTbBilhetes2=document.querySelector('.totalDosBilhetes2')
const tfoot2=
`
<tr>
<tr>
<td></td>
<td></td>
<td colspan="3" style="text-align: right;"><strong>Valor total=R$${valorVtTotal}</strong></td>
</tr>
</tr>
`    
imprimeValorTotalTbBilhetes2.insertAdjacentHTML('beforeend', tfoot2)
//fim insere no tfoot


}}
    ))}
//fim monta a página de resultado

//Manipulação de opções de ações (botões) de acordo com status do processo da roteirização do usuario
function manipularBotoes(){
    const urlParams = new URLSearchParams(location.search);
    const codConsulta=urlParams.get('codConsulta')
    let request= new Request(`http://rotaslink.captatec.com.br/api/RTL_VerificarStaResult?codConsulta=${codConsulta}`)
    fetch(request)
    .then(response=>response.json().then(body=>{
        const codigo=(body).codigo
        const codSta=(body).codStatus
        const botoes=document.querySelector('#botoesAcoes')
        const inputStatus=document.querySelector('.rotStatus')
        const inputStatus1=document.querySelector('.rotStatus1')
        if(codigo==0){
            console.log(body)
            manipularBotoes()
        }
        else{
            if(codSta==1){
                botoes.innerHTML=`<a href="http://rels.captatec.com.br/GeradorCarta?Consulta=${codConsulta}"style="
                position: relative;
                left: 3.5em;
            ">
                <button type="button" class="btn btn-primary btn-aceite-recusa">Baixar carta</button>
                </a>
                <button class="btn btn-danger btn-aceite-recusa" type="button" data-bs-toggle="modal" data-bs-target="#cancelar"style="
                position: relative;
                left: 3.5em;
            ">
        Não desejo VT
        </button>`
                inputStatus.innerHTML=`<input disabled id="statusRot" type="text" value="Resultado aceito e implantado" class="btn-aceite-recusa">`
            }
            else if(codSta==2){
                botoes.innerHTML=`<a href="http://rels.captatec.com.br/GeradorCarta?Consulta=${codConsulta}">
                <button type="button" class="btn btn-primary btn-aceite-recusa" style="
                position: relative;
                left: 8em;
            ">Baixar carta</button>
                </a>
                `
                inputStatus.innerHTML=`<input disabled id="statusRot" type="text" value="Você cancelou seu benefício" class="btn-aceite-recusa">`
            }
            else if(codSta==3){
                botoes.innerHTML=''
                inputStatus1.innerHTML='<input id="statusRot1" disabled type="text" value="Solicitação de ajuste de resultado em processamento" class="btn-aceite-recusa" style="width:28em">'
            }
        }
    }))
}
//Manipulação de opções de ações (botões) de acordo com status do processo da roteirização do usuario



//POST de quando usuário aceita o resultado
function aceitaResultado(){
    const urlParams = new URLSearchParams(location.search);
    const codConsulta=urlParams.get('codConsulta')
    let request=new Request(`http://rotaslink.captatec.com.br/api/RTL_Aceite?codConsulta=${codConsulta}&cancelamento=false`,{
        method:'POST'
    })
    fetch(request)
    .then(response => response.json().then(body=>{
        const codStatus=(body).codigo
        if(codStatus==0){
            window.location.href='http://rotaslink.captatec.com.br/ProjetoMyLink/erroAceitarRot.html'
            console.log((body), 'codigo 0')
        }
    }))
    .catch(err=>{console.log('erro na api', err)
        window.location.href='http://rotaslink.captatec.com.br/ProjetoMyLink/erroConexao.html'
    }
    )
}

//POST de quando usuário recusa o beneficio
function recusaBeneficio(){
    const urlParams = new URLSearchParams(location.search);
    const codConsulta=urlParams.get('codConsulta')
    let request=new Request(`http://rotaslink.captatec.com.br/api/RTL_Aceite?codConsulta=${codConsulta}&cancelamento=true`,{
        method:'POST'
    })
    fetch(request)
    .then(response => response.json().then(body=>{
        const codStatus=(body).codigo
        if(codStatus==0){
            window.location.href='http://rotaslink.captatec.com.br/ProjetoMyLink/erroAceitarRot.html'
            console.log((body), 'codigo 0')
        }
    }))
    .catch(err=>{console.log('erro na api', err)
        window.location.href='http://rotaslink.captatec.com.br/ProjetoMyLink/erroConexao.html'
    }
    )
}


//POST de quando o usuário solicita ajuste
function recusaResultado(){
    const urlParams = new URLSearchParams(location.search);
    const codConsulta=urlParams.get('codConsulta')
    const comentario=document.querySelector('#comentario').value
    let request=new Request(`http://rotaslink.captatec.com.br/api/RTL_Atendimento?codConsulta=${codConsulta}&comentario=${comentario}`,{
        method:'POST'
    })
    fetch(request)
    .then(response => response.json().then(body=>{
        const codStatus=(body).codigo
        const mensagem=(body).mensagem
        if(codStatus==0){
            console.log((body), 'codigo 0')
            window.location.href='http://rotaslink.captatec.com.br/ProjetoMyLink/erroRecusarRot.html?detalhe=${mensagem}'
        }
    }))
    .catch(err=>{console.log('erro na api', err)
        window.location.href='http://rotaslink.captatec.com.br/ProjetoMyLink/erroConexao.html'
    }
    )
}

//atribui o href do link de baixar carta ao botão de baixar carta
function baixarCarta(){
const buttonBaixarCarta=document.querySelector('#baixarCarta')
const buttonBaixarCarta1=document.querySelector('#baixarCarta1')
const urlParams = new URLSearchParams(location.search);
const codConsulta=urlParams.get('codConsulta')

buttonBaixarCarta.innerHTML=`<a href="http://rels.captatec.com.br/GeradorCarta?Consulta=${codConsulta}">
<button type="button" class="btn btn-primary" style="width: 100%;">Baixar carta</button>
</a>`

buttonBaixarCarta1.innerHTML=`<a href="http://rels.captatec.com.br/GeradorCarta?Consulta=${codConsulta}">
<button type="button" class="btn btn-primary" style="width: 100%;">Baixar carta</button>
</a>`
}

  /*function contadorCaracteres(e) {
    var maxChars = 300;
  inputLength = document.getElementById('comentario').value.length;
  let contador=document.querySelector('#charsTypped')
  contador.innerHTML=`Caracteres restantes: ${maxChars-inputLength}`
  if(inputLength >= maxChars) {
      e.preventDefault();
  }
    
};*/

$(document).on("input", "#comentario", function () {
    var limite = 300;
    var caracteresDigitados = $(this).val().length;
    var caracteresRestantes = limite - caracteresDigitados;

    $("#charsTypped").text(`Caracteres restantes: ${caracteresRestantes}`);
});