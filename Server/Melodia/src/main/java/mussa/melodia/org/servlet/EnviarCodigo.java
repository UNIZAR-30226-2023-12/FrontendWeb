import java.util.Properties;
import java.util.Random;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@WebServlet("/EnviarCodigo")
public class EnviarCodigo extends HttpServlet {
  
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    // Obtener el correo electrónico del parámetro de solicitud
    String email = request.getParameter("email");
    
    // Configurar las propiedades de la sesión de correo electrónico
    Properties props = new Properties();
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.starttls.enable", "true");
    props.put("mail.smtp.host", "smtp.gmail.com");
    props.put("mail.smtp.port", "587");

    // Autenticar con las credenciales de la cuenta de correo electrónico
    Session session = Session.getInstance(props, new Authenticator() {
      protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication("enterprisemussa@gmail.com", "Melodia_12");
      }
    });

    try {
      // Crear un mensaje de correo electrónico
      Message message = new MimeMessage(session);
      message.setFrom(new InternetAddress("enterprisemussa@gmail.com"));
      message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
      message.setSubject("Código de verificación");
      Random random = new Random();
      // generar un numero aleatorio de 6 cifras
      Integer codigo = random.nextInt(999999);
      // TODO cambiar a ser un numero que pedimos al backend
      message.setText("Tu código de verificación es: ", codigo);

      // Enviar el mensaje de correo electrónico
      Transport.send(message);

      // Redirigir a una página de éxito
      response.sendRedirect("CambiarContrasena.jsp");
    } 
    catch (MessagingException e) {
      // Mostrar error si el correo no está asociado a ninguna cuenta
      // TODO
    }
  }
}