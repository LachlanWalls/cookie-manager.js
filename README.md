# cookie-manager.js

Automatically taking care of your precious cookies, in full compliance (with built-in cookie preferences) of the 'cookie monster' GDPR.

*Cookie manager is shortened to 'CM'*

### Features

- Get and set cookies.
- Log cookies with levels of importance and default values.
- Allow the user to choose which levels of cookies they allow.
- Built-in cookie compliance messages and selection menus.

## Usage

To use CM, simply include the script in your html.

```html
<script src="https://cdn.jsdelivr.net/gh/LachlanWalls/cookie-manager.js/cm.js"></script>
```

And CM will manage the rest.

### Getting cookies
```js
let mycookie = cm.get("mycookie")
// cm.get(name)
```

This will return null if the cookie doesn't exist, or false in other circumstances (see logging and permissions).

### Setting cookies

Setting a cookie that never expires:
```js
cm.set("mycookie", "Hello, world!")
// cm.set(name, value)
```

Setting a cookie to expire in 1 day:
```js
cm.set("mycookie", "Hello, world!", 1)
// cm.set(name, value, expiry)
```

### Permissions

#### Levels

CM allows the user of a website to set a preference as to which layers of cookies they allow. There are 3 levels of importance for cookies.

- Display: cookies that improve the user experience but are not required for website functionality.
- Important: cookies that are important for website functionality, but the website is still usable without them.
- Essential: cookies that are essential for website functionality, and the website will not work without them.

There are 5 options for the user:

- 'undefined': default, allows all cookies, same as display.
- 'display': allows all cookies.
- 'important': allows only important or essential cookies.
- 'essential': allows only essential cookies.
- 'none': allows no cookies.

#### Usage

##### Cookie permissions

To add a certain permission level to a cookie, simply use the following function.

```js
cm.set("greeting", "Hello, world!", false, "display")
// cm.set(name, value, expiry, permission)
```

The above code sets a greeting cookie that **never expires** (note the false for expiry) and is marked as a display level importance.

**In a situation where the cookie permission is denied:**

Getting the cookie will return false, or the default value (see logging).
Setting the cookie will simply return false.

##### User permission preferences

If you wish to create your own user permissions interface, the following code can be used to manually set the preferences.

```js
cm.set_pref("essential")
// cm.set_pref(perm_name)
```

### Logging

With CM, you can log certain cookies (by their names) so that the manager remembers default values, permissions and expiry times for that cookie.

- Default values: if the permission for a cookie is denied, this default value will be returned instead of just false.
- Default permissions & expiry: these just simply mean that if you set the cookie with specifying permissions or expiry, it will use these values instead.

#### Usage

```js
cm.log("username", "display", "Anonymous", false)
// cm.log(cookie_name, default_permission, default_value, default_expiry)

cm.set("username", prompt("What's your name?"))
// the above will automatically have display permissions and no expiry, due to the log, and this will happen every time a cookie is set with this name.

alert("Hello, " + cm.get("username"))
// this will return the name, or Anonymous if the user has blocked display cookies.
```

Removing a log:
```js
cm.log_remove("username")
// cm.log_remove(cookie_name)
```

## Stuff to avoid

These are the names of functions and variables you should avoid that CM uses:

- \_setCookie
- \_getCookie
- \_types
- \_cpref
- \_cdata
