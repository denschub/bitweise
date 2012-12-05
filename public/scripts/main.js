jQuery(function() {
    window.meny = Meny.create({
        menuElement: document.querySelector('#navigation'),
        contentsElement: document.querySelector('#container'),
        position: 'left',
        width: 260
    });
    
    jQuery('#menu-arrow').click(function(e) {
        window.meny.open();
    });
    
    window.History.Adapter.bind(window, 'statechange', function() {
        var State = window.History.getState();
        loadContent(State.data.content);
    });
    
    innerClickHandler();
});

function innerClickHandler() {
    jQuery('a').unbind('click').click(function(e) {
        var target = $(this).attr('href');
        if (target.charAt(0) == '/') {
            e.preventDefault();
            content = target.substring(1);
            window.History.pushState({content: content}, document.title, '/' + content);
        }
        return true;
    });
}

function loadContent(content) {
    if (content == '') {content = "home"}
    
    $.ajax('/' + content, {
        success: function(data) {
            $("#content").html($("#content", data).html());
            innerClickHandler();
        },
        error: function(xhr, status, error) {
            if (error == 'Not Found') {
                loadContent('_404');
            } else {
                alert(error);
            }
        }
    });
}
