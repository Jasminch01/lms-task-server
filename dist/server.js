"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const Config_1 = __importDefault(require("./app/Config"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            mongoose_1.default.set("debug", true); // ✅ Enables query logging
            yield mongoose_1.default.connect(Config_1.default.dburi);
            console.log("✅ MongoDB Connected Successfully");
            app_1.default.listen(Config_1.default.port, () => {
                console.log(`🚀 Server is online on port ${Config_1.default.port}`);
            });
        }
        catch (error) {
            console.error("❌ MongoDB Connection Failed:", error);
            process.exit(1);
        }
    });
}
main();
