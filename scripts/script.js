/**
 * Created by Dominik on 2016-04-12.
 */

$(document).ready(function() {
        var inputField = $('input[type="text"]'),
            list = $('ul');

        setWeather();

    //WEATHER PANEL

    function setWeather () {  navigator.geolocation.getCurrentPosition(function(pos) {
        //GET USER COORDS
        var latitude = pos.coords.latitude.toFixed(),
        longitude = pos.coords.longitude.toFixed();

        //LAUNCH API
        getWeather(longitude, latitude);

    });
    }

    //WEATHER API FUNCTION
    function getWeather(lon, lat) {

        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&APPID=c716e582e48104878ab7fd52b82ca01f',

            dataType: 'json',

            error: function() {
                $('#info').text('An error has occurred');
            },

            success: function(data) {

                $('#location').text('Your location: ' + data.name + ' ' + data.sys.country );
                $('#weather').text('Conditions: ' + data.weather[0].description  );
                $('#weather-icon').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png' );
                $('#temp').text('Temperature: ' + data.main.temp + ' Celcius');
                $('#pressure').text('Pressure: ' + data.main.pressure + ' hPa');
                $('#humidity').text('Humidity: ' + data.main.humidity + ' %');
                $('#cloudiness').text('Cloudiness: ' + data.clouds.all + ' %');
                $('#wind').text('Wind: ' + data.wind.speed + ' meter/sec');

            },

            type: 'GET'
        });
    }

    //TASKS PANEL
    //MARK CLICKED LI
    $(list).on('click', 'li', function () {
        $(this).toggleClass('clicked');
    });

    //REMOVE BUTTON
    $(list).on('click', 'span', function (event) {
        $(this).parent().fadeOut(function () {
            $(this).remove();
        });
        event.stopPropagation();
    });

    //ADDING TASKS
    $(inputField).keypress(function (event) {
        if (event.which === 13) {
            var newTask = $(this).val();
            $(this).val('');
            $('ul').append('<li><span>X</span> ' + newTask + '</li>');
        }

    });

    //PLUS BUTTON ACTION
    $('#add').on('click', function() {
        $(inputField).fadeToggle();
    });

});