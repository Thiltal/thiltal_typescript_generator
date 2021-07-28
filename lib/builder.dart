import 'package:build/build.dart';
import 'package:source_gen/source_gen.dart';
import 'package:typescript_generator/src/typescript_generator.dart';

Builder typescriptReporter(BuilderOptions options) =>
    LibraryBuilder(TypescriptGenerator(), formatOutput: (String input) {
      return """
      import {UnitTypeName} from './unit/types.g';
      import {ImageName} from './unit/images.g';
      import {ItemName} from './unit/items.g';
      """ + input;
    }, generatedExtension: '.ts');
