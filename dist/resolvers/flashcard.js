"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskResolver = void 0;
const type_graphql_1 = require("type-graphql");
const flashcard_1 = require("../entities/flashcard");
let TaskResolver = class TaskResolver {
    async flashcards() {
        return flashcard_1.FlashCards.find();
    }
    async flashcard(id) {
        return flashcard_1.FlashCards.findOne({ id });
    }
    createFlashcard(question, answer) {
        return flashcard_1.FlashCards.create({ question, answer }).save();
    }
    async updateFlashcard(question, answer, id) {
        const task = await flashcard_1.FlashCards.findOne(id);
        if (!task) {
            return null;
        }
        if (typeof question !== "undefined") {
            await flashcard_1.FlashCards.update({ id }, { question });
        }
        if (typeof answer !== "undefined") {
            await flashcard_1.FlashCards.update({ id }, { answer });
        }
        return task;
    }
    async deleteFlashcard(id) {
        if (await flashcard_1.FlashCards.findOne({ id })) {
            await flashcard_1.FlashCards.delete(id);
            return true;
        }
        else {
            return false;
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [flashcard_1.FlashCards]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "flashcards", null);
__decorate([
    (0, type_graphql_1.Query)(() => flashcard_1.FlashCards, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "flashcard", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => flashcard_1.FlashCards),
    __param(0, (0, type_graphql_1.Arg)("question", () => String)),
    __param(1, (0, type_graphql_1.Arg)("answer", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "createFlashcard", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => flashcard_1.FlashCards, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("question", () => String, { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)("answer", () => String, { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "updateFlashcard", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "deleteFlashcard", null);
TaskResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], TaskResolver);
exports.TaskResolver = TaskResolver;
//# sourceMappingURL=flashcard.js.map