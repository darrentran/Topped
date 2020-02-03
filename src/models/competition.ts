var currentDate = new Date().toJSON();
var statusEnum = Object.freeze({ active: 1, completed: 2, not_started: 3 });

export default class Competition {
    id: string;
    name: string;
    desc: string;
    startDate: string;
    endDate: string;
    fee: string;
    problems: string;
    status: number;
    admins: string;

    constructor(
        id: string,
        name: string,
        desc: string,
        startDate: string,
        endDate: string,
        problems: string,
        fee: string,
        admins: string,
    ) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.startDate = startDate;
        this.endDate = endDate;
        this.fee = fee;
        this.problems = problems;
        if (currentDate > this.startDate && currentDate < this.endDate) {
            this.status = statusEnum.active;
        } else {
            this.status = statusEnum.not_started;
        }
        this.admins = admins;
    }
}
