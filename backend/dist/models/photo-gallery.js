"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Common schema for columns
const columnSchema = new mongoose_1.Schema({
    largeURL: { type: String, required: true },
    thumbnailURL: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    flag: { type: String, required: true },
    title: { type: String, required: true },
    alt: { type: String, required: true },
});
// Schema corresponding to the document interface.
const photoGallerySchema = new mongoose_1.Schema({
    gallery: {
        title: { type: String, required: true },
        url: { type: String, required: true },
        description: { type: String, required: true },
    },
    column1: [columnSchema],
    column2: [columnSchema],
    column3: [columnSchema],
    column4: [columnSchema],
});
// Create a Model
const photoGallery = mongoose_1.default.model("photoGallery", photoGallerySchema);
exports.default = photoGallery;