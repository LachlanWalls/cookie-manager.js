// n (String, cookie name)
// returns null if not found
function _getCookie(n) {
    var name = n + "="
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == ' ') { c = c.substring(1) }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null
}

// n (String, cookie name), v (String, cookie value), x (Optional Number, days until expiry)
function _setCookie(n, v, x = false) {
    var d = new Date()
    var expires;
    if (x) {
        d.setTime(d.getTime() + (x * 24 * 60 * 60 * 1000))
        expires = "expires=" + d.toUTCString()
    }
    document.cookie = n + "=" + v + ";" + ((x) ? (expires + ";path=/") : "path=/")
}

// cookie preference types
let _types = ["undefined", "display", "important", "essential", "none"]

// _cpref stores the cookie preferences
let _cpref = _getCookie("_cpref") || "all"
    // _cdata stores the cookies (in JSON)
let _cdata = JSON.parse(_getCookie("_cdata") || '{}')

let cm = {

    // t (String, permission type OR Number, permission index)
    // sets the cookie permission level
    set_pref: t => {
        _cpref = (isNaN(t)) ? (t || "all") : (_types[t] || "all")
        _setCookie("_cpref", _cpref)
    },

    // n (String, cookie name), t (Optional String, cookie importance), d (Optional String, default value), e (Optional Number, default expiry in days)
    // logs a cookie default permissions and values
    log: (n, t = "essential", d = false, e = null) => {
        _cdata[n] = { "type": t, "default": d, "default_expiry": e }
        if (_cpref != "none") _setCookie("_cdata", JSON.stringify(_cdata))
    },

    // n (String, cookie name)
    // removes a cookie log
    log_remove: n => {
        delete _cdata[n]
        if (_cpref != "none") _setCookie("_cdata", JSON.stringify(_cdata))
    },

    // n (String, cookie name)
    // gets a cookie value, otherwise returns false (if permissions do not match)
    get: n => {
        if (_cdata[n]) {
            if (_types.indexOf(_cdata[n]["type"]) < _types.indexOf(_cpref)) {
                return _cdata[n]["default"] || false
            } else {
                return _getCookie(n)
            }
        }
        return (_cpref == "none") ? false : _getCookie(n)
    },

    // old set method
    /*set: (n, v, x = false, i = "essential") => {
        let ex = x
        if (_cdata[n]) {
            if (!x && _cdata[n]["default_expiry"]) {
                ex = _cdata[n]["default_expiry"]
            } else if (!x) {
                ex = null
            }

            if (_types.indexOf(_cdata[n]["type"]) < _types.indexOf(_cpref)) {
                return false
            } else {
                _setCookie(n, v, ex)
            }
        } else {
            if (!x) ex = null

            if (_types.indexOf(i) < _types.indexOf(_cpref)) {
                return false
            } else {
                _setCookie(n, v, ex)
            }
        }
    },*/

    // n (String, cookie name), v (String, cookie value), x (Optional Number, expiry in days), i (Optional String, cookie permission)
    // sets a cookie
    set: (n, v, x = false, i = "essential") => {
        let expiry = x
        if (!x && _cdata[n]["default_expiry"]) expiry = _cdata[n]["default_expiry"]

        let perm = i
        if (!i && _cdata[n]["type"]) perm = _cdata[n]["type"]

        let value = v
        if (!value && _cdata[n]["default"]) value = _cdata[n]["default"]

        if (_types.indexOf(perm) < _types.indexOf(_cpref)) return false

        _setCookie(n, value, expiry)

        return true
    }
}