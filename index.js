$.ajax({
    type:"GET",
    url:"http://api.openweathermap.org/data/2.5/weather?q=Moscow,ru&APPID=e9d5091db0a0df91f5931bb9abb550a2",
    success:
            function (data) {
            weatherObject(data);
                  
    }
})

function weatherObject(obj) {
    console.log(obj)
}