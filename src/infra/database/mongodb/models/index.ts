import fs from 'fs'
import path from 'path'
import { Document, Model } from 'mongoose';

let models: any = {};
let modelsLoaded = false;

export type Models = {
    User: Model<Document>,
}

const createModels = (): Models => {
    if (modelsLoaded) return models;
    const modelsList = fs.readdirSync(path.resolve(__dirname, "./"))
        .filter((t) => (~t.indexOf('.ts') || ~t.indexOf('.js')) && !~t.indexOf("index") && !~t.indexOf(".map"))
        .map(item => require(__dirname + '/' + item).default)

    modelsList.forEach(model => {
        models[model.modelName] = model;
    })

    modelsLoaded = true;
    return models;
}

export default createModels();