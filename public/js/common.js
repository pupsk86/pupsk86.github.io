$(function(){
    $preview = $('#preview');
    controls = {
        $basin: $('select[name=basin]'),
        $waterObject: $('select[name=water-object]'),
        $hydropost: $('select[name=hydropost]')
    }
    defaults = {
        basin: controls.$basin.html(),
        waterObject: controls.$waterObject.html(),
        hydropost: controls.$hydropost.html()
    }
    
    function drawHydropost(hydropostId) {
        var src = hydropostId ?
            'http://gis.vodinfo.ru/informer/draw/v2_' + hydropostId + '_400_300_30_ffffff_110_8_7_H_none.png' :
            '';
        $preview.attr('src', src);
    }
    
    function drawBasins(basins) {
        var basinsHtml = defaults.basin;
        for (var i = 0; i < basins.length; i++) {
            basinsHtml += '<option value="' + basins[i].id + '">' + basins[i].name + '</option>';
        }
        controls.$basin.html(basinsHtml);
    }
    
    function drawWaterObjects(waterObjects) {
        var waterObjectsHtml = defaults.waterObject;
        for (var i = 0; i < waterObjects.length; i++) {
            waterObjectsHtml += '<option value="' + waterObjects[i]['water_obj_type'] + waterObjects[i]['water_obj_name'] + '">' + waterObjects[i]['water_obj_type'] + waterObjects[i]['water_obj_name'] + '</option>';
        }
        controls.$waterObject.html(waterObjectsHtml);
    }
    
    function drawHydroposts(hydroposts) {
        var hydropostsHtml = defaults.hydropost;
        for (var i = 0; i < hydroposts.length; i++) {
            hydropostsHtml += '<option value="' + hydroposts[i].code + '">' + hydroposts[i].name + '</option>';
        }
        controls.$hydropost.html(hydropostsHtml);
    }
    
    function findBasinById(basins, basinId) {
        for (var i = 0; i < basins.length; i++) {
            if (basins[i].id === basinId) {
                return basins[i];
            };
        }
        return null;
    }
    
    function findWaterObjectByName(waterObjects, waterObjectName) {
        for (var i = 0; i < waterObjects.length; i++) {
            if (waterObjects[i]['water_obj_type'] + waterObjects[i]['water_obj_name'] === waterObjectName) {
                return waterObjects[i];
            }
        }
        return null;
    }
    
    function initEventListeners(basins) {
        controls.$basin.change(function(){
            var basinId = $(this).val();
            var basin = findBasinById(basins, basinId);
            drawWaterObjects(basin.waterObjects);
            drawHydroposts([]);
            drawHydropost();
        });
        
        controls.$waterObject.change(function(){
            var waterObjectName = $(this).val();
            var basinId = controls.$basin.val();
            var basin = findBasinById(basins, basinId);
            var waterObject = findWaterObjectByName(basin.waterObjects, waterObjectName);
            drawHydroposts(waterObject.hydroposts);
            drawHydropost();
        });

        controls.$hydropost.change(function(){
            var hydropostId = $(this).val();
            drawHydropost(hydropostId);
        });
        
    }
    
    function init(basins) {
        drawBasins(basins);
        initEventListeners(basins);
    }

    init(basins);
});
