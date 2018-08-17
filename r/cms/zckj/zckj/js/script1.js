function showHideLayer(layerid, actionid) {
    if (actionid == 'show') {
        $('#' + layerid).show();
    } else {
        $('#' + layerid).hide();
    }
}

function  init_nav() {
    $(".bind_menu_a").bind({
        mouseover: function(){
            var $t = $(this);
            var layerid = $t.data('layerid');
            showHideLayer(layerid, 'show');
        },
        mouseout: function(){
            var $t = $(this);
            var layerid = $t.data('layerid');
            showHideLayer(layerid, 'hide');
        }
    });
}

$(function(){
    init_nav();
});