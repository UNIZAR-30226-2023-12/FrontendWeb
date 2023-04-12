<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Menú</title>
        <!-- Favicon-->
        <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
        <!-- Bootstrap icons-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
        <!-- Core theme CSS (includes Bootstrap)-->
        <link href="css/styles.css" rel="stylesheet" />
    </head>
    <body>
    	<%@ page import="java.util.List" 
    			 import="java.util.Map"
    			 import="java.util.Iterator"
				 import="java.util.LinkedList"
				 import="java.util.Set"
				 import="java.util.HashSet"
    			 
    			 import="vo.*" 	
    			 import="DataServlets.DataServlets"
    	%>
        <!-- Navigation-->
        <%@include file="NavigationBar.jsp"%>
        <!-- Section-->
        <section class="py-5">
            <div class="container px-4 px-lg-5 mt-5">
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                	<%
          			
                	List<CajaGen> ListaCajas = (List<CajaGen>)request.getAttribute("ListaCajas");
					
                	for (CajaGen caja : ListaCajas)
                	{
                        Set<String> ExtBoxProperties = caja.getPropiedades();							// Parametros para el jsp caja

                        String ExtBoxTitle = caja.getTitulo();
                        String ExtBoxSubtitle = caja.getSubtitulo();
                        String ExtBoxViewMore = caja.getViewMore();
                        String ExtBoxViewMore2 = caja.getViewMore2();
                        String ExtBoxRelativeLink = caja.getRelativeLink();
                        String ExtBoxMainImage = caja.getImageLink();
                        String ExtBoxRelativeLink2 = caja.getRelativeLink2();
                    %>
              	         <%@include file ="ExtensibleBox.jsp"%>
                    <%                	                 	 
               	        }                			
                	%>
                  	
                </div>
            </div>
        </section>
       <%@include file ="Footer.jsp"%>
    </body>
</html>