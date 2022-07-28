import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { FlashCards } from "../entities/flashcard";

@Resolver()
export class TaskResolver {
  @Query(() => [FlashCards])
  async flashcards(): Promise<FlashCards[]> {
    return FlashCards.find();
  }

  @Query(() => FlashCards, { nullable: true })
  async flashcard(@Arg("id", () => Int) id: number): Promise<FlashCards | undefined> {
    return FlashCards.findOne({ id });
  }

  @Mutation(() => FlashCards)
  createFlashcard(
    @Arg("question", () => String) question: string,
    @Arg("answer", () => String) answer: string
  ): Promise<FlashCards> {
    return FlashCards.create({ question , answer }).save();
  }

  @Mutation(() => FlashCards, { nullable: true })
  async updateFlashcard(
    @Arg("question", () => String, { nullable: true }) question: string,
    @Arg("answer", () => String, { nullable: true }) answer: string,
    @Arg("id", () => Int) id: number
  ): Promise<FlashCards | null> {
    const task = await FlashCards.findOne(id);
    if (!task) {
      return null;
    }
    if (typeof question !== "undefined") {
      await FlashCards.update({ id }, { question });
    }

    if (typeof answer !== "undefined") {
      await FlashCards.update({ id }, { answer });
    }
    return task;
  }

  @Mutation(() => Boolean)
  async deleteFlashcard(@Arg("id", () => Int) id: number): Promise<boolean> {
    if (await FlashCards.findOne({ id })) {
      await FlashCards.delete(id);
      return true;
    } else {
      return false;
    }
  }
}
