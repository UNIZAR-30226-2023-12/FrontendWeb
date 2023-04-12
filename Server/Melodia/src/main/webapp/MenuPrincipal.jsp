<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Menu Principal de la app Melodia</title>
</head>
<body>
    <form action="Busqueda" method="post">
        <input type="cadenaBuscada" name="cadena" required>
        <input type="submit" value="Buscar">
    </form>
    <!-- Parámetro para poner reproducción de música en caso de haber dejado la canción pausada -->
	<!-- Section-->
	<section class="py-3">
	    <div class="container px-4 px-lg-3 mt-3">
	        <div class="row gx-2 gx-lg-3 row-cols-1 row-cols-md-1 row-cols-xl-1 justify-content-center">
	        	<a class="dex-btn mt-auto" href="/Melodia/Lista_Carpetas">			
	    			Mis Carpetas
	    		</a>
	    	</div>
	    </div>
	    <div class="container px-4 px-lg-3 mt-4">
	    	<div class="row gx-2 gx-lg-3 row-cols-1 row-cols-md-1 row-cols-xl-1 justify-content-center">
	            <a class="dex-btn mt-auto" href="/Melodia/Lista_ListRep">			
	    			Mis Listas de Reproducción
	    		</a>
	    	</div>
	    </div>
	    <div class="container px-4 px-lg-3 mt-4">
	    	<div class="row gx-2 gx-lg-3 row-cols-1 row-cols-md-1 row-cols-xl-1 justify-content-center">
	            <a class="dex-btn mt-auto" href="/Melodia/Favs">			
	    			Canciones Favoritas
	    		</a>
	    	</div>
	    </div>
	    <div class="container px-4 px-lg-3 mt-4">
	    	<div class="row gx-2 gx-lg-3 row-cols-1 row-cols-md-1 row-cols-xl-1 justify-content-center">	
	            <a class="dex-btn mt-auto" href="/Melodia/DescubrirCanciones">			
	    			Conoce nueva música
	    		</a>
	    	</div>
	    </div>
	    <div class="container px-4 px-lg-3 mt-4">
	    	<div class="row gx-2 gx-lg-3 row-cols-1 row-cols-md-1 row-cols-xl-1 justify-content-center">
	            <a class="dex-btn mt-auto" href="/Melodia/Social">			
	    			Mis Amigos
	    		</a>
	    	</div>
	    </div>
	</section>
	<%@include file ="Footer.jsp"%>
</body>
</html>