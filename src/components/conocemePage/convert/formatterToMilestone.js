function FormatterMilestone(){

    function linkedinToMilestone(cv){

        const milestones = convertWorkToMilestone(cv.work)
            .concat(convertEducationToMilestone(cv.education))
            .concat(convertHonorsAwardsToMilestone(cv.honors_awards));

        return orderByDate(milestones);

        function convertWorkToMilestone(work){
            return work ?
                    work.map(x => {
                        return buildMilestone({
                            type : "Experiencia",
                            title : x.company+" "+x.position,
                            date : x.startDate,
                            description : x.summary
                        });
                    })
                : [];
        }
        function buildMilestone(dataForBuild){
            dataForBuild = dataForBuild || {};
            return {
                "milestoneType": dataForBuild.type || "",
                "title" : dataForBuild.title || "",
                "date" : formatDate(dataForBuild.date) || "",
                "summary": dataForBuild.description ? createSummary(dataForBuild.description) : "",
                "description" : dataForBuild.description || ""
            };
            function formatDate(date){
                if(date.includes("/")){
                    return date.split("/")
                        .reverse()
                        .map(x => x >= 10 ? x : "0"+x)
                        .join("-");
                }
                return date;
            }
            function createSummary(string){
                const end = 150;
                return string.substring(0, end) + "...";
            }
        }
        function convertEducationToMilestone(education){
            return education ?
                education.map(x => {
                    return buildMilestone({
                        type : "Estudios",
                        title : x.studyType,
                        date : x.startDate,
                    });
                })
                : [];
        }
        function convertHonorsAwardsToMilestone(honors_awards){
            return honors_awards ?
                honors_awards.map(x => {
                    return buildMilestone({
                        type : "Premios y otros",
                        title : x.Title,
                        date : x.Issue_Date,
                        description: x.Description
                    });
                })
                : [];
        }
        function orderByDate(milestones){
            let preformatForSort = milestones.map(x => (
                {
                    title : x.title,
                    date : preFormatForOrderDate(x.date)
                }
            )).sort(compareDate)
                .reverse();

            return preformatForSort
                .map(x => milestones
                    .filter(y => x.title === y.title)[0]);

            function preFormatForOrderDate(date){
                let year = date.split("-")[0] || "01";
                let month = date.split("-")[1] || "01";
                let day = date.split("-")[2] || "01";
                return Number(year+""+month+""+day);
            }
            function compareDate(a, b){
                return a.date - b.date;
            }
        }
    }

    return {
        linkedinToMilestone : linkedinToMilestone
    }
}


export default FormatterMilestone();