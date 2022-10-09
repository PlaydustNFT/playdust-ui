import { green, red, StyleFunction, symbols, yellow } from 'ansi-colors';
import fg from 'fast-glob';
import { exit } from 'process';
import type FileMetaType from '../_types/FileMetaType';
import getFileMeta from './getFileMeta';
import makeValidateStructure from './makeValidateStructure';
import safePromise from './safePromise';
import validateCurrentLocation from './validateCurrentLocation';
import validateExport from './validateExport';
import validateFileContent from './validateFileContent';
import validateNoCircularDeps from './validateNoCircularDeps';
import validateNoUnusedFiles from './validateNoUnusedFiles';
import validateUniqueFileNames from './validateUniqueFileNames';
import warnHelperToAtom from './warnHelperToAtom';
import warnSingleUse from './warnSingleUse';

type ValidationPipelineType = {
  label: string;
  validator: (files: FileMetaType[]) => string[];
  warningsOnly?: boolean;
  skipOnPrevErrors?: boolean;
}[];

const basePipeline = [
  {
    label: 'duplicate file name',
    validator: validateUniqueFileNames,
  },
  {
    label: 'unused file',
    validator: validateNoUnusedFiles,
  },
  {
    label: 'invalid current location',
    validator: validateCurrentLocation,
  },
  {
    label: 'circular dependencies',
    validator: validateNoCircularDeps,
  },
  {
    label: 'incorrect export',
    validator: validateExport,
  },
  {
    label: 'invalid file content',
    validator: validateFileContent,
  },
  {
    label: 'single use',
    validator: warnSingleUse,
    warningsOnly: true,
  },
  {
    label: 'helper to selector',
    validator: warnHelperToAtom,
    warningsOnly: true,
  },
];

const getValidateStructure = (write: boolean) => ({
  label: 'Incorrect path',
  validator: makeValidateStructure(write),
  skipOnPrevErrors: true,
});

const validationCheckPipeline = [...basePipeline, getValidateStructure(false)];
const validationWritePipeline = [...basePipeline, getValidateStructure(true)];

interface LabelWarningType {
  label: string;
  message: string;
}

interface PipelineResultsType {
  errors: LabelWarningType[];
  warnings: LabelWarningType[];
}

const tab = '  ';
const makePrintMessage =
  (color: StyleFunction, symbol: string) => (messages: LabelWarningType[]) => {
    const message = [
      ...messages.map(
        (entry) =>
          `${tab}(${color(symbol)}) ${color.bold(entry.label)}: ${entry.message
            .split('\n')
            .join(`\n${tab}${tab}${tab}${tab}`)}`
      ),
    ].join('\n');

    console.log(message);
  };

const printErrorHeader = () => console.log(red.bold('Errors: '));
const printErrors = makePrintMessage(red, symbols.cross);
const printWarningHeader = () => console.log(yellow.bold('Warnings: '));
const printWarnings = makePrintMessage(yellow, symbols.warning);
const printErrorSummary = (errorLength: number) =>
  console.log(
    `\n(${red.bold(
      symbols.cross
    )}) ${errorLength} errors validating against playdust code guidelines`
  );
const printSuccessSummary = () =>
  console.log(
    `${green.bold('Success')} (${green(
      symbols.check
    )}): All matched files adhere to playdust code guidelines!`
  );

const runPipeline = async (write: boolean) => {
  const paths = await fg(['src/App/**']);
  const files = getFileMeta(paths);

  const pipeline: ValidationPipelineType = write
    ? validationWritePipeline
    : validationCheckPipeline;

  const pipelineResults = pipeline.reduce<PipelineResultsType>(
    (acc, { label, validator, warningsOnly, skipOnPrevErrors }) => {
      if (skipOnPrevErrors && acc.errors.length) {
        return acc;
      }

      const results: LabelWarningType[] = validator(files).map((message) => ({
        message,
        label,
      }));

      if (results.length) {
        if (warningsOnly) {
          return {
            ...acc,
            warnings: [...acc.warnings, ...results],
          };
        }

        return {
          ...acc,
          errors: [...acc.errors, ...results],
        };
      }

      return acc;
    },
    { errors: [], warnings: [] }
  );

  if (pipelineResults.errors.length) {
    printErrorHeader();
    printErrors(pipelineResults.errors);
  }

  if (pipelineResults.warnings.length && !write) {
    printWarningHeader();
    printWarnings(pipelineResults.warnings);
  }

  if (pipelineResults.errors.length) {
    printErrorSummary(pipelineResults.errors.length);
    exit(1);
  }

  if (write) {
    // Run read pipeline after writing
    safePromise(runPipeline(false));
  } else {
    printSuccessSummary();
  }
};

export default runPipeline;
