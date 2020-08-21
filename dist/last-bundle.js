function toggleBlips(){for(var e in _blips){var o=_blips[e];console._log("Disabled ("+e+")? "+_disabledBlips.includes(e)),-1==_disabledBlips.indexOf(e)?o.forEach(e=>{var o=MarkerStore[e.markerId];_showBlips?o.addTo(Map):o.remove()}):(console._log("Blip "+e+"'s are disabled.."),o.forEach(e=>{console.log(e),MarkerStore[e.markerId].remove()}))}}function initMapControl(e){e.on("baselayerchange",function(o){var t=getMapBounds(o.layer);e.setMaxBounds(t),e.fitBounds(t),CurrentLayer=o.layer,clearAllMarkers(),toggleBlips()})}function initPlayerMarkerControls(e,o){o.on("clusterclick",function(o){for(var t=L.DomUtil.create("ul"),l=o.layer.getAllChildMarkers(),n=0;n<l.length;n++){var a=l[n].options,r=a.title,i=L.DomUtil.create("li","clusteredPlayerMarker");i.setAttribute("data-identifier",a.player.identifier),i.appendChild(document.createTextNode(r)),t.appendChild(i)}L.DomEvent.on(t,"click",function(o){var t=o.target.getAttribute("data-identifier"),l=PopupStore[localCache[t].marker];e.closePopup(e._popup),e.openPopup(l)}),e.openPopup(t,o.layer.getLatLng())})}$(document).ready(function(){globalInit(),$("#showBlips").click(function(e){e.preventDefault(),_showBlips=!_showBlips,toggleBlips(),$("#blips_enabled").removeClass("badge-success").removeClass("badge-danger").addClass(_showBlips?"badge-success":"badge-danger").text(_showBlips?"on":"off")}),$("#toggle-all-blips").on("click",function(){_blipControlToggleAll=!_blipControlToggleAll,console._log(_blipControlToggleAll+" showing blips?"),$("#blip-control-container").find("a").each(function(e,o){var t=(o=$(o)).data("blip-number").toString();_blipControlToggleAll?(_disabledBlips.splice(_disabledBlips.indexOf(t),1),o.removeClass("blip-disabled").addClass("blip-enabled")):(_disabledBlips.push(t),o.removeClass("blip-enabled").addClass("blip-disabled"))}),toggleBlips()}),$("#playerSelect").on("change",function(){""!=this.value?(Map.setZoom(3),_trackPlayer=this.value):_trackPlayer=null}),$("#filterOn").on("change",function(){""!=this.value?window.Filter={on:this.value}:window.Filter=void 0}),$("#refreshBlips").click(function(e){e.preventDefault(),clearAllMarkers(),initBlips(connectedTo.getBlipUrl())}),$("#server_menu").on("click",".serverMenuItem",function(e){console._log($(this).text()),changeServer($(this).text())}),$("#reconnect").click(function(e){e.preventDefault(),$("#connection").removeClass("badge-success").removeClass("badge-danger").addClass("badge-warning").text("reconnecting"),null==webSocket&&null==webSocket||webSocket.close(),connect()})}),$(document).ready(function(){$.ajax("version.json",{error:function(e,o){createAlert({title:"<strong>Error getting version.json!</strong>",message:e.statusText})},dataType:"text",success:function(e,o){var t=stripJsonOfComments(e),l=JSON.parse(t);window.version=l.interface,$("#livemap_version").text(window.version),$.ajax("https://raw.githubusercontent.com/TGRHavoc/live_map-interface/master/version.json",{error:function(e,o){createAlert({title:"<strong>Error latest version for check!</strong>",message:e.statusText})},dataType:"text",success:function(e,o){var t=stripJsonOfComments(e),l=JSON.parse(t);window.compareVersions(window.version,l.interface)<0?createAlert({title:"Update available",message:`An update is available (${window.version} -> ${l.interface}). Please download it <a style='color: #000;' href='https://github.com/TGRHavoc/live_map-interface'>HERE.</a>`}):console._log("Up to date or, a higher version")}})}})});