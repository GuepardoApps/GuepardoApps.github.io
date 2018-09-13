---
layout: default
title: Projects - OpenWeather - Android
permalink: /projects/OpenWeather
render: dynamic
author_profile: false
date: 2018-06-05T21:42:00+00:00
---

<div style="width: 100%;text-align: center;margin:15px;text-decoration: underline;">
	<h1>OpenWeather - Android</h1>
	<img src="/assets/images/projects/open_weather_001.png" alt="OpenWeather" style="width:150px;height:150px;margin:10px;border-radius:5px;">
</div>

# Integration

First you have to register an account at [OpenWeatherMap.org](http://www.openweathermap.org/) and receive an API key.
This key is an important parameter of the OpenWeatherService!

The easiest way to integrate the library is to use the OpenWeatherService and to subscribe on weatherCurrentPublishSubject and weatherForecastPublishSubject using ReactiveX2

```java
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState);
        ...

        OpenWeatherService.instance.initialize(this)

        val geoLocation = GeoLocation()
        geoLocation.latitude = 49.4539
        geoLocation.longitude = 11.0773

        val city = City()
        city.id = 2861650
        city.name = getString(R.string.openweather_city)
        city.country = "DE"
        city.population = 499237
        city.geoLocation = geoLocation
		
        OpenWeatherService.instance.apiKey = getString(R.string.openweather_api_key)    // Set ApiKey => Will be read from xml file
        OpenWeatherService.instance.city = city                                         // Set your preferred city
        OpenWeatherService.instance.notificationEnabled = true                          // Enable/Disable notifications
        OpenWeatherService.instance.wallpaperEnabled = true                             // Enable/Disable set of wallpaper
        OpenWeatherService.instance.receiverActivity = MainActivity::class.java         // Set receiver for notifications
        OpenWeatherService.instance.reloadEnabled = true                                // Enable/Disable reload of data
        OpenWeatherService.instance.reloadTimeout = 30 * 60 * 1000                      // Set timeout of reload of data in millisecond
		
        // Subscribe on weatherCurrentPublishSubject (Using ReactiveX2)
        OpenWeatherService.instance.weatherCurrentPublishSubject
            .subscribeOn(Schedulers.io())
            .subscribe(
                {
                    response -> TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
                },
                {
                    responseError -> TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
                }
            )

        // Subscribe on weatherForecastPublishSubject (Using ReactiveX2)
        OpenWeatherService.instance.weatherForecastPublishSubject
            .subscribeOn(Schedulers.io())
            .subscribe(
                {
                    response -> TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
                },
                {
                    responseError -> TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
                }
            )

        // Subscribe on uvIndexPublishSubject (Using ReactiveX2)
        OpenWeatherService.instance.uvIndexPublishSubject
            .subscribeOn(Schedulers.io())
            .subscribe(
                {
                    response -> TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
                },
                {
                    responseError -> TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
                }
            )

        // Finally start everything (IMPORTANT)
        OpenWeatherService.instance.start()

        ...
    }

    override fun onDestroy() {
        super.onDestroy()

        OpenWeatherService.instance.dispose() // Dispose the service
    }
}
```

To display received data use the custom adapter in the library

```java
class MainActivity : AppCompatActivity() {

    ...
    // Subscribe on weatherForecastPublishSubject (Using ReactiveX2)
    OpenWeatherService.instance.weatherForecastPublishSubject
        .subscribeOn(Schedulers.io())
        .subscribe(
            {
                response -> 
                    if (response.value != null) {
                        val data = response.value as WeatherForecast
                        val list = data.list
                        if (list.isNotEmpty()) {
                            val adapter = ForecastListAdapter(this, list)
                            listView.adapter = adapter
                            mainImageView.setImageResource(forecastWeather.getMostWeatherCondition().wallpaperId)
                        } else {
                            Logger.instance.warning(tag, "list is empty")
                        }
                    } else {
                        Logger.instance.warning(tag, "weather forecast subscribe was  not successfully")
                    }
            },
            {
                responseError -> // TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
            }
        )
    ...
}
```

# Libraries

- com.baoyz.pullrefreshlayout:library:1.2.0
- com.flaviofaria:kenburnsview:1.0.7
- com.github.florent37:expansionpanel:1.1.1
- com.github.GrenderG:Toasty:1.2.5
- com.github.matecode:Snacky:1.0.2
- com.github.rey5137:material:1.2.4
- com.google.code.gson:gson:2.8.5
- com.squareup.okhttp3:okhttp:3.9.1

- io.reactivex.rxjava2:rxkotlin:2.2.0

- com.android.support.constraint:constraint-layout:1.1.3
- using also latest API28 libs

- tests based on mockito and spek

- and some more