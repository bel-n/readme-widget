import fs from "fs";
import path from "path";

function toBase64(filepath: string) {
    const file = fs.readFileSync(filepath);
    return `data:image/png;base64, ${file.toString("base64")}`;
}

export const ASSETS = {
    butterfly: toBase64(path.join(process.cwd(), "public/assets/butterfly.png")),
    messages : toBase64(path.join(process.cwd(), "public/assets/messages.png")),
}

