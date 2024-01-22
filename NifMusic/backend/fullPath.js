import path from "node:path";
import { fileURLToPath } from "url";

let _dirname = ".";
try {
  if (require) {
    _dirname = __dirname;
  } else {
    _dirname = path.dirname(fileURLToPath(import.meta.url));
  }
} catch (e) {
  _dirname = path.dirname(fileURLToPath(import.meta.url));
}

export const adminPath = path.join(_dirname, "UI", "Admin");
export const userPath = path.join(_dirname, "UI", "User");
export const guestPath = path.join(_dirname, "UI", "Guest");

export { _dirname };
