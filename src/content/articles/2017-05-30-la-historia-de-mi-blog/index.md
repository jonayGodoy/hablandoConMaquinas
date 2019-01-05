---
title: La Historia De Mi Blog
date: "2017-05-30T02:40:32.169Z"
path: "/la-historia-de-mi-blog/"
image_article: "image-article.jpg"
tags: "experiencia-personal"
---

Me parecía adecuado escribir como uno de los primeros artículos
blog. Todo el trayecto que tiene mi blog porque aunque me dé algo
de vergüenza estuve aproximadamente 1 año para montarlo.
Si tuviese que buscar una razon diría que me encanta sentirme
cómodo con el entorno que utilizo sobretodo cuando elo que estoy
haciendo es para mi y yo eligo las prioridades.Por lo que en este contexto
si no me siento cómodo le doy 20 mil vueltas hasta que lo consigo
o si no nunca llega a ver la luz.


Como un año es mucho tiempo me gustaría contar mi evolución y
y más concretamente las herramientas he ido descartando hasta
llegar hasta aquí.


## Joomla
En las clases uno de mis profesores me mostró el primer cms con
el que trabaje.

![Joomla](joomla-version.jpg)

Si ya sé cómo vais a descubrir me gustan los blancos y
negros. Joomla me abrió los ojos al problema de los cms hacer
integración continua en estos entornos cuesta una barbaridad.
No tarde mucho en descubrir que una de mis prioridades era poder trastear
con comodidad en mi blog. Las herramientas que encontré después de
mucho buscar para intentar hacer un sistema de integración continua en Joomla
eran complejos de montar y requerían de varias tecnologías bastante trabajndo
juntas.


## WordPress
Un compañero me hablo de las bondades de este cms frente a Joomla
y además la exitencia de un posible plugin de control de versiones y su fama
me llevaron a darle una oportunidad.


![Wordpress](wordpress-version.jpg)

Si, es como el mio pero más bonito como se nota el poder de las plantillas.
La verdad con WordPress tuve una curva de aprendizaje más corta que con Joomla.
Pero como ya me suponía tiene todos los problemas principales que
tenía con Joomla. Aun así preocupandome el tiempo que habia dedicado a tener un blog,
monte un sistema muy lento, básico y sobretodo manual de control
de versiones con el que tardaba en guardar una versión entre
2 y 5 min. Si el que este el leyendo esto y sepa de integración
continua de que tardaba minutos para hacer algo que cuesta segundos.

Me dije a mi mismo vale Jonay ya tienes un blog con el que puedes
trastear es hora de hacer un deploy y el tema de la integración ya lo mejorarás.
Por lo que pase al siguiente paso hacer el deploy.Antes de nada decir que como
todo bien estudiante que se precie escogí un servidor gratuito.


 Como resultado la página era muy lenta. Por otro lado, una
 vez superada la curva de aprendizaje con los deploys en wordpress la cosa
 no mejoro mucho. Quiero decir que para hacer un deploy tenía
 que hacer malabares entre el cambio de dominio de local
 al servidor. Así como pelearme con la base de datos para
 evitar sobrescribir datos de usuarios. Vale nunca tuve
 verdaderos usuarios tenéis razón. Pero en cualquier caso real
 tendría que preparar el sistema para que mis cambios no
 me destrozaran la base de datos. Y creo yo que le hubiese
 hecho chantaje emocional a algún amigo para que se registrara
 eso nunca falla.


## Gastby js, mi entrada en el mundo de los generadores estáticos.

Si es una plantilla hecha a mano tiene ese olorcito especial
del programador novato de frontend.
En esta parte le doy más importancia a mi entrada al mundo de los generadores
estáticos que al hecho de usar Gatsby js.

![Gastby](gastby-version.jpg)


#### - ¿Por qué no Jekyll?
Puede que me cambie y lo utilice. Simplemente aún no he trabajado
 con él. Pense que me seria más comodo la
curva de aprendizaje con algo basado en JavaScript que con
Ruby. Puede que me equivocará.

#### - ¿Por qué no hexo?
Porque los componentes de hexo .ejs son poco legibles y hay muy
poco material con que trabajar.

#### - ¿Por qué Gastby?
Tenía algo de experiencia con React y estaba en JavaScript.
Sí al igual que hexo también tiene un comunidad pequeña.
Pero se nota que a diferencia de hexo el material que hay
de calidad no está en japonés.

## Generadores estáticos

Siendo objetivo todos mis problemas principales que tenía con joomla y
WordPress con los generadores estáticos están curados de serie.
Es puro control de versiones, hago un commit (guardo una
versión) en segundos, puedo depurar en local con un comando
y con otro hacer deploys en menos de 1 minuto.

La página web en muy liviana pesa unos 6MB sin comprimir es rápida
y no nesecita base de datos. Pero Jonay solo tiene 2 artículos.
En WordPress que casi tenia lo mismo pesaba 400MB y ese no es
el problema la verdad que a mí eso no me importa. Lo que importaba
era lo mucho que me ralentizaba la carga de los artículos por las
continuas llamadas a la base de datos fastidiando la experiencia de usuario.

Por supuesto el servidor que tengo a día de hoy es la propia página de github.

## Problemas con los generadores estáticos

- No tienes gestión de usuarios como tal. No tienes bases de datos no puedes
gestionar datos.

- Para tener servicios basicos como comentarios, formularios, etc.
es obligatorio usar herramientas externas como Disqus.

- Hoy por lo que sé es muy complicado de manejar por alguien no iniciado
en la programación o en el control de versiones.
Aunque he visto por encima algunos backend que me dan esperanza
en que más pronto que tarde para blog y landing page se dejen
de usar cms que tiren de base de datos (claro, jonay, lo que tú digas mi niño).


La conclusión a la que llegue despues de todo esto no me gustan los cms que
tiran de bases de datos. Al ser difíciles de modificar, Me dificultan enormemente
integrar cualquier posible mejora en mi trabajo sobretodo una vez puesta en producción
traducido al lenguaje Agile por cada mejora que no puedo integrar
el cliente pierde un factor diferenciador que le distinguiría de la compentecia.




Por ultimo me gustaria agradecerle a Carlos que me diese el último empujón porque
es muy posible que blog no viera la luz del día de
no ser por él y de verla no seria hasta después de bastante tiempo.