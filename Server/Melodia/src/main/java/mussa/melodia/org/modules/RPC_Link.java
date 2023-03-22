package mussa.melodia.org.modules;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class RPC_Link {
	
	private static final String DJANGO_URL = "http://localhost:8081/";
	private static final String DO_GET = "GET";
	//private static final String DO_POST = "POST";
	
	//Lista de metodos
	public static final String GET_SONG = "GetSong";
	
	//Lista de parametros
	public static final String GET_SONG_ID_AUDIO = "idSong";
	public static final String GET_SONG_CALIDAD_ALTA = "calidadAlta";
	public static final String GET_SONG_ES_CANCION = "esCancion";
	
	//El metodo que sera invocado
	private String method = "";
	
	//Los parametros con los que se invoca
	private Map<String, String> parameters = new HashMap<>();
	
	public RPC_Link(String method){
		this.method = method;
	}
	
	/**
	 * Coloca un parametro en la llamada a procedimiento remoto, si ya existe
	 * el parametro, sobreescribe su valor.
	 * 
	 * @param name	Nombre del parametro
	 * @param value Valor del parametro
	 */
	public void setParameter(String name, String value) {
		parameters.put(name, value);
	}
	
	/**
	 * Coloca una lista de parametros en la llamada a procedimiento remoto
	 * 
	 * @param parameters Lista de parametros
	 */
	public void setParameters(HashMap <String, String> parameters) {
		this.parameters = new HashMap<>(parameters);
	}
	
	/**
	 * Ejecuta la llamada a procedimiento remoto y devuelve el resultado de dicha invocacion
	 * 
	 * @return Resultado de la llamada a procedimiento remoto
	 */
	public String executeGet() {
		StringBuilder result = new StringBuilder();
		
		try {	
			URL url = new URL(DJANGO_URL + method + "?" + ParameterStringBuilder.getParamsString(parameters));
			HttpURLConnection con = (HttpURLConnection) url.openConnection();
			con.setRequestMethod(DO_GET);
			
			// Búferes para leer
			BufferedReader rd = new BufferedReader(new InputStreamReader(con.getInputStream()));
			String linea;
			// Mientras el BufferedReader se pueda leer, agregar contenido a resultado
			while ((linea = rd.readLine()) != null) {
			   result.append(linea);
			}
			// Cerrar el BufferedReader
			rd.close();
			
		}catch (MalformedURLException e){
			e.printStackTrace();
		}catch (IOException e){
			e.printStackTrace();
		}
		
		// Regresar resultado, pero como cadena, no como StringBuilder
		return result.toString();
	}
	
	
}
