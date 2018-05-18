(function(){

    function saveBasinsToFile(basins) {
        var a = document.createElement('a');
        var file = new Blob(['var basins = ' + JSON.stringify(basins, null, '\t') + ';'], {type: 'js'});
        a.href = URL.createObjectURL(file);
        a.download = 'basins.js';
        a.click();
    }

    function fetchWaterObjects(params) {
        params.i = params.i || 0;
        var basin = params.basins[params.i];
        if (basin) {
            console.log('fetching basin "' + basin.name + '" (' + (params.i + 1) + '/' + params.basins.length + ')' );
            $.ajax({
                url: "/informer/basinWO/" + basin.id,
                dataType: 'json',
                success: function(obj){
                    basin.waterObjects = obj;
                },
                complete: function(){
                    fetchHydroposts({
                        basin: basin,
                        complete: function(){
                            params.i++;
                            fetchWaterObjects(params);
                        }
                    });
                }
                });
        } else {
            params.complete();
        }
    }

    function fetchHydroposts(params) {
        params.i = params.i || 0;
        var basin = params.basin;
        var waterObject = basin.waterObjects[params.i];
        if (waterObject) {
            //console.log('fetch waterObject "' + waterObject['water_obj_name'] + '"');
            $.ajax({
                url: "/informer/woHP/",
                type: 'POST',
                dataType: 'json',
                data: {basin: basin.id, wo: waterObject['water_obj_type'] + "|" + waterObject['water_obj_name']},
                success: function(obj){
                    waterObject.hydroposts = obj;
                },
                complete: function(){
                    params.i++;
                    fetchHydroposts(params);
                }
            });
        } else {
            params.complete();
        }
    }

    var basins = $('#select_bass > option[value!=99999]')
        .map((i, it) => ({id: it.value, name: it.innerHTML}))
        .toArray();
    fetchWaterObjects({
        basins: basins,
        complete: function(){
        saveBasinsToFile(basins);
        }
    });
    
})();
