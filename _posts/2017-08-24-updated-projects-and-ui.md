---
title: "Updated projects and UI"
header:
categories:
  - Post
  - LucaHome
  - Open Weather
  - Material Design
tags:
  - LucaHome
  - Open Weather
  - Material Design
date:   2017-08-24 22:41:00 +0200
---

### UI Update
Updated UI to material design using cards. All based on [Materialize](http://materializecss.com/).
Projects are now displayed as cards with images and basic informations and even some links.
Every project will get its own page in the future.

### LucaHome projects
Added all projects existing in LucaHome.
<li>Raspberry Pi Server, C/C++</li>
<li>Website hosted on the raspberry pi, PHP/HTML</li>
<li>Android Client, Android/Java</li>
<li>Windows Client, WPF/C#</li>
<li>MediaMirror, Android/Java</li>
<li>Access Control Application, Android/Java</li>
<li>Temperature Logger running on the raspberry, Python</li>

### Library Open Weather
Added a card for the library Open Weather.
<li>used for downloading and handling data from openweather</li>
<li>all you need is a own API key from <a target="_blank" href="http://www.openweathermap.org/">Open Weather Map</a>, you have to register an account therefore</li>
<li>then enter your key in following class</li>
{% highlight java %}
package guepardoapps.library.openweather.common;

public class OWKeys {
public static final String OPEN_WEATHER_KEY = "ENTER_YOUR_KEY_HERE";
}
{% endhighlight %}
<li>further informations can be found on the <a target="_blank" href="https://github.com/GuepardoApps/library_OpenWeather">Repository Page</a></li>
