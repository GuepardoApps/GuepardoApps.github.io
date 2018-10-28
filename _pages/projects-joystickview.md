---
layout: default
title: Projects - JoystickView
permalink: /projects/JoystickView
render: dynamic
author_profile: false
date: 2018-10-28T20:57:00+00:00
---

<div style="width: 100%;text-align: center;margin:15px;text-decoration: underline;">
	<h1>JoystickView</h1>
	<img src="/assets/images/projects/joystickview_001.png" alt="JoystickView" style="width:200px;height:100%;margin:10px;border-radius:5px;">
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
    tools:context="guepardoapps.joystickexample.MainActivity">

    <TextView
        android:id="@+id/valueView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.032" />

    <com.github.guepardoapps.joystickview.JoystickView
        android:id="@+id/valueControl"
        android:layout_width="341dp"
        android:layout_height="355dp"
        android:layout_alignParentBottom="true"
        android:layout_margin="5dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintHorizontal_bias="0.4"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/valueView"
        app:layout_constraintVertical_bias="1.0" />

</android.support.constraint.ConstraintLayout>

```

2 - then in your activitiy:

```kotlin
package guepardoapps.joystickexample


import android.graphics.Color
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.util.Log
import android.widget.TextView
import com.github.guepardoapps.joystickview.JoystickView
import com.github.guepardoapps.joystickview.models.JoystickViewStyle
import io.reactivex.disposables.Disposable
import io.reactivex.schedulers.Schedulers

class MainActivity : AppCompatActivity() {
    private val tag: String = MainActivity::class.java.simpleName

    private val loopInterval: Long = 250

    private var subscriptions: Array<Disposable> = arrayOf()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val valueView = findViewById<TextView>(R.id.valueView)
        val defaultText = "0.0 and 0.0"
        valueView.text = defaultText

        val joystickViewStyle = JoystickViewStyle(Color.LTGRAY, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.RED, true)

        val joyStickView = findViewById<JoystickView>(R.id.valueControl)
        joyStickView.setStyle(joystickViewStyle)
        joyStickView.setLoopInterval(loopInterval)
        subscriptions = subscriptions.plus(joyStickView.positionPublishSubject
                .subscribeOn(Schedulers.io())
                .subscribe(
                        { response ->
                            val text = String.format("%.2f and %.2f", response.x, response.y)
                            valueView.text = text
                        },
                        { throwable ->
                            Log.e(tag, throwable.toString())
                        }
                ))
    }

    override fun onDestroy() {
        super.onDestroy()
        subscriptions.forEach { x -> x.dispose() }
        subscriptions = arrayOf()
    }
}

```

3 - change your style:
Following styles are given:

```kotlin
package com.github.guepardoapps.joystickview.constants

import android.graphics.Color
import guepardoapps.library.joystickview.models.JoystickViewStyle

class Defaults {
    companion object {
        // ...

        /*
         * default style
         */
        val style: JoystickViewStyle = JoystickViewStyle(Color.WHITE, Color.BLACK, Color.BLACK, Color.BLACK, Color.RED, Color.BLACK, Color.RED, true)
    }
}
```

4 - create your own style:
Styles are based on the class JoystickViewStyle in package guepardoapps.library.joystickview.models;

```kotlin
package com.github.guepardoapps.joystickview.models

data class JoystickViewStyle(
        val colorMainCircle: Int,
        val colorCircleInner1: Int,
        val colorCircleInner2: Int,
        val colorCircleInner3: Int,
        val colorLineVertical: Int,
        val colorLineHorizontal: Int,
        val colorButton: Int,
        val resetPosition: Boolean)
```

You can create a own style by creating an instance of this class, like:
```kotlin
	val myStyle = JoystickViewStyle(Color.LIGHT_BLUE, Color.DARK_BLUE, Color.CYAN, Color.WHITE, Color.RED, Color.WHITE, Color.RED, false)
```

Please note the boolean value marks a reset of the JoystickView after releasing it.
