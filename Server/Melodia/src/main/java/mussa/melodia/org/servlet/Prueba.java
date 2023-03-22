package mussa.melodia.org.servlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import mussa.melodia.org.modules.RPC_Link;

import java.io.IOException;

/**
 * Servlet implementation class Prueba
 */
public class Prueba extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Prueba() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		RPC_Link llamada_remota = new RPC_Link(RPC_Link.GET_SONG);
		llamada_remota.setParameter(RPC_Link.GET_SONG_ID_AUDIO, "testSound");
		//llamada_remota.setParameter(RPC_Link.GET_SONG_CALIDAD_ALTA, "true");
		//llamada_remota.setParameter(RPC_Link.GET_SONG_ES_CANCION, "true");
		
		String resultado = llamada_remota.executeGet();
		
		if(resultado != null) {
			response.getWriter().append(resultado);
		}else {
			response.getWriter().append("");
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
