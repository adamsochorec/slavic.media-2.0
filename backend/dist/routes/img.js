"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const img_1 = __importDefault(require("../models/img"));
const validation_1 = require("../validation");
const router = (0, express_1.Router)();
// Create document - POST
router.post("/", validation_1.verifyToken, (req, res) => {
    const data = req.body;
    img_1.default
        .create(data)
        .then((insertedData) => {
        res.status(201).send(insertedData);
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Read all document - GET
router.get("/", (req, res) => {
    const fields = typeof req.query.fields === "string"
        ? req.query.fields.split(",").join(" ")
        : "";
    img_1.default
        .find({}, fields)
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Read specific document by ID - GET
router.get("/:id", (req, res) => {
    const fields = typeof req.query.fields === "string"
        ? req.query.fields.split(",").join(" ")
        : "";
    img_1.default
        .findById(req.params.id, fields)
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Update document - PUT
router.put("/:id", validation_1.verifyToken, (req, res) => {
    const { id } = req.params;
    const updatedImg = req.body;
    img_1.default
        .findByIdAndUpdate(id, updatedImg, { new: true })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update document with id=${id}. Maybe document was not found!`,
            });
        }
        else {
            res.send(data);
        }
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Delete document - DELETE
router.delete("/:id", validation_1.verifyToken, (req, res) => {
    const { id } = req.params;
    img_1.default
        .findByIdAndDelete(id)
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update document with id=${id}. Maybe document was not found!`,
            });
        }
        else {
            res.send({ message: "Document was deleted successfully!" });
        }
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Delete all documents - DELETE
router.delete("/", validation_1.verifyToken, (req, res) => {
    img_1.default
        .deleteMany({})
        .then((result) => {
        res.send({
            message: `${result.deletedCount} documents were deleted successfully!`,
        });
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
exports.default = router;
