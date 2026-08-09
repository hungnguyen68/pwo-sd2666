import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'csv-parse/sync';

export class CSVHelper {
    static readCSVFile(fileName: string): any[] {
        const records = parse(fs.readFileSync(path.join(path.resolve(__dirname, '../../'), `test-data/${fileName}`)), {
            columns: true,
            skip_empty_lines: true
        });
        return records;
    }
}