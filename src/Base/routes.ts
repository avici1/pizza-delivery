import express from 'express';

export abstract class BaseRoute {
    protected app: express.Application;
    private name: string;
    constructor(app: express.Application, name: string) {
        this.app = app;
        this.name = name;
        this.initRoutes();
    }
    public getName(): string { 
        return this.name;
    }

    abstract initRoutes(): express.Application;
 }