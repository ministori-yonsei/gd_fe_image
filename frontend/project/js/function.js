// 지도를 표시할 div 
var container = document.getElementById('map');

// 초기값
var options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};

var map;

var watchStatus = false;

var watchID;

var watchMarker = '';
var searchMarker = '';

// let address = '서울시 금천구 가산디지털2로 115';

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

// 페이지 로딩시 지도에 현재위치를 좌표로 중심 표시
function updateCenterCoordinate(){

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(position){

            options.center = new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
  
            // 현재 위치 좌표로 지도를 재 생성
            map = new kakao.maps.Map(container, options);

            geocoder.coord2Address(position.coords.longitude, position.coords.latitude, function(result, status){

                console.log(result[0].address.region_1depth_name);
                document.querySelector('.popup-address-1depth').innerHTML = result[0].address.region_1depth_name;
                console.log(result[0].address.region_2depth_name);
                document.querySelector('.popup-address-2depth').innerHTML = result[0].address.region_2depth_name;
                console.log(result[0].address.region_3depth_name);
                document.querySelector('.popup-address-3depth').innerHTML = result[0].address.region_3depth_name;

                document.querySelector('.popup-address-3depth-h').innerHTML = '';

            });

            getWeatherData(position.coords.latitude, position.coords.longitude);

        });
  
      } else { 
        alert('Not Support!');
      }

}

// 현재 위치를 모니터링
function watchLocation() {

    document.querySelector('.input-address').value = '';

    if (navigator.geolocation) {

      watchID = navigator.geolocation.watchPosition(function(position){

        // 기존 마커 삭제
        if(watchMarker != ''){
            watchMarker.setMap(null);
        }

        console.log(position.coords);

        // 마커가 표시될 위치입니다 
        var markerPosition  = new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude); 

        // 마커를 생성합니다
        watchMarker = new kakao.maps.Marker({
            position: markerPosition
        });

        // 마커 위치로 지도 중심 이동
        map.setCenter(markerPosition);

        // 마커가 지도 위에 표시되도록 설정합니다
        watchMarker.setMap(map);

        geocoder.coord2Address(position.coords.longitude, position.coords.latitude, function(result, status){

            console.log(result[0].address.region_1depth_name);
            document.querySelector('.popup-address-1depth').innerHTML = result[0].address.region_1depth_name;
            console.log(result[0].address.region_2depth_name);
            document.querySelector('.popup-address-2depth').innerHTML = result[0].address.region_2depth_name;
            console.log(result[0].address.region_3depth_name);
            document.querySelector('.popup-address-3depth').innerHTML = result[0].address.region_3depth_name;

            document.querySelector('.popup-address-3depth-h').innerHTML = '';

        });

        getWeatherData(position.coords.latitude, position.coords.longitude);

      });

    } else { 
      alert('Not Support!');
    }

}

function stopWatch(dom){

    dom.setAttribute('class', 'button-position');

    navigator.geolocation.clearWatch(watchID);

    watchStatus = false;

}

// 주소로 위치 검색
function formSearch(){

    stopWatch( document.querySelector('.button-position') );

    let address = document.querySelector('.input-address').value;

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch( address, function(result, status){

        if(searchMarker != ''){
            searchMarker.setMap(null);
        }

        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {

            // 주소로 검색한 위치 좌표를 지도의 위치로 대응
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            searchMarker = new kakao.maps.Marker({
                map: map,
                position: coords
            });

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);

            console.log(result[0].address.region_1depth_name);
            document.querySelector('.popup-address-1depth').innerHTML = result[0].address.region_1depth_name;
            console.log(result[0].address.region_2depth_name);
            document.querySelector('.popup-address-2depth').innerHTML = result[0].address.region_2depth_name;
            console.log(result[0].address.region_3depth_name);
            document.querySelector('.popup-address-3depth').innerHTML = result[0].address.region_3depth_name;
            console.log(result[0].address.region_3depth_h_name);
            document.querySelector('.popup-address-3depth-h').innerHTML = result[0].address.region_3depth_h_name;

            getWeatherData(result[0].y, result[0].x);

        }

    } );

}

// 초기값으로 맵 생성
map = new kakao.maps.Map(container, options);

// 지도 중심 위치를 현재위치로 업데이트
updateCenterCoordinate();


document.querySelector('.button-search').addEventListener('click', function(){

    formSearch();

});

document.querySelector('.input-address').addEventListener('keypress', function(event){

    if(event.key === 'Enter'){

        formSearch();

    }

});

document.querySelector('.button-position').addEventListener('click', function(){

    if(watchStatus == false){

        this.setAttribute('class', 'button-position active');

        watchLocation();

        watchStatus = true;

    } else {

        stopWatch(this);

    }

});


// 날씨
function getWeatherData(weatherLatiude, weatherLongitude){

    fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + weatherLatiude + '&lon=' + weatherLongitude + '&appid=38839cb93ff3097889b4eba2996ff3d5')
    .then(function(response){
        return response.json();
    })
    .then(function(myJson){
    
        extractWeatherData(myJson);
    
    });

}

function extractWeatherData(weatherJson){
    
    console.log(weatherJson.weather[0].main);

    document.querySelector('.popup-weather-text').innerHTML = weatherJson.weather[0].main;

    console.log(weatherJson.weather[0].id);

    let groupID = Math.floor( weatherJson.weather[0].id / 100 );

    console.log(groupID);

    $('.climacon').removeClass('active');

    if( groupID == 8 ){

        switch( weatherJson.weather[0].id ){
            case 800: // climacon_sunFill
                $('.climacon_sunFill').addClass('active');
                break;

            default: // climacon_cloudFill
                $('.climacon_cloudFill').addClass('active');
                break;

        }

    } else {

        switch(groupID){
            case 2: // climacon_cloudLightningFill
                $('.climacon_cloudLightningFill').addClass('active');
                break;
            case 3: // climacon_cloudDrizzleFill
                $('.climacon_cloudDrizzleFill').addClass('active');
                break;
            case 5: // climacon_cloudRainFill
                $('.climacon_cloudRainFill').addClass('active');
                break;
            case 6: // climacon_cloudSnowAltFill
                $('.climacon_cloudSnowAltFill').addClass('active');
                break;
            case 7: // climacon_cloudFogFill
                $('.climacon_cloudFogFill').addClass('active');
                break;
        }

    }

    console.log( Math.floor( weatherJson.main.temp - 273.15 ) );

    let temp = Math.floor( weatherJson.main.temp - 273.15 );

    document.querySelector('.popup-temp-number').innerHTML = temp;

}

document.querySelector('.button-weather').addEventListener('click', function(){

    $('.popup').addClass('active');
    $('.popup-contents').addClass('active');

});

document.querySelector('.popup').addEventListener('click', function(){

    $('.popup').removeClass('active');
    $('.popup-contents').removeClass('active');

});