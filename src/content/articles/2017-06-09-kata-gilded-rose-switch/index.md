---
title: "Kata Gilded Rose Switch"
date: "2017-05-30T02:40:32.169Z"
path: "/kata-gilded-rose-switch/"
image_article: "kata.jpg"
tags: "katas"
---

Últimamente me encontrado con muchos programadores que no ven el switch como un mal olor.
Es más hace alrededor de un año yo tampoco lo sabía. Por lo que me he propuesto crear un kata
para que los programadores que se encuentre en este punto en su camino del aprendizaje
le sea más fácil avanzar.

Emplee la Kata de Gilded como base para mi kata. Una
kata cuyo fin principal es ayudar trabajar con código heredado partiendo arnés de seguridad de test creado previamente.
He conservado el problema que empleaba esta kata pero he cambiado las restricciones
y el formato para que sirvan a este propósito.

Si no podéis esperar y queréis ir ya a la kata aquí tenéis el [enlace](https://github.com/jonayGodoy/Kata-Gilded-Rose-Switch).

Si aun estáis leyendo esto, a continuación voy a desarrollar un poco de porque el switch es
considerado un mal olor así como de que consta la kata.

En la practica el switch no es necesario.
Porque para cada una de las funcionalidades que aporta suele existir una alternativa que
una vez se interiorizan simplica el código aunque para la gente que está empezando con el
polimorfismo le puede costar un poco más verlo.


Para empezar, voy a explicar como refactorizar el tipico ejemplo que nos muestra cuando vemos
un switch por primera vez. Es un caso muy basico, pero también se puede extrapolar a los maps
o arrays asociativos.

### Switch

```
int n = 1;
String message  = "";

switch (n) {
 case 1: message = "I am not an array ";
 break;
 case 2: message = "But I behave as one";
 break;
 case 3: message = "I do not know what to do with my life";
 break;
}
System.out.print(message);
```

### Array
```
int n = 1;
String message = "";

String [] vector = {"I am an array", "And I behave as one ", "everything makes sense"};
message = vector[n];
System.out.print(message);
```

> Aquí podéis empezar a ver el problema de los switch.
Con ellos lo que hacemos controlar los estados. Es decir, en el switch comprobamos si n es 1
y en consecuencia retornamos un valor en cambio cuando usamos una array no hay que comprobar
porque n es 1, ya tiene dentro por el simple hecho de ser 1, toda la información que el array necesita.

Vale, recordad este concepto.



Ahora el problema que da origen a esta kata. Cuando en cada cases tenemos métodos o estructuras distintas.

Lo que más duele del switch y así aprovecho para meter un nuevo concepto es que rompe
de una manera bastante bestia el segundo principio de SOLID el open/close

> **Open-Closed Principle / Principio Abierto-Cerrado**
> **Vuestro código debe permitir extensiones pero no modificaciones.**


No quiero meterme mucho en el tema de SOLID porque es largo de explicar.
Simplemente aclarar, que para añadir una nueva funcionalidad a nuestra aplicación
que tenga relación con lo que estáis comparando en el switch a la fuerza hay volver
a modificar el código escrito con anterioridad.


Como tantas cosas en la programación esto se ve mucho mejor programando que intentado explicarlo con
palabras así que empiezo a explicar la kata(ejercicio de programación).

> [https://github.com/jonayGodoy/Kata-Gilded-Rose-Switch](https://github.com/jonayGodoy/Kata-Gilded-Rose-Switch)

Cuando entráis a la kata tanto si es la versión en Java o en Javascript teneís un código
que ya funciona y unas carpetas de test.También tenéis la solución en la carpeta "solution" por
si tenéis problemas.Cualquier duda podéis comentarla.


## Para instalar
- La versión de java tiene el pom.xml para instalar las dependencias si usais maven o
podéis descargaros las librerías
    - [Junit](https://mvnrepository.com/artifact/junit/junit/4.10)
    - [Hamcrest Core](https://mvnrepository.com/artifact/org.hamcrest/hamcrest-core/1.3)

- Para la versión de javascript bastara con hacer

	``` npm install```

- y para correr los test en consola

	``` npm run test```

Recomiendo, la versión de java si teneís problemas con el Polimorfismo.
La herencia en javascript tiene distintos estilos y todos pueden muy buenos por lo que
preferiría que aunque no fuera java usarais un lenguaje de lado sevidor (node no cuenta).
Pero si por vuestro contexto preferís hacerlo en javascript de acuerdo pero sé consiente
de que tiene una dificultad añadida.

## Test

La kata está enfocada para hacerse con los test
que os darán feedback inmediato cuando rompáis una funcionalidad del código. También
podéis construir vuestro propio arnés de seguridad antes para practicar los test o simplemente
pasar de los test y imprimir los resultados por consola como esteís más comodos.


## El problema principal eliminar el switch

 
Básicamente tenéis un ítem y dependiendo de como se llame (o que tipo de ítem sea)
ejecutara un código o otro. Tenéis la [explicacion de que hace cada ítem en github](https://github.com/jonayGodoy/Kata-Gilded-Rose-Switch#gilded-rose-switch-1)
La idea principal es refactorizar este switch con polimorfismo. Tenéis libertad para
crear las clases que creáis necesarias. Una vez logrado esto tendréis que añadir una nueva
funcionalidad alterando nada o prácticamente nada la clase GildedRoseSwitch.

```Java
package issue;

class GildedRoseSwitch {
    private ítem[] ítems;

     GildedRoseSwitch(ítem[] ítems) {
        this.ítems = ítems;
    }

     void updateQuality() {
        for (ítem ítem : ítems) {
         switch (ítem.getName()){
             case "Aged Brie":
                if(ítem.getSellIn() >= 0){
                    if(ítem.getQuality() < 50) {ítem.setQuality(ítem.getQuality() + 1);}
                }else{
                    updateítemGenericQuality(ítem);
                }
                 break;
             case "Sulfuras, Hand of Ragnaros":
                 if(ítem.getQuality() != 80){
                     ítem.setQuality(80);
                 }
                 ítem.setSellIn(ítem.getSellIn()-1);
                 break;
             case "Backstage passes to a TAFKAL80ETC concert":
                 ítem.setSellIn(ítem.getSellIn()-1);

                 if(ítem.getSellIn() <= 0){
                     ítem.setQuality(0);
                 }else {
                     if (ítem.getSellIn() <= 5) {
                         if (ítem.getQuality() < 50) {
                             ítem.setQuality(ítem.getQuality() + 3);
                         }
                     } else if (ítem.getSellIn() <= 10) {
                         if (ítem.getQuality() < 50) {
                             ítem.setQuality(ítem.getQuality() + 2);
                         }
                     }
                 }
                 break;
             default:
                 ítem.setSellIn(ítem.getSellIn()-1);
                 updateítemGenericQuality(ítem);
                 break;
         }
        }
    }

    private void updateítemGenericQuality(ítem ítem) {
        if(ítem.getQuality() > 0){
            if(ítem.getSellIn() <= 0){
                ítem.setQuality(ítem.getQuality()-2);
                }else{ítem.setQuality(ítem.getQuality()-1);}
        }
    }
}
```

<details>
<summary>Spolier no queréis ver la solución pero estáis muy pero que muy perdidos. Aquí tenéis unas buenas pistas.</summary>
    <details>
        <summary> 
         Estás seguro de que quieres verlo, luego no hay vuelta atrás
        ¿Por qué no lo intentas un poco más?
        </summary>
        <ul>
           <li>El primer paso olvidaos que teneís diferentes ítems. Empezar a programar con uno solo, es decir solo
           con el comportamiento base.
           <li>Borrar el switch ya que no teneis varios ítems ya no lo necesitáis.
           <li>A continuación, crear un método updateítem en el ítem y mover el comportamiento base al método.
           <li>Tiene sentido es mejor que el ítem tenga la responsabilidad de como se actualiza.
           <li>Ahora gilde rose simplemente recorrerá los ítems y los mandará a actualizar.
           <li>Por último crear una clase una clase que herede de ítem. Como por ejemplo AgeBrie.
           <li>¿Qué pasará ahora si sobrescribes el método updateítem con el comportamiento de Age Bried y después lo metes en la lista de ítems?
        </ul>
      
   </details>
</details>


### Mis Conclusiones
En la practica, yo hice el ejercicio de nunca usar el switch y hoy en día
continuo siguiendo esta regla, mi código desde entonces es más limpio sobretodo
 he conseguido aprovechar bastante mejor la potencia de la [POO](https://es.wikipedia.org/wiki/Programaci%C3%B3n_orientada_a_objetos).
  Aunque como todo hay casos limite donde lo sigo usando. Por ejemplo, cuando tengo una
tecnología o una arquitectura donde ya viene estandarizado, como con
[RabbitMq](https://es.wikipedia.org/wiki/RabbitMQ) un gestor de colas que utiliza
 una variable tipo para diferenciar, una cola de otra, como resultado consigue
evitar cualquier acoplamiento, es decir, le da igual que información le pases
y en que formato se la pase siempre que la asocies a una key. Como resultado,
puede trasmitir mensajes entre distintos lenguajes. Pero como digo
son casos limites.

 
Espero que la kata os ayude a avanzar un poco más en vuestro camino del aprendizaje y
me encanta recibir feeback por lo que si tienes una opinion distinta o piensa que
deberia cambiar cualquier cosa o para lo que necesites deja un comentario estoy deseando escucharlo. 
