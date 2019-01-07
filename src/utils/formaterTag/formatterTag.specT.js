/*
import {TAGS_CONST} from "./formatterTags"
import formatter from "./formatterTags"

describe("Formatter Tag",() =>{
    it("return convert raw tags in tag", () => {
        let rawTags = "eventos";

        let tags = formatter.format(rawTags);

        expectDeepEqualsIgnoreCase(tags, [TAGS_CONST.events]);
    });

    it("return convert several tag", () => {
        let rawTags = "eventos,git";

        let tags = formatter.format(rawTags);

        let result = [
            TAGS_CONST.events,
            TAGS_CONST.git
        ];
        expectDeepEqualsIgnoreCase(tags,result);

    });

    it("ignore empty", () => {
        let rawTags = "eventos,";
        let tags = formatter.format(rawTags);

        expectDeepEqualsIgnoreCase(tags,[TAGS_CONST.events]);
    });

    it("return tag with first char in uppercase and the remaining in lowercase", () => {
        let rawTags = "evenTos";

        let tags = formatter.format(rawTags);

        expect(tags).to.deep.equal(["Eventos"]);
    });

    it("throw exception when tags not exit", () => {
        let rawTags = "eventas";

        let rawFunction = () => {formatter.format(rawTags)}

        expect(rawFunction).to.throw("tag \'eventas\' does not exist in const list");
    });

    function expectDeepEqualsIgnoreCase(parameters){
        let sut = parameters.sut;

        for(let key in sut) {
            sut[key] = sut[key].toLowerCase();
        }
        expect(sut).to.deep.equal(parameters.expect);
    }
});

*/
