import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const ROOT = resolve(process.cwd());
const SOURCE_PATH = resolve(ROOT, 'ede.js');
const TARGET_PATH = resolve(ROOT, 'ede.lite-v1.js');
const PROFILE_HEADER = "globalThis.__EDE_BUILD_PROFILE__ = 'lite-v1';\n";

async function main() {
    const source = await readFile(SOURCE_PATH, 'utf8');
    const stripped = source.replace(/^globalThis\.__EDE_BUILD_PROFILE__\s*=.*\n/, '');
    const liteSource = `${PROFILE_HEADER}${stripped}`;
    await writeFile(TARGET_PATH, liteSource, 'utf8');
    console.log(`Generated ${TARGET_PATH}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
