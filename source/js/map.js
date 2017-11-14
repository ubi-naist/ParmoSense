function initMap() {

  var myOptions = {
    zoom: 16,
    center: new google.maps.LatLng(34.6928,134.9037),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

  xmlPlot(map, "/js/data/flu.xml", "/img/map/icon/1.png");
  xmlPlot(map, "/js/data/inv.xml", "/img/map/icon/3.png");
  xmlPlot(map, "/js/data/led.xml", "/img/map/icon/5.png");
  xmlPlot(map, "/js/data/etc.xml", "/img/map/icon/0.png");

}


function xmlPlot(map, fileName, icon) {
  
  jQuery.get(fileName, {}, function(data) {
    jQuery(data).find("marker").each(function() {
      var marker = jQuery(this);
      var lp = new LightPoint( marker.attr("info"), marker.attr("lat"),
                               marker.attr("lng"),  marker.attr("light") );
      
      var latlng = new google.maps.LatLng(parseFloat(lp.lat),
                                          parseFloat(lp.lng));

      var lightSetPointIcon = new google.maps.MarkerImage(icon,
                              new google.maps.Size(20,20),
                              new google.maps.Point(0,0),
                              new google.maps.Point(10,10));
      CreateMarker(latlng, map, lp.light, lightSetPointIcon, null, 10);
    });
  });

}



function CreateMarker(pos,map,light,icon,shadow,zindex) {
    marker = new google.maps.Marker({
                  position: pos,
                  icon: icon,
                  shadow: shadow,
                  map: map,
                  zIndex : zindex
    });

}

function LightPoint(info,lat,lng,light) {
  this.info = info;
  this.lat = lat;
  this.lng = lng;
  this.light = light;
}




