---
layout: default
title: Projects - VerticalSeekbarView
permalink: /projects/VerticalSeekbarView
render: dynamic
author_profile: false
date: 2017-09-02T12:30:00+00:00
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
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import guepardoapps.library.verticalseekbarview.VerticalSeekBarView;
import guepardoapps.library.verticalseekbarview.enums.VerticalSeekBarStyleEnum;
import guepardoapps.library.verticalseekbarview.interfaces.OnVerticalSeekBarMoveListener;

public class MainActivity extends AppCompatActivity {

    private static final long LOOP_INTERVAL = 250;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final TextView valueView = (TextView) findViewById(R.id.valueView);
        valueView.setText(String.valueOf(0));

        VerticalSeekBarView verticalSeekBarView = (VerticalSeekBarView) findViewById(R.id.valueControl);
        verticalSeekBarView.SetStyle(VerticalSeekBarStyleEnum.VOLUME_SLIDER_BLUE);
        verticalSeekBarView.setOnVerticalSeekBarMoveListener(new OnVerticalSeekBarMoveListener() {
            @Override
            public void onValueChanged(int power) {
                // Returns a value between 0 and 100
                valueView.setText(String.valueOf(power));
            }
        }, LOOP_INTERVAL);
    }
}
```

3 - change your style:
Following styles are given:

```java
package guepardoapps.library.verticalseekbarview.enums;

import android.graphics.Color;

public enum VerticalSeekBarStyleEnum {

    public static VerticalSeekBarStyle DEFAULT = new VerticalSeekBarStyle(0, "Default", Color.WHITE, Color.RED, true, 50);

    public static VerticalSeekBarStyle VOLUME_SLIDER = new VerticalSeekBarStyle(1, "VolumeSlider", Color.argb(50, 50, 50, 50), Color.WHITE, false, 100);

    public static VerticalSeekBarStyle VOLUME_SLIDER_RED = new VerticalSeekBarStyle(2, "VolumeSliderRed", Color.argb(255, 255, 0, 0), Color.WHITE, false, 100);
    public static VerticalSeekBarStyle VOLUME_SLIDER_GREEN = new VerticalSeekBarStyle(3, "VolumeSliderGreen", Color.argb(255, 0, 255, 0), Color.WHITE, false, 100);
    public static VerticalSeekBarStyle VOLUME_SLIDER_BLUE = new VerticalSeekBarStyle(4, "VolumeSliderBlue", Color.argb(255, 0, 0, 255), Color.WHITE, false, 100);

    public static VerticalSeekBarStyle VOLUME_SLIDER_YELLOW = new VerticalSeekBarStyle(5, "VolumeSliderYellow", Color.argb(255, 255, 255, 0), Color.WHITE, false, 100);
    public static VerticalSeekBarStyle VOLUME_SLIDER_PURPLE = new VerticalSeekBarStyle(6, "VolumeSliderPurple", Color.argb(255, 255, 0, 255), Color.WHITE, false, 100);
    public static VerticalSeekBarStyle VOLUME_SLIDER_CYAN = new VerticalSeekBarStyle(7, "VolumeSliderCyan", Color.argb(255, 255, 0, 255), Color.WHITE, false, 100);
}
```

4 - create your own style:
Styles are based on the class VerticalSeekBarStyle in package guepardoapps.library.verticalseekbarview.styles;

```java
package guepardoapps.library.verticalseekbarview.styles;

import android.support.annotation.NonNull;

import guepardoapps.library.verticalseekbarview.tools.Logger;

public class VerticalSeekBarStyle {

    private static final String TAG = VerticalSeekBarStyle.class.getSimpleName();
    private Logger _logger;

    private int _id;
    private String _name;
    private int _seekBarColor;
    private int _buttonColor;
    private boolean _resetPosition;
    private int _startPercentageY;

    public VerticalSeekBarStyle(
            int id,
            @NonNull String name,
            int seekBarColor,
            int buttonColor,
            boolean resetPosition,
            int startPercentageY) {
        _logger = new Logger(TAG);
        _logger.Debug("new VerticalSeekBarStyle...");

        _id = id;
        _name = name;
        _seekBarColor = seekBarColor;
        _buttonColor = buttonColor;
        _resetPosition = resetPosition;

        if (startPercentageY < 0) {
            _logger.Warn("Value of startPercentage is lower then 0! This is not allowed! Setting to 0!");
            startPercentageY = 0;
        } else if (startPercentageY > 100) {
            _logger.Warn("Value of startPercentage is higher then 100! This is not allowed! Setting to 100!");
            startPercentageY = 100;
        }

        _startPercentageY = startPercentageY;
    }

    public int GetId() {
        return _id;
    }

    public String GetName() {
        return _name;
    }

    public int GetSeekBarColor() {
        return _seekBarColor;
    }

    public int GetButtonColor() {
        return _buttonColor;
    }

    public boolean GetResetPosition() {
        return _resetPosition;
    }

    public int GetStartPercentageY() {
        return _startPercentageY;
    }

    @Override
    public String toString() {
        return "{" + TAG
                + ":{_id:" + String.valueOf(_id)
                + "};{_name:" + _name
                + "};{_seekBarColor:" + String.valueOf(_seekBarColor)
                + "};{_buttonColor:" + String.valueOf(_buttonColor)
                + "};{_resetPosition:" + String.valueOf(_resetPosition)
                + "};{_startPercentageY:" + String.valueOf(_startPercentageY) + "};}";
    }
}

```

You can create a own style by creating an intance of this class, like:
```java
	VerticalSeekBarStyle MY_STYLE = new VerticalSeekBarStyle(25, "MyStyle", Color.BLUE, Color.GREEN, true, 25);
```

Please not that the boolean value marks a reset of the SeekBar after releasing it.
The last parameter is an integer. It marks the startPosition of the dragger and needs to be between 0 and 100!
