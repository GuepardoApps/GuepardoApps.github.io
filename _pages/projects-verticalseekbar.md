---
layout: default
title: Projects - VerticalSeekbarView
permalink: /projects/VerticalSeekbarView
render: dynamic
author_profile: false
date: 2018-08-11T10:26:00+00:00
---

<div style="width: 100%;text-align: center;margin:15px;text-decoration: underline;">
	<h1>VerticalSeekbarView</h1>
	<img src="/assets/images/projects/vertical_seekbar_001.png" alt="VerticalSeekbarView" style="width:200px;height:100%;margin:10px;border-radius:5px;">
</div>

# Integration
An example application is given in this project!

1 - Add the view with custom params :
(here an android.support.constraint.ConstraintLayout is used as parent!)

```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="guepardoapps.verticalseekbarexample.MainActivity">

    <TextView
        android:id="@+id/valueView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <guepardoapps.library.verticalseekbarview.VerticalSeekBarView
        android:id="@+id/valueControl"
        android:layout_width="25dp"
        android:layout_height="fill_parent"
        android:layout_alignParentEnd="true"
        android:layout_margin="5dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        tools:layout_editor_absoluteX="0dp"
        tools:layout_editor_absoluteY="8dp" />

</android.support.constraint.ConstraintLayout>
```

2 - then in your activitiy:

```java
package guepardoapps.verticalseekbarexample

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.util.Log
import android.widget.TextView
import guepardoapps.library.verticalseekbarview.VerticalSeekBarView
import guepardoapps.library.verticalseekbarview.constants.Defaults
import guepardoapps.library.verticalseekbarview.extensions.doubleFormat
import io.reactivex.schedulers.Schedulers

class MainActivity : AppCompatActivity() {
    private val tag: String = MainActivity::class.java.simpleName

    private val loopInterval: Long = 250

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val valueView = findViewById<TextView>(R.id.valueView)
        val defaultText = "0.0"
        valueView.text = defaultText

        val verticalSeekBarView = findViewById<VerticalSeekBarView>(R.id.valueControl)
        verticalSeekBarView.setStyle(Defaults.styleVolumeSliderBlue)
        verticalSeekBarView.setLoopInterval(loopInterval)
        verticalSeekBarView.positionPublishSubject
                .subscribeOn(Schedulers.io())
                .subscribe(
                        { response ->
                            val text = response.y.doubleFormat(2)
                            valueView.text = text
                        },
                        { throwable ->
                            Log.e(tag, throwable.toString())
                        }
                )
    }
}
```

3 - change your style:
Following styles are given:

```java
package guepardoapps.library.verticalseekbarview.constants

import android.graphics.Color
import guepardoapps.library.verticalseekbarview.models.VerticalSeekBarStyle

class Defaults {
    companion object {
        ...

        /*
         * predefined styles
         */
        val styleDefault: VerticalSeekBarStyle = VerticalSeekBarStyle(Color.WHITE, Color.RED, true, 50.0)
        val styleVolumeSlider: VerticalSeekBarStyle = VerticalSeekBarStyle(Color.argb(50, 50, 50, 50), Color.WHITE, false, 100.0)
        val styleVolumeSliderRed: VerticalSeekBarStyle = VerticalSeekBarStyle(Color.argb(255, 255, 0, 0), Color.WHITE, false, 100.0)
        val styleVolumeSliderGreen: VerticalSeekBarStyle = VerticalSeekBarStyle(Color.argb(255, 0, 255, 0), Color.WHITE, false, 100.0)
        val styleVolumeSliderBlue: VerticalSeekBarStyle = VerticalSeekBarStyle(Color.argb(255, 0, 0, 255), Color.WHITE, false, 100.0)
        val styleVolumeSliderYellow: VerticalSeekBarStyle = VerticalSeekBarStyle(Color.argb(255, 255, 255, 0), Color.WHITE, false, 100.0)
        val styleVolumeSliderPurple: VerticalSeekBarStyle = VerticalSeekBarStyle(Color.argb(255, 255, 0, 255), Color.WHITE, false, 100.0)
        val styleVolumeSliderCyan: VerticalSeekBarStyle = VerticalSeekBarStyle(Color.argb(255, 0, 255, 255), Color.WHITE, false, 100.0)
    }
}
```

4 - create your own style:
Styles are based on the class VerticalSeekBarStyle in package guepardoapps.library.verticalseekbarview.models;

```java
package guepardoapps.library.verticalseekbarview.models

data class VerticalSeekBarStyle(
        val colorSeekBar: Int,
        val colorButton: Int,
        val resetPosition: Boolean,
        val startPercentageY: Double = 0.0)
```

You can create a own style by creating an intance of this class, like:
```java
	val myStyle = VerticalSeekBarStyle(Color.BLUE, Color.GREEN, true, 25.0);
```

Please note that the boolean value marks a reset of the SeekBar after releasing it.
The last parameter is an integer. It marks the startPosition of the dragger and needs to be between 0 and 100!
