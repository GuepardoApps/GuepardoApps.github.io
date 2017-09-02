---
layout: default
title: Projects - JoystickView
permalink: /projects/JoystickView
render: dynamic
author_profile: false
date: 2017-09-02T12:30:00+00:00
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

    <guepardoapps.library.joystickview.JoystickView
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

```java
package guepardoapps.joystickexample;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import guepardoapps.library.joystickview.JoystickView;
import guepardoapps.library.joystickview.enums.JoystickStyleEnum;
import guepardoapps.library.joystickview.interfaces.OnJoystickMoveListener;

public class MainActivity extends AppCompatActivity {

    private static final long LOOP_INTERVAL = 250;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final TextView valueView = (TextView) findViewById(R.id.valueView);
        valueView.setText(String.valueOf(0));

        JoystickView joyStickView = (JoystickView) findViewById(R.id.valueControl);
        joyStickView.SetStyle(JoystickStyleEnum.DEFAULT);
        joyStickView.setOnJoystickMoveListener(new OnJoystickMoveListener() {
            @Override
            public void onValueChanged(int powerX, int powerY) {
                // Returns a value between -100 and 100
                valueView.setText(String.valueOf(powerX) + " and " + String.valueOf(powerY));
            }
        }, LOOP_INTERVAL);
    }
}

```

3 - change your style:
Following styles are given:

```java
package guepardoapps.library.joystickview.enums;

import android.graphics.Color;

import guepardoapps.library.joystickview.constants.Enables;
import guepardoapps.library.joystickview.styles.JoystickViewStyle;
import guepardoapps.library.joystickview.tools.Logger;

public enum JoystickStyleEnum {

    public static JoystickViewStyle DEFAULT = new JoystickViewStyle(0, "Default", Color.WHITE, Color.BLACK, Color.BLACK, Color.BLACK, Color.RED, Color.BLACK, Color.RED, true);
}
```

4 - create your own style:
Styles are based on the class JoystickViewStyle in package guepardoapps.library.joystickview.styles;

```java
package guepardoapps.library.joystickview.styles;

import android.support.annotation.NonNull;

import guepardoapps.library.joystickview.tools.Logger;

public class JoystickViewStyle {
    private static final String TAG = JoystickViewStyle.class.getSimpleName();
    private Logger _logger;

    private int _id;
    private String _name;
    private int _colorMainCircle;
    private int _colorCircleInnerOne;
    private int _colorCircleInnerTwo;
    private int _colorCircleInnerThree;
    private int _colorVerticalLine;
    private int _colorHorizontalLine;
    private int _colorButton;
    private boolean _resetPosition;

    public JoystickViewStyle(
            int id,
            @NonNull String name,
            int colorMainCircle,
            int colorCircleInnerOne,
            int colorCircleInnerTwo,
            int colorCircleInnerThree,
            int colorVerticalLine,
            int colorHorizontalLine,
            int colorButton,
            boolean resetPosition) {
        _logger = new Logger(TAG);
        _logger.Debug("new JoystickViewStyle...");

        _id = id;

        _name = name;

        _colorMainCircle = colorMainCircle;
        _colorCircleInnerOne = colorCircleInnerOne;
        _colorCircleInnerTwo = colorCircleInnerTwo;
        _colorCircleInnerThree = colorCircleInnerThree;
        _colorVerticalLine = colorVerticalLine;
        _colorHorizontalLine = colorHorizontalLine;
        _colorButton = colorButton;
        _resetPosition = resetPosition;
    }

    public int GetId() {
        return _id;
    }

    public String GetName() {
        return _name;
    }

    public int GetColorMainCircle() {
        return _colorMainCircle;
    }

    public int GetColorCircleInnerOne() {
        return _colorCircleInnerOne;
    }

    public int GetColorCircleInnerTwo() {
        return _colorCircleInnerTwo;
    }

    public int GetColorCircleInnerThree() {
        return _colorCircleInnerThree;
    }

    public int GetColorVertialLine() {
        return _colorVerticalLine;
    }

    public int GetColorHorizontalLine() {
        return _colorHorizontalLine;
    }

    public int GetColorButton() {
        return _colorButton;
    }

    public boolean GetResetPosition() {
        return _resetPosition;
    }
}


```

You can create a own style by creating an intance of this class, like:
```java
	JoystickViewStyle MY_STYLE = new JoystickViewStyle(25, "My Style", Color.LIGHT_BLUE, Color.DARK_BLUE, Color.CYAN, Color.WHITE, Color.RED, Color.WHITE, Color.RED, false);
```

Please not that the boolean value marks a reset of the JoystickView after releasing it.
