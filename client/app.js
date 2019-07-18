$(document).ready(function() {
	var socket = io();

	var name = "User";

	$("#chat-div").hide();

	$("#login").submit(function() {
		name = $("#name").val();

		$("#login").hide();
		$("#chat-div").show();

		socket.emit("message", name + " has entered the chat");

		return false;
	});

	$("#send-message").submit(function() {
		var msg = name + ": " + $("#message").val();
		socket.emit("message", msg);

		$("#message").val("");

		return false;
	});

	socket.on("message", function(msg) {
		$("<li>").text(msg).appendTo("#chat-list");
	});
});