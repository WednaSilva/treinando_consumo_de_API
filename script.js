function pesquisarCidade(){ 
    let cidadeInput = document.getElementById("cidadeInput").value;
    let objeto;
    const api ={
        key: "&APPID=51e675674aff185818c305f2d99978fa",
        base: "https://api.openweathermap.org/data/2.5/weather?q=",
        adicional: "&lang=PT&units=metric"
    };
    fetch(`${api.base}${cidadeInput}${api.key}${api.adicional}`).then(response=>{
        return response.json();
    }).then(response=>{
        objeto = response;

        carregarAnimacoes();

        if(objeto.cod == 404){ 
            cidadeInvalida();
        }else{
            atualizarContainer(objeto)
        }

        document.getElementById("cidadeInput").value="";
    });
};
function cidadeInvalida(){ 
    let cidade = document.getElementsByClassName("cidade")[0];
    cidade.innerHTML = "Cidade inválida";

    let temperatura = document.getElementsByClassName("temperatura")[0];
     temperatura.innerHTML = "0°";

    let clima = document.getElementsByClassName("clima")[0];
    clima.innerHTML="Escolha uma cidade";

 
}
function atualizarContainer(objeto){
     let cidade = document.getElementsByClassName("cidade")[0];
     cidade.innerHTML = `${objeto.name}, ${objeto.sys.country}`;

     const data = novaData("data");
     document.getElementsByClassName("data")[0].innerHTML=data;

     let temperatura = document.getElementsByClassName("temperatura")[0];
     temperatura.innerHTML = `${Math.round(objeto.main.temp)}°`;

     let clima = document.getElementsByClassName("clima")[0];
     clima.innerHTML=objeto.weather[0].description;

    let minMax = document.getElementsByClassName("temperatura_média")[0];
     minMax.innerHTML=`${Math.round(objeto.main.temp_max)}°`
     
}

function novaData(tipo){ 
    const d = new Date;
    switch(tipo){
        case "data":
            const ano = d.getFullYear();
            const mes = d.getMonth();
            const mesesExtenso = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
            const diaSemana = d.getDay();
            const diasExtenso = ["domingo","segunda","terça","quarta","quinta","sexta","sábado"];
            const dia = d.getDate();
            return `${diasExtenso[diaSemana]}, ${dia} de ${mesesExtenso[mes]} ${ano}`;
        
        case "hora":
            const horas = d.getHours()
            return horas;
    }
}
function carregarAnimacoes(){
    document.querySelector("main").style.animation="surgir 500ms ease-in";
        setTimeout(()=>{
            document.querySelector("main").style.animation="none";
        },700)
}


document.getElementById("cidadeBtn").addEventListener("click", pesquisarCidade);
document.addEventListener("keydown", ()=>{
    if(event.key == "Enter"){
        pesquisarCidade();
    }
})