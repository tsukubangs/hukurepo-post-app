var boshService = "https://210.140.41.217:5281/http-bind/";
var xmppServer = "210.140.41.217";
var jid = "guest@"+xmppServer;
var password = "guest";
var device;
var obj = new Object();

function publish(latitude, longitude, comment, image, name, gender, age, nationality){
	var client = new SoxClient(boshService, xmppServer, jid, password);
	var soxEventListener = new SoxEventListener();
	//＊初期化？
	client.unsubscribeAll();

	//soxサーバへ接続
	soxEventListener.connected = function(soxEvent) {
		console.log("[main.js] Connected "+soxEvent.soxClient);
		status("Connected: "+soxEvent.soxClient);
		//デバイスの登録
		device = new Device("ngs-ichikawa");//*RULE* デバイス名に_dataや_metaはつけない

		//デバイスの内部情報を取得してみる
		 if(!client.resolveDevice(device)){
			 /* we are failed. manually construct the device  */
 			status("Warning: Couldn't resolve device: "+device+". Continuing...");
		 };

	 };

	 //soxへの接続失敗
	soxEventListener.connectionFailed = function(soxEvent) {
		status("Connection Failed: "+soxEvent.soxClient);
	};

	//デバイスの内部情報取得に成功
	soxEventListener.resolved = function(soxEvent){
		status("Resolved: "+soxEvent.device);

		var data_set = [
								["latitude",latitude],
								["longitude",longitude],
								["problem_comment",comment],
								["problem_image",image],
								["name",name],
								["gender",gender],
								["age",age],
								["nationality",nationality]
							];
		data_set.forEach(function(data){
			var name = data[0];
			var value = data[1];
			//alert(name);
			device.addTransducer(createTransducer(name,value));//add the transducer to the device
		});

		//publish（センサデータの発行）
		soxEvent.soxClient.publishDevice(soxEvent.device);
	};
	soxEventListener.resolveFailed = function(soxEvent){
		status("Resolve Failed: "+soxEvent.device);
	};
	soxEventListener.published = function(soxEvent){
		status("Published: "+soxEvent.device);
		obj.status='ok';
		console.log("published");
	};
	soxEventListener.publishFailed = function(soxEvent){
		status("Publish Failed: "+soxEvent.device+" errorCode="+soxEvent.errorCode+" errorType="+soxEvent.errorType);
		obj.status='fail';
		console.log("failed");
	};
	client.setSoxEventListener(soxEventListener);
	client.connect();

	sleep(3000);
	alert(obj['status']);
	return obj;

};

function createTransducer(name, value){
	var transducer = new Transducer();
	transducer.name = name;
	transducer.id = name;
	var data = new SensorData(name, new Date(), value, value);//create a value to publish
	transducer.setSensorData(data);//set the value to the transducer
	return transducer;
}

function status(message){
	var html = (new Date().toLocaleString())+" [main.js] "+message+"<hr>\n"+$("#status").html();
	$("#status").html(html);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
