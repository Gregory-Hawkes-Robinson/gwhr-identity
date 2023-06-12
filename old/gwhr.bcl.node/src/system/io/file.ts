import buffer from "buffer";
import fs from "fs";
import path from "path";

export class File {
    public static async readAllTextAsync(filePath: string): Promise<string> {
        //console.log("filePath:", filePath);
        const file: buffer.Buffer = await fs.promises.readFile(path.resolve(filePath));
        const value:string = file.toString();
        return value;
    }

    public static readAllText(filePath: string): string {
        const file: buffer.Buffer = fs.readFileSync(filePath);
        return file.toString();
    }

    public static async readAsync(filePath: string): Promise<buffer.Buffer> {
        const file: buffer.Buffer = await fs.promises.readFile(path.resolve(filePath));
        return file;
    }
}