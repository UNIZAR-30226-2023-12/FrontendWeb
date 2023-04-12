import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.*;
import java.util.Random;

import DataServlets.DataServlets;
import daos.DAO_Pub;  

import vo.*;

@WebServlet(
		  name = "CambiarContrasena",
		  description = "Devuelve la pagina para cambiar la contraseña de un usuario que se ha olvidado de su contraseña",
		  urlPatterns = {"/recuperacion/*"}
		)

public class Change_Passwd extends HttpServlet
{ 
	private static final long serialVersionUID = 1L;

public void doGet(HttpServletRequest entrada, HttpServletResponse respuesta)  
throws ServletException,IOException  
{  	
	RequestDispatcher dispatcher = getServletContext()
		      .getRequestDispatcher("/CambiarContrasena.jsp");
			
			entrada.setAttribute("Title", "Password recovery");
			entrada.setAttribute("Subtitle", "");

		    dispatcher.forward(entrada, respuesta);
} 

public void doPost(HttpServletRequest request, HttpServletResponse reply) 
		throws ServletException, IOException
{
	String correo = request.getParameter("email"); 
	
	if (correo != "")
	{
		Boolean correcto = DataServlets.mailIncorrecto(correo, correo);
		
		if (correcto)
		{
			//HttpSession session = request.getSession();
			//session.setAttribute("email", correo);
			//session.setAttribute("verification_code", codigo);
			
			reply.sendRedirect("/Server/ChangePasswd.jsp");	
			this.doGet(request, reply);
		}
		else
		{
			request.setAttribute("Incorrect", "True");
			this.doGet(request, reply);
		}
	}
	else
	{		
		request.setAttribute("Incorrect", "True");
		this.doGet(request, reply);
	}
}
}