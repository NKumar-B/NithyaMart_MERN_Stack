import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "..");

const projects = [
  "BAG",
  "BOOK",
  "CHOCOLATES",
  "COSTUMES",
  "FOOD",
  "FRAGRANCE",
  "ICECREAMS",
  "SHOES",
  "SPORTS",
  "TICKETBOOKING"
];

function copyDirectory(source, destination) {
  fs.mkdirSync(destination, { recursive: true });

  for (const item of fs.readdirSync(source, { withFileTypes: true })) {
    const src = path.join(source, item.name);
    const dest = path.join(destination, item.name);

    if (item.isDirectory()) {
      copyDirectory(src, dest);
    } else {
      fs.copyFileSync(src, dest);
    }
  }
}

function buildProject(project) {
  const projectDir = path.join(ROOT, project);

  if (!fs.existsSync(projectDir)) {
    console.log(`❌ ${project} folder not found`);
    return;
  }

  console.log("\n=======================================");
  console.log(`🚀 Building ${project}`);
  console.log("=======================================\n");

  execSync("npm install", {
    cwd: projectDir,
    stdio: "inherit",
  });

  execSync("npm run build", {
    cwd: projectDir,
    stdio: "inherit",
  });

  const dist = path.join(projectDir, "dist");

  if (!fs.existsSync(dist)) {
    throw new Error(`${project} build failed. dist folder not found.`);
  }

  const target = path.join(ROOT, "public", project);

  if (fs.existsSync(target)) {
    fs.rmSync(target, {
      recursive: true,
      force: true,
    });
  }

  copyDirectory(dist, target);

  console.log(`✅ Copied ${project} → public/${project}`);
}

console.clear();

console.log("=======================================");
console.log(" NITHYA MART MULTI PROJECT BUILD");
console.log("=======================================\n");

for (const project of projects) {
  buildProject(project);
}

console.log("\n=======================================");
console.log("🚀 Building Main Portal");
console.log("=======================================\n");

execSync("npm run build", {
  cwd: ROOT,
  stdio: "inherit",
});

console.log("\n=======================================");
console.log("🎉 ALL PROJECTS BUILT SUCCESSFULLY");
console.log("=======================================\n");