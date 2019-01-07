
import React from 'react';
import cv from "./cvDTO";
import formatted from "./convert/formatterToMilestone"

import profilePicture from '../../assets/img/conoceme.png';

import './conoceme.css';
import './timeLine.css'

const milestones = formatted.linkedinToMilestone(cv);

function IsPar(n){
    return (n % 2 === 0);
}

class AboutMePage extends React.Component {
    render () {
        return(<main>
                <section className="introduction-cv">
                    <div className="details-cv">
                        <div className="name-cv">
                            Jonay Eliezer Godoy Reyes
                        </div>
                        <div>Nací en Gran canaria en 1991.</div>
                        <p>
                            Empecé a programar en C.I.F.P. Villa de Agüimes, poco despues
                            de terminar mi primer ciclo superior descubrí a la comunidad de
                            software craftsmanship de Gran canaria.Gracias a ellos redescubrí
                            la programación y me di cuenta de todo lo que me quedaba por aprender.
                            Tras ello, tuve la oportunidad de hacer las practicas con Carlos Blé.
                        </p>
                        <p>
                            En parte, para agradecer todo lo que la comunidad me ha ayudado a crecer.
                            He impartido cursos de TDD, clases en centros educativos, he organizado
                            el global coderetreat y he sido voluntario en la asociación canaria
                            desarrolladores de videojuegos.
                        </p>
                        <p>
                            A finales de 2017 buscando nuevas aventuras decido
                            trasladarme a Madrid para trabajar en SaludOnNet.
                        </p>
                    </div>
                    <div className="profilePicture" style={{ backgroundImage: `url(${profilePicture})`}}/>
                </section>
                <section>
                    <ul className="timeline">
                        {
                            milestones.map((milestone, index) => {
                                return (

                                            <li key={index}>
                                                <div className={IsPar(index) ? "direction-r" : "direction-l" }>
                                                    <div className="flag-wrapper">
                                                        <div className="flag">{milestone.milestoneType}</div>
                                                        <span className="flag">{milestone.title}</span>
                                                        <span className="time-wrapper">
                                                            <span className="time">{milestone.date}</span>
                                                        </span>
                                                    </div>
                                                    <div className="desc">{milestone.summary}</div>
                                                </div>
                                            </li>
                                      )
                            })
                        }
                    </ul>
                </section>
            </main>
        );
    }
}

export default AboutMePage

