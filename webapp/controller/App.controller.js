sap.ui.define(
	["sap/ui/core/mvc/Controller" //,
		//"sap/m/MessageToast"
	],
	function(Controller /*, MessageToast*/ ) {
		Controller.extend("opensap.myapp.controller.App", {
			onSearchEvent: function(evt) {
				var query = evt.getParameter("query");
				var aUrl = 'https://api.apixu.com/v1/current.json?key=6c45e00414c14ed8ac7215208171607&q=' + query;

				jQuery.ajax({
					url: aUrl,
					method: 'GET',
					async: false,
					dataType: 'json',
					success: function(data) {
						var d = JSON.stringify(data);
						var res = d.split(":");
						var temp = res[16].split(",");
						var temp_f = temp[0];
						var skytext = res[19].split(",");
						var sky_condition = skytext[0];
						var wind = res[22].split(",");
						var windSpeed_miles = wind[0];
						var preci = res[29].split(",");
						var precipitation_in = preci[0];
						var hum = res[30].split(",");
						var humidity = hum[0];
						var visible = res[35].split("}");
						var visibility_in_miles = visible[0];
						var str = "Temperature in Fahrenheit: " + temp_f + "\n" +
							"Sky Condition: " + sky_condition + "\n" +
							"Wind speed in miles: " + windSpeed_miles + "\n" +
							"Precipitation: " + precipitation_in + "\n" +
							"Humidity: " + humidity + "\n" +
							"Visibility in miles: " + visibility_in_miles;
						jQuery.sap.require("sap.m.MessageBox");
						sap.m.MessageBox.show(
							str, {
								icon: sap.m.MessageBox.Icon.INFORMATION,
								title: "Weather Information for: " + query,
								actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.Cancel]
							}
						);
					},
					error: function() {
						alert('Error in json call');
					}
				});
			}
		});
	});