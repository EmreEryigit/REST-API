import { object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *      CreateUserInput:
 *          type: object
 *          required:
 *              - email
 *              - name
 *              - password
 *              - passwordConfirmation
 *          properties:
 *              email:
 *                  type: string
 *                  default: janedoe@example.com
 *              name:
 *                  type: string
 *                  default: Jane Doe
 *              password:
 *                  type: string
 *                  default: stringPassword123
 *              passwordConfirmation:
 *                  type: string
 *                  default: stringPassword123
 *      CreateUserResponse:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              name:
 *                  type: string
 *              _id:
 *                  type: string
 *              createdAt:
 *                  type: Date
 *              updatedAt:
 *                  type: Date
 *
 */

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: "Name is required",
        }),
        password: string({
            required_error: "Password is required",
        }).min(6, "Password too short"),
        passwordConfirmation: string({
            required_error: "PasswordConfirmation is required",
        }),
        email: string({
            required_error: "Email is required",
        }).email("Email is not valid"),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    }),
});

export type CreateUserInput = Omit<
    TypeOf<typeof createUserSchema>,
    "body.passwordConfirmation"
>;
