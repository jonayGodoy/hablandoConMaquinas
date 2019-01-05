/*
import { expect } from "chai";
import formatter from "./formatterToMilestone";

describe("convert linkedin entities to milestone",() =>{
    it("convert work in milestone", () =>{
        let cv = {
            "work": [
            {
                "company": "Codesai",
                "position": "Alumno Practicas",
                "website": "",
                "startDate": "2017-03-01",
                "summary": "-Aprender. A través de practicas como mob-programming, libros, cursos e implementando\nfuncionalidades en algunos proyectos siempre buscando hacerlo de le mejor manera posible.\nAsi como metodologias como integración continua y TDD\n-Las tecnologías que utilizamos fueron javascript, react-redux y springboot(java). Asi como\nherramientas complementarias para testear Jest, mocha, junit, selenium.",
                "highlights": [],
                "endDate": "2017-06-01"
            }]
        };

        let milestone =
             [
                {
                    "milestoneType":"Experiencia",
                    "title":  first(cv.work).company+" "+first(cv.work).position,
                    "date": first(cv.work).startDate,
                    "summary": first(cv.work).summary.substring(0,150)+"...",
                    "description" : first(cv.work).summary
                }
            ];

        expect(formatter.linkedinToMilestone(cv))
            .to.deep.equal(milestone);
    });

    it("return empty when work is undefined", () =>{
        let work = {};
        let milestone = [];

        expect(formatter.linkedinToMilestone(work))
            .to.deep.equal(milestone);
    });

    it("convert education in milestone", () =>{
        let cv = {
            "education": [
                {
                    "institution": "CIFP Villa de Agüimes",
                    "area": "",
                    "studyType": "Técnico Superior En Desarrollo De Aplicaciones Multiplataforma",
                    "startDate": "2013-01-01",
                    "gpa": "",
                    "courses": [],
                    "endDate": "2016-01-01"
                }]
    };
    let milestone =
        [
            {
                "milestoneType":"Estudios",
                "title": first(cv.education).studyType,
                "date": first(cv.education).startDate,
                "summary": "",
                "description" : ""
            }
        ];


    expect(formatter.linkedinToMilestone(cv))
        .to.deep.equal(milestone);
    });

    it("return empty when education is undefined", () =>{
        let cv = {};
        let milestone = [];

        expect(formatter.linkedinToMilestone(cv))
            .to.deep.equal(milestone);
    });

    it("convert honors awards in milestone", () =>{
        let cv = {
            "honors_awards": [
                {
                    "Title": "Ganador de segundo puesto en el HackForGood 2017 en Las Palmas con el proyecto Amidi",
                    "Description": "HackForGood es un evento promovido por Telefónica y organizado junto a la ETSI de Telecomunicación de la Universidad Politécnica de Madrid, la Fundación HazloPosible y la startup MashmeTV con el apoyo de la Red de Cátedras Telefónica en el que Hackers ForGood de toda España proponen retos y desarrollan soluciones para construir un mundo mejor.",
                    "Issuer": "Fundación Parque Cientifico Tecnologico de la ULPGC",
                    "Issue_Date": "3/2017"
                }]
    };

    let milestone =
        [
            {
                "milestoneType":"Premios y otros",
                "title": first(cv.honors_awards).Title,
                "date": "2017-03",
                "summary": first(cv.honors_awards).Description.substring(0,150)+"...",
                "description" : first(cv.honors_awards).Description
            }
        ];


    expect(formatter.linkedinToMilestone(cv))
        .to.deep.equal(milestone);
    });

    it("convert differents awards in milestones", () =>{
        let cv = {
            "education": [
                {
                    "institution": "CIFP Villa de Agüimes",
                    "area": "",
                    "studyType": "Técnico Superior En Desarrollo De Aplicaciones Multiplataforma",
                    "startDate": "2013-01-01",
                    "gpa": "",
                    "courses": [],
                    "endDate": "2016-01-01"
                }],
            "honors_awards": [
                {
                    "Title": "Ganador de segundo puesto en el HackForGood 2017 en Las Palmas con el proyecto Amidi",
                    "Description": "HackForGood es un evento promovido por Telefónica y organizado junto a la ETSI de Telecomunicación de la Universidad Politécnica de Madrid, la Fundación HazloPosible y la startup MashmeTV con el apoyo de la Red de Cátedras Telefónica en el que Hackers ForGood de toda España proponen retos y desarrollan soluciones para construir un mundo mejor.",
                    "Issuer": "Fundación Parque Cientifico Tecnologico de la ULPGC",
                    "Issue_Date": "3/2017"
                }]
        };

        let milestone =
            [
                {
                    "milestoneType":"Premios y otros",
                    "title": first(cv.honors_awards).Title,
                    "date": "2017-03",
                    "summary": first(cv.honors_awards).Description.substring(0,150)+"...",
                    "description" : first(cv.honors_awards).Description
                },
                {
                    "milestoneType":"Estudios",
                    "title": first(cv.education).studyType,
                    "date": first(cv.education).startDate,
                    "summary": "",
                    "description" : ""
                }
            ];

        const result = formatter.linkedinToMilestone(cv);

        expect(milestone.length).to.equal(2);
        expect(milestone).to.deep.equal(result);
    });

    it("return empty when honors_awards is undefined", () =>{
        let honors_awards = {};
        let milestone = [];

        expect(formatter.linkedinToMilestone(honors_awards))
            .to.deep.equal(milestone);
    });

    it("format date", () =>{
        let cv = {
            "work": [
                {
                    "company": "Codesai",
                    "position": "Alumno Practicas",
                    "website": "",
                    "startDate": "2017-03-01",
                    "summary": "-Aprender. A través de practicas como mob-programming, libros, cursos e implementando\nfuncionalidades en algunos proyectos siempre buscando hacerlo de le mejor manera posible.\nAsi como metodologias como integración continua y TDD\n-Las tecnologías que utilizamos fueron javascript, react-redux y springboot(java). Asi como\nherramientas complementarias para testear Jest, mocha, junit, selenium.",
                    "highlights": [],
                    "endDate": "2017-06-01"
                }],
            "honors_awards": [
                {
                    "Title": "Ganador de segundo puesto en el HackForGood 2017 en Las Palmas con el proyecto Amidi",
                    "Description": "HackForGood es un evento promovido por Telefónica y organizado junto a la ETSI de Telecomunicación de la Universidad Politécnica de Madrid, la Fundación HazloPosible y la startup MashmeTV con el apoyo de la Red de Cátedras Telefónica en el que Hackers ForGood de toda España proponen retos y desarrollan soluciones para construir un mundo mejor.",
                    "Issuer": "Fundación Parque Cientifico Tecnologico de la ULPGC",
                    "Issue_Date": "3/2017"
                }]
        };

        const milestones = formatter.linkedinToMilestone(cv);

        expect(milestones[0].date).to.equal("2017-03");
        expect(milestones[1].date).to.equal("2017-03-01");
    });


    it("milestones ordered by date from highest to lowest", () =>{
        let cv = {
            "education": [
                {
                    "institution": "CIFP Villa de Agüimes",
                    "area": "",
                    "studyType": "Técnico Superior En Desarrollo De Aplicaciones Multiplataforma",
                    "startDate": "2013-01-01",
                    "gpa": "",
                    "courses": [],
                    "endDate": "2016-01-01"
                }],
            "work": [
                {
                    "company": "Codesai",
                    "position": "Alumno Practicas",
                    "website": "",
                    "startDate": "2017-03-01",
                    "summary": "-Aprender. A través de practicas como mob-programming, libros, cursos e implementando\nfuncionalidades en algunos proyectos siempre buscando hacerlo de le mejor manera posible.\nAsi como metodologias como integración continua y TDD\n-Las tecnologías que utilizamos fueron javascript, react-redux y springboot(java). Asi como\nherramientas complementarias para testear Jest, mocha, junit, selenium.",
                    "highlights": [],
                    "endDate": "2017-06-01"
                }],
            "honors_awards": [
                {
                    "Title": "Ganador de segundo puesto en el HackForGood 2017 en Las Palmas con el proyecto Amidi",
                    "Description": "HackForGood es un evento promovido por Telefónica y organizado junto a la ETSI de Telecomunicación de la Universidad Politécnica de Madrid, la Fundación HazloPosible y la startup MashmeTV con el apoyo de la Red de Cátedras Telefónica en el que Hackers ForGood de toda España proponen retos y desarrollan soluciones para construir un mundo mejor.",
                    "Issuer": "Fundación Parque Cientifico Tecnologico de la ULPGC",
                    "Issue_Date": "3/2017"
                }]
        };

        const milestones = formatter.linkedinToMilestone(cv);

        expect(milestones[2].title).to.equal(first(cv.education).studyType);
        expect(milestones[1].title).to.equal(first(cv.work).company+" "+first(cv.work).position);
        expect(milestones[0].title).to.equal(first(cv.honors_awards).Title);

    });
});

function first(array){
    return array[0];
}
*/
