//Snitch Mail V1.0
var settings = {

    showAnnoy: true,
    showBanner: true,
    sendEmail: true,
    annoyMessage: "PAUL IS ACE",
    bannerBackground: "#f74e52",
    bannerFont: "white",
    bannerMessage: "It looks like you've opened the inspector. Eeek. Have a poke around, but please be gentle.",
    prependTo: "body",
};



(function (exportName) {

    /*<remove>*/
    'use strict';
    /*</remove>*/

    var exports = exports || {};

    function create(options) {
        if (typeof options === 'function') {
            options = {
                onchange: options
            };
        }
        options = options || {};
        var delay = options.delay || 1000;
        var instance = {};
        instance.onchange = options.onchange;
        var checkStatus;
        var element = new Image();
        element.__defineGetter__('id', function () {
            checkStatus = 'on';
        });
        var status = 'unknown';

        function getStatus() {
            return status;
        }
        instance.getStatus = getStatus;

        function checkHandler() {
            if (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) {
                setStatus('on');
                return;
            }
            checkStatus = 'off';
            console.log(element);
            console.clear();
            setStatus(checkStatus);
        }

        function setStatus(value) {
            if (status !== value) {
                status = value;
                if (typeof instance.onchange === 'function') {
                    instance.onchange(value);
                }
            }
        }
        var timer = setInterval(checkHandler, delay);
        window.addEventListener('resize', checkHandler);

        var freed;

        function free() {
            if (freed) {
                return;
            }
            freed = true;
            window.removeEventListener('resize', checkHandler);
            clearInterval(timer);
        }
        instance.free = free;

        return instance;
    }

    exports.create = create;

    if (typeof define === 'function') {
        if (define.amd || define.cmd) {
            define(function () {
                return exports;
            });
        }
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = exports;
    } else {
        window[exportName] = exports;
    }

})('jdetects');


var checkStatus;

var element = new Image();
element.__defineGetter__('id', function () {
    checkStatus = 'on';
});

var checker = setInterval(function () {
    checkStatus = 'off';
    console.log(element);
    console.log('checkStatus' + checkStatus)
    if (checkStatus === "on") {
        clearInterval(checker);
        console.clear();

        if (settings.sendMail !== false) {
            sendEmail()
        }
        if (settings.showBanner !== false) {
            $(settings.prependTo).prepend('<div id="console_alert" style="display:none;position:relative;width:100%;background:' + settings.bannerBackground + ';transition:0.3s;padding:20px;text-align:center;color:' + settings.bannerFont + ';min-height: 60px;font-size: medium;">' + settings.bannerMessage + '</div><div id="console_alert_snitchmail" style="width:100%; background:' + settings.bannerFont + ';color:#aaaaaa;text-align:center;padding:5px;display:none;cursor:pointer;">Snitchmail sent ( Huh? What\'s this? )</div>')
            consoleAlert()
        }
        if (settings.showAnnoy !== false) {
            annoy()
        }
        checkClose
    }
}, 1000)

function annoy() {

    var listRun


    function line1() {
        console.clear();
        console.log('++++BASIC++++')
    }
    setTimeout(line1, 500)

    function line2() {
        console.log('10 PRINT "' + settings.annoyMessage + '"')
    }
    setTimeout(line2, 1000)

    function line3() {
        console.log('20 GOTO 10')
    }
    setTimeout(line3, 1500)

    function line4() {
        console.log('RUN')
        list()
    }
    setTimeout(line4, 2000)

    function list() {
        var listRun = setInterval(function () {

            settings.annoyMessage += ' ';
            console.log(settings.annoyMessage)

        }, 400)

        var listEscape = setInterval(function () {

            console.log('++++PRESS ESCAPE TO CANCEL++++')

        }, 6500)

        document.onkeydown = function (evt) {
            evt = evt || window.event;
            var isEscape = false;
            if ("key" in evt) {
                isEscape = evt.key == "Escape";
            } else {
                isEscape = evt.keyCode == 27;
            }
            if (isEscape) {
                console.log('++++ ESCAPE PRESSED ++++')
                clearInterval(listEscape);
                clearInterval(listRun);
            }
        };

    }
}

function checkClose() {

    var checkStatus;

    var element = new Image();
    element.__defineGetter__('id', function () {
        checkStatus = 'on';
    });


    var checker = setInterval(function () {
        checkStatus = 'off';
        console.log(element);
        console.log('checkStatus' + checkStatus)
    }, 1000)

}

function consoleAlert() {
    $("#console_alert").slideDown();
    $("#console_alert_close").click(function () {
        closeAlert()
    });
}

function closeAlert() {
    $("#console_alert").slideUp();
}

function sendEmail() {

    $.get('http://jsonip.com/', function (jip) {
        var url = window.location.href;

        var data = {
            url: url,
            message: 'Someone with the IP: ' + jip.ip + ' inspected this page'
        };
        $.ajax({
            type: "POST",
            url: "/mail/email.php",
            data: data,
            success: function () {
                $('#console_alert_snitchmail').fadeIn().click(function () {
                    window.open('https://github.com/pauljaston/snitchmail', '_blank');
                });
            }
        });

    });

}