$(function(){
    $preview = $('#preview');
    $hydropost = $('select[name=hydropost]');
    
    function drawHydropost(hydropostId) {
        var src = hydropostId ?
            'http://gis.vodinfo.ru/informer/draw/v2_' + hydropostId + '_400_300_30_ffffff_110_8_7_H_none.png' :
            '';
        $preview.attr('src', src);
    }

    $hydropost.change(function(){
        var hydropostId = $(this).val();
        drawHydropost(hydropostId);
    });
});
