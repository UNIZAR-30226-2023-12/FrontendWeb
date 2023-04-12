package vo;

import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

/*
 * Creado por:
 * Cristina Marzo Pardos 817116
 * Hugo Mateo Trejo 816678
 * Paula Oliván Usieto 771938
 * Descripcion: caja de html para poder general listas dinámicas con distintos parámetros
 */

public class CajaGen implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Set<String> Propiedades;
	private String Titulo;
	private String Subtitulo;
	private String ViewMore;
	private String ViewMore2;
	private String RelativeLink;
	private String ImageLink; // Será el tipo de audio: imagen canción e imagen podcast
	private String RelativeLink2;
	
	public String getRelativeLink() {
		return RelativeLink;
	}

	public void setRelativeLink(String relativeLink) {
		RelativeLink = relativeLink;
	}
	
	public String getRelativeLink2() {
		return RelativeLink2;
	}

	public void setRelativeLink2(String relativeLink2) {
		RelativeLink2 = relativeLink2;
	}

	public void setPropiedades(Set<String> propiedades) {
		Propiedades = propiedades;
	}
	
	public Set<String> getPropiedades() {
		return Propiedades;
	}

	/**
	 * Constructor
	 * @param Properties
	 * @param Titulo
	 * @param Subtitulo
	 * @param ViewMore
	 */
	public CajaGen (Set<String> propiedades, String Titulo, String Subtitulo, String ViewMore, String RelativeLink, String ImageLink) {
		this.Propiedades = propiedades;
		this.Titulo = Titulo;
		this.Subtitulo = Subtitulo;
		this.ViewMore = ViewMore;
		this.ViewMore2 = "";
		this.RelativeLink = RelativeLink;
		this.RelativeLink2 = "";
		this.ImageLink = ImageLink;
	}
	
	public CajaGen (Set<String> propiedades, String Titulo, String Subtitulo, String ViewMore, String RelativeLink, String ImageLink, String ViewMore2, String RelativeLink2) {
		this.Propiedades = propiedades;
		this.Titulo = Titulo;
		this.Subtitulo = Subtitulo;
		this.ViewMore = ViewMore;
		this.ViewMore2 = ViewMore2;
		this.RelativeLink = RelativeLink;
		this.ImageLink = ImageLink;
		this.RelativeLink2 = RelativeLink2;
	}
	
	public String getImageLink() {
		return ImageLink;
	}

	public void setImageLink(String imageLink) {
		ImageLink = imageLink;
	}

	public String getTitulo() {
		return Titulo;
	}

	public void setTitulo(String titulo) {
		Titulo = titulo;
	}

	public String getSubtitulo() {
		return Subtitulo;
	}

	public void setSubtitulo(String subtitulo) {
		Subtitulo = subtitulo;
	}

	public String getViewMore() {
		return ViewMore;
	}

	public void setViewMore(String viewMore) {
		ViewMore = viewMore;
	}	
	
	public String getViewMore2() {
		return ViewMore2;
	}

	public void setViewMore2(String viewMore2) {
		ViewMore2 = viewMore2;
	}	
}
