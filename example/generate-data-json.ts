import * as fs from 'fs';

let basePathData = process.cwd() + '/data';
let basePathJsons = process.cwd() + '/jsons';

function writeJson(filePath, targetPath) {
    import(basePathData + filePath).then((file: any) => {
        if (!file.data) {
            return;
        }
        fs.writeFileSync(targetPath, JSON.stringify(file.data));
    });
}

let walk = (innerPath, currentFolderName) => {
    let currentFolderPath = innerPath;
    if (currentFolderName != null) {
        currentFolderPath += '/' + currentFolderName;
    }
    let indexPath = currentFolderPath + '/index.ts';
    if (fs.existsSync(basePathData + indexPath)) {
        writeJson(indexPath, `${basePathJsons}${innerPath}/${currentFolderName}.json`);
    } else {
        if (!fs.existsSync(basePathJsons + currentFolderPath)) {
            fs.mkdirSync(basePathJsons + currentFolderPath);
        }
        let list = fs.readdirSync(basePathData + currentFolderPath);
        list.forEach((entityName) => {
            let entityPath = currentFolderPath + '/' + entityName;
            let stats = fs.statSync(basePathData + entityPath);
            if (stats.isDirectory()) {
                walk(currentFolderPath, entityName);
            }
            let entityNameWithoutExtension = entityName.replace('.ts', '');
            if (entityName.substr(entityName.length - 3) === '.ts' && stats.isFile()) {
                writeJson(entityPath, `${basePathJsons}${innerPath}/${currentFolderName}/${entityNameWithoutExtension}.json`);
            }
        });
    }
};
walk('', 'tales');
walk('', 'images');
walk('', 'units');
walk('', 'items');
walk('', 'heroes');
