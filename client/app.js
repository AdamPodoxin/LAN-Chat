$(document).ready(function() {
	var socket = io();

	var name = "User";
	var messages = [];

	$("#chat-div").hide();

	$("#login").submit(function() {
		name = $("#name").val();

		$("#login").hide();
		$("#chat-div").show();

		socket.emit("login", name);

		return false;
	});

	$("#send-message").submit(function() {
		var msg = name + ": " + $("#message").val();
		socket.emit("message", msg);

		$("#message").val("");

		return false;
	});

	socket.on("login", function(name) {
		//socket.emit("message", name + " has entered the chat");

		if(messages.length == 0) {
			socket.emit("load-messages-request");
		}
	});

	socket.on("load-messages-request", function() {
		if(messages.length > 0) {
			socket.emit("load-messages", messages);
		}
	});

	socket.on("load-messages", function(prevMsgs) {
		console.log(messages.length);
		if(messages.length == 0) {
			messages = prevMsgs;

			for(var i = 0; i < messages.length; i++) {
				$("<li>").text(messages[i]).appendTo("#chat-list");
			}
		}
	});

	socket.on("message", function(msg) {
		messages.push(msg);

		$("<li>").text(msg).appendTo("#chat-list");
	});
});