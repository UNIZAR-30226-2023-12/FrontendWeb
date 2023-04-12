<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Cambiar Contrasena</title>
</head>
<%@ page import="java.util.List" 
    			 import="java.util.Map"
    			 import="java.util.Iterator"
				 import="java.util.LinkedList"
				 import="java.util.Set"
				 import="java.util.HashSet"
    			 
    			 import="vo.*" 	
    			 import="DataServlets.DataServlets"
    	%>
        <!-- Navigation //Mirar si queremos crear una para añadirlo y tener enlaces directos-->
        <!-- %@include file="NavigationBar.jsp"% -->
        <!-- Header-->
        <!-- %@include file ="Header.jsp"% -->
        <!-- Section-->
        <section class="py-5">
            <div class="container px-4 px-lg-5">
            <div class="fst-normal text-center p-sm-2 mb-sm-4 mt-sm-4">Introduzca los siguientes campos para poder finalizar la recuperación de la contraseña</div>
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                	<form id="contactForm" action="/Server/Check_Code" method = "POST">
					        <div class="row align-items-stretch justify-content-center mb-5">
					            <div class="col-md-12">
						            <div class="fst-normal text-left p-sm-2">Código de verificación enviado a la dirección de correo:</div>
						                <div class="form-group">
						                    <!-- Name input-->
						                    <input class="form-control" id="code" name="code" type="text" placeholder="Your verification code" data-sb-validations="required"/>
						                    <div class="invalid-feedback" data-sb-feedback="name:required">Es necesario incluir el código de verificación del correo.</div>
						                </div>
						            
						            <div class="fst-normal text-left p-sm-2">Nueva contraseña:</div>
						                <div class="form-group">
						                    <!-- Name input-->
						                    <input type="password" class="form-control" id="new_password" name="new_password" type="text" placeholder="Your new password" data-sb-validations="required"/>
						                    <div class="invalid-feedback" data-sb-feedback="name:required">Es necesario incluir una nueva contraseña para su cuenta.</div>
						                </div>
						            </div>

								<div class="fst-normal text-left p-sm-2">Confirmar la nueva contraseña:</div>
						                <div class="form-group">
						                    <!-- Name input-->
						                    <input type="password" class="form-control" id="confirmation_password" name="confirmation_password" type="text" placeholder="Your new password again" data-sb-validations="required"/>
						                    <div class="invalid-feedback" data-sb-feedback="name:required">Es necesario repetir la contraseña para comprobar que ambas coincidan.</div>
						                </div>
						            </div>
					        </div>
					        <!-- Submit success message-->
					        <!---->
					        <!-- This is what your users will see when the form-->
					        <!-- has successfully submitted-->
					        <div class="d-none" id="submitSuccessMessage">
					            <div class="text-center text-white mb-3">
					                <div class="fw-bolder">La contraseña ha sido modificada correctamente</div>
					                <br />
					            </div>
					        </div>
					        <!-- Submit error message-->
					        <!---->
					        <!-- This is what your users will see when there is-->
					        <!-- an error submitting the form-->
					        <div class="d-none" id="submitErrorMessage"><div class="text-center text-danger mb-3">Se ha producido un error al realizar el cambio</div></div>
					        <!-- Submit Button-->
					        <div class="text-center"><button class="dex-btn btn-xl text-uppercase" id="submitButton" type="submit">Confirmar los cambios</button></div>
					</form>                  	
                </div>
                
              	<%
			       if (request.getAttribute("Incorrect") != null){
			    		out.println("<div class=\"fst-normal text-center p-sm-4\">The user does not exist, please try again</div>");
			       } 
			    %>
					    
            </div>
        </section>
        <%@include file ="Footer.jsp"%>
    </body>
</html>