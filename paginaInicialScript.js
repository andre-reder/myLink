
//Formação das máscaras (formatação)
class FormMask {

    constructor(element, mask, replacementChar, charsToIgnore) {

        this.input = element
        this.mask = mask
        this.char = replacementChar
        this.specialChars = charsToIgnore

        //this.input.value = this.mask

        this.applyListeners()

    }

    applyListeners() {

        this.input.addEventListener("focus", () => this.moveCursorToStart()) //empty case, add mask and go to the beginning
        this.input.addEventListener("click", () => this.moveCursorToStart())

        this.input.addEventListener("blur", e => {

            const inputChars = this.input.value.split("")
            const ignore = inputChars.indexOf(this.char) < 0

            const className = ignore ? "valid" : "invalid"

            this.cleanAndSetClasses(this.input, [className])

            if (this.input.value == this.mask) this.input.value = ""

        })

        this.input.addEventListener("keydown", e => {

            if (e.key == "Backspace" || e.key == "Delete") {

                this.deleteValue(this.input.value.split(""))
                e.preventDefault()

            }

        })

        this.input.addEventListener("keypress", e => {

            e.preventDefault()

            const numberKey = (!isNaN(e.key) && e.key != " ") //(" " == 0) to javascript

            if (!numberKey) return

            const inputChars = this.input.value.split("")

            this.maskPattern(inputChars, e)

        })

        this.input.addEventListener("paste", e => {

            const data = e.clipboardData.getData("text")

            this.onPasteData(data)

            e.preventDefault()

        })

    }

    moveCursorToStart() {

        this.cleanAndSetClasses(this.input, [])

        if (this.input.value == "" || this.input.value == this.mask) {

            this.input.value = this.mask

            const inputChars = this.input.value.split("")
            const indexToStart = inputChars.indexOf(this.char)

            this.input.setSelectionRange(indexToStart, indexToStart) //cursor position

        }

    }

    cleanAndSetClasses(element, classes) {

        element.classList.remove("valid", "invalid")
        classes.forEach(className => element.classList.add(className))

    }

    maskPattern(inputChars, event) {

        let cursor = this.input.selectionStart

        for (let i = cursor; i < inputChars.length; i++) { //grant to skip all special chars on insert

            let ignore = this.specialChars.indexOf(inputChars[i]) >= 0 //if special char, ignore (increment cursor)

            if (!ignore) break

            cursor++ //jump to next char != ignored

        }

        inputChars.splice(cursor, 1, event.key)

        this.insertValue(inputChars.join(""), cursor + 1)

    }

    insertValue(result, cursor) {

        if (result.length != this.mask.length) return

        this.input.value = result

        if (cursor >= 0) this.input.setSelectionRange(cursor, cursor)

    }

    deleteValue(inputChars) {

        const withoutSelectionRange = this.checkSelectionRange(inputChars)

        if (!withoutSelectionRange) return

        let cursor = this.input.selectionStart

        for (let i = 0; i < inputChars.length; i++) { //skip special chars on delete

            let ignore = this.specialChars.indexOf(inputChars[cursor - 1]) >= 0

            if (!ignore) break

            cursor -= 1

        }

        inputChars.splice(cursor - 1, 1, this.char)

        this.insertValue(inputChars.join(""), cursor - 1)

    }

    checkSelectionRange(inputChars) {

        if (this.input.selectionStart == this.input.selectionEnd) return true

        let start = this.input.selectionStart
        let end = this.input.selectionEnd

        for (let i = start; i < end; i++) {

            let nonSpecialChar = this.specialChars.indexOf(inputChars[i]) < 0

            if (nonSpecialChar) inputChars.splice(i, 1, this.char)

        }

        this.insertValue(inputChars.join(""), start)

        return false

    }

    onPasteData(data) {

        const maskChars = this.mask.split("")
        const dataChars = data.split("")

        const onlyNumbers = dataChars.filter(value => !isNaN(value) && value != " ")
        const maskWithoutSpecialChars = maskChars.filter(value => value == this.char)

        const numberOfChars = maskWithoutSpecialChars.length

        for (let i = 0; i < numberOfChars; i++) {

            let positionChar = maskChars.indexOf(this.char)
            let number = onlyNumbers[i] || this.char

            maskChars.splice(positionChar, 1, number)
        }

        this.input.value = ""

        this.insertValue(maskChars.join(""), maskChars.indexOf(this.char))

    }

}
new FormMask(document.querySelector("#cpfFunc"), "___.___.___-__", "_", [".", "-"])
new FormMask(document.querySelector("#cepFunc"), "_____-___", "_", [".", "-"])
//Fim formação das máscaras


//Validação do CPF
function _cpf(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    if (cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999")
    return false;
    add = 0;
    for (i = 0; i < 9; i++)
    add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
    rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
    return false;
    add = 0;
    for (i = 0; i < 10; i++)
    add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
    rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
    return false;
    return true;
    }

    function validarCPF(el){
        if( !_cpf(el.value) ){
            const insereAlerta=document.querySelector('#alertas')
        insereAlerta.innerHTML=`
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>CPF inválido!</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
        // apaga o valor
        el.value = "";
        }
        else{
            const insereAlerta=document.querySelector('#alertas')
                    insereAlerta.innerHTML=''
        }
        }
//Fim validação CPF


//Validação do e-mail
        function validacaoEmail(field) {
            usuario = field.value.substring(0, field.value.indexOf("@"));
            dominio = field.value.substring(field.value.indexOf("@")+ 1, field.value.length);
            
            if ((usuario.length >=1) &&
                (dominio.length >=3) &&
                (usuario.search("@")==-1) &&
                (dominio.search("@")==-1) &&
                (usuario.search(" ")==-1) &&
                (dominio.search(" ")==-1) &&
                (dominio.search(".")!=-1) &&
                (dominio.indexOf(".") >=1)&&
                (dominio.lastIndexOf(".") < dominio.length - 1)) 
                {
                    const insereAlerta=document.querySelector('#alertas')
                    insereAlerta.innerHTML=''}
            else{
            
                const insereAlerta=document.querySelector('#alertas')
                insereAlerta.innerHTML=`
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>E-mail inválido!</strong>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>`
            field.value=''
            }
            }
//Fim validação email


//API CEP
// capturar os campos do formulário
const cepInput = document.querySelector('#cepFunc');
const inputLogradouro = document.querySelector("#logradouroFunc");
const inputBairro = document.querySelector("#bairroFunc");
const inputLocalidade = document.querySelector("#localidadeFunc");
const inputUF = document.querySelector("#ufFunc");

/**
 * Devolve a url do endpoint da API
 * @param {DOM Element} inputValue - valor do campo cep 
 */
const getEndpointFromURL = (inputValue) => {
    let search = inputValue.replace('-', '') || inputValue.replace('.', '');

    return `https://viacep.com.br/ws/${search}/json/`;
};

/**
 * Faz a requisição a api
 * @param {DOM Element} inputValue - valor do campo cep
 */
function makeRequest(inputValue) {
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    };

    fetch(getEndpointFromURL(inputValue), options)
        .then(response => response.json())
        .then(data => render(data))
        //caso o CEP seja inválido, emite um alerta de CEP inválido, torna os campos inedtiáveis novamente,
        //e limpa todos os campos.
        .then(function(el){
            if (document.querySelector('#ufFunc').value=='undefined'){
            alert('CEP Inválido!')
            document.querySelector('#logradouroFunc').value=""
            document.querySelector('#bairroFunc').value=""
            document.querySelector('#localidadeFunc').value=""
            document.querySelector('#ufFunc').value=""
            document.querySelector('#cepFunc').value=""
            document.querySelector('#numeroFunc').value=""
            document.querySelector('#logradouroFunc').disabled=true
            document.querySelector('#bairroFunc').disabled=true
            document.querySelector('#logradouroFunc').style.backgroundColor='rgb(209, 209, 209)'
            document.querySelector('#bairroFunc').style.backgroundColor='rgb(209, 209, 209)'
        }
        }
        )}

/**
 * Preenche os campos do formulário com os dados do objeto passado por parâmetro
 * @param {Object} objectResponse - objeto retornado da resposta da requisição
 */
const render = (objectResponse) => {
    const { logradouro, bairro, localidade, uf } = { ...objectResponse };
    inputLogradouro.value = logradouro;
    inputBairro.value = bairro;
    inputLocalidade.value = localidade;
    inputUF.value = uf;
    lockInputFields();
    alteraCorDeFundo();
};

/**
 * Permite os usuários digitarem nos campos de Endereço após preencher o cep
 * Marca disabled = false em cada um dos campos
 */
function lockInputFields(){
    inputLogradouro.disabled = false;
    inputBairro.disabled = false;
    inputLocalidade.disabled = true;
    inputUF.disabled = true;
}

//Altera a cor de fundo para branco ao tornar o elemento editavel após preenchimento do cep
function alteraCorDeFundo(){
    if (inputLogradouro.disabled == false){
        inputLogradouro.style.backgroundColor = '#fff'
        inputBairro.style.backgroundColor = '#fff'
    }
}

cepInput.addEventListener('blur', () => {
    makeRequest(cepInput.value);
})
//fim api cep




//Animação/navegação e requisições da página 
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset - propriedades a serem animadas
var animating; //flag to prevent quick multi-click glitches

//primeiro fieldset, função para avançar ou impedir o avanço
$(".next1").click(function(){

const cpfInput=document.querySelector('#cpfFunc').value
const nomeInput=document.querySelector('#nomeFunc').value
const emailInput=document.querySelector('#emailFunc').value
if(cpfInput==''||nomeInput==''||emailInput==''){
alert('Preencha todos os campos para avançar!')
    }
else{


if(animating){ return false;}
animating = true;

current_fs = $(this).parent();
let next_fs = $(this).parent().next();


//activate next step on progressbar using the index of next_fs
$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

//show the next fieldset

next_fs.show(); 
//hide the current fieldset with style
current_fs.animate({opacity: 0}, {
step: function(now, mx) {
//as the opacity of current_fs reduces to 0 - stored in "now"
//1. scale current_fs down to 80%
scale = 1 - (1 - now) * 0.2;
//2. bring next_fs from the right(50%)
left = (now * 50)+"%";
//3. increase opacity of next_fs to 1 as it moves in
opacity = 1 - now;
current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
next_fs.css({'left': left, 'opacity': opacity});
}, 
duration: 800, 
complete: function(){
current_fs.hide();
animating = false;
}, 
//this comes from the custom easing plugin
easing: 'easeInOutBack'
});
}
});



//segundo fieldset, função para avançar ou impedir o avanço
$(".next2").click(function(){

if(document.querySelector('#cepFunc').value==''|| document.querySelector('#cepFunc').value=='_____-___' || inputBairro.value==''||inputLogradouro.value==''||document.querySelector('#numeroFunc').value=='')
alert('Preencha todos os campos para avançar!')
else{


if(animating){ return false;}
animating = true;

current_fs = $(this).parent();
let next_fs = $(this).parent().next();


//activate next step on progressbar using the index of next_fs
$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

//show the next fieldset

next_fs.show(); 
//hide the current fieldset with style
current_fs.animate({opacity: 0}, {
step: function(now, mx) {
//as the opacity of current_fs reduces to 0 - stored in "now"
//1. scale current_fs down to 80%
scale = 1 - (1 - now) * 0.2;
//2. bring next_fs from the right(50%)
left = (now * 50)+"%";
//3. increase opacity of next_fs to 1 as it moves in
opacity = 1 - now;
current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
next_fs.css({'left': left, 'opacity': opacity});
}, 
duration: 800, 
complete: function(){
current_fs.hide();
animating = false;
}, 
//this comes from the custom easing plugin
easing: 'easeInOutBack'
});
}
});



//terceiro fieldset, função para avançar ou impedir o avanço, início do cronometro, e requisição para roteirizar
$(".next3").click(function(){

if(document.querySelector('#localTrab').value==''){
alert('Selecione um local de trabalho para avançar!')
}


else{//passa para a tela de aguarde animação, inicia o cronometro, e o timeout
contarTempo()
expirou()
quatroMin()
//animação
if(animating){ return false;}
animating = true;

current_fs = $(this).parent();
let next_fs = $(this).parent().next();


//activate next step on progressbar using the index of next_fs
$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

//show the next fieldset

next_fs.show(); 
//hide the current fieldset with style
current_fs.animate({opacity: 0}, {
step: function(now, mx) {
//as the opacity of current_fs reduces to 0 - stored in "now"
//1. scale current_fs down to 80%
scale = 1 - (1 - now) * 0.2;
//2. bring next_fs from the right(50%)
left = (now * 50)+"%";
//3. increase opacity of next_fs to 1 as it moves in
opacity = 1 - now;
current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
next_fs.css({'left': left, 'opacity': opacity});
}, 
duration: 800, 
complete: function(){
current_fs.hide();
animating = false;
}, 



//this comes from the custom easing plugin
easing: 'easeInOutBack'
});

//fim animação
    
    
    //Realizar a roteirização POST
        const alertas=document.querySelector('#alertas')
        const urlParams = new URLSearchParams(location.search);
        const codEmpresa=urlParams.get('codEmpresa')
    
        const cpfFunc=document.querySelector('#cpfFunc').value
        const nomeFunc=document.querySelector('#nomeFunc').value
        const email=document.querySelector('#emailFunc').value
        const cepFunc=document.querySelector('#cepFunc').value
        const logradouroFunc=document.querySelector('#logradouroFunc').value
        const numeroFunc=document.querySelector('#numeroFunc').value
        const complementoFunc=document.querySelector('#complementoFunc').value
        const bairroFunc=document.querySelector('#bairroFunc').value
        const cidadeFunc=document.querySelector('#localidadeFunc').value
        const ufFunc=document.querySelector('#ufFunc').value
        const codEndCliente=document.getElementById('codEndCliente').value
    
        let url=`http://rotaslink.captatec.com.br/api/RTL_Roteirizar?appCode=2&codEmpresa=${codEmpresa}&codLocTrab=${codEndCliente}`
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        let request=new Request(url, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                "cpf": `${cpfFunc}`,
                "nome": `${nomeFunc}`,
                "email": `${email}`,
                "cepF": `${cepFunc}`,
                "logradouroF": `${logradouroFunc}`,
                "numF": numeroFunc,
                "complementoF": `${complementoFunc}`,
                "bairroF": `${bairroFunc}`,
                "cidadeF": `${cidadeFunc}`,
                "ufF": `${ufFunc}`
            })
        })
        fetch(request)
            .then(response => response.json().then(body=>{
                console.log((body))
                codConsulta=(body).codConsulta
                codFuncionario=(body).codFuncionario
                let codStatus=(body).codigo
                if(codStatus==0){
                    document.querySelector('#telaAguarde').innerHTML=`<h2 class="fs-title">Ops! Tivemos um problema ao enviar seus dados para roteirizar.</h2>
                    <h3 class="fs-subtitle">Por favor, tente realizar o processo novamente!<br>
                    Detalhe do erro: ${(body).msg}</h3>
                    <i class="fas fa-exclamation-triangle" style="float: center; margin-left: 20px ;margin-right: 20px; margin-top: 10px; font-size: 75px;"></i>`
                    
                }
                else{
                    verificaStatusRoteirizacao()
                }
            }))
       
/*alerta*/.catch(err => {//window.location.href='http://rotaslink.captatec.com.br/ProjetoMyLink/erroConexao.html'
                alertas.innerHTML=
                `
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>A CONSULTA NÃO FOI ENVIADA PARA ROTEIRIZAÇÃO</strong>
                <p>Por favor, tente repetir esse processo através do navegador <a href="https://play.google.com/store/apps/details?id=org.mozilla.firefox&hl=pt_BR&gl=US">Mozilla Firefox</a><br>erro ao chamar a api, ${err}<p>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>`
                
                }) 
    
    //Fim função para realizar a roteirização POST
            }


});
//FIM terceiro fieldset, função para avançar ou impedir o avanço, início do cronometro, e requisição para roteirizar


//animações para voltar à página anterior
$(".previous").click(function(){
    const alertas=document.querySelector('#alertas')
    alertas.innerHTML=''
if(animating) return false;
animating = true;

current_fs = $(this).parent();
previous_fs = $(this).parent().prev();

//de-activate current step on progressbar
$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

//show the previous fieldset
previous_fs.show(); 
//hide the current fieldset with style
current_fs.animate({opacity: 0}, {
step: function(now, mx) {
//as the opacity of current_fs reduces to 0 - stored in "now"
//1. scale previous_fs from 80% to 100%
scale = 0.8 + (1 - now) * 0.2;
//2. take current_fs to the right(50%) - from 0%
left = ((1-now) * 50)+"%";
//3. increase opacity of previous_fs to 1 as it moves in
opacity = 1 - now;
current_fs.css({'left': left});
previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
}, 
duration: 800, 
complete: function(){
current_fs.hide();
animating = false;
}, 
//this comes from the custom easing plugin
easing: 'easeInOutBack'
});
});

/*$(".submit").click(function(){
return false;
})*/
//fim animação/nav pagina 1

//funções para impedir o avanço caso haja algum campo vazio.
/*function impede1(){
    const cpfInput=document.querySelector('#cpfFunc').value
    const nomeInput=document.querySelector('#nomeFunc').value
    const emailInput=document.querySelector('#emailFunc').value
    if(cpfInput==''||nomeInput==''||emailInput==''){
    alert('Preencha todos os campos para avançar!')
    }
}

function impede2(){
    if(document.querySelector('#cepFunc').value==''|| document.querySelector('#cepFunc').value=='_____-___' || inputBairro.value==''||inputLogradouro.value==''||document.querySelector('#numeroFunc').value=='')
    alert('Preencha todos os campos para avançar!')
}

function impede3(){
    if(document.querySelector('#localTrab').value=='')
    alert('Selecione um local de trabalho para avançar!')
}
//fim funções impedir avanços*/

//Cronometro
function contarTempo(){
    let n = 1;
    let n0=0;
    let m0=0;
    let m1= 1;
    let s = document.getElementById("segundos");
    let m = document.querySelector("#minutos");
    
    window.setInterval(function(){
      s.innerHTML = `${n0}${n}`;
      n<9 ? n0='0' : n0=''
      n<59 ? n++ : n='00';
    },1000);
    
    window.setInterval(function(){
        m.innerHTML = `${m0}${m1}:`;
        m1<9 ? m0='0' : m0=''
        m1<59 ? m1++ : alert('Tempo expirado, por favor, tente novamente mais tarde')
      },1000*60);
    }
//fim cronometro    


//realiza a validação da empresa com a api de validação
function validarAcesso(){ 

    const urlParams = new URLSearchParams(location.search);
    if(urlParams.has('codConsulta')==false){
    const codEmpresa=urlParams.get('codEmpresa')
    
    let request = new Request(`http://rotaslink.captatec.com.br/api/RTL_Acesso?appCode=2&codEmpresa=${codEmpresa}`, {
        method: "GET"
    });
    fetch(request)
    .then(response => response.json().then(body => {const resposta=(body)
    console.log(resposta)
    if(resposta.codigo==1){
        console.log('deu certo')
    }
    else{
        console.log('deu ruim')
        window.location.href=`http://rotaslink.captatec.com.br/ProjetoMyLink/erroValidacao.html`
    }}))
    .catch(err => {console.log('erro na api', err)
    window.location.href='http://rotaslink.captatec.com.br/ProjetoMyLink/erroConexao.html'
    })
    }}



    /*//imprime codigo da empresa no input hidden
    const btnImportCodEmpresaValue=document.querySelector('#proximo1')
    btnImportCodEmpresaValue.addEventListener("click", function(){
        const inputHiddenCodEmpresa=document.querySelector('#codEmpresa2')
        inputHiddenCodEmpresa.innerHTML=`<input type=hidden id=codEmpresaRecuperado value=${Number(localStorage.getItem('valueCodEmpresa'))}>`
    })
    //fim imprime codigo da emresaa no input hidden*/


//chamada da api resgata locais de trabalho
function locaisTrab() {
	const urlParams = new URLSearchParams(location.search);
    if(urlParams.has('codConsulta')==false){

    const codEmpresa=urlParams.get('codEmpresa')
    let request = new Request(`http://rotaslink.captatec.com.br/api/RTL_ListaLT?codEmpresa=${codEmpresa}`)
    fetch(request)
    .then(response => response.json().then(body => {
        const resposta=(body)
        const locaisTrabalho=resposta.locaisTrabalho
        const verificaCodigo=resposta.codigo
        if(verificaCodigo==0){
            locaisTrab()
            console.log(resposta)
        }

        const denominacaoLocaisTrabalho=locaisTrabalho.map(locaisTrabalho=>
            [locaisTrabalho.localTrabalho, locaisTrabalho.codEndCliente, locaisTrabalho.logradouroLt, locaisTrabalho.cidadeLt, locaisTrabalho.ufLt, locaisTrabalho.bairroLt])

        console.log(denominacaoLocaisTrabalho)
        const selectOptionsLocalTrab=document.getElementById('localTrab')
        denominacaoLocaisTrabalho.forEach((item)=>{
            let options=document.createElement("option")
            options.innerText=item[0]
            options.value=item[1]
            options.setAttribute('data-logradouro',item[2])
            options.setAttribute('data-cidade',item[3])
            options.setAttribute('data-uf',item[4])
            options.setAttribute('data-bairro',item[5])
            selectOptionsLocalTrab.appendChild(options)
        })
        }))
        .catch(err => {
            const insereAlerta=document.querySelector('#alertas')
        insereAlerta.innerHTML=`
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Não foi possível resgatar os locais de trabalho de sua empresa!</strong>
        <p>Devido a um erro de conexão, não foi possível encontrar os locais de trabalho da sua empresa. Por favor, tente novamente mais tarde. ${err}<p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
        })
        
}
}
//modifica os atributos do select ao selecionar outro
function atualizouAtributos(){
    let CodLocTrabSelected=document.getElementById('localTrab')
    let valorCodLocTrabSelected=CodLocTrabSelected.options[CodLocTrabSelected.selectedIndex]
    document.getElementById('codEndCliente').value=valorCodLocTrabSelected.value
    if(valorCodLocTrabSelected.getAttribute('data-bairro')==null){
        document.getElementById('enderecoLt').innerHTML=''
    }
    else{
    document.getElementById('enderecoLt').innerHTML=`${valorCodLocTrabSelected.getAttribute('data-logradouro')}, ${valorCodLocTrabSelected.getAttribute('data-bairro')}, ${valorCodLocTrabSelected.getAttribute('data-cidade')}, ${valorCodLocTrabSelected.getAttribute('data-uf')}`
    }
    
}
//Fim resgatar lista LT API


//redirecionamento para página de tempo expirado 1 hora após do evento clique em 'roteirizar'
function expirou(){
setTimeout( function timeOut(){
    window.location.href='http://rotaslink.captatec.com.br/ProjetoMyLink/tempoExpirado.html'
},1000*60*59)}

function quatroMin(){
setTimeout(function timeOutt(){
    alertas.innerHTML=
        `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Isso está demorando mais que o normal</strong>
        <p>Tente voltar mais tarde através do link enviado ao seu email, se não tiver recebido, por favor, tente repetir esse processo através do navegador <a href="https://play.google.com/store/apps/details?id=org.mozilla.firefox&hl=pt_BR&gl=US">Mozilla Firefox</a><p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
},1000*60*4)}


function verificaStatusRoteirizacao(){
    setInterval(()=>{
        let request = new Request(`http://rotaslink.captatec.com.br/api/RTL_VerificaProc?codConsulta=${codConsulta}`)
        fetch(request)
        .then(response=>response.json().then(body=>{
            let codStatus=(body).codigo
            let msgCodStatus=(body).msg
            console.log((body),codStatus,msgCodStatus,(body).statusProcessamento,(body).statusProcessamento.codSta)
            let statusProcessamento=(body).statusProcessamento.codSta
            let msgStatusProcessamento=(body).statusProcessamento.StatusProc
            if(codStatus==0){         
                console.log(msgCodStatus)    
                //window.location.href=`http://rotaslink.captatec.com.br/ProjetoMyLink/erroConexao.html`
            }
            else if(statusProcessamento==0){ 
                document.querySelector('#mensagemStatus').innerHTML=`Sua consulta (${codConsulta}) foi gerada e está na fila, aguardando para ser processada`
            }
            else if(statusProcessamento==1){       
                document.querySelector('#mensagemStatus').innerHTML=`Sua consulta (${codConsulta}) está em processamento, em alguns segundos seu resultado será gerado!`
            }
            else if(statusProcessamento==2){            
                window.location.href=`http://rotaslink.captatec.com.br/ProjetoMyLink/resultado.html?codFuncionario=${codFuncionario}&codConsulta=${codConsulta}`
            }
            else if(statusProcessamento==3){
                window.location.href=`http://rotaslink.captatec.com.br/ProjetoMyLink/erroProcessamento.html`
            }
            else if(statusProcessamento==4){
                window.location.href=`http://rotaslink.captatec.com.br/ProjetoMyLink/erroConsultaExpirada.html`
            }
            console.log(msgCodStatus)
            console.log(msgStatusProcessamento)
        }))
        .catch(err=>{console.log('erro na api', err)
           //window.location.href=`http://rotaslink.captatec.com.br/ProjetoMyLink/erroConexao.html`
        })
    },2000)
}

function linkDireto(){
    const urlParams = new URLSearchParams(location.search);
    if(urlParams.has('codConsulta')){
        let codConsulta2=urlParams.get('codConsulta')
        let codFuncionario2=urlParams.get('codFuncionario')
        let telaAguarde=document.querySelector('#msform')
        let request = new Request(`http://rotaslink.captatec.com.br/api/RTL_VerificaProc?codConsulta=${codConsulta2}`)
            fetch(request)
            .then(response=>response.json().then(body=>{
                let codStatus=(body).codigo
                let msgCodStatus=(body).msg
                console.log((body),codStatus,msgCodStatus,(body).statusProcessamento,(body).statusProcessamento.codSta)
                let statusProcessamento=(body).statusProcessamento.codSta
                let msgStatusProcessamento=(body).statusProcessamento.StatusProc
                if(codStatus==0){         
                    console.log(msgCodStatus)    
                    //window.location.href=`http://rotaslink.captatec.com.br/ProjetoMyLink/erroConexao.html`
                }
                else if(statusProcessamento==0){ 
                    document.querySelector('#mensagemStatus').innerHTML=`Sua consulta (${codConsulta2}) foi gerada e está na fila, aguardando para ser processada`
                }
                else if(statusProcessamento==1){       
                    document.querySelector('#mensagemStatus').innerHTML=`Sua consulta (${codConsulta2}) está em processamento, em alguns segundos seu resultado será gerado!`
                }
                else if(statusProcessamento==2){            
                    window.location.href=`http://rotaslink.captatec.com.br/ProjetoMyLink/resultado.html?codFuncionario=${codFuncionario2}&codConsulta=${codConsulta2}`
                }
                else if(statusProcessamento==3){
                    window.location.href=`http://rotaslink.captatec.com.br/ProjetoMyLink/erroProcessamento.html`
                }
                else if(statusProcessamento==4){
                    window.location.href=`http://rotaslink.captatec.com.br/ProjetoMyLink/erroConsultaExpirada.html`
                }
                console.log(msgCodStatus)
                console.log(msgStatusProcessamento)
            }))
            .catch(err=>{console.log('erro na api', err)
               //window.location.href=`http://rotaslink.captatec.com.br/ProjetoMyLink/erroConexao.html`
            })
        telaAguarde.innerHTML=`<!--Tela de aguarde-->
        <fieldset>
            <h2 class="fs-title">Estamos calculando seu itinerário.</h2>
            <div>
            <p style="font-size: 12px; text-align: left;">O tempo estimado para a sua roteirização ser concluída é de 50 segundos. Enquanto isso, enviaremos um e-mail para
                    você utilizar em caso de solicitação de ajuste do resultado e para baixar nova carta de opção de Vale-Transporte</p>
            </div>
            <div class="countdown" style="margin-left: 15%; width: 200%;">
                <div class="time">
                <div id="minutos" style="float: left;">00:</div>
                
                <div id="segundos" style="float: right;">00</div>
                
                </div>
            </div>
        </fieldset>
        <!--fim tela de aguarde-->`
        contarTempo();
        
        setInterval(()=>{
            let request = new Request(`http://rotaslink.captatec.com.br/api/RTL_VerificaProc?codConsulta=${codConsulta2}`)
            fetch(request)
            .then(response=>response.json().then(body=>{
                let codStatus=(body).codigo
                let msgCodStatus=(body).msg
                console.log((body),codStatus,msgCodStatus,(body).statusProcessamento,(body).statusProcessamento.codSta)
                let statusProcessamento=(body).statusProcessamento.codSta
                let msgStatusProcessamento=(body).statusProcessamento.StatusProc
                if(codStatus==0){         
                    console.log(msgCodStatus)    
                    //window.location.href=`http://rotaslink.captatec.com.br/ProjetoMyLink/erroConexao.html`
                }
                else if(statusProcessamento==0){ 
                    document.querySelector('#mensagemStatus').innerHTML=`Sua consulta (${codConsulta2}) foi gerada e está na fila, aguardando para ser processada`
                }
                else if(statusProcessamento==1){       
                    document.querySelector('#mensagemStatus').innerHTML=`Sua consulta (${codConsulta2}) está em processamento, em alguns segundos seu resultado será gerado!`
                }
                else if(statusProcessamento==2){            
                    window.location.href=`http://rotaslink.captatec.com.br/ProjetoMyLink/resultado.html?codFuncionario=${codFuncionario2}&codConsulta=${codConsulta2}`
                }
                else if(statusProcessamento==3){
                    window.location.href=`http://rotaslink.captatec.com.br/ProjetoMyLink/erroProcessamento.html`
                }
                else if(statusProcessamento==4){
                    window.location.href=`http://rotaslink.captatec.com.br/ProjetoMyLink/erroConsultaExpirada.html`
                }
                console.log(msgCodStatus)
                console.log(msgStatusProcessamento)
            }))
            .catch(err=>{console.log('erro na api', err)
               //window.location.href=`http://rotaslink.captatec.com.br/ProjetoMyLink/erroConexao.html`
            })
        },2000)
    }
}