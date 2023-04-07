package mussa.melodia.org.servlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(
		name = "Logout",
		description = "Cerrar la sesión del usuario",
		urlPatterns = {"/Logout"}
	)

	public class Logout extends HttpServlet
	{  
	private static final long serialVersionUID = 1L;

	public void doGet(HttpServletRequest request, HttpServletResponse respuesta)  
	throws ServletException,IOException  
	{  	
		RequestDispatcher dispatcher = getServletContext()
			      .getRequestDispatcher("/indext.html");
				
				HttpSession session = request.getSession();
				session.invalidate();
				
			    dispatcher.forward(request, respuesta);
	} 
	}
