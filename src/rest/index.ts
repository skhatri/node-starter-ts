import express, {Express} from "express";
import actorService from "../dataservice";

const routerInstance = (router: express.Router) => {

    router.get("/tasks", async (req, res) => {
        const result = await actorService.getTasks("");
        res.status(result.status).json(result.data);
    });

    router.get("/actors", async (req, res) => {
        const result = await actorService.getActors();
        res.status(result.status).json(result.data);
    });

    router.get("/actors/:actor", async (req, res) => {
        const actor = req.params.actor;
        const result = await actorService.getActor(actor);
        res.status(result.code).json(result.data);
    });

    router.get("/actors/:actor/tasks", async (req, res) => {
        const actor = req.params.actor;
        const result = await actorService.getTasks(actor);
        res.status(result.status).json(result.data);
    });

    router.get("/health", async (req, res) => {
        const result = await actorService.health();
        res.status(result.code).json({status: result.data.status, message: result.data.message});
    });
    return router;
};

class RestConfig {
    constructor(public readonly app: Express, public readonly path: string) {
    }
}

class RestConfigurer {
    configure(restConfig: RestConfig) {
        restConfig.app.use(restConfig.path, routerInstance(express.Router()));
    }
}

const rest = new RestConfigurer();
export {rest};
