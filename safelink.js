var Base64 = {<br />
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",<br />
    encode: function (input) {<br />
        var output = "";<br />
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;<br />
        var i = 0;<br />
        input = Base64._utf8_encode(input);<br />
        while (i < input.length) {<br />
            chr1 = input.charCodeAt(i++);<br />
            chr2 = input.charCodeAt(i++);<br />
            chr3 = input.charCodeAt(i++);<br />
            enc1 = chr1 >> 2;<br />
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);<br />
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);<br />
            enc4 = chr3 & 63;<br />
            if (isNaN(chr2)) {<br />
                enc3 = enc4 = 64;<br />
            } else if (isNaN(chr3)) {<br />
                enc4 = 64;<br />
            }<br />
            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);<br />
        }<br />
        return output;<br />
    },<br />
    decode: function (input) {<br />
        var output = "";<br />
        var chr1, chr2, chr3;<br />
        var enc1, enc2, enc3, enc4;<br />
        var i = 0;<br />
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");<br />
        while (i < input.length) {<br />
            enc1 = this._keyStr.indexOf(input.charAt(i++));<br />
            enc2 = this._keyStr.indexOf(input.charAt(i++));<br />
            enc3 = this._keyStr.indexOf(input.charAt(i++));<br />
            enc4 = this._keyStr.indexOf(input.charAt(i++));<br />
            chr1 = (enc1 << 2) | (enc2 >> 4);<br />
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);<br />
            chr3 = ((enc3 & 3) << 6) | enc4;<br />
            output = output + String.fromCharCode(chr1);<br />
            if (enc3 != 64) {<br />
                output = output + String.fromCharCode(chr2);<br />
            }<br />
            if (enc4 != 64) {<br />
                output = output + String.fromCharCode(chr3);<br />
            }<br />
        }<br />
        output = Base64._utf8_decode(output);<br />
        return output;<br />
    },<br />
    _utf8_encode: function (string) {<br />
        string = string.replace(/\r\n/g, "\n");<br />
        var utftext = "";<br />
        for (var n = 0; n < string.length; n++) {<br />
            var c = string.charCodeAt(n);<br />
            if (c < 128) {<br />
                utftext += String.fromCharCode(c);<br />
            } else if ((c > 127) && (c < 2048)) {<br />
                utftext += String.fromCharCode((c >> 6) | 192);<br />
                utftext += String.fromCharCode((c & 63) | 128);<br />
            } else {<br />
                utftext += String.fromCharCode((c >> 12) | 224);<br />
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);<br />
                utftext += String.fromCharCode((c & 63) | 128);<br />
            }<br />
        }<br />
        return utftext;<br />
    },<br />
    _utf8_decode: function (utftext) {<br />
        var string = "";<br />
        var i = 0;<br />
        var c = c1 = c2 = 0;<br />
        while (i < utftext.length) {<br />
            c = utftext.charCodeAt(i);<br />
            if (c < 128) {<br />
                string += String.fromCharCode(c);<br />
                i++;<br />
            } else if ((c > 191) && (c < 224)) {<br />
                c2 = utftext.charCodeAt(i + 1);<br />
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));<br />
                i += 2;<br />
            } else {<br />
                c2 = utftext.charCodeAt(i + 1);<br />
                c3 = utftext.charCodeAt(i + 2);<br />
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));<br />
                i += 3;<br />
            }<br />
        }<br />
        return string;<br />
    }<br />
}<br />
var encode = document.getElementById('encode'),<br />
    decode = document.getElementById('decode'),<br />
    output = document.getElementById('output'),<br />
    input = document.getElementById('input');<br />
var User_ID = "";<br />
var protected_links = "";<br />
var a_to_va = 0;<br />
var a_to_vb = 0;<br />
var a_to_vc = "";<br />
<br />
function auto_safelink() {<br />
    auto_safeconvert();<br />
}<br />
<br />
function auto_safeconvert() {<br />
    var a_to_vd = window.location.hostname;<br />
    if (protected_links != "" && !protected_links.match(a_to_vd)) {<br />
        protected_links += ", " + a_to_vd;<br />
    } else if (protected_links == "") {<br />
        protected_links = a_to_vd;<br />
    }<br />
    var a_to_ve = "";<br />
    var a_to_vf = new Array();<br />
    var a_to_vg = 0;<br />
    a_to_ve = document.getElementsByTagName("a");<br />
    a_to_va = a_to_ve.length;<br />
    a_to_vf = a_to_fa();<br />
    a_to_vg = a_to_vf.length;<br />
    var a_to_vh = false;<br />
    var j = 0;<br />
    var a_to_vi = "";<br />
    for (var i = 0; i < a_to_va; i++) {<br />
        a_to_vh = false;<br />
        j = 0;<br />
        while (a_to_vh == false && j < a_to_vg) {<br />
            a_to_vi = a_to_ve[i].href;<br />
            if (a_to_vi.match(a_to_vf[j]) || !a_to_vi || !a_to_vi.match("https")) {<br />
                a_to_vh = true;<br />
            }<br />
            j++;<br />
        }<br />
        if (a_to_vh == false) {<br />
            var encryptedUrl = Base64.encode(a_to_vi);<br />
            a_to_ve[i].href = "https://www.jtc-team.net/p/download.html?url=" + encryptedUrl;<br />
            a_to_ve[i].rel = "nofollow";<br />
            a_to_vb++;<br />
            a_to_vc += i + ":::" + a_to_ve[i].href + "\n";<br />
        }<br />
    }<br />
    var a_to_vj = document.getElementById("anonyminized");<br />
    var a_to_vk = document.getElementById("found_links");<br />
    if (a_to_vj) {<br />
        a_to_vj.innerHTML += a_to_vb;<br />
    }<br />
    if (a_to_vk) {<br />
        a_to_vk.innerHTML += a_to_va;<br />
    }<br />
}<br />
<br />
function a_to_fa() {<br />
    var a_to_vf = new Array();<br />
    protected_links = protected_links.replace(" ", "");<br />
    a_to_vf = protected_links.split(",");<br />
    return a_to_vf;<br />
}
