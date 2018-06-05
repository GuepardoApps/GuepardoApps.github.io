---
layout: default
title: Projects - OpenWeather
permalink: /projects/OpenWeather
render: dynamic
author_profile: false
date: 2018-06-05T21:42:00+00:00
---

<div style="width: 100%;text-align: center;margin:15px;text-decoration: underline;">
	<h1>OpenWeather</h1>
	<img src="/assets/images/projects/open_weather_001.png" alt="OpenWeather" style="width:150px;height:150px;margin:10px;border-radius:5px;">
</div>

# Integration

First you have to register an account at [OpenWeatherMap.org](http://www.openweathermap.org/) and receive an API key.
This key is an important parameter of the OpenWeatherService!

The easiest way to integrate the library is to use the OpenWeatherService and to register the OnWeatherUpdateListener
After registering your Receiver, you call for the data.

```java
public class MainActivity extends Activity {

    ...
    private lateinit var openWeatherService: OpenWeatherService
    ...

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ...

        openWeatherService = OpenWeatherService(this)
		
        // Set ApiKey
        openWeatherService.setApiKey("") // TODO Add ApiKey
		
        // Set your preferred city
        openWeatherService.setCity("Nuremberg")
		
        // Enable/Disable notifications
        openWeatherService.setNotificationEnabled(true)
		
        // Enable/Disable reload of data
        openWeatherService.setReloadEnabled(true
		
        // Set timeout of reload of data
        openWeatherService.setReloadTimeout(30 * 60 * 1000)
		
        // Enable/Disable set of wallpaper
        openWeatherService.setWallpaperEnabled(true)
		
        // Set receiver for notifications
        openWeatherService.setReceiverActivity(MainActivity::class.java)
		
        // Set OnWeatherUpdateListener
        openWeatherService.setOnWeatherUpdateListener(object : OnWeatherUpdateListener {
            override fun onCurrentWeather(currentWeather: IWeatherCurrent?, success: Boolean) {
                TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
            }

            override fun onForecastWeather(forecastWeather: IWeatherForecast?, success: Boolean) {
                TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
            }
        })

        // Load the current weather
        openWeatherService.loadCurrentWeather()
		
        // Load the forecast weather
        openWeatherService.loadForecastWeather()
		
        ...
    }
}
```

To display received data use the customadapter in the library

```java
public class MainActivity extends Activity {
    ...
    openWeatherService.setOnWeatherUpdateListener(object : OnWeatherUpdateListener {
	    ...
        override fun onForecastWeather(forecastWeather: IWeatherForecast?, success: Boolean) {
            if (success) {
                this.forecastWeather = forecastWeather!!
                val forecastList = forecastWeather.getList()
                if (forecastList.isNotEmpty()) {
                    val adapter = ForecastListAdapter(this, forecastList)
                    listView.adapter = adapter
                    mainImageView.setImageResource(forecastWeather.getMostWeatherCondition().wallpaperId)
                } else {
                    Logger.instance.warning(tag, "forecastList is empty")
                }
            } else {
                Logger.instance.warning(tag, "onForecastWeather download was  not successfully")
                Toasty.warning(context, "onForecastWeather download was  not successfully", Toast.LENGTH_LONG).show()
            }
        }
    })
    ...
}
```
