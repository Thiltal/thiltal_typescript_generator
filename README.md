# Typescript generator

Typescript generator is lightweight tool for generate typescript declarations for json serializable classes.
It tooks just a data format without any functionality. It's meant to be used for quick and correct creation of
json files consumable by json serializable classes. It is better than json templates because you can use any
typescript tools to compose output data object. It was originally meant to be used as a map editor for the Boardytale game.

Designed usage is to create ts file with exported data property:

    export let data: TaleEnvelope = { ... }

To have dart class with annotations:

    @Typescript()
    @JsonSerializable()
    class TaleEnvelope { ... }

Using this library to have generated ts declaration:

    export interface TaleEnvelope extends Object { ... }

Compile, run, serialize data to json. One way to do it is dynamic import from ts file. More is in example folder:

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

To make it working you need annotations in target package:
   
    dependencies:
      thiltal_typescript_reporter: any

    dev_dependencies:
      thiltal_typescript_generator: any

    pub run build_runner build --delete-conflicting-outputs && prettier --write "**/*.ts"

Prettier is suggested, but not necessary. It works started via npm.

Originally it is used with json_serializable (build.yaml in examples)