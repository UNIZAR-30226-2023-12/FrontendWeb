<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Envio del codigo de verificaci�n</title>
</head>
<body>
    <h1>Introduzca el correo electr�nico asociado a la cuenta para poder recuperar la contrase�a</h1>
    <form action="EnviarCodigo" method="post">
        <input type="email" name="email" required>
        <input type="submit" value="Enviar c�digo">
    </form>
</body>
</html>