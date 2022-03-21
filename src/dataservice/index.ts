import dbInterface from "../database";
import {Actor, Just, Task, Many, Status} from "./types";
import config from "../config";

class ActorService {
    constructor(readonly schema: string) {
    }

    async getActors(): Promise<Many<Actor>> {
        return new Promise<Many<Actor>>((resolve, reject) => {
            dbInterface.query(
                `select id, name
                 from ${this.schema}.actors`,
                [])
                .then(rs => {
                    resolve(new Many<Actor>(
                        200,
                        rs.rows.map(row => {
                            return new Actor(row.id, row.name);
                        })));
                }).catch(err => {
                // tslint:disable-next-line:no-console
                console.log("actors error", err);
                return reject(new Many(500, []));
            });
        });
    }

    async getActor(id: string): Promise<Just<Actor>> {
        return new Promise<Just<Actor>>((resolve, reject) => {
            dbInterface.query(
                `select id, name
                 from ${this.schema}.actors
                 where id = $1`,
                [id])
                .then(rs => {
                    if (rs.rows.length > 0) {
                        resolve(new Just<Actor>(
                            200,
                            new Actor(rs.rows[0].id, rs.rows[0].name)
                        ));
                    } else {

                    }
                }).catch(err => {
                // tslint:disable-next-line:no-console
                console.log("actor error", err);
                reject(new Just<Actor>(500, undefined));
            });
        });
    }

    async getTasks(actor: string): Promise<Many<Task>> {
        return new Promise<Many<Task>>((resolve, reject) => {
            let dbPromise;
            if (actor === "") {
                dbPromise = dbInterface.query(
                    `select title,
                            description,
                            created,
                            due_date,
                            assignee
                     from ${this.schema}.tasks`,
                    []);
            } else {
                dbPromise = dbInterface.query(
                    `select title,
                            description,
                            created,
                            due_date,
                            assignee
                     from ${this.schema}.tasks
                     where assignee = $1`,
                    [actor]);
            }
            dbPromise
                .then(rs => {
                    resolve(
                        new Many<Task>(200,
                            rs.rows.map(row => {
                                return new Task(
                                    row.title, row.description, row.created, row.due_date, row.assignee);
                            })));
                }).catch(err => {
                // tslint:disable-next-line:no-console
                console.log("task list", err);
                reject(new Many<Task>(500, []));
            });
        });
    }

    async health(): Promise<Just<Status>> {
        return new Promise<Just<Status>>((resolve, reject) => {
            dbInterface.query("SELECT $1::text as message", ["Ok"])
                .then(rs => {
                    resolve(
                        new Just<Status>(200,
                            new Status("UP", rs.rows[0].message)));
                }).catch(err => {
                reject(
                    new Just<Status>(500,
                        new Status("DOWN", "query failed")));
            });
        });
    }
}


const cleanup = async (typeName: string, code: number) => {
    await dbInterface.end();
    // tslint:disable-next-line:no-console
    console.log("type", typeName, "code ", code);
    process.exit(code);
};

["exit", "SIGINT", "SIGTERM", "SIGUSR1", "SIGUSR2"].forEach(eventName => {
    process.on(eventName, cleanup);
});

const actorService = new ActorService(config.databaseSchema());
export default actorService;