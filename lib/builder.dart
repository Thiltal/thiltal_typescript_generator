import 'package:build/build.dart';
import 'package:source_gen/source_gen.dart';
import 'package:thiltal_typescript_generator/src/typescript_generator.dart';

Builder typescriptReporter(BuilderOptions options) =>
    LibraryBuilder(TypescriptGenerator(), formatOutput: (String input) {
      return """
      ${options.config["first"]}
      """ + input;
    }, generatedExtension: '.ts');
