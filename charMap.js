;(function($, window, undefined) {
    var mappings = {'A': 'ÀÂÆ','C': 'Ç','E': 'ÉÈËÊ','I': 'ÎÏ','O': 'ÔŒ','U': 'ÙÛÜ',
        			'a': 'àâæ','c': 'ç','e': 'éèëê','i': 'îï','o': 'ôœ','u': 'ùûü'};
    var ignoredKeys = [8, 13, 37, 38, 39, 40];
    var lastWhich, timer, mapshown, activeElement;
    var popup = $("<div/>").attr("id", "chartip").addClass("base").append($("<div/>").addClass("content").append($("<div/>").addClass("char-tooltip")));

    $(window).keyup(function(e) {
        if ((ignoredKeys.indexOf(e.which) > -1) || (activeElement == null)) {
            return;
        }
        reset();
    });

    $(window).click(function() {
        if ($('#chartip').length > 0) {
            reset();
            popup.detach();
            mapshown = null;
            var pos = getCaretIndex(activeElement);
            activeElement.focus();
            activeElement.setSelectionRange(pos, pos);
        }
    });

    function onKeyDown(e) {
        if ($('#chartip').length > 0 && (e.which == 13 || e.which == 37 || e.which == 39 || (e.which >= 48 && e.which <= 57))) {
            if (e.which == 13) {
                activateLetter();
                reset();
                popup.detach();
                mapshown = null;
            } else if (e.which == 37 && !($('.char-selector').first().hasClass("selected"))) {
                var prev = $(".char-selector.selected:first").prev();
                $(".char-selector").removeClass("selected");
                prev.addClass("selected");
            } else if (e.which == 39 && !($('.char-selector').last().hasClass("selected"))) {
                var next = $(".char-selector.selected:first").next();
                $(".char-selector").removeClass("selected");
                next.addClass("selected");
            } else if (parseInt(String.fromCharCode(e.which)) <= mapshown.length) {
                $(".char-selector").removeClass("selected");
                $(".num:contains(" + String.fromCharCode(e.which) + ")").parent().addClass("selected");
                activateLetter();
                reset();
                popup.detach();
                mapshown = null;
            }
            e.preventDefault();
            return;
        }
        if (ignoredKeys.indexOf(e.which) > -1) {
            return;
        }
        activeElement = e.target;
        if (e.which == lastWhich) {
            e.preventDefault();
            if (!timer) {
                timer = setTimeout(function() {
                    var typedChar = $(activeElement).val().split('')[getCaretIndex(activeElement) - 1];
                    if (mappings[typedChar]) {
                        mapshown = mappings[typedChar];
                        showPopup();
                    } else {
                        popup.detach();
                        mapshown = null;
                    }
                }, 10);
            }
            return;
        }
        lastWhich = e.which;
    }

    function reset() {
        lastWhich = null;
        clearTimeout(timer);
        timer = null;
    }

    function showPopup() {
        popup.find(".char-tooltip").empty();
        for (var i = 0; i < mapshown.length; i++) {
            var char_selector = $("<span/>").addClass("char-selector");
            char_selector.append($("<span/>").addClass("let").text(mapshown[i])).append($("<br>"));
            char_selector.append($("<span/>").addClass("num").text((i + 1).toString()));
            char_selector.mouseenter(function() {
                $(".char-selector").removeClass("selected");
                $(this).addClass("selected");
                activateLetter();
            });
            popup.find(".char-tooltip").append(char_selector);
        }
        $('body').append(popup);
        var active_coord = activeElement.getBoundingClientRect();
        var style_coord = "top: " + (active_coord.top - 60).toString() + "px; left: " + active_coord.left.toString() + "px;";
        $('#chartip').attr("style", style_coord);
        $('.char-selector').first().addClass("selected");
    }

    function activateLetter() {
        var pos = getCaretIndex(activeElement);
        var arVal = $(activeElement).val().split('');
        arVal[pos - 1] = $('.char-selector.selected').find('.let').text();
        $(activeElement).val(arVal.join(''));
        activeElement.focus();
        activeElement.setSelectionRange(pos, pos);
    }

    function getCaretIndex(ctrl) {
        return (ctrl.selectionStart || ctrl.selectionStart == '0') ? ctrl.selectionStart : 0;
    }

    function charMap(element) {
        this.element = element;
        this._name = 'charMap';
        $(this.element).keydown(onKeyDown);
    }

    $.fn['charMap'] = function() {
        return this.each(function() {
            if (!$.data(this, 'plugin_charMap')) {
                $.data(this, 'plugin_charMap', new charMap(this));
            }
        });
    };

}(jQuery, window));