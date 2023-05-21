import { Dialog } from "@infernus/core";
import { MyPlayer } from "./player";

// If the built-in class is not enough for your needs,
// you can inherit the class and specify player generics
export class MyDialog extends Dialog<MyPlayer> {}
