!function (t) {

    var e = {};

    function n(o) {
        if (e[o])return e[o].exports;
        var r = e[o] = {i: o, l: !1, exports: {}};
        return t[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }

    n.m = t, n.c = e, n.d = function (t, e, o) {
        n.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: o})
    }, n.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
    }, n.t = function (t, e) {
        if (1 & e && (t = n(t)), 8 & e)return t;
        if (4 & e && "object" == typeof t && t && t.__esModule)return t;
        var o = Object.create(null);
        if (n.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)for (var r in t)n.d(o, r, function (e) {
            return t[e]
        }.bind(null, r));
        return o
    }, n.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 0)
}([function (t, e, n) {
    "use strict";
    !function () {
        firebase.initializeApp({
            apiKey: "AIzaSyBR6fYJNo4m8qTNImgsD1Orp-rRODt4TAs",
            authDomain: "bingo-card.firebaseapp.com",
            databaseURL: "https://bingo-card.firebaseio.com",
            projectId: "bingo-card",
            storageBucket: "",
            messagingSenderId: "763319498742"
        });
        var t = window.localStorage.getItem(["room_number"]);
        if (null == t || "" == t) {
            var e = "abcdefghijklmnopqrstuvwxyz0123456789", n = e.length;
            t = "";
            for (var o = 0; o < 32; o++)t += e[Math.floor(Math.random() * n)];
            window.localStorage.setItem(["room_number"], [t])
        }
        y();
        var r = new Clipboard("#share_btn,#share_btn_footer");
        $("#share_btn,#share_btn_footer").attr("data-clipboard-text", "https://the-bingo.jp/view/card?id=" + t), r.on("success", function (e) {
            alert("コピーしました！https://the-bingo.jp/view/card?id=" + t)
        });
        var a, i = firebase.database(), s = i.ref("/bingo/" + t),
            l = (i.ref("/.info/connected"), i.ref("/presence/" + t + "/")), u = i.ref("/status/bingo/" + t),
            c = i.ref("/status/reach/" + t), p = (u.push(), c.push(), []), h = !0;
        u.on("value", function (t) {
            var e = t.numChildren();
            1 == e && setTimeout(function () {
                S(".bingo-modal")
            }, 1e3), $("#bingo_member").html(e)
        }), c.on("value", function (t) {
            var e = t.numChildren();
            $("#reach_member").html(e)
        }), l.on("value", function (t) {
            $("#member").html(t.numChildren())
        }), s.on("value", function (t) {
            var e = t.val();
            null != e && (p = e.array), p.sort(function (t, e) {
                return t - e
            });
            for (var n = 0; n < p.length; n++) {
                for (var o = parseInt(p[n]), r = 0; r < m.length; r++)o == m[r] && m.splice(r, 1);
                $("#" + p[n]).addClass("unmatched")
            }
            h && (h = !1)
        });
        var d = document.getElementById("audio_drum"), f = document.getElementById("audio_cymbal"),
            m = Array.from(new Array(25)).map(function (t, e) {
                return e + 1
            }), b = "0", g = "0", v = new Vue({
                el: "#app",
                data: {
                    items: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"],
                    panel1: "0",
                    panel10: "0",
                    spinButton: !1,
                    stopButton: !0,
                    pStyle: "",
                    bingoId: "0",
                    autoStopFlag: !0,
                    timeOutId: ""
                    // TotalResult: ((localStorage.getItem('TotalResult')) ? (localStorage.getItem('TotalResult')) : (localStorage.setItem('TotalResult', '0')))
                },
                methods: {
                    runSlot: function () {
                        $(".enterMSG").hide(), this.spinButton = !0, this.stopButton = !1;
                        var t = m.length;
                        0 != t && (d.play(), f.pause(), b = Math.floor(Math.random() * t).toString(), g = m[b], parseInt(g) < 10 && (g = "0" + g), g = g.toString(), this.panel1 = g.substr(0, 1), this.panel10 = g.substr(1, 2), a = setTimeout(this.runSlot, 25), this.autoStopFlag && (this.timeOutId = setTimeout(this.runStop, 3000)), this.autoStopFlag = !1)
                    }, runStop: function () {
                        if (0 != m.length) {
                            clearInterval(a), f.play(), d.pause(), this.spinButton = !1, this.stopButton = !0, f.currentTime = 0, d.currentTime = 0, m.splice(parseInt(b), 1);
                            var t = g;
                            $("#" + t).addClass("unmatched"), p.push(t), s.set({array: p}), this.autoStopFlag = !0, clearTimeout(this.timeOutId)
                        }
                    }, allReset: function () {
                        window.confirm("確定要全部重置嗎？") && (window.localStorage.clear(), location.reload())
                    }, bingoReset: function () {
                        window.confirm("確定要重置嗎？") && (p = [], s.set({array: p}), location.reload())
                    }
                },
                directives: {
                    disable: function (t, e) {
                        t.disabled = e.value
                    }
                },
                created: function () {
                    this.panel1.trim()
                }
            });
        $("body").keypress(function (t) {
            13 === t.which && ($("#spinButton").click(), $("#stopButton").click())
        }), $(".dropdown").dropdown(), $(".share_item").on("click", function () {
            var t = $(this).data().name;
            v.doShare(t)
        });
        var w = "https://chart.apis.google.com/chart?cht=qr&chs=500x500&chl=https://the-bingo.jp/view/card?id=" + t;

        function y() {
            $(".share_modal").modal("show"), $("#qr-url").html("https://the-bingo.jp/view/card?id=" + t)
        }

        $("#qrcode").attr("src", w);
        var S = function (t) {
            $(t).modal("show", function () {
                if (".bingo-modal" == t) {
                    var e = 0;
                    !function t() {
                        0 == e ? $(".bingo-shape").shape("flip left") : 1 == e ? $(".bingo-shape").shape("flip left") : 2 == e ? $(".bingo-shape").shape("flip left") : 3 == e ? $(".bingo-shape").shape("flip left") : 4 == e ? $(".bingo-shape").shape("flip left") : $(".bingo-shape").shape("flip over"), e++;
                        var n = setTimeout(t, 500);
                        e > 4 && clearTimeout(n)
                    }()
                }
            })
        };
    }()
}]);