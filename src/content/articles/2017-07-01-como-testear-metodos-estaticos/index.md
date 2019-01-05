---
title: "Como testear métodos estáticos"
date: "2017-07-01T02:40:32.169Z"
path: "/como-testear-metodos-estaticos/"
image_article: "image-article.jpg"
tags: "test"
---


Los métodos estáticos en general, hace nuestro día a día un poco más cómodo pero si tienes una mínima duda de si deberías utilizarlo lo mejor es no utilizarlo.

Si venís solo a por la solución os podéis [SALTAR](#abajo) la siguiente explicación.

La razón principal, por la que es difícil testear estáticos es que estáis escribiendo a fuego una llamada en vuestro código. Voy a comparar una solución con un estático y otra con objeto para explicar las diferencias.

```java 
 public class User {
 
     private String name;
     private Authentication authentication;
 
     public User(String name, Authentication authentication) {
         this.name = name;
         this.authentication = authentication;
     }
 
    public boolean deleteCommentary(Commentary commentary){
        return commentary.delete(this);
     }
 
 }
 
 
 public class User {
     private String name;
     private Authentication authentication;
 
     public User(String name) {
         this.name = name;
         this.authentication = AnyFramework.generateAuthentication("USER");
     }
 
   public boolean deleteCommentary(Commentary commentary){
        return commentary.delete(this);
     }
 
 }
 
 ```
 
 
 En el primer ejemplo de Authentification, que parece tan simple podría ser cualquier cosa. A través de herencia o interfaces ese Authentication podría esconder detrás un UserAuthentication o un AdminAuthentication, es un ejemplo un poco simplón. Pero creo que se entiende lo que quiero decir podéis crear lo que queráis que mientras sea una Authentificación el usuario lo va a saber usar.
 
 
 Por el contrario, en el segundo estáis llamando al método concreto de una clase concreta. Por lo que perdéis cualquier posibilidad de añadir comportamientos de manera dinámica y sin modificar directamente la clase. User 



Aun así yo uso estáticos cuando esta muy claro que es clase de utilidad. Una clase de utilidad normalmente es una clase que añade funcionalidades a librerías. Como una clase que se encarga de crear archivos y por comodidad te creas un método que te crea una estructura de directorios o te genera un ruta, etc.



### Unas pequeñas normas personales que uso para saber si usar estático.

- ***Me cuesta ponerle nombre a una clase.***
Lo único que se me ocurre son cosas de estilo ManagerFile, EmailUtils esto es señal de que la clase no tiene relación con tu lógica de negocio, es decir no influye en las funcionalidades que estas desarrollando directamente.

- ***No contienen estados.***
Una vez en un clase tenéis un estado y este cambia significa que estáis dándole a un estático la funcionalidad que utilizáis para los objetos. Es decir, tenéis comportamientos que cambian dependiendo de un estado a menos que este bien justificado esto nunca se debería hacer con estáticos. Ojo esto no es lo mismo que tener un clase estática solo con contantes que nunca van a cambiar.

- ***No la voy a testear.***
Como veremos hoy testear un estáticos es algo que puede resultar muy difícil, sobretodo si respetáis la norma de que el código de producción no debe alterarse para crear un test. Alguna vez cuando veo que necesito testear y tiene las características de una clase de utilidad la utilizo como un objeto para simplificar.

- ***Ante la duda no uso estáticos.*** Los estáticos se suelen usar por comodidad y rapidez a la hora de trabajar si tiene dudas de que vas a tener problemas con ellos no los uses.
`


<a name="abajo"></a>
### Ahora empecemos con los test. 
Supongamos que queremos testear un usuario este solo puedes borrar sus propios comentarios pero un Administrador puede borrar cualquier comentario.

```java
 
 @Test
     public void user_only_can_delete_own_commentary() throws Exception {
         User user = new User("user",new Authentication());
 
         Commentary userCommentary = new Commentary("Hola mundo", anyUser);
         Commentary anyCommentary = new Commentary("Hola mundo", new User("anyUser", new Authentication()));
 
         Assert.assertTrue(user.deleteCommentary(userCommentary));
         Assert.assertFalse(user.deleteCommentary(anyCommentary));
     }
 
 
     @Test
     public void admin_can_delete_all_commentary() throws Exception {
         User user = new User("JonayRules",new AdminAuthentication());
 
         Commentary userCommentary = new Commentary("Hola mundo", anyUser);
         Commentary anyCommentary = new Commentary("Hola mundo", new User("anyUser", new Authentication()));
 
         Assert.assertTrue(user.deleteCommentary(userCommentary));
         Assert.assertTrue(user.deleteCommentary(anyCommentary));
     }
 ```
 
 Solución sin estáticos así es fácil solo tenemos que pasarle por el constructor Authentification o AdminAuthentication. Ahora vamos a suponer que la Authentification viene de nuestro framework y tiene que ser un estático si o si y lo queremos testear. 
 
 
 
 
 ## Problema
  
  
  ```java 
    @Test
       public void user_only_can_delete_own_commentary() throws Exception {
           User user = new User("user");
   
           Commentary userCommentary = new Commentary("Hola mundo", anyUser);
           Commentary anyCommentary = new Commentary("Hola mundo", new User("anyUser", new Authentication()));
   
           Assert.assertTrue(user.deleteCommentary(userCommentary));
           Assert.assertFalse(user.deleteCommentary(anyCommentary));
       }
   
   
       @Test
       public void admin_can_delete_all_commentary() throws Exception {
           User user = new User("JonayRules");
   
           Commentary userCommentary = new Commentary("Hola mundo", anyUser);
           Commentary anyCommentary = new Commentary("Hola mundo", new User("anyUser", new Authentication()));
   
           Assert.assertTrue(user.deleteCommentary(userCommentary));
           Assert.assertTrue(user.deleteCommentary(anyCommentary));
       }
   ```
   
   ***Ahora mismo esto falla***, porque si os fijáis en la inicialización de user, no hay manera de decirle al usuario que Authentification le corresponde. Desde fuera de la clase User no se puede indicar cual es su validación pues es el framework quien la guarda.
   Si nunca habéis tenido este problemas no seria una mala idea parar aquí e intentar pensar un rato como podríais hacerlo por vuestra cuenta y luego seguir leyendo.
   
   
   ## Mi Solución
   
   
   Hay casos donde hay mejores soluciones, para este contexto probablemente intentaría crear un nueva Authentication y pasársela al framework se podría mover el estático a otro sitio pero seguramente ese otro sitio también necesite testeo de algún tipo. Este es un mecanismo que os sirve para la mayoría de los contextos. Primero de todo rompemos la regla de que nunca se puede modificar el código para hacer un test y nos vamos ayudar del [patron template](https://es.wikipedia.org/wiki/Template_Method_(patr%C3%B3n_de_dise%C3%B1o)).
   
   El patron template es simplemente coger una clase, y a través de una interface o una herencia modificar un método, seguro que muchos ya lo habian hecho pero no sabian el nombre en mi caso también fue asi.
   Se llama template simplemente porque cogemos una clase como "plantilla" para crear nuevas.
      
   
   No me gusta modificar el código para pasar un test, lo test deben de ser siempre inocuos pero este es uno de lo casos limites que te atan de pies y manos . Por lo que regresamos a nuestra clase User con nuestro estático.
   
   
   
   ```java
    public class User {
        private String name;
        private Authentication authentication;
    
        public User(String name) {
            this.name = name;
            this.authentication = AnyFramework.generateAuthentication("USER");
        }
    
      public boolean deleteCommentary(Commentary commentary){
           return commentary.delete(this);
        }
    }
   ```
   
   Y hacemos los siguiente.
   
   ``` java
   public class User {
       private String name;
       private Authentication authentication;
   
       public User(String name) {
           this.name = name;
           this.authentication = getAuthentication();
       }
   
       protected Authentication getAuthentication() {
           return AnyFramework.generateAuthentication("USER");
       }
   
       public boolean deleteCommentary(Commentary commentary){
           return commentary.delete(this);
       }
   }
   ```
   
  
   Como veis hemos envuelto nuestro estático con una función que si podemos falsear. Como veremos a continuación. Regresamos a los test.
   
   ```java
    public class UserShould {
   
   
       @Test
       public void user_only_can_delete_own_commentary() throws Exception {
           User user = new UserStub("user");
   
           Commentary userCommentary = new Commentary("Hola mundo", anyUser);
           Commentary anyCommentary = new Commentary("Hola mundo", new User("anyUser", new Authentication()));
   
           Assert.assertTrue(user.deleteCommentary(userCommentary));
           Assert.assertFalse(user.deleteCommentary(anyCommentary));
       }
   
   
       @Test
       public void admin_can_delete_all_commentary() throws Exception {
           User user = new AdminStub("JonayRules");
   
           Commentary userCommentary = new Commentary("Hola mundo", anyUser);
           Commentary anyCommentary = new Commentary("Hola mundo", new User("anyUser", new Authentication()));
   
           Assert.assertTrue(user.deleteCommentary(userCommentary));
           Assert.assertTrue(user.deleteCommentary(anyCommentary));
       }
   }
   
   public class UserStub extends User{
       private String name;
       private String authenticationLevel;
       private Authentication authentication;
   
       public UserStub(String name,String authenticationLevel) {
          super(name);
          this.authenticationLevel = authenticationLevel;
       }
   
       protected Authentication getAuthentication() {
           return AnyFramework.generateAuthentication("USER");
       }
   }
   
   public class AdminStub extends User{
       private String name;
       private Authentication authentication;
   
       public UserStub(String name,String authenticationLevel) {
           super(name);
           this.authenticationLevel = authenticationLevel;
       }
       protected Authentication getAuthentication() {
           return AnyFramework.generateAuthentication("ADMIN");
       }
   }
   ```
   
   De esta manera podemos sobrescribimos el método getAuthentication, gracias a eso, generamos dos Stub en nuestro test, UserStub y AdminStub falseando la Autentificación sin apenas modificar el código.
   
   Resumiendo, usar estáticos pueden ser muy rápidos a la hora de trabajar con utilidades pero pueden traer problemas y cuando los utilizas renuncias a la herancia y al polimorfismo donde quiera que los uses. De todas maneras para los casos limites donde un estáticos se nos atasca el patrón template nos puede dar una solución.
