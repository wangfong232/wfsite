function znReady(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}
window.znStorage = {
    _storage: new WeakMap,
    put: function(e, t, n) {
        this._storage.has(e) || this._storage.set(e, new Map), this._storage.get(e).set(t, n)
    },
    get: function(e, t) {
        return this._storage.get(e).get(t)
    },
    has: function(e, t) {
        return this._storage.has(e) && this._storage.get(e).has(t)
    },
    remove: function(e, t) {
        var n = this._storage.get(e).delete(t);
        return 0 === !this._storage.get(e).size && this._storage.delete(e), n
    }
};
Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function(e) {
    var t = this;
    do {
        if (Element.prototype.matches.call(t, e)) return t;
        t = t.parentElement || t.parentNode
    } while (null !== t && 1 === t.nodeType);
    return null
});
window.znRespondToVisibility = function(e, t) {
    var n = {
            root: null,
            threshold: .01
        },
        i = new IntersectionObserver((function(e, n) {
            var i = e.map((function(e) {
                    return e.isIntersecting
                })),
                a = i.includes(!0);
            t(a)
        }), n);
    i.observe(e)
};
znReady(function() {
    (function() {
        var e = document.getElementById("znid-743106213654"),
            t = e.querySelector(":scope .zn-instagram-container"),
            n = null != document.querySelector(".zn-container.editing"),
            i = "Access Token: IGQVJWcWh0MGMyay1HWUlndU1IQXBnejNnRXJwMHIwSG1fWnhjb2xUWWZAKdzc5eWViTzBRN0RIellTclN2QkljTHRRd1JHeFB6WDZACT2NRU1lsd2tjdzk4cXNXLUpZAR2t0NTRrZAy13",
            a = "6",
            o = "true";
        if (i) {
            i = i.replace("Access Token:", "").trim();
            var r = "znInstagramUserId-" + i;
            window[r] ? s(window[r]) : fetch("https://graph.instagram.com/me?fields=id,username&access_token=".concat(i)).then((function(e) {
                return e.json()
            })).then((function(e) {
                var t = e.id;
                if (!t) throw new Error("Access token expired or incorrect.");
                window[r] = t, s(t)
            })).catch((function(e) {
                t.innerHTML = '<div class="zn-not-connected">Access token expired or incorrect.</div>'
            }))
        } else t.innerHTML = '<div class="zn-not-connected">Not connected to Instagram yet.</div>';
        function s(e) {
            var n = "znInstagramImages-" + e,
                o = window[n];
            o && o.data && o.data.length >= a ? l(o.data) : o && o.data && o.data.length < a && o.paging.next ? fetch(o.paging.next).then((function(e) {
                return e.json()
            })).then((function(e) {
                window[n].data = window[n].data.concat(e.data), window[n].paging = e.paging, l(window[n].data)
            })).catch((function(e) {
                return console.log("Warn 12: ", e)
            })) : fetch("https://graph.instagram.com/".concat(e, "/media?limit=50&fields=id,caption,media_url,permalink,media_type&access_token=").concat(i)).then((function(e) {
                return e.json()
            })).then((function(e) {
                window[n] = e, l(e.data)
            })).catch((function(e) {
                t.innerHTML = '<div class="zn-not-connected">Access token expired or incorrect.</div>'
            }))
        }
        function l(e) {
            a = a > e.length ? e.length : a;
            for (var i = 0; i < a; i++) {
                var r = c(e[i]);
                if (r) {
                    var s = document.createElement("div");
                    s.className = "zn-instagram-item";
                    var l = document.createElement("a");
                    l.id = "zn-instagram-" + e[i].id, l.target = "_blank", n || "true" != o || (l.href = e[i].permalink);
                    var p = document.createElement("div");
                    p.className = "zn-instagram-overlay", p.innerHTML = "<span>" + (e[i].caption || "") + "</span>", l.appendChild(r), l.appendChild(p), s.appendChild(l), t.appendChild(s)
                }
            }
        }
        function c(e) {
            if ("IMAGE" == e.media_type || "CAROUSEL_ALBUM" == e.media_type) {
                var t = document.createElement("img");
                return t.draggable = !1, t.classList.add("zn-nodrag"), t.src = e.media_url, t.title = e.caption || "", t
            }
            return null
        }
    })();
    (function() {
        var e = document.getElementById("znid-926602204267"),
            t = null != document.querySelector(".zn-container.editing");
        function n(e, t, n) {
            this.addEventListener("click", (function() {
                i(e + encodeURIComponent(t), n)
            }))
        }
        function i(e, t) {
            var n = (screen.width - 640) / 2,
                i = (screen.height - 640) / 2,
                a = "menubar=no,toolbar=no,status=no,width=640,height=640,top=" + i + ",left=" + n;
            "_blank" == t ? window.open(e) : "_self" == t ? window.location = e : window.open(e, t, a)
        }
        t || e.querySelectorAll(".zn-social-share-item").forEach((function(e) {
            var t, i = "Share",
                a = "current",
                o = "custom" == a,
                r = "",
                s = "Check out my awesome shop!",
                l = o && r ? r : document.URL,
                c = !0,
                p = e.getAttribute("ref-name");
            switch (p) {
                case "facebook":
                    t = "https://www.facebook.com/sharer.php?quote=" + s + "&u=";
                    break;
                case "twitter":
                    t = "https://twitter.com/intent/tweet?text=" + s + "&url=";
                    break;
                case "pinterest":
                    t = "http://pinterest.com/pin/create/button/?description=" + s + "&url=";
                    break;
                case "linkedin":
                    t = "https://www.linkedin.com/shareArticle?mini=true&url=";
                    break;
                case "email":
                    var d = "mailto:?body=" + s + " " + l;
                    e.setAttribute("href", d), c = !1;
                    break
            }
            c && e && n.call(e, t, l, i)
        }))
    })();
    (function() {
        (function() {
            var e = document.getElementById("znid-967995612387"),
                t = null != document.querySelector(".zn-container.editing");
            function n(e, t, n) {
                this.addEventListener("click", (function() {
                    i(e + encodeURIComponent(t), n)
                }))
            }
            function i(e, t) {
                var n = (screen.width - 640) / 2,
                    i = (screen.height - 640) / 2,
                    a = "menubar=no,toolbar=no,status=no,width=640,height=640,top=" + i + ",left=" + n;
                "_blank" == t ? window.open(e) : "_self" == t ? window.location = e : window.open(e, t, a)
            }
            t || e.querySelectorAll(".zn-social-share-item").forEach((function(e) {
                var t, i = "Share",
                    a = "current",
                    o = "custom" == a,
                    r = "",
                    s = "Check out my awesome shop!",
                    l = o && r ? r : document.URL,
                    c = !0,
                    p = e.getAttribute("ref-name");
                switch (p) {
                    case "facebook":
                        t = "https://www.facebook.com/sharer.php?quote=" + s + "&u=";
                        break;
                    case "twitter":
                        t = "https://twitter.com/intent/tweet?text=" + s + "&url=";
                        break;
                    case "pinterest":
                        t = "http://pinterest.com/pin/create/button/?description=" + s + "&url=";
                        break;
                    case "linkedin":
                        t = "https://www.linkedin.com/shareArticle?mini=true&url=";
                        break;
                    case "email":
                        var d = "mailto:?body=" + s + " " + l;
                        e.setAttribute("href", d), c = !1;
                        break
                }
                c && e && n.call(e, t, l, i)
            }))
        })();
    })();
    (function() {
        var e = "100072200641719",
            t = null != document.querySelector(".zn-container.editing");
        e && !t && (window.fbAsyncInit = function() {
            FB.init({
                appId: "912333495590130",
                autoLogAppEvents: !0,
                xfbml: !0,
                version: "v2.11"
            })
        }, function(e, t, n) {
            var i, a = e.getElementsByTagName(t)[0];
            e.getElementById(n) || (i = e.createElement(t), i.id = n, i.src = "https://connect.facebook.net/vi_VN/sdk.js", a.parentNode.insertBefore(i, a))
        }(document, "script", "facebook-jssdk"))
    })();
    (function() {
        var e = null != document.querySelector(".zn-container.editing"),
            t = document.body;
        p();
        var n = "false",
            i = "true",
            a = "false",
            o = "true",
            r = "false",
            s = "true" == n && (e || "true" != r || !localStorage.znHideAnnouncementBar);
        if (s) {
            var l = document.createElement("div");
            if (l.classList.add("zn-announcement-bar"), "true" == o && l.classList.add("pad-right"), l.innerHTML = '\n        <div class="zn-announcement-message">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>\n        '.concat("true" == i ? '\n          <a class="zn-announcement-button" href="" target="'.concat("true" == a ? "_blank" : "", '">\n            <button>Click me</button>\n          </a>\n        ') : "", "\n        ").concat("true" == o ? '<i class="material-icons-outlined zn-annoucement-close">close</i>' : "", "\n      "), t.prepend(l), !e && "true" == o) {
                var c = l.querySelector(".zn-annoucement-close");
                c.addEventListener("click", (function() {
                    p(), "true" == r && (localStorage.znHideAnnouncementBar = !0)
                }))
            }
        }
        function p() {
            var e = t.querySelector(".zn-announcement-bar");
            e && e.parentNode.removeChild(e)
        }
    })();
});