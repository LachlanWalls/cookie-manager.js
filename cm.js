function _getCookie(n) {
    var name = n + "="
    var ca = document.cookie.split(';')
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == ' ') { c = c.substring(1) }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null
}

function _setCookie(n, v, x = false) {
    var d = new Date()
    var expires;
    if (x) {
        d.setTime(d.getTime() + (x * 24 * 60 * 60 * 1000))
        expires = "expires=" + d.toUTCString()
    }
    document.cookie = n + "=" + v + ";" + ((x) ? (expires + ";path=/"):"path=/")
}

let _types = ["undefined", "display", "important", "essential", "none"]

let _cpref = _getCookie("_cpref") || "all"
let _cdata = JSON.parse(_getCookie("_cdata") || '{}')

let cm = {
    set_pref: function(t) {
        if (isNaN(t)) {
            _cpref = t || "all"
        } else {
            _cpref = _types[t] || "all"
        }
        _setCookie("_cpref", _cpref)
    },
    log: function(n, t = "essential", d = false, e = null) {
        _cdata[n] = {"type": t, "default": d, "default_expiry": e}
        if (_cpref != "none") {
            _setCookie("_cdata", JSON.stringify(_cdata))
        }
    },
    log_remove: function(n) {
        delete _cdata[n]
        if (_cpref != "none") {
            _setCookie("_cdata", JSON.stringify(_cdata))
        }
    },
    get: function(n) {
        if (_cdata[n]) {
            if (_types.indexOf(_cdata[n]["type"]) < _types.indexOf(_cpref)) {
                return _cdata[n]["default"] || false
            } else {
                return _getCookie(n)
            }
        }
        if (_cpref == "none") {
            return false
        }
        return _getCookie(n)
    },
    set: function(n, v, x = false, i = "essential") {
        let ex;
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
            if (!x) {
                ex = null
            }

            if (_types.indexOf(i) < _types.indexOf(_cpref)) {
                return false
            } else {
                _setCookie(n, v, ex)
            }
        }
    }
}
