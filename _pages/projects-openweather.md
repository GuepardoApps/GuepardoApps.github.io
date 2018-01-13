---
layout: default
title: Projects - OpenWeather
permalink: /projects/OpenWeather
render: dynamic
author_profile: false
date: 2017-08-26T09:46:00+00:00
---

<div style="width: 100%;text-align: center;margin:15px;text-decoration: underline;">
	<h1>OpenWeather</h1>
	<img src="/assets/images/projects/open_weather_001.png" alt="OpenWeather" style="width:150px;height:150px;margin:10px;border-radius:5px;">
</div>

# Integration

First you have to register an account at [OpenWeatherMap.org](http://www.openweathermap.org/) and get an API key.

Then enter your key in following class:

```java
package guepardoapps.library.openweather.common;

public class OWKeys {
	public static final String OPEN_WEATHER_KEY = "ENTER_YOUR_KEY_HERE";
}
```

The easiest way to integrate the library is to have one OpenWeatherService and to register some BroadcastReceiver in your Activity in onResume.
After registering your Receiver, you call for the data.

```java
public class MainActivity extends Activity {

	...
	private OpenWeatherService _openWeatherService;
	private ReceiverController _receiverController;

	private BroadcastReceiver _currentWeatherReceiver = new BroadcastReceiver() {
		@Override
		public void onReceive(Context context, Intent intent) {
			OpenWeatherService.CurrentWeatherDownloadFinishedContent content = (OpenWeatherService.CurrentWeatherDownloadFinishedContent) intent.getSerializableExtra(OpenWeatherService.CurrentWeatherDownloadFinishedBundle);

			WeatherModel currentWeather = content.CurrentWeather;

			// Do whatever you want with the data
			...
		}
	};

	private BroadcastReceiver _forecastWeatherReceiver = new BroadcastReceiver() {
		@Override
		public void onReceive(Context context, Intent intent) {
			OpenWeatherService.ForecastWeatherDownloadFinishedContent content = (OpenWeatherService.ForecastWeatherDownloadFinishedContent) intent.getSerializableExtra(OpenWeatherService.ForecastWeatherDownloadFinishedBundle);

			ForecastModel forecastWeather = content.ForecastModel;

			// Do whatever you want with the data
			...
		}
	};

	...

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		...

		// Get the instance of the singleton service
		_openWeatherService = new OpenWeatherService.getInstance();

		// initialize the service with the current context and a city
		_openWeatherService.Initialize(this, "Nuremberg, DE");
		// or initialize the service with the current context, a city and the enable/disable for notifications, changing the launcher wallpaper and enable for automatic data reload and timeout (in ms)
		_openWeatherService.Initialize(this, "Nuremberg, DE", true, true, true, true, 5 * 60 * 1000);
		// or initialize the service with the current context, a city, the enable/disable for notifications and activities which will be started after clicking on the notifications
		_openWeatherService.Initialize(this, "Nuremberg, DE", true, true, YourCurrentWeatherActiviy.class, MyForecastActiviy.class, true, true, 5 * 60 * 1000);

		_receiverController = new ReceiverController(this);

		...
	}

	@Override
	public void onResume() {
		super.onResume();

		// register the receiver to get the data from the service
		_receiverController.RegisterReceiver(_currentWeatherReceiver, new String[]{OpenWeatherService.CurrentWeatherDownloadFinishedBroadcast});
		_receiverController.RegisterReceiver(_forecastWeatherReceiver, new String[]{OpenWeatherService.ForecastWeatherDownloadFinishedBroadcast});

		// To load the current weather in your city
		_openWeatherService.LoadCurrentWeather();

		// To load forecast weather for your city
		_openWeatherService.LoadForecastWeather();
	}

	...

	public void SomeMethod() {
		// you can also get the data from the service if it already downloaded it
		WeatherModel currentWeather = _openWeatherService.CurrentWeather()
		ForecastModel forecastWeather = _openWeatherService.ForecastWeather()

		// you can change the city on the fly and the service starts with the download for the city as it was set
		_openWeatherService.SetCity("Another city")

		// you can disable/enable notifications
		// notifications will be displayed if they are enabled and a download was finished
		_openWeatherService.SetDisplayNotification(false);
		_openWeatherService.SetDisplayNotification(true);

		// you can set a activity which will be started after clicking on a notifications
		_openWeatherService.SetCurrentWeatherReceiverActivity(YourCurrentWeatherActiviy.class);
		_openWeatherService.SetForecastWeatherReceiverActivity(MyForecastActiviy.class);
	}
}
```

To display received data use the customadapter in the library

```java
public class MainActivity extends Activity {

	...

	private BroadcastReceiver _forecastWeatherReceiver = new BroadcastReceiver() {
		@Override
		public void onReceive(Context context, Intent intent) {
			OpenWeatherService.ForecastWeatherDownloadFinishedContent content = (OpenWeatherService.ForecastWeatherDownloadFinishedContent) intent.getSerializableExtra(OpenWeatherService.ForecastWeatherDownloadFinishedBundle);
			ForecastModel forecastWeather = content.ForecastModel;

			if (forecastWeather != null) {
				...
				List<ForecastWeatherModel> list = forecastWeather.GetList();
				listView.setAdapter(new ForecastListAdapter(this, list));
				...
			}
		}
	};

	...
}
```
