---
layout: default
title: Projects - MyNoteEncrypted
permalink: /projects/MyNoteEncrypted
render: dynamic
author_profile: false
date: 2017-09-02T18:00:00+00:00
---

<div style="width: 100%;text-align: center;margin:15px;text-decoration: underline;">
	<h1>MyNoteEncrypted</h1>
	<img src="/assets/images/projects/mynoteencrypted_001.png" alt="MyNoteEncrypted" style="width:150px;height:150px;margin:10px;border-radius:5px;">
</div>

If you are interested in building your own application using SQLCipher, here is a small and short description how too use SQLCipher.
Feel free to [contact me](mailto:guepardoapps@gmail.com), if you have any issues or look into [my code](https://github.com/GuepardoApps/MyNoteEncrypted) too get inspired.

# SQL Cipher integration

add following line to your dependencies

```java
    compile 'net.zetetic:android-database-sqlcipher:3.5.1@aar'
```

replace following snippets in your database class

```java
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
```

with following snippets

```java
import net.sqlcipher.Cursor;
import net.sqlcipher.SQLException;
import net.sqlcipher.database.SQLiteDatabase;
import net.sqlcipher.database.SQLiteOpenHelper;
```

to use your database open it with following method providing a passphrase for encryption and decryption

```java

// More code above

public Database Open(@NonNull String passphrase) throws SQLException {
	_databaseHelper = new DatabaseHelper(_context);
	_database = _databaseHelper.getWritableDatabase(passphrase);
	return this;
}

// More code below

```

### Important

Above is only possible if you load the libs. the earlier in your application the better.
I use a class DatabaseController to handle  all action for the database and I call the necessary method in an initalize method

```java

// More code above

public boolean Initialize(@NonNull Context context, @NonNull String passphrase) {
	if (_initialized) {
		return false;
	}

	_context = context;
	SQLiteDatabase.loadLibs(_context);		// This is the important line!
	_database = new Database(_context);

	try {
		_database.Open(passphrase);			// Try and catch also checks if the passphrase is valid!
	} catch (SQLException sqlException) {
		return false;
	}

	_initialized = true;

	return true;
}

// More code below

```

### Caution

Currently it is not possible to change the passphrase once it is set! You have to reset the applications data, but all notes will be lost!
Also you have only FIVE tries to login. Otherwise everything will be deleted!

# Troubleshooting

I tried to test this application using the android studio emulator on Windows 10. This is due to x86 not working...
Use your android smartphone!

Further helpful links:

 - [Link1](https://discuss.zetetic.net/t/sqlcipher-integration-problem/1487)
 - [Link2](https://stackoverflow.com/questions/40674016/android-app-crashes-with-unsatisfiedlinkerror-when-using-sqlcipher-and-crashlyti)
