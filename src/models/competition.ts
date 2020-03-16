var currentDate = new Date();
var statusEnum = Object.freeze({ active: 1, completed: 2, not_started: 3 });

export default class Competition {
    id: string;
    name: string;
    desc: string;
    startDate: Date;
    startTime: Date;
    endTime: Date;
    fee: number;
    problems: number;
    status: number;
    admins: string;

    constructor(
        id: string,
        name: string,
        desc: string,
        startDate: Date,
        startTime: Date,
        endTime: Date,
        fee: number,
        problems: number,
        admins: string,
    ) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.startDate = startDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.fee = fee;
        this.problems = problems;
        if (currentDate.setHours(0, 0, 0, 0) === this.startDate.setHours(0, 0, 0, 0)) {
            this.status = statusEnum.active;
        } else {
            this.status = statusEnum.not_started;
        }
        this.admins = admins;
    }
}
