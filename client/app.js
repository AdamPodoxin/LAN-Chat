$(document).ready(function() {
	var socket = io();

	var name = "User";

	$("#chat").submit(function() {
		var msg = name + ": " + $("#message").val();
		socket.emit("message", msg);

		$("#message").val("");

		return false;
	});

	socket.on("message", function(msg) {
		$("<li>").text(msg).appendTo("#chat-list");
	});
});