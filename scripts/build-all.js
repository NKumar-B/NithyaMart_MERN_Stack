import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "..");

const projectDirs = {
  BAG: "BAG",
  BOOK: "BOOK",
  CHOCOLATES: "CHOCOLATES",
  COSTUMES: "COSTUMES",
  FRAGRANCE: "FRAGRANCE",
  Foood: "Foood/Foood",
  IceCreams: "IceCreams/client",
  SPORTS: "SPORTS",
  Shoes: "Shoes",
  TICKETBOOKING: "TICKETBOOKING"
};

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

function buildProject(projectName) {
  const relativePath = projectDirs[projectName] || projectName;
  const projectDir = path.join(ROOT, relativePath);

  if (!fs.existsSync(projectDir)) {
    console.log(`❌ ${projectName} folder not found at ${projectDir}`);
    return;
  }

  console.log("\n=======================================");
  console.log(`🚀 Building ${projectName} (${relativePath})`);
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
    throw new Error(`${projectName} build failed. dist folder not found.`);
  }

  const target = path.join(ROOT, "public", projectName);

  if (fs.existsSync(target)) {
    fs.rmSync(target, {
      recursive: true,
      force: true,
    });
  }

  copyDirectory(dist, target);

  console.log(`✅ Copied ${projectName} → public/${projectName}`);
}

console.clear();

console.log("=======================================");
console.log(" NITHYA MART MULTI PROJECT BUILD");
console.log("=======================================\n");

for (const project of Object.keys(projectDirs)) {
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