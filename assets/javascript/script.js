


let form = document.querySelector('form');
let input = document.querySelector('input');
let button = document.querySelector('.button');
let moreinfo = document.querySelector('.more-info');
let abriu;

let search = [];

button.addEventListener('click', () => {
    if(abriu == 1){
        moreinfo.style.display = 'none';
        abriu = 0
    } else {
        moreinfo.style.display = 'block';
        abriu = 1;
    }
   
})

form.addEventListener('submit' ,  (event) =>{
    event.preventDefault();
    if(input.value === '') return;
    busca = input.value;  
    input.value = '';
    clima(busca);
})
document.querySelector('.search img').addEventListener('click' ,  () =>{
    if(input.value === '') return;
    busca = input.value;  
    input.value = '';
    clima(busca);
})


clima('Rio de Janeiro');

function clima(busca){
    fetch('http://api.weatherapi.com/v1/current.json?key=b66f434e80904fd2adb233856230605&q=' + busca)
    .then(response => response.json())
    .then(data => exibir(data))
    .catch(error => console.log(error))

    document.querySelector('.city').innerHTML = 'Carregando' ;
    document.querySelector('.state').innerHTML = '' ;
    document.querySelector('.temp').innerHTML = '' ;
    document.querySelector('.temp-status img').style.display = 'block';
    document.querySelector('.city-info img').style.display = 'block'
    document.querySelector('.wind-status').style.display = 'flex';
}

async function exibir(data){
    console.log(data);
    if( await data.location){

        
        let infoString = `${data.location.name}, ${data.current.temp_c}°C`;
        let divregister = document.querySelector('.register');
        let search = [infoString];
        
        let clone = divregister.cloneNode(true);
        divregister.appendChild(clone);
        clone.innerHTML = search[0]


        document.querySelector('.city').innerHTML =  data.location.name;
        document.querySelector('.state').innerHTML = 'Estado: ' + data.location.region;
        document.querySelector('.temp').innerHTML =  data.current.temp_c + '°C';
        document.querySelector('.temp-status img').src =  data.current.condition.icon;
        document.querySelector('.wind').innerHTML =  data.current.wind_kph + ' km/h';
        document.querySelector('.more-info-weather').innerHTML = 'Sensação: ' + data.current.feelslike_c + ' ° <br>' + 'Umidade: ' + data.current.humidity;
        document.querySelector('.info-geo').innerHTML = 'Latitude: ' + data.location.lat + ' Longitude: ' + data.location.lon + '<br> Região: ' + data.location.tz_id
        switch(data.location.country) {
            case 'Brazil':
                document.querySelector('.city-info img').src = 'assets/images/brasil.png';
                break;
            case 'United States of America':
                document.querySelector('.city-info img').src = 'assets/images/estados-unidos-da-america.png';
                break;
            case 'Argentina':
                document.querySelector('.city-info img').src = 'assets/images/argentina.png';
                break;
            case 'Germany':
                document.querySelector('.city-info img').src = 'assets/images/alemanha.png';
                break;
            case 'France':
                document.querySelector('.city-info img').src = 'assets/images/franca.png';
                break;
            case 'Japan':
                document.querySelector('.city-info img').src = 'assets/images/japao.png';
                 break;
            default:
                document.querySelector('.city-info img').src = 'assets/images/earth.png';
                break;
        }
        switch(data.current.condition.text) {
            case 'Sunny':
                document.querySelector('.clima').innerHTML = 'Ensolarado';
                break;
            case 'Clear':
                document.querySelector('.clima').innerHTML = 'Limpo';
                break;
            case 'Partly cloudy':
                document.querySelector('.clima').innerHTML = 'Parcialmente Nublado';
                break;
            case 'Cloudy':
                    document.querySelector('.clima').innerHTML = 'Nublado';
                    break;
            case 'Overcast':
                    document.querySelector('.clima').innerHTML = 'Nublado';
                    break;
            case 'Patchy rain possible':
                document.querySelector('.clima').innerHTML = 'Possivel chuva';
                 break;
            case 'Light rain':
                    document.querySelector('.clima').innerHTML = 'Chuva leve';
                     break;
            case 'Light rain shower':
                    document.querySelector('.clima').innerHTML = 'Chuva ensolarada leve';
                    break;
            case 'Patchy light rain with thunder':
                 document.querySelector('.clima').innerHTML = 'Chuva leve com trovões';
                break;
            case 'Moderate or heavy rain with thunder':
                document.querySelector('.clima').innerHTML = 'Chuva moderada com pancadas';
                break;
            default:
                document.querySelector('.clima').innerHTML = '';
                break;      
        }
    }   
    else{
        document.querySelector('.city').innerHTML = 'Não encontramos nenhuma informação :( <br>Tente pesquisar por Cidade + Estado' ;
        document.querySelector('.state').innerHTML = '' ;
        document.querySelector('.temp').innerHTML = '' ;
        document.querySelector('.temp-status img').style.display = 'none';
        document.querySelector('.city-info img').style.display = 'none'
        document.querySelector('.clima').innerHTML = '';
        document.querySelector('.wind-status').style.display = 'none';
    }
}