// 지도를 표시할 div 
var container = document.getElementById('map');

// 초기값
var options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};

var map;

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

// 지도 현재위치 좌표로 중심 표시
function updateCenterCoordinate(){

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(position){

            options.center = new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
  
            // 지도를 생성합니다
            map = new kakao.maps.Map(container, options);

        });
  
      } else { 
        alert('Not Support!');
      }

}

function watchLocation() {

    if (navigator.geolocation) {

      navigator.geolocation.watchPosition(function(position){
        
        

      });

    } else { 
      alert('Not Support!');
    }

}

// let address = '서울시 금천구 가산디지털2로 115';

function formSearch(){

    let address = document.querySelector('.input-address').value;

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch( address, function(result, status){

        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {

            // 주소로 검색한 위치 좌표를 지도의 위치로 대응
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);

        }

    } );

}

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

    this.setAttribute('class', 'button-position active');

    watchLocation();

});

